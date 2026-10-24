import { spawnSync } from 'node:child_process';
import { readdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const cwd=fileURLToPath(new URL('..',import.meta.url));
let appAvailable=true;try{await access(new URL('../../KOVA-App/docs/release/local-freemium-legal',import.meta.url));}catch{appAvailable=false;}
const commands=[
 ['qa/static-check.mjs'],
 ['qa/localization-check.mjs'],
 ['qa/language-selection-check.mjs'],
 ['qa/public-contract-check.mjs',...(appAvailable?['../KOVA-App']:[])],
 ['qa/offline-content-check.mjs'],
 ['qa/presentation-check.mjs'],
 ['qa/prelaunch-check.mjs'],
 ['qa/asset-versioning-check.mjs'],
 ['qa/analytics-contract.mjs'],
 ['qa/seo-check.mjs'],
 ['qa/legal-links-check.mjs'],
 ['qa/workspace-access-check.mjs'],
 ['qa/workspace-preservation-check.mjs'],
 ...(await readdir(cwd)).filter(n=>n.endsWith('.js')).map(n=>['--check',n])
];
let failed=0;
for(const args of commands){
 const r=spawnSync(process.execPath,args,{cwd,encoding:'utf8'});
 console.log(JSON.stringify({command:['node',...args],exitCode:r.status,output:r.stdout.trim(),error:r.stderr.trim()}));
 if(r.status!==0)failed++;
}
console.log(JSON.stringify({checks:commands.length,failed,result:failed?'FAIL':'PASS'}));
process.exitCode=failed?1:0;
