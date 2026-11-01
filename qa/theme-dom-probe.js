// Read-only browser probe, evaluated against the iframe's body by Browser Use.
body => {
  const rgb=s=>{const v=s.match(/[\d.]+/g)?.map(Number);return v?.length>=3?[...v.slice(0,3),v[3]??1]:null;};
  const lum=c=>c.slice(0,3).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
  const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
  const failures=[];let checked=0;
  for(const el of body.querySelectorAll('*')){
    if(!Array.from(el.childNodes).some(n=>n.nodeType===3&&n.textContent.trim()))continue;
    const box=el.getBoundingClientRect(),style=getComputedStyle(el);
    if(!box.width||!box.height||style.visibility==='hidden'||el.closest('[hidden],dialog:not([open])'))continue;
    const fg=rgb(style.color);if(!fg||fg[3]!==1)continue;
    const ancestors=[];for(let p=el;p;p=p.parentElement)ancestors.unshift(p);
    let bg=[255,255,255,1],image=false;
    for(const p of ancestors){const s=getComputedStyle(p),c=rgb(s.backgroundColor);if(c){bg=bg.map((v,i)=>i<3?c[i]*c[3]+v*(1-c[3]):1);if(c[3]===1)image=false;}if(s.backgroundImage!=='none')image=true;}
    if(image)continue; // Gradients/photos are inspected visually, not guessed.
    const contrast=ratio(fg,bg),large=Number.parseFloat(style.fontSize)>=24||(Number.parseFloat(style.fontSize)>=18.66&&Number.parseInt(style.fontWeight)>=700);
    checked++;
    if(contrast<(large?3:4.5))failures.push({tag:el.tagName,class:el.className,text:el.textContent.trim().slice(0,90),contrast:Number(contrast.toFixed(2)),fg:style.color,bg:bg.slice(0,3)});
  }
  return {background:getComputedStyle(body).backgroundColor,color:getComputedStyle(body).color,width:body.clientWidth,scrollWidth:body.scrollWidth,overflow:body.scrollWidth>body.clientWidth,checkedContrast:checked,contrastFailures:failures};
}
