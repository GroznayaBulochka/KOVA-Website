import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),context={window:{}};
vm.runInNewContext(await readFile(new URL('phone-preview-data.js',root),'utf8'),context);
const data=context.window.KOVA_PHONE_DATA;
const provenance=JSON.parse(await readFile(new URL('qa/artifacts/phone-expansion-2026-11-01/provenance.json',root),'utf8'));
const manifest=JSON.parse(await readFile(new URL('dist/build-manifest.json',root),'utf8'));
const shipped=new Map(manifest.files.map(f=>[f.path,f.sha256]));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const base=['home','accounts','transactions','budgets','recurring','reports','calendar','notes','work','more'];
const ids=[...base,...data.screens.map(s=>s.id)];
assert.equal(new Set(ids).size,15,'15 unique views, including the menu');
assert.equal(Object.keys(data.ui).length,27);
assert.equal(data.screens.filter(s=>s.catalog!==false).length,3,'Three new main screens; details open from their cards');
for(const [lang,labels] of Object.entries(data.ui)){
  for(const screen of data.screens){
    for(const key of [screen.titleKey,screen.titleSuffixKey,screen.captionKey].filter(Boolean))assert.ok(typeof labels[key]==='string'&&labels[key].trim(),`${lang}: ${key}`);
  }
}
for(const route of [...data.screens.map(s=>s.hotspots),...Object.values(data.links)].flat()){
  assert.ok(route.target==='back'||ids.includes(route.target),'Known destination: '+route.target);
  const [x,y,w,h]=route.bounds;
  assert.ok(x>=0&&y>=0&&w>0&&h>0&&x+w<=1080&&y+h<=2400,'Hotspot inside the captured screen');
}
for(const id of ['income','savings']){
  const parent=data.screens.find(s=>s.id===id+'-goal'),detail=data.screens.find(s=>s.id===id+'-detail');
  assert.ok(parent.hotspots.some(h=>h.target===detail.id));
  assert.ok(detail.hotspots.some(h=>h.target==='back'));
  assert.equal(detail.catalog,false);
  assert.ok(data.links.budgets.some(h=>h.target===parent.id));
}
assert.equal(provenance.screenshots.length,5);
assert.equal(provenance.derivatives.length,10);
for(const shot of provenance.screenshots){
  const image=await readFile(new URL(shot.asset,root)),original=await readFile(new URL(shot.original,root));
  assert.equal(hash(image),shot.sha256);assert.equal(hash(original),shot.sha256);
  assert.equal(image.readUInt32BE(16),1080);assert.equal(image.readUInt32BE(20),2400);
  assert.equal(shot.edited,false);
  assert.equal(shipped.get(shot.asset),shot.sha256,'Original included in public build');
  assert.equal(data.screens.find(s=>s.id===shot.id)?.image,shot.asset);
}
for(const derivative of provenance.derivatives){
  const bytes=await readFile(new URL(derivative.asset,root));
  assert.equal(hash(bytes),derivative.sha256);
  assert.equal(bytes.toString('ascii',8,12),'WEBP');
  assert.equal(shipped.get(derivative.asset),derivative.sha256,'Lazy-loaded image included in public build');
}
console.log(JSON.stringify({result:'PASS',views:15,newAuthenticCaptures:5,derivatives:10,languages:27,originalPixels:'UNCHANGED',nestedRoutes:'PASS'}));
