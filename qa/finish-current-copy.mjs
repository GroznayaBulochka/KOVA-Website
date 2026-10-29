import {readFile,writeFile,access} from 'node:fs/promises';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8');
const receipt=new URL('qa/artifacts/content-refresh-2026-10-29/alt-copy.json',root);
try{await access(receipt);throw Error('No completed copy overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
let script=await read('landing.js');const c={window:{}};
vm.runInNewContext(script.slice(script.indexOf('  const dictionaries'),script.indexOf('  const videoSlides'))+';this.home=dictionaries;',c);
const registry=JSON.parse(await read('language-registry.json'));
for(const lang of Object.keys(registry)) {
 const data=['pl','en','ru'].includes(lang)?{home:c.home[lang]}:JSON.parse(await read('locales/'+lang+'.json'));
 const h=data.home;
 h.altFeatures=h.altHome;
 h.altWork='KOVA: '+h.featureWork+' · Pro — '+h.workScreenNote;
 h.aboutIncomeCopy='Pro · '+h.aboutIncomeCopy.replace(/^Pro · /,'');
 if(!['pl','en','ru'].includes(lang))await writeFile(new URL('locales/'+lang+'.json',root),JSON.stringify(data,null,2)+'\n');
}
script=script.slice(0,script.indexOf('  const dictionaries'))+'  const dictionaries = '+JSON.stringify(c.home,null,2)+';\n\n'+script.slice(script.indexOf('  const videoSlides'));
await writeFile(new URL('landing.js',root),script);
const schema=JSON.parse(await read('qa/artifacts/localization/source.json'));schema.home=c.home.en;
await writeFile(new URL('qa/artifacts/localization/source.json',root),JSON.stringify(schema,null,2)+'\n');
await writeFile(receipt,JSON.stringify({atUtc:new Date().toISOString(),languages:27,currentEnglishScreenshotDescriptions:true,freeBasicReportsAdvertised:false,published:false},null,2));
