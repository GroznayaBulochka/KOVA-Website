(() => {
  'use strict';

  const supported = new Set(['pl', 'en', 'ru']);
  const copy = {
    pl: { language:'Język', back:'Strona główna', source:'Treść używana w aplikacji KOVA', loading:'Ładowanie dokumentu…', error:'Nie udało się wczytać dokumentu.', privacy:'Prywatność', terms:'Warunki użycia', cookies:'Cookies', analyticsTitle:'Analityka oficjalnej strony KOVA', analyticsCopy:'Po wyrażeniu zgody strona tworzy anonimowy identyfikator przeglądarki, identyfikator krótkiej sesji i licznik odsłon. Zdarzenia mogą być wysyłane wyłącznie do skonfigurowanego endpointu analitycznego KOVA. Odmowa nie ogranicza strony ani aplikacji, a zgodę można zmienić w ustawieniach cookies.' },
    en: { language:'Language', back:'Home', source:'Content used by the KOVA app', loading:'Loading document…', error:'The document could not be loaded.', privacy:'Privacy', terms:'Terms of Use', cookies:'Cookies', analyticsTitle:'Official KOVA website analytics', analyticsCopy:'After consent, the site creates an anonymous browser identifier, a short-lived session identifier, and a page-view counter. Events may be sent only to KOVA’s configured analytics endpoint. Refusing does not limit the site or app, and consent can be changed in Cookie settings.' },
    ru: { language:'Язык', back:'Главная', source:'Текст, используемый в приложении KOVA', loading:'Загрузка документа…', error:'Не удалось загрузить документ.', privacy:'Конфиденциальность', terms:'Условия использования', cookies:'Cookies', analyticsTitle:'Аналитика официального сайта KOVA', analyticsCopy:'После согласия сайт создаёт анонимный идентификатор браузера, идентификатор короткой сессии и счётчик просмотров. События могут отправляться только на настроенный аналитический endpoint KOVA. Отказ не ограничивает сайт или приложение, а согласие можно изменить в настройках cookies.' }
  };

  const documentKind = document.body.dataset.legalDocument;
  const websiteCopy = {
    pl:['Prywatność na tej stronie','Strona nie ma dostępu do finansów w telefonie. Analityka jest opcjonalna: po zgodzie zapisywany jest identyfikator przeglądarki, sesja i licznik zdarzeń. Obecnie nie ma podłączonego zewnętrznego odbiorcy analityki. Zgodę możesz zmienić w ustawieniach cookies.'],
    en:['Privacy on this website','The website cannot access finances on your phone. Analytics is optional: consent enables a browser identifier, session, and event counter. No external analytics receiver is currently connected. You can change consent in Cookie settings.'],
    ru:['Приватность на этом сайте','Сайт не имеет доступа к финансам на телефоне. Аналитика необязательна: после согласия сохраняются идентификатор браузера, сессия и счётчик событий. Внешний получатель аналитики пока не подключён. Согласие можно изменить в настройках cookies.']
  };
  for (const [lang, [title, text]] of Object.entries(websiteCopy)) { copy[lang].analyticsTitle = title; copy[lang].analyticsCopy = text; }
  const params = new URLSearchParams(location.search);
  let storedLanguage;
  try { storedLanguage = localStorage.getItem('kova_site_language'); } catch { /* Reading documents does not require storage. */ }
  let language = params.get('lang') || storedLanguage || (navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'pl');
  if (!supported.has(language)) language = 'pl';

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[character]);
  const slug = value => value.toLowerCase().replace(/[`*_]/g, '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\u0400-\u04ff]+/g, '-').replace(/^-|-$/g, '');

  function inline(source) {
    const tokens = [];
    const tokenized = String(source).replace(/`([^`]+)`|\[([^\]]+)]\(([^)]+)\)|\*\*(.+?)\*\*/g, (_, code, label, href, bold) => {
      let html;
      if (code !== undefined) html = `<code>${escapeHtml(code)}</code>`;
      else if (label !== undefined) {
        const safeHref = /^(?:https?:\/\/|#)/i.test(href) ? href : '#';
        const external = /^https?:\/\//i.test(safeHref) ? ' target="_blank" rel="noopener noreferrer"' : '';
        html = `<a href="${escapeHtml(safeHref)}"${external}>${escapeHtml(label)}</a>`;
      } else html = `<strong>${escapeHtml(bold)}</strong>`;
      const index = tokens.push(html) - 1;
      return `\u0000${index}\u0000`;
    });
    return escapeHtml(tokenized).replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
  }

  function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
    const html = [];
    let paragraph = [];
    let list = null;
    const flushParagraph = () => { if (paragraph.length) { html.push(`<p>${inline(paragraph.join(' '))}</p>`); paragraph = []; } };
    const closeList = () => { if (list) { html.push(`</${list}>`); list = null; } };
    const openList = type => { if (list !== type) { closeList(); html.push(`<${type}>`); list = type; } };

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index].trimEnd();
      if (!line.trim()) { flushParagraph(); closeList(); continue; }
      const heading = /^(#{1,4})\s+(.+)$/.exec(line);
      if (heading) { flushParagraph(); closeList(); const level = Math.min(heading[1].length, 3); html.push(`<h${level} id="${slug(heading[2])}">${inline(heading[2])}</h${level}>`); continue; }
      if (line.includes('|') && index + 1 < lines.length && /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(lines[index + 1])) {
        flushParagraph(); closeList(); const rows = [line]; index += 2; while (index < lines.length && lines[index].includes('|') && lines[index].trim()) { rows.push(lines[index]); index += 1; } index -= 1;
        const cells = row => row.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
        html.push('<div class="legal-table-wrap"><table><thead><tr>', ...cells(rows[0]).map(cell => `<th>${inline(cell)}</th>`), '</tr></thead><tbody>');
        rows.slice(1).forEach(row => html.push('<tr>', ...cells(row).map(cell => `<td>${inline(cell)}</td>`), '</tr>'));
        html.push('</tbody></table></div>'); continue;
      }
      const unordered = /^\s*[-*]\s+(.+)$/.exec(line);
      if (unordered) { flushParagraph(); openList('ul'); html.push(`<li>${inline(unordered[1])}</li>`); continue; }
      const ordered = /^\s*\d+[.)]\s+(.+)$/.exec(line);
      if (ordered) { flushParagraph(); openList('ol'); html.push(`<li>${inline(ordered[1])}</li>`); continue; }
      const quote = /^\s*>\s?(.+)$/.exec(line);
      if (quote) { flushParagraph(); closeList(); html.push(`<blockquote>${inline(quote[1])}</blockquote>`); continue; }
      if (/^\s*---+\s*$/.test(line)) { flushParagraph(); closeList(); html.push('<hr>'); continue; }
      closeList(); paragraph.push(line.trim());
    }
    flushParagraph(); closeList();
    return html.join('');
  }

  let loadRevision = 0;
  async function applyLanguage(nextLanguage) {
    const revision = ++loadRevision;
    language = supported.has(nextLanguage) ? nextLanguage : 'pl';
    document.documentElement.lang = language;
    try { localStorage.setItem('kova_site_language', language); } catch { /* URL retains the choice. */ }
    document.cookie = `kova_site_language=${language}; Max-Age=31536000; Path=/; SameSite=Lax`;
    document.querySelector('[data-legal-language]').value = language;
    document.querySelectorAll('[data-legal-copy]').forEach(node => { node.textContent = copy[language][node.dataset.legalCopy]; });
    document.querySelectorAll('[data-legal-link]').forEach(link => { const url = new URL(link.getAttribute('href'), location.href); url.searchParams.set('lang', language); link.href = `${url.pathname.split('/').pop()}${url.search}${url.hash}`; });
    const source = `legal/${documentKind}-${language}.md`;
    const sourceLink = document.querySelector('[data-legal-source]');
    sourceLink.href = source;
    const content = document.querySelector('[data-legal-content]');
    document.querySelector('.legal-toc')?.remove();
    let reviewNotice = document.querySelector('[data-legal-review]');
    if (!reviewNotice) { reviewNotice = document.createElement('p'); reviewNotice.className = 'document-notice'; reviewNotice.dataset.legalReview = ''; content.before(reviewNotice); }
    reviewNotice.textContent = {
      pl:'Dokument pochodzi z aplikacji w rozwoju. Zawiera jeszcze pola robocze i przykładowe kontakty; wymaga uzupełnienia oraz zatwierdzenia przed publicznym wydaniem.',
      en:'This document comes from the app in development. It still contains draft fields and example contacts; it needs completion and approval before public release.',
      ru:'Документ взят из приложения в разработке. В нём остаются рабочие поля и примерные контакты; перед публичным выпуском его нужно дополнить и утвердить.'
    }[language];
    content.setAttribute('aria-busy', 'true');
    content.textContent = copy[language].loading;
    try {
      const response = await fetch(source, { cache:'no-store' });
      if (!response.ok) throw new Error(String(response.status));
      const markdown = await response.text();
      if (revision !== loadRevision) return;
      content.innerHTML = renderMarkdown(markdown);
      const firstHeading = content.querySelector('h1');
      const title = firstHeading?.textContent;
      if (title) { document.title = `${title} — KOVA`; document.querySelector('[data-legal-page-heading]').textContent = title; firstHeading.remove(); }
      const headings = [...content.querySelectorAll('h2')];
      if (headings.length) {
        const toc = document.createElement('details');
        toc.className = 'legal-toc';
        const heading = { pl:'Spis treści', en:'Contents', ru:'Содержание' }[language];
        toc.innerHTML = `<summary>${heading}</summary><nav aria-label="${heading}">${headings.map(node => `<a href="#${escapeHtml(node.id)}">${escapeHtml(node.textContent)}</a>`).join('')}</nav>`;
        content.before(toc);
      }
    } catch (_) {
      if (revision !== loadRevision) return;
      content.textContent = copy[language].error;
    } finally {
      if (revision === loadRevision) content.setAttribute('aria-busy', 'false');
    }
  }

  document.querySelector('[data-legal-language]').addEventListener('change', event => {
    const url = new URL(location.href); url.searchParams.set('lang', event.target.value); history.replaceState(null, '', url);
    applyLanguage(event.target.value);
  });
  applyLanguage(language);
})();
