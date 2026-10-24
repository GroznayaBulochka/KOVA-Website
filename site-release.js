(() => {
 'use strict';
 const config=window.KOVA_RELEASE;
 if(!config)return;
 const base={pl:{followLaunch:'Obserwuj KOVA na Instagramie',downloadApp:'Pobierz z Google Play'},en:{followLaunch:'Follow KOVA on Instagram',downloadApp:'Get it on Google Play'},ru:{followLaunch:'Подписаться на KOVA в Instagram',downloadApp:'Скачать в Google Play'}};
 function sync(){
  const lang=document.documentElement.lang;
  const copy=window.KOVA_TRANSLATIONS?.[lang]?.home||base[lang]||base.en;
  for(const link of document.querySelectorAll('[data-primary-cta]')){
   link.href=config.available?config.storeUrl:config.followUrl;
   link.dataset.ctaAction=config.available?'google_play':'follow_launch';
   link.querySelector('[data-primary-cta-label]').textContent=copy[config.available?'downloadApp':'followLaunch'];
  }
 }
 sync();new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
