// Copies only reviewed public documents and synthetic screenshot bytes. No cloud access.
import {readFile,copyFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('..',import.meta.url));
const app=resolve(root,'../KOVA-App');
const hash=b=>createHash('sha256').update(b).digest('hex');
const artifacts=[];
const copy=async(source,destination,kind)=>{
  const bytes=await readFile(resolve(app,source));
  await copyFile(resolve(app,source),resolve(root,destination));
  artifacts.push({source,destination,kind,sha256:hash(bytes)});
};
for(const kind of ['privacy-policy','terms-of-service'])for(const lang of ['pl','en','ru']) {
  const name=`${kind}-${lang}.md`;
  await copy(`docs/release/offline-legal/${name}`,`legal/${name}`,'UNAPPROVED_OFFLINE_LEGAL_DRAFT');
}
await copy('docs/release/offline-free-v1-evidence/20261021-api37-normal-ui-notes-portability/notes046-screen.png','assets/screenshots/offline-v1-notes.png','SYNTHETIC_EMULATOR_SCREENSHOT_2026_10_21');
for(const source of ['docs/release/KOVA_OFFLINE_FREE_V1_READINESS.json','docs/release/OWNER_CONFIRMED_LEGAL_FACTS.json']) {
  const bytes=await readFile(resolve(app,source)); artifacts.push({source,kind:'FACT_SOURCE_PIN_NOT_PUBLISHED',sha256:hash(bytes)});
}
await mkdir(resolve(root,'qa/artifacts/release-2026-10-21'),{recursive:true});
await writeFile(resolve(root,'qa/artifacts/release-2026-10-21/app-source-pins.json'),JSON.stringify({recordedAt:new Date().toISOString(),contract:'KOVA_PHONE_OFFLINE_FREE_V1',artifacts},null,2));
console.log('Copied six canonical offline drafts and the authentic Notes screenshot. Pinned local source evidence.');
