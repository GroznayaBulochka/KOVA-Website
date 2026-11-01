// One-off registration of unchanged native Emulator camera captures.
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {join} from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root=new URL('../../../',import.meta.url);
const require=createRequire(join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/_kova.cjs'));
const sharp=require('sharp');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const context={window:{}};
vm.runInNewContext(await readFile(new URL('phone-preview-data.js',root),'utf8'),context);
const data=context.window.KOVA_PHONE_DATA;
for(const [lang,labels] of Object.entries(data.ui)){
  const folder={en:'values',zh:'values-zh-rCN',yue:'values-b+yue',pnb:'values-b+pnb'}[lang]||'values-'+lang;
  const directory=new URL('../KOVA-App/app/src/main/res/'+folder+'/',root);
  const xml=(await Promise.all((await readdir(directory)).filter(f=>f.endsWith('.xml')).map(f=>readFile(new URL(f,directory),'utf8')))).join('\n');
  for(const [key,source] of Object.entries({details:'achievement_announcement_details',income_goal_description:'widget_description_income_goals',savings_goal_description:'gl_savings_basis'})){
    const value=xml.match(new RegExp('<string name="'+source+'"[^>]*>([\\s\\S]*?)<\\/string>'))?.[1];
    assert.ok(value,lang+': '+key+' translation exists');
    labels[key]=value.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/\\'/g,"'");
  }
}
const hit=(target,bounds)=>({target,bounds});
const navigation=[hit('back',[32,80,155,155]),hit('home',[60,2145,300,160]),hit('notes',[390,2145,300,160]),hit('more',[720,2145,300,160])];
const tabs=[hit('budgets',[45,225,320,125]),hit('income-goal',[380,225,320,125]),hit('savings-goal',[715,225,320,125])];
const dismiss=[hit('back',[0,0,1080,1720]),hit('back',[420,1740,240,95])];
data.screens=[
  {id:'income-goal',titleKey:'income_goal_tab',captionKey:'income_goal_description',image:'assets/screenshots/preview-income-goal.png',icon:'chart',hotspots:[...navigation,...tabs,hit('income-detail',[45,1140,990,140])]},
  {id:'savings-goal',titleKey:'savings_goal_tab',captionKey:'savings_goal_description',image:'assets/screenshots/preview-savings-goal.png',icon:'target',hotspots:[...navigation,...tabs,hit('savings-detail',[45,1240,990,140])]},
  {id:'settings',titleKey:'settings',captionKey:'settings_subtitle',image:'assets/screenshots/preview-settings.png',icon:'workspace',hotspots:navigation},
  {id:'income-detail',titleKey:'income_goal_tab',titleSuffixKey:'details',captionKey:'income_goal_description',catalog:false,image:'assets/screenshots/preview-income-detail.png',icon:'chart',hotspots:dismiss},
  {id:'savings-detail',titleKey:'savings_goal_tab',titleSuffixKey:'details',captionKey:'savings_goal_description',catalog:false,image:'assets/screenshots/preview-savings-detail.png',icon:'target',hotspots:dismiss}
];
data.links={budgets:tabs.filter(t=>t.target!=='budgets')};
await writeFile(new URL('phone-preview-data.js',root),'// Navigation labels from app resources; captures have independent provenance in qa/artifacts.\nwindow.KOVA_PHONE_DATA = '+JSON.stringify(data,null,2)+';\n');
const desktopNames={'income-goal':'Screenshot_1793522215.png','income-detail':'Screenshot_1793522279.png','savings-goal':'Screenshot_1793522378.png','savings-detail':'Screenshot_1793522433.png',settings:'Screenshot_1793522665.png'};
const screenshots=[],derivatives=[];
for(const screen of data.screens){
  const raw=await readFile(new URL(screen.id+'.png',import.meta.url));
  const asset=await readFile(new URL(screen.image,root));
  assert.equal(hash(raw),hash(asset),screen.id+': unchanged original PNG');
  const metadata=await sharp(raw).metadata();
  assert.equal(metadata.width,1080);assert.equal(metadata.height,2400);
  screenshots.push({id:screen.id,asset:screen.image,original:'qa/artifacts/phone-expansion-2026-11-01/'+screen.id+'.png',nativeFile:desktopNames[screen.id],bytes:raw.length,sha256:hash(raw),width:1080,height:2400,edited:false});
  for(const width of [360,720]){
    const path=screen.image.replace('/preview-','/thumbs/preview-').replace('.png','-'+width+'.webp');
    const bytes=await sharp(raw).resize({width}).webp({quality:84,effort:5}).toBuffer();
    await writeFile(new URL(path,root),bytes);
    derivatives.push({asset:path,sourceSha256:hash(raw),sha256:hash(bytes),width,bytes:bytes.length,transformation:'Aspect-preserving resize and WebP encoding only'});
  }
}
const provenance={capturedAt:'2026-11-01',data:'FICTIONAL_TEST_PROFILE_ONLY',captureMethod:'Native Android Emulator toolbar camera operated through CUA; unchanged PNG files',runtime:{avd:'KovaLocalFreemium16k_20261024',serial:'emulator-5580',packageName:'com.kova.budget.offlinequalification',versionName:'1.0.8',versionCode:10,apkSha256:'cfbf641b707c02dbae7b3dc03db2e6966a12d5d43b34b7b181842c2471a7c1a9',api:37,pageSize:16384,language:'en',theme:'DARK',profile:'Existing synthetic SAF49 test profile; no private profile published',purchaseMade:false},fixture:{method:'Ordinary app UI on isolated test emulator',incomeGoal:{category:'Salary',targetPLN:6200,period:'Monthly',month:'2026-11',receivedPLN:0},savingsGoal:{category:'Bonus',targetPLN:1000,period:'Monthly',month:'2026-11',savedPLN:0},notes:'Enabled Budgets and Goals in test profile feature settings. These savings goals track booked category income, not a separate savings account. No money was transferred; no bank connection or real financial transaction.'},screenshots,derivatives,published:false};
await writeFile(new URL('provenance.json',import.meta.url),JSON.stringify(provenance,null,2)+'\n');
console.log(JSON.stringify({result:'PASS',newCaptures:screenshots.length,derivatives:derivatives.length,languages:Object.keys(data.ui).length}));
