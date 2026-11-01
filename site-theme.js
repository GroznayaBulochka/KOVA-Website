// Runs in <head> so a remembered choice is applied before the first paint.
(() => {
  'use strict';
  const key='kova_site_theme';
  const modes=['auto','light','dark'];
  const root=document.documentElement;
  const media=window.matchMedia('(prefers-color-scheme: dark)');
  const normalize=value=>modes.includes(value)?value:'auto';
  const read=()=>{try{return normalize(localStorage.getItem(key));}catch{return 'auto';}};
  let choice=read();
  const labels={
    pl:['Motyw','Automatyczny','Jasny','Ciemny'],
    en:['Theme','Automatic','Light','Dark'],
    ru:['Тема','Автоматически','Светлая','Тёмная'],
    uk:['Тема','Автоматично','Світла','Темна'],
    zh:['主题','自动','浅色','深色'],
    yue:['主題','自動','淺色','深色'],
    es:['Tema','Automático','Claro','Oscuro'],
    ar:['المظهر','تلقائي','فاتح','داكن'],
    hi:['थीम','स्वचालित','हल्की','गहरी'],
    bn:['থিম','স্বয়ংক্রিয়','হালকা','গাঢ়'],
    pt:['Tema','Automático','Claro','Escuro'],
    ja:['テーマ','自動','ライト','ダーク'],
    pnb:['تھیم','خودکار','ہلکا','گہرا'],
    jv:['Tema','Otomatis','Padhang','Peteng'],
    ko:['테마','자동','라이트','다크'],
    de:['Design','Automatisch','Hell','Dunkel'],
    fr:['Thème','Automatique','Clair','Sombre'],
    te:['థీమ్','ఆటోమేటిక్','లైట్','డార్క్'],
    mr:['थीम','स्वयंचलित','हलकी','गडद'],
    tr:['Tema','Otomatik','Açık','Koyu'],
    ur:['تھیم','خودکار','ہلکا','گہرا'],
    vi:['Giao diện','Tự động','Sáng','Tối'],
    ta:['தோற்றம்','தானியங்கி','வெளிர்','அடர்'],
    it:['Tema','Automatico','Chiaro','Scuro'],
    fa:['پوسته','خودکار','روشن','تیره'],
    sw:['Mandhari','Kiotomatiki','Angavu','Nyeusi'],
    ms:['Tema','Automatik','Cerah','Gelap']
  };
  const icons={
    auto:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    light:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
    dark:'<path d="M20.5 14A8.7 8.7 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>'
  };
  const icon=mode=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[mode]}</svg>`;
  function syncControls(){
    const copy=labels[root.lang]||labels.en;
    for(const picker of document.querySelectorAll('.theme-picker')){
      const summary=picker.querySelector('summary');
      summary.innerHTML=icon(choice);
      summary.setAttribute('aria-label',`${copy[0]}: ${copy[modes.indexOf(choice)+1]}`);
      summary.title=summary.getAttribute('aria-label');
      picker.querySelector('legend').textContent=copy[0];
      for(const input of picker.querySelectorAll('input')){
        input.checked=input.value===choice;
        input.closest('label').querySelector('span').textContent=copy[modes.indexOf(input.value)+1];
      }
    }
  }
  function apply(){
    if(choice==='auto')root.removeAttribute('data-theme');
    else root.setAttribute('data-theme',choice);
    // Both media-tagged values must agree with a manual override, even when
    // the browser preference differs. Restore their own palettes in auto mode.
    for(const tag of document.querySelectorAll('meta[name="theme-color"]')){
      const dark=choice==='auto'?tag.media.includes('dark'):choice==='dark';
      tag.content=dark?'#101611':'#f7f5ef';
    }
    syncControls();
  }
  function select(value){
    choice=normalize(value);
    try{if(choice==='auto')localStorage.removeItem(key);else localStorage.setItem(key,choice);}catch{ /* Keep the choice for this page when storage is unavailable. */ }
    apply();
  }
  function mount(header){
    const actions=header?.querySelector('.header-actions');
    if(!actions||actions.querySelector('.theme-picker'))return;
    const picker=document.createElement('details');
    picker.className='theme-picker';
    picker.innerHTML=`<summary></summary><fieldset class="theme-options"><legend></legend>${modes.map(mode=>`<label><input type="radio" name="kova-theme" value="${mode}">${icon(mode)}<span></span></label>`).join('')}</fieldset>`;
    actions.insertBefore(picker,actions.querySelector('.menu-button'));
    const summary=picker.querySelector('summary');
    picker.addEventListener('change',event=>{
      if(event.target.matches('input[name="kova-theme"]')){
        select(event.target.value);picker.open=false;summary.focus();
      }
    });
    picker.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&picker.open){event.preventDefault();event.stopPropagation();picker.open=false;summary.focus();}
    });
    syncControls();
  }
  apply();
  window.KOVA_THEME=Object.freeze({mount});
  media.addEventListener('change',()=>{if(choice==='auto')apply();});
  window.addEventListener('storage',event=>{if(event.key===key||event.key===null){choice=read();apply();}});
  document.addEventListener('pointerdown',event=>{
    for(const picker of document.querySelectorAll('.theme-picker[open]'))if(!picker.contains(event.target))picker.open=false;
  });
  new MutationObserver(syncControls).observe(root,{attributes:true,attributeFilter:['lang']});
  document.addEventListener('DOMContentLoaded',()=>mount(document.querySelector('header')),{once:true});
})();
