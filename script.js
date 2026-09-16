const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const modal = document.querySelector('[data-modal]');
const videoButton = document.querySelector('[data-video]');
const closeButtons = document.querySelectorAll('[data-close-modal]');
const languageSwitcher = document.querySelector('.language-switcher');
const languageButton = languageSwitcher?.querySelector('.language');
const languageMenu = languageSwitcher?.querySelector('.language-menu');
const languageLabel = languageSwitcher?.querySelector('[data-language-label]');
const addGoalButton = document.querySelector('[data-add-goal]');
const originalMarkup = new Map();
const originalPageTitle = document.title;
const privacyPage = document.body.classList.contains('legal-page') && originalPageTitle.startsWith('Privacy');
const roadmapPage = document.body.classList.contains('roadmap-page');
const notFoundPage = document.body.classList.contains('not-found-page');
const infoPage = document.body.classList.contains('info-page');
const infoPageType = document.body.dataset.infoPage;
const languageCatalog = window.KOVA_LANGUAGES || {};
const cookieCatalog = window.KOVA_COOKIES || {};
const siteConfig = window.KOVA_CONFIG || {};
let currentLanguage = 'EN';
let activeRoadmapFilter = 'all';
let cookieUi = null;

function loadDemoVideo() {
  const frame = modal?.querySelector('.video-placeholder');
  const videoUrl = siteConfig.demoVideoUrl;
  if (!frame || !videoUrl || frame.querySelector('video')) return;
  frame.innerHTML = `<video controls playsinline preload="metadata" src="${videoUrl}" aria-label="KOVA product demo"></video>`;
  frame.classList.add('has-video');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  const copy = mergeCopy(languageCatalog.EN, languageCatalog[currentLanguage]);
  menuToggle.setAttribute('aria-label', isOpen ? (copy.accessibility?.closeMenu || 'Close menu') : (copy.accessibility?.openMenu || 'Open menu'));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    const copy = mergeCopy(languageCatalog.EN, languageCatalog[currentLanguage]);
    menuToggle?.setAttribute('aria-label', copy.accessibility?.openMenu || 'Open menu');
  });
});

function setModal(open) {
  if (!modal) return;
  modal.classList.toggle('is-open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

videoButton?.addEventListener('click', () => { loadDemoVideo(); setModal(true); });
closeButtons.forEach((button) => button.addEventListener('click', () => setModal(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) setModal(false);
});

function remember(element) {
  if (element && !originalMarkup.has(element)) originalMarkup.set(element, element.innerHTML);
}

function setPlain(selector, value) {
  const element = document.querySelector(selector);
  if (!element || value === undefined) return;
  remember(element);
  element.textContent = value;
}

function setPlainAll(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values?.[index] === undefined) return;
    remember(element);
    element.textContent = values[index];
  });
}

function setMarkup(selector, value) {
  const element = document.querySelector(selector);
  if (!element || value === undefined) return;
  remember(element);
  element.innerHTML = value;
}

function setMarkupAll(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values?.[index] === undefined) return;
    remember(element);
    element.innerHTML = values[index];
  });
}

function setLabel(selector, value) {
  const element = document.querySelector(selector);
  if (!element || value === undefined) return;
  remember(element);
  const directText = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
  if (directText) directText.nodeValue = ` ${value} `;
  else element.textContent = value;
}

function setLabelAll(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values?.[index] === undefined) return;
    remember(element);
    const directText = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (directText) directText.nodeValue = ` ${values[index]} `;
    else element.textContent = values[index];
  });
}

function setAttribute(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined) element.setAttribute(attribute, value);
}

function restoreEnglish() {
  originalMarkup.forEach((markup, element) => { element.innerHTML = markup; });
  originalMarkup.clear();
}

function readCookie(name) {
  const prefix = `${name}=`;
  return document.cookie.split('; ').find((cookie) => cookie.startsWith(prefix))?.slice(prefix.length) || '';
}

function writeCookie(name, value, maxAge = 31536000) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

function removeCookie(name) {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function analyticsEnabled() {
  return readCookie('kova_cookie_consent') === 'analytics';
}

function getAnalyticsId() {
  const existing = readCookie('kova_analytics_id');
  if (existing) return existing;
  const id = globalThis.crypto?.randomUUID?.() || `kova-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  writeCookie('kova_analytics_id', id);
  return id;
}

function trackAnalytics(eventName, details = {}) {
  if (!analyticsEnabled()) return false;
  const pageViews = Number(readCookie('kova_page_views') || 0) + (eventName === 'page_view' ? 1 : 0);
  if (eventName === 'page_view') writeCookie('kova_page_views', String(pageViews));
  writeCookie('kova_analytics', 'enabled');
  writeCookie('kova_analytics_last_page', `${location.pathname}${location.hash}`);
  const event = { name: eventName, page: `${location.pathname}${location.hash}`, language: currentLanguage, anonymousId: getAnalyticsId(), timestamp: new Date().toISOString(), ...details };
  window.dispatchEvent(new CustomEvent('kova:analytics', { detail: event }));
  const analyticsEndpoint = siteConfig.analyticsEndpoint || window.KOVA_ANALYTICS_ENDPOINT;
  if (analyticsEndpoint && navigator.sendBeacon) {
    navigator.sendBeacon(analyticsEndpoint, JSON.stringify(event));
  }
  return true;
}

window.KOVA_ANALYTICS = { track: trackAnalytics, isEnabled: analyticsEnabled };

function cookieCopy() {
  return cookieCatalog[currentLanguage] || cookieCatalog.EN || {};
}

function updateCookieUI() {
  if (!cookieUi) return;
  const copy = cookieCopy();
  cookieUi.title.textContent = copy.title;
  cookieUi.copy.textContent = copy.copy;
  cookieUi.allow.textContent = copy.allow;
  cookieUi.essential.textContent = copy.essential;
  cookieUi.settings.textContent = copy.settings;
  cookieUi.settingsTitle.textContent = copy.settingsTitle;
  cookieUi.essentialLabel.textContent = copy.essentialLabel;
  cookieUi.essentialCopy.textContent = copy.essentialCopy;
  cookieUi.analyticsLabel.textContent = copy.analyticsLabel;
  cookieUi.analyticsCopy.textContent = copy.analyticsCopy;
  cookieUi.save.textContent = copy.save;
  cookieUi.close.setAttribute('aria-label', copy.close);
  cookieUi.footerTrigger.textContent = copy.settings;
}

function setCookieBannerOpen(open, preferences = false) {
  if (!cookieUi) return;
  cookieUi.root.hidden = !open;
  cookieUi.root.classList.toggle('is-visible', open);
  cookieUi.preferences.hidden = !preferences;
  cookieUi.settingsPanelButton.setAttribute('aria-expanded', String(preferences));
}

function chooseAnalytics() {
  writeCookie('kova_cookie_consent', 'analytics');
  writeCookie('kova_analytics', 'enabled');
  getAnalyticsId();
  trackAnalytics('page_view');
  setCookieBannerOpen(false);
}

function chooseEssential() {
  writeCookie('kova_cookie_consent', 'essential');
  removeCookie('kova_analytics');
  removeCookie('kova_analytics_id');
  removeCookie('kova_page_views');
  removeCookie('kova_analytics_last_page');
  setCookieBannerOpen(false);
}

function setupCookieConsent() {
  const root = document.createElement('aside');
  root.className = 'cookie-consent';
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-labelledby', 'cookie-consent-title');
  root.innerHTML = `<div class="cookie-consent-inner"><div class="cookie-copy-wrap"><span class="cookie-icon" aria-hidden="true">◉</span><div><h2 id="cookie-consent-title"></h2><p data-cookie-copy></p></div></div><div class="cookie-actions"><button class="button button-gold" type="button" data-cookie-allow></button><button class="button cookie-essential" type="button" data-cookie-essential></button><button class="cookie-settings-link" type="button" data-cookie-settings></button></div><div class="cookie-preferences" hidden><div class="cookie-preferences-head"><h3 data-cookie-settings-title></h3><button type="button" class="cookie-close" data-cookie-close aria-label="Close">×</button></div><label class="cookie-option"><input type="checkbox" checked disabled /><span><strong data-cookie-essential-label></strong><small data-cookie-essential-copy></small></span></label><label class="cookie-option"><input type="checkbox" data-cookie-analytics-toggle /><span><strong data-cookie-analytics-label></strong><small data-cookie-analytics-copy></small></span></label><button class="button button-gold cookie-save" type="button" data-cookie-save></button></div></div>`;
  document.body.append(root);

  const footerGrid = document.querySelector('.site-footer .footer-grid');
  const footerTrigger = document.createElement('button');
  footerTrigger.className = 'cookie-settings-trigger';
  footerTrigger.type = 'button';
  footerGrid?.append(footerTrigger);

  cookieUi = {
    root,
    title: root.querySelector('#cookie-consent-title'),
    copy: root.querySelector('[data-cookie-copy]'),
    allow: root.querySelector('[data-cookie-allow]'),
    essential: root.querySelector('[data-cookie-essential]'),
    settings: root.querySelector('[data-cookie-settings]'),
    preferences: root.querySelector('.cookie-preferences'),
    settingsPanelButton: root.querySelector('[data-cookie-settings]'),
    settingsTitle: root.querySelector('[data-cookie-settings-title]'),
    essentialLabel: root.querySelector('[data-cookie-essential-label]'),
    essentialCopy: root.querySelector('[data-cookie-essential-copy]'),
    analyticsLabel: root.querySelector('[data-cookie-analytics-label]'),
    analyticsCopy: root.querySelector('[data-cookie-analytics-copy]'),
    analyticsToggle: root.querySelector('[data-cookie-analytics-toggle]'),
    save: root.querySelector('[data-cookie-save]'),
    close: root.querySelector('[data-cookie-close]'),
    footerTrigger
  };
  updateCookieUI();
  cookieUi.allow.addEventListener('click', chooseAnalytics);
  cookieUi.essential.addEventListener('click', chooseEssential);
  cookieUi.settings.addEventListener('click', () => setCookieBannerOpen(true, true));
  cookieUi.close.addEventListener('click', () => setCookieBannerOpen(false));
  cookieUi.save.addEventListener('click', () => cookieUi.analyticsToggle.checked ? chooseAnalytics() : chooseEssential());
  footerTrigger.addEventListener('click', () => setCookieBannerOpen(true, true));

  const consent = readCookie('kova_cookie_consent');
  if (consent === 'analytics') trackAnalytics('page_view');
  else if (!consent) setCookieBannerOpen(true);
}

function mergeCopy(base, override) {
  if (Array.isArray(base)) return override ?? base;
  if (!base || typeof base !== 'object') return override ?? base;
  const result = { ...base };
  Object.entries(override || {}).forEach(([key, value]) => {
    result[key] = value && typeof value === 'object' && !Array.isArray(value)
      ? mergeCopy(base[key], value)
      : value;
  });
  return result;
}

function applyIndexCopy(copy) {
  setPlainAll('.main-nav a', copy.nav);
  setPlainAll('.footer-nav a', copy.footerNav);
  setPlain('.hero .eyebrow', copy.hero.eyebrow);
  setPlain('[data-hero-title="line-one"]', copy.hero.lineOne);
  setPlain('[data-hero-title="line-two"]', copy.hero.lineTwo);
  setPlain('.hero-lede', copy.hero.lede);
  setLabel('header .nav-actions .button', copy.download);
  setLabel('.hero-buttons .button-gold', copy.play);
  setLabel('.hero-buttons .button-ghost', copy.watch);
  setLabel('.roadmap .button-gold', copy.play);

  copy.trust.forEach((item, index) => {
    setPlain(`.trust-point:nth-child(${index + 1}) strong`, item[0]);
    setPlain(`.trust-point:nth-child(${index + 1}) small`, item[1]);
  });
  copy.categories.forEach((item, index) => {
    setPlain(`.category-card:nth-child(${index + 1}) strong`, item[0]);
    setPlain(`.category-card:nth-child(${index + 1}) small`, item[1]);
  });

  setPlain('.clarity .eyebrow', copy.clarity.eyebrow);
  setPlain('.clarity h2', copy.clarity.title);
  setPlain('.clarity .section-copy>p:not(.eyebrow)', copy.clarity.copy);
  setPlainAll('.check-list li', copy.clarity.checklist);
  setLabel('.clarity .button-dark', copy.clarity.button);

  setPlain('.site-header .brand small', copy.footerTagline);
  setAttribute('.hero-devices', 'alt', copy.alt?.devices || 'KOVA app screens and assistant robot');
  setAttribute('.ai-mascot img', 'alt', copy.alt?.mascot || 'KOVA AI robot');
  setAttribute('.hero-art-image', 'aria-label', copy.alt?.landscape || 'Warm mountain landscape');
  setPlain('.phone-expenses .phone-top b', copy.phones.titles[0]);
  setPlain('.phone-calendar .phone-top b', copy.phones.titles[1]);
  setPlain('.phone-goals .phone-top b', copy.phones.titles[2]);
  setPlainAll('.phone-tabs span', copy.phones.tabs.slice(1));
  setPlain('.phone-tabs b', copy.phones.tabs[0]);
  setPlain('.phone-expenses .donut small', copy.phones.donut);
  setLabelAll('.phone-expenses .legend span', copy.phones.legend);
  setPlain('.month-title', copy.phones.month);
  setPlainAll('.week span', copy.phones.week);
  setLabelAll('.phone-calendar .calendar-list span', copy.phones.events);
  setPlain('.goal-tabs b', copy.phones.goalTabs[0]);
  setPlain('.goal-tabs span', copy.phones.goalTabs[1]);
  setPlainAll('.phone-goals .goal-item:not(.goal-item-new) b', copy.phones.goals);
  setLabel('.add-goal', copy.phones.add);
  setPlainAll('.phone-story>strong', copy.phones.storyTitles);
  setPlainAll('.phone-story>small', copy.phones.storyCopies);

  setMarkup('.ai-banner .chat-bubble', `${copy.ai.chat}<span class="chat-dots">•••</span>`);
  setPlain('.ai-copy h2', copy.ai.title);
  setPlain('.ai-subtitle', copy.ai.subtitle);
  setPlain('.ai-copy>p:last-child', copy.ai.copy);
  copy.ai.benefits.forEach((item, index) => {
    setLabel(`.ai-benefits>div:nth-child(${index + 1}) b`, item[0]);
    setPlain(`.ai-benefits>div:nth-child(${index + 1}) small`, item[1]);
  });

  setPlain('.security-section h2', copy.security.title);
  setPlain('.security-section .section-copy>p:not(.eyebrow)', copy.security.copy);
  setLabel('.security-section .button-dark', copy.securityLink);
  copy.security.cards.forEach((item, index) => {
    setPlain(`.security-card:nth-child(${index + 1}) strong`, item[0]);
    setPlain(`.security-card:nth-child(${index + 1}) small`, item[1]);
  });

  setPlain('.blog-section .eyebrow', copy.blog.eyebrow);
  setPlain('.blog-heading h2', copy.blog.title);
  setLabel('.text-link', copy.blog.suggest);
  setPlainAll('.blog-tag', copy.blog.tags);
  setPlainAll('.blog-card h3', copy.blog.titles);
  setPlainAll('.blog-card p', copy.blog.copies);
  setLabelAll('.blog-card>a', [copy.blog.link, copy.blog.link, copy.blog.link]);

  setPlain('.roadmap .eyebrow', copy.roadmap.eyebrow);
  setPlain('.roadmap h2', copy.roadmap.title);
  setPlain('.roadmap p:not(.eyebrow):not(.roadmap-note)', copy.roadmap.copy);
  setMarkup('.roadmap-note', copy.roadmap.note);

  setPlain('.faq-inner .eyebrow', copy.faq.eyebrow);
  setPlain('.faq-inner h2', copy.faq.title);
  setPlainAll('.faq-list summary', copy.faq.questions);
  setPlainAll('.faq-list details p', copy.faq.answers);
  setPlain('.site-footer .brand small', copy.footerTagline);
  setMarkup('.copyright', copy.copyright || '© 2026 KOVA.<br />All rights reserved.');
  setPlain('.modal-card h2', copy.modal.title);
  setPlain('.modal-card p', copy.modal.copy);
  setAttribute('.modal-close', 'aria-label', copy.modal.close || 'Close video');
}

function updateRoadmapFilter(filter, copyOverride) {
  if (!roadmapPage) return;
  activeRoadmapFilter = filter;
  const copy = copyOverride || mergeCopy(languageCatalog.EN, languageCatalog[currentLanguage]);
  let visibleCount = 0;
  document.querySelectorAll('.roadmap-item').forEach((item) => {
    const visible = filter === 'all' || item.dataset.status === filter;
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  const result = filter === 'all' ? copy.roadmapPage.resultAll : copy.roadmapPage.resultFiltered.replace('{count}', String(visibleCount));
  setPlain('[data-roadmap-result]', result);
  document.querySelectorAll('.roadmap-filter').forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function applyRoadmapCopy(copy) {
  const page = copy.roadmapPage;
  setPlainAll('.main-nav a', copy.nav);
  setPlainAll('.footer-nav a', copy.footerNav);
  setLabel('.roadmap-header .nav-actions .button', copy.download);
  setPlain('.site-header .brand small', copy.footerTagline);
  setPlain('.site-footer .brand small', copy.footerTagline);
  setMarkup('.copyright', copy.copyright || '© 2026 KOVA.<br />All rights reserved.');
  setPlain('[data-roadmap-back]', page.back);
  setPlain('[data-roadmap-eyebrow]', page.eyebrow);
  setPlain('[data-roadmap-title]', page.title);
  setPlain('[data-roadmap-lede]', page.lede);
  setPlain('[data-roadmap-updated]', page.updated);
  setPlain('[data-roadmap-live]', page.live);
  setPlain('[data-roadmap-board-eyebrow]', page.boardEyebrow);
  setPlain('[data-roadmap-board-title]', page.boardTitle);
  setPlainAll('.roadmap-filter', page.filters);
  page.items.forEach((item, index) => {
    const itemSelector = `.roadmap-item:nth-child(${index + 1})`;
    setPlain(`${itemSelector} .roadmap-quarter`, item.quarter);
    setPlain(`${itemSelector} h3`, item.title);
    setPlain(`${itemSelector} .roadmap-card>p`, item.copy);
    setPlainAll(`${itemSelector} li`, item.bullets);
    setPlain(`${itemSelector} .roadmap-status`, page.statuses[item.status]);
    setPlain(`${itemSelector} .roadmap-progress>div:first-child span`, page.progress);
  });
  setPlain('[data-roadmap-principles-eyebrow]', page.principlesEyebrow);
  setPlain('[data-roadmap-principles-title]', page.principlesTitle);
  setPlainAll('.principle-grid h3', page.principles.map((item) => item[0]));
  setPlainAll('.principle-grid p', page.principles.map((item) => item[1]));
  setPlain('[data-roadmap-feedback-eyebrow]', page.feedbackEyebrow);
  setPlain('[data-roadmap-feedback-title]', page.feedbackTitle);
  setPlain('[data-roadmap-feedback-copy]', page.feedbackCopy);
  setPlain('[data-roadmap-feedback-button]', page.feedbackButton);
  updateRoadmapFilter(activeRoadmapFilter, copy);
}

function applyLegalCopy(copy) {
  const legal = privacyPage ? copy.legal.privacy : copy.legal.terms;
  setPlainAll('.main-nav a', copy.nav);
  setPlainAll('.footer-nav a', copy.footerNav);
  setLabel('.legal-header .nav-actions .button', copy.download);
  setPlain('.legal-hero .eyebrow', copy.legal.eyebrow || 'KOVA legal');
  setPlain('.legal-hero h1', legal.title);
  setPlain('.legal-hero-inner>p:not(.eyebrow)', legal.description);
  setPlain('.legal-updated', copy.legal.updated || 'Last updated: September 15, 2026');
  setPlainAll('.policy-nav a', legal.nav);
  setPlainAll('.policy-card h2', legal.headings);
  if (legal.paragraphs) setMarkupAll('.policy-card p', legal.paragraphs);
  setPlain('.site-footer .brand small', copy.footerTagline);
  setMarkup('.copyright', copy.copyright || '© 2026 KOVA.<br />All rights reserved.');
}

function applyNotFoundCopy(copy) {
  setLabel('.not-found-header .button', copy.notFound.home);
  setPlainAll('.footer-nav a', copy.footerNav);
  setPlain('.not-found-inner [data-not-found-eyebrow]', copy.notFound.eyebrow);
  setPlain('.not-found-inner [data-not-found-title]', copy.notFound.title);
  setPlain('.not-found-inner [data-not-found-copy]', copy.notFound.copy);
  setLabel('[data-not-found-home]', copy.notFound.home);
  setLabel('[data-not-found-roadmap]', copy.notFound.roadmap);
  setPlain('.site-footer .brand small', copy.footerTagline);
  setMarkup('.copyright', copy.copyright || '© 2026 KOVA.<br />All rights reserved.');
}

function applyInfoCopy(copy) {
  const page = copy.info?.[infoPageType];
  if (!page) return;
  setPlainAll('.main-nav a', copy.nav);
  setPlainAll('.footer-nav a', copy.footerNav);
  setLabel('.info-header .nav-actions .button', copy.download);
  setPlain('.site-header .brand small', copy.footerTagline);
  setPlain('.info-hero [data-info-back]', page.back);
  setPlain('.info-hero [data-info-eyebrow]', page.eyebrow);
  setPlain('.info-hero [data-info-title]', page.title);
  setPlain('.info-hero [data-info-lede]', page.lede);
  page.sections.forEach((section, index) => {
    const selector = `.info-card:nth-child(${index + 1})`;
    setPlain(`${selector} h2`, section[0]);
    setPlain(`${selector} p`, section[1]);
  });
  setLabel('.info-cta', page.cta);
  if (infoPageType === 'contact' && copy.contactForm) {
    const form = copy.contactForm;
    setPlain('[for="contact-name"]', form.name);
    setPlain('[for="contact-email"]', form.email);
    setPlain('[for="contact-topic"]', form.topic);
    setPlain('[for="contact-message"]', form.message);
    setPlainAll('#contact-topic option', [form.topicPlaceholder, ...form.topics]);
    setLabel('[data-contact-submit]', form.submit);
    setPlain('[data-contact-hint]', form.hint);
  }
  setPlain('.site-footer .brand small', copy.footerTagline);
  setMarkup('.copyright', copy.copyright || '© 2026 KOVA.<br />All rights reserved.');
}

function ensureFooterUtilityLinks() {
  const footerGrid = document.querySelector('.site-footer .footer-grid');
  if (!footerGrid || footerGrid.querySelector('.footer-utility')) return footerGrid?.querySelector('.footer-utility') || null;
  const nav = document.createElement('nav');
  nav.className = 'footer-utility';
  nav.setAttribute('aria-label', 'Additional links');
  nav.innerHTML = '<a href="security.html" data-utility-link="security">Security</a><a href="cookies.html" data-utility-link="cookies">Cookies</a><a href="contact.html" data-utility-link="contact">Contact</a><a href="updates.html" data-utility-link="updates">Updates</a><a href="status.html" data-utility-link="status">Status</a>';
  footerGrid.append(nav);
  return nav;
}

function applyUtilityCopy(copy) {
  setPlainAll('.footer-utility a', copy.utility);
}

function applyAccessibilityCopy(copy) {
  const accessibility = copy.accessibility || {};
  setAttribute('.menu-toggle', 'aria-label', accessibility.openMenu || 'Open menu');
  setAttribute('.language', 'aria-label', accessibility.changeLanguage || 'Change language');
  setAttribute('.main-nav', 'aria-label', accessibility.primaryNav || 'Primary navigation');
  setAttribute('.footer-utility', 'aria-label', accessibility.additionalLinks || 'Additional links');
  setAttribute('.socials', 'aria-label', accessibility.socialLinks || 'Social links');
  setPlain('.skip-link', accessibility.skipToContent || 'Skip to content');
}

function applyConfiguredLinks() {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && siteConfig.siteOrigin) {
    const page = location.pathname.split('/').pop() || '';
    canonical.href = `${siteConfig.siteOrigin.replace(/\/$/, '')}/${page}`;
  }
  if (siteConfig.androidStoreUrl) {
    document.querySelectorAll('a[href="https://play.google.com/store/apps"]').forEach((link) => {
      link.href = siteConfig.androidStoreUrl;
    });
  }
  const socialSelectors = { Discord: 'discord', Youtube: 'youtube', X: 'x', Instagram: 'instagram', LinkedIn: 'linkedin' };
  Object.entries(socialSelectors).forEach(([label, key]) => {
    const url = siteConfig.socialLinks?.[key];
    if (!url) return;
    document.querySelectorAll(`.socials a[aria-label="${label}"]`).forEach((link) => { link.href = url; });
  });
}

function setLanguage(language) {
  const normalized = languageCatalog[language] ? language : 'EN';
  const copy = mergeCopy(languageCatalog.EN, languageCatalog[normalized]);
  restoreEnglish();
  if (normalized !== 'EN') {
    if (document.body.classList.contains('legal-page')) applyLegalCopy(copy);
    else if (roadmapPage) applyRoadmapCopy(copy);
    else if (notFoundPage) applyNotFoundCopy(copy);
    else if (infoPage) applyInfoCopy(copy);
    else applyIndexCopy(copy);
  } else if (roadmapPage) {
    updateRoadmapFilter('all', copy);
  }
  applyUtilityCopy(copy);
  applyAccessibilityCopy(copy);
  document.documentElement.lang = copy.htmlLang;
  document.documentElement.dir = copy.dir || 'ltr';
  document.title = normalized === 'EN' ? originalPageTitle : (document.body.classList.contains('legal-page') ? `${privacyPage ? copy.legal.privacy.title : copy.legal.terms.title} — KOVA` : (roadmapPage ? `${copy.roadmapPage.title} — KOVA` : (notFoundPage ? `${copy.notFound.title} — KOVA` : (infoPage ? `${copy.info[infoPageType].title} — KOVA` : copy.title))));
  currentLanguage = normalized;
  if (languageLabel) languageLabel.textContent = copy.short;
  languageMenu?.querySelectorAll('[data-language]').forEach((option) => {
    option.setAttribute('aria-selected', String(option.dataset.language === normalized));
  });
  updateCookieUI();
}

if (languageButton && languageMenu) {
  languageButton.addEventListener('click', () => {
    const isOpen = !languageMenu.hidden;
    languageMenu.hidden = isOpen;
    languageButton.setAttribute('aria-expanded', String(!isOpen));
  });
  languageMenu.querySelectorAll('[data-language]').forEach((option) => {
    option.addEventListener('click', () => {
      setLanguage(option.dataset.language);
      languageMenu.hidden = true;
      languageButton.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (event) => {
    if (!languageSwitcher.contains(event.target)) {
      languageMenu.hidden = true;
      languageButton.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('.roadmap-filter').forEach((button) => {
  button.addEventListener('click', () => updateRoadmapFilter(button.dataset.filter));
});

addGoalButton?.addEventListener('click', () => {
  if (addGoalButton.dataset.added) return;
  const copy = mergeCopy(languageCatalog.EN, languageCatalog[currentLanguage]);
  const phoneCopy = copy.phones || {};
  const newGoal = document.createElement('div');
  newGoal.className = 'goal-item goal-item-new';
  newGoal.innerHTML = `<i class="goal-ring ring-cyan">+</i><span><b>${phoneCopy.newGoal || 'New goal'}</b><small>0 / 1 000 zł</small></span><strong>0%</strong>`;
  addGoalButton.closest('.phone-screen')?.insertBefore(newGoal, addGoalButton);
  addGoalButton.dataset.added = 'true';
  addGoalButton.textContent = phoneCopy.goalAdded || '✓ Goal added';
  addGoalButton.setAttribute('aria-pressed', 'true');
});

const contactForm = document.querySelector('[data-contact-form]');
const contactStatus = contactForm?.querySelector('[data-contact-status]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const copy = mergeCopy(languageCatalog.EN, languageCatalog[currentLanguage]);
  const formCopy = copy.contactForm || {};
  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const topic = String(data.get('topic') || '').trim();
  const message = String(data.get('message') || '').trim();
  const honeypot = String(data.get('company') || '').trim();
  if (honeypot) {
    if (contactStatus) contactStatus.textContent = formCopy.spam;
    return;
  }
  if (!name || !topic || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    contactForm.classList.add('has-error');
    if (contactStatus) contactStatus.textContent = formCopy.invalid;
    contactForm.reportValidity?.();
    return;
  }
  contactForm.classList.remove('has-error');
  if (contactStatus) contactStatus.textContent = formCopy.success;
  trackAnalytics('contact_form_submit', { topic });
  const supportEmail = window.KOVA_CONFIG?.supportEmail || 'hello@kova.app';
  const subject = encodeURIComponent(`KOVA — ${topic}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
  window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
});

const languageAliases = [
  ['pl', 'PL'], ['es', 'ES'], ['de', 'DE'], ['fr', 'FR'], ['pt', 'PT'], ['it', 'IT'], ['nl', 'NL'],
  ['uk', 'UK'], ['ru', 'RU'], ['tr', 'TR'], ['zh', 'ZH'], ['ja', 'JA'], ['ko', 'KO'], ['ar', 'AR'],
  ['hi', 'HI'], ['id', 'ID'], ['en', 'EN']
];
const systemLocales = [...(navigator.languages || []), navigator.language].filter(Boolean).map((locale) => locale.toLowerCase());
const detectedLanguage = languageAliases.find(([prefix]) => systemLocales.some((locale) => locale === prefix || locale.startsWith(`${prefix}-`)))?.[1] || 'EN';
applyConfiguredLinks();
ensureFooterUtilityLinks();
setLanguage(detectedLanguage);
setupCookieConsent();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
}
