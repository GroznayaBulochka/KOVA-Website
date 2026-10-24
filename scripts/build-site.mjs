// Public output is an allowlist. Never deploy the repository root.
import { readFile, writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import {pages,languages,file,prepareRenderer,sitemap,robots} from './seo.mjs';
import {publicRelease} from './release-data.mjs';
import {buildVersion,versionReferences,sha256} from './asset-versioning.mjs';
const root = fileURLToPath(new URL('..',import.meta.url));
const config = JSON.parse(await readFile(resolve(root,'release-config.json'),'utf8'));
await writeFile(resolve(root,'release-public.js'),'// Generated from release-config.json.\nwindow.KOVA_RELEASE = '+JSON.stringify(publicRelease(config))+';\n');
if (process.argv.includes('--release')) {
  const missing = ['operatorApproved','operatorLegalQualified','supportContactApproved','supportContactOperationallyVerified','domainApprovedByOwner','hostingVerified','legalApproved','publicationApproved'].filter(key=>config[key]!==true);
  if (config.websiteAnalytics?.accountConfigurationVerified !== true) missing.push('websiteAnalytics.accountConfigurationVerified');
  let validOrigin=false;
  try { const u=new URL(config.canonicalOrigin); validOrigin=u.protocol==='https:' && u.origin===config.canonicalOrigin && !u.username && !u.password; } catch {}
  if (!validOrigin) missing.push('canonicalOrigin');
  if (missing.length) { console.error('BLOCKED: '+missing.join(', ')); process.exit(2); }
}
const isRelease=process.argv.includes('--release');
const renderSeo=await prepareRenderer(new URL('../',import.meta.url));
const files=[
  ...pages.map(p=>p+'.html'),
  'landing.css','site-ui.css','styles.css','workspace.css',
  'language-config.js','language-options.js','translations.js','landing.js','site-shell.js','site-consent.js','site-seo.js','language-picker.js','project-content.js','project-pages.js','legal-document.js','document-language.js','runtime-bootstrap.js','release-public.js','site-release.js',
  'site.webmanifest','CNAME','assets/logo.svg','assets/icons.svg','assets/hero-visual.webp','assets/social/kova.png',
  ...['home','accounts','transactions','budgets','recurring','reports','calendar','notes'].map(id=>`assets/screenshots/offline-demo-${id}.png`),
  'assets/screenshots/kova-work-income.png',
  ...['offline-demo-home','offline-demo-accounts','offline-demo-transactions','offline-demo-budgets','offline-demo-recurring','offline-demo-reports','offline-demo-calendar','offline-demo-notes','kova-work-income'].flatMap(id=>[360,720].map(width=>`assets/screenshots/thumbs/${id}-${width}.webp`)),
  ...languages.filter(l=>!['pl','en','ru'].includes(l)).map(l=>`locales/${l}.json`),
  ...['privacy-policy','terms-of-service'].flatMap(k=>languages.map(l=>`legal/${k}-${l}.md`))
];
// Fail on unexpected output instead of deleting or accidentally shipping old private files.
const out=resolve(root,'dist');
const generated=['robots.txt','_headers','sitemap.xml','build-manifest.json',...pages.flatMap(p=>languages.filter(l=>l!=='pl').map(l=>file(p,l)))];
const permitted=new Set([...files,...generated]);
const assets=new Set(files.filter(name=>!name.endsWith('.html')&&name!=='CNAME'));
const inputs=await Promise.all([...files,'release-config.json','scripts/seo.mjs','scripts/build-site.mjs','scripts/asset-versioning.mjs','scripts/release-data.mjs'].map(async name=>[name,await readFile(resolve(root,name))]));
const version=buildVersion([...inputs,['mode',isRelease?'release':'preview']]);
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
    html=html.replace('</head>','<script src="site-seo.js"></script>\n</head>');
    const page=name.slice(0,-5);
    for(const language of languages){
      const target=file(page,language);
      const rendered=await renderSeo(html,page,language,config.canonicalOrigin,isRelease);
      const scripts=[];
      let optimized=rendered.replace(/<script\b[^>]*src="([^"]+)"[^>]*\bdefer[^>]*><\/script>/g,(tag,src)=>{if(src!=='translations.js')scripts.push(src);return '';});
      optimized=optimized.replace('</body>',`<script type="application/json" id="kova-runtime-scripts">${JSON.stringify(scripts)}</script><script src="runtime-bootstrap.js" defer></script>\n</body>`);
      optimized=optimized.replace('</head>',`<meta name="kova-build" content="${version}">\n</head>`);
      optimized=versionReferences(optimized,assets,version);
      await writeFile(resolve(out,target),optimized);
      if(language!=='pl')pins.push({file:target,bytes:Buffer.byteLength(optimized),sha256:createHash('sha256').update(optimized).digest('hex')});
    }
  } else if(/\.(?:js|css|webmanifest)$/.test(name)) {
    const source=await readFile(resolve(root,name),'utf8');
    await writeFile(dest,versionReferences(source,assets,version,{imagesOnly:name.endsWith('.js')}));
  } else await copyFile(resolve(root,name),dest);
  const bytes=await readFile(dest); pins.push({file:name,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile(resolve(out,'robots.txt'),robots(config.canonicalOrigin,isRelease));
// Preview exposes an empty sitemap, never a sitemap advertising draft URLs.
await writeFile(resolve(out,'sitemap.xml'),isRelease?sitemap(config.canonicalOrigin):'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>\n');
await writeFile(resolve(out,'_headers'),`/*
  Cache-Control: no-cache
  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com; connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
${isRelease?'':'  X-Robots-Tag: noindex, nofollow'}
/legal/*
  X-Robots-Tag: noindex, nofollow
`);
// No private configuration or local paths in this public manifest.
const manifestFiles=[];
for(const name of (await list(out)).filter(name=>name!=='build-manifest.json').sort()) {
  const bytes=await readFile(resolve(out,name));
  manifestFiles.push({path:name,bytes:bytes.length,sha256:sha256(bytes)});
}
await writeFile(resolve(out,'build-manifest.json'),JSON.stringify({version,mode:isRelease?'release':'preview',files:manifestFiles},null,2)+'\n');
await mkdir(resolve(root,'qa/artifacts/release-2026-10-21'),{recursive:true});
await writeFile(resolve(root,'qa/artifacts/release-2026-10-21/build.json'),JSON.stringify({mode:isRelease?'release':'preview',published:false,generatedAt:new Date().toISOString(),files:pins,excluded:['workspace.html','workspace.js','workspace-access.js','qa','scripts','.git','.well-known/security.txt','old intro and excluded-feature screenshots'],blockers:config},null,2));
console.log(JSON.stringify({result:'PASS',mode:isRelease?'release':'preview',version,publicFiles:manifestFiles.length+1,output:out,published:false}));
