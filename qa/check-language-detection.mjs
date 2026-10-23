// Browser integration checks for automatic language selection and manual choices.
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
  const lang=document.documentElement.lang,m=data?.locales[lang];
  return {token:window.__languageTest,ready:document.readyState,lang,selected:select?.value,browser:navigator.languages,stored,cookie,url:location.href,dir:document.documentElement.dir,
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
 for(const path of ['/','/contact.html','/cookies.html','/privacy.html']) {
  for(const language of languages) {
   const state=await navigate({path,browser:tags[language],expected:language,kind:'automatic'});
   assert.equal(state.stored,null,'Automatic detection must not set a manual preference');
   assert.ok(!state.cookie.includes('kova_site_language='));
  }
  console.log(JSON.stringify({group:'automatic',path,languages:languages.length,result:'PASS'}));
 }
 const special=[
  {languages:['cs-CZ','de-DE','en-US'],expected:'de'},
  {languages:['xx','yy'],expected:'pl'},
  {languages:[],browser:'ja-JP',expected:'ja'},
  {browser:'zh-Hant-HK',expected:'yue'},
  {browser:'jw-ID',expected:'jv'},
  {browser:'uk-UA',stored:'de',expected:'de'},
  {browser:'uk-UA',stored:'invalid',cookie:'fr',expected:'fr'},
  {browser:'uk-UA',cookie:'de',blocked:true,expected:'de'},
  {browser:'uk-UA',blocked:true,cookiesBlocked:true,expected:'uk'},
  {path:'/?lang=xx',browser:'uk-UA',expected:'uk'},
  {path:'/?lang=pl',stored:'de',expected:'pl'},
  {path:'/?lang=uk-UA',stored:'de',expected:'uk'},
  {path:'/index-fr.html',stored:'de',browser:'uk-UA',expected:'fr'},
  {path:'/index-fr.html?lang=uk',stored:'de',expected:'uk'}
 ];
 for(const c of special) await navigate({...c,kind:'fallback-and-precedence'});
 const choose=async language=>{
  await evaluate(`document.querySelector('[data-cookie-essential]')?.click();document.querySelector('.language-trigger').click();document.querySelector('[data-language="${language}"]').click();`);
  let state;
  for(let n=0;n<60;n++) {await delay(50);state=await evaluate(probe);if(state.lang===language&&state.loaded&&state.seo)break;}
  assert.equal(state.lang,language);assert.equal(state.stored,language);assert.ok(state.cookie.includes(`kova_site_language=${language}`));
  verify({expected:language,kind:'manual-selection'},state);
 };
 for(const language of languages) {
  await navigate({browser:'uk-UA',expected:'uk',kind:'before-manual'});
  await choose(language);
  await navigate({reset:false,browser:'en-US',expected:language,kind:'manual-revisit'});
  await navigate({reset:false,path:'/contact.html',browser:'fr-FR',expected:language,kind:'manual-navigation'});
 }
 for(const path of ['/contact.html','/cookies.html','/privacy.html']) {
  await navigate({path,browser:'uk-UA',expected:'uk',kind:'before-manual-subpage'});
  await choose('ar');
  await navigate({reset:false,browser:'en-US',expected:'ar',kind:'subpage-choice-revisit'});
 }
 await navigate({stored:'de',path:'/index-ja.html',expected:'ja',kind:'shared-language-link'});
 await navigate({reset:false,browser:'uk-UA',expected:'de',kind:'shared-link-keeps-preference'});
 await navigate({blocked:true,browser:'en-US',expected:'en',kind:'cookie-only-before'});
 await evaluate(`document.querySelector('[data-cookie-essential]')?.click();document.querySelector('[data-project-language],#site-language').value='uk';document.querySelector('[data-project-language],#site-language').dispatchEvent(new Event('change',{bubbles:true}));`);
 await navigate({blocked:true,reset:false,browser:'de-DE',expected:'uk',kind:'cookie-only-revisit'});
 await navigate({stored:'ru',browser:'uk-UA',expected:'ru',kind:'before-polish-link'});
 await evaluate(`document.querySelector('[data-cookie-essential]')?.click();document.querySelector('a[data-language-link][lang="pl"]').click();`);
 let state;for(let n=0;n<60;n++){await delay(100);state=await evaluate(probe);if(state.ready==='complete'&&state.lang==='pl'&&state.loaded&&state.seo)break;}
 verify({expected:'pl',kind:'explicit-polish-link'},state);assert.equal(state.stored,'pl');
 await navigate({reset:false,browser:'de-DE',expected:'pl',kind:'polish-choice-revisit'});
 await mkdir('qa/artifacts/localization',{recursive:true});
 await writeFile('qa/artifacts/localization/language-selection-browser.json',JSON.stringify({recordedAt:new Date().toISOString(),result:'PASS',cases:results.length,languages:languages.length,results},null,2));
 console.log(JSON.stringify({result:'PASS',cases:results.length,languages:languages.length,scope:'Automatic selection on all page types; manual choices, revisits, URL precedence, disabled storage, metadata and RTL'}));
} finally {
 if(send&&socket?.readyState===WebSocket.OPEN)await Promise.race([send('Browser.close').catch(()=>{}),delay(1500)]);
 socket?.close();if(browser.exitCode===null)browser.kill();
}
