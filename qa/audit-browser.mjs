import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {browserSession,delay} from './browser-session.mjs';
const out=resolve('qa/artifacts/audit-2026-10-24');await mkdir(out,{recursive:true});
const b=await browserSession(),checks=[],errors=[],requests=[];
const record=(name,value)=>{assert.ok(value,name);checks.push(name);};
b.on(m=>{if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);if(m.method==='Network.requestWillBeSent')requests.push(m.params.request.url);});
const ready=lang=>`document.readyState==='complete'&&Boolean(window.KOVA_ANALYTICS)&&Boolean(document.querySelector('.language-trigger'))&&document.documentElement.lang==='${lang}'`;
try{
 await b.send('Page.addScriptToEvaluateOnNewDocument',{source:"document.cookie='kova_cookie_consent_v2=essential; Path=/';"});
 await b.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 for(const [lang,width,height] of [['pl',360,800],['pl',390,844],['en',390,844],['en',768,1024],['pl',1440,1000],['en',1440,1000],['de',360,800],['ar',360,800],['pnb',360,800]]){
  const name=`${lang}-${width}`;const before=requests.length;
  await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700});
  await b.navigate(`http://127.0.0.1:4174/index${lang==='pl'?'':'-'+lang}.html?lang=${lang}`,ready(lang));await delay(150);
  const initial=await b.evaluate(`(()=>{const c=document.querySelector('[data-primary-cta]'),r=c.getBoundingClientRect();return {layout:document.documentElement.scrollWidth===document.documentElement.clientWidth,ctaVisible:r.top>=0&&r.bottom<=innerHeight,cta:c.href,action:c.dataset.ctaAction,model:document.querySelector('#plans').innerText,privacy:document.querySelector('.hero-privacy').innerText,reduced:getComputedStyle(document.documentElement).scrollBehavior==='auto',broken:[...document.images].filter(i=>i.complete&&i.getAttribute('src')&&!i.naturalWidth).length}})()`);
  record(name+': no page overflow',initial.layout);record(name+': launch CTA visible and correct',initial.ctaVisible&&initial.cta==='https://www.instagram.com/kova_money/'&&initial.action==='follow_launch');
  record(name+': Free/Premium and privacy rendered',initial.model.includes('Premium')&&initial.privacy.length>5);record(name+': reduced motion and intact images',initial.reduced&&initial.broken===0);
  record(name+': no all-language bundle or unrelated locale',requests.slice(before).every(url=>!url.endsWith('/translations.js')&&(!url.includes('/locales/')||url.endsWith('/'+lang+'.json'))));
  await b.screenshot(resolve(out,`home-${name}.png`));
  await b.evaluate(`document.querySelector('.scenario-screen').focus();document.querySelector('.scenario-screen').click()`);
  const first=await b.evaluate(`document.querySelector('.lightbox img').src`);
  await b.key('ArrowRight');
  record(name+': gallery keyboard navigation uses original captures',await b.evaluate(`document.querySelector('.lightbox').open&&document.querySelector('.lightbox img').src!==${JSON.stringify(first)}&&document.querySelector('.lightbox img').src.endsWith('.png')`));
  await b.key('Escape','Escape',27);
  record(name+': gallery Escape restores focus',await b.evaluate(`!document.querySelector('.lightbox').open&&document.activeElement===document.querySelector('.scenario-screen')`));
  await b.evaluate(`document.querySelector('[data-video-open]').focus();document.querySelector('[data-video-open]').click()`);
  await b.key('End','End',35);
  record(name+': presentation keyboard and active chapter',await b.evaluate(`document.querySelector('[data-video-counter]').textContent==='8 / 8'&&document.querySelectorAll('[data-video-chapter][aria-current="step"]').length===1`));
  record(name+': small-screen presentation controls fit',await b.evaluate(`Array.from(document.querySelectorAll('.video-controls button')).every(n=>{const r=n.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth&&r.height>=44})`));
  await b.key('Escape','Escape',27);
  record(name+': presentation Escape restores focus',await b.evaluate(`!document.querySelector('[data-video-dialog]').open&&document.activeElement===document.querySelector('[data-video-open]')`));
  await b.evaluate(`document.querySelector('.language-trigger').click()`);await b.key('End','End',35);await b.key('Escape','Escape',27);
  record(name+': language keyboard closes and restores focus',await b.evaluate(`document.querySelector('.language-options').hidden&&document.activeElement===document.querySelector('.language-trigger')`));
  if(width<=1200){await b.evaluate(`document.querySelector('.public-menu').click()`);await b.key('Escape','Escape',27);record(name+': mobile menu Escape and focus',await b.evaluate(`document.querySelector('.public-menu').getAttribute('aria-expanded')==='false'&&document.activeElement===document.querySelector('.public-menu')`));}
  await b.evaluate(`document.querySelector('[data-primary-cta]').focus()`);await b.key('Tab','Tab',9);
  record(name+': keyboard focus visible',await b.evaluate(`parseFloat(getComputedStyle(document.activeElement).outlineWidth)>=2`));
  if(['pl-1440','en-1440','en-390'].includes(name)){
   await b.evaluate(`document.activeElement?.blur();document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager');Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>i.decode().catch(()=>{})))`);
   await b.evaluate(`window.scrollTo({top:0,behavior:'instant'})`);
   await b.screenshot(resolve(out,`full-${name}.png`),true);
  }
 }
 await b.send('Network.setBlockedURLs',{urls:['*locales/uk.json']});
 await b.evaluate(`localStorage.setItem('kova_site_language','uk')`);
 await b.navigate('http://127.0.0.1:4174/index-uk.html?lang=uk',ready('en'));
 record('Locale failure: interactive English fallback and manual preference preserved',await b.evaluate(`Boolean(document.querySelector('[data-locale-error]'))&&localStorage.getItem('kova_site_language')==='uk'&&Boolean(window.KOVA_ANALYTICS)`));
 await b.send('Network.setBlockedURLs',{urls:[]});
 await b.evaluate(`(()=>{const s=document.querySelector('#site-language');s.value='uk';s.dispatchEvent(new Event('change',{bubbles:true}));})()`);await b.until(`document.documentElement.lang==='uk'&&document.querySelector('#site-language').value==='uk'`);
 record('Locale can be retried after a loading failure',await b.evaluate(`document.querySelector('#plans').innerText.includes('Premium')`));
 await b.evaluate(`(()=>{const s=document.querySelector('#site-language');s.value='ja';s.dispatchEvent(new Event('change',{bubbles:true}));s.value='vi';s.dispatchEvent(new Event('change',{bubbles:true}));})()`);await b.until(`document.documentElement.lang==='vi'&&document.querySelector('#site-language').value==='vi'`);await delay(250);
 record('Rapid manual choices keep the latest locale',await b.evaluate(`document.documentElement.lang==='vi'&&localStorage.getItem('kova_site_language')==='vi'`));
 record('No new runtime errors or external requests',errors.length===0&&requests.every(url=>!/^https?:/.test(url)||url.startsWith('http://127.0.0.1:4174/')));
 const report={result:'PASS',checks:checks.length,passed:checks,errors,published:false,scope:'Headless Edge; real DOM, native keyboard, isolated profiles. No physical phone or human screen-reader certification.'};
 await writeFile(resolve(out,'browser.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({result:'PASS',checks:checks.length}));
}catch(error){await writeFile(resolve(out,'browser-failure.json'),JSON.stringify({checks,errors,failure:String(error)},null,2));throw error;}finally{await b.close();}
