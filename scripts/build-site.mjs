// Public output is an allowlist. Never deploy the repository root.
import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
const root = fileURLToPath(new URL('..',import.meta.url));
const config = JSON.parse(await readFile(resolve(root,'release-config.json'),'utf8'));
if (process.argv.includes('--release')) {
  const missing = ['operatorApproved','operatorLegalQualified','supportContactApproved','supportContactOperationallyVerified','domainApprovedByOwner','hostingVerified','legalApproved','publicationApproved'].filter(key=>config[key]!==true);
  let validOrigin=false;
  try { const u=new URL(config.canonicalOrigin); validOrigin=u.protocol==='https:' && u.origin===config.canonicalOrigin && !u.username && !u.password; } catch {}
  if (!validOrigin) missing.push('canonicalOrigin');
  if (missing.length) { console.error('BLOCKED: '+missing.join(', ')); process.exit(2); }
}
const pages=['index','status','roadmap','updates','security','contact','delete-account','privacy','terms','cookies','404'];
const files=[
  ...pages.map(p=>p+'.html'),
  'landing.css','site-ui.css','styles.css','workspace.css',
  'landing.js','site-shell.js','language-picker.js','project-content.js','project-pages.js','legal-document.js','document-language.js',
  'site.webmanifest','assets/logo.svg','assets/icons.svg','assets/hero-visual.webp',
  ...['home','accounts','transactions','budgets','recurring','reports','calendar','notes'].map(id=>`assets/screenshots/offline-demo-${id}.png`),
  ...['privacy-policy','terms-of-service'].flatMap(k=>['pl','en','ru'].map(l=>`legal/${k}-${l}.md`))
];
// Fail on unexpected output instead of deleting or accidentally shipping old private files.
const out=resolve(root,'dist');
const generated=['robots.txt','_headers'];
if (process.argv.includes('--release')) generated.push('sitemap.xml');
const permitted=new Set([...files,...generated]);
async function list(dir,prefix='') {
  let entries; try { entries=await readdir(dir,{withFileTypes:true}); } catch(e) { if(e.code==='ENOENT')return []; throw e; }
  const result=[];
  for(const e of entries) {
    const name=prefix+e.name;
    if(e.isSymbolicLink())throw new Error('Symlink in output: '+name);
    if(e.isDirectory())result.push(...await list(resolve(dir,e.name),name+'/')); else result.push(name);
  }
  return result;
}
for(const name of await list(out)) if(!permitted.has(name))throw new Error('Unexpected output file; inspect before rebuilding: '+name);
await mkdir(out,{recursive:true});
const pins=[];
for(const name of files) {
  const dest=resolve(out,name); await mkdir(dirname(dest),{recursive:true});
  if(name.endsWith('.html')) {
    let html=await readFile(resolve(root,name),'utf8');
    html=html.replace(/<a\b[^>]*\bdata-local-workspace\b[^>]*>[\s\S]*?<\/a>/g,'');
    if (!process.argv.includes('--release')) {
      html=html.replace(/<meta name="robots"[^>]*>/g,'');
      html=html.replace('</head>','<meta name="robots" content="noindex,nofollow">\n</head>');
    }
    if(config.canonicalOrigin && process.argv.includes('--release')) {
      const url=config.canonicalOrigin+'/'+(name==='index.html'?'':name);
      html=html.replace('</head>',`<link rel="canonical" href="${url}">\n</head>`);
    }
    await writeFile(dest,html);
  } else await copyFile(resolve(root,name),dest);
  const bytes=await readFile(dest); pins.push({file:name,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
const isRelease=process.argv.includes('--release');
await writeFile(resolve(out,'robots.txt'),isRelease?'User-agent: *\nAllow: /\nSitemap: '+config.canonicalOrigin+'/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
if(isRelease) await writeFile(resolve(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(p=>p!=='404').map(p=>`<url><loc>${config.canonicalOrigin}/${p==='index'?'':p+'.html'}</loc></url>`).join('')}</urlset>`);
await writeFile(resolve(out,'_headers'),`/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
${isRelease?'':'  X-Robots-Tag: noindex, nofollow'}
`);
await mkdir(resolve(root,'qa/artifacts/release-2026-10-21'),{recursive:true});
await writeFile(resolve(root,'qa/artifacts/release-2026-10-21/build.json'),JSON.stringify({mode:isRelease?'release':'preview',published:false,generatedAt:new Date().toISOString(),files:pins,excluded:['workspace.html','workspace.js','workspace-access.js','qa','scripts','.git','.well-known/security.txt','old intro and excluded-feature screenshots'],blockers:config},null,2));
console.log(JSON.stringify({result:'PASS',mode:isRelease?'release':'preview',publicFiles:files.length,output:out,published:false}));
