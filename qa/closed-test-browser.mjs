import assert from 'node:assert/strict';
import {browserSession} from './browser-session.mjs';

// Check the visitor's path, but never open a mail client, send mail or enroll a tester.
const origin = new URL(process.env.KOVA_TEST_ORIGIN || 'http://127.0.0.1:4174');
assert.equal(origin.hostname, '127.0.0.1');
const browser = await browserSession();
try {
  await browser.send('Emulation.setDeviceMetricsOverride',{width:360,height:800,deviceScaleFactor:1,mobile:true});
  for (const lang of ['pl','en','ar']) {
    const path = lang==='pl' ? '/' : '/index-'+lang+'.html';
    await browser.navigate(origin.origin+path+'?lang='+lang);
    await browser.until("document.documentElement.lang==='"+lang+"' && window.KOVA_RELEASE && document.querySelector('[data-cta-location=hero]')?.dataset.ctaAction==='closed_test'");
    // Observe the event after site handlers, then stop only the external handoff.
    for(const selector of ['[data-cta-location=hero]','[data-cta-location=closing]','[data-webmail-compose]']) {
      const [href,wasBlocked]=await browser.evaluate(`new Promise(resolve=>{
        window.addEventListener('click',e=>{const wasBlocked=e.defaultPrevented;e.preventDefault();resolve([e.target.closest('a').href,wasBlocked]);},{once:true});
        document.querySelector('${selector}').click();
      })`);
      assert.equal(wasBlocked,false);
      const target=new URL(href);
      if(selector.includes('webmail')) {
        assert.equal(target.origin,'https://mail.google.com');assert.equal(target.searchParams.get('view'),'cm');
        assert.equal(target.searchParams.get('to'),'contact@kovacompass.app');assert.equal(target.searchParams.get('su'),'KOVA Android beta');
      } else assert.equal(href,'mailto:contact@kovacompass.app?subject=KOVA%20Android%20beta');
    }
    const data = await browser.evaluate(`(() => {
      const panel=document.getElementById('closed-test'), link=panel.querySelector('[data-cta-location=closing]');
      return [link.href,panel.innerText,document.documentElement.scrollWidth<=innerWidth+1];
    })()`);
    assert.equal(data[0], 'mailto:contact@kovacompass.app?subject=KOVA%20Android%20beta');
    assert.match(data[1], /Google Play/);
    assert.match(data[1], /contact@kovacompass\.app/);
    assert.equal(data[2], true, lang+': no horizontal overflow');
  }
  console.log('PASS: mobile recruitment flow PL/EN/AR; no email sent.');
} finally { await browser.close(); }
