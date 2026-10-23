import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {pages,languages,file,urlPath,prepareRenderer,sitemap,robots,noindexPages,seoLocales,hreflang} from '../scripts/seo.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
const read=name=>readFile(resolve(root,name),'utf8');
const origin=JSON.parse(await read('release-config.json')).canonicalOrigin;
const output=resolve(root,'qa/artifacts/seo-2026-10-22');await mkdir(output,{recursive:true});
const results=[],pins=[];let localReferences=0;
const check=(name,fn)=>{fn();results.push(name);};
const productionRenderer=await prepareRenderer(new URL('../',import.meta.url));
const titles=new Set(),descriptions=new Set();
const find=(html,pattern)=>{const m=pattern.exec(html);assert.ok(m,pattern.toString());return m[1];};
for(const page of pages)for(const lang of languages){
 const name=file(page,lang),html=await read('dist/'+name);
 pins.push({path:'dist/'+name,sha256:createHash('sha256').update(html).digest('hex')});
 check(name+': static localized HTML, metadata, reciprocal alternatives',()=>{
  assert.ok(html.includes(`<html lang="${lang}" data-static-language="${lang}"`));
  const title=find(html,/<title>([^<]+)<\/title>/);const description=find(html,/<meta name="description" content="([^"]+)"/);
  assert.ok(title.length>4&&title.length<=200);assert.ok(description.length>10&&description.length<=500);
  assert.ok(!titles.has(lang+title));titles.add(lang+title);assert.ok(!descriptions.has(lang+description));descriptions.add(lang+description);
  assert.equal((html.match(/<title>/g)||[]).length,1);assert.equal((html.match(/meta name="description"/g)||[]).length,1);
  assert.match(html,/<meta name="robots" content="noindex,follow">/);
  if(page!=='404'){
   assert.ok(html.includes(`<link rel="canonical" href="${origin+urlPath(page,lang)}">`));
   for(const l of languages)assert.ok(html.includes(`hreflang="${hreflang(l)}" href="${origin+urlPath(page,l)}"`));
   assert.ok(html.includes(`hreflang="x-default" href="${origin+urlPath(page,'pl')}"`));
  }else assert.ok(!html.includes('rel="canonical"'));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(html.includes(`property="og:url" content="${origin+urlPath(page,lang)}"`));
  assert.ok(html.includes('property="og:image:width" content="1200"'));
  assert.ok(html.includes(`property="og:locale" content="${seoLocales[lang].ogLocale}"`));
  assert.match(seoLocales[lang].ogLocale,/^[a-z]{2}_[A-Z]{2}$/);
  assert.equal((html.match(/property="og:locale:alternate"/g)||[]).length,languages.length-1);
  for(const l of languages.filter(l=>l!==lang)) assert.ok(html.includes(`property="og:locale:alternate" content="${seoLocales[l].ogLocale}"`));
  assert.ok(!html.includes(`property="og:locale:alternate" content="${seoLocales[lang].ogLocale}"`));
  assert.ok(!html.includes('PL / EN / RU'));
  const imageAlt=find(html,/<meta property="og:image:alt" content="([^"]+)"/);
  assert.ok(imageAlt.includes('KOVA') && imageAlt.length>20);
  assert.ok(html.includes(`name="twitter:image:alt" content="${imageAlt}"`));
  assert.ok(!/href="workspace.html"/.test(html));
  const schema=JSON.parse(find(html,/<script type="application\/ld\+json" id="kova-structured-data">([\s\S]*?)<\/script>/));
  assert.equal(schema['@context'],'https://schema.org');
  assert.ok(schema['@graph'].some(n=>n['@type']==='WebSite'&&n.name==='KOVA'));
  assert.ok(schema['@graph'].some(n=>n.url===origin+urlPath(page,lang)&&n.inLanguage===lang));
  assert.ok(!/aggregateRating|ratingValue|downloadUrl|offers|SearchAction/.test(JSON.stringify(schema)));
  assert.ok(!html.includes('rel="preconnect"'));
 });
 check(name+': visible content exists without JS',()=>{
  const main=find(html,/<main\b[^>]*>([\s\S]*?)<\/main>/);
  assert.ok(main.length>500);
  if(page==='index'){
   if(['pl','en','ru'].includes(lang)) assert.ok(main.includes({pl:'Wydatki',en:'Expenses',ru:'Расходы'}[lang]));
   assert.equal((main.match(/<details>/g)||[]).length,9);
  }else if(['privacy','terms'].includes(page)){
   assert.ok(main.includes('contact@kovacompass.app'));
   assert.ok((main.match(/<h2\b/g)||[]).length>=10);
   assert.ok(main.includes('aria-busy="false"'));
  }else if(page==='cookies'){
   assert.ok(new RegExp(`<section data-doc-lang="${lang}"[^>]*(?<! hidden)>`).test(main));
  }else assert.ok(main.includes('document-card')||page==='404');
  for(const l of languages)assert.ok(main.includes(`data-language-link hreflang="${l}" lang="${l}" href="${urlPath(page,l)}${l==='pl'?'?lang=pl':''}"`));
 });
 // Validate actual generated files, not only source templates.
 for(const [,reference] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  if(/^(?:mailto:|tel:|data:|#)/.test(reference))continue;
  const url=new URL(reference,origin+'/'+name);
  if(url.origin!==origin)continue;
  const target=resolve(root,'dist',url.pathname==='/'?'index.html':url.pathname.slice(1));
  await access(target);localReferences++;
 }
 // Production rendering is tested in memory, not by approving/publishing a release.
 const raw=await read(page+'.html');
 const production=await productionRenderer(raw,page,lang,origin,true);
 check(name+': production indexing policy is explicit',()=>{
  assert.ok(production.includes(`content="${noindexPages.has(page)?'noindex,follow':'index,follow,max-image-preview:large'}"`));
 });
}
check('Search locale mappings use distinct supported language/script tags',()=>{
 assert.equal(hreflang('uk'),'uk');assert.equal(hreflang('zh'),'zh-Hans');
 assert.equal(hreflang('yue'),'zh-Hant-HK');assert.equal(hreflang('pnb'),'pa-Arab-PK');
 assert.equal(new Set(languages.map(hreflang)).size,languages.length);
 for(const lang of languages) assert.match(hreflang(lang),/^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-[A-Z]{2})?$/);
});
const xml=sitemap(origin),urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
check('Production sitemap: unique canonical pages for all languages; no drafts/private/query aliases',()=>{
 const expected=pages.filter(p=>!noindexPages.has(p)).length*languages.length;assert.equal(urls.length,expected);assert.equal(new Set(urls).size,expected);
 for(const url of urls){assert.equal(new URL(url).origin,origin);assert.ok(!/\?|#|privacy|terms|cookies|404|workspace/.test(url));}
 for(const p of pages.filter(p=>!noindexPages.has(p)))for(const l of languages)assert.ok(urls.includes(origin+urlPath(p,l)));
});
check('Production robots allow crawling and reference the canonical sitemap',()=>{assert.ok(robots(origin,true).includes('Allow: /'));assert.ok(robots(origin,true).includes('Sitemap: '+origin+'/sitemap.xml'));});
const previewXml=await read('dist/sitemap.xml'),previewRobots=await read('dist/robots.txt'),headers=await read('dist/_headers');
check('Preview stays non-indexable and does not advertise draft pages',()=>{assert.ok(!previewXml.includes('<loc>'));assert.ok(previewRobots.includes('Disallow: /'));});
check('Raw legal draft sources also carry noindex in generated hosting headers',()=>{assert.match( /* exact server rule, not an HTML-only directive */ headers, /\/legal\/\*\s+X-Robots-Tag: noindex, nofollow/);});
const png=await readFile(resolve(root,'dist/assets/social/kova.png'));
check('Social image is an actual 1200 x 630 PNG',()=>{assert.equal(png.toString('hex',0,8),'89504e470d0a1a0a');assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);});
const routeContext={window:{KOVA_LANGUAGES:{codes:languages}},URL,location:{origin,pathname:'/',href:origin+'/'},document:{readyState:'loading',addEventListener(){}}};
vm.runInNewContext(await read('site-seo.js'),routeContext);
check('URL grammar: every localized page including numeric 404; no private or unknown routes',()=>{
 const routes=routeContext.window.KOVA_ROUTES;
 for(const p of pages)for(const l of languages){
  const route=routes.parse(urlPath(p,l));assert.equal(route?.page,p);assert.equal(route?.language,l);
  assert.equal(routes.localize(urlPath(p,l)+'?lang=pl#main','ru'),urlPath(p,'ru')+'#main');
 }
 for(const path of ['/workspace.html','/workspace-en.html','/foo.html','/4040.html','/private/index.html','/index-zz.html'])assert.equal(routes.parse(path),null);
 assert.equal(routes.localize('https://example.org/privacy.html','ru'),'https://example.org/privacy.html');
});
// Pin an inspection-only production sitemap outside deployable output.
await writeFile(resolve(output,'production-sitemap-example.xml'),xml);
await writeFile(resolve(output,'checks.json'),JSON.stringify({recordedAt:new Date().toISOString(),result:'PASS',checks:results.length,localReferences,passed:results,inputs:pins,published:false,productionRendering:'IN_MEMORY_ONLY',searchConsole:'NOT_RUN',liveIndexing:'NOT_VERIFIED'},null,2));
console.log(JSON.stringify({result:'PASS',checks:results.length,localReferences,localizedPages:pages.length*languages.length,indexableProductionUrls:pages.filter(p=>!noindexPages.has(p)).length*languages.length,report:resolve(output,'checks.json')}));
