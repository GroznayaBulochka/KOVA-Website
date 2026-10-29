// Keep the no-JavaScript gallery in sync with the reviewed tour catalogue.
import {readFile, writeFile} from 'node:fs/promises';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const source = await readFile(new URL('landing.js', root), 'utf8');
const context = {window:{}};
vm.runInNewContext(source.slice(source.indexOf('  const videoSlides'), source.indexOf('  const supported')) + ';this.slides=videoSlides;', context);
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const figures = context.slides.map((slide, index) => `<figure data-screen-index="${index}"><button type="button" data-lightbox="${esc(slide.image)}" aria-label="Powiększ: ${esc(slide.title.pl)}"><img src="${esc(slide.image)}" alt="${esc(slide.title.pl)} — KOVA, fikcyjne dane demonstracyjne" loading="lazy" width="1080" height="2400" /></button><figcaption><b>${esc(slide.title.pl)}</b><span>${esc(slide.caption?.pl || slide.copy.pl)}</span></figcaption></figure>`).join('');
let html = await readFile(new URL('index.html', root), 'utf8');
html = html.replace(/(<div class="screen-stories" id="all-screens">)[\s\S]*?(<\/div><\/div><\/section>)/, `$1${figures}$2`);
if (!html.includes('data-video-chapters')) html = html.replace('<div class="video-controls">','<nav class="video-chapters" data-video-chapters aria-label="Wybierz ekran prezentacji"></nav><div class="video-controls">');
html = html.replace(/data-video-counter>1 \/ \d+/, `data-video-counter>1 / ${context.slides.length}`);
html = html.replace(/(data-video-image src=")[^"]+/, `$1${context.slides[0].image}`);
html = html.replace(/(data-video-title>)[^<]*/, `$1${esc(context.slides[0].title.pl)}`)
  .replace(/(data-video-copy>)[^<]*/, `$1${esc(context.slides[0].copy.pl)}`)
  .replace(/(data-video-play-label data-i18n=")pauseVideo/, '$1playVideo');
html = html.replaceAll('assets/screenshots/free-v1-home-dark.png', context.slides[0].image)
  .replaceAll('assets/screenshots/free-v1-home-light.png', context.slides[1].image);
await writeFile(new URL('index.html', root), html);
console.log(`Synchronized ${context.slides.length} real app screen entries.`);
