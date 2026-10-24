// The static page remains readable when a locale or script cannot be loaded.
(() => {
 'use strict';
 const base=new Set(['pl','en','ru']),pending=new Map();
 window.KOVA_TRANSLATIONS={};
 async function load(code){
  if(base.has(code)||window.KOVA_TRANSLATIONS[code])return;
  if(!pending.has(code))pending.set(code,(async()=>{
   const response=await fetch(`locales/${code}.json`);
   if(!response.ok)throw Error('Locale unavailable');
   const data=await response.json();
   if(!data.home||!data.shell||!data.projects||!data.consent)throw Error('Invalid locale');
   window.KOVA_TRANSLATIONS[code]=data;
   window.dispatchEvent(new CustomEvent('kova:locale-loaded',{detail:{code,data}}));
  })().finally(()=>pending.delete(code)));
  return pending.get(code);
 }
 const loaded=code=>base.has(code)||Boolean(window.KOVA_TRANSLATIONS[code]);
 let changeRevision=0;
 document.addEventListener('change',async event=>{
  const select=event.target;
  if(!select.matches('#site-language,[data-project-language],[data-document-language],[data-legal-language]'))return;
  const revision=++changeRevision,code=select.value;
  if(loaded(code))return;
  event.stopImmediatePropagation();
  const previous=document.documentElement.lang;
  select.value=previous;select.setAttribute('aria-busy','true');
  try{
   await load(code);
   if(revision!==changeRevision)return;
   select.value=code;select.dispatchEvent(new Event('change',{bubbles:true}));
  }catch{
   if(revision===changeRevision){select.value=previous;showError();}
  }finally{select.removeAttribute('aria-busy');}
 },true);
 function showError(){
  let note=document.querySelector('[data-locale-error]');
  if(!note){note=document.createElement('p');note.dataset.localeError='';note.className='locale-error';note.setAttribute('role','status');document.querySelector('main').prepend(note);}
  const language=document.documentElement.lang;
  note.textContent=window.KOVA_TRANSLATIONS[language]?.legal.error||{pl:'Nie udało się wczytać wybranego języka. Spróbuj ponownie lub użyj linków językowych na dole strony.',en:'The language could not be loaded. Try again or use the language links below.',ru:'Не удалось загрузить язык. Повторите попытку или используйте ссылки внизу страницы.'}[language]||'The language could not be loaded. Please try again.';
 }
 async function start(){
  const initial=window.KOVA_LANGUAGES.initial();
  let fallback=false;
  try{await load(initial);}catch{
   // English is bundled in the controllers. Keep the site interactive and do
   // not overwrite a saved manual choice when one locale cannot be fetched.
   window.KOVA_LANGUAGES=Object.freeze({...window.KOVA_LANGUAGES,initial:()=> 'en'});
   fallback=true;
  }
  const names=JSON.parse(document.getElementById('kova-runtime-scripts').textContent);
  // Download concurrently; classic scripts with async=false execute in this order.
  await Promise.all(names.map(name=>new Promise((resolve,reject)=>{
   const script=document.createElement('script');script.async=false;script.src=name;script.onload=resolve;script.onerror=reject;document.body.append(script);
  })));
  if(fallback)showError();
  window.dispatchEvent(new Event('kova:runtime-ready'));
 }
 start().catch(()=>showError());
})();
