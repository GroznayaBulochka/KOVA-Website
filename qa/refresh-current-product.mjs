// Mechanical synchronization of existing website fields from the actual app's
// bundled, already-localized product contract. No runtime translation service.
import {readFile,writeFile,readdir,mkdir,copyFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const root=fileURLToPath(new URL('..',import.meta.url)),app=resolve(root,'../KOVA-App');
try{await access(resolve(root,'qa/artifacts/content-refresh-2026-10-29/product-source-sync.json'));throw Error('Original content refresh already completed; preserve before-evidence, use a new scoped follow-up');}catch(e){if(e.code!=='ENOENT')throw e;}
const read=p=>readFile(resolve(root,p),'utf8');
const registry=JSON.parse(await read('language-registry.json'));
const landing=await read('landing.js'),context={window:{}};
vm.runInNewContext(landing.slice(landing.indexOf('  const dictionaries'),landing.indexOf('  const supported'))+';window.home=dictionaries;window.slides=videoSlides;',context);
vm.runInNewContext(await read('project-content.js'),context);
const baseExtra={
 pl:{demo:'fikcyjne dane demonstracyjne',pendingDecision:'Oczekuje na potwierdzenie właściciela przed publikacją'},
 en:{demo:'fictional demo data',pendingDecision:'Pending owner confirmation before publication'},
 ru:{demo:'вымышленные демонстрационные данные',pendingDecision:'Ожидается подтверждение владельца перед публикацией'}
};
const englishUi={pl:'Interfejs aplikacji po angielsku',en:'App interface in English',ru:'Интерфейс приложения на английском',de:'App-Oberfläche auf Englisch',fr:'Interface de l’application en anglais',es:'Interfaz de la aplicación en inglés',it:'Interfaccia dell’app in inglese',pt:'Interface da aplicação em inglês',uk:'Інтерфейс застосунку англійською',zh:'应用界面为英语',yue:'應用程式介面為英文',ar:'واجهة التطبيق باللغة الإنجليزية',hi:'ऐप का इंटरफ़ेस अंग्रेज़ी में है',bn:'অ্যাপের ইন্টারফেস ইংরেজিতে',ja:'アプリ画面は英語です',pnb:'ایپ دا انٹرفیس انگریزی وچ اے',jv:'Antarmuka aplikasi nganggo basa Inggris',ko:'앱 화면은 영어입니다',te:'యాప్ ఇంటర్‌ఫేస్ ఆంగ్లంలో ఉంది',mr:'अॅपचा इंटरफेस इंग्रजीत आहे',tr:'Uygulama arayüzü İngilizcedir',ur:'ایپ کا انٹرفیس انگریزی میں ہے',vi:'Giao diện ứng dụng bằng tiếng Anh',ta:'செயலியின் இடைமுகம் ஆங்கிலத்தில் உள்ளது',fa:'رابط برنامه به زبان انگلیسی است',sw:'Kiolesura cha programu kiko kwa Kiingereza',ms:'Antara muka aplikasi dalam bahasa Inggeris'};
const analyticsOff={
 pl:'Analityka strony i analityczne cookies są wyłączone. Witryna może zapamiętać język, ale nie ma dostępu do finansów w aplikacji.',
 en:'Website analytics and analytics cookies are disabled. The site may remember your language but cannot access financial records in the app.',
 ru:'Аналитика сайта и аналитические cookies отключены. Сайт может запомнить язык, но не имеет доступа к финансовым записям приложения.',
 de:'Website-Analyse und Analyse-Cookies sind deaktiviert. Die Website kann die Sprache speichern, hat aber keinen Zugriff auf die Finanzdaten der App.',
 fr:'Les statistiques du site et les cookies analytiques sont désactivés. Le site peut mémoriser la langue, mais ne peut pas accéder aux données financières de l’application.',
 es:'La analítica web y las cookies analíticas están desactivadas. El sitio puede recordar el idioma, pero no accede a los datos financieros de la aplicación.',
 it:'Le analisi del sito e i cookie analitici sono disattivati. Il sito può ricordare la lingua, ma non accede ai dati finanziari dell’app.',
 pt:'A análise do site e os cookies analíticos estão desativados. O site pode guardar o idioma, mas não acede aos dados financeiros da aplicação.',
 uk:'Аналітика сайту й аналітичні cookies вимкнені. Сайт може запам’ятати мову, але не має доступу до фінансових записів застосунку.',
 zh:'网站分析和分析类 Cookie 已停用。网站可以记住语言，但无法访问应用中的财务记录。',
 yue:'網站分析同分析 Cookie 已停用。網站可以記住語言，但無法存取應用程式入面嘅財務記錄。',
 ar:'تحليلات الموقع وملفات تعريف الارتباط التحليلية معطّلة. قد يتذكر الموقع اللغة، لكنه لا يستطيع الوصول إلى السجلات المالية في التطبيق.',
 hi:'वेबसाइट विश्लेषण और विश्लेषण कुकी बंद हैं। वेबसाइट भाषा याद रख सकती है, लेकिन ऐप के वित्तीय रिकॉर्ड नहीं देख सकती।',
 bn:'ওয়েবসাইটের বিশ্লেষণ ও বিশ্লেষণ কুকি বন্ধ আছে। সাইট ভাষা মনে রাখতে পারে, তবে অ্যাপের আর্থিক রেকর্ড দেখতে পারে না।',
 ja:'サイトのアクセス解析と解析用Cookieは無効です。言語設定を保存する場合はありますが、アプリ内の財務記録にはアクセスできません。',
 pnb:'ویب سائٹ دی اینالیٹکس تے اینالیٹکس کوکیاں بند نیں۔ سائٹ زبان یاد رکھ سکدی اے، پر ایپ دے مالی ریکارڈ تک رسائی نئیں رکھدی۔',
 jv:'Analitik situs lan kuki analitik dipateni. Situs bisa ngelingi basa, nanging ora bisa ngakses cathetan keuangan ing aplikasi.',
 ko:'웹사이트 분석과 분석 쿠키는 비활성화되어 있습니다. 사이트는 언어 설정을 저장할 수 있지만 앱의 금융 기록에는 접근할 수 없습니다.',
 te:'వెబ్‌సైట్ విశ్లేషణలు, విశ్లేషణ కుకీలు నిలిపివేయబడ్డాయి. సైట్ భాషను గుర్తుంచుకోవచ్చు, కానీ యాప్‌లోని ఆర్థిక రికార్డులను చూడలేదు.',
 mr:'वेबसाइट विश्लेषण आणि विश्लेषण कुकी बंद आहेत. साइट भाषा लक्षात ठेवू शकते, पण अॅपमधील आर्थिक नोंदी पाहू शकत नाही.',
 tr:'Web sitesi analizi ve analiz çerezleri devre dışıdır. Site dili hatırlayabilir ancak uygulamadaki finansal kayıtlara erişemez.',
 ur:'ویب سائٹ کے تجزیات اور تجزیاتی کوکیز بند ہیں۔ سائٹ زبان یاد رکھ سکتی ہے، لیکن ایپ کے مالی ریکارڈ تک رسائی نہیں رکھتی۔',
 vi:'Phân tích trang web và cookie phân tích đã tắt. Trang có thể ghi nhớ ngôn ngữ nhưng không truy cập được hồ sơ tài chính trong ứng dụng.',
 ta:'இணையதளப் பகுப்பாய்வும் பகுப்பாய்வு குக்கீகளும் முடக்கப்பட்டுள்ளன. தளம் மொழியை நினைவில் வைக்கலாம்; செயலியின் நிதிப் பதிவுகளை அணுக முடியாது.',
 fa:'تحلیل بازدید وب‌سایت و کوکی‌های تحلیلی غیرفعال‌اند. سایت ممکن است زبان را به خاطر بسپارد، اما به سوابق مالی برنامه دسترسی ندارد.',
 sw:'Uchanganuzi wa tovuti na vidakuzi vya uchanganuzi vimezimwa. Tovuti inaweza kukumbuka lugha lakini haiwezi kufikia rekodi za fedha za programu.',
 ms:'Analitik laman dan kuki analitik dinyahdayakan. Laman boleh mengingati bahasa tetapi tidak boleh mengakses rekod kewangan aplikasi.'
};
const decode=s=>s.replace(/^<!\[CDATA\[|\]\]>$/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\n/g,' ');
const pins=[],staged=new Map(),localized={};
for(const code of Object.keys(registry)){
 if(!englishUi[code]||!analyticsOff[code])throw Error('Missing reviewed website-specific copy: '+code);
 const folder=code==='en'?'values':({pnb:'values-b+pnb',yue:'values-b+yue',zh:'values-zh-rCN'}[code]||'values-'+code);
 const resources={};
 for(const selectedFolder of (code==='zh'?['values-zh','values-zh-rCN']:[folder])){
 const seenInFolder=new Set();
 for(const file of (await readdir(resolve(app,'app/src/main/res',selectedFolder))).filter(n=>n.endsWith('.xml'))){
  const bytes=await readFile(resolve(app,'app/src/main/res',selectedFolder,file));
  for(const m of bytes.toString().matchAll(/<string\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/string>/g)){
   if(seenInFolder.has(m[1]))throw Error('Duplicate resource '+selectedFolder+'/'+m[1]);seenInFolder.add(m[1]);resources[m[1]]=decode(m[2]);
  }
  if(/premium|onboarding/.test(file))pins.push({file:'../KOVA-App/app/src/main/res/'+selectedFolder+'/'+file,sha256:createHash('sha256').update(bytes).digest('hex')});
 }
 }
 const s=id=>{if(!resources[id])throw Error('Missing localized product fact '+code+'/'+id);return resources[id];};
 const data=['pl','en','ru'].includes(code)?{home:context.window.home[code],slides:context.window.slides.map(v=>Object.fromEntries(['title','caption','copy'].map(k=>[k,v[k][code]]))),projects:Object.fromEntries(Object.entries(context.window.KOVA_PROJECT_PAGES).map(([page,values])=>[page,values[code]])),extra:baseExtra[code]}:JSON.parse(await read('locales/'+code+'.json'));
 const terms=await readFile(resolve(app,'docs/release/local-freemium-legal/terms-of-service-'+code+'.md'),'utf8');
 const prefix=s('premium_trial_30_disclosure').split('%1$s')[0].trim();
 const candidates=terms.split(/\r?\n\s*\r?\n/).filter(p=>p.includes(prefix)&&p.includes('Google Play')&&!p.includes('[OWNER_INPUT_REQUIRED]'));
 if(candidates.length!==1)throw Error('One exact canonical trial disclosure required: '+code+' ('+candidates.length+')');
 const h=data.home;
 Object.assign(h,{
  heroKicker:'KOVA: Money & Budget · Android · Beta',
  releaseNote:'Beta · '+h.releaseNote.replace(/^Beta · /,''),
  clarityCopy:englishUi[code]+' · '+data.extra.demo+'. '+s('product_progressive_body'),
  workScreenNote:englishUi[code]+' · Pro · 2026-10-29',
  screenWorkCopy:englishUi[code]+' · 2026-10-29',
  planFreeOne:h.clarityAccounts,
  planFreeTwo:[h.featureBudgets,h.featureGoals,data.slides[4].title,data.slides[7].title].join(' · '),
  planFreeThree:s('premium_compare_backup'),
  planPremiumCopy:s('premium_local_scope'),
  planPremiumOne:[s('work_income_title'),s('financial_calendar_label')].join(' · '),
  planPremiumTwo:[s('reports_title'),s('premium_compare_ocr'),s('feature_tax_center_title')].join(' · '),
  planPremiumThree:[s('vault_title'),s('life_planner_title'),s('feature_price_history_title')].join(' · '),
  plansCopy:s('premium_beta_body'),
  plansNote:candidates[0],
  faqFreeA:s('premium_local_title')+'. '+s('premium_package_scope')+' '+s('premium_saved_data_only')+' '+candidates[0],
  forecastNote:s('product_progressive_body'),
  securityCopy:s('product_local_body')+' '+s('premium_local_client_policy'),
  faqOcrA:h.faqOcrA.replace(/\s+Pro:[\s\S]*$/,'')+' Pro: '+s('premium_saved_data_only'),
  aboutPrivacy:s('product_local_body')+' '+s('premium_local_restore_scope'),
  altHome:'KOVA: '+data.slides[0].title+' — '+data.extra.demo+'. '+englishUi[code],
  altProfile:'KOVA: '+data.slides[1].title+' — '+data.extra.demo+'. '+englishUi[code]
 });
 for(const key of ['featureWorkCopy','featureCalendarCopy','featureReportsCopy'])h[key]='Pro · '+h[key].replace(/^Pro · /,'');
 for(const index of [5,6])data.slides[index].title=data.slides[index].title.replace(/ · Pro$/,'')+' · Pro';
 data.projects.status.cards[0][1]=s('premium_package_scope')+' '+s('product_progressive_body');
 data.projects.roadmap.cards[1][1]=s('premium_package_scope')+' '+s('premium_package_readiness');
 data.projects.security.cards[4][1]=analyticsOff[code];
 const update=['2026-10-29 · '+s('premium_beta_title'),s('premium_package_scope')+' '+s('product_progressive_body')+' '+englishUi[code]+'.'];
 data.projects.updates.cards=data.projects.updates.cards.filter(card=>!card[0].startsWith('2026-10-29'));
 data.projects.updates.cards.unshift(update);
 const review='KOVA · DRAFT · '+data.extra.pendingDecision+'. '+s('product_terms_summary');
 const webPrivacy=analyticsOff[code]+' Google Analytics 4: G-2LE3GWYDZM (OFF). contact@kovacompass.app.';
 if(!['pl','en','ru'].includes(code)){data.review=review;data.legal.analyticsCopy=webPrivacy;staged.set('locales/'+code+'.json',JSON.stringify(data,null,2)+'\n');}
 localized[code]={data,review,webPrivacy};
}
let next=landing;
const dictionaries=Object.fromEntries(['pl','en','ru'].map(c=>[c,localized[c].data.home]));
next=next.slice(0,next.indexOf('  const dictionaries'))+'  const dictionaries = '+JSON.stringify(dictionaries,null,2)+';\n\n'+next.slice(next.indexOf('  const videoSlides'));
const slides=context.window.slides;
for(const [i,slide] of slides.entries())for(const code of ['pl','en','ru'])for(const key of ['title','caption','copy'])slide[key][code]=localized[code].data.slides[i][key];
next=next.slice(0,next.indexOf('  const videoSlides'))+'  const videoSlides = '+JSON.stringify(slides,null,2)+';\n\n'+next.slice(next.indexOf('  for (const [code, data]'));
staged.set('landing.js',next);
// Preserve the existing locale merge tail, regardless of its indentation.
const originalProjects=await read('project-content.js');
const tail=originalProjects.slice(originalProjects.lastIndexOf('\nfor (const [code'));
if(!tail.startsWith('\nfor (const [code'))throw Error('Review project locale merge boundary');
staged.set('project-content.js','// Current product facts; dated history is not a current offer.\nwindow.KOVA_PROJECT_PAGES = '+JSON.stringify(context.window.KOVA_PROJECT_PAGES,null,2)+';'+tail);
let legalJs=await read('legal-document.js');
const websiteCopyContext={};
vm.runInNewContext(legalJs.slice(legalJs.indexOf('  const websiteCopy'),legalJs.indexOf('  for (const [lang'))+';this.web=websiteCopy;',websiteCopyContext);
for(const code of ['pl','en','ru'])websiteCopyContext.web[code][1]=localized[code].webPrivacy;
legalJs=legalJs.slice(0,legalJs.indexOf('  const websiteCopy'))+'  const websiteCopy = '+JSON.stringify(websiteCopyContext.web,null,2)+';\n  const reviewCopy = '+JSON.stringify(Object.fromEntries(['pl','en','ru'].map(c=>[c,localized[c].review])),null,2)+';\n'+legalJs.slice(legalJs.indexOf('  for (const [lang'));
staged.set('legal-document.js',legalJs);
const source=JSON.parse(await read('qa/artifacts/localization/source.json'));
Object.assign(source,{home:localized.en.data.home,slides:localized.en.data.slides,projects:localized.en.data.projects,review:localized.en.review});source.legal.analyticsCopy=localized.en.webPrivacy;
staged.set('qa/artifacts/localization/source.json',JSON.stringify(source,null,2)+'\n');
const evidence='qa/artifacts/content-refresh-2026-10-29';await mkdir(resolve(root,evidence,'before'),{recursive:true});
const changes=[];
for(const [file,value] of staged){const old=await readFile(resolve(root,file));const backup=resolve(root,evidence,'before',file.replaceAll('/','__'));await copyFile(resolve(root,file),backup);await writeFile(resolve(root,file),value);changes.push({file,beforeSha256:createHash('sha256').update(old).digest('hex'),afterSha256:createHash('sha256').update(value).digest('hex')});}
await writeFile(resolve(root,evidence,'product-source-sync.json'),JSON.stringify({atUtc:new Date().toISOString(),status:'CONTENT_SYNC_NOT_PUBLICATION_OR_SCREENSHOT_PASS',languages:Object.keys(registry),resourcePins:pins,changes,sourceContract:'KOVA_PHONE_LOCAL_FREEMIUM_V1',scope:'Bundled localized product facts copied mechanically; existing numeric analysis requirements and draft legal gates preserved. No new prices, approval, deployment, analytics activation or home-address disclosure.'},null,2)+'\n');
console.log(JSON.stringify({status:'CONTENT_SYNC_COMPLETE',languages:Object.keys(registry).length,files:changes.length,published:false}));
