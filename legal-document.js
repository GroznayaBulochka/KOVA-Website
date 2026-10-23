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
    pl:['Prywatność na tej stronie','Wydawca: Vadyslav Konohrai, Polska; kontakt: contact@kovacompass.app. Strona nie ma dostępu do finansów w telefonie ani formularza zgłoszeń. Język i wybór cookies są zapisywane w przeglądarce. Po opcjonalnej zgodzie publiczna strona korzysta z Google Analytics 4 (G-2LE3GWYDZM): statystyki odwiedzin i interakcji, pseudonimowe cookies, informacje o urządzeniu i przybliżonej lokalizacji. Podstawą pomiaru jest zgoda; dane mogą być przetwarzane poza EOG. Nie są to dane w pełni anonimowe. Szczegóły odbiorcy, cookies, praw i ograniczeń znajdują się na stronie Cookies. Retencja GA4 i warunki przetwarzania wymagają potwierdzenia przed publikacją. Zgodę zmienisz w ustawieniach cookies. Link e-mail otwiera Twoją pocztę; wysłana wiadomość i adres służą obsłudze zgłoszenia poza aplikacją. Nie wysyłaj finansów ani haseł. Przyszły hosting, zasady jego logów i okres przechowywania korespondencji wymagają zatwierdzenia przed publikacją. Dokument poniżej dotyczy aplikacji, nie zastępuje tych informacji o stronie.'],
    en:['Privacy on this website','Publisher: Vadyslav Konohrai, Poland; contact: contact@kovacompass.app. This site cannot access finances on your phone and has no submission form. Language and cookie choices are stored in your browser. After optional consent the public site uses Google Analytics 4 (G-2LE3GWYDZM): visit and interaction statistics, pseudonymous cookies, device and approximate location information. Measurement relies on consent; data may be processed outside the EEA and is not fully anonymous. The Cookies page explains the recipient, cookies, rights and limitations. GA4 retention and processing terms require confirmation before publication. Change consent in Cookie settings. Email links open your email app; a message you send and your address are used to handle your request outside KOVA. Do not send financial data or passwords. Future hosting, its logging practices, and correspondence retention require approval before publication. The document below concerns the app and does not replace this website information.'],
    ru:['Приватность на этом сайте','Издатель: Vadyslav Konohrai, Польша; контакт: contact@kovacompass.app. Сайт не имеет доступа к финансам на телефоне и не содержит формы обращений. Язык и выбор cookies сохраняются в браузере. После необязательного согласия публичный сайт использует Google Analytics 4 (G-2LE3GWYDZM): статистику посещений и действий, псевдонимные cookies, данные об устройстве и приблизительном местоположении. Основание — согласие; данные могут обрабатываться вне ЕЭЗ и не являются полностью анонимными. Получатель, cookies, права и ограничения описаны на странице Cookies. Сроки хранения в GA4 и условия обработки требуют подтверждения до публикации. Изменить согласие можно в настройках cookies. Почтовая ссылка открывает вашу почту; отправленное сообщение и адрес используются для обработки обращения вне KOVA. Не отправляйте финансовые данные и пароли. Будущий хостинг, его журналы и срок хранения переписки требуют утверждения перед публикацией. Документ ниже относится к приложению и не заменяет эту информацию о сайте.']
  };
  const reviewCopy = {
    pl:'Projekt dokumentu dla KOVA Offline Free V1, zgodny ze źródłowym dokumentem aplikacji z 22.10.2026 (nie jest to ponowna kwalifikacja APK). Wydawca zatwierdził nazwisko, kontakt i domenę. Publiczne adresy dokumentów wskazał 22.10.2026; w tym dniu potwierdzono odpowiedź HTTP 200. Nie oznacza to zatwierdzenia prawnego ani pełnej kwalifikacji hostingu. Dokument poniżej zawiera publiczny link. Data obowiązywania i zatwierdzenie treści nadal pozostają do uzupełnienia.',
    en:'Draft for KOVA Offline Free V1, matching the app source document dated 22 October 2026 (not a new APK qualification). The publisher approved the name, contact and domain, and supplied the public document URLs on 22 October 2026. An HTTP 200 response was verified that day. This is not legal approval or full hosting qualification. The document below includes its public link. An effective date and content approval remain pending.',
    ru:'Проект для KOVA Offline Free V1, совпадающий с исходным документом приложения от 22.10.2026 (это не повторная проверка APK). Издатель утвердил имя, контакт и домен, а 22.10.2026 указал публичные адреса документов. В этот день подтверждён ответ HTTP 200. Это не правовое утверждение и не полная проверка хостинга. Документ ниже содержит публичную ссылку. Дата действия и утверждение содержания ещё необходимы.'
  };
  for (const [lang, [title, text]] of Object.entries(websiteCopy)) { copy[lang].analyticsTitle = title; copy[lang].analyticsCopy = text; }
  for (const [code,data] of Object.entries(window.KOVA_TRANSLATIONS || {})) {
    copy[code]=data.legal; reviewCopy[code]=data.review;
  }
  const params = new URLSearchParams(location.search);
  let storedLanguage;
  try { storedLanguage = localStorage.getItem('kova_site_language'); } catch { /* Reading documents does not require storage. */ }
  let language = params.get('lang') || document.documentElement.dataset.staticLanguage || storedLanguage || (window.KOVA_LANGUAGES.resolve(navigator.language));
  if (!supported.has(language)) language = 'pl';

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
      content.innerHTML = renderMarkdown(markdown);
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
