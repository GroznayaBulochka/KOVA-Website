// Pin local qualification. Original failures remain in matrix/results.json.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const out=resolve(root,'qa/artifacts/seo-2026-10-22');
const json=async file=>JSON.parse(await readFile(resolve(out,file),'utf8'));
const first=await json('matrix/results.json'),retests=await json('retest/results.json');
assert.equal(first.length,40);assert.equal(retests.length,10);
const latest=new Map(first.map(entry=>[entry.id,entry]));
for(const entry of retests){assert.ok(latest.has(entry.id));latest.set(entry.id,entry);}
assert.ok([...latest.values()].every(entry=>entry.passed&&entry.exitCode===0));
const analytics=await json('analytics/browser.json');assert.equal(analytics.result,'PASS');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
for(const [name,expected] of Object.entries(analytics.inputs))assert.equal(hash(await readFile(resolve(root,name))),expected,name+' changed after browser check');
const commands=[];
async function run(args,log){
 const startedAt=new Date().toISOString();
 const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:60000});
 await writeFile(resolve(out,log),(result.stdout||'')+'\n'+(result.stderr||'')+(result.error?String(result.error):''));
 commands.push({command:'node '+args.join(' '),startedAt,exitCode:result.status,log});
 assert.equal(result.status,0,args.join(' '));
}
for(const page of ['privacy','terms'])await run(['qa/site-smoke.mjs',`http://127.0.0.1:4174/${page}.html?lang=en`,resolve(out,`legacy-${page}-en.png`),'390','844'],`legacy-${page}-en.log`);
await run(['qa/run-checks.mjs'],'checks.log');
await run(['qa/release-check.mjs'],'release-check.log');
const seo=await json('checks.json');assert.equal(seo.result,'PASS');
const build=JSON.parse(await readFile(resolve(root,'qa/artifacts/release-2026-10-21/build.json'),'utf8'));
for(const item of build.files)assert.equal(hash(await readFile(resolve(root,'dist',item.file))),item.sha256,item.file+' changed after build');
await writeFile(resolve(out,'build-final.json'),JSON.stringify(build,null,2));
const sourceInputs={};
for(const file of ['scripts/seo.mjs','scripts/build-site.mjs','site-seo.js','site-shell.js','site-consent.js','site-ui.css','landing.js','project-content.js','project-pages.js','legal-document.js','document-language.js','release-config.json','dist/_headers','dist/robots.txt','dist/sitemap.xml','qa/seo-check.mjs','qa/site-smoke.mjs','qa/analytics-browser.mjs'])sourceInputs[file]=hash(await readFile(resolve(root,file)));
const report={recordedAt:new Date().toISOString(),result:'LOCAL_SEO_VERIFIED',commands,sourceInputs,
 staticSeo:{checks:seo.checks,localReferences:seo.localReferences,evidence:'checks.json'},
 browserMatrix:{uniqueCases:latest.size,passed:[...latest.values()].filter(x=>x.passed).length,
  firstRun:{passed:first.filter(x=>x.passed).length,failed:first.filter(x=>!x.passed).length,evidence:'matrix/results.json'},
  correction:'URL parser omitted numeric 404. Added digit support constrained by the exact public-page allowlist; all 33 routes and unknown/private paths covered by regression.',
  retest:{executions:retests.length,evidence:'retest/results.json',scope:'All 404 locales; all privacy/terms locales and legal language-picker probe after owner URL update.'},
  retained:'Other original PASS cases retained; new URL grammar explicitly checks every public locale, and static output is freshly verified.'},
 analyticsAndNoScript:{checks:analytics.checks,result:analytics.result,evidence:'analytics/browser.json',googleRuntime:'MOCKED',googleNetworkRequestsDelivered:0},
 publicDocuments:await json('public-documents.json'),
 counting:'Overlapping suites and reruns are not summed into independent cases.',
 finalBuild:'build-final.json',publishedByThisTask:false,appChanged:false,privateWorkspaceDataTouched:false,
 remaining:['Owner approval to publish prepared changes','Qualified hosting with correct headers/redirects/404','Search Console domain verification and sitemap submission','Live indexing and Core Web Vitals not verified','Legal drafts and GA4 account configuration still require their existing approvals']};
await writeFile(resolve(out,'verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({result:report.result,staticChecks:seo.checks,uniqueUiCases:latest.size,analyticsAndNoScript:analytics.checks,legacyLegalLinks:2,report:resolve(out,'verification.json')}));
