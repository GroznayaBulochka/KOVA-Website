// Collect fresh small checks and previously executed, explicitly scoped browser evidence.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const out=resolve(root,'qa/artifacts/analytics-2026-10-22');
const browser=JSON.parse(await readFile(resolve(out,'browser.json'),'utf8'));
const matrix=JSON.parse(await readFile(resolve(out,'matrix/results.json'),'utf8'));
assert.equal(browser.result,'PASS');assert.equal(matrix.length,40);assert.ok(matrix.every(x=>x.passed&&x.exitCode===0));
for(const [file,expected] of Object.entries(browser.inputs))assert.equal(createHash('sha256').update(await readFile(resolve(root,file))).digest('hex'),expected,file+' changed since analytics browser verification');
const commands=[];
for(const script of ['qa/run-checks.mjs','qa/release-check.mjs']){
 const r=spawnSync(process.execPath,[script],{cwd:root,encoding:'utf8'});
 const log=script.split('/').pop()+'.log';await writeFile(resolve(out,log),r.stdout+'\n'+r.stderr);
 commands.push({command:'node '+script,exitCode:r.status,log});assert.equal(r.status,0,script);
}
const build=JSON.parse(await readFile(resolve(root,'qa/artifacts/release-2026-10-21/build.json'),'utf8'));
await writeFile(resolve(out,'build-final.json'),JSON.stringify(build,null,2));
const report={recordedAt:new Date().toISOString(),result:'LOCAL_IMPLEMENTATION_VERIFIED',measurementId:'G-2LE3GWYDZM',
 commands,analyticsBrowser:{checks:browser.checks,result:browser.result,evidence:'browser.json',googleRuntime:'MOCKED',googleNetworkRequestsDelivered:0},
 publicUi:{cases:matrix.length,passed:matrix.filter(x=>x.passed).length,evidence:'matrix/results.json'},
 counting:'Separate suites; overlapping assertions are not summed into unique test cases.',
 currentBuild:'build-final.json',published:false,androidChanged:false,workspaceDataTouched:false,
 remaining:['GA account configuration review including Enhanced measurement OFF','Approved public deployment and real CSP headers','Live GA Realtime reception check after authorized deployment','Existing legal/hosting publication approvals'],
 scope:'Local Edge browser DOM/CSP and intercepted GA adapter verified; no real Google runtime/backend/account qualification.'};
await writeFile(resolve(out,'verification.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
