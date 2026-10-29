// Narrow factual update for website drafts; not legal approval, a new effective
// date, or an assertion that the older bundled app document has been rebuilt.
import {readFile,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const decode=s=>s.replace(/^<!\[CDATA\[|\]\]>$/g,'').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&apos;',"'").replaceAll("\\'","'").replaceAll('\\"','"').replaceAll('\\n',' ');
export async function currentAppProductStrings(lang) {
 const folder=lang==='en'?'values':({pnb:'values-b+pnb',yue:'values-b+yue',zh:'values-zh-rCN'}[lang]||'values-'+lang);
 const resources={};
 for(const selected of (lang==='zh'?['values-zh','values-zh-rCN']:[folder])) {
  const dir=resolve(root,'../KOVA-App/app/src/main/res',selected);
  for(const file of (await readdir(dir)).filter(n=>n.endsWith('.xml')))for(const match of (await readFile(resolve(dir,file),'utf8')).matchAll(/<string\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/string>/g))resources[match[1]]=decode(match[2]);
 }
 return resources;
}
export async function websiteLegalDraft(kind,lang,canonical) {
 if(kind!=='privacy-policy')return canonical;
 const resources=await currentAppProductStrings(lang);
 const keys=['premium_local_scope','premium_package_scope','premium_package_readiness'];
 if(keys.some(k=>!resources[k]))throw Error('Missing current localized feature scope '+lang);
 const paragraph=keys.map(k=>resources[k]).join(' ');
 const pattern=/(\r?\n## 3[ .。।۔]+[^\r\n]*\r?\n\s*\r?\n)([^\r\n]+)/g;
 if([...canonical.matchAll(pattern)].length!==1)throw Error('One section3 scope paragraph required '+lang);
 return canonical.replace(pattern,(_,heading)=>heading+paragraph+'\n\nKOVA · 2026-10-29 · DRAFT');
}
