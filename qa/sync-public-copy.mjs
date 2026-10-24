// Regenerates Polish no-JS fallbacks from the same reviewed copy as the live UI.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import vm from 'node:vm';
const root = fileURLToPath(new URL('..', import.meta.url));
const read = name => readFile(resolve(root,name),'utf8');
const release = JSON.parse(await read('release-config.json'));
const context = {window:{}};
vm.runInNewContext(await read('project-content.js'),context);
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const render = data => `<section class="document-hero"><p class="workspace-kicker">${esc(data.label)}</p><h1>${esc(data.title)}</h1><p>${esc(data.intro)}</p>${data.badge ? `<div class="document-meta"><span class="document-chip warning">${esc(data.badge)}</span></div>` : ''}</section><div class="document-grid-main">${data.cards.map(([title,body])=>`<article class="document-card"><h2>${esc(title)}</h2><p>${esc(body)}</p></article>`).join('')}</div>${data.note ? `<p class="document-notice">${esc(data.note)}</p>` : ''}<div class="document-actions">${data.actions.map(([title,href])=>`<a href="${esc(href)}">${esc(title)}<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#arrow-right"></use></svg></a>`).join('')}</div>`;
for (const [page,locales] of Object.entries(context.window.KOVA_PROJECT_PAGES)) {
  let html;
  try { html = await read(page+'.html'); }
  catch { html = (await read('status.html')).replace('data-project-page="status"',`data-project-page="${page}"`); }
  html = html.replace(/<div data-project-content>[\s\S]*<\/div>\s*<\/main>/,`<div data-project-content>${render(locales.pl)}</div>\n  </main>`)
    .replace(/<title>[^<]*<\/title>/,`<title>${esc(locales.pl.label)} — KOVA</title>`)
    .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(locales.pl.intro)}">`);
  await writeFile(resolve(root,page+'.html'),html);
}
const landing = await read('landing.js');
vm.runInNewContext(landing.slice(landing.indexOf('  const dictionaries'),landing.indexOf('  const videoSlides'))+'\nwindow.copy = dictionaries;',context);
let home = await read('index.html');
home = home.replaceAll('assets/screenshots/free-v1-intro.png','assets/screenshots/offline-v1-notes.png');
home = home.replace(/(<img[^>]*src="assets\/screenshots\/offline-v1-notes.png"[^>]*width=")1080(" height=")2400/, '$1720$21280');
home = home.replace('data-video-counter>1 / 4','data-video-counter>1 / 3');
if (!home.includes('class="release-facts"')) home = home.replace('<div class="hero-actions">','<ul class="release-facts"><li data-i18n="factAndroid"></li><li data-i18n="factOffline"></li><li data-i18n="factAccount"></li></ul><div class="hero-actions">');
home = home.replace(/<([a-z][a-z0-9]*)\b([^>]*\bdata-i18n(?:-html)?="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g,(all,tag,attrs,key)=>{
  const value = context.window.copy.pl[key];
  return value === undefined ? all : `<${tag}${attrs}>${attrs.includes('data-i18n-html') ? value : esc(value)}</${tag}>`;
});
home = home.replace(/<img\b[^>]*data-i18n-alt="([^"]+)"[^>]*>/g,(all,key)=>all.replace(/ alt="[^"]*"/,` alt="${esc(context.window.copy.pl[key])}"`));
home = home.replace(/<meta (name="description"|property="og:description") content="[^"]*" \/>/g,(_,attr)=>`<meta ${attr} content="${esc(context.window.copy.pl.heroCopy)}" />`);
await writeFile(resolve(root,'index.html'),home);
console.log('Synchronized public Polish fallbacks and metadata.');
for (const page of ['index','status','roadmap','updates','security','contact','delete-account','privacy','terms','cookies','404']) {
  const path = resolve(root,page+'.html');
  let html = await readFile(path,'utf8');
  if (['privacy','terms'].includes(page)) {
    const publicUrl = page === 'privacy' ? release.publicPolicyUrl : release.publicTermsUrl;
    if(publicUrl!==`https://kovacompass.app/${page}.html?lang=en`)throw new Error(`Unapproved public document URL: ${page}`);
    html = html.replaceAll('KOVA Offline Free V1','KOVA: Money & Budget');
  }
  if (page === 'cookies') html = html.replaceAll('16 października 2026','21 października 2026').replaceAll('16 October 2026','21 October 2026').replaceAll('16 октября 2026','21 октября 2026');
  if (!html.includes('src="language-picker.js"')) {
    html = html.replace(/(<script src="site-shell.js"(?: defer)?><\/script>)/,'$1\n    <script src="language-picker.js" defer></script>');
  }
  await writeFile(path,html);
}
