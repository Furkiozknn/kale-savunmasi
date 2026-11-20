// Duman testi: sayfa açılıyor mu, konsol hatası var mı, oyun başlıyor mu, bir etkileşim durumu değiştiriyor mu,
// telefon görünümünde taşma var mı. Hiçbir bağımlılık depoya eklenmez.
//
// Kullanım:  node test/duman.mjs [klasör]    (klasör verilmezse deponun kökü)
// Gerekli:   `playwright-core` (depo dışında olabilir: PW_MODULE=<node_modules'ın bulunduğu klasör>)
//            ve bir Chromium tabanlı tarayıcı: CHROMIUM=<exe yolu>.
// Çıktı: "ok" / "n/a" / "FAIL" satırları, en sonda RESULT; hata varsa çıkış kodu 1.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.argv[2] || join(here, '..'));
const req = createRequire(process.env.PW_MODULE ? pathToFileURL(join(process.env.PW_MODULE, 'x.js')) : import.meta.url);
const { chromium } = req('playwright-core');
const IGNORED = /gc\.zgo\.at|goatcounter|fonts\.googleapis\.com|fonts\.gstatic\.com/;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.woff2': 'font/woff2', '.glb': 'model/gltf-binary', '.mp4': 'video/mp4' };
let failed = false;
const ok = (m) => console.log('ok   ' + m);
const fail = (m) => { failed = true; console.log('FAIL ' + m); };
const check = (c, m) => (c ? ok(m) : fail(m));

const srv = createServer((rq, rs) => {
  const p = normalize(decodeURIComponent(new URL(rq.url, 'http://x').pathname)).split('\\').join('/').replace(/^\/+/, '');
  let f = join(root, p || 'index.html');
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { rs.writeHead(404, { 'content-type': 'text/plain' }).end('404'); return; }
  rs.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' }).end(readFileSync(f));
});
await new Promise((r) => srv.listen(0, '127.0.0.1', r));
const base = 'http://127.0.0.1:' + srv.address().port + '/';
console.log('hedef: ' + root);
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM || undefined, args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const ready = (page) => page.waitForFunction(() => { const b = document.getElementById('bPlay'); return b && !b.disabled; }, null, { timeout: 120000 });
try {
  for (const [name, vp, mobile] of [['masaustu 1366x768', { width: 1366, height: 768 }, false], ['telefon 390x844', { width: 390, height: 844 }, true]]) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile });
    await ctx.route(IGNORED, (r) => r.fulfill({ status: 200, body: '' }));
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    page.on('response', (r) => { if (r.status() >= 400 && !IGNORED.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.goto(base + '?menu&debug&low', { waitUntil: 'load' });
    await ready(page);
    ok(`[${name}] sayfa açıldı, "Başla" düğmesi etkin`);
    check(/Hisar/.test(await page.title()), `[${name}] başlık: ${await page.title()}`);
    const lay = await page.evaluate(() => {
      const w = innerWidth, small = [];
      for (const e of document.querySelectorAll('#ocard button, #ocard a')) {
        const r = e.getBoundingClientRect();
        if (r.width && (r.left < -1 || r.right > w + 1)) small.push('taşma:' + (e.id || e.textContent.slice(0, 12)));
        else if (r.width && r.height < 43.5 && !e.classList.contains('foot')) small.push('küçük:' + (e.id || e.textContent.slice(0, 12)));
      }
      return { wide: document.documentElement.scrollWidth > w + 1, small };
    });
    check(!lay.wide && !lay.small.length, `[${name}] ana menüde taşma yok, hedefler en az 44 px ${lay.small.join(',')}`);
    if (await page.$('#bNews')) {
      check((await page.getAttribute('#aHub', 'href')) === 'https://furkiozknn.github.io/', `[${name}] "Tüm oyunlar" merkez sayfaya gidiyor`);
      await page.click('#bNews');
      const n = await page.evaluate(() => {
        const c = document.getElementById('ocard'), r = c.getBoundingClientRect();
        return { items: c.querySelectorAll('.nlist li').length, ach: c.querySelectorAll('.achgrid li').length, fit: r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1 };
      });
      check(n.items >= 3 && n.ach >= 8, `[${name}] Yenilikler kartı açıldı (${n.items} madde, ${n.ach} başarım)`);
      check(n.fit, `[${name}] Yenilikler kartı ekrana sığıyor`);
      await page.keyboard.press('Escape');
      check(await page.evaluate(() => !!document.getElementById('bPlay')), `[${name}] Esc ile ana menüye dönüldü`);
    } else console.log(`n/a  [${name}] Yenilikler kartı bu sürümde yok`);
    await page.click('#bPlay');
    await page.waitForFunction(() => window.hisar && window.hisar.running, null, { timeout: 30000 });
    ok(`[${name}] oyun başladı`);
    const before = await page.evaluate(() => ({ towers: hisar.towers.length, gold: hisar.gold }));
    await page.evaluate(() => hisarSelect(0));
    await page.keyboard.press('Digit1');
    const after = await page.evaluate(() => ({ towers: hisar.towers.length, gold: hisar.gold }));
    check(after.towers === before.towers + 1 && after.gold < before.gold, `[${name}] kule kurma durumu değiştirdi (kule ${before.towers}->${after.towers}, altın ${before.gold}->${after.gold})`);
    await page.keyboard.press('KeyP');
    check(await page.evaluate(() => hisar.paused), `[${name}] P ile duraklatma çalışıyor`);
    check(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)), `[${name}] oyun ekranında yatay taşma yok`);
    check(errs.length === 0, `[${name}] konsol/sayfa/ağ hatası yok` + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
    await ctx.close();
  }
  { // bot: dalgaları oynar, hata yok, yerel kayda yazmaz
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
    await ctx.route(IGNORED, (r) => r.fulfill({ status: 200, body: '' }));
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base + '?auto&debug&low', { waitUntil: 'load' });
    const r = await page.evaluate(() => hisarSim(600));
    check(r.wave >= 3 && r.errors === 0 && errs.length === 0, `bot en az 3. dalgaya ulaştı, oyun içi hata yok (dalga ${r.wave})`);
    check(await page.evaluate(() => localStorage.getItem('arena.hisar.ach') === null && localStorage.getItem('arena.hisar.best') === null), 'bot yerel kayda yazmadı');
    await ctx.close();
  }
  { // eski kayıtla açılış (rekor 7) ve başarım yazımı
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
    await ctx.route(IGNORED, (r) => r.fulfill({ status: 200, body: '' }));
    await ctx.addInitScript(() => { if (!localStorage.getItem('arena.hisar.best')) localStorage.setItem('arena.hisar.best', '7'); });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base + '?debug&low', { waitUntil: 'load' });
    await ready(page);
    check(await page.evaluate(() => /7/.test(document.querySelector('#ocard .best')?.textContent || '')), 'eski rekor (7. dalga) ana menüde görünüyor');
    await page.click('#bPlay');
    await page.waitForFunction(() => window.hisar && window.hisar.running);
    // bot mantığı oyuncu kaydıyla da çalışır: kuleler kurulur, başarım yazılır
    const ach = await page.evaluate(() => { hisarSim(900, true); return JSON.parse(localStorage.getItem('arena.hisar.ach') || '{}'); });
    check(Object.keys(ach).length >= 1, 'oyun sırasında başarım kaydı yazıldı: ' + Object.keys(ach).join(','));
    check(errs.length === 0, 'kayıtlı oyunda sayfa hatası yok');
    await ctx.close();
  }
} catch (e) { fail('beklenmeyen: ' + (e && e.message)); }
await browser.close();
srv.close();
console.log(failed ? 'RESULT FAIL' : 'RESULT OK');
process.exit(failed ? 1 : 0);
