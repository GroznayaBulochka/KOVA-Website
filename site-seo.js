// Shared URL/metadata contract. Static HTML contains the same metadata before JS.
(() => {
  'use strict';
  const languages = ['pl','en','ru'];
  const pages = ['index','status','roadmap','updates','security','contact','delete-account','privacy','terms','cookies','404'];
  function parse(path = location.pathname) {
    const match = /^\/([a-z0-9-]+?)(?:-(en|ru))?\.html$/.exec(path);
    if (path === '/') return {page:'index',language:'pl'};
    return match && pages.includes(match[1]) ? {page:match[1],language:match[2] || 'pl'} : null;
  }
  function path(page, language) {
    if (!pages.includes(page) || !languages.includes(language)) return null;
    return page === 'index' && language === 'pl' ? '/' : `/${page}${language === 'pl' ? '' : '-' + language}.html`;
  }
  function localize(href, language) {
    const url = new URL(href, location.href);
    const route = url.origin === location.origin && parse(url.pathname);
    if (!route) return href;
    url.pathname = path(route.page, language);
    url.searchParams.delete('lang');
    return url.pathname + url.search + url.hash;
  }
  window.KOVA_ROUTES = Object.freeze({parse,path,localize});
  function init() {
    const source = document.getElementById('kova-seo-data');
    if (!source) return; // Source-only Workspace preview is never an SEO build.
    const data = JSON.parse(source.textContent);
    function sync() {
      const language = languages.includes(document.documentElement.lang) ? document.documentElement.lang : data.language;
      const selected = data.locales[language];
      const url = new URL(location.href);
      url.pathname = path(data.page, language);
      // Keep old ?lang links usable; canonical metadata excludes all query strings.
      history.replaceState(null, '', url);
      document.title = selected.title;
      for (const [selector,value] of Object.entries({
        'meta[name="description"]':selected.description,
        'meta[property="og:title"]':selected.title,
        'meta[property="og:description"]':selected.description,
        'meta[property="og:url"]':selected.canonical,
        'meta[property="og:locale"]':{pl:'pl_PL',en:'en_GB',ru:'ru_RU'}[language],
        'meta[name="twitter:title"]':selected.title,
        'meta[name="twitter:description"]':selected.description
      })) { const node = document.querySelector(selector); if (node) node.content = value; }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.href = selected.canonical;
      const schema = document.getElementById('kova-structured-data');
      if (schema) schema.textContent = JSON.stringify(selected.schema);
      document.querySelectorAll('a[href]').forEach(link => {
        if (!link.getAttribute('href').startsWith('#') && !link.hasAttribute('data-language-link') && !link.hasAttribute('data-public-document-link')) link.href = localize(link.getAttribute('href'), language);
      });
    }
    sync();
    new MutationObserver(sync).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
    // Legal content loads asynchronously; its heading must not overwrite SEO metadata.
    window.addEventListener('kova:content-ready', sync);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
