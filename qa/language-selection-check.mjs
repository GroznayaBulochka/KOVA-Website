import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../language-config.js',import.meta.url),'utf8');
const registry=JSON.parse(await readFile(new URL('../language-registry.json',import.meta.url),'utf8'));
let checks=0;
function context({url='https://example.test/',languages=['en-US'],language=languages[0],stored,cookie='',blocked=false,cookiesBlocked=false}={}) {
 const storage=new Map(stored ? [['kova_site_language',stored]] : []);
 let cookieValue=cookie,writes=0;
 const doc={documentElement:{lang:'pl',dataset:{staticLanguage:'pl'}},get cookie(){return cookieValue;},set cookie(value){if(cookiesBlocked)throw Error('cookies blocked');cookieValue=value;writes++;}};
 const ctx={window:{},document:doc,URLSearchParams,location:new URL(url),navigator:{languages,language},localStorage:{getItem(k){if(blocked)throw Error('storage blocked');return storage.get(k)||null;},setItem(k,v){if(blocked)throw Error('storage blocked');storage.set(k,v);writes++;}},MutationObserver:class{observe(){}}};
 vm.runInNewContext(source,ctx);
 return {api:ctx.window.KOVA_LANGUAGES,storage,document:doc,writes:()=>writes};
}
const cases=[
 [{languages:['de-DE']},'de'],[{languages:['uk-UA']},'uk'],
 [{languages:['cs-CZ','de-DE','en-US']},'de'],
 [{languages:['xx','yy'],language:'fr-CA'},'fr'],
 [{languages:['xx','yy'],language:'xx'},'pl'],
 [{languages:[],language:'ja-JP'},'ja'],
 [{languages:['zh-Hant-HK']},'yue'],[{languages:['zh-Hant-MO']},'yue'],
 [{languages:['yue-Hant-HK']},'yue'],[{languages:['cmn-Hans-CN']},'zh'],
 [{languages:['zh-TW']},'zh'],[{languages:['pa-Arab-PK']},'pnb'],
 [{languages:['jw-ID']},'jv'],[{languages:['pa-Guru-IN','uk-UA']},'uk'],
 [{languages:['en-US'],stored:'de'},'de'],
 [{languages:['uk-UA'],stored:'bad',cookie:'kova_site_language=fr'},'fr'],
 [{languages:['uk-UA'],cookie:'kova_site_language=de',blocked:true},'de'],
 [{languages:['uk-UA'],blocked:true,cookiesBlocked:true},'uk'],
 [{url:'https://example.test/index-fr.html',stored:'de',languages:['uk-UA']},'fr'],
 [{url:'https://example.test/index-fr.html?lang=uk',stored:'de'},'uk'],
 [{url:'https://example.test/?lang=pl',stored:'de'},'pl'],
 [{url:'https://example.test/?lang=zz',languages:['uk-UA']},'uk'],
 [{url:'https://example.test/contact.html',languages:['de-DE']},'de'],
 [{url:'https://example.test/privacy.html',languages:['ar-SA']},'ar'],
 [{url:'https://example.test/cookies.html',stored:'ja'},'ja']
];
for(const [input,expected] of cases) {
 const c=context(input);assert.equal(c.api.initial(),expected,JSON.stringify(input));assert.equal(c.writes(),0,'Automatic detection must not save a manual preference');checks++;
}
for(const code of Object.keys(registry)) {
 const c=context({languages:[code+'-ZZ']});assert.equal(c.api.initial(),code);
 c.api.remember(code);assert.equal(c.storage.get('kova_site_language'),code);assert.ok(c.document.cookie.includes(`kova_site_language=${code}`));assert.ok(c.document.cookie.includes('Secure'));checks++;
 const stored=context({stored:code,languages:['xx']});assert.equal(stored.api.initial(),code);checks++;
}
const cookieOnly=context({blocked:true,languages:['en-US']});cookieOnly.api.remember('uk');assert.equal(cookieOnly.api.initial(),'uk');checks++;
const unavailable=context({blocked:true,cookiesBlocked:true});assert.doesNotThrow(()=>unavailable.api.remember('uk'));checks++;
console.log(JSON.stringify({result:'PASS',checks,languages:Object.keys(registry).length}));
