(() => {
  'use strict';
  const labels = {
    pl: { home:'Strona główna', product:'Aplikacja', project:'Projekt', legal:'Informacje', features:'Funkcje', screens:'Ekrany aplikacji', faq:'Pytania i odpowiedzi', status:'Stan projektu', roadmap:'Plan rozwoju', updates:'Aktualności', security:'Bezpieczeństwo', contact:'Kontakt', deletion:'Usuwanie konta', privacy:'Polityka prywatności', terms:'Warunki korzystania', cookies:'Cookies', settings:'Ustawienia cookies', tagline:'Codzienne finanse. W jednym miejscu.', note:'KOVA · przed premierą', top:'Wróć na górę', skip:'Przejdź do treści', language:'Język strony', menu:'Menu', back:'Strona główna', official:'Oficjalna strona projektu' },
    en: { home:'Home', product:'The app', project:'Project', legal:'Information', features:'Features', screens:'App screens', faq:'Questions and answers', status:'Project status', roadmap:'Roadmap', updates:'Updates', security:'Security', contact:'Contact', deletion:'Account deletion', privacy:'Privacy Policy', terms:'Terms of Use', cookies:'Cookies', settings:'Cookie settings', tagline:'Everyday finances. In one place.', note:'KOVA · before launch', top:'Back to top', skip:'Skip to content', language:'Site language', menu:'Menu', back:'Home', official:'Official project website' },
    ru: { home:'Главная', product:'Приложение', project:'Проект', legal:'Информация', features:'Функции', screens:'Экраны приложения', faq:'Вопросы и ответы', status:'Статус проекта', roadmap:'План развития', updates:'Обновления', security:'Безопасность', contact:'Контакты', deletion:'Удаление аккаунта', privacy:'Конфиденциальность', terms:'Условия использования', cookies:'Cookies', settings:'Настройки cookies', tagline:'Повседневные финансы. В одном месте.', note:'KOVA · до выпуска', top:'Наверх', skip:'Перейти к содержимому', language:'Язык сайта', menu:'Меню', back:'Главная', official:'Официальный сайт проекта' }
  };
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#${name}"></use></svg>`;
  Object.assign(labels.pl, {deletion:'Twoje dane',note:'KOVA · przed premierą'});
  Object.assign(labels.en, {deletion:'Your data',note:'KOVA · before launch'});
  Object.assign(labels.ru, {deletion:'Ваши данные',note:'KOVA · до выпуска'});
  Object.assign(labels.pl,{"note": "Darmowa baza + opcjonalne Premium · przed premierą", "official": "KOVA Development · oficjalna strona"});
  Object.assign(labels.en,{"note": "Free base + optional Premium · before launch", "official": "KOVA Development · official website"});
  Object.assign(labels.ru,{"note": "Бесплатная базовая версия + дополнительный Premium · перед запуском", "official": "KOVA Development · официальный сайт"});
  for (const [code,data] of Object.entries(window.KOVA_TRANSLATIONS || {})) labels[code]=data.shell;
  const socialLinks = `<div class="footer-social"><a href="https://www.tiktok.com/@kova_money" target="_blank" rel="noopener noreferrer" aria-label="KOVA · TikTok · @kova_money"><svg class="icon" aria-hidden="true"><use href="assets/icons.svg#tiktok"></use></svg><span>TikTok</span></a><a href="https://www.instagram.com/kova_money/" target="_blank" rel="noopener noreferrer" aria-label="KOVA · Instagram · @kova_money"><svg class="icon" aria-hidden="true"><use href="assets/icons.svg#instagram"></use></svg><span>Instagram</span></a></div>`;
  const primaryLinks = [['product','index.html#about'],['features','index.html#features'],['screens','index.html#screens'],['security','security.html'],['faq','index.html#faq'],['project','status.html']];
  const projectLinks = [['status','status.html'],['roadmap','roadmap.html'],['updates','updates.html'],['contact','contact.html']];
  const informationLinks = [['privacy','privacy.html'],['terms','terms.html'],['cookies','cookies.html'],['deletion','delete-account.html']];
  const projectPages = ['status','roadmap','updates','contact'];
  const informationPages = ['privacy','terms','cookies','delete-account'];
  const escape = value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const renderHeader = (lang, page, selectHtml) => {
    const copy=labels[lang];
    const active=projectPages.includes(page)?'project':page==='security'?'security':page==='index'?'product':null;
    return `<header class="topbar public-header"><a class="brand" href="${page==='index'?'#top':'index.html'}" aria-label="KOVA"><img src="assets/logo.svg" alt="" width="40" height="40"><b>KOVA</b></a><nav class="main-nav public-nav" id="public-nav" aria-label="${escape(copy.menu)}">${primaryLinks.map(([key,href])=>`<a href="${page==='index'&&href.startsWith('index.html#')?href.slice(10):href}" data-header-key="${key}"${active===key?' aria-current="true"':''}>${escape(copy[key])}</a>`).join('')}</nav><div class="header-actions public-header-actions"><label class="site-language"><span class="sr-only">${escape(copy.language)}</span>${selectHtml}</label><button class="menu-button public-menu" type="button" aria-expanded="false" aria-controls="public-nav" aria-label="${escape(copy.menu)}"><span></span><span></span><span></span></button></div></header>`;
  };
  const renderContext = (lang,page) => {
    if(page==='index') return '';
    const copy=labels[lang],project=projectPages.includes(page),information=informationPages.includes(page);
    const group=project?'project':information?'legal':null;
    const key=page==='delete-account'?'deletion':page;
    const current=copy[key] || '404';
    const links=project?projectLinks:information?informationLinks:[];
    return `<nav class="page-trail" aria-label="${escape(copy.menu)}"><a href="index.html">${escape(copy.home)}</a>${group?`<span aria-hidden="true">›</span><span>${escape(copy[group])}</span>`:''}<span aria-hidden="true">›</span><span aria-current="page">${escape(current)}</span></nav>${links.length?`<nav class="section-nav" aria-label="${escape(copy[group])}">${links.map(([label,href])=>`<a href="${href}"${href===page+'.html'?' aria-current="page"':''}>${escape(copy[label])}</a>`).join('')}</nav>`:''}`;
  };
  window.addEventListener?.('kova:locale-loaded', ({detail:{code,data}}) => {labels[code]=data.shell;});
  const page = window.KOVA_ROUTES?.parse()?.page || document.body.dataset.projectPage || (document.body.dataset.legalDocument==='privacy-policy'?'privacy':document.body.dataset.legalDocument==='terms-of-service'?'terms':document.querySelector('[data-document-language]')?'cookies':'index');
  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'main';
  if (!document.querySelector('.skip-link')) {
    const skip=document.createElement('a');skip.className='skip-link';skip.href='#main';skip.dataset.shellLabel='skip';document.body.prepend(skip);
  }
  const previousHeader=document.querySelector('header.topbar,header.document-header');
  const language=previousHeader.querySelector('select');
  const workspace=previousHeader.querySelector('[data-local-workspace]');
  const initialLanguage=document.documentElement.lang in labels?document.documentElement.lang:'pl';
  previousHeader.outerHTML=renderHeader(initialLanguage,page,language.outerHTML);
  const header=document.querySelector('.public-header');
  header.querySelector('select').replaceWith(language);
  const nav=header.querySelector('.public-nav'),toggle=header.querySelector('.public-menu');
  const closeMenu=(focus=false)=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');if(focus)toggle.focus();};
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){event.preventDefault();closeMenu(true);}});
  document.addEventListener('pointerdown',event=>{if(!header.contains(event.target))closeMenu();});
  const wide=matchMedia('(min-width:1201px)');wide.addEventListener('change',()=>{if(wide.matches)closeMenu();});
  let context=main.querySelector('[data-site-context]');
  if(page!=='index'&&!context){main.querySelector('.document-back')?.remove();context=document.createElement('div');context.dataset.siteContext='';main.prepend(context);}

  let footer = document.querySelector('footer');
  if (!footer) { footer = document.createElement('footer'); document.body.append(footer); }
  footer.className = 'public-footer';
  footer.innerHTML = `<div class="footer-grid"><div class="footer-about"><a class="brand" href="index.html"><img src="assets/logo.svg" width="40" height="40" alt="KOVA"><b>KOVA</b></a><p data-shell-label="tagline"></p><span class="footer-status" data-shell-label="note"></span></div>${[
    ['product', [['features','index.html#features'],['screens','index.html#screens'],['faq','index.html#faq']]],
    ['project', [['status','status.html'],['roadmap','roadmap.html'],['updates','updates.html'],['contact','contact.html']]],
    ['legal', [['security','security.html'],['privacy','privacy.html'],['terms','terms.html'],['cookies','cookies.html'],['deletion','delete-account.html']]]
  ].map(([heading, links]) => `<nav aria-label="${heading}"><h2 data-shell-label="${heading}"></h2>${links.map(([key,href])=>`<a href="${href}" data-shell-label="${key}"></a>`).join('')}</nav>`).join('')}</div><div class="footer-bottom"><span>© ${new Date().getFullYear()} KOVA</span><a href="index.html?cookies=settings" data-shell-settings data-shell-label="settings"></a><a href="#" data-back-top>${icon('chevron-left')}<span data-shell-label="top"></span></a></div>`;
  footer.querySelector('[data-back-top]').href = `#${main?.id || 'main'}`;
  const publisher = document.createElement('p'); publisher.className = 'publisher-line';
  publisher.innerHTML = 'KOVA Development<br>Vadyslav Konohrai · <a href="mailto:contact@kovacompass.app">contact@kovacompass.app</a>';
  footer.querySelector('.footer-about').append(publisher);
  footer.querySelector('.footer-about').insertAdjacentHTML('beforeend',socialLinks);
  if(workspace){workspace.setAttribute('aria-label','Workspace');footer.querySelector('.footer-about').append(workspace);}
  // Analytics is paused: link to the current disclosure, not an opt-in dialog.
  footer.querySelector('[data-shell-settings]').href = 'cookies.html';
  footer.querySelector('[data-shell-settings]').dataset.shellLabel = 'cookies';
  footer.querySelector('[data-shell-settings]').setAttribute('data-cookie-settings', '');
  footer.querySelector('[data-shell-settings]').addEventListener('click', event => {
    if (document.querySelector('[data-cookie-banner]')) {
      event.preventDefault(); window.dispatchEvent(new Event('kova:cookie-settings'));
    }
  });

  function sync() {
    const lang = document.documentElement.lang in labels ? document.documentElement.lang : 'pl';
    const copy = labels[lang];
    document.querySelectorAll('[data-shell-label]').forEach(node => { node.textContent = copy[node.dataset.shellLabel]; });
    footer.querySelectorAll('nav').forEach(nav => nav.setAttribute('aria-label', nav.querySelector('h2').textContent));
    document.querySelectorAll('select').forEach(select => { if (!select.closest('[data-task-dialog]')) select.setAttribute('aria-label', copy.language); });
    const languageLabel=header.querySelector('.sr-only');
    if(languageLabel)languageLabel.textContent=copy.language;
    nav.setAttribute('aria-label',copy.menu);toggle.setAttribute('aria-label',copy.menu);
    const section={about:'product',features:'features',screens:'screens',faq:'faq','analysis-data':'faq'}[location.hash.slice(1)] || 'product';
    const active=projectPages.includes(page)?'project':page==='security'?'security':page==='index'?section:null;
    for(const link of header.querySelectorAll('[data-header-key]')) {
      link.textContent=copy[link.dataset.headerKey];
      if(link.dataset.headerKey===active)link.setAttribute('aria-current',page==='index'?'location':'true');else link.removeAttribute('aria-current');
    }
    if(context)context.innerHTML=renderContext(lang,page);
    document.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      if (!raw || raw.startsWith('#') || !/\.html(?:[?#]|$)/.test(raw)) return;
      const url = new URL(raw, location.href);
      if (url.origin !== location.origin || url.pathname.endsWith('workspace.html')) return;
      if (link.hasAttribute('data-language-link') || link.hasAttribute('data-public-document-link')) return;
      if (window.KOVA_ROUTES) { link.href = window.KOVA_ROUTES.localize(raw,lang); return; }
      url.searchParams.set('lang', lang);
      link.href = `${url.pathname.split('/').pop()}${url.search}${url.hash}`;
    });
  }
  sync();
  window.addEventListener('hashchange',sync);
  new MutationObserver(sync).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
})();
