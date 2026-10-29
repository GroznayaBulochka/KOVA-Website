(() => {
  'use strict';

  const supported = new Set(window.KOVA_LANGUAGES.codes);
  const copy = {
    pl: { language:'Język', back:'Strona główna', source:'Treść używana w aplikacji KOVA', loading:'Ładowanie dokumentu…', error:'Nie udało się wczytać dokumentu.', privacy:'Prywatność', terms:'Warunki użycia', cookies:'Cookies' },
    en: { language:'Language', back:'Home', source:'Content used by the KOVA app', loading:'Loading document…', error:'The document could not be loaded.', privacy:'Privacy', terms:'Terms of Use', cookies:'Cookies' },
    ru: { language:'Язык', back:'Главная', source:'Текст, используемый в приложении KOVA', loading:'Загрузка документа…', error:'Не удалось загрузить документ.', privacy:'Конфиденциальность', terms:'Условия использования', cookies:'Cookies' }
  };

  const documentKind = document.body.dataset.legalDocument;
  const websiteCopy = {
  "pl": [
    "Prywatność na tej stronie",
    "Witryna nie czyta bazy telefonu. Google Analytics mierzy odwiedziny i działania na stronie wyłącznie po zgodzie. Odrzucenie zachowuje pełny dostęp. Wybór zmienisz w ustawieniach cookies; szczegóły hostingu i dostawców wymagają potwierdzenia przed nowym publicznym wdrożeniem. Google Analytics 4: G-2LE3GWYDZM. contact@kovacompass.app."
  ],
  "en": [
    "Privacy on this website",
    "This site cannot read your phone database. Google Analytics measures website visits and interactions only with your consent. Rejecting keeps the full site available. Change your choice in Cookie settings; hosting and provider details still require confirmation before a new public deployment. Google Analytics 4: G-2LE3GWYDZM. contact@kovacompass.app."
  ],
  "ru": [
    "Приватность на этом сайте",
    "Сайт не читает базу данных телефона. Google Analytics измеряет посещения и действия только с вашего согласия. При отказе весь сайт остаётся доступным. Выбор можно изменить в настройках cookies; сведения о хостинге и поставщиках услуг ещё требуют подтверждения перед новым публичным размещением. Google Analytics 4: G-2LE3GWYDZM. contact@kovacompass.app."
  ]
};
  const reviewCopy = {
  "pl": "Projekt dla planowanego pierwszego wydania KOVA: darmowa baza i opcjonalne Premium. Zgodny z aktualnymi dokumentami aplikacji z 24.10.2026. Data obowiązywania, końcowe zatwierdzenie oraz pozostałe informacje o sprzedawcy i usługach wymagają uzupełnienia. Nie jest to aktywna oferta subskrypcji.",
  "en": "Draft for the planned first KOVA release: a free base and optional Premium. Matches the current app documents dated 24 October 2026. An effective date, final approval and the remaining seller and service details are pending. This is not an active subscription offer.",
  "ru": "Черновик запланированного первого выпуска KOVA: бесплатная базовая версия и дополнительный Premium. Соответствует текущим документам приложения от 24 октября 2026 года. Дата вступления в силу, окончательное утверждение, а также остальные сведения о продавце и услугах ожидаются. Это не активное предложение подписки."
};
  for (const [lang, [title, text]] of Object.entries(websiteCopy)) { copy[lang].analyticsTitle = title; copy[lang].analyticsCopy = text; }
  for (const [code,data] of Object.entries(window.KOVA_TRANSLATIONS || {})) {
    copy[code]=data.legal; reviewCopy[code]=data.review;
  }
  window.addEventListener('kova:locale-loaded', ({detail:{code,data}}) => {copy[code]=data.legal;reviewCopy[code]=data.review;});
  let language = window.KOVA_LANGUAGES.initial();

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[character]);
  const slug = value => value.toLowerCase().replace(/[`*_]/g, '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

  function inline(source) {
    const tokens = [];
    const tokenized = String(source).replace(/`([^`]+)`|\[([^\]]+)]\(([^)]+)\)|\*\*(.+?)\*\*/g, (_, code, label, href, bold) => {
      let html;
      if (code !== undefined) html = `<code>${escapeHtml(code)}</code>`;
      else if (label !== undefined) {
        const appDocument = /^(privacy-policy|terms-of-service)-([a-z]{2,3})\.md$/.exec(href);
        const safeHref = appDocument ? `${appDocument[1] === 'privacy-policy' ? 'privacy' : 'terms'}.html?lang=${appDocument[2]}` : /^(?:https?:\/\/|#)/i.test(href) ? href : '#';
        const external = /^https?:\/\//i.test(safeHref) ? ' target="_blank" rel="noopener noreferrer"' : '';
        const publicDocument = /^https:\/\/kovacompass\.app\/(?:privacy|terms)\.html\?lang=en$/.test(safeHref) ? ' data-public-document-link' : '';
        html = `<a href="${escapeHtml(safeHref)}"${external}${publicDocument}>${escapeHtml(label)}</a>`;
      } else html = `<strong>${escapeHtml(bold)}</strong>`;
      const index = tokens.push(html) - 1;
      return `\u0000${index}\u0000`;
    });
    return escapeHtml(tokenized).replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
  }

  function renderMarkdown(markdown, pendingLabel = 'Pending owner confirmation before publication', documentLanguage = 'en') {
    markdown = markdown.replaceAll('[OWNER_INPUT_REQUIRED]', pendingLabel);
    // Preserve the canonical source bytes; repair known translation damage only
    // in presentation, with links pointing to the same document language.
    markdown = markdown.replace(/［\s*(https?:\/\/[^\s\]]+)\]/g,'[$1]').replace(/\[\s+(https?:\/\/[^\s\]]+)\]/g,'[$1]');
    const damagedLinks={'شروط الخدمة-en.md':'terms-of-service','सेवा की शर्तें-en.md':'terms-of-service','terma-perkhidmatan-en.md':'terms-of-service','masharti-ya-huduma-en.md':'terms-of-service','điều khoản dịch vụ-en.md':'terms-of-service','faragha-sera-en.md':'privacy-policy'};
    markdown = markdown.replace(/\]\(([^)]+)\)/g,(all,href)=>damagedLinks[href]?`](${damagedLinks[href]}-${documentLanguage}.md)`:all);
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
    document.querySelector('[data-legal-language]').value = language;
    document.querySelectorAll('[data-legal-copy]').forEach(node => { node.textContent = copy[language][node.dataset.legalCopy]; });
    document.querySelectorAll('[data-legal-link]').forEach(link => { const url = new URL(link.getAttribute('href'), location.href); url.searchParams.set('lang', language); link.href = `${url.pathname.split('/').pop()}${url.search}${url.hash}`; });
    const source = window.KOVA_ASSET_URL?.(`legal/${documentKind}-${language}.md`) || `legal/${documentKind}-${language}.md`;
    const sourceLink = document.querySelector('[data-legal-source]');
    sourceLink.href = source;
    const content = document.querySelector('[data-legal-content]');
    document.querySelector('.legal-toc')?.remove();
    let reviewNotice = document.querySelector('[data-legal-review]');
    if (!reviewNotice) { reviewNotice = document.createElement('p'); reviewNotice.className = 'document-notice'; reviewNotice.dataset.legalReview = ''; content.before(reviewNotice); }
    reviewNotice.textContent = reviewCopy[language];
    const publicUrl = reviewNotice.dataset.publicDocumentUrl;
    if (/^https:\/\/kovacompass\.app\/(?:privacy|terms)\.html\?lang=en$/.test(publicUrl)) {
      reviewNotice.append(' ' + (window.KOVA_TRANSLATIONS?.[language]?.extra.publicAddress || {pl:'Publiczny adres EN: ',en:'Public EN address: ',ru:'Публичный адрес EN: '}[language]));
      const link = document.createElement('a');
      link.href = publicUrl;
      link.textContent = publicUrl;
      link.dataset.publicDocumentLink = '';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      reviewNotice.append(link);
    }
    content.setAttribute('aria-busy', 'true');
    content.textContent = copy[language].loading;
    try {
      const response = await fetch(source, { cache:'no-store' });
      if (!response.ok) throw new Error(String(response.status));
      const markdown = await response.text();
      if (revision !== loadRevision) return;
      content.innerHTML = renderMarkdown(markdown, window.KOVA_TRANSLATIONS?.[language]?.extra.pendingDecision || {pl:'Do potwierdzenia przez właściciela przed publikacją',en:'Pending owner confirmation before publication',ru:'Ожидает подтверждения владельца перед публикацией'}[language], language);
      const firstHeading = content.querySelector('h1');
      const title = firstHeading?.textContent;
      if (title) { document.title = `${title} — KOVA`; document.querySelector('[data-legal-page-heading]').textContent = title; firstHeading.remove(); }
      const headings = [...content.querySelectorAll('h2')];
      if (headings.length) {
        const toc = document.createElement('details');
        toc.className = 'legal-toc';
        const heading = (window.KOVA_TRANSLATIONS?.[language]?.extra.contents || { pl:'Spis treści', en:'Contents', ru:'Содержание' }[language]);
        toc.innerHTML = `<summary>${heading}</summary><nav aria-label="${heading}">${headings.map(node => `<a href="#${escapeHtml(node.id)}">${escapeHtml(node.textContent)}</a>`).join('')}</nav>`;
        content.before(toc);
      }
    } catch (_) {
      if (revision !== loadRevision) return;
      content.textContent = copy[language].error;
    } finally {
      if (revision === loadRevision) { content.setAttribute('aria-busy', 'false'); window.dispatchEvent(new Event('kova:content-ready')); }
    }
  }

  document.querySelector('[data-legal-language]').addEventListener('change', event => {
    const url = new URL(location.href); url.searchParams.set('lang', event.target.value); history.replaceState(null, '', url);
    applyLanguage(event.target.value);
  });
  applyLanguage(language);
})();
