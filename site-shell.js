(() => {
  'use strict';
  const labels = {
    pl: { home:'Strona główna', product:'Aplikacja', project:'Projekt', legal:'Informacje', features:'Funkcje', screens:'Ekrany aplikacji', faq:'Pytania i odpowiedzi', status:'Stan projektu', roadmap:'Plan rozwoju', updates:'Aktualności', security:'Bezpieczeństwo', contact:'Kontakt', deletion:'Usuwanie konta', privacy:'Polityka prywatności', terms:'Warunki korzystania', cookies:'Cookies', settings:'Ustawienia cookies', tagline:'Codzienne finanse. W jednym miejscu.', note:'KOVA Free V1 · przed premierą', top:'Wróć na górę', skip:'Przejdź do treści', language:'Język strony', menu:'Menu', back:'Strona główna', official:'Oficjalna strona projektu' },
    en: { home:'Home', product:'The app', project:'Project', legal:'Information', features:'Features', screens:'App screens', faq:'Questions and answers', status:'Project status', roadmap:'Roadmap', updates:'Updates', security:'Security', contact:'Contact', deletion:'Account deletion', privacy:'Privacy Policy', terms:'Terms of Use', cookies:'Cookies', settings:'Cookie settings', tagline:'Everyday finances. In one place.', note:'KOVA Free V1 · before launch', top:'Back to top', skip:'Skip to content', language:'Site language', menu:'Menu', back:'Home', official:'Official project website' },
    ru: { home:'Главная', product:'Приложение', project:'Проект', legal:'Информация', features:'Функции', screens:'Экраны приложения', faq:'Вопросы и ответы', status:'Статус проекта', roadmap:'План развития', updates:'Обновления', security:'Безопасность', contact:'Контакты', deletion:'Удаление аккаунта', privacy:'Конфиденциальность', terms:'Условия использования', cookies:'Cookies', settings:'Настройки cookies', tagline:'Повседневные финансы. В одном месте.', note:'KOVA Free V1 · до выпуска', top:'Наверх', skip:'Перейти к содержимому', language:'Язык сайта', menu:'Меню', back:'Главная', official:'Официальный сайт проекта' }
  };
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#${name}"></use></svg>`;
  Object.assign(labels.pl, {deletion:'Twoje dane',note:'KOVA Offline Free V1 · przed premierą'});
  Object.assign(labels.en, {deletion:'Your data',note:'KOVA Offline Free V1 · before launch'});
  Object.assign(labels.ru, {deletion:'Ваши данные',note:'KOVA Offline Free V1 · до выпуска'});
  const page = window.KOVA_ROUTES ? window.KOVA_ROUTES.parse()?.page + '.html' : location.pathname.split('/').pop() || 'index.html';
  const documentHeader = document.querySelector('.document-header');
  const main = document.querySelector('main');
  document.querySelector('[data-local-workspace]')?.setAttribute('aria-label', 'Workspace');
  if (main && !main.id) main.id = 'main';
  if (!document.querySelector('.skip-link')) {
    const skip = document.createElement('a');
    skip.className = 'skip-link'; skip.href = '#main'; skip.dataset.shellLabel = 'skip';
    document.body.prepend(skip);
  }

  // Reuse the existing language control so document loading keeps its own state.
  if (documentHeader) {
    const language = documentHeader.querySelector('label:has(select)');
    const brand = documentHeader.querySelector('a');
    documentHeader.replaceChildren();
    documentHeader.append(brand);
    brand.href = 'index.html';
    const subtitle = brand.querySelector('small');
    if (subtitle) subtitle.dataset.shellLabel = 'official';
    const nav = document.createElement('nav'); nav.className = 'public-nav'; nav.id = 'public-nav';
    for (const [key, href] of [['status','status.html'], ['roadmap','roadmap.html'], ['updates','updates.html'], ['security','security.html']]) {
      const link = document.createElement('a'); link.href = href; link.dataset.shellLabel = key;
      if (page === href) link.setAttribute('aria-current','page'); nav.append(link);
    }
    const actions = document.createElement('div'); actions.className = 'public-header-actions';
    if (language) actions.append(language);
    const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'public-menu';
    toggle.innerHTML = '<span></span><span></span><span></span><span class="sr-only" data-shell-label="menu"></span>';
    toggle.setAttribute('aria-controls', nav.id); toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.focus(); } });
    actions.append(toggle); documentHeader.append(nav, actions);
    const back = document.querySelector('.document-back');
    if (back) { back.href='index.html'; back.innerHTML = `${icon('chevron-left')}<span data-shell-label="back"></span>`; }
  }

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
  publisher.innerHTML = 'Vadyslav Konohrai · <a href="mailto:contact@kovacompass.app">contact@kovacompass.app</a>';
  footer.querySelector('.footer-about').append(publisher);
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
    documentHeader?.querySelector('nav').setAttribute('aria-label', copy.project);
    document.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      if (!raw || raw.startsWith('#') || !/\.html(?:[?#]|$)/.test(raw)) return;
      const url = new URL(raw, location.href);
      if (url.origin !== location.origin || url.pathname.endsWith('workspace.html')) return;
      if (link.hasAttribute('data-language-link')) return;
      if (window.KOVA_ROUTES) { link.href = window.KOVA_ROUTES.localize(raw,lang); return; }
      url.searchParams.set('lang', lang);
      link.href = `${url.pathname.split('/').pop()}${url.search}${url.hash}`;
    });
  }
  sync();
  new MutationObserver(sync).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
})();
