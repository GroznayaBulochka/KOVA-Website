import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const read = name => readFile(new URL(name, root));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const script = (await read('landing.js')).toString();
const context = {window:{}};
vm.runInNewContext(script.slice(script.indexOf('  const videoSlides'), script.indexOf('  const supported')) + ';this.slides=videoSlides;', context);
const config=JSON.parse(await read('release-config.json'));
assert.match(config.presentationEvidence,/^qa\/artifacts\/presentation-2026-10-29(?:-source54)?\/provenance\.json$/,'Current English capture, never historical Polish PASS');
const provenance = JSON.parse(await read(config.presentationEvidence));
assert.equal(provenance.data, 'FICTIONAL_SYNTHETIC_ONLY');
assert.equal(provenance.captureMethod, 'UiDevice.takeScreenshot; unchanged PNG bytes');
assert.equal(provenance.runtime.contract, 'KOVA_PHONE_LOCAL_FREEMIUM_V1');
assert.equal(provenance.runtime.language,'en');
assert.equal(provenance.runtime.premium,'INSTRUMENTATION_ONLY_MOCK_NOT_PLAY');
assert.equal(provenance.runtime.internetPermission,false);
assert.equal(provenance.fixture.status,'PASS_INDEPENDENT_ROOM_ORACLE');
if(config.presentationSource===54)assert.equal(provenance.fixture.exactTransactionsNetUiOracle,'189265 minorPLN, actual displayed Money asserted');
assert.equal(provenance.fixture.verification, 'PASS');
assert.equal(context.slides.length, 8);
assert.equal(new Set(context.slides.map(s => s.image)).size, 8);
assert.equal(provenance.screenshots.length, 9);
for (const slide of context.slides) {
  for (const lang of ['pl', 'en', 'ru']) for (const field of ['title', 'caption', 'copy']) assert.ok(slide[field][lang].length > 4);
}
for (const slide of [...context.slides,{image:'assets/screenshots/kova-work-income.png'}]) {
  assert.match(slide.image, /^assets\/screenshots\/(?:offline-demo-[a-z]+|kova-work-income)\.png$/);
  const pin = provenance.screenshots.find(p => p.asset === slide.image);
  assert.ok(pin);
  const asset = await read(slide.image);
  assert.equal(hash(asset), pin.sha256);
  assert.equal(hash(await read(pin.original)), pin.sha256, 'Never retouch actual app pixels');
  const ui = await read(pin.uiEvidence);
  assert.equal(hash(ui), pin.uiSha256);
  assert.ok(ui.toString().includes('package="com.kova.budget.offlinequalification"'));
  assert.ok(!/[А-Яа-яЁё]/u.test(ui.toString()),'English UI capture, not a relabelled Russian image');
  assert.equal(asset.readUInt32BE(16), 1080);
  assert.equal(asset.readUInt32BE(20), 2400);
}
const html = (await read('index.html')).toString();
assert.equal((html.match(/data-screen-index=/g) || []).length, 8);
assert.ok(html.includes('data-video-chapters'));
assert.ok(!/assets\/screenshots\/(free-v1-|offline-v1-notes)/.test(html));
assert.equal(provenance.derivatives.length,18);
for(const pin of provenance.derivatives)assert.equal(hash(await read(pin.asset)),pin.sha256);
console.log(JSON.stringify({result:'PASS',authenticEnglishScreens:9,responsiveDerivatives:18,galleryScreens:8,unchangedPixelProvenance:'PASS',capturedAppUiHierarchies:9,premiumEvidence:'MOCK_NOT_A_PLAY_PURCHASE'}));
