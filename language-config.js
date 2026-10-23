/* Shared BCP 47 locale registry. pnb is Western Punjabi (Lahnda), in Shahmukhi. */
(() => {
  const names = {pl:'Polski',zh:'中文（普通话）',yue:'粵語',es:'Español',en:'English',ar:'العربية',hi:'हिन्दी',bn:'বাংলা',pt:'Português',ru:'Русский',uk:'Українська',ja:'日本語',pnb:'پنجابی (شاہ مکھی)',jv:'Basa Jawa',ko:'한국어',de:'Deutsch',fr:'Français',te:'తెలుగు',mr:'मराठी',tr:'Türkçe',ur:'اردو',vi:'Tiếng Việt',ta:'தமிழ்',it:'Italiano',fa:'فارسی',sw:'Kiswahili',ms:'Bahasa Melayu'};
  const rtl = new Set(['ar','pnb','ur','fa']);
  const resolve = value => {
    const code=String(value || '').toLowerCase();
    if (code==='zh-hk' || code.startsWith('yue')) return 'yue';
    if (code==='pa-arab' || code==='pa-pk' || code.startsWith('pnb')) return 'pnb';
    const base=code.split('-')[0];
    return base in names ? base : 'pl';
  };
  window.KOVA_LANGUAGES=Object.freeze({names,codes:Object.keys(names),rtl,resolve});
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
