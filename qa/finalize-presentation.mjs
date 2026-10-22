// Run only after the explicit emulator fixture test and eight normal-UI captures.
import assert from 'node:assert/strict';
import {readFile, copyFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root = new URL('../', import.meta.url);
const evidence = 'qa/artifacts/presentation-2026-10-21/';
const read = name => readFile(new URL(name, root));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const log = (await read(evidence + 'fixture-test.log')).toString();
assert.match(log, /OK \(1 test\)/);
assert.match((await read(evidence + 'fixture-counts.log')).toString(), /PRESENTATION_FIXTURE_VERIFIED date=2026-10-21 accounts=3 transactions=214 payments=5 notes=3/);
assert.ok(!log.includes('FAILURES!!!'));
const afterUi = (await read(evidence + 'fixture-after-ui.log')).toString();
assert.match(afterUi, /OK \(1 test\)/);
assert.ok(!afterUi.includes('FAILURES!!!'));
const runtime = JSON.parse(await read(evidence + 'runtime.json'));
assert.equal(runtime.packageName, 'com.kova.budget.offlinequalification');
assert.equal(runtime.avd, 'KOVA_Demo');
assert.equal(runtime.contract, 'KOVA_PHONE_OFFLINE_FREE_V1');
assert.equal(runtime.internetPermission, false);
const screenshots = [];
const captures = {home:'home-ready',reports:'reports-ready'};
for (const id of ['home','accounts','transactions','budgets','recurring','reports','calendar','notes']) {
  const capture = captures[id] || id;
  const original = evidence + capture + '.png';
  const bytes = await read(original);
  const uiEvidence = evidence + capture + '-ui.xml';
  const ui = await read(uiEvidence);
  assert.ok(ui.toString().includes('package="com.kova.budget.offlinequalification"'));
  assert.equal(bytes.readUInt32BE(16),1080);
  assert.equal(bytes.readUInt32BE(20),2400);
  const asset = `assets/screenshots/offline-demo-${id}.png`;
  await copyFile(new URL(original,root),new URL(asset,root));
  screenshots.push({id,asset,original,uiEvidence,uiSha256:hash(ui),bytes:bytes.length,sha256:hash(bytes),edited:false});
}
const provenance = {
  capturedAt:new Date().toISOString(), data:'FICTIONAL_SYNTHETIC_ONLY',
  captureMethod:'adb screencap -p; unchanged PNG bytes',
  runtime,
  fixture:{verification:'PASS',testLog:evidence+'fixture-test.log',countsLog:evidence+'fixture-counts.log',
    afterUiTestLog:evidence+'fixture-after-ui.log',uniqueTestCases:1,successfulExecutions:2,
    testSource:'../KOVA-App/app/src/androidTestPhoneFreeV1/java/com/kova/budget/qualification/OfflinePresentationDemoTest.kt',
    testSourceSha256:hash(await read('../KOVA-App/app/src/androidTestPhoneFreeV1/java/com/kova/budget/qualification/OfflinePresentationDemoTest.kt')),
    scenario:'Marta Nowak — fictional Polish household; 3 accounts, six months through 2026-10-21, salary 6200 PLN/month, varied everyday expenses and own-account transfers',
    checks:'Independent exact balance reconciliation; persisted row count; positive amounts; owner binding; unique transaction IDs; six salaries; recurring settlement amounts/dates/links',
    source:'../KOVA-App/app/src/debug/java/com/kova/budget/demo/DemoDataset.kt',
    sha256:hash(await read('../KOVA-App/app/src/debug/java/com/kova/budget/demo/DemoDataset.kt')),
    statisticsClaim:false},
  screenshots, published:false,
  limitations:['Emulator captures, not physical phone photography','Polish app UI; website descriptions in PL/EN/RU','Debug-signed offline qualification package; not a signed production release','Not evidence of complete release qualification or human usability validation']
};
await writeFile(new URL(evidence+'provenance.json',root),JSON.stringify(provenance,null,2));
console.log(JSON.stringify({result:'PASS',screenshots:screenshots.length,retouched:false,published:false}));
