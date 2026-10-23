import {readdir,readFile,writeFile} from 'node:fs/promises';
const data={};
for(const file of (await readdir('locales')).filter(n=>n.endsWith('.json')).sort()) data[file.slice(0,-5)]=JSON.parse(await readFile('locales/'+file,'utf8'));
await writeFile('translations.js','// Generated from stored locale files; no runtime translation requests.\nwindow.KOVA_TRANSLATIONS = '+JSON.stringify(data).replace(/</g,'\\u003c')+';\n');
console.log('Assembled '+Object.keys(data).length+' locale packs');
