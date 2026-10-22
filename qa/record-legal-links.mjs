// Bounded local verification; no deployment, Android build or cloud SDK.
import {spawnSync} from 'node:child_process';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve,relative} from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const app=resolve(root,'../KOVA-App');
const output=resolve(root,'qa/artifacts/legal-links-2026-10-22');
await mkdir(output,{recursive:true});
const hash=async path=>createHash('sha256').update(await readFile(path)).digest('hex');
const commands=[
 {cwd:app,args:['--test','--test-reporter=junit',`--test-reporter-destination=${output}/documents.xml`,'scripts/verify-offline-legal.test.cjs','scripts/verify-v1-legal-pages.test.cjs'],log:'documents.log'},
 {cwd:root,args:['qa/run-checks.mjs'],log:'website-checks.log'},
 {cwd:root,args:['qa/release-check.mjs'],log:'release-check.log'}
];
const executions=[];
for(const command of commands){
 const started=new Date().toISOString();
 const result=spawnSync(process.execPath,command.args,{cwd:command.cwd,encoding:'utf8',timeout:60000});
 const log=resolve(output,command.log);
 await writeFile(log,result.stdout+'\n'+result.stderr);
 executions.push({started,cwd:command.cwd,command:['node',...command.args],exitCode:result.status,error:result.error?.message||null,log:relative(root,log),sha256:await hash(log)});
}
const xml=await readFile(resolve(output,'documents.xml'),'utf8');
const documents={tests:(xml.match(/<testcase\b/g)||[]).length,failures:(xml.match(/<failure\b/g)||[]).length,errors:(xml.match(/<error\b/g)||[]).length,skipped:(xml.match(/<skipped\b/g)||[]).length,sha256:await hash(resolve(output,'documents.xml'))};
const browser=JSON.parse(await readFile(resolve(output,'matrix/results.json'),'utf8'));
const expected=['privacy-pl-360','privacy-en-768','privacy-ru-1440','terms-pl-360','terms-en-768','terms-ru-1440','privacy-ru-360-language'];
if(browser.length!==expected.length || expected.some(id=>!browser.some(row=>row.id===id)))throw new Error('Incomplete browser matrix');
const sources=['legal-document.js','site-seo.js','site-shell.js','site-ui.css','privacy.html','terms.html','scripts/seo.mjs','qa/legal-links-check.mjs','qa/site-smoke.mjs','qa/record-legal-links.mjs'];
for(const kind of ['privacy-policy','terms-of-service'])for(const lang of ['pl','en','ru'])sources.push(`legal/${kind}-${lang}.md`,`../KOVA-App/docs/release/offline-legal/${kind}-${lang}.md`);
sources.push('../KOVA-App/docs/release/OWNER_CONFIRMED_LEGAL_FACTS.json','../KOVA-App/scripts/verify-offline-legal.cjs','../KOVA-App/scripts/verify-offline-legal.test.cjs');
const passed=executions.every(row=>row.exitCode===0)&&documents.tests===27&&!documents.failures&&!documents.errors&&!documents.skipped&&browser.every(row=>row.passed&&row.exitCode===0);
const report={recordedAt:new Date().toISOString(),result:passed?'PASS':'FAIL',environment:{node:process.version,platform:process.platform},executions,documents,browser:{tests:browser.length,passed:browser.filter(row=>row.passed).length,report:'matrix/results.json',sha256:await hash(resolve(output,'matrix/results.json')),scope:'Local preview Edge at 360/768/1440px, PL/EN/RU, language changes, visible links, no unexpected external page requests. Completed before this recording step; not rerun.'},inputs:await Promise.all(sources.map(async path=>({path,sha256:await hash(resolve(root,path))}))),releaseReview:{tracker:'../KOVA-App/docs/release/KOVA_OFFLINE_FREE_V1_READINESS.json',fullAndroidRegression:'NOT RUN THIS TURN',historicalRegressionDate:'2026-10-21',historicalRegression:{tests:6746,pass:6745,fail:1,reason:'Legal documents still DRAFT'},currentLegalAssetsInQualifiedApk:false},limitations:['Local-only changes; no deployment or signed artifact','Document structure and navigation are not legal approval','Historical Android results are not new tests','Effective date, other legal approvals and unchanged release gates remain pending']};
await writeFile(resolve(output,'verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({result:report.result,documents,browser:report.browser,report:resolve(output,'verification.json')}));
if(!passed)process.exitCode=1;
