import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
const project=fileURLToPath(new URL('..',import.meta.url));
const root=await realpath(process.argv.includes('--source')?project:resolve(project,'dist'));
// Preserve the owner's historical Workspace origin and its existing localStorage.
const port=Number(process.env.PORT||(process.argv.includes('--source')?4173:4174));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.webmanifest':'application/manifest+json'};
const server=http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-Robots-Tag','noindex, nofollow');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
  res.setHeader('Cache-Control','no-store');
  try {
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname.split('/').some(p=>p.startsWith('.')||['qa','scripts'].includes(p)))throw new Error('Private path');
    const target=await realpath(resolve(root,'.'+(pathname==='/'?'/index.html':pathname)));
    if(!target.startsWith(root+sep) || !(await stat(target)).isFile())throw new Error('Outside root');
    const content=await readFile(target);res.writeHead(200,{'Content-Type':mime[extname(target)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:content);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(req.method==='HEAD'?undefined:await readFile(resolve(root,'404.html')));
  }
});
server.listen(port,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+port+' ('+root+')'));
