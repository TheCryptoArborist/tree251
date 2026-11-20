import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

// Run against a production build or a specified preview. Never submit forms.
const origin = new URL(process.env.CREDENTIALS_TEST_ORIGIN || "http://127.0.0.1:3000").origin;
const output = process.env.CREDENTIALS_OUTPUT || "review-output/credentials";
const expectedTitles = [
  "ISA Certified Arborist",
  "Tree Risk Assessment Qualification",
  "Prescription Pruning Qualification"
];
const expectedImages = [
  "/assets/credential-isa-certified-arborist.jpg?v=6",
  "/assets/credential-traq.png?v=6",
  "/assets/credential-ppq.png?v=6"
];
const source = await readFile("components/CredentialBadges.tsx", "utf8");
assert(!source.includes("ScenarioCardsSection"), "Badges must not restore legacy scenario cards");
await mkdir(output, { recursive: true });
const results = [];
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    // Block analytics, external embeds, and write requests during inspection.
    await context.route("**/*", async (route) => {
      const request = route.request();
      if (new URL(request.url()).origin !== origin || !["GET", "HEAD"].includes(request.method())) {
        return route.abort();
      }
      return route.continue();
    });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    try {
      const response = await page.goto(`${origin}/#credentials`, { waitUntil: "domcontentloaded" });
      assert(response?.ok(), "Homepage must load successfully");
      const section = page.locator("#credentials");
      assert.equal(await section.count(), 1, "Exactly one credentials section");
      await section.waitFor({ state: "visible" });
      assert.equal(await section.getAttribute("aria-labelledby"), "credentials-heading");
      assert.deepEqual(await section.locator("h3").allTextContents(), expectedTitles);
      assert.equal(await section.locator("article").count(), 3);
      const placement = await section.evaluate((element) => ({
        previous: element.previousElementSibling?.id,
        nextText: element.nextElementSibling?.textContent || ""
      }));
      assert.equal(placement.previous, "about", "Credentials must immediately follow About");
      assert(placement.nextText.includes("Google Reviews"), "Reviews must follow credentials");
      for (let index = 0; index < 3; index++) {
        const image = section.locator("img").nth(index);
        assert.equal(await image.getAttribute("src"), expectedImages[index]);
        assert((await image.getAttribute("alt"))?.length, "Each badge needs alternative text");
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(async (element) => { await element.decode(); });
        assert(await image.evaluate((element) => element.complete && element.naturalWidth > 0), "Badge image must load");
        const box = await image.boundingBox();
        assert(box && box.width > 0 && box.x >= 0 && box.x + box.width <= width + 1, "Badge must fit viewport");
      }
      const aboutLink = page.locator("#about a").filter({ hasText: "Verify current ISA profile" });
      const footerLink = page.locator("footer a").filter({ hasText: "Verify ISA Credentials" });
      assert.equal(await aboutLink.count(), 1);
      assert.equal(await footerLink.count(), 1);
      const verificationUrl = await aboutLink.getAttribute("href");
      assert.equal(await footerLink.getAttribute("href"), verificationUrl);
      assert.equal(new URL(verificationUrl).hostname, "certificates.directory.isa-arbor.com");
      const boxes = await section.locator("article").evaluateAll((cards) => cards.map((card) => {
        const { x, y, width, height } = card.getBoundingClientRect();
        return { x, y, width, height };
      }));
      if (width < 768) {
        assert(boxes[1].y >= boxes[0].y + boxes[0].height, "Mobile badges must stack");
      } else {
        assert(Math.abs(boxes[0].y - boxes[2].y) < 2, "Desktop/tablet badges must share a row");
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "No horizontal page overflow");
      let violations = [];
      if (process.env.AXE_SCRIPT) {
        await page.addScriptTag({ path: process.env.AXE_SCRIPT });
        const audit = await page.evaluate(async () => window.axe.run({ include: ["#credentials"] }));
        violations = audit.violations;
        await writeFile(join(output, `accessibility-${width}.json`), JSON.stringify(audit, null, 2));
        assert.equal(violations.length, 0, "Credentials accessibility audit must pass");
      }
      await section.screenshot({ path: join(output, `credentials-${width}.png`), animations: "disabled" });
      results.push({ width, status: "passed", credentials: expectedTitles, verificationUrl, boxes, accessibilityViolations: violations.length });
      console.log(`PASS ${width}px: 3 loaded badges, correct placement, responsive layout, verification links preserved`);
    } catch (error) {
      await page.screenshot({ path: join(output, `failure-${width}.png`), fullPage: true }).catch(() => {});
      throw error;
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(join(output, "results.json"), JSON.stringify({ origin, results }, null, 2));
}
