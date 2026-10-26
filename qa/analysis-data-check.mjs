import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {languages,file} from '../scripts/seo.mjs';
const read=name=>readFile(new URL('../'+name,import.meta.url),'utf8');
const source=await read('landing.js'),context={window:{}};
vm.runInNewContext(source.slice(source.indexOf('  const dictionaries'),source.indexOf('  const videoSlides'))+';window.copy=dictionaries;',context);
for(const lang of languages){
 const copy=context.window.copy[lang]??JSON.parse(await read(`locales/${lang}.json`)).home;
 const html=await read('dist/'+file('index',lang));
 const answer=html.match(/<details id="analysis-data">([\s\S]*?)<\/details>/)?.[1];
 assert.ok(answer?.includes(copy.faqDataQ),lang+': translated, static FAQ answer');
 assert.ok(answer.includes(copy.faqDataA),lang+': complete static answer');
 assert.ok(html.includes('href="#analysis-data"'),lang+': plan links to the answer');
 const numbers=text=>text.match(/\d+/g).map(Number).sort((a,b)=>a-b);
 const sections=[...copy.faqDataA.matchAll(/<li>(.*?)<\/li>/g)].map(m=>numbers(m[1]));
 // A component's small threshold must not imply all Premium analyses are ready.
 assert.deepEqual(sections,[[2,3,7],[1,20,60,75],[3,90,100]],lang+': prerequisites');
 assert.deepEqual(numbers(copy.faqDataA.match(/^<p>(.*?)<\/p>/)[1]),[3,5],lang+': basic reports');
 assert.ok(!/\d/.test(copy.forecastNote),lang+': no isolated numeric promise at plans');
}
console.log(JSON.stringify({result:'PASS',languages:languages.length,staticFaq:true,analysisTypes:4}));
