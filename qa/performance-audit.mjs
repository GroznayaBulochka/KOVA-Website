import {browserSession,delay} from './browser-session.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const label=process.argv[2]||'after',out=resolve('qa/artifacts/audit-2026-10-24');await mkdir(out,{recursive:true});
const b=await browserSession(),runs=[];
try{
 await b.send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await b.send('Network.setCacheDisabled',{cacheDisabled:true});
 await b.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1_600_000/8,uploadThroughput:750_000/8,connectionType:'cellular4g'});
 await b.send('Emulation.setCPUThrottlingRate',{rate:4});
 await b.send('Page.addScriptToEvaluateOnNewDocument',{source:`window.__perf={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__perf.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__perf.cls+=e.value}).observe({type:'layout-shift',buffered:true});document.cookie='kova_cookie_consent_v2=essential; Path=/';`});
 for(let i=0;i<3;i++){
  await b.send('Network.clearBrowserCache');await b.send('Storage.clearDataForOrigin',{origin:'http://127.0.0.1:4174',storageTypes:'all'});
  await b.navigate('http://127.0.0.1:4174/index-en.html?lang=en','document.readyState==="complete"&&Boolean(window.KOVA_ANALYTICS)&&Boolean(document.querySelector(".language-trigger"))');
  await delay(1500);
  runs.push(await b.evaluate(`(()=>{const n=performance.getEntriesByType('navigation')[0],r=performance.getEntriesByType('resource');return {...window.__perf,fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,domContentLoaded:n.domContentLoadedEventEnd,load:n.loadEventEnd,transferBytes:n.transferSize+r.reduce((sum,e)=>sum+e.transferSize,0),resources:r.length,viewport:{width:innerWidth,height:innerHeight},userAgent:navigator.userAgent}})()`));
  console.log(JSON.stringify({label,run:i+1,...runs.at(-1)}));
 }
 const median=key=>runs.map(r=>r[key]).sort((a,b)=>a-b)[1];
 const report={label,measuredAt:new Date().toISOString(),environment:'Isolated headless Edge on Windows; local HTTP static preview; cold browser cache; 390x844; simulated 150ms latency / 1.6Mbps down / 750Kbps up / 4x CPU slowdown; EN; analytics rejected; three runs. Not Lighthouse or field/Core Web Vitals data.',runs,median:Object.fromEntries(['lcp','cls','fcp','domContentLoaded','load','transferBytes','resources'].map(k=>[k,median(k)]))};
 await writeFile(resolve(out,`performance-${label}.json`),JSON.stringify(report,null,2));
}finally{await b.close();}
