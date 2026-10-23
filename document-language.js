(() => {
  'use strict';

  const supported = new Set(window.KOVA_LANGUAGES.codes);
  const params = new URLSearchParams(location.search);
  const browserLanguage = window.KOVA_LANGUAGES.resolve(navigator.language);
  let storedLanguage;
  try { storedLanguage = localStorage.getItem('kova_site_language'); } catch { /* The document remains readable without storage. */ }
  let language = params.get('lang') || document.documentElement.dataset.staticLanguage || storedLanguage || browserLanguage;
  if (!supported.has(language)) language = 'pl';

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
      try { localStorage.setItem('kova_site_language', event.target.value); } catch { /* URL retains the choice. */ }
      document.cookie = `kova_site_language=${event.target.value}; Max-Age=31536000; Path=/; SameSite=Lax`;
      const url = new URL(location.href);
      url.searchParams.set('lang', event.target.value);
      history.replaceState(null, '', url);
      applyLanguage(event.target.value);
    });
  });

  applyLanguage(language);
})();
