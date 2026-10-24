import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import vm from 'node:vm';
import {resolve} from 'node:path';
import {browserSession,delay} from './browser-session.mjs';
const out=resolve('qa/artifacts/followup-2026-10-24');await mkdir(out,{recursive:true});
const manifest=JSON.parse(await readFile('dist/build-manifest.json','utf8'));
const raw=await readFile('landing.js','utf8'),context={window:{}};
vm.runInNewContext(raw.slice(raw.indexOf('  const dictionaries'),raw.indexOf('  const videoSlides'))+';window.copy=dictionaries;',context);
const packs={...context.window.copy};
for(const pin of manifest.files.filter(p=>p.path.startsWith('locales/')))packs[pin.path.slice(8,-5)]=JSON.parse(await readFile('dist/'+pin.path,'utf8')).home;
const b=await browserSession(),results=[],errors=[],requests=[];
b.on(m=>{if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);if(m.method==='Network.requestWillBeSent')requests.push(m.params.request.url);});
try{
 await b.send('Page.addScriptToEvaluateOnNewDocument',{source:"document.cookie='kova_cookie_consent_v2=essential; Path=/';"});
 await b.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await b.send('Emulation.setDeviceMetricsOverride',{width:360,height:800,deviceScaleFactor:1,mobile:true});
 for(const [language,copy] of Object.entries(packs)){
  const start=requests.length;
  await b.navigate(`http://127.0.0.1:4174/index${language==='pl'?'':'-'+language}.html?lang=${language}`,`document.readyState==='complete'&&window.KOVA_ANALYTICS&&document.documentElement.lang==='${language}'`);
  await delay(50);
  const view=await b.evaluate(`(()=>{const c=document.querySelector('[data-primary-cta]'),r=c.getBoundingClientRect();return {heading:document.querySelector('h1').innerHTML,cta:c.innerText.trim(),forecast:document.querySelector('[data-i18n="forecastNote"]').textContent,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,ctaBottom:r.bottom,version:document.querySelector('meta[name="kova-build"]').content}})()`);
  assert.equal(view.heading,copy.heroTitle,language+': heading');assert.equal(view.cta,copy.followLaunch,language+': CTA');assert.equal(view.forecast,copy.forecastNote,language+': forecast');assert.equal(view.overflow,false,language+': horizontal overflow');assert.equal(view.version,manifest.version);
  assert.ok(view.ctaBottom<=800,language+': primary CTA fits the first mobile viewport');
  const assets=requests.slice(start).map(u=>new URL(u)).filter(u=>u.origin==='http://127.0.0.1:4174'&&!u.pathname.endsWith('.html')&&u.pathname!=='/'&&u.pathname!=='/favicon.ico');
  assert.ok(assets.length>0);assert.ok(assets.every(u=>u.searchParams.get('v')===manifest.version),language+': assets use same build');
  assert.ok(assets.every(u=>!u.pathname.endsWith('.png')&&!u.pathname.endsWith('/translations.js')),language+': no full PNG or all-locale bundle on first view');
  results.push({language,...view,resources:assets.length});
  if(['ru','uk','ta'].includes(language))await b.screenshot(resolve(out,`home-${language}-360.png`));
 }
 await b.send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 for(const lang of ['pl','ru']){
  await b.navigate(`http://127.0.0.1:4174/?lang=${lang}`,`document.readyState==='complete'&&window.KOVA_ANALYTICS&&document.documentElement.lang==='${lang}'`);
  await b.evaluate(`document.querySelector('#plans').scrollIntoView({behavior:'instant'});Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>i.decode().catch(()=>{})))`);
  await b.screenshot(resolve(out,`plans-${lang}-1440.png`));
 }
 assert.equal(errors.length,0,JSON.stringify(errors));
 await writeFile(resolve(out,'all-language-layouts.json'),JSON.stringify({result:'PASS',languages:results.length,version:manifest.version,results,errors},null,2));
 console.log(JSON.stringify({result:'PASS',languages:results.length,ctaBelowFold:results.filter(r=>r.ctaBottom>800).map(r=>r.language),errors:errors.length}));
}finally{await b.close();}
