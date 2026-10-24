import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const read=async path=>readFile(new URL('../'+path,import.meta.url),'utf8');
const renderer=await read('legal-document.js');
const context={};
vm.runInNewContext(renderer.slice(renderer.indexOf('  const escapeHtml'),renderer.indexOf('  let loadRevision'))+';this.inline=inline;this.render=renderMarkdown;',context);
let checked=0;
for(const lang of ['pl','en','ru'])for(const kind of ['privacy-policy','terms-of-service']){
  const source=await read(`legal/${kind}-${lang}.md`);
  const rendered=context.render(source);
  assert.ok(!rendered.includes('href="#"'),'Canonical relative document links must work');
  const opposite=kind==='privacy-policy'?'terms':'privacy';
  assert.ok(rendered.includes(`href="${opposite}.html?lang=${lang}"`));
  assert.equal((rendered.match(/<h2 /g)||[]).length,(source.match(/^## /gm)||[]).length);
  assert.ok(rendered.includes('Vadyslav Konohrai'));
  assert.ok(rendered.includes('contact@kovacompass.app'));
  assert.ok(source.includes('OWNER_INPUT_REQUIRED'),'Do not silently approve missing legal facts');
  assert.ok(rendered.includes('Pending owner confirmation before publication'));
  assert.ok(!rendered.includes('OWNER_INPUT_REQUIRED'),'Show readable pending status');
  checked++;
}
assert.ok(!context.inline('[bad](javascript:evil)').includes('href="javascript:'));
assert.ok(context.inline('<script>alert(1)</script>').includes('&lt;script&gt;'));
assert.ok(context.inline('[safe](https://example.org)').includes('rel="noopener noreferrer"'));
const landing=await read('landing.js');
const copy={window:{}};
vm.runInNewContext(landing.slice(landing.indexOf('  const dictionaries'),landing.indexOf('  const videoSlides'))+';window.copy=dictionaries;',copy);
for(const lang of ['pl','en','ru']) {
  const data=copy.window.copy[lang];
  assert.ok(data.heroKicker.includes('Android'));
  assert.ok(data.faqFreeA.includes('Premium'));
  for(const key of ['faqBackupA','faqOcrA','faqDeviceA','factAccount','faqOfflineA'])assert.ok(data[key].length>5);
  assert.ok(!/Google.*(?:wymagają|need|нужен)/.test(data.secureOnlineCopy));
}
assert.ok(!landing.slice(landing.indexOf('  const videoSlides')).includes('free-v1-intro.png'));
const release=JSON.parse(await read('release-config.json'));
for(const [page,url] of [['privacy',release.publicPolicyUrl],['terms',release.publicTermsUrl]]) {
  assert.ok((await read(`${page}.html`)).includes(`data-public-document-url="${url}"`));
  assert.equal(new URL(url).origin,release.canonicalOrigin);
}
console.log(JSON.stringify({result:'PASS',canonicalDocumentsRendered:checked,relativeLinks:'PASS',injectionEscaping:'PASS',offlineCopy:'PASS'}));
