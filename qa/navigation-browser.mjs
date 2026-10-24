// Follow the shared navigation across pages and verify hierarchy and language.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,readFile,writeFile,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const origin=process.env.KOVA_PUBLIC_ORIGIN || 'http://127.0.0.1:4174';
const languages=Object.keys(JSON.parse(await readFile(new URL('../language-registry.json',import.meta.url),'utf8')));
const tags={pl:'pl-PL',zh:'zh-CN',yue:'yue-Hant-HK',es:'es-ES',en:'en-US',ar:'ar-SA',hi:'hi-IN',bn:'bn-BD',pt:'pt-BR',ru:'ru-RU',uk:'uk-UA',ja:'ja-JP',pnb:'pa-Arab-PK',jv:'jv-ID',ko:'ko-KR',de:'de-DE',fr:'fr-CA',te:'te-IN',mr:'mr-IN',tr:'tr-TR',ur:'ur-PK',vi:'vi-VN',ta:'ta-IN',it:'it-IT',fa:'fa-IR',sw:'sw-KE',ms:'ms-MY'};
const profile=await mkdtemp(join(tmpdir(),'kova-language-check-'));
const edge=process.env.KOVA_EDGE||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser=spawn(edge,['--headless=new','--disable-gpu','--disable-background-networking','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));let socket,send;
const results=[];
try {
 let port;for(let n=0;n<60&&!port;n++){try{port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split(/\r?\n/)[0]);}catch{await delay(100);}}
 if(!port)throw Error('Browser did not start');
 const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
 socket=new WebSocket(targets.find(x=>x.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 const pending=new Map();let id=0;socket.onmessage=e=>{const m=JSON.parse(e.data),p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.j(Error(m.error.message)):p.r(m.result);}};
 send=(method,params={})=>new Promise((r,j)=>{const n=++id;pending.set(n,{r,j});socket.send(JSON.stringify({id:n,method,params}));});
 await send('Page.enable');await send('Runtime.enable');
 const evaluate=async expression=>{
  const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
 };
 const probe=`(() => {
  let stored;try {stored=localStorage.getItem('kova_site_language');}catch{stored='BLOCKED';}
  let cookie;try{cookie=document.cookie;}catch{cookie='BLOCKED';}
  const select=document.querySelector('#site-language,[data-project-language],[data-document-language],[data-legal-language]');
  const node=document.getElementById('kova-seo-data'),data=node?JSON.parse(node.textContent):null;
  const lang=document.documentElement?.lang,m=data?.locales[lang];
  return {token:window.__languageTest,ready:document.readyState,lang,selected:select?.value,browser:navigator.languages,stored,cookie,url:location.href,dir:document.documentElement?.dir,
   loaded:!!document.querySelector('.language-trigger')&&document.querySelector('[data-legal-content]')?.getAttribute('aria-busy')!=='true',
   visibleCookieSections:document.querySelectorAll('[data-doc-lang]:not([hidden])').length,
   seo:!data || (document.title===m?.title && window.KOVA_ROUTES.parse()?.language===lang && document.querySelector('link[rel="canonical"]')?.href===m?.canonical),errors:window.__languageErrors||[]};
 })()`;
 const verify=(c,state)=>{
  assert.equal(state.lang,c.expected,JSON.stringify({case:c,state}));
  assert.equal(state.selected,c.expected);assert.equal(state.loaded,true);assert.equal(state.seo,true);
  assert.equal(state.dir,['ar','pnb','ur','fa'].includes(c.expected)?'rtl':'ltr');
  assert.equal(state.errors.length,0,JSON.stringify(state.errors));
  if(c.path?.startsWith('/cookies')) assert.equal(state.visibleCookieSections,1);
  results.push({...c,...state,passed:true});
 };
 let serial=0;
 const navigate=async (c)=>{
  if(c.reset!==false)await send('Storage.clearDataForOrigin',{origin,storageTypes:'all'});
  const token=++serial;
  const preferred=c.languages || [c.browser || 'en-US'];
  const setup=`window.__languageTest=${token};window.__languageErrors=[];window.addEventListener('error',e=>window.__languageErrors.push(e.message));
   Object.defineProperty(Navigator.prototype,'language',{get:()=>${JSON.stringify(c.browser || preferred[0] || '')}});
   Object.defineProperty(Navigator.prototype,'languages',{get:()=>${JSON.stringify(preferred)}});
   ${c.stored?`localStorage.setItem('kova_site_language',${JSON.stringify(c.stored)});`:''}
   ${c.cookie?`document.cookie='kova_site_language=${c.cookie}; Path=/';`:''}
   ${c.blocked?`Storage.prototype.getItem=function(){throw Error('storage disabled');};Storage.prototype.setItem=function(){throw Error('storage disabled');};`:''}
   ${c.cookiesBlocked?`Object.defineProperty(Document.prototype,'cookie',{get(){throw Error('cookies disabled');},set(){throw Error('cookies disabled');}});`:''}`;
  const injection=(await send('Page.addScriptToEvaluateOnNewDocument',{source:setup})).identifier;
  await send('Page.navigate',{url:origin+(c.path || '/')});
  let state;
  try {
   for(let n=0;n<60;n++) {
    await delay(100);state=await evaluate(probe);
    if(state?.token===token && state.ready==='complete' && state.loaded && state.selected===state.lang)break;
   }
   verify(c,state);return state;
  } finally {await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:injection});}
 };

 const errors=[];
 socket.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);});
 const snapshot=()=>evaluate(`(() => {const h=document.querySelector('.public-header'),r=h.getBoundingClientRect();return {labels:[...h.querySelectorAll('[data-header-key]')].map(a=>a.textContent),keys:[...h.querySelectorAll('[data-header-key]')].map(a=>a.dataset.headerKey),height:r.height,background:getComputedStyle(h).backgroundColor,overflow:document.documentElement.scrollWidth>innerWidth,active:h.querySelector('[aria-current]')?.dataset.headerKey,trail:document.querySelector('.page-trail')?.textContent,section:document.querySelector('.section-nav [aria-current]')?.getAttribute('href')};})()`);
 const follow=async(selector,expected,page,hash='')=>{
  await evaluate(`document.querySelector('[data-cookie-essential]')?.click();const nav=document.querySelector('.public-nav');if(${JSON.stringify(selector)}.startsWith('.public-nav')&&getComputedStyle(nav).display==='none')document.querySelector('.public-menu').click();document.querySelector(${JSON.stringify(selector)}).click();`);
  let state;
  for(let n=0;n<80;n++) {
   await delay(100);state=await evaluate(probe);
   if(state.ready==='complete'&&state.loaded&&state.seo&&new URL(state.url).pathname.includes(page==='index'?'index':page)&&(!hash||new URL(state.url).hash===hash))break;
   if(page==='index'&&new URL(state.url).pathname==='/'&&new URL(state.url).hash===hash&&state.loaded&&state.seo)break;
  }
  verify({expected,kind:'navigation',page},state);
  assert.equal(await evaluate('window.KOVA_ROUTES.parse().page'),page);
  return snapshot();
 };
 for(const lang of ['pl','en','uk','yue','ar','de','ta'])for(const width of [1440,390]) {
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<700});
  await navigate({path:lang==='pl'?'/?lang=pl':`/index-${lang}.html`,stored:'fr',expected:lang,kind:'header-before-navigation'});
  const first=await snapshot();
  assert.deepEqual(first.keys,['product','features','screens','security','faq','project']);assert.equal(first.overflow,false);
  const project=await follow('.public-nav [data-header-key="project"]',lang,'status');
  const roadmap=await follow('.section-nav a[href*="roadmap"]',lang,'roadmap');
  const features=await follow('.public-nav [data-header-key="features"]',lang,'index','#features');
  for(const state of [project,roadmap,features]) {
   assert.deepEqual(state.labels,first.labels);assert.equal(state.height,first.height);assert.equal(state.background,first.background);assert.equal(state.overflow,false);
  }
  assert.equal(project.active,'project');assert.equal(roadmap.active,'project');assert.equal(features.active,'features');
  assert.ok(project.trail&&roadmap.trail);assert.ok(project.section.includes('status'));assert.ok(roadmap.section.includes('roadmap'));
  await evaluate('window.__sameDocument=true');
  await follow('.public-nav [data-header-key="screens"]',lang,'index','#screens');
  assert.equal(await evaluate('window.__sameDocument'),true,'Same-page sections must not reload');
  assert.equal(await evaluate('Math.round(document.querySelector(".public-header").getBoundingClientRect().top)'),0,'Header must stay visible while scrolling');
  assert.equal(await evaluate('localStorage.getItem("kova_site_language")'),'fr','Navigation should not overwrite the saved choice');
  console.log(JSON.stringify({language:lang,width,result:'PASS'}));
 }
 assert.deepEqual(errors,[]);
 await writeFile('qa/artifacts/localization/navigation-browser.json',JSON.stringify({recordedAt:new Date().toISOString(),result:'PASS',cases:results.length,results},null,2));
 console.log(JSON.stringify({result:'PASS',cases:results.length,scope:'Identical header across real page navigation, project hierarchy, active states, language retention, sticky header and same-page anchors'}));
} finally {
 if(send&&socket?.readyState===WebSocket.OPEN)await Promise.race([send('Browser.close').catch(()=>{}),delay(1500)]);
 socket?.close();if(browser.exitCode===null)browser.kill();
}
