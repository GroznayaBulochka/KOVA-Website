(() => {
  'use strict';
  const names = { pl:'Polski', en:'English', ru:'Русский' };
  const labels = { pl:'Język strony', en:'Site language', ru:'Язык сайта' };
  document.querySelectorAll('#site-language,[data-project-language],[data-document-language],[data-legal-language]').forEach((select, index) => {
    const original = select.closest('label');
    if (!original) return;
    const wrapper = document.createElement('div');
    wrapper.className = original.className + ' language-picker';
    original.replaceWith(wrapper);
    wrapper.append(select);
    const trigger = document.createElement('button');
    trigger.type = 'button'; trigger.className = 'language-trigger';
    trigger.setAttribute('aria-haspopup','listbox'); trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#globe"></use></svg><span data-language-name></span><svg class="icon language-chevron" aria-hidden="true"><use href="assets/icons.svg#chevron-down"></use></svg>';
    const menu = document.createElement('div');
    menu.className = 'language-options'; menu.id = `language-options-${index}`; menu.hidden = true;
    menu.setAttribute('role','listbox');
    trigger.setAttribute('aria-controls',menu.id);
    const options = Object.entries(names).map(([code,name]) => {
      const option = document.createElement('button');
      option.type = 'button'; option.className = 'language-option'; option.dataset.language = code;
      option.setAttribute('role','option'); option.lang = code; option.tabIndex = -1;
      option.innerHTML = `<span>${name}</span><span class="language-code" aria-hidden="true">${code.toUpperCase()}</span><svg class="icon language-check" aria-hidden="true"><use href="assets/icons.svg#check"></use></svg>`;
      option.addEventListener('click', () => {
        select.value = code;
        select.dispatchEvent(new Event('change', { bubbles:true }));
        sync(); close(true);
      });
      menu.append(option); return option;
    });
    function sync() {
      const current = names[select.value] ? select.value : 'pl';
      const label = labels[document.documentElement.lang] || labels.pl;
      trigger.querySelector('[data-language-name]').textContent = names[current];
      trigger.setAttribute('aria-label',`${label}: ${names[current]}`);
      menu.setAttribute('aria-label',label);
      options.forEach(option => option.setAttribute('aria-selected',String(option.dataset.language === current)));
    }
    function close(restoreFocus = false) {
      menu.hidden = true; trigger.setAttribute('aria-expanded','false');
      if (restoreFocus) trigger.focus();
    }
    function open(last = false) {
      menu.hidden = false; trigger.setAttribute('aria-expanded','true');
      (last ? options.at(-1) : options.find(o => o.dataset.language === select.value) || options[0]).focus();
    }
    trigger.addEventListener('click',() => menu.hidden ? open() : close(true));
    trigger.addEventListener('keydown',event => {
      if (['ArrowDown','ArrowUp'].includes(event.key)) { event.preventDefault(); open(event.key === 'ArrowUp'); }
    });
    menu.addEventListener('keydown',event => {
      const current = options.indexOf(document.activeElement);
      let next;
      if (event.key === 'ArrowDown') next = (current + 1) % options.length;
      if (event.key === 'ArrowUp') next = (current - 1 + options.length) % options.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = options.length - 1;
      if (next !== undefined) { event.preventDefault(); options[next].focus(); }
      if (['Enter',' '].includes(event.key) && current >= 0) { event.preventDefault(); options[current].click(); }
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(true); }
      if (event.key.length === 1) {
        const match = options.find(o => names[o.dataset.language].toLowerCase().startsWith(event.key.toLowerCase()) || o.dataset.language.startsWith(event.key.toLowerCase()));
        if (match) { event.preventDefault(); match.focus(); }
      }
    });
    wrapper.addEventListener('focusout',event => { if (!wrapper.contains(event.relatedTarget)) close(); });
    document.addEventListener('pointerdown',event => { if (!wrapper.contains(event.target)) close(); });
    select.addEventListener('change',sync);
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    wrapper.append(trigger,menu); select.hidden = true; sync();
  });
})();
