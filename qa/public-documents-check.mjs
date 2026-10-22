// Explicit, read-only public HTTP check. Not part of default/offline tests.
// Fetches text only: no browser scripts, analytics, credentials, Firebase or deployment.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const config=JSON.parse(await readFile(resolve(root,'release-config.json'),'utf8'));
const checks=[];
for(const [kind,url] of [['privacy-policy',config.publicPolicyUrl],['terms-of-service',config.publicTermsUrl]]){
 for(const [scope,address] of [['public HTML',url],['English document text',config.canonicalOrigin+'/legal/'+kind+'-en.md']]){
  if(new URL(address).origin!=='https://kovacompass.app')throw new Error('Unexpected public host');
  try{
   const response=await fetch(address,{redirect:'error',signal:AbortSignal.timeout(15000)});
   const content=await response.text();
   checks.push({scope,url:address,status:response.status,contentType:response.headers.get('content-type'),
    bytes:Buffer.byteLength(content),sha256:createHash('sha256').update(content).digest('hex'),
    title:scope==='public HTML'?content.match(/<title>([\s\S]*?)<\/title>/i)?.[1]:content.match(/^# (.+)$/m)?.[1],
    draftMarker:/DRAFT|SZKIC|ЧЕРНОВИК|OWNER_INPUT_REQUIRED/.test(content),
    passed:response.status===200&&(scope==='public HTML'?/<html/i.test(content):content.startsWith('# '))});
  }catch(error){checks.push({scope,url:address,passed:false,error:String(error)});}
 }
}
const out=resolve(root,'qa/artifacts/seo-2026-10-22');await mkdir(out,{recursive:true});
const report={recordedAt:new Date().toISOString(),checks,result:checks.every(c=>c.passed)?'PUBLIC_ENDPOINTS_ACCESSIBLE':'INCOMPLETE',
 qualification:'HTTP/text availability only; not legal approval, full hosting qualification, English browser rendering or verification of the newly prepared local SEO deployment.',
 remoteMutations:0,scriptsExecuted:false,credentialsUsed:false,publishedByThisTask:false};
await writeFile(resolve(out,'public-documents.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(checks.some(c=>!c.passed))process.exitCode=1;
