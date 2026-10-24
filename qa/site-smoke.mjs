import { spawn } from 'node:child_process';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const locales=Object.keys(JSON.parse(await readFile(new URL('../language-registry.json',import.meta.url),'utf8')));
const localeFromUrl=url=>locales.find(l=>l!=='pl'&&new URL(url).pathname.endsWith('-'+l+'.html')) || null;

const edge = process.env.KOVA_EDGE || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const origin = process.argv[2] || 'http://127.0.0.1:4173/';
const output = process.argv[3] || join(tmpdir(), 'kova-website-mobile.png');
const viewportWidth = Number(process.argv[4] || 390);
const viewportHeight = Number(process.argv[5] || 844);
const previewMode = process.argv[6] || '';
const profile = await mkdtemp(join(tmpdir(), 'kova-site-cdp-'));

const browser = spawn(edge, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
let closeBrowser;
try {
  let port;
  for (let attempt = 0; attempt < 50 && !port; attempt += 1) {
    try { port = Number((await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split(/\r?\n/)[0]); }
    catch { await delay(100); }
  }
  if (!port) throw new Error('Edge DevTools port was not created');
  let targets;
  for (let attempt = 0; attempt < 50 && !targets; attempt += 1) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); }
    catch { await delay(100); }
  }
  if (!targets) throw new Error('Edge DevTools did not become ready');
  const target = targets.find(item => item.type === 'page');
  if (!target) throw new Error('No page target returned by Edge');

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let nextId = 1;
  const waiting = new Map();
  const runtimeErrors = [];
  const unexpectedRequests = [];
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Network.requestWillBeSent' && /^https?:/.test(message.params.request.url) && new URL(message.params.request.url).origin !== new URL(origin).origin) unexpectedRequests.push(message.params.request.url);
    if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text + ': ' + (message.params.exceptionDetails.exception?.description || ''));
    if (message.id && waiting.has(message.id)) {
      const { resolve, reject } = waiting.get(message.id);
      waiting.delete(message.id);
      message.error ? reject(new Error(message.error.message)) : resolve(message.result);
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    waiting.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  closeBrowser = () => send('Browser.close');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Page.addScriptToEvaluateOnNewDocument',{source:`
    window.__languageWrites=[];
    const descriptor=Object.getOwnPropertyDescriptor(HTMLElement.prototype,'lang');
    Object.defineProperty(HTMLElement.prototype,'lang',{...descriptor,set(value){
      if(this===document.documentElement) window.__languageWrites.push({value,at:performance.now(),stack:new Error().stack});
      descriptor.set.call(this,value);
    }});
  `});
  if (previewMode === 'resilience') {
    await send('Network.enable');
    await send('Network.setCookie',{name:'kova_cookie_consent',value:'%',url:origin});
    await send('Page.addScriptToEvaluateOnNewDocument',{source:"Storage.prototype.getItem=function(){throw new Error('storage disabled')}; Storage.prototype.setItem=function(){throw new Error('storage disabled')};"});
  }
  await send('Emulation.setDeviceMetricsOverride', { width: viewportWidth, height: viewportHeight, deviceScaleFactor: 1, mobile: viewportWidth < 700 });
  await send('Page.navigate', { url: origin });
  await delay(5000);

  // Native browser keyboard events verify focus and activation, not just value assignment.
  const key = async (key,code,vk) => {
    await send('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:vk});
    await send('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:vk});
  };
  const evaluate = async expression => {
    const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);
    return r.result.value;
  };
  const seoProbe = `(() => {
    const node=document.getElementById('kova-seo-data');
    if(!node)return {present:false};
    const data=JSON.parse(node.textContent),lang=document.documentElement.lang,expected=data.locales[lang];
    return {present:true,lang,page:data.page,
      valid: window.KOVA_ROUTES.parse()?.language===lang
        && document.title===expected.title
        && document.querySelector('meta[name="description"]').content===expected.description
        && document.querySelector('meta[property="og:url"]').content===expected.canonical
        && document.querySelector('meta[name="twitter:title"]').content===expected.title
        && document.querySelector('meta[property="og:locale"]').content===expected.ogLocale
        && document.querySelector('meta[property="og:image:alt"]').content===expected.imageAlt
        && document.querySelector('meta[name="twitter:image:alt"]').content===expected.imageAlt
        && [...document.querySelectorAll('meta[property="og:locale:alternate"]')].map(n=>n.content).sort().join()===Object.entries(data.locales).filter(([code])=>code!==lang).map(([,m])=>m.ogLocale).sort().join()
        && (data.page==='404' ? !document.querySelector('link[rel="canonical"]') : document.querySelector('link[rel="canonical"]').href===expected.canonical)
        && JSON.parse(document.getElementById('kova-structured-data').textContent)['@graph'].some(n=>n.inLanguage===lang&&n.url===expected.canonical),
      canonical:document.querySelector('link[rel="canonical"]')?.href};
  })()`;
  const initialSeo = await evaluate(seoProbe);
  const publicDocumentProbe = `(() => {
    if (!document.body.dataset.legalDocument) return {applicable:false, valid:true};
    const page=document.body.dataset.legalDocument==='privacy-policy'?'privacy':'terms';
    const expected='https://kovacompass.app/'+page+'.html?lang=en';
    const links=['[data-legal-review]','[data-legal-content]'].map(selector=>document.querySelector(selector+' a[data-public-document-link]'));
    return {applicable:true, expected, valid:links.every(link=>link && link.href===expected && link.textContent===expected && link.target==='_blank' && link.rel.includes('noopener') && link.getBoundingClientRect().width>0), hrefs:links.map(link=>link?.href)};
  })()`;
  const initialPublicLinks = await evaluate(publicDocumentProbe);
  if (!initialPublicLinks.valid) throw new Error('Missing initial public legal links: '+JSON.stringify(initialPublicLinks));
  const expectedLanguage = new URL(origin).searchParams.get('lang') || localeFromUrl(origin) || await evaluate('window.KOVA_LANGUAGES?.browserLanguage() || "pl"');
  if (initialSeo.present && (!initialSeo.valid || initialSeo.lang!==expectedLanguage)) throw new Error('Initial localized SEO mismatch: '+JSON.stringify(initialSeo));
  // The shared native modal must be dismissed before testing background navigation.
  // Its focus trap, first-visit state and Google protocol are covered separately.
  await evaluate('document.querySelector("[data-cookie-banner][open] [data-cookie-essential]")?.click()');
  if (await evaluate('Boolean(document.querySelector(".language-trigger"))')) {
    await evaluate('document.querySelector(".language-trigger").focus()');
    await key('ArrowDown','ArrowDown',40);
    if (!await evaluate('document.querySelector(".language-trigger").ariaExpanded === "true" && document.activeElement.matches(".language-option")')) throw new Error('Language keyboard open/focus failed');
    await key('Home','Home',36); for(let i=0;i<locales.indexOf('en');i++) await key('ArrowDown','ArrowDown',40); await key('Enter','Enter',13);
    await delay(400);
    if (!await evaluate('document.documentElement.lang === "en" && document.querySelector(".language-trigger").ariaExpanded === "false" && document.activeElement.matches(".language-trigger") && new URL(location.href).searchParams.get("lang") === "en"')) throw new Error('Language keyboard selection/focus/URL failed: '+JSON.stringify(await evaluate('({lang:document.documentElement.lang,expanded:document.querySelector(".language-trigger").ariaExpanded,focus:document.activeElement.outerHTML,url:location.href,writes:window.__languageWrites})')));
    await key('ArrowDown','ArrowDown',40); await key('End','End',35); await key('Escape','Escape',27);
    if (!await evaluate('document.documentElement.lang === "en" && document.querySelector(".language-trigger").ariaExpanded === "false" && document.activeElement.matches(".language-trigger")')) throw new Error('Language Escape changed selection or lost focus');
    await key('ArrowDown','ArrowDown',40); await key(' ','Space',32);
    if (!await evaluate('document.documentElement.lang === "en" && document.querySelector(".language-trigger").ariaExpanded === "false" && document.activeElement.matches(".language-trigger")')) throw new Error('Language Space activation/focus failed');
    await key('ArrowDown','ArrowDown',40); await key('Tab','Tab',9);
    if (!await evaluate('document.querySelector(".language-trigger").ariaExpanded === "false" && !document.activeElement.matches(".language-option")')) throw new Error('Language Tab traps focus');
    // Restore the case language using the actual custom option.
    const initialLanguage = expectedLanguage;
    await evaluate(`document.querySelector('.language-trigger').click();document.querySelector('[data-language="${initialLanguage}"]').click()`);
    await delay(500);
  } else if (!origin.includes('workspace.html')) throw new Error('Custom language control missing');

  const evaluation = await send('Runtime.evaluate', {
    returnByValue: true,
    awaitPromise: true,
    expression: `(async () => {
      const workspace = Boolean(document.querySelector('[data-task-dialog]'));
      const landing = Boolean(document.querySelector('#site-language'));
      const legal = Boolean(document.querySelector('[data-document-language], [data-legal-language]'));
      const documentPage = Boolean(document.querySelector('.document-shell'));
      const projectPage = Boolean(document.querySelector('[data-project-language]'));
      const requestedLanguage = new URL(location.href).searchParams.get('lang') || 'pl';
      let faqWorks = true;
      let consentRevoked = true;
      let publicNavigation = true;
      let sharedFooter = true;
      let languageRaceSafe = true;
      let languagePickerWorks = true;
      let initialCards = 0;
      let dialogOpened = true;
      let taskCreated = true;
      let menuOpened = true;
      let lightboxOpened = true;
      let videoOpened = true;
        let tourNavigation = true;
      let languageChanged = true;
      let legalContentLoaded = true;
      let cookieShown = true;
      let cookieDismissed = true;
      let analyticsCookies = true;
      let analyticsAbsentBeforeConsent = true;
      let essentialOnlyWorks = true;
      let homeButtonPresent = true;
      if (workspace) {
        homeButtonPresent = Boolean(document.querySelector('.workspace-home-button[href="index.html"]'));
        const language = document.querySelector('#workspace-language');
        language.value = 'ru';
        language.dispatchEvent(new Event('change', { bubbles: true }));
        languageChanged = document.documentElement.lang === 'ru';
        localStorage.removeItem('kova_workspace_v1');
        initialCards = document.querySelectorAll('.task-card').length;
        document.querySelector('[data-open-task]').click();
        const dialog = document.querySelector('[data-task-dialog]');
        dialogOpened = dialog.open;
        const form = document.querySelector('[data-task-form]');
        form.elements.title.value = 'QA smoke task';
        form.elements.details.value = 'Created by local browser smoke test';
        form.requestSubmit();
        taskCreated = [...document.querySelectorAll('.task-card h4')].some(node => node.textContent === 'QA smoke task');
        localStorage.removeItem('kova_workspace_v1');
      } else if (landing) {
        const preview = ${JSON.stringify(previewMode)};
        const language = document.querySelector('#site-language');
        language.value = 'en';
        language.dispatchEvent(new Event('change', { bubbles: true }));
        await Promise.resolve();
        languageChanged = document.documentElement.lang === 'en' && document.querySelector('[data-header-key="features"]').textContent === 'Features';
        document.querySelector('[data-cookie-settings]').click();
        cookieShown = document.querySelector('[data-cookie-banner]')?.open === true;
        analyticsAbsentBeforeConsent = !document.cookie.includes('kova_analytics_id=') && !document.cookie.includes('kova_analytics_session=');
        {
          document.querySelector('[data-cookie-essential]').click();
          essentialOnlyWorks = document.cookie.includes('kova_cookie_consent_v2=essential') && !document.cookie.includes('_ga=') && !document.querySelector('[data-kova-google-tag]');
          document.querySelector('[data-cookie-settings]').click();
          document.querySelector('[data-cookie-analytics-toggle]').checked = true;
          document.querySelector('[data-cookie-save]').click();
          cookieDismissed = document.querySelector('[data-cookie-banner]')?.open === false && document.cookie.includes('kova_cookie_consent_v2=analytics');
          // Preview is intentionally excluded even when consent is granted.
          analyticsCookies = !document.cookie.includes('_ga=') && !document.querySelector('[data-kova-google-tag]');
          document.querySelector('[data-cookie-settings]').click();
          document.querySelector('[data-cookie-analytics-toggle]').checked = false;
          document.querySelector('[data-cookie-save]').click();
          consentRevoked = document.cookie.includes('kova_cookie_consent_v2=essential') && !document.cookie.includes('_ga=') && !window.KOVA_ANALYTICS.track('contact_click');
        }
        const faq = document.querySelector('#faq details');
        faq.querySelector('summary').click();
        faqWorks = faq.open && faq.querySelector('p').getBoundingClientRect().height > 0;
        faq.querySelector('summary').click();
        document.querySelector('[data-video-open]').click();
        const video = document.querySelector('[data-video-dialog]');
        const firstVideoImage = video.querySelector('[data-video-image]').getAttribute('src');
        const playIcon = video.querySelector('[data-video-play] use');
        tourNavigation = playIcon.getAttribute('href').endsWith('#play');
        video.querySelector('[data-video-next]').click();
        videoOpened = video.open && video.querySelector('[data-video-image]').getAttribute('src') !== firstVideoImage;
         const chapters = [...video.querySelectorAll('[data-video-chapter]')];
         const gallery = [...document.querySelectorAll('[data-screen-index]')];
         chapters.at(-1).click();
         tourNavigation = tourNavigation && chapters.length === gallery.length && chapters.length === 8
           && chapters.at(-1).getAttribute('aria-current') === 'step'
           && video.querySelector('[data-video-counter]').textContent === (chapters.length + ' / ' + chapters.length)
           && video.querySelector('[data-video-image]').getAttribute('src') === gallery.at(-1).querySelector('img').getAttribute('src');
         video.dispatchEvent(new KeyboardEvent('keydown', {key:'Home', bubbles:true}));
         tourNavigation = tourNavigation && video.querySelector('[data-video-image]').getAttribute('src') === firstVideoImage;
         video.dispatchEvent(new KeyboardEvent('keydown', {key:'End', bubbles:true}));
         tourNavigation = tourNavigation && chapters.at(-1).getAttribute('aria-current') === 'step';
         video.querySelector('[data-video-play]').click();
         tourNavigation = tourNavigation && video.querySelector('[data-video-image]').getAttribute('src') === firstVideoImage
           && playIcon.getAttribute('href').endsWith('#pause');
         if (preview === 'video' && innerWidth === 1440 && requestedLanguage === 'pl') {
           await new Promise(resolve => setTimeout(resolve, 7300));
           tourNavigation = tourNavigation && video.querySelector('[data-video-counter]').textContent === '2 / 8';
         }
         video.querySelector('[data-video-play]').click();
         tourNavigation = tourNavigation && playIcon.getAttribute('href').endsWith('#play');
        video.querySelector('[data-video-close]').click();
        const menu = document.querySelector('.menu-button');
        menu.click();
        menuOpened = document.querySelector('.main-nav').classList.contains('open') && menu.getAttribute('aria-expanded') === 'true';
        menu.click();
        document.querySelector('[data-lightbox]').click();
        const lightbox = document.querySelector('.lightbox');
        lightboxOpened = lightbox.open && Boolean(lightbox.querySelector('img').getAttribute('src'));
        lightbox.close();
        if (preview === 'video') document.querySelector('[data-video-open]').click();
        language.value = requestedLanguage;
        language.dispatchEvent(new Event('change', { bubbles: true }));
      } else if (legal) {
        legalContentLoaded = Boolean(document.querySelector('[data-legal-page-heading], [data-doc-lang]:not([hidden]) h1'));
        const language = document.querySelector('[data-document-language], [data-legal-language]');
        language.value = 'ru';
        language.dispatchEvent(new Event('change', { bubbles: true }));
        await new Promise(resolve => setTimeout(resolve, 900));
        languageChanged = document.documentElement.lang === 'ru';
        if (document.querySelector('[data-doc-lang="ru"]')) languageChanged = languageChanged && !document.querySelector('[data-doc-lang="ru"]').hidden && document.querySelector('[data-doc-lang="pl"]').hidden;
        // The canonical offline draft marks its H1, which the renderer moves to the page heading.
        if (document.querySelector('[data-legal-content]')) legalContentLoaded = document.querySelector('[data-legal-content]').getAttribute('aria-busy') === 'false' && document.querySelectorAll('[data-legal-content] h2').length >= 10 && /DRAFT|SZKIC|ЧЕРНОВИК/i.test(document.querySelector('[data-legal-page-heading]').textContent);
        if (document.querySelector('[data-legal-content]')) {
          const nativeFetch = window.fetch;
          window.fetch = async (...args) => { if (String(args[0]).includes('-pl.md')) await new Promise(resolve => setTimeout(resolve, 700)); return nativeFetch(...args); };
          language.value = 'pl'; language.dispatchEvent(new Event('change', { bubbles: true }));
          language.value = 'ru'; language.dispatchEvent(new Event('change', { bubbles: true }));
          await new Promise(resolve => setTimeout(resolve, 1300));
          languageRaceSafe = /[А-Яа-я]/.test(document.querySelector('[data-legal-page-heading]')?.textContent || '') && document.documentElement.lang === 'ru';
          window.fetch = nativeFetch;
        }
        language.value = requestedLanguage; language.dispatchEvent(new Event('change', { bubbles: true }));
        await new Promise(resolve => setTimeout(resolve, 900));
        const toc = document.querySelector('.legal-toc');
        if (toc) {
          toc.open = true;
          legalContentLoaded = legalContentLoaded && [...toc.querySelectorAll('a')].every(link =>
            link.innerText.trim() && document.getElementById(decodeURIComponent(link.hash.slice(1))));
          toc.open = false;
        }
      } else if (projectPage) {
        const language = document.querySelector('[data-project-language]');
        for (const lang of ['en','ru','pl']) {
          language.value = lang; language.dispatchEvent(new Event('change', { bubbles: true }));
          await new Promise(resolve => setTimeout(resolve, 30));
          languageChanged = languageChanged && document.documentElement.lang === lang && document.querySelector('h1').textContent === window.KOVA_PROJECT_PAGES[document.body.dataset.projectPage][lang].title;
        }
        language.value = requestedLanguage; language.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (documentPage) {
        const toggle = document.querySelector('.public-menu');
        toggle.click();
        publicNavigation = toggle.getAttribute('aria-expanded') === 'true' && document.querySelector('.public-nav').classList.contains('open');
        document.dispatchEvent(new KeyboardEvent('keydown', { key:'Escape', bubbles:true }));
        publicNavigation = publicNavigation && toggle.getAttribute('aria-expanded') === 'false';
      }
      if (!workspace) {
        await new Promise(resolve => setTimeout(resolve, 60));
        const picker = document.querySelector('.language-picker');
        const trigger = picker.querySelector('.language-trigger');
        trigger.click();
        languagePickerWorks = trigger.getAttribute('aria-expanded') === 'true' && !picker.querySelector('.language-options').hidden && picker.querySelectorAll('[role="option"]').length === window.KOVA_LANGUAGES.codes.length;
        const bounds = picker.querySelector('.language-options').getBoundingClientRect();
        languagePickerWorks = languagePickerWorks && bounds.left >= 0 && bounds.right <= innerWidth && bounds.bottom <= innerHeight;
        languagePickerWorks = languagePickerWorks && picker.querySelector('[aria-selected="true"]').dataset.language === document.documentElement.lang;
        document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));
        languagePickerWorks = languagePickerWorks && picker.querySelector('.language-options').hidden;
        languagePickerWorks = languagePickerWorks && getComputedStyle(picker.querySelector('select')).display === 'none';
        const footerLinks = [...document.querySelectorAll('.public-footer a[href]')];
        const route = link => window.KOVA_ROUTES?.parse(new URL(link.href).pathname);
        sharedFooter = ['contact','privacy'].every(page => footerLinks.some(link => window.KOVA_ROUTES ? route(link)?.page === page : new URL(link.href).pathname.endsWith('/'+page+'.html')));
        const languageLinks = footerLinks.filter(link => !link.hasAttribute('data-local-workspace') && new URL(link.href).origin === location.origin && (route(link) || link.getAttribute('href').includes('.html')));
        languageChanged = languageChanged && languageLinks.every(link => window.KOVA_ROUTES ? route(link)?.language === document.documentElement.lang : new URL(link.href).searchParams.get('lang') === document.documentElement.lang);
      }
      // Load lazy screenshots before testing the final layout and producing visual evidence.
      document.querySelectorAll('img[loading="lazy"]').forEach(image => { image.loading = 'eager'; });
      await Promise.all([...document.images].filter(image => image.getAttribute('src')).map(image => image.decode().catch(() => {})));
      if (${JSON.stringify(previewMode)} !== 'video') {
        document.activeElement?.blur(); window.scrollTo({top:0, behavior:'instant'});
      }
      if (${JSON.stringify(previewMode)} === 'language') document.querySelector('.language-trigger').click();
      return {
        workspace,
        landing,
        legal,
        documentPage,
        projectPage,
        faqWorks,
        consentRevoked,
        publicNavigation,
        sharedFooter,
        languageRaceSafe,
        languagePickerWorks,
        languageWrites: (window.__languageWrites || []).map(({value,at}) => ({value,at})),
        legalDiagnostics: [...document.querySelectorAll('.legal-toc a')].map(a => ({label:a.textContent,href:a.getAttribute('href'),target:Boolean(document.getElementById(decodeURIComponent(a.hash.slice(1))))})),
        settingsDeepLinkConsumed: !landing || new URL(location.href).searchParams.get('cookies') !== 'settings',
        // Chromium may retain layout boxes for content inside closed details.
        // TOC links are tested while expanded above; hidden links are not interactive.
        unnamedControls: [...document.querySelectorAll('a,button,summary')].filter(node => (!node.closest('details:not([open])') || node.tagName === 'SUMMARY') && node.getBoundingClientRect().width > 0 && !node.getAttribute('aria-label') && !node.innerText.trim() && !node.querySelector('img[alt]:not([alt=""])')).map(node => node.outerHTML.slice(0,220)),
        title: document.title,
        lang: document.documentElement.lang,
        viewport: { width: innerWidth, height: innerHeight },
        scrollY: Math.round(window.scrollY),
        layout: { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth },
        overflowElements: [...document.querySelectorAll('body *')].filter(node => { const rect = node.getBoundingClientRect(); return rect.right > innerWidth + 1 || rect.left < -1; }).slice(0, 12).map(node => ({ tag:node.tagName, className:node.className || '', text:(node.textContent || '').trim().slice(0, 80), left:Math.round(node.getBoundingClientRect().left), right:Math.round(node.getBoundingClientRect().right), scrollWidth:node.scrollWidth })),
        brokenImages: [...document.images].filter(image => image.getAttribute('src') && image.loading !== 'lazy' && image.complete && image.naturalWidth === 0).map(image => image.getAttribute('src')),
        missingLocalLinks: [...document.querySelectorAll('a[href]')].filter(link => !link.href || link.getAttribute('href') === '#').length,
        unresolvedLinks: [...document.querySelectorAll('a[href]')].filter(link => !link.href || link.getAttribute('href') === '#').map(link=>link.outerHTML),
        initialCards,
        dialogOpened,
        taskCreated,
        menuOpened,
        lightboxOpened,
        videoOpened,
          tourNavigation,
        tourControlsVisible: ${JSON.stringify(previewMode)} !== 'video' || [...document.querySelectorAll('.video-controls button')].every(button => {
          const rect = button.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= innerHeight && rect.left >= 0 && rect.right <= innerWidth;
        }),
        languageChanged,
        legalContentLoaded,
        cookieShown,
        cookieDismissed,
        analyticsCookies,
        analyticsAbsentBeforeConsent,
        essentialOnlyWorks,
        homeButtonPresent,
        renderedSvgIcons: [...document.querySelectorAll('svg use')].filter(node => node.parentElement.getBoundingClientRect().width > 0).length,
        visiblePrimaryAction: legal || documentPage || Boolean(document.querySelector('.hero-actions .button-gold, [data-open-task]')?.getBoundingClientRect().width > 0)
      };
    })()`,
  });
  await delay(250);
  let clip;
  if (previewMode === 'intro') {
    clip = await evaluate(`(() => { const node=document.getElementById('about'); node.scrollIntoView({behavior:'instant',block:'start'}); const r=node.getBoundingClientRect(); return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height,scale:1}; })()`);
  }
  if (previewMode === 'footer') await evaluate(`document.querySelector('.public-footer').scrollIntoView({behavior:'instant',block:'end'})`);
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: previewMode === 'full' || previewMode === 'intro', ...(clip ? {clip} : {}) });
  await writeFile(output, Buffer.from(screenshot.data, 'base64'));
  if (evaluation.exceptionDetails) throw new Error(evaluation.exceptionDetails.exception?.description || evaluation.exceptionDetails.text);
  const result = evaluation.result.value;
  const finalSeo = await evaluate(seoProbe);
  const finalPublicLinks = await evaluate(publicDocumentProbe);
  if (!finalPublicLinks.valid) throw new Error('Public legal links lost after language changes: '+JSON.stringify(finalPublicLinks));
  if (finalSeo.present && (!finalSeo.valid || finalSeo.lang!==expectedLanguage)) throw new Error('SEO after language switches mismatch: '+JSON.stringify(finalSeo));
  if (runtimeErrors.length) throw new Error(runtimeErrors.join('\n'));
  if (unexpectedRequests.length) throw new Error('Unexpected non-local website requests: '+JSON.stringify(unexpectedRequests));
  if (!result.languagePickerWorks) throw new Error('Language picker regression: '+JSON.stringify(result));
  if (!result.tourControlsVisible) throw new Error('Presentation controls clipped: '+JSON.stringify(result));
  if (result.missingLocalLinks) throw new Error('Unresolved page links: '+JSON.stringify(result));
  if (result.unnamedControls.length) throw new Error('Controls without an accessible name: ' + JSON.stringify(result.unnamedControls));
  if (!result.settingsDeepLinkConsumed) throw new Error('Cookie settings link must not reopen on every reload');
    if (!result.faqWorks || !result.consentRevoked || !result.publicNavigation || !result.sharedFooter || !result.languageRaceSafe || !result.tourNavigation) throw new Error('Public site regression: ' + JSON.stringify(result));
  if (result.layout.scrollWidth !== result.layout.clientWidth) throw new Error(`Horizontal overflow: ${JSON.stringify({ layout:result.layout, elements:result.overflowElements })}`);
  const minimumIcons = result.legal ? 2 : result.documentPage ? 0 : 5;
  if (result.brokenImages.length || !result.dialogOpened || !result.taskCreated || !result.menuOpened || !result.lightboxOpened || !result.videoOpened || !result.languageChanged || !result.legalContentLoaded || !result.cookieShown || !result.cookieDismissed || !result.analyticsCookies || !result.analyticsAbsentBeforeConsent || !result.essentialOnlyWorks || !result.homeButtonPresent || result.renderedSvgIcons < minimumIcons || !result.visiblePrimaryAction) throw new Error(`Smoke assertion failed: ${JSON.stringify(result)}`);
  console.log(JSON.stringify({ ...result, initialSeo, finalSeo, initialPublicLinks, finalPublicLinks, keyboardSelection:'PASS', unexpectedPageRequests:unexpectedRequests, screenshot: output }, null, 2));
} finally {
  // Close the owned browser normally before killing its launcher. Otherwise an
  // open DevTools socket can hold a successful Node process until the watchdog.
  if (closeBrowser && socket?.readyState === WebSocket.OPEN) {
    await Promise.race([closeBrowser().catch(() => {}), delay(2000)]);
  }
  socket?.close();
  if (browser.exitCode === null) browser.kill();
}
