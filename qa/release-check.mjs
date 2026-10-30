import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import {publicationBlockers} from '../scripts/publication-policy.mjs';
import {websiteLegalDraft} from '../scripts/current-website-legal.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
const read=name=>readFile(resolve(root,name),'utf8');
const config=JSON.parse(await read('release-config.json'));
const origin=process.env.KOVA_PUBLIC_ORIGIN || 'http://127.0.0.1:4174';
const passed=[];
const check=(name,fn)=>{fn();passed.push(name);};
check('Website publication approved; downloads and legal drafts remain prelaunch',()=>{
  assert.equal(config.publicationApproved,true);assert.equal(config.publicationProfile,'PRELAUNCH_WEBSITE');assert.equal(config.publicDownloadAvailable,false);assert.equal(config.legalApproved,false);assert.equal(config.legalState,'DRAFT_OWNER_INPUT_REQUIRED');
});
const productBlockers=publicationBlockers({...config,publicationProfile:'PRODUCT_LAUNCH'});
const negative={status:productBlockers.length?2:0};
check('Product launch remains gated separately from the approved website',()=>{assert.deepEqual(publicationBlockers(config),[]);assert.equal(negative.status,2);for(const key of ['operatorLegalQualified','legalApproved','supportContactOperationallyVerified'])assert.ok(productBlockers.includes(key));assert.equal(config.websiteAnalytics.enabled,false);});
const hosting=JSON.parse(await read(config.hostingVerificationEvidence));
const hostingHttp=JSON.parse(await read(hosting.httpEvidence));
await readFile(resolve(root,hosting.pagesSourceEvidence));
check('Hosting configuration evidence is distinct from publication approval',()=>{
 assert.equal(config.canonicalOrigin,'https://kovacompass.app');assert.equal(config.domainApprovedByOwner,true);assert.equal(config.hostingVerified,true);
 assert.equal(config.hostingVerificationScope,'PRE_DEPLOYMENT_CONFIGURATION');assert.equal(hosting.scope,config.hostingVerificationScope);
 assert.equal(hosting.origin,config.canonicalOrigin);assert.equal(hosting.result,'PASS');assert.equal(hosting.pagesSource,'GitHub Actions');assert.equal(hosting.sslMode,'Full (strict)');
 assert.equal(hosting.queryStringInCacheKey,true);assert.equal(hosting.htmlAndReleaseMetadataBypassEdgeCache,true);assert.equal(hosting.securityHeadersApplied,true);
 assert.equal(hostingHttp.result,'PASS');assert.equal(hostingHttp.failures.length,0);assert.equal(hostingHttp.checks.length,9);
 assert.equal(hosting.publicArtifactVerified,false);assert.equal(hosting.postDeploymentManifestVerificationRequired,true);
 assert.equal(config.publicPolicyUrl,config.canonicalOrigin+'/privacy.html?lang=en');assert.equal(config.publicTermsUrl,config.canonicalOrigin+'/terms.html?lang=en');assert.equal(config.publicationApproved,true);
});
check('Approved identity is distinct from legal qualification',()=>{assert.equal(config.contract,'KOVA_PHONE_LOCAL_FREEMIUM_V1');assert.equal(config.publisher,'Vadyslav Konohrai');assert.equal(config.supportEmail,'contact@kovacompass.app');assert.equal(config.operatorApproved,true);assert.equal(config.operatorLegalQualified,false);assert.equal(config.cloudAccountAvailable,false);});
const files=[];
async function walk(dir,prefix=''){for(const e of await readdir(dir,{withFileTypes:true})){const p=prefix+e.name;if(e.isDirectory())await walk(resolve(dir,e.name),p+'/');else files.push(p);}}
await walk(resolve(root,'dist'));
check('Private workspace, QA and obsolete imagery absent',()=>{
  for(const p of files) assert.ok(p==='assets/screenshots/kova-work-income.png'||!/^(?:workspace\.(?:html|js)|workspace-access\.js|qa\/|scripts\/|\.git|\.well-known)|^assets\/screenshots\/(?:kova-|free-v1-intro)/.test(p),p);
});
for(const page of files.filter(p=>p.endsWith('.html'))){
 const html=await read('dist/'+page);
 check(page+': preview noindex and no private entry',()=>{assert.match(html,/content="noindex,(?:no)?follow"/);assert.ok(!/href="workspace.html"/.test(html));assert.ok(!/play\.google\.com\/store\/apps/.test(html));});
}
const sitemap=await read('dist/sitemap.xml');
check('Preview sitemap advertises no draft URLs or invented security contact',()=>{assert.ok(!sitemap.includes('<loc>'));assert.ok(!files.includes('.well-known/security.txt'));});
const app=resolve(root,'../KOVA-App');
const capture=JSON.parse(await read(config.presentationEvidence));
const hash=b=>createHash('sha256').update(b).digest('hex');
const provenance=[];
for(const image of capture.screenshots){
 const actual=await readFile(resolve(root,'dist',image.asset));
 const original=await readFile(resolve(root,image.original));
 check(image.asset+': authentic dated screenshot bytes',()=>{assert.equal(hash(actual),hash(original));assert.equal(hash(actual),image.sha256);});
 provenance.push({...image,capture:'Android emulator',data:'synthetic'});
}
for(const kind of ['privacy-policy','terms-of-service'])for(const lang of ['pl','en','ru']){
 const name=kind+'-'+lang+'.md';
 const actual=await readFile(resolve(root,'dist/legal',name));
 const source=await readFile(resolve(app,'docs/release/local-freemium-legal',name));
 const expected=Buffer.from(await websiteLegalDraft(kind,lang,source.toString()));
 check(name+': app-based draft with explicit current package scope',()=>{assert.equal(hash(actual),hash(expected));assert.match(actual.toString(),/DRAFT|SZKIC|ЧЕРНОВИК/i);});
}
// Verify the served artifact, including direct requests that bypass all browser UI.
for(const path of ['/workspace.html','/workspace.js','/workspace-access.js','/.git/config','/qa/public-contract-check.mjs','/scripts/build-site.mjs','/.well-known/security.txt','/assets/screenshots/kova-profile.png','/assets/screenshots/free-v1-intro.png']){
 const response=await fetch(origin+path);
 check('Private/obsolete URL returns 404: '+path,()=>assert.equal(response.status,404));
}
const served=await fetch(origin+'/');
check('Public preview has security headers',()=>{assert.equal(served.status,200);assert.equal(served.headers.get('x-content-type-options'),'nosniff');assert.ok(served.headers.get('content-security-policy').includes("frame-ancestors 'none'"));});
const report={recordedAt:new Date().toISOString(),result:'PASS',checks:passed.length,passed,negativeReleaseExitCode:negative.status,provenance,published:false};
await writeFile(resolve(root,'qa/artifacts/content-refresh-2026-10-29/release-check.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({result:'PASS',checks:passed.length,negativeReleaseExitCode:negative.status}));
