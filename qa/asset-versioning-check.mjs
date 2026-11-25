import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {buildVersion,versionReferences,sha256} from '../scripts/asset-versioning.mjs';
import {verifyDeployment} from '../scripts/verify-deployment.mjs';
const root=new URL('../dist/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('build-manifest.json',root),'utf8'));
let checks=0;const check=(label,fn)=>{try{fn();checks++;}catch(e){throw Error(label+': '+e.message);}};
check('Version includes changed content and is independent of traversal order',()=>{
 const a=[['a','old'],['b','copy']];assert.equal(buildVersion(a),buildVersion([...a].reverse()));
 assert.notEqual(buildVersion(a),buildVersion([['a','new'],['b','copy']]));
});
check('Versioning preserves fragments, descriptors and excludes navigation',()=>{
 const source='<img srcset="assets/a.webp 360w, assets/b.webp 720w"><use href="assets/icons.svg#lock"><a href="index-en.html#plans">';
 const transformed=versionReferences(source,new Set(['assets/a.webp','assets/b.webp','assets/icons.svg']),'123');
 assert.ok(transformed.includes('assets/a.webp?v=123 360w'));assert.ok(transformed.includes('assets/b.webp?v=123 720w'));
 assert.ok(transformed.includes('assets/icons.svg?v=123#lock'));assert.ok(transformed.includes('index-en.html#plans'));
 assert.equal(versionReferences(transformed,new Set(['assets/a.webp','assets/b.webp','assets/icons.svg']),'123'),transformed);
});
for(const pin of manifest.files){
 const bytes=await readFile(new URL(pin.path,root));
 check(pin.path+': manifest matches final output',()=>assert.equal(sha256(bytes),pin.sha256));
 if(pin.path.endsWith('.html'))check(pin.path+': static and deferred resources use the build version',()=>{
  const html=bytes.toString();assert.ok(html.includes(`<meta name="kova-build" content="${manifest.version}">`));
  assert.match(html,/<body\b[^>]*><!--email_off-->/);
  assert.match(html,/<!--\/email_off--><\/body>/);
  for(const [,path] of html.matchAll(/(?:src|href|data-lightbox)="([^"]+)"/g)){
   if(/^(?:https?:|mailto:|#)/.test(path)||path.split(/[?#]/)[0].endsWith('.html')||path.startsWith('/'))continue;
   assert.ok(new URL(path,'https://example.test').searchParams.get('v')===manifest.version,path);
  }
  const scripts=JSON.parse(/id="kova-runtime-scripts">([^<]+)</.exec(html)[1]);
  assert.ok(scripts.every(path=>new URL(path,'https://example.test').searchParams.get('v')===manifest.version));
 });
}
// Simulate a CDN that serves the right manifest but stale/missing page assets.
const files=manifest.files.filter(p=>['index.html','index-en.html','landing.css','locales/uk.json'].includes(p.path));
const sample={...manifest,files},fixture=new Map(await Promise.all(files.map(async p=>[p.path,await readFile(new URL(p.path,root))])));
fixture.set('build-manifest.json',Buffer.from(JSON.stringify(sample,null,2)+'\n'));
let stale=null,missing=null;
const request=async url=>{
 const path=url.pathname==='/'?'index.html':url.pathname.slice(1);
 const bytes=path===missing?null:path===stale?Buffer.from('old cached response'):fixture.get(path);
 return new Response(bytes||'missing',{status:bytes?200:404,headers:{'Cache-Control':'no-cache'}});
};
let report=await verifyDeployment('https://example.test',sample,{request});
check('Complete deployment passes',()=>assert.equal(report.result,'PASS'));
const originalIndex=fixture.get('index.html');
const edgeIndex=originalIndex.toString().replace('<!--email_off-->','').replace('<!--/email_off-->','');
fixture.set('index.html',Buffer.from(edgeIndex));
report=await verifyDeployment('https://example.test',sample,{request});
check('Consumed email-protection comments preserve the exact original hash',()=>assert.equal(report.result,'PASS'));
fixture.set('index.html',Buffer.from(edgeIndex.replace('mailto:contact@','mailto:other@')));
report=await verifyDeployment('https://example.test',sample,{request});
check('Even one changed mail recipient on the live site fails verification',()=>assert.equal(report.result,'FAIL'));
fixture.set('index.html',originalIndex);
stale='landing.css';report=await verifyDeployment('https://example.test',sample,{request});
check('Mixed cached CSS fails despite a current manifest',()=>{assert.equal(report.result,'FAIL');assert.ok(report.failures.some(f=>f.path===stale));});
stale=null;missing='index-en.html';report=await verifyDeployment('https://example.test',sample,{request});
check('Missing language page fails',()=>{assert.equal(report.result,'FAIL');assert.ok(report.failures.some(f=>f.path===missing&&f.status===404));});
missing='build-manifest.json';report=await verifyDeployment('https://example.test',sample,{request});
check('Raw repository publication fails immediately',()=>{assert.equal(report.result,'FAIL');assert.equal(report.checks.length,1);});
missing=null;
let calls=0;
report=await verifyDeployment('https://example.test',sample,{pause:async()=>{},request:async url=>{
 if(url.pathname==='/build-manifest.json'&&++calls<3)return new Response('temporary outage',{status:503});
 return request(url);
}});
check('Transient CDN 503 retries and still verifies exact bytes',()=>{assert.equal(report.result,'PASS');assert.equal(report.checks[0].attempts,3);});
calls=0;
report=await verifyDeployment('https://example.test',sample,{pause:async()=>{},request:async()=>{calls++;return new Response('outage',{status:503});}});
check('Persistent CDN error remains a failure after three attempts',()=>{assert.equal(report.result,'FAIL');assert.equal(calls,3);assert.equal(report.failures[0].status,503);});
console.log(JSON.stringify({result:'PASS',checks,version:manifest.version}));
