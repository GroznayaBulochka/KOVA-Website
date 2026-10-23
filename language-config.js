/* Shared BCP 47 locale registry. pnb is Western Punjabi (Lahnda), in Shahmukhi. */
(() => {
  const names = {pl:'Polski',zh:'中文（普通话）',yue:'粵語',es:'Español',en:'English',ar:'العربية',hi:'हिन्दी',bn:'বাংলা',pt:'Português',ru:'Русский',uk:'Українська',ja:'日本語',pnb:'پنجابی (شاہ مکھی)',jv:'Basa Jawa',ko:'한국어',de:'Deutsch',fr:'Français',te:'తెలుగు',mr:'मराठी',tr:'Türkçe',ur:'اردو',vi:'Tiếng Việt',ta:'தமிழ்',it:'Italiano',fa:'فارسی',sw:'Kiswahili',ms:'Bahasa Melayu'};
  const rtl = new Set(['ar','pnb','ur','fa']);
  const key = 'kova_site_language';
  const match = value => {
    const parts=String(value || '').trim().replace(/_/g,'-').toLowerCase().split('-');
    const base=parts[0];
    if (base==='yue' || (base==='zh' && (parts.includes('yue') || parts.includes('hk') || parts.includes('mo')))) return 'yue';
    if (base==='pnb' || (base==='pa' && (parts.includes('arab') || parts.includes('pk')))) return 'pnb';
    if (base==='cmn') return 'zh';
    if (base==='jw') return 'jv';
    return Object.hasOwn(names,base) ? base : null;
  };
  const resolve = value => match(value) || 'pl';
  const browserLanguage = () => {
    const preferred=[...(navigator.languages || []),navigator.language];
    return preferred.map(match).find(Boolean) || 'pl';
  };
  const preference = () => {
    let stored;
    try { stored=match(localStorage.getItem(key)); } catch { /* Try the essential language cookie. */ }
    if (stored) return stored;
    try {
      const cookie=document.cookie.split(';').map(part=>part.trim()).find(part=>part.startsWith(key+'='));
      return cookie ? match(decodeURIComponent(cookie.slice(key.length+1))) : null;
    } catch { return null; }
  };
  // A language-specific URL is intentional. The default Polish HTML is only
  // a no-JS fallback and must not override browser preferences on generic URLs.
  const initial = () => {
    const requested=match(new URLSearchParams(location.search).get('lang'));
    const suffix=/-([a-z]{2,3})\.html$/i.exec(location.pathname);
    return requested || (suffix && match(suffix[1])) || preference() || browserLanguage();
  };
  // Only explicit user choices are persisted; automatic detection and viewing
  // a shared language link must not overwrite a previous manual preference.
  const remember = value => {
    const language=match(value);
    if (!language) return;
    try { localStorage.setItem(key,language); } catch { /* The cookie can retain the choice. */ }
    try { document.cookie=`${key}=${language}; Max-Age=31536000; Path=/; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`; } catch { /* The current URL still retains the choice. */ }
  };
  window.KOVA_LANGUAGES=Object.freeze({names,codes:Object.keys(names),rtl,resolve,browserLanguage,initial,remember});
  const direction=()=>{document.documentElement.dir=rtl.has(document.documentElement.lang)?'rtl':'ltr';};
  direction();
  new MutationObserver(direction).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.KOVA_populateLanguages=()=>{
    for(const select of document.querySelectorAll('#site-language,[data-project-language],[data-document-language],[data-legal-language]')) {
      const selected=select.value;
      select.replaceChildren(...Object.entries(names).map(([code,name])=>{const option=document.createElement('option');option.value=code;option.lang=code;option.textContent=name;return option;}));
      select.value=selected;
    }
  };
})();
