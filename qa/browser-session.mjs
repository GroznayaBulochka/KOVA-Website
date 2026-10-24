import {spawn} from 'node:child_process';
import {mkdtemp,readFile,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
export const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export async function browserSession(){
 const profile=await mkdtemp(join(tmpdir(),'kova-audit-'));
 const process=spawn(globalThis.process.env.KOVA_EDGE||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',['--headless=new','--disable-gpu','--disable-background-networking','--no-first-run','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
 let port;for(let n=0;n<100&&!port;n++){try{port=Number((await readFile(join(profile,'DevToolsActivePort'),'utf8')).split(/\r?\n/)[0]);}catch{await delay(100);}}
 if(!port)throw Error('Edge did not start');
 const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
 const socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true});});
 let id=0;const waiting=new Map(),listeners=new Set();
 socket.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.id&&waiting.has(m.id)){const p=waiting.get(m.id);waiting.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}else for(const listener of listeners)listener(m);});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;waiting.set(n,{resolve,reject});socket.send(JSON.stringify({id:n,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
 const until=async(expression,attempts=200)=>{for(let i=0;i<attempts;i++){try{if(await evaluate(expression))return;}catch{}await delay(100);}throw Error('Timed out: '+expression);};
 const navigate=async(url,ready='document.readyState==="complete"')=>{await send('Page.navigate',{url});await until(ready);};
 const screenshot=async(path,full=false)=>{const params={format:'png',captureBeyondViewport:full};if(full){const m=await send('Page.getLayoutMetrics');params.clip={x:0,y:0,width:m.cssContentSize.width,height:m.cssContentSize.height,scale:1};}const r=await send('Page.captureScreenshot',params);await writeFile(path,Buffer.from(r.data,'base64'));};
 const key=async(key,code=key,vk)=>{for(const type of ['keyDown','keyUp'])await send('Input.dispatchKeyEvent',{type,key,code,...(vk?{windowsVirtualKeyCode:vk}:{})});};
 const close=async()=>{await Promise.race([send('Browser.close').catch(()=>{}),delay(1200)]);socket.close();if(process.exitCode===null)process.kill();};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
 return {send,evaluate,until,navigate,screenshot,key,close,on:listener=>listeners.add(listener)};
}
