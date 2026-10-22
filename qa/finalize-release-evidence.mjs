import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('..',import.meta.url));
const evidence=resolve(root,'qa/artifacts/release-2026-10-16');
const json=async name=>JSON.parse(await readFile(resolve(evidence,name),'utf8'));
const first=await json('matrix/results.json');
const legal=await json('matrix-legal/results.json');
const corrected=(await json('corrected-reruns.json')).runs;
const latest=new Map(first.map(item=>[item.id,item]));
for(const item of [...legal,...corrected])latest.set(item.id,item);
assert.equal(first.length,39);
assert.equal(latest.size,39);
for(const item of latest.values())assert.equal(item.exitCode,0,item.id);
const boundary=await json('release-check.json');
const build=await json('build.json');
assert.equal(boundary.result,'PASS');
const publicResponse=await fetch('http://127.0.0.1:4174/');
const privateResponse=await fetch('http://127.0.0.1:4174/workspace.html');
const ownerResponse=await fetch('http://127.0.0.1:4173/workspace.html');
assert.equal(publicResponse.status,200);
assert.equal(privateResponse.status,404);
assert.equal(ownerResponse.status,200);
const report={
  recordedAt:new Date().toISOString(),
  decision:'LOCAL_PRE_RELEASE_WEBSITE_PREPARATION_COMPLETE',
  productionReady:false,published:false,appModified:false,
  ownerInstruction:'Leave legal documents as drafts.',
  source:{repository:'KOVA-Website',head:'daea563ec3a0214cc71611e96e0ee49bf3738249',initialWorkingTree:'clean',committed:false},
  scope:'Website aligned with KOVA_PHONE_FREE_V1. App qualification is not changed.',
  publicPages:11,languages:['pl','en','ru'],faqAnswers:6,
  staticChecks:{htmlFiles:12,localReferences:259,translatedProjectVariants:21,appLegalCopies:6,sourceCheckGroups:12,result:'PASS'},
  browser:{
    engine:'Headless Microsoft Edge, isolated profiles',physicalDevice:'NOT RUN',humanAccessibility:'NOT VALIDATED',
    firstMatrix:{total:39,pass:32,fail:7,exitCode:1},
    legalRepeat:{total:6,pass:4,fail:2,exitCode:1},
    correctedReruns:corrected,
    finalDistinct:{total:39,pass:39,fail:0,kind:'Latest per-case aggregate, not a single fresh 39-case run'},
    supplementary:[{case:'Home RU 390px',exitCode:0},{case:'Home PL 360px with disabled localStorage and malformed consent cookie',exitCode:0}],
    resolvedCauses:['Closed details retained layout boxes; inspect TOC expanded and exclude hidden controls from visible-name checks.','Cyrillic URL hashes are percent-encoded; decode before matching heading ID.','404 EN completed assertions but teardown timed out; close owned browser through CDP before process fallback.']
  },
  output:{files:build.files.length+2,privateWorkspaceIncluded:false,legalState:'DRAFT',releaseCommandExitCode:boundary.negativeReleaseExitCode,networkAnalyticsReceiver:null},
  securityBoundaryChecks:boundary.checks,
  finalPreviewOrigins:{public:'http://127.0.0.1:4174',workspace:'http://127.0.0.1:4173',ownerDataOriginPreserved:true,directPublicWorkspaceStatus:404},
  retainedOwnerData:'Existing tasks and notes are preserved; one-time versioned release checklist import. Unit regression covers quota failure and repeated loads.',
  blockers:['Approved operator and contacts','Confirmed domain and HTTPS hosting','Approved legal documents and retention facts','Working external account-deletion request channel','Android release admission and real Google Play link','Explicit publication approval'],
  removals:[{file:'.well-known/security.txt',reason:'Unverified guessed contact',recoverable:'Git HEAD'},{file:'sitemap.xml',reason:'Unverified guessed domain',recoverable:'Git HEAD'}],
  hosting:'Only dist/ may be deployed. _headers must be supported or translated by the chosen host. Hosting/HTTPS/production 404 behavior not verified.',
  artifacts:{build:'build.json',releaseChecks:'release-check.json',matrix:'matrix/results.json',legalReplay:'matrix-legal/results.json',finalCases:'final-browser-cases.json'},
  publicationAllowed:false
};
await writeFile(resolve(evidence,'final-browser-cases.json'),JSON.stringify([...latest.values()],null,2));
await writeFile(resolve(evidence,'FINAL_REPORT.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({decision:report.decision,finalBrowserCases:39,publicFiles:report.output.files,published:false}));
