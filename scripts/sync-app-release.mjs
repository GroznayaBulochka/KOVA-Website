// Copies canonical public-document drafts only. Current authentic screenshots
// have a separately verified capture/provenance step; never restore the old image.
import {readFile,copyFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {websiteLegalDraft} from './current-website-legal.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
const app=resolve(root,'../KOVA-App');
const hash=b=>createHash('sha256').update(b).digest('hex');
const artifacts=[];
const copy=async(source,destination,kind,language,documentKind)=>{
  const bytes=await readFile(resolve(app,source));
  const output=Buffer.from(await websiteLegalDraft(documentKind,language,bytes.toString()));
  await writeFile(resolve(root,destination),output);
  artifacts.push({source,destination,kind,sourceSha256:hash(bytes),sha256:hash(output),scopeUpdate:documentKind==='privacy-policy'?'SECTION3_CURRENT_LOCALIZED_APP_PACKAGE_ONLY':'NONE'});
};
for(const kind of ['privacy-policy','terms-of-service'])for(const lang of Object.keys(JSON.parse(await readFile(resolve(root,'language-registry.json'),'utf8')))) {
  const name=`${kind}-${lang}.md`;
  await copy(`docs/release/local-freemium-legal/${name}`,`legal/${name}`,'UNAPPROVED_LOCAL_FREEMIUM_LEGAL_DRAFT',lang,kind);
}
for(const source of ['docs/release/KOVA_LOCAL_FREEMIUM_V1_READINESS.json','docs/release/OWNER_CONFIRMED_LEGAL_FACTS.json']) {
  const bytes=await readFile(resolve(app,source)); artifacts.push({source,kind:'FACT_SOURCE_PIN_NOT_PUBLISHED',sha256:hash(bytes)});
}
await mkdir(resolve(root,'qa/artifacts/content-refresh-2026-10-29'),{recursive:true});
await writeFile(resolve(root,'qa/artifacts/content-refresh-2026-10-29/app-source-pins.json'),JSON.stringify({recordedAt:new Date().toISOString(),contract:'KOVA_PHONE_LOCAL_FREEMIUM_V1',artifacts,published:false},null,2));
console.log('Prepared 54 website drafts: exact canonical terms; privacy section3 aligned with current localized app package. No approval, effective date, app rebuild or publication implied.');
