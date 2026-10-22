import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname.replace(/^\/(?:([A-Za-z]):)/, '$1:'));
const htmlFiles = (await readdir(root)).filter(name => name.endsWith('.html'));
const failures = [];
let checkedReferences = 0;

for (const file of htmlFiles) {
  const path = join(root, file);
  const source = await readFile(path, 'utf8');
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  for (const id of new Set(ids)) if (ids.filter(value => value === id).length > 1) failures.push(`${file}: duplicate id ${id}`);
  for (const match of source.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(reference)) continue;
    const local = reference.split(/[?#]/)[0];
    if (!local) continue;
    checkedReferences += 1;
    try { await access(resolve(dirname(path), local)); }
    catch { failures.push(`${file}: missing ${reference}`); }
  }
}

const searchable = await Promise.all((await readdir(root)).filter(name => /\.(?:html|js|xml|txt|json)$/.test(name)).map(async name => [name, await readFile(join(root, name), 'utf8')]));
const forbidden = [/hello@kova\.app/i, /https:\/\/play\.google\.com\/store\/apps["']/i, /GDPR compliant/i, /zgodn\w* z RODO/i];
for (const [file, source] of searchable) for (const pattern of forbidden) if (pattern.test(source)) failures.push(`${file}: forbidden unverified claim ${pattern}`);

const home = await readFile(join(root, 'index.html'), 'utf8');
if (!home.includes('href="workspace.html"')) failures.push('index.html: missing Workspace entry point');
if (!home.includes('assets/screenshots/offline-demo-home.png')) failures.push('index.html: missing current Offline V1 demonstration screenshot');
if (!home.includes('id="site-language"')) failures.push('index.html: missing main language selector');
for (const legalPage of ['privacy.html', 'terms.html', 'cookies.html']) if (!home.includes(`href="${legalPage}"`)) failures.push(`index.html: missing visible ${legalPage} link`);

const workspace = await readFile(join(root, 'workspace.html'), 'utf8');
if (!workspace.includes('src="workspace-access.js"')) failures.push('workspace.html: missing private access gate');
if (!workspace.includes('class="workspace-home-button"')) failures.push('workspace.html: missing normal Home button');
const icons = await readFile(join(root, 'assets', 'icons.svg'), 'utf8');
for (const icon of ['home', 'globe', 'workspace', 'cookie', 'shield', 'search', 'download', 'x', 'play', 'pause']) if (!icons.includes(`id="${icon}"`)) failures.push(`assets/icons.svg: missing ${icon} symbol`);

for (const legalPage of ['privacy.html', 'terms.html']) {
  const legal = await readFile(join(root, legalPage), 'utf8');
  if (!legal.includes('src="legal-document.js"')) failures.push(`${legalPage}: missing app-document renderer`);
  if (!legal.includes('data-legal-language')) failures.push(`${legalPage}: missing legal language selector`);
}
const cookieDocument = await readFile(join(root, 'cookies.html'), 'utf8');
for (const language of ['pl', 'en', 'ru']) if (!cookieDocument.includes(`data-doc-lang="${language}"`)) failures.push(`cookies.html: missing ${language} content`);
if (!cookieDocument.includes('_ga_2LE3GWYDZM') || !cookieDocument.includes('kova_cookie_consent_v2')) failures.push('cookies.html: missing analytics cookie inventory');
if (home.includes('workspaceTitle') || home.includes('Workspace jest dostępny tylko lokalnie')) failures.push('index.html: obsolete local Workspace banner remains');
const consentScript = await readFile(join(root, 'site-consent.js'), 'utf8');
if (!home.includes('data-video-open') || !home.includes('src="site-consent.js"') || !consentScript.includes('data-cookie-accept-all')) failures.push('index.html: missing video or analytics consent controls');
for (const kind of ['privacy-policy', 'terms-of-service']) for (const language of ['pl', 'en', 'ru']) {
  try { await access(join(root, 'legal', `${kind}-${language}.md`)); }
  catch { failures.push(`legal/${kind}-${language}.md: missing app legal source`); }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(JSON.stringify({ htmlFiles: htmlFiles.length, checkedReferences, result: 'PASS' }, null, 2));
