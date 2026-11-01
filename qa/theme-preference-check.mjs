import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile('site-theme.js','utf8');
let checks=0;
function start(saved,{dark=false,blocked=false}={}){
  const attributes=new Map(),listeners={},mediaListeners={},storage=new Map(saved==null?[]:[['kova_site_theme',saved]]);
  const metas=['light','dark'].map(mode=>({media:`(prefers-color-scheme: ${mode})`,content:''}));
  const root={lang:'pl',setAttribute:(k,v)=>attributes.set(k,v),removeAttribute:k=>attributes.delete(k)};
  const context={document:{documentElement:root,querySelectorAll:s=>s.startsWith('meta')?metas:[],addEventListener(){}},localStorage:{getItem:k=>{if(blocked)throw Error('blocked storage');return storage.get(k);}},MutationObserver:class{observe(){}},window:{matchMedia:()=>({matches:dark,addEventListener:(name,fn)=>mediaListeners[name]=fn}),addEventListener:(name,fn)=>listeners[name]=fn}};
  vm.runInNewContext(source,context);
  return {attributes,metas,listeners,mediaListeners,storage};
}
for(const dark of [false,true]){
  for(const saved of [null,'auto','invalid','light','dark']){
    const app=start(saved,{dark}),manual=['light','dark'].includes(saved);
    assert.equal(app.attributes.get('data-theme'),manual?saved:undefined);
    assert.deepEqual(app.metas.map(m=>m.content),manual?[1,2].map(()=>saved==='dark'?'#101611':'#f7f5ef'):['#f7f5ef','#101611']);
    app.mediaListeners.change();
    assert.equal(app.attributes.get('data-theme'),manual?saved:undefined,'OS change must not override a manual choice');checks++;
  }
}
const blocked=start('dark',{blocked:true});assert.equal(blocked.attributes.has('data-theme'),false);checks++;
const tab=start(null);
tab.storage.set('kova_site_theme','dark');tab.listeners.storage({key:'kova_site_theme'});
assert.equal(tab.attributes.get('data-theme'),'dark');checks++;
tab.storage.set('kova_site_theme','light');tab.listeners.storage({key:'kova_site_theme'});
assert.equal(tab.attributes.get('data-theme'),'light');checks++;
tab.storage.delete('kova_site_theme');tab.listeners.storage({key:'kova_site_theme'});
assert.equal(tab.attributes.has('data-theme'),false);checks++;
tab.storage.set('kova_site_theme','dark');tab.listeners.storage({key:'unrelated'});
assert.equal(tab.attributes.has('data-theme'),false);checks++;
tab.listeners.storage({key:null});assert.equal(tab.attributes.get('data-theme'),'dark');checks++;
console.log(JSON.stringify({result:'PASS',checks,scope:'First paint preference, invalid/blocked storage, browser changes and cross-tab synchronization. Actual selection/persistence is tested in the browser.'}));
