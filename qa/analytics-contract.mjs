import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const read=n=>readFile(new URL(n,root),'utf8');
const config=JSON.parse(await read('release-config.json'));
const consent=await read('site-consent.js');
const checks=[];
const check=(name,fn)=>{fn();checks.push(name);};
check('Owner measurement identity matches runtime',()=>{assert.equal(config.websiteAnalytics.measurementId,'G-2LE3GWYDZM');assert.ok(consent.includes(`const ID = '${config.websiteAnalytics.measurementId}'`));});
check('Remote verification never inferred from local code',()=>{assert.equal(config.websiteAnalytics.accountConfigurationVerified,false);assert.equal(config.websiteAnalytics.liveReceptionVerified,false);});
for(const page of ['index','status','roadmap','updates','security','contact','delete-account','privacy','terms','cookies','404']){
 const html=await read(page+'.html');
 check(page+': one shared consent manager, no eager Google resource',()=>{
  assert.equal((html.match(/src="site-consent.js"/g)||[]).length,1);
  assert.ok(!/googletagmanager|google-analytics\.com|gtag\(/.test(html));
 });
}
const workspace=await read('workspace.html');
check('Private Workspace has no analytics manager',()=>assert.ok(!/site-consent|googletagmanager|google-analytics/.test(workspace)));
const build=await read('scripts/build-site.mjs');
check('Release gate requires real account configuration review',()=>assert.ok(build.includes("missing.push('websiteAnalytics.accountConfigurationVerified')")));
const headers=await read('dist/_headers');
check('CSP keeps eval/inline scripts/advertising servers blocked',()=>{
 const scripts=headers.match(/script-src ([^;]+)/)[1];assert.ok(!/unsafe-inline|unsafe-eval|\*/.test(scripts));
 assert.ok(!/doubleclick|googlesyndication|googleadservices/.test(headers));
 assert.ok(headers.includes("frame-ancestors 'none'"));
});
check('No arbitrary measurement URL, no collected user identifiers',()=>{
 assert.ok(!/user_id\s*:|user_properties\s*:|localStorage\.getItem\('.*endpoint/i.test(consent));
 assert.ok(consent.includes("read() === 'analytics'"));
});
console.log(JSON.stringify({result:'PASS',checks:checks.length,passed:checks}));
