import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin = process.env.PLANT_TEST_ORIGIN || 'http://127.0.0.1:3000';
const output = 'review-output';
const species = ["ogeechee-tupelo", "live-oak", "overcup-oak", "bald-cypress", "chaste-tree", "longleaf-pine", "chickasaw-plum", "sweetbay-magnolia", "american-beech", "pawpaw"];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const width of [320,390,768,1440]) {
    const context = await browser.newContext({ viewport: {width,height: width < 600 ? 844 : 1100}, reducedMotion: 'reduce' });
    await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const page = await context.newPage();
    const errors=[];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${origin}/plant`, {waitUntil:'networkidle'});
    await page.waitForFunction(() => { const img=document.querySelector('header img');return img?.complete && img.naturalWidth>0; });
    assert.equal(await page.locator('#choose-tree .tree-picker-buttons a').count(),10);
    const finder = await page.locator('#choose-tree').boundingBox();
    if (width === 390) assert(finder.y < 650, `Mobile selector starts too low: ${finder.y}`);
    const fontSizes = await page.locator('#choose-tree .tree-picker-buttons a, .care-tab, .hero-actions .button').evaluateAll(nodes => nodes.map(n=>parseFloat(getComputedStyle(n).fontSize)));
    assert(fontSizes.every(size=>size>=13));
    assert.equal(await page.locator('a[aria-label="Back to top"]').isVisible(),false);
    assert.equal(await page.locator('.inline-back-top').count(),1);
    const telLinks=await page.locator('a[href^="tel:"]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
    assert(telLinks.length>=3);
    assert(telLinks.every(href=>href==='tel:+12516223200'));
    const text=await page.locator('.plant-guide').innerText();
    assert(!text.includes('Do not multiply') && !text.includes('14,400'));
    for (const id of species) {
      await page.locator(`#choose-tree .tree-picker-buttons a[href="#${id}"]`).click();
      await page.waitForFunction(id=>document.getElementById(id).open,id);
      assert.equal(await page.locator(`#${id} .species-photo`).count(), ['live-oak','overcup-oak','chaste-tree','bald-cypress'].includes(id) ? 2 : 0);
      assert.equal(await page.locator(`#${id} .profile-topic`).count(),6);
      assert.equal(await page.locator(`#${id} a[href^="http"]`).count(),0);
    }
    await page.locator('.species-photo img').evaluateAll(images=>images.forEach(img=>img.loading='eager'));
    await page.waitForFunction(()=>[...document.querySelectorAll('.species-photo img')].every(img=>img.complete&&img.naturalWidth>0));
    const imagePaths=await page.locator('.species-photo img').evaluateAll(images=>images.map(img=>img.getAttribute('src')));
    assert(imagePaths.every(src=>src.startsWith('/')));
    await page.locator('#live-oak .species-photo a[href="#photo-credits"]').first().click();
    await page.waitForFunction(()=>document.getElementById('photo-credits').open);
    assert.equal(await page.locator('#photo-credits .photo-credit-list li').count(),8);
    await page.locator('#live-oak .species-actions a[data-stage="planting"]').click();
    assert.equal(await page.locator('#tab-planting').getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('#panel-planting .planting-illustration').isVisible(),true);
    await page.locator('#tab-planting').press('End');
    assert.equal(await page.locator('#tab-after').getAttribute('aria-selected'),'true');
    await page.locator('#tab-after').press('Home');
    assert.equal(await page.locator('#tab-before').getAttribute('aria-selected'),'true');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.goto(`${origin}/plant#ogeechee-tupelo`,{waitUntil:'networkidle'});
    await page.waitForFunction(()=>document.getElementById('ogeechee-tupelo').open);
    await page.screenshot({path:`${output}/plant-polished-species-${width}.png`});
    await page.goto(`${origin}/plant`,{waitUntil:'networkidle'});
    await page.screenshot({path:`${output}/plant-polished-${width}.png`});
    if (width===1440) {
      await page.screenshot({path:`${output}/plant-polished-full-page.png`,fullPage:true});
      await page.locator('.hero-actions .secondary').click();
      await page.locator('.planting-illustration').scrollIntoViewIfNeeded();
      await page.screenshot({path:`${output}/plant-polished-planting.png`});
      const stateBefore=await page.locator('details').evaluateAll(nodes=>nodes.map(n=>n.open));
      await page.emulateMedia({media:'print'});
      assert.equal(await page.locator('header').first().isVisible(),false);
      assert.equal(await page.locator('nav[aria-label="Mobile contact actions"]').isVisible(),false);
      for (const stage of ['before','planting','after']) assert.equal(await page.locator(`#panel-${stage}`).isVisible(),true);
      assert.equal(await page.locator('.print-guide-heading').isVisible(),true);
      await page.pdf({path:`${output}/plant-print-review.pdf`,format:'Letter',preferCSSPageSize:true,printBackground:false});
      await page.emulateMedia({media:'screen'});
      assert.deepEqual(await page.locator('details').evaluateAll(nodes=>nodes.map(n=>n.open)),stateBefore);
      assert.equal(await page.locator('#tab-planting').getAttribute('aria-selected'),'true');
      const imageMeta=await page.locator('meta[property="og:image"]').first().getAttribute('content');
      const imageUrl=new URL(imageMeta,origin);
      const image=await context.request.get(origin+imageUrl.pathname+imageUrl.search);
      assert.equal(image.status(),200);
      const png=await image.body();
      assert.equal(png.readUInt32BE(16),1200);
      assert.equal(png.readUInt32BE(20),630);
      await writeFile(`${output}/plant-share-card.png`,png);
      assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'),'summary_large_image');
      assert((await (await context.request.get(`${origin}/sitemap.xml`)).text()).includes('https://tree251.xyz/plant'));
      if (process.env.AXE_SCRIPT) {
        await page.goto(`${origin}/plant`,{waitUntil:'networkidle'});
        await page.addScriptTag({path:process.env.AXE_SCRIPT});
        const audit=await page.evaluate(async()=>window.axe.run(document.querySelector('.plant-guide'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
        await writeFile(`${output}/plant-accessibility.json`,JSON.stringify(audit,null,2));
        const blocking=audit.violations.filter(v=>['serious','critical'].includes(v.impact));
        assert.deepEqual(blocking.map(v=>({id:v.id,help:v.help,nodes:v.nodes.map(n=>n.target)})),[]);
      }
      await page.goto(origin,{waitUntil:'networkidle'});
      assert(await page.locator('#resources-projects a[href="/plant"]').count()>0);
    }
    assert.deepEqual(errors,[]);
    results.push({width,phoneLinks:telLinks.length,selectorTop:finder.y,localPhotos:8,workingSpeciesGuides:10,overflow:false,javascriptErrors:0});
    await context.close();
  }
  await writeFile(`${output}/polish-checks.json`,JSON.stringify({passed:true,results},null,2));
} catch(error) {
  await writeFile(`${output}/polish-checks.json`,JSON.stringify({passed:false,results,error:String(error)},null,2));
  throw error;
} finally {
  await browser.close();
}
