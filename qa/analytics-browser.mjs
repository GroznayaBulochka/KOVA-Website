// Real browser, intercepted network. No request is delivered to Google or the domain.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,readFile,writeFile,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('..',import.meta.url));
const out=resolve(root,process.env.KOVA_ANALYTICS_QA_OUTPUT || 'qa/artifacts/analytics-2026-10-22');
await mkdir(out,{recursive:true});
const profile=await mkdtemp(join(tmpdir(),'kova-ga-test-'));
const edge=process.env.KOVA_EDGE || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser=spawn(edge,['--headless=new','--disable-gpu','--disable-background-networking','--no-first-run','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const origin='https://kovacompass.app';
const id='G-2LE3GWYDZM';
const checks=[], requests=[], errors=[], rejected=[];
let socket,send,blockTag=false,delayTag=false;
const csp=(await readFile(resolve(root,'dist/_headers'),'utf8')).match(/Content-Security-Policy: (.*)/)[1];
const mockTag=`(() => {
 window.__gaCalls = [];
 const consume = args => {
  const a = Array.from(args); window.__gaCalls.push(a);
  if (a[0] === 'config') {
   document.cookie='_ga=synthetic-test; Path=/; Secure; SameSite=Lax';
   document.cookie='_ga_2LE3GWYDZM=synthetic-session; Path=/; Secure; SameSite=Lax';
  }
  if(a[0] === 'event' && !window['ga-disable-G-2LE3GWYDZM']) fetch('https://www.google-analytics.com/g/collect?tid=G-2LE3GWYDZM&en='+encodeURIComponent(a[1]), {method:'POST'}).catch(()=>{});
 };
 const queued = window.dataLayer.slice(); window.dataLayer.push = consume; queued.forEach(consume);
})();`;
try {
 let port;
 for(let n=0;n<70&&!port;n++){try{port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split(/\r?\n/)[0]);}catch{await delay(100);}}
 assert.ok(port,'Browser startup');
 const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
 socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise((r,j)=>{socket.addEventListener('open',r,{once:true});socket.addEventListener('error',j,{once:true});});
 let seq=0;const waiting=new Map();
 send=(method,params={})=>new Promise((r,j)=>{const n=++seq;waiting.set(n,{r,j});socket.send(JSON.stringify({id:n,method,params}));});
 socket.addEventListener('message',async e=>{
  const m=JSON.parse(e.data);
  if(m.id&&waiting.has(m.id)){const w=waiting.get(m.id);waiting.delete(m.id);m.error?w.j(new Error(m.error.message)):w.r(m.result);return;}
  if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if(m.method!=='Fetch.requestPaused')return;
  const {requestId,request}=m.params; const url=new URL(request.url);
  const reply=(body,type='text/javascript',headers=[])=>send('Fetch.fulfillRequest',{requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:type},...headers],body:Buffer.from(body).toString('base64')});
  try {
   if(['kovacompass.app','www.kovacompass.app','127.0.0.1'].includes(url.hostname)){
    const name=url.pathname==='/'?'index.html':decodeURIComponent(url.pathname.slice(1));
    if(name.includes('..')||name.includes('\\'))throw new Error('Invalid path');
    let bytes;
    if(name==='workspace.html')bytes=Buffer.from('<!doctype html><html><body>Private test path<script src="site-consent.js"></script></body></html>');
    else bytes=await readFile(resolve(root,'dist',name));
    const type={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.md':'text/plain; charset=utf-8'}[extname(name)]||'application/octet-stream';
    await reply(bytes,type,[{name:'Content-Security-Policy',value:csp},{name:'Cache-Control',value:'no-store'}]);
   } else if(url.origin==='https://www.googletagmanager.com' && url.pathname==='/gtag/js' && url.searchParams.get('id')===id) {
    requests.push({type:'tag',url:request.url});
    if(blockTag)await send('Fetch.failRequest',{requestId,errorReason:'BlockedByClient'});else await reply(delayTag ? `setTimeout(() => { ${mockTag} }, 700);` : mockTag);
   } else if(url.origin==='https://www.google-analytics.com' && url.pathname==='/g/collect'){
    requests.push({type:'collect',url:request.url});await send('Fetch.fulfillRequest',{requestId,responseCode:204});
   } else {rejected.push(request.url);await send('Fetch.failRequest',{requestId,errorReason:'BlockedByClient'});}
  }catch(error){if(!url.pathname.endsWith('/favicon.ico'))errors.push(String(error));await send('Fetch.fulfillRequest',{requestId,responseCode:404});}
 });
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
 await send('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
 const until=async expression=>{for(let n=0;n<100;n++){if(await evaluate(expression))return;await delay(40);}throw new Error('Timed out: '+expression);};
 const navigate=async url=>{await send('Page.navigate',{url});await until('document.readyState === "complete" && Boolean(window.KOVA_ANALYTICS)');await delay(80);};
 const click=selector=>evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
 const record=(name,result)=>{assert.ok(result,name);checks.push(name);};
 const clear=()=>send('Network.clearBrowserCookies');
 const screenshot=async name=>{const s=await send('Page.captureScreenshot',{format:'png'});await writeFile(resolve(out,name+'.png'),Buffer.from(s.data,'base64'));};
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await clear(); await navigate(origin+'/index.html?lang=pl');
 record('First visit: zero Google requests, no GA cookies',requests.length===0 && await evaluate('!document.cookie.includes("_ga=")'));
 record('Compact accessible native modal with equal decision buttons',await evaluate(`(() => {const d=document.querySelector('[data-cookie-banner]'),r=d.getBoundingClientRect();const b=[...d.querySelectorAll('.consent-actions button')];return d.open&&d.matches(':modal')&&d.contains(document.activeElement)&&r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight&&r.width<=500&&getComputedStyle(b[0]).backgroundColor===getComputedStyle(b[1]).backgroundColor&&b.every(x=>x.offsetHeight>=44)})()`));
 await screenshot('consent-pl-desktop');
 // Background elements are actually inert, not only labelled aria-modal.
 record('Background cannot take focus while dialog is open',await evaluate(`document.querySelector('.language-trigger').focus(); document.querySelector('[data-cookie-banner]').contains(document.activeElement)`));
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 record('Escape rejects; no request and remembered essential choice',await evaluate('!document.querySelector("[data-cookie-banner]").open && document.cookie.includes("kova_cookie_consent_v2=essential")') && requests.length===0);
 await navigate(origin+'/contact.html?lang=en');
 record('Rejection remembered across public pages',await evaluate('!document.querySelector("[data-cookie-banner]").open')&&requests.length===0);
 await click('[data-cookie-settings]');
 record('Footer opens settings on a secondary page, analytics off',await evaluate('document.querySelector("[data-cookie-banner]").open && !document.querySelector("[data-cookie-analytics-toggle]").checked'));
 await click('[data-cookie-accept-all]');await until('Boolean(window.__gaCalls)');
 const calls=await evaluate('window.__gaCalls');
 record('Exactly one tag and manual page_view after consent',requests.filter(r=>r.type==='tag').length===1 && calls.filter(a=>a[0]==='event'&&a[1]==='page_view').length===1);
 record('Consent v2 defaults denied before analytics-only grant',calls[0][0]==='consent'&&calls[0][1]==='default'&&Object.values(calls[0][2]).every(v=>v==='denied')&&calls[1][2].analytics_storage==='granted'&&calls[1][2].ad_user_data==='denied'&&calls[1][2].ad_personalization==='denied');
 const config=calls.find(a=>a[0]==='config')[2];
 record('No signals/ads, fixed 180-day cookies and no automatic page_view',!config.allow_google_signals&&!config.allow_ad_personalization_signals&&!config.send_page_view&&config.cookie_expires===15552000&&!config.cookie_update);
 await click('[data-cookie-settings]');await click('[data-cookie-accept-all]');
 record('Repeated grant does not double load or double count',requests.filter(r=>r.type==='tag').length===1 && await evaluate('window.__gaCalls.filter(a=>a[0]==="event"&&a[1]==="page_view").length===1'));
 await evaluate('window.KOVA_ANALYTICS.track("contact_click")');
 record('Allowlisted engagement sent and arbitrary payload rejected',await evaluate('window.__gaCalls.some(a=>a[1]==="contact_click") && !window.KOVA_ANALYTICS.track("secret@example.com")'));
 await navigate(origin+'/index.html?lang=ru&email=synthetic%40invalid.test#private-synthetic');
 await until('Boolean(window.__gaCalls)');
 record('Remembered consent resumes, URL query/fragment/referrer excluded from our payload',await evaluate('!document.querySelector("[data-cookie-banner]").open && !JSON.stringify(window.__gaCalls).includes("synthetic") && window.__gaCalls.find(a=>a[0]==="config")[2].page_location==="https://kovacompass.app/" && window.__gaCalls.find(a=>a[0]==="config")[2].page_referrer===""'));
 await evaluate(`document.addEventListener('click',e=>{if(e.target.closest('a[href^="https:"]'))e.preventDefault();},true)`);
 await click('[data-primary-cta][data-cta-location="hero"]');
 await click('.footer-social a[href*="tiktok.com"]');
 record('One primary event and one social event per launch click; fixed channel categories only',await evaluate(`window.__gaCalls.filter(a=>a[0]==='event'&&a[1]==='primary_cta').length===1&&window.__gaCalls.filter(a=>a[0]==='event'&&a[1]==='social_click').length===2&&window.__gaCalls.some(a=>a[1]==='primary_cta'&&a[2].placement==='hero'&&a[2].action==='follow_launch')&&!JSON.stringify(window.__gaCalls).includes('instagram.com')`));
 await evaluate(`window.KOVA_RELEASE.available=true;window.KOVA_RELEASE.storeUrl='https://play.google.com/store/apps/details?id=com.kova.budget';document.documentElement.setAttribute('lang',document.documentElement.lang)`);
 await until(`document.querySelector('[data-primary-cta]').dataset.ctaAction==='google_play'`);
 await click('[data-primary-cta][data-cta-location="hero"]');
 record('Future Play CTA sends one allowlisted event without destination parameters',await evaluate(`window.__gaCalls.filter(a=>a[0]==='event'&&a[1]==='google_play_click').length===1&&!JSON.stringify(window.__gaCalls).includes('com.kova.budget')`));
 await evaluate(`window.KOVA_RELEASE.available=false;document.documentElement.setAttribute('lang',document.documentElement.lang)`);
 await click('[data-video-open]');await click('[data-video-play]');await click('[data-video-chapter="2"]');await click('[data-video-close]');await click('[data-lightbox]');await click('.lightbox button');await click('#faq summary');await delay(80);
 record('Real presentation, screenshot and FAQ interactions reach event adapter',await evaluate('["presentation_open","presentation_play","presentation_select","screenshot_open","faq_open"].every(n=>window.__gaCalls.some(a=>a[0]==="event"&&a[1]===n))'));
 await click('[data-cookie-settings]');await click('[data-cookie-essential]');
 await until('document.readyState === "complete" && document.cookie.includes("kova_cookie_consent_v2=essential") && !document.querySelector("[data-kova-google-tag]") && !window.__gaCalls');
 const afterRevoke=requests.length;await delay(250);
 record('Withdrawal unloads tag, removes GA cookies and stops further requests',await evaluate('!document.cookie.includes("_ga=")&&!document.cookie.includes("_ga_2LE3GWYDZM=")&&!window.KOVA_ANALYTICS.track("contact_click")')&&requests.length===afterRevoke);
 await clear();delayTag=true;await navigate(origin+'/index.html');
 await click('[data-cookie-accept-all]');await click('[data-cookie-settings]');await click('[data-cookie-essential]');
 await until('document.readyState === "complete" && document.cookie.includes("kova_cookie_consent_v2=essential") && !document.querySelector("[data-kova-google-tag]")');
 await delay(800);
 record('Withdrawal before delayed initialization cancels future callbacks',await evaluate('!window.__gaCalls&&!document.cookie.includes("_ga=")'));
 delayTag=false;
 await click('[data-cookie-settings]');await click('[data-cookie-accept-all]');await until('Boolean(window.__gaCalls)');
 await send('Network.setCookie',{name:'kova_cookie_consent_v2',value:'essential',url:origin,path:'/'});
 await evaluate('window.__otherConsentChannel = new BroadcastChannel("kova-consent-v2"); window.__otherConsentChannel.postMessage("changed")');
 await until('document.readyState === "complete" && !window.__gaCalls && !document.querySelector("[data-kova-google-tag]")');
 record('External consent change reconciled over real BroadcastChannel',await evaluate('!window.KOVA_ANALYTICS.isEnabled()&&!document.cookie.includes("_ga=")'));
 const afterCrossTab=requests.length;
 await clear();await send('Network.setCookie',{name:'kova_cookie_consent',value:'analytics',url:origin});await navigate(origin+'/index.html');
 record('Legacy local-counter consent cannot authorize Google',await evaluate('document.querySelector("[data-cookie-banner]").open && !document.querySelector("[data-kova-google-tag]")')&&requests.length===afterCrossTab);
 for(const language of ['pl','en','ru']){
  await clear();await send('Emulation.setDeviceMetricsOverride',{width:320,height:700,deviceScaleFactor:1,mobile:true});
  await navigate(origin+'/index.html?lang='+language);
  record(language+': narrow modal fits, scrolls and decisions have accessible labels',await evaluate(`(() => {const d=document.querySelector('[data-cookie-banner]'),r=d.getBoundingClientRect();return d.open&&r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight+1&&d.scrollHeight>=d.clientHeight&&[...d.querySelectorAll('.consent-actions button')].every(b=>b.innerText.trim()&&b.offsetHeight>=44)&&document.documentElement.lang==='${language}'})()`));
  await screenshot('consent-'+language+'-mobile');
  await click('[data-cookie-preferences-toggle]');
  record(language+': preference off by default, save rejection works',await evaluate('!document.querySelector("[data-cookie-analytics-toggle]").checked'));
  await click('[data-cookie-save]');
 }
 await clear();await navigate(origin+'/cookies.html?lang=pl');
 record('Cookie disclosure readable without consent and links to Google',await evaluate('!document.querySelector("[data-cookie-banner]").open && document.querySelector("[data-doc-lang=pl]").innerText.includes("G-2LE3GWYDZM")'));
 await click('[data-cookie-settings]');
 record('Settings also available on disclosure page',await evaluate('document.querySelector("[data-cookie-banner]").open'));
 await click('[data-cookie-essential]');
 await clear();
 const blocked=await send('Page.addScriptToEvaluateOnNewDocument',{source:`Object.defineProperty(Document.prototype,'cookie',{get(){return ''},set(){}});Storage.prototype.getItem=function(){throw Error('blocked')};Storage.prototype.setItem=function(){throw Error('blocked')};`});
 await navigate(origin+'/index.html');const beforeBlocked=requests.length;await click('[data-cookie-accept-all]');
 record('Blocked cookie/localStorage: usable site, analytics fail closed',await evaluate('!document.querySelector("[data-cookie-banner]").open && !window.KOVA_ANALYTICS.isEnabled()')&&requests.length===beforeBlocked);
 await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:blocked.identifier});
 await clear();blockTag=true;await navigate(origin+'/index.html');await click('[data-cookie-accept-all]');await delay(250);
 record('Tag blocked: no retry loop, presentation still opens',await evaluate('document.querySelector("[data-video-open]").click(); document.querySelector("[data-video-dialog]").open && window["ga-disable-G-2LE3GWYDZM"]===true'));
 blockTag=false;await clear();
 await evaluate('localStorage.setItem("kova_site_language","pl")');
 const beforeLocalized=requests.length;await navigate(origin+'/index-en.html');
 record('Direct EN URL wins over stored PL; no Google request without consent',await evaluate('document.documentElement.lang==="en" && document.querySelector("link[rel=canonical]").href==="https://kovacompass.app/index-en.html" && document.querySelector("[data-cookie-banner]").open')&&requests.length===beforeLocalized);
 await click('[data-cookie-essential]');await navigate(origin+'/contact-ru.html');
 record('Rejection survives localized RU navigation',await evaluate('document.documentElement.lang==="ru"&&!document.querySelector("[data-cookie-banner]").open')&&requests.length===beforeLocalized);
 await click('[data-cookie-settings]');await click('[data-cookie-accept-all]');await until('Boolean(window.__gaCalls)');
 record('Localized route consent permits the adapter, preserving sanitized page and RU',await evaluate('window.__gaCalls.some(a=>a[0]==="event"&&a[1]==="page_view"&&a[2].language==="ru"&&a[2].page_location==="https://kovacompass.app/contact.html")'));
 await clear();await navigate('http://127.0.0.1/index.html');const beforeLocal=requests.length;await click('[data-cookie-accept-all]');
 record('Local preview never loads Google even after acceptance',await evaluate('!window.KOVA_ANALYTICS.isEnabled()&&!document.querySelector("[data-kova-google-tag]")')&&requests.length===beforeLocal);
 await send('Page.navigate',{url:origin+'/workspace.html'});await delay(300);
 record('Private path guarded even if consent script is injected',await evaluate('!window.KOVA_ANALYTICS&&!document.querySelector("[data-kova-google-tag]")'));
 const beforeNoScript=requests.length;
 await send('Emulation.setScriptExecutionDisabled',{value:true});
 for(const [path,language,heading] of [['index-en.html','en','spending'],['index-ru.html','ru','расходы'],['privacy-en.html','en','DRAFT']]){
  await send('Page.navigate',{url:origin+'/'+path});
  await until('document.readyState === "complete" && document.documentElement.lang === '+JSON.stringify(language));
  record(path+': browser without JavaScript has translated content, metadata and crawlable alternatives',await evaluate(`!window.KOVA_ROUTES && !window.KOVA_ANALYTICS && document.querySelector('h1').innerText.toLowerCase().includes(${JSON.stringify(heading.toLowerCase())}) && document.querySelector('link[rel="canonical"]').href===${JSON.stringify(origin+'/'+path)} && document.querySelectorAll('[data-language-link]').length===27 && document.querySelector('main').innerText.length>1000`)&&requests.length===beforeNoScript);
  if(path==='index-en.html')await screenshot('no-javascript-en');
 }
 await send('Emulation.setScriptExecutionDisabled',{value:false});
 record('No unexpected external URL, no runtime errors',rejected.length===0&&errors.length===0);
 const inputs={};for(const f of ['site-consent.js','site-ui.css','site-seo.js','dist/_headers'])inputs[f]=createHash('sha256').update(await readFile(resolve(root,f))).digest('hex');
 const report={recordedAt:new Date().toISOString(),result:'PASS',checks:checks.length,passed:checks,requestsIntercepted:requests,errors,rejected,inputs,scope:'Real Edge DOM/CSP/consent; Google tag and collector mocked. No live GA/backend verification; no deployment.'};
 await writeFile(resolve(out,'browser.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({result:'PASS',checks:checks.length,report:resolve(out,'browser.json')}));
}catch(e){await writeFile(resolve(out,'browser-failure.json'),JSON.stringify({checks,requests,errors,rejected,failure:String(e)},null,2));throw e;}
finally{if(send&&socket?.readyState===WebSocket.OPEN)await Promise.race([send('Browser.close').catch(()=>{}),delay(1500)]);socket?.close();if(browser.exitCode===null)browser.kill();}
