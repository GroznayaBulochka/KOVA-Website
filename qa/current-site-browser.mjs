// Fresh headless Chrome, local preview only. Never reuses the owner's browser
// profile, submits forms, opens Play, or permits an external page request.
import assert from 'node:assert/strict';import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {createRequire} from 'node:module';import {resolve} from 'node:path';import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url)),origin='http://127.0.0.1:4174';
const attempt=process.argv[2]||'browser';
if(!/^browser(?:-[0-9]+)?$/.test(attempt))throw Error('Bounded browser evidence label required');
const out=resolve(root,'qa/artifacts/content-refresh-2026-10-29',attempt);
try{await access(resolve(out,'result.json'));throw Error('Use a fresh browser evidence output');}catch(e){if(e.code!=='ENOENT')throw e;}
await mkdir(out,{recursive:true});
const require=createRequire('C:/Users/vlad2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/_kova.cjs');
const {chromium}=require('playwright');
const config=JSON.parse(await readFile(resolve(root,'release-config.json'),'utf8'));
assert.equal(config.presentationLanguage,'en');assert.equal(config.presentationScreens,9);
const languages=Object.keys(JSON.parse(await readFile(resolve(root,'language-registry.json'),'utf8')));
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--disable-background-networking','--disable-component-update','--no-default-browser-check']});
const context=await browser.newContext({viewport:{width:390,height:844},locale:'en-GB',reducedMotion:'reduce'});
const external=[],errors=[],requests=[],cases=[];
await context.route('**/*',async route=>{const u=new URL(route.request().url());if(['http:','https:'].includes(u.protocol)&&u.origin!==origin){external.push(u.origin+u.pathname);await route.abort();}else await route.continue();});
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
const layout=async()=>{
 const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,lang:document.documentElement.lang}));
 assert.ok(dimensions.scroll<=dimensions.width+1,JSON.stringify(dimensions));return dimensions;
};
const visibleImages=async()=>{const imgs=await page.locator('img:visible').evaluateAll(imgs=>imgs.filter(i=>i.getBoundingClientRect().bottom>=0&&i.getBoundingClientRect().top<=innerHeight).map(i=>({src:i.currentSrc||i.src,width:i.naturalWidth,complete:i.complete})));assert.ok(imgs.every(i=>i.complete&&i.width>0),JSON.stringify(imgs));};
try{
 for(const lang of languages){
  const width=lang==='en'?1440:lang==='pl'?360:390;
  await page.setViewportSize({width,height:lang==='en'?1000:844});
  const p='index'+(lang==='pl'?'':'-'+lang)+'.html?lang='+lang;
  const response=await page.goto(origin+'/'+p,{waitUntil:'networkidle'});assert.equal(response.status(),200);
  await page.waitForFunction(l=>document.documentElement.lang===l,lang);await page.locator('[data-i18n="plansTitle"]').waitFor();
  const d=await layout();await visibleImages();
  if(['en','pl','ar','ru','de','zh'].includes(lang))await page.screenshot({path:resolve(out,'home-'+lang+'.png')});
  await page.locator('#screens').scrollIntoViewIfNeeded();
  for(const image of await page.locator('#all-screens img').all()){
   await image.scrollIntoViewIfNeeded();
   await image.evaluate(async i=>{
    if(!i.complete)await Promise.race([new Promise((resolve,reject)=>{i.addEventListener('load',resolve,{once:true});i.addEventListener('error',reject,{once:true});}),new Promise((_,reject)=>setTimeout(()=>reject(Error('Lazy image timeout')),5000))]);
   });
  }
  await page.locator('#all-screens img').first().scrollIntoViewIfNeeded();
  // With srcset width descriptors Chrome density-corrects naturalWidth (e.g.
  // a360px file reports244 CSS pixels). Check decoding here, not raw-file pixel
  // dimensions; original and derivative file identity is separately SHA-verified.
  await page.waitForFunction(()=>[...document.querySelectorAll('#all-screens img')].every(i=>i.complete&&i.naturalWidth>0&&i.naturalHeight>0));
  assert.equal(await page.locator('#all-screens figure').count(),8);
  await layout();
  if(['en','pl'].includes(lang))await page.screenshot({path:resolve(out,'screens-'+lang+'.png')});
  await page.locator('[data-i18n="plansTitle"]').scrollIntoViewIfNeeded();
  assert.ok((await page.locator('[data-i18n="planPremiumThree"]').innerText()).length>5);
  assert.ok((await page.locator('[data-i18n="plansNote"]').innerText()).includes('Google Play'));
  await layout();if(['en','pl'].includes(lang))await page.screenshot({path:resolve(out,'plans-'+lang+'.png')});
  if(lang==='en'){
   await page.locator('#all-screens figure button').first().click();
   await page.locator('.lightbox[open]').waitFor();
   await page.waitForFunction(()=>{const i=document.querySelector('.lightbox img');return i.complete&&i.naturalWidth===1080;});
   await page.screenshot({path:resolve(out,'english-app-lightbox.png')});
   await page.keyboard.press('Escape');assert.equal(await page.locator('.lightbox[open]').count(),0);
   await page.locator('[data-video-open]').first().click();await page.locator('[data-video-dialog][open]').waitFor();
   for(let n=1;n<=8;n++){
    assert.equal((await page.locator('[data-video-counter]').innerText()).trim(),n+' / 8');
    await page.waitForFunction(()=>{const i=document.querySelector('[data-video-image]');return i.complete&&i.naturalWidth===1080;});
    if(n<8)await page.locator('[data-video-next]').click();
   }
   await page.keyboard.press('Escape');assert.equal(await page.locator('[data-video-dialog][open]').count(),0);
  }
  cases.push({page:'index',lang,width,status:'PASS',layout:d,gallery:8,trial:'Google Play qualified offer disclosure'});
  await writeFile(resolve(out,'progress.json'),JSON.stringify({cases,errors,external},null,2));
 }
 for(const lang of ['en','pl','ru'])for(const p of ['privacy','terms','contact']){
  await page.setViewportSize({width:360,height:800});
  const url=p+(lang==='pl'?'':'-'+lang)+'.html?lang='+lang;
  const response=await page.goto(origin+'/'+url,{waitUntil:'networkidle'});assert.equal(response.status(),200);await layout();
  const text=await page.locator('body').innerText();assert.ok(text.includes('contact@kovacompass.app'));
  if(p!=='contact'){assert.ok(/DRAFT|SZKIC|ЧЕРНОВИК/.test(text));assert.ok(!text.includes('OWNER_INPUT_REQUIRED'));}
  await page.screenshot({path:resolve(out,p+'-'+lang+'.png')});cases.push({page:p,lang,width:360,status:'PASS'});
 }
 assert.equal(external.length,0,'No website-initiated third-party requests permitted while analytics is owner-paused');
 assert.equal(errors.length,0,'No uncaught runtime errors');
 await writeFile(resolve(out,'result.json'),JSON.stringify({atUtc:new Date().toISOString(),status:'PASS',cases:cases.length,results:cases,externalRequests:external,uncaughtErrors:errors,localRequests:requests.length,published:false,scope:'Fresh local headless Chrome;27 home locales plus9 legal/contact views, real gallery/lightbox/tour interactions. Not human accessibility, live hosting or release approval.'},null,2));
 console.log(JSON.stringify({status:'PASS',browserCases:cases.length,languages:27,externalRequests:0,published:false}));
}catch(error){await page.screenshot({path:resolve(out,'failure.png')}).catch(()=>{});await writeFile(resolve(out,'failure.json'),JSON.stringify({atUtc:new Date().toISOString(),status:'FAIL',error:String(error),cases,errors,external},null,2));throw error;}
finally{await context.close();await browser.close();}
