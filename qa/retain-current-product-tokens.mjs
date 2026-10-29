import {readFile,writeFile,readdir} from 'node:fs/promises';
import vm from 'node:vm';
const fix=h=>{if(!h.plansNote.startsWith('KOVA Premium · '))h.plansNote='KOVA Premium · '+h.plansNote;if(!h.planPremiumTwo.includes('OCR'))h.planPremiumTwo+=' (OCR)';};
let js=await readFile('landing.js','utf8');const c={};
vm.runInNewContext(js.slice(js.indexOf('  const dictionaries'),js.indexOf('  const videoSlides'))+';this.h=dictionaries;',c);
for(const h of Object.values(c.h))fix(h);
js=js.slice(0,js.indexOf('  const dictionaries'))+'  const dictionaries = '+JSON.stringify(c.h,null,2)+';\n\n'+js.slice(js.indexOf('  const videoSlides'));
await writeFile('landing.js',js);
for(const file of await readdir('locales')){const p='locales/'+file,d=JSON.parse(await readFile(p,'utf8'));fix(d.home);await writeFile(p,JSON.stringify(d,null,2)+'\n');}
const p='qa/artifacts/localization/source.json',d=JSON.parse(await readFile(p,'utf8'));fix(d.home);await writeFile(p,JSON.stringify(d,null,2)+'\n');
console.log('Preserved KOVA and OCR names in all localized product labels.');
