// Read-only language selection audit in an isolated browser profile.
import {spawn} from 'node:child_process';
import {mkdtemp,readFile,writeFile,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const profile=await mkdtemp(join(tmpdir(),'kova-language-audit-'));
const edge=process.env.KOVA_EDGE||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser=spawn(edge,['--headless=new','--disable-gpu','--disable-background-networking','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));let socket,send;
try {
 let port;for(let n=0;n<60&&!port;n++){try{port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split(/\r?\n/)[0]);}catch{await delay(100);}}
 if(!port)throw Error('Browser did not start');
 const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
 socket=new WebSocket(targets.find(x=>x.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 const pending=new Map();let id=0;socket.onmessage=e=>{const m=JSON.parse(e.data),p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.j(Error(m.error.message)):p.r(m.result);}};
 send=(method,params={})=>new Promise((r,j)=>{const n=++id;pending.set(n,{r,j});socket.send(JSON.stringify({id:n,method,params}));});
 await send('Page.enable');await send('Runtime.enable');
 const cases=[
  {site:'local',path:'/',browser:'de-DE',expected:'pl'},
  {site:'local',path:'/',browser:'uk-UA',expected:'pl'},
  {site:'local',path:'/',browser:'en-US',expected:'pl'},
  {site:'local',path:'/',browser:'ar-SA',expected:'pl'},
  {site:'local',path:'/',browser:'uk-UA',stored:'de',expected:'pl'},
  {site:'local',path:'/?lang=de',browser:'uk-UA',expected:'de'},
  {site:'local',path:'/index-uk.html',browser:'de-DE',expected:'uk'},
  {site:'local',path:'/contact.html',browser:'uk-UA',expected:'pl'},
  {site:'local',path:'/privacy.html',browser:'de-DE',expected:'pl'},
  {site:'live',path:'/',browser:'en-US',expected:'en'},
  {site:'live',path:'/',browser:'ru-RU',expected:'ru'},
  {site:'live',path:'/',browser:'uk-UA',expected:'pl'},
  {site:'live',path:'/',browser:'de-DE',expected:'pl'},
  {site:'live',path:'/',browser:'en-US',stored:'ru',expected:'ru'}
 ];
 const results=[];let injected;
 for(const c of cases) {
  if(injected)await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:injected});
  const origin=c.site==='local'?'http://127.0.0.1:4174':'https://kovacompass.app';
  await send('Storage.clearDataForOrigin',{origin,storageTypes:'all'});
  const setup=`Object.defineProperty(Navigator.prototype,'language',{get:()=>${JSON.stringify(c.browser)}});Object.defineProperty(Navigator.prototype,'languages',{get:()=>[${JSON.stringify(c.browser)}]});try {localStorage.clear();${c.stored?`localStorage.setItem('kova_site_language',${JSON.stringify(c.stored)});`:''}}catch{}`;
  injected=(await send('Page.addScriptToEvaluateOnNewDocument',{source:setup})).identifier;
  await send('Page.navigate',{url:origin+c.path});
  let state;
  for(let n=0;n<25;n++) {
   await delay(400);
   const r=await send('Runtime.evaluate',{returnByValue:true,expression:`({ready:document.readyState,lang:document.documentElement.lang,browser:navigator.language,url:location.href,options:[...document.querySelectorAll('select option')].map(o=>o.value),staticLanguage:document.documentElement.dataset.staticLanguage})`});state=r.result.value;
   if(state?.ready==='complete' && state?.options?.length && n>=2)break;
  }
  const result={...c,...state,passed:state.lang===c.expected};results.push(result);console.log(JSON.stringify(result));
 }
 await mkdir('qa/artifacts/localization',{recursive:true});
 await writeFile('qa/artifacts/localization/language-detection-audit.json',JSON.stringify({recordedAt:new Date().toISOString(),behaviorChanged:false,results},null,2));
 console.log(JSON.stringify({cases:results.length,matchedExpectedBehavior:results.filter(r=>r.passed).length,behaviorChanged:false}));
} finally {
 if(send&&socket?.readyState===WebSocket.OPEN)await Promise.race([send('Browser.close').catch(()=>{}),delay(1500)]);
 socket?.close();if(browser.exitCode===null)browser.kill();
}
