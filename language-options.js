window.KOVA_populateLanguages();
// Every public page uses the same preference handling, including legal pages.
document.addEventListener('change',event=>{
  if (event.target.matches('#site-language,[data-project-language],[data-document-language],[data-legal-language]')) {
    window.KOVA_LANGUAGES.remember(event.target.value);
  }
},true);
document.addEventListener('click',event=>{
  const link=event.target.closest('a[data-language-link]');
  if (link && event.button===0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    window.KOVA_LANGUAGES.remember(link.lang);
  }
});
