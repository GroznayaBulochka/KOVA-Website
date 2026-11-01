// Read-only audit of deployed HTTP responses or the actual production artifact.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {pages,languages,file,urlPath,hreflang,noindexPages} from '../scripts/seo.mjs';
const origin=JSON.parse(await readFile('release-config.json','utf8')).canonicalOrigin;
const local=process.argv.includes('--local');
const output='qa/artifacts/theme-seo-2026-10-31';await mkdir(output,{recursive:true});
const report={checkedAt:new Date().toISOString(),target:local?'dist production artifact':origin,failures:[],warnings:[],pages:[],languages:{},searchConsole:'Not accessed; this checks crawlability, not Google index coverage.'};
const check=(ok,path,reason)=>{if(!ok)report.failures.push({path,reason});};
async function get(path){
 if(local){try{return {status:200,body:await readFile('dist/'+(path==='/'?'index.html':path.replace(/^\//,'')),'utf8'),robots:null};}catch{return {status:404,body:''};}}
 for(let attempt=1;attempt<=3;attempt++){
  try{
   const r=await fetch(new URL(path,origin),{headers:{'Cache-Control':'no-cache','User-Agent':'KOVA-indexing-audit/1.0'},signal:AbortSignal.timeout(20000)});
   const row={status:r.status,body:await r.text(),robots:r.headers.get('x-robots-tag'),challenge:r.headers.get('cf-mitigated'),url:r.url,attempt};
   if([429,500,502,503,504].includes(r.status)&&attempt<3){await new Promise(r=>setTimeout(r,attempt*750));continue;}
   return row;
  }catch(e){if(attempt===3)return {status:0,body:'',error:e.message};}
 }
}
const meta=(html,key)=>new RegExp(`<meta (?:name|property)="${key}" content="([^"]*)"`).exec(html)?.[1];
const robots=await get('/robots.txt'),sitemap=await get('/sitemap.xml');
check(robots.status===200,'robots.txt','HTTP 200 required');
check(!/^Disallow:\s*\/$/mi.test(robots.body),'robots.txt','Must not disallow the whole site');
check(robots.body.includes(`Sitemap: ${origin}/sitemap.xml`),'robots.txt','Canonical sitemap must be advertised');
const urls=[...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const expected=pages.filter(p=>!noindexPages.has(p)).flatMap(p=>languages.map(l=>origin+urlPath(p,l)));
check(sitemap.status===200&&urls.length===expected.length,'sitemap.xml','Expected 189 indexable URLs');
check(new Set(urls).size===urls.length,'sitemap.xml','Duplicate URLs');
for(const url of expected)check(urls.includes(url),'sitemap.xml','Missing '+url);
for(const url of urls)check(expected.includes(url),'sitemap.xml','Unexpected URL '+url);
const cases=pages.flatMap(page=>languages.map(lang=>({page,lang})));
for(let i=0;i<cases.length;i+=3){
 await Promise.all(cases.slice(i,i+3).map(async({page,lang})=>{
  const path=urlPath(page,lang),r=await get(path),html=r.body;
  const title=/<title>([^<]+)<\/title>/.exec(html)?.[1];
  const description=meta(html,'description'),directives=meta(html,'robots');
  const canonical=/<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  const alternatives=[...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  check(r.status===200||(page==='404'&&r.status===404),path,'Unexpected HTTP status '+r.status);
  check(!r.challenge,path,'CDN browser challenge');
  check(html.includes(`<html lang="${lang}"`),path,'Wrong HTML language');
  // Cookie templates also retain hidden translations for the no-build preview.
  const visibleHtml=html.replace(/<section\b[^>]*\bhidden\b[^>]*>[\s\S]*?<\/section>/g,'');
  check((visibleHtml.match(/<h1\b/g)||[]).length===1,path,'Expected one visible main heading');
  check((html.match(/<title>/g)||[]).length===1&&title?.length>4,path,'Missing or duplicate title');
  check(description?.length>10&&!/undefined|TODO|PLACEHOLDER/.test(description),path,'Incomplete description');
  check(!!directives&&(!noindexPages.has(page)?!directives.includes('noindex'):directives.includes('noindex')),path,'Incorrect indexing directive');
  if(!noindexPages.has(page))check(!/noindex|none/i.test(r.robots||''),path,'HTTP header blocks indexing');
  if(page!=='404'){
   check(canonical===origin+path,path,'Wrong canonical');
   check(alternatives.length===28,path,'Expected 27 alternate languages and x-default');
   for(const l of languages)check(alternatives.some(a=>a[1]===hreflang(l)&&a[2]===origin+urlPath(page,l)),path,'Missing reciprocal hreflang '+l);
   check(alternatives.some(a=>a[1]==='x-default'&&a[2]===origin+urlPath(page,'pl')),path,'Missing x-default');
  }
  for(const key of ['og:title','og:description','og:url','og:locale','og:image','twitter:card','twitter:title','twitter:description','twitter:image'])check(!!meta(html,key),path,'Missing '+key);
  check(meta(html,'og:title')===title&&meta(html,'twitter:title')===title,path,'Social title differs from SEO title');
  check(meta(html,'og:description')===description&&meta(html,'twitter:description')===description,path,'Social description differs from SEO description');
  try{
   const schema=JSON.parse(/id="kova-structured-data">([\s\S]*?)<\/script>/.exec(html)?.[1]||'null');
   check(schema?.['@graph']?.some(n=>n.inLanguage===lang&&n.url===origin+path),path,'Missing localized structured data');
  }catch{check(false,path,'Invalid structured data');}
  check(/<main\b[^>]*>[\s\S]{500,}<\/main>/.test(html),path,'Content absent from static HTML');
  check(!/<script[^>]+src="translations\.js/.test(html),path,'Shared translations bundle is still loaded');
  report.pages.push({page,lang,path,status:r.status,title,description,robots:directives,httpRobots:r.robots,canonical,alternates:alternatives.length,build:meta(html,'kova-build'),emailRewritten:html.includes('email-decode.min.js'),attempts:r.attempt||1});
 }));
}
for(const lang of languages){
 const rows=report.pages.filter(r=>r.lang===lang);
 check(new Set(rows.map(r=>r.title)).size===pages.length,lang,'Duplicate page titles within the language');
 check(new Set(rows.map(r=>r.description)).size===pages.length,lang,'Duplicate descriptions within the language');
 report.languages[lang]={pages:rows.length,indexable:rows.filter(r=>!noindexPages.has(r.page)).length,errors:report.failures.filter(f=>rows.some(r=>r.path===f.path)||f.path===lang).length};
}
if(!local){
 const missing=await get('/kova-indexing-audit-nonexistent-page.html');
 check(missing.status===404,'missing page','Unknown URLs must return HTTP 404');
 const legal=await get('/legal/privacy-policy-pl.md');
 check(/noindex/i.test(legal.robots||''),'raw legal source','Raw draft should carry an HTTP noindex directive');
 report.rawLegal={status:legal.status,robots:legal.robots};
}
report.pages.sort((a,b)=>a.path.localeCompare(b.path));
report.result=report.failures.length?'FAIL':'PASS';
report.indexableUrls=urls.length;report.localizedPages=report.pages.length;
report.emailRewrittenPages=report.pages.filter(p=>p.emailRewritten).length;
await writeFile(`${output}/${local?'production':'live'}-indexing.json`,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({result:report.result,target:report.target,pages:report.localizedPages,indexable:urls.length,languages:languages.length,emailRewrittenPages:report.emailRewrittenPages,failures:report.failures}));
process.exitCode=report.failures.length?1:0;
