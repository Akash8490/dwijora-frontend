import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const url = process.argv[2] ?? 'http://localhost:3010/';
const out = process.argv[3] ?? 'assets/home.desktop.png';
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const page = await context.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.evaluate(() => document.fonts?.ready).catch(() => {});
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
  window.scrollTo(0, h); await new Promise(r => setTimeout(r, 300));
  window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 200));
});
await page.addStyleTag({ content: '* { transition: none !important; animation: none !important }' });
await page.evaluate(() => {
  document.querySelectorAll('*').forEach(el => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 1 || (cs.transform && cs.transform !== 'none' && cs.transform !== 'matrix(1, 0, 0, 1, 0, 0)')) {
      el.setAttribute('style', (el.getAttribute('style') || '') + ';opacity:1 !important;transform:none !important');
    }
  });
});
await page.screenshot({ path: out, fullPage: true, animations: 'disabled' });
await browser.close();
console.log('shot', url, '->', out);
