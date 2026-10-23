(() => {
  'use strict';
  const pages = window.KOVA_PROJECT_PAGES[document.body.dataset.projectPage];
  const supported = window.KOVA_LANGUAGES.codes;
  const esc = value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const render = data=>`<section class="document-hero"><p class="workspace-kicker">${esc(data.label)}</p><h1>${esc(data.title)}</h1><p>${esc(data.intro)}</p>${data.badge?`<div class="document-meta"><span class="document-chip warning">${esc(data.badge)}</span></div>`:''}</section><div class="document-grid-main">${data.cards.map(([title,body])=>`<article class="document-card"><h2>${esc(title)}</h2><p>${esc(body)}</p></article>`).join('')}</div>${data.note?`<p class="document-notice">${esc(data.note)}</p>`:''}<div class="document-actions">${data.actions.map(([title,href])=>`<a href="${href}">${esc(title)}<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#arrow-right"></use></svg></a>`).join('')}</div>`;
  const initial = window.KOVA_LANGUAGES.initial();
  function applyLanguage(next) {
    const language = supported.includes(next) ? next : 'pl';
    const data = pages[language];
    document.documentElement.lang = language;
    document.querySelector('[data-project-language]').value = language;
    document.querySelector('[data-project-content]').innerHTML = render(data);
    document.title = data.label + ' — KOVA';
    document.querySelector('meta[name="description"]').content = data.intro;
    const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null,'',url);
  }
  document.querySelector('[data-project-language]').addEventListener('change', event => applyLanguage(event.target.value));
  applyLanguage(initial);
})();
