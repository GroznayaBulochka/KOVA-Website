// Render code-native artwork from the existing logo, mountain and real app screen.
import {writeFile,readFile,copyFile,access} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const url=name=>pathToFileURL(resolve(name)).href;
const html=`<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden}body{font-family:'Segoe UI',system-ui,sans-serif;color:#f5f5ea;background:#101511 url('${url('assets/hero-visual.webp')}') center/cover}.shade{position:absolute;inset:0;background:linear-gradient(90deg,#0b140ef7,#0b140ecf 58%,#0b140e77)}main{position:relative;padding:54px 60px;width:820px}.brand{display:flex;align-items:center;gap:18px;font-size:32px;letter-spacing:.15em;font-weight:700}.brand img{width:58px;height:58px}h1{font-size:63px;line-height:1.08;letter-spacing:-.04em;margin:38px 0 20px}h1 em{font-style:normal;color:#f3bd56}.copy{font-size:23px;color:#d1dbc9}.badge{display:inline-block;margin:18px 10px 0 0;border:1px solid #d8b97177;border-radius:20px;padding:10px 16px;font-size:17px;color:#f4cf82}.foot{margin-top:44px;color:#c7cdbb;font-size:17px}.phone{position:absolute;top:45px;right:75px;height:553px;width:251px;padding:6px;border:2px solid #d8c58e88;border-radius:32px;background:#151912;transform:rotate(6deg)}.phone img{width:100%;height:100%;object-fit:contain;border-radius:25px}</style><div class="shade"></div><main><div class="brand"><img src="${url('assets/logo.svg')}">KOVA</div><h1>Your money.<br><em>A clearer plan.</em></h1><p class="copy">Spending · Budgets · Work income</p><span class="badge">Free base + optional Premium</span><span class="badge">Coming to Android</span><p class="foot">kovacompass.app · KOVA Development</p></main><div class="phone"><img src="${url('assets/screenshots/offline-demo-home.png')}"></div>`;
const config=JSON.parse(await readFile('release-config.json','utf8'));
if(config.presentationLanguage!=='en'||config.presentationScreens!==9)throw Error('Current English photos required before social card rendering');
const suffix=process.argv[2]||'';
if(!['','-source54'].includes(suffix))throw Error('Known current social render only');
const path=resolve('qa/artifacts/content-refresh-2026-10-29/social-card'+suffix+'.html');
const backup=resolve('qa/artifacts/content-refresh-2026-10-29/before/social-kova'+suffix+'.png');
try{await access(backup);throw Error('No original social artwork backup overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
await copyFile(resolve('assets/social/kova.png'),backup);
await writeFile(path,html.replace('Coming to Android','Beta · Coming to Android').replace('kovacompass.app · KOVA Development','kovacompass.app · Fictional demo · Free / Pro'));
const require=createRequire('C:/Users/vlad2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/_kova.cjs');
const {chromium}=require('playwright');
const b=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--disable-background-networking','--disable-component-update']});
try{
 const page=await b.newPage({viewport:{width:1200,height:630}});
 await page.route(/^https?:\/\//,route=>route.abort());
 await page.goto(pathToFileURL(path).href);
 await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
 await page.screenshot({path:resolve('assets/social/kova.png')});
 const bytes=await readFile('assets/social/kova.png');
 await writeFile(resolve('qa/artifacts/content-refresh-2026-10-29/social-card'+suffix+'.json'),JSON.stringify({atUtc:new Date().toISOString(),status:'PASS_CODE_NATIVE_HTML_RENDER',width:1200,height:630,sourceAppScreenshot:config.presentationEvidence,sourceAppPixelsNotRetouched:true,outputSha256:createHash('sha256').update(bytes).digest('hex'),published:false},null,2));
}finally{await b.close();}
