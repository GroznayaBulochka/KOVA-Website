import {spawnSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const folder=resolve(root,'qa/artifacts/presentation-2026-10-21');
const cases=['pl','en','ru'].flatMap(lang=>[
  {lang,width:390,height:844,mode:'video'},
  {lang,width:1440,height:1000,mode:'full'}
]).concat([{lang:'ru',width:320,height:700,mode:'video'},{lang:'pl',width:1440,height:1000,mode:'video'},{lang:'en',width:550,height:900,mode:'full'}]);
const pins={};
for(const name of ['index.html','landing.js','landing.css','qa/site-smoke.mjs']) pins[name]=createHash('sha256').update(await readFile(resolve(root,name))).digest('hex');
const results=[];
for(const item of cases){
  const id=`web-${item.lang}-${item.width}-${item.mode}`;
  const args=['qa/site-smoke.mjs',`http://127.0.0.1:4174/index.html?lang=${item.lang}`,`${folder}/${id}.png`,String(item.width),String(item.height),item.mode];
  const run=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:60000});
  await writeFile(`${folder}/${id}.log`,(run.stdout||'')+'\n'+(run.stderr||'')+(run.error||''));
  results.push({...item,id,command:['node',...args],exitCode:run.status,status:run.status===0?'PASS':'FAIL'});
  await writeFile(`${folder}/web-results.json`,JSON.stringify({recordedAt:new Date().toISOString(),sourceHashes:pins,environment:'Isolated headless Edge; loopback preview; no owner browser data',results},null,2));
  console.log(`${results.at(-1).status} ${id}`);
}
console.log(JSON.stringify({total:results.length,passed:results.filter(r=>r.status==='PASS').length,failed:results.filter(r=>r.status==='FAIL').length}));
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
