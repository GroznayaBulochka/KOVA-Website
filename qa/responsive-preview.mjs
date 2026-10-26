// Read-only local fixture for inspecting the real build in fixed-width frames.
// It is outside the public build allowlist and never belongs in a deployment.
import http from 'node:http';
import {readFile,realpath,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=await realpath('dist');
const languages=JSON.parse(await readFile('language-registry.json','utf8'));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.md':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Robots-Tag','noindex, nofollow');
 try{
  if(req.method!=='GET'){res.writeHead(405);return res.end();}
  const url=new URL(req.url,'http://127.0.0.1:4175');
  if(url.pathname==='/responsive-check'){
   const lang=url.searchParams.get('lang')||'pl',width=Number(url.searchParams.get('width')||360);
   if(!Object.hasOwn(languages,lang)||![360,390,768,1440].includes(width))throw Error('Invalid case');
   res.setHeader('Content-Type','text/html; charset=utf-8');
   return res.end(`<!doctype html><html lang="en"><title>KOVA local responsive check</title><style>body{margin:0;background:#d7d8d3;font:14px sans-serif}p{margin:12px}iframe{display:block;border:0;width:${width}px;height:1800px}</style><p>Local preview · ${lang} · ${width}px · no publication</p><iframe title="KOVA ${lang} ${width}px" src="/index${lang==='pl'?'':'-'+lang}.html?lang=${lang}#analysis-data"></iframe></html>`);
  }
  const path=decodeURIComponent(url.pathname);
  if(path.split('/').some(p=>p.startsWith('.')))throw Error('Private path');
  const target=await realpath(resolve(root,'.'+(path==='/'?'/index.html':path)));
  if(!target.startsWith(root+sep)||!(await stat(target)).isFile())throw Error('Outside build');
  res.setHeader('Content-Type',mime[extname(target)]||'application/octet-stream');res.end(await readFile(target));
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4175,'127.0.0.1',()=>console.log('Read-only QA fixture: http://127.0.0.1:4175/responsive-check'));
