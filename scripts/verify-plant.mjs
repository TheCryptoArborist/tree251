import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin = 'http://127.0.0.1:3000';
const ids = ['live-oak', 'overcup-oak', 'black-gum', 'chaste-tree', 'bald-cypress'];
const output = 'review-output';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 1100 }, reducedMotion: 'reduce' });
    // Keep verification local: do not submit forms or send analytics to external services.
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === origin) return route.continue();
      return route.abort();
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`${origin}/plant`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.waitForSelector('#hero-title');
    const logo = page.locator('header img[alt="The Arborist logo"]').first();
    await logo.waitFor();
    await page.waitForFunction(() => {
      const image = document.querySelector('header img[alt="The Arborist logo"]');
      return image && image.complete && image.naturalWidth > 0;
    });
    assert.equal(await page.locator('details.species-profile').count(), 5);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await page.locator('.species-profile a[href^="http"]').count(), 0);
    for (const id of ids) {
      await page.locator(`.tree-card a[href="#${id}"]`).click();
      await page.waitForFunction(id => document.getElementById(id).open, id);
      assert.equal(new URL(page.url()).pathname, '/plant');
      assert.equal(await page.locator(`#${id} .profile-topic`).count(), 6);
    }
    await page.locator('#live-oak .species-actions a[data-stage="planting"]').click();
    assert.equal(await page.locator('#tab-planting').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#panel-planting').isVisible(), true);
    await page.locator('#tab-planting').press('End');
    assert.equal(await page.locator('#tab-after').getAttribute('aria-selected'), 'true');
    await page.locator('#tab-after').press('Home');
    assert.equal(await page.locator('#tab-before').getAttribute('aria-selected'), 'true');
    await page.locator('#live-oak a[href="#ref-live-oak"]').first().click();
    await page.waitForFunction(() => document.getElementById('guide-sources').open);
    await page.evaluate(() => {
      document.querySelectorAll('details').forEach(detail => detail.open = false);
      window.dispatchEvent(new Event('beforeprint'));
    });
    assert.equal(await page.locator('.plant-guide details:not([open])').count(), 0);
    await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
    assert.equal(await page.locator('.plant-guide details[open]').count(), 0);
    await page.goto(`${origin}/plant#black-gum`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.getElementById('black-gum').open);
    await page.goto(`${origin}/plant`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${output}/plant-native-${width}.png`, fullPage: false });
    if (width === 1440) {
      await page.screenshot({ path: `${output}/plant-native-full-page.png`, fullPage: true });
      await page.locator('.tree-card a[href="#live-oak"]').click();
      await page.screenshot({ path: `${output}/plant-native-species.png`, fullPage: false });
    }
    assert.deepEqual(errors, []);
    results.push({ width, logoLoaded: true, speciesGuides: 5, outboundSpeciesLinks: 0, careTabs: 'passed', printRestore: 'passed', directSpeciesLink: 'passed', horizontalOverflow: false, javascriptErrors: errors });
    await context.close();
  }
  await writeFile(`${output}/browser-checks.json`, JSON.stringify({ passed: true, results }, null, 2));
  console.log(JSON.stringify({ passed: true, results }, null, 2));
} catch (error) {
  await writeFile(`${output}/browser-checks.json`, JSON.stringify({ passed: false, results, error: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}
