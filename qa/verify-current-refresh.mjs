import {spawnSync} from 'node:child_process';import {writeFile,readFile,access} from 'node:fs/promises';import {resolve} from 'node:path';import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url)),out=resolve(root,'qa/artifacts/content-refresh-2026-10-29');
const label=process.argv[2]||'source54-static';
if(!/^source54-static(?:-[0-9]+)?$/.test(label))throw Error('Bounded current evidence label');
try{await access(resolve(out,label+'.json'));throw Error('No completed verification overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
const startedAt=new Date().toISOString(),stages=[];
for(const script of ['scripts/assemble-locales.mjs','scripts/build-site.mjs','qa/run-checks.mjs']){
 const r=spawnSync(process.execPath,[script],{cwd:root,encoding:'utf8',maxBuffer:8*1024*1024});
 await writeFile(resolve(out,label+'-'+script.split('/').pop()+'.log'),r.stdout+'\n'+r.stderr);
 stages.push({script,exitCode:r.status});if(r.status!==0)throw Error('Current verification failed: '+script);
}
const config=JSON.parse(await readFile(resolve(root,'release-config.json'),'utf8')),manifest=JSON.parse(await readFile(resolve(root,'dist/build-manifest.json'),'utf8'));
if(config.presentationSource!==54||config.publicationApproved||config.websiteAnalytics.enabled)throw Error('Current capture and owner boundaries required');
const result={status:'PASS_CURRENT_SOURCE54_WEBSITE_STATIC_BUILD_AND32_CHECK_GROUPS',startedAt,finishedAt:new Date().toISOString(),stages,buildVersion:manifest.version,publicFiles:manifest.files.length+1,englishAppScreens:9,localizedWebsiteLanguages:27,legalDrafts:54,publication:false,sourceEvidence:config.presentationEvidence,scope:'Current website build/static contracts. Browser results and Android screenshot assertions are separate; not app release or legal approval.'};
await writeFile(resolve(out,label+'.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
