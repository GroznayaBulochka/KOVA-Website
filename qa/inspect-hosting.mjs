// Read-only check of the actual CDN. This does not approve or deploy a release.
import {writeFile} from 'node:fs/promises';
const origin='https://kovacompass.app';
const security={
 'x-content-type-options':'nosniff',
 'referrer-policy':'strict-origin-when-cross-origin',
 'permissions-policy':'camera=(), microphone=(), geolocation=()',
 'x-frame-options':'DENY'
};
const paths=['/','/privacy.html','/landing.js','/robots.txt','/sitemap.xml','/build-manifest.json','/legal/privacy-policy-pl.md'];
const failures=[];
const checks=await Promise.all(paths.map(async path=>{
 const response=await fetch(origin+path,{signal:AbortSignal.timeout(20000)});
 const body=await response.text();
 const headers=Object.fromEntries(['cache-control','cf-cache-status','content-security-policy','x-robots-tag',...Object.keys(security)].map(key=>[key,response.headers.get(key)]));
 for(const [key,value] of Object.entries(security))if(headers[key]!==value)failures.push({path,reason:key});
 if(headers['cache-control']!=='no-cache')failures.push({path,reason:'Browser revalidation missing'});
 const csp=headers['content-security-policy']||'';
 for(const clause of ["default-src 'self'","script-src 'self';","connect-src 'self';","object-src 'none'","frame-ancestors 'none'","base-uri 'none'","form-action 'none'"])if(!csp.includes(clause))failures.push({path,reason:'CSP: '+clause});
 if(/googletagmanager|google-analytics|analytics\.google/.test(csp))failures.push({path,reason:'Paused analytics must be blocked by CSP'});
 if(path.startsWith('/legal/')&&headers['x-robots-tag']!=='noindex, nofollow')failures.push({path,reason:'Raw legal source indexing'});
 if(path==='/'&&headers['x-robots-tag']?.includes('noindex'))failures.push({path,reason:'Home page must not inherit draft noindex'});
 if(!['/sitemap.xml','/build-manifest.json'].includes(path)&&response.status!==200)failures.push({path,reason:'HTTP '+response.status});
 return {path,status:response.status,headers,...(path==='/'?{buildId:body.match(/name="kova-build" content="([^"]+)"/)?.[1]??null}:{} )};
}));
for(const url of ['http://kovacompass.app/?lang=uk','https://www.kovacompass.app/?lang=uk']){
 const response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(20000)});
 const location=response.headers.get('location');
 checks.push({url,status:response.status,location});
 if(![301,308].includes(response.status)||location!==origin+'/?lang=uk')failures.push({url,reason:'HTTPS/canonical redirect must retain language'});
}
const report={checkedAt:new Date().toISOString(),scope:'CDN headers and redirects only; missing release files remain a publication blocker',result:failures.length?'FAIL':'PASS',checks,failures};
await writeFile('qa/artifacts/launch-readiness-2026-10-25/hosting-http.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({result:report.result,checks:checks.length,failures}));
process.exitCode=failures.length?1:0;
