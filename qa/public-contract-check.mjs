import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = name => readFile(resolve(root, name), 'utf8');
const context = { window:{} };
vm.runInNewContext(await read('project-content.js'), context);
let translations = 0;
for (const [page, languages] of Object.entries(context.window.KOVA_PROJECT_PAGES)) {
  assert.deepEqual(Object.keys(languages).sort(), ['en','pl','ru']);
  const html = await read(`${page}.html`);
  for (const language of ['pl','en','ru']) {
    const data = languages[language];
    assert.ok(data.title && data.intro && data.label, `${page}/${language}: missing main content`);
    assert.equal(data.cards.length, languages.pl.cards.length, `${page}/${language}: missing cards`);
    assert.equal(data.actions.length, languages.pl.actions.length, `${page}/${language}: missing actions`);
    for (const [heading, content] of data.cards) assert.ok(heading && content);
    for (const [, href] of data.actions) {
      if (href.startsWith('mailto:')) assert.equal(href, 'mailto:contact@kovacompass.app');
      else await access(resolve(root, href.split('#')[0]));
    }
    translations++;
  }
  assert.ok(html.includes(languages.pl.title), `${page}: Polish content is missing without JS`);
  assert.ok(!html.includes('document-progress'), `${page}: unverified progress percentage`);
}

const home = await read('index.html');
const landing = await read('landing.js');
const copyContext = {window:{}};
vm.runInNewContext(landing.slice(landing.indexOf('  const dictionaries'),landing.indexOf('  const videoSlides'))+'\nwindow.copy = dictionaries;',copyContext);
for (const key of new Set([...home.matchAll(/data-i18n(?:-html|-alt)?="([^"]+)"/g)].map(match=>match[1]))) {
  for (const lang of ['pl','en','ru']) assert.ok(copyContext.window.copy[lang][key], `Missing landing copy: ${lang}/${key}`);
}
assert.equal((home.match(/<details>/g) || []).length, 9, 'All nine FAQ answers must remain available without JS');
const pages = (await readdir(root)).filter(name=>name.endsWith('.html') && name !== 'workspace.html');
for (const page of pages) {
  const html = await read(page);
  assert.ok(html.includes('site-shell.js') && html.includes('site-ui.css') && html.includes('language-picker.js'), `${page}: missing shared navigation/styles/language picker`);
}
const shell = await read('site-shell.js');
for (const target of ['contact.html','privacy.html','terms.html','cookies.html','updates.html','roadmap.html','status.html']) assert.ok(shell.includes(target));
console.log(JSON.stringify({ publicPages:pages.length, translatedProjectPages:translations, faqAnswers:9, result:'PASS' },null,2));

// Optional repository-to-repository check, without changing legal text.
if (process.argv[2]) {
  let documents = 0;
  for (const kind of ['privacy-policy','terms-of-service']) for (const lang of ['pl','en','ru']) {
    const name = `${kind}-${lang}.md`;
    const app = await readFile(resolve(process.argv[2], 'docs/release/offline-legal', name),'utf8');
    // App sources use mixed CRLF/LF and copies contain one extra trailing blank line.
    // Compare every content character, ignoring only line endings and empty lines at EOF.
    const canonical = text => text.replace(/\r\n/g,'\n').replace(/\n*$/, '\n');
    assert.ok(canonical(await read(`legal/${name}`)) === canonical(app), `${name}: app document text was changed`);
    documents++;
  }
  console.log(JSON.stringify({ appDocumentTextMatches:documents, normalization:'CRLF/LF and trailing empty lines', result:'PASS' }));
}
