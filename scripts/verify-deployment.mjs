// Read-only HTTP verification against the manifest from the exact uploaded artifact.
import {readFile,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {sha256} from './asset-versioning.mjs';

export async function verifyDeployment(origin,expected,{request=fetch}={}) {
 const base=new URL(origin);
 if(!['http:','https:'].includes(base.protocol)||base.username||base.password||base.pathname!=='/'||base.search||base.hash)throw Error('Use a plain HTTP(S) origin');
 const report={origin:base.origin,expectedVersion:expected.version,mode:expected.mode,checkedAt:new Date().toISOString(),checks:[],failures:[],warnings:[]};
 async function inspect(path,pin,versioned=false){
  const url=new URL(path,base);if(versioned)url.searchParams.set('v',expected.version);
  try{
   const response=await request(url,{headers:{'Cache-Control':'no-cache','User-Agent':'KOVA-deployment-check/1.0'},signal:AbortSignal.timeout(20000)});
   const bytes=Buffer.from(await response.arrayBuffer());
   const row={path,url:String(url),status:response.status,sha256:sha256(bytes),cacheControl:response.headers.get('cache-control'),etag:response.headers.get('etag'),age:response.headers.get('age')};
   report.checks.push(row);
   const validStatus=response.ok||(path.startsWith('404')&&response.status===404);
   if(!validStatus||row.sha256!==pin.sha256)report.failures.push({path,status:row.status,reason:validStatus?'Content differs from the prepared artifact':'HTTP error'});
   if(path==='/'||path.endsWith('.html')){
    const maxAge=/max-age=(\d+)/i.exec(row.cacheControl||'');
    if(!/no-(?:store|cache)/i.test(row.cacheControl||'')&&(!maxAge||Number(maxAge[1])>0))report.warnings.push({path,reason:'HTML may stay cached; configure revalidation on the actual host/CDN',cacheControl:row.cacheControl});
   }
   return bytes;
  }catch(error){report.failures.push({path,reason:String(error.message)});return null;}
 }
 const manifestBytes=Buffer.from(JSON.stringify(expected,null,2)+'\n');
 await inspect('build-manifest.json',{sha256:sha256(manifestBytes)});
 // A missing/stale manifest already proves the requested build is not visible.
 if(!report.failures.length){
  const files=expected.files.filter(p=>!['CNAME','_headers'].includes(p.path));
  for(let i=0;i<files.length;i+=6)await Promise.all(files.slice(i,i+6).map(pin=>inspect(pin.path,pin,!/\.(?:html|txt|xml)$/.test(pin.path))));
  const index=files.find(p=>p.path==='index.html');if(index)await inspect('/',index);
 }
 report.result=report.failures.length?'FAIL':'PASS';return report;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const arg=name=>{const i=process.argv.indexOf(name);return i<0?undefined:process.argv[i+1];};
 const origin=arg('--origin');if(!origin)throw Error('Required: --origin https://kovacompass.app');
 const expected=JSON.parse(await readFile(arg('--manifest')||'dist/build-manifest.json','utf8'));
 if(process.argv.includes('--require-release')&&expected.mode!=='release')throw Error('Production verification requires the release artifact');
 const report=await verifyDeployment(origin,expected);
 if(arg('--report'))await writeFile(arg('--report'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({result:report.result,origin:report.origin,version:expected.version,checked:report.checks.length,failures:report.failures,warnings:report.warnings.length}));
 process.exitCode=report.result==='PASS'?0:1;
}
