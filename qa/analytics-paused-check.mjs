import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import vm from 'node:vm';
import {publicationBlockers} from '../scripts/publication-policy.mjs';
const read=n=>readFile(new URL('../'+n,import.meta.url),'utf8');
const source=await read('site-consent.js');
const config=JSON.parse(await read('release-config.json'));
assert.equal(config.websiteAnalytics.enabled,false);
assert.equal(config.websiteAnalytics.consentMode,'DISABLED_BY_OWNER');
assert.equal(config.analyticsReceiver,null);
// Exercise the actual build gate: a disabled service need not be qualified,
// but re-enabling it cannot silently inherit the waiver.
for(const enabled of [false,true,undefined]){
 const candidate={...config,publicationProfile:'PRODUCT_LAUNCH',websiteAnalytics:{...config.websiteAnalytics,enabled}};
 for(const key of ['operatorApproved','operatorLegalQualified','supportContactApproved','supportContactOperationallyVerified','domainApprovedByOwner','hostingVerified','legalApproved','publicationApproved'])candidate[key]=true;
 const missing=publicationBlockers(candidate);
 if(enabled===false)assert.deepEqual(missing,[]);else assert.ok(missing.includes('websiteAnalytics.accountConfigurationVerified'));
}
const checks=[];
for(const host of ['kovacompass.app','www.kovacompass.app','127.0.0.1'])for(const saved of ['', 'analytics','essential','invalid'])for(const blocked of [false,true]){
 const cookies=new Map(Object.entries({_ga:'synthetic',_ga_2LE3GWYDZM:'synthetic-session',_ga_OLD:'synthetic-old',kova_analytics_id:'old',kova_analytics_session:'old',kova_analytics_page_count:'old',kova_cookie_consent:'analytics',kova_cookie_consent_v2:saved,kova_cookie_notice:'old',kova_site_language:'uk',unrelated:'keep'}));
 const writes=[],listeners={};let resources=0;
 const unexpected=()=>{resources++;throw Error('Paused analytics must not load scripts, create a dialog, or send requests');};
 const document={hidden:false,addEventListener:(name,fn)=>{listeners[name]=fn;},createElement:unexpected,head:{append:unexpected},body:{append:unexpected}};
 Object.defineProperty(document,'cookie',{get(){if(blocked)throw Error('Storage blocked');return [...cookies].map(([k,v])=>`${k}=${v}`).join('; ');},set(value){if(blocked)throw Error('Storage blocked');writes.push(value);const name=value.split('=')[0];assert.match(value,/Max-Age=0/);assert.notEqual(name,'kova_site_language');cookies.delete(name);}});
 const window={KOVA_ROUTES:{parse:()=>({page:'index'})},dataLayer:[['old-event']],addEventListener:(name,fn)=>{listeners[name]=fn;}};
 const location={protocol:host==='127.0.0.1'?'http:':'https:',hostname:host,port:host==='127.0.0.1'?'4174':'',pathname:'/'};
 vm.runInNewContext(source,{window,document,location,fetch:unexpected,XMLHttpRequest:unexpected});
 assert.equal(window['ga-disable-G-2LE3GWYDZM'],true);
 assert.equal(window.KOVA_ANALYTICS.isEnabled(),false);
 assert.equal(window.KOVA_ANALYTICS.track('contact_click'),false);
 assert.equal(window.KOVA_ANALYTICS.paused,true);
 assert.equal(window.dataLayer.length,0);
 if(!blocked){assert.deepEqual([...cookies.keys()].sort(),['kova_site_language','unrelated']);cookies.set('_ga','recreated-by-old-tab');listeners.pageshow();assert.equal(cookies.has('_ga'),false);cookies.set('_ga','recreated-again');listeners.visibilitychange();assert.equal(cookies.has('_ga'),false);}
 assert.equal(resources,0);
 checks.push({host,previousConsent:saved,storageBlocked:blocked,pass:true});
}
const headers=await read('dist/_headers');
assert.match(headers,/script-src 'self';/);assert.match(headers,/connect-src 'self';/);
assert.doesNotMatch(headers,/googletagmanager|google-analytics|analytics\.google/);
const registry=JSON.parse(await read('language-registry.json'));
for(const lang of Object.keys(registry)){
 const file=`dist/cookies${lang==='pl'?'':'-'+lang}.html`,html=await read(file);
 assert.ok(html.includes(`data-doc-lang="${lang}"`));assert.ok(html.includes('2026-10-26'));
}
const report={result:'PASS',cases:checks.length,disclosureLanguages:Object.keys(registry).length,checks,scope:'Node VM runtime regression tests with simulated cookie storage; generated CSP and localized disclosure. Not a browser network capture.'};
await mkdir('qa/artifacts/analytics-paused-2026-10-26',{recursive:true});
await writeFile('qa/artifacts/analytics-paused-2026-10-26/runtime-tests.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({result:'PASS',cases:checks.length,disclosureLanguages:report.disclosureLanguages,scope:report.scope}));
