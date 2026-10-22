// Render an HTML/CSS brand card with an unchanged real demo screenshot.
// No generated/fabricated app UI, no network, no image-generation service.
import {spawn} from 'node:child_process';
import {mkdtemp,readFile,writeFile,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const png=await readFile(resolve(root,'assets/screenshots/offline-demo-home.png'));
const logo=await readFile(resolve(root,'assets/logo.svg'));
const backdrop=await readFile(resolve(root,'assets/hero-visual.webp'));
const data=(mime,bytes)=>`data:${mime};base64,${bytes.toString('base64')}`;
const html=`<!doctype html><html><meta charset="utf-8"><style>
*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden;font-family:Arial,sans-serif;color:#fcf7ec;background:#0c1511}
body{background-image:linear-gradient(90deg,#08130df2 10%,#08130dd9 60%,#08130d66),url('${data('image/webp',backdrop)}');background-size:cover}
.content{position:absolute;left:70px;top:66px;width:660px}.brand{display:flex;align-items:center;gap:20px;font-size:54px;letter-spacing:.12em;font-weight:700}.brand img{width:70px;height:70px}
h1{font-size:66px;line-height:1.08;font-weight:600;letter-spacing:-2px;margin:52px 0 24px}em{color:#f3c26a;font-style:normal}p{font-size:24px;color:#ddd6c5;line-height:1.5;margin:0}.chips{display:flex;gap:12px;margin-top:34px}.chips span{border:1px solid #c89e5066;padding:10px 18px;border-radius:30px;font-size:16px;color:#efd59f}
.phone{position:absolute;right:102px;top:42px;width:249px;height:548px;border:7px solid #68654e;border-radius:34px;overflow:hidden;transform:rotate(6deg);box-shadow:0 24px 70px #000b;background:#080b09}.phone img{width:100%;height:100%;object-fit:cover;object-position:top}.url{position:absolute;bottom:36px;left:70px;color:#aaa997;letter-spacing:.08em;font-size:16px}
</style><div class="content"><div class="brand"><img src="${data('image/svg+xml',logo)}" alt="">KOVA</div><h1>Your finances.<br><em>Offline. On Android.</em></h1><p>Expenses · Budgets · Savings goals</p><div class="chips"><span>FREE V1 · IN DEVELOPMENT</span><span>PL / EN / RU</span></div></div><div class="phone"><img src="${data('image/png',png)}" alt="KOVA — fictional demo finances"></div><div class="url">kovacompass.app</div></html>`;
const profile=await mkdtemp(join(tmpdir(),'kova-seo-social-'));
const edge=process.env.KOVA_EDGE||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser=spawn(edge,['--headless=new','--disable-gpu','--hide-scrollbars','--disable-background-networking','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));let socket,send;
try{
 let port;for(let n=0;n<60&&!port;n++){try{port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split(/\r?\n/)[0]);}catch{await delay(100);}}
 if(!port)throw Error('No browser port');
 const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
 socket=new WebSocket(targets.find(x=>x.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
 const pending=new Map();let id=0;socket.onmessage=e=>{const m=JSON.parse(e.data),p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.j(Error(m.error.message)):p.r(m.result);}};
 send=(method,params={})=>new Promise((r,j)=>{const n=++id;pending.set(n,{r,j});socket.send(JSON.stringify({id:n,method,params}));});
 await send('Page.enable');await send('Emulation.setDeviceMetricsOverride',{width:1200,height:630,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:'data:text/html;base64,'+Buffer.from(html).toString('base64')});
 await delay(1000);
 const state=await send('Runtime.evaluate',{expression:'document.readyState === "complete" && [...document.images].every(i=>i.complete&&i.naturalWidth>0)',returnByValue:true});
 if(!state.result.value)throw Error('Social card images not loaded');
 const screenshot=await send('Page.captureScreenshot',{format:'png'});
 const out=resolve(root,'assets/social');await mkdir(out,{recursive:true});await writeFile(resolve(out,'kova.png'),Buffer.from(screenshot.data,'base64'));
 console.log(JSON.stringify({result:'PASS',width:1200,height:630,output:resolve(out,'kova.png'),sourceScreenshotUnchanged:true}));
}finally{if(send&&socket?.readyState===WebSocket.OPEN)await Promise.race([send('Browser.close').catch(()=>{}),delay(1500)]);socket?.close();if(browser.exitCode===null)browser.kill();}
