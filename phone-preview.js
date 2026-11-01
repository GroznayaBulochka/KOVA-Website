// Screen navigation only: genuine captures, fictional data, no financial operations.
(() => {
  'use strict';
  const host=document.querySelector('[data-phone-preview]');
  if(!host||!window.KOVA_PREVIEW_CONTENT||!window.KOVA_PHONE_DATA)return;
  const data=window.KOVA_PHONE_DATA;
  const baseIds=['home','accounts','transactions','budgets','recurring','reports','calendar','notes','work'];
  const icons=['home','wallet','chart','wallet','calendar','chart','calendar','file','briefcase'];
  const ids=[...baseIds,...data.screens.map(s=>s.id),'more'];
  const content=()=>window.KOVA_PREVIEW_CONTENT();
  const ui=()=>data.ui[content().language];
  const asset=path=>window.KOVA_ASSET_URL?.(path)||path;
  const svg=name=>`<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#${name}"></use></svg>`;
  const screens=()=>{
    const {language,copy,slides}=content();
    return [...slides.map((s,i)=>({id:baseIds[i],title:s.title[language],caption:s.caption[language],image:s.image,icon:icons[i]})),
      {id:'work',title:copy.featureWork,caption:copy.featureWorkCopy,image:'assets/screenshots/kova-work-income.png',icon:'briefcase'},
      ...data.screens.map(s=>({...s,title:ui()[s.titleKey]+(s.titleSuffixKey?' — '+ui()[s.titleSuffixKey]:''),caption:s.captionKey?ui()[s.captionKey]:copy.featureGoalsCopy})),
      {id:'more',title:ui().more,caption:ui().more_subtitle,icon:'workspace'}];
  };
  const imageUrl=screen=>asset('assets/screenshots/thumbs/'+new URL(screen.image,location.href).pathname.split('/').pop().replace('.png','-720.webp'));
  let current='home',history=[],revision=0,ready=false;
  host.innerHTML=`<div class="phone-preview-info"><p class="phone-preview-label"></p><h3 data-phone-title></h3><p data-phone-caption></p><p class="phone-preview-instruction"></p></div><div class="phone-preview-device"><div class="demo-phone"><div class="phone-display" tabindex="-1"><img data-phone-image width="1080" height="2400" alt=""><div class="phone-hotspots"></div><section class="phone-screen-menu" hidden><header class="phone-menu-heading"><button type="button" data-phone-back>${svg('chevron-left')}</button><img src="${asset('assets/logo.svg')}" alt="KOVA" width="28" height="28"><span>KOVA</span></header><div class="phone-menu-scroll"><h4></h4><p></p><nav class="phone-screen-list"></nav></div><nav class="phone-bottom-nav"><button type="button" data-phone-home>${svg('home')}<span></span></button><button type="button" data-phone-notes>${svg('file')}<span></span></button><button type="button" data-phone-more aria-current="page">${svg('workspace')}<span></span></button></nav></section></div></div><p class="phone-preview-status" aria-live="polite" aria-atomic="true"></p></div>`;
  const stage=host.querySelector('.phone-display'),image=host.querySelector('[data-phone-image]'),hotspots=host.querySelector('.phone-hotspots'),menu=host.querySelector('.phone-screen-menu'),catalog=host.querySelector('.phone-screen-list'),status=host.querySelector('.phone-preview-status');
  function hit(target,bounds,label){
    if(target!=='back'&&!ids.includes(target))return;
    const button=document.createElement('button');button.type='button';button.className='phone-hotspot';
    button.dataset.phoneTarget=target;button.setAttribute('aria-label',label);button.title=label;
    const [x,y,w,h]=bounds;
    Object.assign(button.style,{left:x/1080*100+'%',top:y/2400*100+'%',width:w/1080*100+'%',height:h/2400*100+'%'});
    button.addEventListener('click',()=>target==='back'?back():show(target,{focus:true}));hotspots.append(button);
  }
  function renderHotspots(){
    const {copy}=content(),all=screens(),screen=all.find(s=>s.id===current),title=id=>all.find(s=>s.id===id)?.title;
    hotspots.replaceChildren();
    if(current==='more')return;
    if(screen.hotspots){
      for(const {target,bounds} of screen.hotspots)hit(target,bounds,target==='back'?copy.previous:title(target));
      return;
    }
    // Native capture coordinate system: 1080 x 2400.
    if(!['home','notes'].includes(current))hit('back',[32,80,155,155],copy.previous);
    if(current!=='work'){
      hit('home',[63,2169,238,126],title('home'));
      hit('notes',[301,2169,238,126],title('notes'));
      hit('more',[778,2169,239,126],ui().more);
    }
    if(current==='home'){
      hit('profile',[42,75,126,126],title('profile'));
      hit('accounts',[52,405,970,320],title('accounts'));
      hit('calendar',[700,235,325,140],title('calendar'));
      hit('transactions',[85,1300,440,130],title('transactions'));
      hit('transactions',[565,1300,430,130],title('transactions'));
      hit('reports',[52,1750,800,350],title('reports'));
    }
    for(const {target,bounds} of data.links?.[current]||[])hit(target,bounds,title(target));
  }
  function renderText(){
    const {language,copy,demo}=content(),all=screens(),screen=all.find(s=>s.id===current);
    host.querySelector('.phone-preview-label').textContent=demo;
    host.querySelector('[data-phone-title]').textContent=screen.title;
    host.querySelector('[data-phone-caption]').textContent=screen.caption;
    host.querySelector('.phone-preview-instruction').textContent=copy.galleryHint;
    image.alt=screen.title+' — KOVA, '+demo;
    stage.setAttribute('aria-label',screen.title);
    catalog.setAttribute('aria-label',copy.tourChapters);
    menu.querySelector('h4').textContent=ui().more;
    menu.querySelector('.phone-menu-scroll>p').textContent=ui().more_subtitle;
    menu.dir=window.KOVA_LANGUAGES.rtl.has(language)?'rtl':'ltr';
    host.querySelector('[data-phone-back]').setAttribute('aria-label',copy.previous);
    for(const id of ['home','notes','more']){
      const button=host.querySelector('[data-phone-'+id+']');
      const label=id==='more'?ui().more:all.find(s=>s.id===id).title;
      button.querySelector('span').textContent=label;button.setAttribute('aria-label',label);
    }
    // The catalog is the phone's More screen, not a gallery outside the phone.
    catalog.replaceChildren(...all.filter(s=>s.id!=='more'&&s.catalog!==false).map(s=>{
      const button=document.createElement('button');button.type='button';button.dataset.phoneScreen=s.id;
      button.innerHTML=svg(s.icon)+'<span></span>';
      button.querySelector('span').textContent=s.title;
      button.addEventListener('click',()=>show(s.id,{focus:true}));return button;
    }));
    image.hidden=current==='more';hotspots.hidden=current==='more';menu.hidden=current!=='more';
    status.textContent=screen.title;
    renderHotspots();host.dataset.phoneScreen=current;
  }
  async function show(id,{focus=false,push=true}={}){
    const screen=screens().find(s=>s.id===id);if(!screen)return false;
    const ticket=++revision;stage.setAttribute('aria-busy','true');
    let preload;
    if(screen.image){
      preload=new Image();preload.src=imageUrl(screen);
      try{await preload.decode();}catch{
        if(ticket!==revision)return false;
        stage.removeAttribute('aria-busy');status.textContent=content().error;return false;
      }
    }
    if(ticket!==revision)return false;
    if(push&&current!==id)history=[...history,current].slice(-30);
    current=id;if(preload)image.src=preload.src;
    renderText();stage.removeAttribute('aria-busy');
    host.hidden=false;document.getElementById('all-screens').hidden=true;ready=true;
    if(focus){
      stage.focus({preventScroll:true});
      const bounds=stage.getBoundingClientRect();
      if(bounds.top<90||bounds.bottom>innerHeight-10)stage.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
    return true;
  }
  async function back(){
    const previous=history.at(-1)||'home';
    if(await show(previous,{push:false,focus:true}))history.pop();
  }
  host.querySelector('[data-phone-back]').addEventListener('click',back);
  for(const id of ['home','notes','more'])host.querySelector('[data-phone-'+id+']').addEventListener('click',()=>show(id,{focus:true}));
  host.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();back();}
    if(['ArrowLeft','ArrowRight'].includes(event.key)){
      event.preventDefault();const step=event.key==='ArrowRight'?1:-1;
      show(ids[(ids.indexOf(current)+step+ids.length)%ids.length],{focus:true});
    }
  });
  window.KOVA_PHONE_PREVIEW=Object.freeze({
    async open(){
      if(!await show('home'))return false;
      host.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
      stage.focus({preventScroll:true});return true;
    },
    refresh(){if(ready)renderText();}
  });
  show('home');
})();
