import {writeFile} from 'node:fs/promises';
const origin='https://kovacompass.app';
const paths=['/','/index-en.html','/sitemap.xml','/build-manifest.json'];
const results=await Promise.all(paths.map(async path=>{
 const response=await fetch(origin+path,{signal:AbortSignal.timeout(20000)});
 const body=await response.text();
 return {path,status:response.status,cacheControl:response.headers.get('cache-control'),server:response.headers.get('server'),
  ...(path==='/'?{canonical:/rel=["']canonical["']/.test(body),hreflang:/hreflang=/.test(body),ogImage:/property=["']og:image["']/.test(body),runtimeBootstrap:body.includes('runtime-bootstrap.js'),allLanguageBundle:/<script[^>]+src=["']translations\.js/.test(body),buildId:body.match(/name="kova-build" content="([^"]+)"/)?.[1]??null}:{})};
}));
const report={checkedAt:new Date().toISOString(),origin,mode:'Read-only; no publication',results};
await writeFile('qa/artifacts/publication-2026-10-25/live-domain.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
