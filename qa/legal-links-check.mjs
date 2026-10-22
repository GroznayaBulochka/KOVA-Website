import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
let checks=0;
for(const page of ['privacy','terms']) for(const lang of ['pl','en','ru']) {
  const url=`https://kovacompass.app/${page}.html?lang=en`;
  const kind=page==='privacy'?'privacy-policy':'terms-of-service';
  const md=await read(`legal/${kind}-${lang}.md`);
  const header=md.split(/^## /m)[0];
  assert(header.includes(`[${url}](${url})`)); checks++;
  assert(header.includes('[OWNER_INPUT_REQUIRED]') && header.includes('DRAFT')); checks++;
  const html=await read(`dist/${page}${lang==='pl'?'':'-'+lang}.html`);
  for(const region of [/<p[^>]*data-legal-review[^>]*>([\s\S]*?)<\/p>/, /<article[^>]*data-legal-content[^>]*>([\s\S]*?)<\/article>/]) {
    const section=html.match(region)?.[1] || '';
    assert(section.match(/<a\b[^>]*data-public-document-link[^>]*>/g)?.some(anchor=>anchor.includes(`href="${url}"`) && anchor.includes('noopener'))); checks++;
  }
  // Exercise same-origin production rewriting without making any network request.
  const data=JSON.parse(html.match(/<script[^>]*id="kova-seo-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
  const link={href:url,getAttribute:()=>url,hasAttribute:name=>name==='data-public-document-link'};
  const source={textContent:JSON.stringify(data)};
  const doc={documentElement:{lang},readyState:'complete',getElementById:id=>id==='kova-seo-data'?source:null,querySelector:()=>null,querySelectorAll:()=>[link]};
  vm.runInNewContext(await read('site-seo.js'),{window:{addEventListener(){}},document:doc,location:{href:`https://kovacompass.app/${page}.html`,origin:'https://kovacompass.app'},history:{replaceState(){}},URL,MutationObserver:class{observe(){}}});
  assert.equal(link.href,url); checks++;
}
console.log(JSON.stringify({result:'PASS',checks,documents:6,scope:'Static no-JS anchors, pending effective date, mocked production-origin URL preservation; no network or legal approval'}));
