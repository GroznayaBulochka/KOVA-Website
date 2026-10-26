// Inspect real public responses without loading GA or altering any visitor data.
import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
const languages=Object.keys(JSON.parse(await readFile('language-registry.json','utf8')));
const paths=[...languages.map(l=>'/?lang='+l),'/index.html','/contact.html','/cookies.html','/privacy.html','/404.html'];
const checks=await Promise.all(paths.map(async path=>{
 const r=await fetch('https://kovacompass.app'+path,{signal:AbortSignal.timeout(20000)});
 const csp=r.headers.get('content-security-policy')||'',cookies=r.headers.getSetCookie();
 assert.equal(r.status,200,path);assert.match(csp,/script-src 'self';/);assert.match(csp,/connect-src 'self';/);
 assert.doesNotMatch(csp,/googletagmanager|google-analytics|analytics\.google/);
 for(const name of ['_ga','_ga_2LE3GWYDZM'])for(const domain of [false,true])assert.ok(cookies.some(c=>c.startsWith(name+'=;')&&c.includes('Max-Age=0')&&c.includes('Domain=kovacompass.app')===domain),path+': cookie expiry '+name);
 assert.ok(cookies.some(c=>c.startsWith('kova_cookie_consent_v2=essential;')));
 assert.ok(!r.headers.get('x-robots-tag')?.includes('noindex')||path==='/404.html');
 return {path,status:r.status,csp,setCookie:cookies};
}));
const report={checkedAt:new Date().toISOString(),result:'PASS',scope:'Actual production HTTP responses: enforced CSP, expired GA cookies, legacy consent forced off; no live Google request was sent by this check',checks};
await mkdir('qa/artifacts/analytics-paused-2026-10-26',{recursive:true});
await writeFile('qa/artifacts/analytics-paused-2026-10-26/public-http.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({result:report.result,checks:checks.length,languages:languages.length}));
