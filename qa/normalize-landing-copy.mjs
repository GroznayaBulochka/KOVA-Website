// Mechanical consolidation: preserve the effective translations, remove stale overridden copy.
import {readFile,writeFile} from 'node:fs/promises';
import vm from 'node:vm';
const path=new URL('../landing.js',import.meta.url);
const source=await readFile(path,'utf8');
const start=source.indexOf('  const dictionaries');
const end=source.indexOf('  const videoSlides');
if(start<0||end<=start)throw Error('Translation boundaries missing');
const sandbox={window:{}};
vm.runInNewContext(source.slice(start,end)+';window.copy=dictionaries;',sandbox);
await writeFile(path,source.slice(0,start)+'  const dictionaries = '+JSON.stringify(sandbox.window.copy,null,2)+';\n\n'+source.slice(end));
console.log('Consolidated effective PL/EN/RU translations without changing displayed copy.');
