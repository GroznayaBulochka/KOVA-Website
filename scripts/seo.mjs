import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
export const languages=['pl','en','ru'];
export const pages=['index','status','roadmap','updates','security','contact','delete-account','privacy','terms','cookies','404'];
export const noindexPages=new Set(['privacy','terms','cookies','404']);
export const file=(page,lang)=>`${page}${lang==='pl'?'':'-'+lang}.html`;
export const urlPath=(page,lang)=>page==='index'&&lang==='pl'?'/':'/'+file(page,lang);
const titles={
 index:['KOVA — aplikacja do budżetu i finansów osobistych offline','KOVA — Offline Budget & Expense Tracker for Android','KOVA — личные финансы и учёт расходов офлайн'],
 status:['KOVA na Androida — status aplikacji i dostępność','KOVA for Android — App Status & Availability','KOVA для Android — статус и доступность приложения'],
 roadmap:['KOVA — plan wydania aplikacji finansowej offline','KOVA — Offline Finance App Release Roadmap','KOVA — план выпуска финансового приложения офлайн'],
 updates:['KOVA — aktualności i rozwój aplikacji finansowej','KOVA — Finance App News & Development Updates','KOVA — новости и развитие финансового приложения'],
 security:['KOVA — prywatność, szyfrowanie i kopie danych offline','KOVA — Privacy, Encryption & Offline Backups','KOVA — приватность, шифрование и резервные копии'],
 contact:['Kontakt z KOVA — wsparcie i pytania o aplikację','Contact KOVA — App Support & Questions','Контакты KOVA — поддержка и вопросы о приложении'],
 'delete-account':['KOVA — usuwanie lokalnych danych i profilu','KOVA — Delete Local Data & Profiles','KOVA — удаление локальных данных и профиля'],
 privacy:['Polityka prywatności KOVA — aplikacja i strona','KOVA Privacy Policy — App & Website','Политика конфиденциальности KOVA — приложение и сайт'],
 terms:['Warunki korzystania z KOVA — projekt dokumentu','KOVA Terms of Use — Draft Document','Условия использования KOVA — проект документа'],
 cookies:['Cookies i Google Analytics na stronie KOVA','KOVA Website Cookies & Google Analytics','Cookies и Google Analytics на сайте KOVA'],
 '404':['Nie znaleziono strony — KOVA','Page Not Found — KOVA','Страница не найдена — KOVA']
};
const descriptions={
 index:['Poznaj KOVA: bezpłatną aplikację na Androida do wydatków, budżetu domowego i celów oszczędzania. Offline, bez konta online i reklam. W przygotowaniu.',
 'Meet KOVA: a free Android app for expenses, budgets and savings goals. Works offline without a cloud account or ads. First public release in preparation.',
 'KOVA — бесплатное приложение для Android: расходы, семейный бюджет и цели накоплений. Офлайн, без облачного аккаунта и рекламы. Готовится к выпуску.'],
 status:['Sprawdź dostępność KOVA Offline Free V1, zakres pierwszej wersji i pozostałe przygotowania. Publiczne pobieranie aplikacji nie jest jeszcze dostępne.',
 'Check KOVA Offline Free V1 availability, planned features and remaining release steps. Public app downloads are not available yet.',
 'Узнайте статус KOVA Offline Free V1, функции первой версии и оставшиеся этапы подготовки. Публичное скачивание пока недоступно.'],
 roadmap:['Plan pierwszego wydania KOVA: lokalne finanse, końcowe testy i przygotowanie do Google Play. Bez niepotwierdzonych terminów premiery.',
 'Follow KOVA’s first-release roadmap: local finances, final testing and Google Play preparation. No unconfirmed launch dates.',
 'План первого выпуска KOVA: локальные финансы, финальные тесты и подготовка к Google Play. Без неподтверждённых дат релиза.'],
 updates:['Aktualności projektu KOVA: aplikacja finansowa offline na Androida, sprawdzone ekrany, eksport danych i przygotowania do pierwszego wydania.',
 'KOVA project updates: offline Android finances, authentic app screens, data export and progress toward the first public release.',
 'Новости проекта KOVA: финансы офлайн на Android, реальные экраны, экспорт данных и подготовка первого публичного выпуска.'],
 security:['Jak KOVA przechowuje finanse lokalnie: SQLCipher, izolacja profili i ręczny eksport chroniony hasłem. Poznaj możliwości i ograniczenia ochrony danych.',
 'How KOVA keeps finances local: SQLCipher, profile isolation and manual password-protected exports. Understand data protection and its limitations.',
 'Как KOVA хранит финансы локально: SQLCipher, изоляция профилей и ручной экспорт с паролем. Возможности и ограничения защиты данных.'],
 contact:['Kontakt z wydawcą KOVA: contact@kovacompass.app. Pytania o aplikację, zgłaszanie problemów i sprawy prywatności. Nie przesyłaj danych finansowych.',
 'Contact KOVA at contact@kovacompass.app for app questions, issue reports and privacy requests. Please do not send financial data.',
 'Связь с KOVA: contact@kovacompass.app. Вопросы о приложении, сообщения об ошибках и обращения по приватности. Не отправляйте финансовые данные.'],
 'delete-account':['Jak zarządzać danymi i usunąć lokalny profil w KOVA Offline V1. Dowiedz się, co dzieje się z eksportami i dlaczego nie ma odzyskiwania z chmury.',
 'Manage your data and delete a local profile in KOVA Offline V1. Learn about exported copies and why cloud recovery is not available.',
 'Управление данными и удаление локального профиля KOVA Offline V1. Что происходит с экспортами и почему нет восстановления из облака.'],
 privacy:['Projekt polityki prywatności KOVA: dane lokalne aplikacji, eksport, kontakt i opcjonalna analityka strony. Dokument wymaga zatwierdzenia przed publikacją.',
 'Draft KOVA privacy policy: local app data, exports, contact and optional website analytics. Approval is required before publication.',
 'Проект политики KOVA: локальные данные, экспорт, обращения и необязательная аналитика сайта. Требует утверждения до публикации.'],
 terms:['Projekt warunków KOVA Offline Free V1: zakres aplikacji, dane użytkownika, kopie zapasowe i ograniczenia szacunków finansowych.',
 'Draft terms for KOVA Offline Free V1: app scope, user data, backups and limitations of financial estimates.',
 'Проект условий KOVA Offline Free V1: возможности приложения, данные, резервные копии и ограничения финансовых оценок.'],
 cookies:['Jak strona KOVA używa cookies i Google Analytics wyłącznie po zgodzie. Sprawdź zakres pomiaru i sposób wycofania zgody.',
 'How the KOVA website uses cookies and Google Analytics only after consent. See what is measured and how to withdraw your choice.',
 'Cookies и Google Analytics на сайте KOVA — только после согласия. Что измеряется и как отозвать согласие.'],
 '404':['Ta strona KOVA nie istnieje. Wróć do aplikacji, aktualności lub kontaktu.','This KOVA page does not exist. Return to the app overview, updates or contact.','Этой страницы KOVA нет. Вернитесь к обзору приложения, новостям или контактам.']
};
export const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json=value=>JSON.stringify(value).replace(/</g,'\\u003c');
export function metadata(page,lang,origin){
 const index=languages.indexOf(lang),canonical=origin+urlPath(page,lang);
 const website={'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'KOVA',inLanguage:languages};
 const schema={'@context':'https://schema.org','@graph':[
   website,
   {'@type':page==='contact'?'ContactPage':'WebPage','@id':canonical+'#page',url:canonical,name:titles[page][index],description:descriptions[page][index],inLanguage:lang,isPartOf:{'@id':website['@id']}},
   ...(page==='index'?[{'@type':'MobileApplication','@id':origin+'/#app',name:'KOVA',applicationCategory:'FinanceApplication',operatingSystem:'Android',inLanguage:languages,description:descriptions.index[index],url:canonical,image:origin+'/assets/social/kova.png'}]:[]),
   ...(page!=='index'&&page!=='404'?[{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'KOVA',item:origin+urlPath('index',lang)},{'@type':'ListItem',position:2,name:titles[page][index],item:canonical}]}]:[])
 ]};
 return {title:titles[page][index],description:descriptions[page][index],canonical,schema};
}
export function seoHead(page,lang,origin,isRelease){
 const m=metadata(page,lang,origin);
 const locales=Object.fromEntries(languages.map(l=>[l,metadata(page,l,origin)]));
 return `<!-- KOVA SEO: generated from the release contract; no invented reviews/offers. -->
<title>${escape(m.title)}</title>
<meta name="description" content="${escape(m.description)}">
<meta name="robots" content="${isRelease&&!noindexPages.has(page)?'index,follow,max-image-preview:large':'noindex,follow'}">
${page==='404'?'':`<link rel="canonical" href="${escape(m.canonical)}">`}
${page==='404'?'':languages.map(l=>`<link rel="alternate" hreflang="${l}" href="${origin+urlPath(page,l)}">`).join('\n')+`\n<link rel="alternate" hreflang="x-default" href="${origin+urlPath(page,'pl')}">`}
<meta property="og:type" content="website"><meta property="og:site_name" content="KOVA">
<meta property="og:title" content="${escape(m.title)}"><meta property="og:description" content="${escape(m.description)}">
<meta property="og:url" content="${escape(m.canonical)}"><meta property="og:locale" content="${{pl:'pl_PL',en:'en_GB',ru:'ru_RU'}[lang]}">
<meta property="og:image" content="${origin}/assets/social/kova.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/png"><meta property="og:image:alt" content="KOVA — Offline Free V1 · Android · PL / EN / RU">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(m.title)}"><meta name="twitter:description" content="${escape(m.description)}"><meta name="twitter:image" content="${origin}/assets/social/kova.png"><meta name="twitter:image:alt" content="KOVA — Offline Free V1 · Android · PL / EN / RU">
<script type="application/ld+json" id="kova-structured-data">${json(m.schema)}</script>
<script type="application/json" id="kova-seo-data">${json({page,language:lang,locales})}</script>`;
}
export function sitemap(origin){return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p=>!noindexPages.has(p)).flatMap(p=>languages.map(l=>`  <url><loc>${origin+urlPath(p,l)}</loc></url>`)).join('\n')}\n</urlset>\n`;}
export function robots(origin,isRelease){return isRelease?`User-agent: *\nAllow: /\nDisallow: /workspace.html\nDisallow: /qa/\nDisallow: /scripts/\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n';}

// Reuse exact shipping translations/renderers, not a second marketing content source.
export async function prepareRenderer(root){
 const read=name=>readFile(new URL(name,root),'utf8');
 const landing=await read('landing.js'),projects=await read('project-content.js'),legal=await read('legal-document.js');
 const context={window:{}};
 const shell=await read('site-shell.js');
 vm.runInNewContext(shell.slice(shell.indexOf('  const labels'),shell.indexOf('  const page'))+';window.shellLabels=labels;',context);
 vm.runInNewContext(landing.slice(landing.indexOf('  const dictionaries'),landing.indexOf('  const supported'))+';window.home=dictionaries;window.slides=videoSlides;',context);
 vm.runInNewContext(projects,context);
 vm.runInNewContext(legal.slice(legal.indexOf('  const escapeHtml'),legal.indexOf('  let loadRevision'))+';window.renderMarkdown=renderMarkdown;',context);
 vm.runInNewContext(legal.slice(legal.indexOf('  const websiteCopy'),legal.indexOf('  for (const [lang'))+';window.websiteCopy=websiteCopy;window.reviewCopy=reviewCopy;',context);
 const projectJs=await read('project-pages.js');
 vm.runInNewContext(projectJs.slice(projectJs.indexOf('  const esc'),projectJs.indexOf('  let stored'))+';window.renderProject=render;',context);
 return async function render(html,page,lang,origin,isRelease){
  const content=context.window;
  html=html.replace('<html lang="pl">',`<html lang="${lang}" data-static-language="${lang}">`);
  const shell=content.shellLabels[lang];
  html=html.replace(/(<small>)(?:Oficjalna strona projektu|Official project|Official project website)(<\/small>)/g,`$1${escape(shell.official)}$2`);
  html=html.replace(/(<a class="document-back"[^>]*>)[\s\S]*?<\/a>/,`$1${escape(shell.home)}</a>`);
  html=html.replace(/aria-label="(?:Język strony|Language|Język)"/g,`aria-label="${escape(shell.language)}"`).replace(/(<span class="sr-only">)(?:Język strony|Language)(<\/span>)/g,`$1${escape(shell.language)}$2`);
  if(page==='index'){
   const copy=content.home[lang];
   html=html.replace(/<([a-z][a-z0-9]*)\b([^>]*\bdata-i18n(?:-html)?="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g,(all,tag,attrs,key)=>copy[key]===undefined?all:`<${tag}${attrs}>${attrs.includes('data-i18n-html')?copy[key]:escape(copy[key])}</${tag}>`);
   html=html.replace(/<img\b[^>]*data-i18n-alt="([^"]+)"[^>]*>/g,(all,key)=>all.replace(/alt="[^"]*"/,`alt="${escape(copy[key])}"`));
   const demo={pl:'fikcyjne dane demonstracyjne',en:'fictional demo data',ru:'вымышленные данные'}[lang];
   html=html.replace(/<figure data-screen-index="(\d+)">[\s\S]*?<\/figure>/g,(_,n)=>{
    const s=content.slides[Number(n)];return `<figure data-screen-index="${n}"><button type="button" data-lightbox="${s.image}" aria-label="${escape(s.title[lang])}"><img src="${s.image}" alt="${escape(s.title[lang]+' — KOVA, '+demo)}" loading="lazy" width="1080" height="2400"></button><figcaption><b>${escape(s.title[lang])}</b><span>${escape(s.caption[lang])}</span></figcaption></figure>`;
   });
  }else if(content.KOVA_PROJECT_PAGES[page]){
   html=html.replace(/<div data-project-content>[\s\S]*<\/div>\s*<\/main>/,`<div data-project-content>${content.renderProject(content.KOVA_PROJECT_PAGES[page][lang])}</div>\n</main>`);
  }else if(page==='cookies'){
   html=html.replace(/(<section data-doc-lang="([^"]+)"[^>]*?)(?: hidden)?(>)/g,(_,start,l,end)=>start+(l===lang?'':' hidden')+end);
  }else if(['privacy','terms'].includes(page)){
   const kind=page==='privacy'?'privacy-policy':'terms-of-service';
   const document=content.renderMarkdown(await read(`legal/${kind}-${lang}.md`));
   const h1=/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(document);
   html=html.replace(/(<h1[^>]*data-legal-page-heading>)[\s\S]*?<\/h1>/,`$1${h1?.[1]||metadata(page,lang,origin).title}</h1>`);
   html=html.replace(/(<article[^>]*data-legal-content[^>]*>)[\s\S]*?<\/article>/,`$1${document.replace(/<h1[^>]*>[\s\S]*?<\/h1>/,'')}</article>`).replace('aria-busy="true"','aria-busy="false"');
   html=html.replace(/(<summary data-legal-copy="analyticsTitle">)[\s\S]*?<\/summary>/,`$1${escape(content.websiteCopy[lang][0])}</summary>`).replace(/(<p data-legal-copy="analyticsCopy">)[\s\S]*?<\/p>/,`$1${escape(content.websiteCopy[lang][1])}</p>`);
   const publicUrl=/data-public-document-url="([^"]+)"/.exec(html)?.[1]||'';
   html=html.replace(/(<p[^>]*data-legal-review[^>]*>)[\s\S]*?<\/p>/,`$1${escape(content.reviewCopy[lang])} ${{pl:'Publiczny adres EN: ',en:'Public EN address: ',ru:'Публичный адрес EN: '}[lang]}${escape(publicUrl)}</p>`);
   html=html.replace(/href="legal\/[^\"]+" data-legal-source/,`href="legal/${kind}-${lang}.md" data-legal-source`);
  }
  html=html.replace(/<option value="(pl|en|ru)"(?: selected)?>/g,(_,l)=>`<option value="${l}"${l===lang?' selected':''}>`);
  html=html.replace(/<meta (?:name="(?:robots|description|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,'').replace(/<title>[\s\S]*?<\/title>/,'');
  html=html.replace('</head>',seoHead(page,lang,origin,isRelease)+'\n</head>');
  html=html.replace(/href="([^"]+)"/g,(all,href)=>{
   if(!/^(?:[a-z-]+\.html)(?:[?#]|$)/.test(href))return all;
   const url=new URL(href,origin+'/'); const target=url.pathname.slice(1,-5);
   if(!pages.includes(target))return all;
   const explicit=url.searchParams.get('lang');url.searchParams.delete('lang');
   return `href="${urlPath(target,languages.includes(explicit)?explicit:lang)}${url.search}${url.hash}"`;
  });
  // Crawlable links, also usable with scripts disabled; no hidden keyword content.
  const navigation=`<nav class="seo-language-links" aria-label="Language">${languages.map(l=>`<a data-language-link hreflang="${l}" lang="${l}" href="${urlPath(page,l)}">${{pl:'Polski',en:'English',ru:'Русский'}[l]}</a>`).join(' · ')}</nav>`;
  html=html.replace('</main>',navigation+'\n</main>');
  return html;
 };
}
