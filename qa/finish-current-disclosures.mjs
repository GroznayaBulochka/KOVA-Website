import {readFile,writeFile,access} from 'node:fs/promises';import vm from 'node:vm';
import {currentAppProductStrings} from '../scripts/current-website-legal.mjs';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root),'utf8');
const receipt=new URL('qa/artifacts/content-refresh-2026-10-29/disclosures.json',root);
try{await access(receipt);throw Error('No completed disclosure overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
let script=await read('landing.js');const c={window:{}};
vm.runInNewContext(script.slice(script.indexOf('  const dictionaries'),script.indexOf('  const videoSlides'))+';this.home=dictionaries;',c);
for(const lang of Object.keys(JSON.parse(await read('language-registry.json')))) {
 const data=['pl','en','ru'].includes(lang)?{home:c.home[lang]}:JSON.parse(await read('locales/'+lang+'.json'));
 const s=await currentAppProductStrings(lang);
 if(!s.premium_package_readiness||!s.premium_beta_body)throw Error('Current localized qualification disclosure missing');
 data.home.plansCopy=s.premium_beta_body+' '+s.premium_package_readiness;
 data.home.clarityCopy=data.home.clarityCopy.replace(/ Free \/ Pro\.$/,'')+' Free / Pro.';
 if(!['pl','en','ru'].includes(lang))await writeFile(new URL('locales/'+lang+'.json',root),JSON.stringify(data,null,2)+'\n');
}
script=script.slice(0,script.indexOf('  const dictionaries'))+'  const dictionaries = '+JSON.stringify(c.home,null,2)+';\n\n'+script.slice(script.indexOf('  const videoSlides'));
await writeFile(new URL('landing.js',root),script);
const schema=JSON.parse(await read('qa/artifacts/localization/source.json'));schema.home=c.home.en;
await writeFile(new URL('qa/artifacts/localization/source.json',root),JSON.stringify(schema,null,2)+'\n');
await writeFile(receipt,JSON.stringify({atUtc:new Date().toISOString(),languages:27,scope:'Current beta, data readiness, tax country/year coverage, no cloud sync and mixed Free/Pro presentation labels; no new prices or legal approval',published:false},null,2));
