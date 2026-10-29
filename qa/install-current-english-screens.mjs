// Copies genuine Android screenshots; only responsive thumbnails are resized.
import {readFile,writeFile,mkdir,copyFile,access} from 'node:fs/promises';
import {constants} from 'node:fs';
import {resolve} from 'node:path';import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';import {createRequire} from 'node:module';
const root=fileURLToPath(new URL('..',import.meta.url)), app=resolve(root,'../KOVA-App');
const label=process.argv[2]||'website53-en-20261029-01';
if(!/^website(?:53|54)-en-20261029-\d+$/.test(label))throw Error('Known isolated capture label required');
const sourceNumber=label.startsWith('website54')?54:53;
const evidence='qa/artifacts/presentation-2026-10-29'+(sourceNumber===54?'-source54':'');
const source=resolve(app,'docs/release/release-closeout-20261028',label),out=resolve(root,evidence);
try{await access(resolve(out,'provenance.json'));throw Error('No completed screenshot evidence overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
const result=JSON.parse(await readFile(resolve(source,'result.json'),'utf8'));
if(result.status!=='PASS_ACTUAL_ENGLISH_UI_SYNTHETIC_ROOM_ORACLE_MOCK_PREMIUM'||result.payments!==0||result.physicalPhoneCommands!==0||result.runtime.language!=='en'||result.runtime.pageSize!==16384)throw Error('Actual English capture assertions required');
const fixture=JSON.parse(await readFile(resolve(source,'captures/fixture-verification.json'),'utf8'));
if(fixture.status!=='PASS_INDEPENDENT_ROOM_ORACLE'||fixture.salaries!==6||fixture.notes!==3||Object.keys(fixture.accountBalancesMinorPLN).length!==3)throw Error('Independent fictional finance oracle required');
const hash=b=>createHash('sha256').update(b).digest('hex');
const require=createRequire('C:/Users/vlad2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/_kova.cjs');
const sharp=require('sharp');
await mkdir(resolve(out,'previous-assets'),{recursive:true});
const screenshots=[],derivatives=[];
for(const id of ['home','accounts','transactions','budgets','recurring','reports','calendar','notes','work']){
 const asset='assets/screenshots/'+(id==='work'?'kova-work-income':'offline-demo-'+id)+'.png';
 const original=evidence+'/'+id+'.png',uiEvidence=evidence+'/'+id+'.xml';
 const png=await readFile(resolve(source,'captures/final-'+id+'.png')),xml=await readFile(resolve(source,'captures/final-'+id+'.xml'));
 if(png.readUInt32BE(16)!==1080||png.readUInt32BE(20)!==2400)throw Error('Original native display must be1080x2400: '+id);
 if(!xml.toString().includes('package="com.kova.budget.offlinequalification"')||/[А-Яа-яЁё]/u.test(xml.toString()))throw Error('Unexpected package or non-English UI: '+id);
 const previous=await readFile(resolve(root,asset));
 await writeFile(resolve(out,'previous-assets',id+'.png'),previous,{flag:'wx'});
 await copyFile(resolve(source,'captures/final-'+id+'.png'),resolve(root,original),constants.COPYFILE_EXCL);
 await copyFile(resolve(source,'captures/final-'+id+'.xml'),resolve(root,uiEvidence),constants.COPYFILE_EXCL);
 await writeFile(resolve(root,asset),png);
 screenshots.push({id,asset,original,uiEvidence,uiSha256:hash(xml),bytes:png.length,sha256:hash(png),previousSha256:hash(previous),edited:false,tier:['reports','calendar','work'].includes(id)?'Pro':id==='home'?'Free_and_Pro_fixture':'Free'});
 for(const width of [360,720]){
  const target=asset.replace('.png','').replace('assets/screenshots/','assets/screenshots/thumbs/')+'-'+width+'.webp';
  const bytes=await sharp(png).resize({width,withoutEnlargement:true}).webp({quality:84,effort:5}).toBuffer();
  await writeFile(resolve(root,target),bytes);
  derivatives.push({asset:target,sourceSha256:hash(png),sha256:hash(bytes),width,bytes:bytes.length,transformation:'Aspect-preserving resize and WebP encoding only; original PNG unchanged'});
 }
}
for(const name of ['result.json','instrumentation.log','WebsiteEnglishPresentation53Test.kt'])await copyFile(resolve(source,name),resolve(out,name),constants.COPYFILE_EXCL);
await copyFile(resolve(source,'captures/fixture-verification.json'),resolve(out,'fixture-verification.json'),constants.COPYFILE_EXCL);
const provenance={capturedAt:result.finishedAtUtc,data:'FICTIONAL_SYNTHETIC_ONLY',captureMethod:'UiDevice.takeScreenshot; unchanged PNG bytes',runtime:{...result.runtime,packageName:'com.kova.budget.offlinequalification',contract:'KOVA_PHONE_LOCAL_FREEMIUM_V1',internetPermission:false,apkSha256:result.targetApkSha256,testApkSha256:result.testApkSha256,profile:'Marta — fictional English presentation owner, independent UUID/SQLCipher database',normalUiSetup:'Actual MainActivity; ordinary More navigation; no setContent or injected route; English DARK font1.0. Fixture is provisioned in instrumentation, not entered manually.',premium:'INSTRUMENTATION_ONLY_MOCK_NOT_PLAY',scope:'Presentation images, not proof of a Play purchase, production signing or full release qualification'},fixture:{verification:'PASS',...fixture,testSource:evidence+'/WebsiteEnglishPresentation53Test.kt',testSourceSha256:result.testSourceSha256,sourceShippingInputsSha256:result.source54ShippingSha256||result.source53ShippingSha256,checks:'Independent persisted account balance reconciliation, row count/owner/currency/IDs, six salaries, recurring settlement links, three notes and three category limits; checked before and after real UI navigation',exactTransactionsNetUiOracle:sourceNumber===54?'189265 minorPLN, actual displayed Money asserted':'NOT_PRESENT_IN_OLD53_CAPTURE',statisticsClaim:false},screenshots,derivatives,published:false};
await writeFile(resolve(out,'provenance.json'),JSON.stringify(provenance,null,2)+'\n',{flag:'wx'});
const config=JSON.parse(await readFile(resolve(root,'release-config.json'),'utf8'));
config.presentationEvidence=evidence+'/provenance.json';config.presentationLanguage='en';config.presentationScreens=9;config.presentationSource=sourceNumber;
await writeFile(resolve(root,'release-config.json'),JSON.stringify(config,null,2)+'\n');
console.log(JSON.stringify({status:'NINE_AUTHENTIC_ENGLISH_IMAGES_INSTALLED',screenshots:9,derivatives:18,published:false}));
