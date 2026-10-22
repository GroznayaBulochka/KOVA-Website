import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('..',import.meta.url));
const evidence=resolve(root,'qa/artifacts/release-2026-10-21');
const json=async name=>JSON.parse(await readFile(resolve(evidence,name),'utf8'));
const first=await json('matrix/results.json');
const legal=await json('matrix-legal/results.json');
const latest=new Map(first.map(item=>[item.id,item]));
for(const item of legal)latest.set(item.id,item);
assert.equal(latest.size,40);
for(const item of latest.values())assert.equal(item.exitCode,0,item.id);
const runs=[];
for(const args of [['qa/run-checks.mjs'],['qa/release-check.mjs'],['qa/site-smoke.mjs','http://127.0.0.1:4174/index.html?lang=pl',resolve(evidence,'final-home-keyboard.png'),'360','800','resilience']]) {
  const result=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:60000});
  runs.push({command:['node',...args],exitCode:result.status,stdout:result.stdout,stderr:result.stderr});
  assert.equal(result.status,0,result.stderr);
}
const build=await json('build.json');
const release=await json('release-check.json');
const report={
  recordedAt:new Date().toISOString(), decision:'LOCAL_WEBSITE_UPDATE_VERIFIED_PUBLICATION_BLOCKED',
  contract:'KOVA_PHONE_OFFLINE_FREE_V1',publicPages:11,languages:['pl','en','ru'],faqAnswers:9,
  published:false,appModified:false,gitCommitted:false,cloudOperations:false,
  currentAppVerdict:'INCOMPLETE — REQUIRED TEST ENVIRONMENT MISSING',
  content:'Approved publisher/contact; current offline scope, partial encrypted backup, OCR, local deletion, honest pre-release status; six byte-identical canonical legal drafts.',
  browser:{engine:'Isolated headless Microsoft Edge',initialMatrix:{total:first.length,pass:first.filter(x=>x.passed).length,fail:first.filter(x=>!x.passed).length},legalReplay:{total:legal.length,pass:legal.filter(x=>x.passed).length,fail:legal.filter(x=>!x.passed).length},finalDistinct:{total:latest.size,pass:latest.size,fail:0,kind:'Latest per-case aggregate, not a single fresh run'},keyboard:'Arrows/Home/End/Enter/Escape/Tab across public cases; Space and unavailable storage in final supplementary run',humanAccessibility:'NOT VALIDATED',physicalDevice:'NOT RUN',builtInBrowserAutomation:'Initialization failed; repository browser test runner used instead'},
  initialIssues:[
    'Canonical drafts mark DRAFT in H1 moved to page heading. Old smoke assertion inspected only body. Updated to assert marked heading AND >=10 real document sections, plus exact source parity.',
    'Canonical relative Markdown links were previously replaced by #. Added strict mapping to local privacy/terms pages and six-document + injection regressions.',
    'One intermediate privacy/en keyboard run observed HTML lang=pl with URL/selection=en. Subsequent instrumented individual test and full legal replay passed. Cause not established; no claim that the transient is conclusively fixed.'
  ],
  boundaryChecks:release.checks,releaseCommandExitCode:release.negativeReleaseExitCode,
  artifacts:build.files,sourcePins:'app-source-pins.json',latestBrowserCases:[...latest.values()],supplementary:runs,
  preserved:'Private Workspace source/storage untouched. Old intro source retained; only identical generated dist copy removed. Earlier evidence retained.',
  ownerDomain:'https://kovacompass.app — owner declaration only; no DNS/hosting qualification',
  blockers:['Legal qualification and approval, effective date, actual public policy deployment','Verified hosting/HTTPS and logs/retention practices','Support inbox verification and correspondence handling','Explicit publication approval; app and Play/signing qualification remains separate'],
  limitations:['No 100% legal/security guarantee','No public hosting/HTTPS verification','No legal completion based on invented address or retention facts','Browser tests are bounded, not a substitute for human accessibility testing']
};
await writeFile(resolve(evidence,'FINAL_REPORT.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({decision:report.decision,browserLatestPass:latest.size,boundaryChecks:release.checks,published:false}));
