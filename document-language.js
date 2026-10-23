(() => {
  'use strict';

  const supported = new Set(window.KOVA_LANGUAGES.codes);
  let language = window.KOVA_LANGUAGES.initial();

  const main=document.querySelector('main');
  for (const [code,data] of Object.entries(window.KOVA_TRANSLATIONS || {})) {
    if (!main.querySelector(`[data-doc-lang="${code}"]`)) main.insertAdjacentHTML('beforeend',data.cookies);
  }
  const applyLanguage = nextLanguage => {
    language = supported.has(nextLanguage) ? nextLanguage : 'pl';
    document.documentElement.lang = language;
    document.querySelectorAll('[data-doc-lang]').forEach(section => { section.hidden = section.dataset.docLang !== language; });
    document.querySelectorAll('[data-document-language]').forEach(select => { select.value = language; });
    const title = document.querySelector(`[data-document-title][data-doc-lang="${language}"]`);
    if (title?.dataset.documentTitle) document.title = title.dataset.documentTitle;
    document.querySelectorAll('[data-preserve-language]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      url.searchParams.set('lang', language);
      link.href = `${url.pathname.split('/').pop()}${url.search}${url.hash}`;
    });
  };

  document.querySelectorAll('[data-document-language]').forEach(select => {
    select.addEventListener('change', event => {
      const url = new URL(location.href);
      url.searchParams.set('lang', event.target.value);
      history.replaceState(null, '', url);
      applyLanguage(event.target.value);
    });
  });

  applyLanguage(language);
})();
