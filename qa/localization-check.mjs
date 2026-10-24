import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {languages,languageNames} from '../scripts/seo.mjs';
const read=name=>readFile(new URL('../'+name,import.meta.url),'utf8');
const source=JSON.parse(await read('qa/artifacts/localization/source.json'));
const legalRenderer=await read('legal-document.js'),legalContext={};
vm.runInNewContext(legalRenderer.slice(legalRenderer.indexOf('  const escapeHtml'),legalRenderer.indexOf('  let loadRevision'))+';this.render=renderMarkdown;',legalContext);
let strings=0;
function verify(original,localized,path='') {
  assert.equal(typeof localized,typeof original,path);
  if(typeof original==='string') {
    assert.ok(localized.trim(),path);
    assert.ok(!/<\s*x\b/i.test(localized),path+': leaked translation placeholder');
    for(const token of original.match(/<[^>]+>|https?:\/\/[^\s)\]<>]+|[\w.+-]+@[\w.-]+\.[a-z]+|\b(?:KOVA|SQLCipher|Android|OCR|GA4|G-2LE3GWYDZM)\b/g)||[]) assert.ok(localized.includes(token),path+': lost '+token);
    strings++;
  } else if(Array.isArray(original)) {
    assert.equal(localized.length,original.length,path);
    original.forEach((v,i)=>verify(v,localized[i],path+'.'+i));
  } else {
    assert.deepEqual(Object.keys(localized).sort(),Object.keys(original).sort(),path);
    for(const [key,value] of Object.entries(original)) if(key!=='cookies') verify(value,localized[key],path+'.'+key);
  }
}
const ctx={window:{},document:{documentElement:{lang:'pl'}},MutationObserver:class{observe(){}}};
vm.runInNewContext(await read('language-config.js'),ctx);
assert.deepEqual(Array.from(ctx.window.KOVA_LANGUAGES.codes),languages);
for(const [input,output] of Object.entries({'zh-CN':'zh','zh-HK':'yue','en-US':'en','pa-Arab':'pnb','pa-PK':'pnb','xx':'pl','ar-EG':'ar','uk-UA':'uk'})) assert.equal(ctx.window.KOVA_LANGUAGES.resolve(input),output);
for(const lang of languages.filter(l=>!['pl','en','ru'].includes(l))) {
  const data=JSON.parse(await read(`locales/${lang}.json`));verify(source,data,lang);
  assert.ok(data.cookies.includes(`data-doc-lang="${lang}"`));
  for(const kind of ['privacy-policy','terms-of-service']) {
    const text=await read(`legal/${kind}-${lang}.md`),english=await read(`legal/${kind}-en.md`);
    assert.equal((text.match(/^## /gm)||[]).length,(english.match(/^## /gm)||[]).length,lang+kind);
    assert.ok(text.includes('[OWNER_INPUT_REQUIRED]'));
    assert.ok(text.includes('contact@kovacompass.app'));
    const url=`https://kovacompass.app/${kind==='privacy-policy'?'privacy':'terms'}.html?lang=en`;
    const rendered=legalContext.render(text,'Pending owner confirmation',lang);
    assert.ok(rendered.includes(`href="${url}"`),lang+': legal URL is a working rendered link');
    assert.ok(!rendered.includes('href="#"'),lang+': translated document links work');
    assert.ok(!rendered.includes('OWNER_INPUT_REQUIRED'),lang+': human-readable pending status');
  }
}
assert.equal(languages.length,27);
assert.equal(languageNames.pnb,'پنجابی (شاہ مکھی)');
console.log(JSON.stringify({result:'PASS',languages:languages.length,newLocales:24,validatedStrings:strings,pendingLanguages:['wuu']}));
