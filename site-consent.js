(() => {
  'use strict';

  // Basic Consent Mode: no Google script, preconnect or request before opt-in.
  // This file is deliberately not loaded by the private Workspace or Android app.
  const ID = 'G-2LE3GWYDZM';
  const COOKIE = 'kova_cookie_consent_v2';
  const MAX_AGE = 60 * 60 * 24 * 180;
  const pages = new Set(['index.html','status.html','roadmap.html','updates.html','security.html','contact.html','delete-account.html','privacy.html','terms.html','cookies.html','404.html']);
  const normalized = window.KOVA_ROUTES?.parse();
  const page = normalized ? normalized.page + '.html' : location.pathname === '/' ? 'index.html' : location.pathname.slice(1);
  if (!pages.has(page)) return;
  const publicHost = location.protocol === 'https:' && ['kovacompass.app','www.kovacompass.app'].includes(location.hostname) && !location.port;
  const events = new Set(['presentation_open','presentation_play','presentation_select','screenshot_open','faq_open','contact_click','primary_cta','social_click','google_play_click']);
  const read = () => {
    try { return document.cookie.split(';').map(s => s.trim()).find(s => s.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1) || ''; }
    catch { return ''; }
  };
  const write = value => {
    try { document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; }
    catch { /* No persistent consent means no Google analytics. */ }
  };
  function removeCookie(name) {
    for (const domain of ['', location.hostname, '.' + location.hostname, 'kovacompass.app', '.kovacompass.app']) {
      try { document.cookie = `${name}=; Max-Age=0; Path=/${domain ? '; Domain=' + domain : ''}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; } catch { /* Storage may be blocked. */ }
    }
  }
  function clearAnalyticsCookies() {
    let names = [];
    try { names = document.cookie.split(';').map(s => s.trim().split('=')[0]); } catch {}
    for (const name of names) if (name === '_ga' || name.startsWith('_ga_') || name.startsWith('kova_analytics_')) removeCookie(name);
  }
  // The former local-counter consent never authorizes Google Analytics.
  for (const name of ['kova_cookie_notice','kova_cookie_consent','kova_analytics_id','kova_analytics_session','kova_analytics_page_count']) removeCookie(name);
  let consent = read();
  let started = false;
  let tag;
  let epoch = 0;
  let channel;
  const lang = () => window.KOVA_LANGUAGES.codes.includes(document.documentElement.lang) ? document.documentElement.lang : 'pl';
  // No URL query, fragments, referrer, form contents, user ID or financial data.
  const pageLocation = () => `https://kovacompass.app/${page === 'index.html' ? '' : page}`;
  function eligible() {
    return publicHost && consent === 'analytics' && read() === 'analytics';
  }
  function track(name, context = {}) {
    if (!events.has(name) || !started || !eligible()) return false;
    // Only fixed categories are accepted. Never send a destination URL or query.
    const safe={};
    if(['hero','closing'].includes(context.placement))safe.placement=context.placement;
    if(['instagram','tiktok'].includes(context.channel))safe.channel=context.channel;
    if(['follow_launch','google_play'].includes(context.action))safe.action=context.action;
    window.gtag('event', name, {send_to:ID, page_location:pageLocation(), page_title:page, language:lang(),...safe});
    return true;
  }
  function start() {
    if (started || !eligible()) return;
    started = true;
    const run = ++epoch;
    window['ga-disable-' + ID] = false;
    window.dataLayer = [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    window.gtag('consent', 'update', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    window.gtag('js', new Date());
    window.gtag('config', ID, {
      send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false,
      cookie_expires:MAX_AGE, cookie_update:false, cookie_flags:'SameSite=Lax;Secure',
      page_location:pageLocation(), page_referrer:'', page_title:page, ignore_referrer:true
    });
    window.gtag('event', 'page_view', {send_to:ID, page_location:pageLocation(), page_referrer:'', page_title:page, language:lang()});
    tag?.remove();
    tag = document.createElement('script');
    tag.async = true;
    tag.referrerPolicy = 'no-referrer';
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    tag.dataset.kovaGoogleTag = '';
    tag.onerror = () => {
      if (run !== epoch) return;
      window['ga-disable-' + ID] = true;
      started = false;
      window.dataLayer = [];
      // A blocker/offline failure does not lock the site or start a retry loop.
    };
    document.head.append(tag);
  }
  function stop() {
    const loaded = Boolean(tag);
    ++epoch;
    started = false;
    window['ga-disable-' + ID] = true;
    tag?.remove();
    tag = undefined;
    if (window.dataLayer) window.dataLayer.length = 0;
    window.gtag = () => {};
    clearAnalyticsCookies();
    // Removing a script alone cannot stop its timers. Unload it after withdrawal.
    // This cannot recall requests already sent before the user's decision.
    if (loaded) location.reload();
  }

  const copy = {
    pl: {
      kicker:'TWÓJ WYBÓR', title:'Prywatność na Twoich zasadach',
      body:'Czy pozwolisz nam mierzyć korzystanie ze strony za pomocą Google Analytics? Pomaga to sprawdzić, które prezentacje i informacje są przydatne. Google otrzyma dane o odwiedzinach, urządzeniu i interakcjach oraz identyfikatory cookies — nie dane finansowe z aplikacji.',
      note:'Analityka jest opcjonalna. Odrzucenie daje taki sam dostęp do strony. Bez zgody nie łączymy się z Google Analytics.',
      accept:'Akceptuję analitykę', reject:'Odrzucam analitykę', settings:'Dostosuj wybór', save:'Zapisz wybór',
      essential:'Niezbędne ustawienia', essentialBody:'Język i Twój wybór prywatności. Zawsze aktywne.',
      analytics:'Google Analytics', analyticsBody:'Statystyki odwiedzin i korzystania z prezentacji. Bez reklam i personalizacji reklam.',
      privacy:'Prywatność', cookies:'Szczegóły cookies', foot:'Wybór zapamiętamy na 180 dni. Zmienisz go w każdej chwili w „Ustawieniach cookies” w stopce.'
    },
    en: {
      kicker:'YOUR CHOICE', title:'Privacy on your terms',
      body:'May we measure website use with Google Analytics? It helps us learn which demonstrations and information are useful. Google receives visit, device and interaction data and cookie identifiers — not financial data from the app.',
      note:'Analytics is optional. Rejecting gives you the same access. We do not connect to Google Analytics without consent.',
      accept:'Accept analytics', reject:'Reject analytics', settings:'Customize choice', save:'Save choice',
      essential:'Essential settings', essentialBody:'Language and your privacy choice. Always active.',
      analytics:'Google Analytics', analyticsBody:'Visit and presentation usage statistics. No ads or ad personalization.',
      privacy:'Privacy', cookies:'Cookie details', foot:'We remember your choice for 180 days. Change it anytime using “Cookie settings” in the footer.'
    },
    ru: {
      kicker:'ВАШ ВЫБОР', title:'Приватность на ваших условиях',
      body:'Разрешите измерять использование сайта с помощью Google Analytics? Это помогает понять, какие демонстрации и сведения полезны. Google получает данные о посещениях, устройстве и действиях, а также идентификаторы cookies — не финансовые данные приложения.',
      note:'Аналитика необязательна. Отказ не ограничивает доступ. Без согласия мы не подключаемся к Google Analytics.',
      accept:'Принять аналитику', reject:'Отклонить аналитику', settings:'Настроить выбор', save:'Сохранить выбор',
      essential:'Необходимые настройки', essentialBody:'Язык и ваш выбор приватности. Всегда активны.',
      analytics:'Google Analytics', analyticsBody:'Статистика посещений и использования презентации. Без рекламы и её персонализации.',
      privacy:'Приватность', cookies:'Подробнее о cookies', foot:'Выбор сохраняется на 180 дней. Изменить его можно в любой момент в «Настройках cookies» внизу сайта.'
    }
  };
  for (const [code,data] of Object.entries(window.KOVA_TRANSLATIONS || {})) copy[code]=data.consent;
  window.addEventListener('kova:locale-loaded', ({detail:{code,data}}) => {copy[code]=data.consent;});
  const dialog = document.createElement('dialog');
  dialog.className = 'consent-dialog';
  dialog.dataset.cookieBanner = '';
  dialog.setAttribute('aria-labelledby', 'consent-title');
  dialog.setAttribute('aria-describedby', 'consent-body');
  dialog.innerHTML = `<div class="consent-mark" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M16 3 27 7v8c0 7-6 11-11 14C11 26 5 22 5 15V7Z"/><path d="m11 16 3 3 7-7"/></svg></div>
    <p class="consent-kicker" data-consent-copy="kicker"></p><h2 id="consent-title" data-consent-copy="title" tabindex="-1" autofocus></h2>
    <p id="consent-body" data-consent-copy="body"></p><p class="consent-note" data-consent-copy="note"></p>
    <div class="consent-actions"><button type="button" data-cookie-essential data-consent-copy="reject"></button><button type="button" data-cookie-accept-all data-consent-copy="accept"></button></div>
    <button class="consent-settings" type="button" data-cookie-preferences-toggle data-consent-copy="settings" aria-controls="consent-preferences" aria-expanded="false"></button>
    <div id="consent-preferences" data-cookie-preferences hidden>
      <label class="consent-option"><span><strong data-consent-copy="essential"></strong><small data-consent-copy="essentialBody"></small></span><input type="checkbox" checked disabled></label>
      <label class="consent-option"><span><strong data-consent-copy="analytics"></strong><small data-consent-copy="analyticsBody"></small></span><input type="checkbox" data-cookie-analytics-toggle></label>
      <button class="consent-save" type="button" data-cookie-save data-consent-copy="save"></button>
    </div><div class="consent-links"><a data-consent-privacy data-consent-copy="privacy" href="privacy.html"></a><a data-consent-cookies data-consent-copy="cookies" href="cookies.html"></a></div>
    <p class="consent-foot" data-consent-copy="foot"></p>`;
  document.body.append(dialog);
  const preferences = dialog.querySelector('[data-cookie-preferences]');
  const toggle = dialog.querySelector('[data-cookie-analytics-toggle]');
  const settings = dialog.querySelector('[data-cookie-preferences-toggle]');
  function translate() {
    const language = lang();
    dialog.querySelectorAll('[data-consent-copy]').forEach(node => { node.textContent = copy[language][node.dataset.consentCopy]; });
    dialog.querySelector('[data-consent-privacy]').href = 'privacy.html?lang=' + language;
    dialog.querySelector('[data-consent-cookies]').href = 'cookies.html?lang=' + language;
  }
  function open(details = false) {
    toggle.checked = consent === 'analytics';
    preferences.hidden = !details;
    settings.setAttribute('aria-expanded', String(details));
    translate();
    if (!dialog.open) dialog.showModal();
  }
  function save(allowed) {
    consent = allowed ? 'analytics' : 'essential';
    write(consent);
    dialog.close();
    try { channel?.postMessage('changed'); } catch {}
    if (allowed) start(); else stop();
  }
  dialog.querySelector('[data-cookie-accept-all]').addEventListener('click', () => save(true));
  dialog.querySelector('[data-cookie-essential]').addEventListener('click', () => save(false));
  dialog.querySelector('[data-cookie-save]').addEventListener('click', () => save(toggle.checked));
  settings.addEventListener('click', () => { preferences.hidden = !preferences.hidden; settings.setAttribute('aria-expanded', String(!preferences.hidden)); });
  // Escape is rejection, never consent. Backdrop clicks never accept or dismiss.
  dialog.addEventListener('cancel', event => { event.preventDefault(); save(false); });
  window.addEventListener('kova:cookie-settings', () => open(true));
  new MutationObserver(translate).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  function reconcile() {
    const current = read();
    if (current === consent) return;
    consent = current;
    if (current !== 'analytics') stop();
    else start();
    if (!['analytics','essential'].includes(current)) open();
    else if (dialog.open) dialog.close();
  }
  try { channel = new BroadcastChannel('kova-consent-v2'); channel.onmessage = reconcile; } catch {}
  window.addEventListener('pageshow', reconcile);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) reconcile(); });
  document.addEventListener('click', event => {
    const el = event.target instanceof Element ? event.target : null;
    const primary=el?.closest('[data-primary-cta]');
    const social=el?.closest('a[href]');
    if(primary){
      const action=primary.dataset.ctaAction || 'follow_launch';
      track('primary_cta',{placement:primary.dataset.ctaLocation,action});
      if(action==='google_play')track('google_play_click');
      else track('social_click',{channel:'instagram'});
    }
    else if(social && /^https:\/\/www\.(?:instagram\.com\/kova_money\/|tiktok\.com\/@kova_money)$/.test(social.href)) track('social_click',{channel:social.href.includes('instagram.com')?'instagram':'tiktok'});
    else if (el?.closest('[data-video-open]')) track('presentation_open');
    else if (el?.closest('[data-video-play]')?.querySelector('use')?.getAttribute('href')?.endsWith('#pause')) track('presentation_play');
    else if (el?.closest('[data-video-chapter]')) track('presentation_select');
    else if (el?.closest('[data-lightbox]')) track('screenshot_open');
    else if (el?.closest('a[href^="mailto:"]')) track('contact_click');
  });
  document.querySelectorAll('#faq details').forEach(details => details.addEventListener('toggle', () => { if (details.open) track('faq_open'); }));
  window.KOVA_ANALYTICS = Object.freeze({track, isEnabled:eligible});
  translate();
  if (consent === 'analytics') start(); else { window['ga-disable-' + ID] = true; clearAnalyticsCookies(); }
  // Privacy information must remain readable before any choice is made.
  if (!['analytics','essential'].includes(consent) && !['privacy.html','terms.html','cookies.html'].includes(page)) open();
  if (new URLSearchParams(location.search).get('cookies') === 'settings') {
    open(true);
    const url = new URL(location.href); url.searchParams.delete('cookies'); history.replaceState(null, '', url);
  }
})();
