import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {publicationBlockers} from '../scripts/publication-policy.mjs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {publicRelease} from '../scripts/release-data.mjs';
import {prepareRenderer,pages,languages,file,robots,sitemap} from '../scripts/seo.mjs';
const read=name=>readFile(new URL('../'+name,import.meta.url),'utf8');
const checks=[];const check=(label,fn)=>{fn();checks.push(label);};
const config=JSON.parse(await read('release-config.json'));
check('Current contract and honest availability',()=>{
 assert.equal(config.contract,'KOVA_PHONE_LOCAL_FREEMIUM_V1');assert.equal(config.productModel,'FREE_BASE_OPTIONAL_PREMIUM');
 assert.equal(config.publicDownloadAvailable,false);assert.equal(config.premium.price,null);assert.equal(config.premium.salesAvailable,false);
 assert.equal(config.publisher,'Vadyslav Konohrai');assert.equal(config.brand,'KOVA Development');
 assert.equal(publicRelease(config).available,false);
});
check('Unverified Play links cannot enable downloads',()=>{
 assert.throws(()=>publicRelease({...config,publicDownloadAvailable:true,storeUrl:'https://example.com'}));
 assert.throws(()=>publicRelease({...config,publicDownloadAvailable:true,storeUrl:'https://play.google.com/store/apps/details?id=com.kova.budget'}));
 assert.equal(publicRelease({...config,publicDownloadAvailable:true,storeListingVerified:true,storeUrl:'https://play.google.com/store/apps/details?id=com.kova.budget'}).available,true);
});
const pins=JSON.parse(await read('qa/artifacts/content-refresh-2026-10-29/app-source-pins.json'));
const legalPins=pins.artifacts.filter(p=>p.destination?.startsWith('legal/'));
assert.equal(legalPins.length,54);
for(const pin of legalPins){const path=pin.destination.replaceAll('\\','/');const data=await readFile(new URL('../'+path,import.meta.url));check(path+': current app-based website draft',()=>assert.equal(createHash('sha256').update(data).digest('hex'),pin.sha256));}
const render=await prepareRenderer(new URL('../',import.meta.url));
const output=new URL('artifacts/content-refresh-2026-10-29/production-samples/',import.meta.url);await mkdir(output,{recursive:true});
for(const language of languages){
 const html=await read('dist/'+file('index',language));
 check(language+': static Free/Premium and one clear launch action',()=>{
  assert.ok(html.includes('data-primary-cta'));assert.ok(html.includes('KOVA Premium'));
  assert.ok(!html.includes('<script src="translations.js"'));assert.ok(html.includes('runtime-bootstrap.js'));
  assert.ok(html.includes('srcset='));assert.ok(html.includes('data-i18n="heroPrivacy"'));
  assert.ok(html.includes('https://www.instagram.com/kova_money/'));
  assert.ok(!html.includes('data-i18n-alt="undefined"'));
 });
 for(const page of ['privacy','terms']){
  const legal=await read('dist/'+file(page,language));
  check(`${page}/${language}: human-readable draft, no broken document link`,()=>{assert.ok(!legal.includes('OWNER_INPUT_REQUIRED'));assert.ok(!legal.includes('href="#"'));});
 }
}
for(const [page,language] of [['index','pl'],['index','en'],['status','en'],['privacy','en'],['404','pl']]){
 const html=await render(await read(page+'.html'),page,language,config.canonicalOrigin,true);
 await writeFile(new URL(file(page,language),output),html);
 check(`${page}/${language}: production sample generated`,()=>{assert.ok(html.includes('rel="canonical"')||page==='404');assert.ok(html.includes('og:image'));assert.ok(!html.includes('OWNER_INPUT_REQUIRED'));});
}
await writeFile(new URL('robots.txt',output),robots(config.canonicalOrigin,true));await writeFile(new URL('sitemap.xml',output),sitemap(config.canonicalOrigin));
await writeFile(new URL('README.txt',output),'Verification samples only, not a deployable release. No approval flags were changed. Deploy only dist/ produced by the gated build:public command.\n');
const websiteBlockers=publicationBlockers(config);
const productBlockers=publicationBlockers({...config,publicationProfile:'PRODUCT_LAUNCH'});
check('Owner-approved prelaunch site can publish; product launch remains gated',()=>{assert.deepEqual(websiteBlockers,[]);assert.ok(productBlockers.includes('legalApproved'));assert.ok(productBlockers.includes('operatorLegalQualified'));assert.ok(productBlockers.includes('supportContactOperationallyVerified'));});
const report={result:'PASS',checks:checks.length,passed:checks,languages:languages.length,canonicalLegalDrafts:54,releaseBuild:{websiteBlockers,productBlockers},productionSamples:'Verification only; not deployed',published:false};
await writeFile(new URL('artifacts/content-refresh-2026-10-29/contracts.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify({result:'PASS',checks:checks.length,canonicalLegalDrafts:54,websiteReady:websiteBlockers.length===0,productLaunchBlocked:productBlockers.length>0}));
