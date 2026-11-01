// Local-only harness. The iframe inherits color-scheme from its parent;
// Chromium evaluates the real prefers-color-scheme query inside the frame.
// No production CSS or runtime code is replaced for this test.
import http from 'node:http';
import {readFile,realpath,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {pages,languages,file} from '../scripts/seo.mjs';
const root=await realpath('dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.md':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Robots-Tag','noindex, nofollow');
 try{
  if(req.method!=='GET'){res.writeHead(405);return res.end();}
  const url=new URL(req.url,'http://127.0.0.1:4176');
  if(url.pathname==='/theme-compare'){
   res.setHeader('Content-Type','text/html; charset=utf-8');
   return res.end(`<!doctype html><html lang="pl" style="color-scheme:light"><title>KOVA — porównanie motywów</title><style>body{margin:0;background:#d8ddd6;font:14px system-ui;display:flex;gap:12px;padding:12px}section{width:390px;flex:none}p{margin:0 0 10px}iframe{display:block;border:0;width:390px;height:1000px}</style><section><p>Jasny motyw</p><iframe style="color-scheme:light" title="Jasny motyw KOVA" src="/index.html?lang=pl"></iframe></section><section><p>Ciemny motyw</p><iframe style="color-scheme:dark" title="Ciemny motyw KOVA" src="/index.html?lang=pl"></iframe></section></html>`);
  }
  if(url.pathname==='/theme-check'){
   const lang=url.searchParams.get('lang')||'pl',page=url.searchParams.get('page')||'index',theme=url.searchParams.get('theme')||'light',width=Number(url.searchParams.get('width')||390);
   if(!languages.includes(lang)||!pages.includes(page)||!['light','dark'].includes(theme)||![360,390,768,1440].includes(width))throw Error('Invalid case');
   res.setHeader('Content-Type','text/html; charset=utf-8');
   return res.end(`<!doctype html><html lang="pl" style="color-scheme:light"><title>KOVA — lokalny test motywów</title><style>body{margin:0;background:#d8ddd6;font:14px sans-serif}nav{padding:8px;display:flex;gap:16px;align-items:center}iframe{display:block;border:0;width:${width}px;height:1000px;color-scheme:${theme}}button{font:inherit;padding:4px 12px}</style><nav>Test lokalny · ${lang} · ${width}px <button onclick="document.querySelector('iframe').style.colorScheme='light'">Jasny</button><button onclick="document.querySelector('iframe').style.colorScheme='dark'">Ciemny</button></nav><iframe title="KOVA" src="/${file(page,lang)}?lang=${lang}"></iframe></html>`);
  }
  const path=decodeURIComponent(url.pathname);
  if(path.split('/').some(p=>p.startsWith('.')||['qa','scripts'].includes(p)))throw Error('Private path');
  const target=await realpath(resolve(root,'.'+(path==='/'?'/index.html':path)));
  if(!target.startsWith(root+sep)||!(await stat(target)).isFile())throw Error('Outside build');
  res.setHeader('Content-Type',mime[extname(target)]||'application/octet-stream');res.end(await readFile(target));
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4176,'127.0.0.1',()=>console.log('Theme QA: http://127.0.0.1:4176/theme-check'));
