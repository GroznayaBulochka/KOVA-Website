// One-time copy correction after analytics was paused by the owner.
import {readFile,writeFile} from 'node:fs/promises';
const copy={
pl:['Dane finansowe zostają na telefonie. Poznaj lokalną ochronę danych w KOVA. Analityka strony i cookies analityczne są wyłączone.','Projekt polityki prywatności KOVA: lokalne dane aplikacji, eksport i kontakt. Analityka strony jest wyłączona. Dokument jest w trakcie weryfikacji.'],
en:['Financial data stays on your phone. Learn about local data protection in KOVA. Website analytics and analytics cookies are disabled.','Draft KOVA privacy policy: local app data, exports and contact. Website analytics is disabled. The document is under review.'],
ru:['Финансовые данные остаются на телефоне. Узнайте о локальной защите данных в KOVA. Аналитика сайта и аналитические cookies отключены.','Проект политики конфиденциальности KOVA: локальные данные, экспорт и обращения. Аналитика сайта отключена. Документ проходит проверку.'],
uk:['Фінансові дані залишаються на телефоні. Дізнайтеся про локальний захист даних у KOVA. Аналітику сайту й аналітичні cookies вимкнено.','Проєкт політики конфіденційності KOVA: локальні дані, експорт і звернення. Аналітику сайту вимкнено. Документ проходить перевірку.'],
zh:['财务数据保留在您的手机上。了解 KOVA 如何在本地保护数据。网站分析和分析 Cookie 已停用。','KOVA 隐私政策草案：应用本地数据、导出和联系。网站分析已停用，文档正在审核中。'],
yue:['財務資料留喺你部手機。了解 KOVA 點樣喺本機保護資料。網站分析同分析 Cookie 已停用。','KOVA 私隱政策草案：應用程式本機資料、匯出同聯絡。網站分析已停用，文件正接受審核。'],
es:['Los datos financieros se quedan en tu teléfono. Conoce la protección local de datos en KOVA. La analítica web y sus cookies están desactivadas.','Borrador de la política de privacidad de KOVA: datos locales, exportación y contacto. La analítica web está desactivada. Documento en revisión.'],
ar:['تبقى بياناتك المالية على هاتفك. تعرّف على حماية البيانات المحلية في KOVA. تحليلات الموقع وملفات تعريف الارتباط التحليلية معطّلة.','مسودة سياسة خصوصية KOVA: بيانات التطبيق المحلية والتصدير والتواصل. تحليلات الموقع معطّلة. المستند قيد المراجعة.'],
hi:['वित्तीय डेटा आपके फ़ोन पर रहता है। KOVA में स्थानीय डेटा सुरक्षा के बारे में जानें। वेबसाइट विश्लेषण और विश्लेषण कुकी बंद हैं।','KOVA गोपनीयता नीति का मसौदा: स्थानीय ऐप डेटा, निर्यात और संपर्क। वेबसाइट विश्लेषण बंद है। दस्तावेज़ की समीक्षा जारी है।'],
bn:['আর্থিক তথ্য আপনার ফোনেই থাকে। KOVA-তে স্থানীয় তথ্য সুরক্ষা সম্পর্কে জানুন। ওয়েবসাইট বিশ্লেষণ ও বিশ্লেষণমূলক কুকি বন্ধ আছে।','KOVA গোপনীয়তা নীতির খসড়া: অ্যাপের স্থানীয় তথ্য, রপ্তানি ও যোগাযোগ। ওয়েবসাইট বিশ্লেষণ বন্ধ আছে। নথিটি পর্যালোচনাধীন।'],
pt:['Os dados financeiros ficam no seu telemóvel. Conheça a proteção local de dados na KOVA. A análise do site e os cookies analíticos estão desativados.','Rascunho da política de privacidade da KOVA: dados locais, exportação e contacto. A análise do site está desativada. Documento em revisão.'],
ja:['財務データはスマートフォン内に保存されます。KOVA のローカルデータ保護をご紹介します。サイト解析と解析用 Cookie は無効です。','KOVA プライバシーポリシー案：アプリのローカルデータ、エクスポート、お問い合わせについて。サイト解析は無効です。文書は確認中です。'],
pnb:['مالی ڈیٹا تہاڈے فون اُتے ہی رہندا اے۔ KOVA وچ مقامی ڈیٹا دی حفاظت بارے جانو۔ ویب سائٹ دے تجزیے تے تجزیاتی کوکیز بند نیں۔','KOVA دی رازداری پالیسی دا مسودہ: ایپ دا مقامی ڈیٹا، ایکسپورٹ تے رابطہ۔ ویب سائٹ دے تجزیے بند نیں۔ دستاویز دی جانچ جاری اے۔'],
jv:['Data keuangan tetep ana ing telpon sampeyan. Sinau babagan pangayoman data lokal ing KOVA. Analitik situs lan cookie analitik dipateni.','Draf kabijakan privasi KOVA: data lokal aplikasi, ekspor lan kontak. Analitik situs dipateni. Dokumen isih ditinjau.'],
ko:['금융 데이터는 휴대폰에 보관됩니다. KOVA의 로컬 데이터 보호에 대해 알아보세요. 웹사이트 분석과 분석용 쿠키는 비활성화되어 있습니다.','KOVA 개인정보 처리방침 초안: 앱의 로컬 데이터, 내보내기 및 문의. 웹사이트 분석은 비활성화되어 있습니다. 문서는 검토 중입니다.'],
de:['Finanzdaten bleiben auf deinem Handy. Erfahre mehr über den lokalen Datenschutz in KOVA. Website-Analyse und Analyse-Cookies sind deaktiviert.','Entwurf der KOVA-Datenschutzerklärung: lokale App-Daten, Export und Kontakt. Die Website-Analyse ist deaktiviert. Das Dokument wird geprüft.'],
fr:['Vos données financières restent sur votre téléphone. Découvrez la protection locale dans KOVA. Les analyses du site et leurs cookies sont désactivés.','Projet de politique de confidentialité KOVA : données locales, exportation et contact. Les analyses du site sont désactivées. Document en cours de révision.'],
te:['ఆర్థిక డేటా మీ ఫోన్‌లోనే ఉంటుంది. KOVAలో స్థానిక డేటా రక్షణ గురించి తెలుసుకోండి. వెబ్‌సైట్ విశ్లేషణలు, విశ్లేషణ కుకీలు నిలిపివేయబడ్డాయి.','KOVA గోప్యతా విధానం ముసాయిదా: యాప్ స్థానిక డేటా, ఎగుమతి, సంప్రదింపులు. వెబ్‌సైట్ విశ్లేషణలు నిలిపివేయబడ్డాయి. పత్రం సమీక్షలో ఉంది.'],
mr:['आर्थिक डेटा तुमच्या फोनवरच राहतो. KOVA मधील स्थानिक डेटा संरक्षणाबद्दल जाणून घ्या. वेबसाइट विश्लेषण आणि विश्लेषण कुकीज बंद आहेत.','KOVA गोपनीयता धोरणाचा मसुदा: अ‍ॅपचा स्थानिक डेटा, निर्यात आणि संपर्क. वेबसाइट विश्लेषण बंद आहे. दस्तऐवजाचे पुनरावलोकन सुरू आहे.'],
tr:['Finansal veriler telefonunuzda kalır. KOVA’daki yerel veri korumasını keşfedin. Site analitiği ve analiz çerezleri devre dışıdır.','KOVA gizlilik politikası taslağı: yerel uygulama verileri, dışa aktarma ve iletişim. Site analitiği devre dışıdır. Belge inceleme aşamasındadır.'],
ur:['مالی ڈیٹا آپ کے فون پر ہی رہتا ہے۔ KOVA میں مقامی ڈیٹا کے تحفظ کے بارے میں جانیں۔ ویب سائٹ کے تجزیات اور تجزیاتی کوکیز بند ہیں۔','KOVA کی رازداری کی پالیسی کا مسودہ: ایپ کا مقامی ڈیٹا، برآمد اور رابطہ۔ ویب سائٹ کے تجزیات بند ہیں۔ دستاویز زیرِ جائزہ ہے۔'],
vi:['Dữ liệu tài chính ở lại trên điện thoại của bạn. Tìm hiểu cách KOVA bảo vệ dữ liệu cục bộ. Phân tích website và cookie phân tích đã tắt.','Dự thảo chính sách quyền riêng tư KOVA: dữ liệu cục bộ, xuất dữ liệu và liên hệ. Phân tích website đã tắt. Tài liệu đang được xem xét.'],
ta:['நிதித் தரவு உங்கள் தொலைபேசியிலேயே இருக்கும். KOVA-வின் உள்ளூர் தரவுப் பாதுகாப்பை அறியுங்கள். இணையதளப் பகுப்பாய்வும் அதற்கான குக்கீகளும் முடக்கப்பட்டுள்ளன.','KOVA தனியுரிமைக் கொள்கை வரைவு: செயலியின் உள்ளூர் தரவு, ஏற்றுமதி மற்றும் தொடர்பு. இணையதளப் பகுப்பாய்வு முடக்கப்பட்டுள்ளது. ஆவணம் பரிசீலனையில் உள்ளது.'],
it:['I dati finanziari restano sul tuo telefono. Scopri la protezione locale dei dati in KOVA. Le analisi del sito e i cookie analitici sono disattivati.','Bozza dell’informativa sulla privacy KOVA: dati locali, esportazione e contatti. Le analisi del sito sono disattivate. Il documento è in revisione.'],
fa:['داده‌های مالی روی تلفن شما می‌مانند. با حفاظت محلی داده‌ها در KOVA آشنا شوید. تحلیل وب‌سایت و کوکی‌های تحلیلی غیرفعال‌اند.','پیش‌نویس سیاست حریم خصوصی KOVA: داده‌های محلی برنامه، خروجی‌گیری و تماس. تحلیل وب‌سایت غیرفعال است. سند در حال بررسی است.'],
sw:['Data za fedha zinabaki kwenye simu yako. Jifunze kuhusu ulinzi wa data za ndani katika KOVA. Uchanganuzi wa tovuti na vidakuzi vyake vimezimwa.','Rasimu ya sera ya faragha ya KOVA: data za ndani, uhamishaji wa data na mawasiliano. Uchanganuzi wa tovuti umezimwa. Hati inakaguliwa.'],
ms:['Data kewangan kekal pada telefon anda. Ketahui perlindungan data setempat dalam KOVA. Analitik laman dan kuki analitik dinyahaktifkan.','Draf dasar privasi KOVA: data aplikasi setempat, eksport dan hubungan. Analitik laman dinyahaktifkan. Dokumen sedang disemak.']
};
for(const [lang,[security,privacy]] of Object.entries(copy)){
 if(['pl','en','ru'].includes(lang))continue;
 const path=`locales/${lang}.json`,data=JSON.parse(await readFile(path,'utf8'));
 Object.assign(data.seo.descriptions,{security,privacy});await writeFile(path,JSON.stringify(data,null,2)+'\n');
}
const path='scripts/seo.mjs';let source=await readFile(path,'utf8');
const start=source.indexOf('const descriptions='),end=source.indexOf('\nexport const escape=',start);
const descriptions=JSON.parse(source.slice(start+'const descriptions='.length,end).trim().replace(/;$/,''));
for(const [index,lang] of ['pl','en','ru'].entries()){
 descriptions.security[index]=copy[lang][0];descriptions.privacy[index]=copy[lang][1];
}
await writeFile(path,source.slice(0,start)+'const descriptions='+JSON.stringify(descriptions,null,2)+';'+source.slice(end));
console.log('Updated security/privacy SEO in 27 languages; legal draft bodies are unchanged.');
