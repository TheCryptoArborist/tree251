import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

// Read-only layout checks: do not submit forms or load third-party embeds.
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
  for (const width of [320, 390, 640, 768, 1024, 1280, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
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
      const response = await page.goto(`${origin}/#about`, { waitUntil: "domcontentloaded" });
      assert(response?.ok(), "Homepage must load successfully");
      const about = page.locator("#about");
      const section = page.locator("#credentials");
      assert.equal(await section.count(), 1, "Exactly one credentials section");
      assert.equal(await about.locator("#credentials").count(), 1, "Credentials must be incorporated within About");
      await section.waitFor({ state: "visible" });
      assert.equal(await section.getAttribute("aria-labelledby"), "credentials-heading");
      assert.equal((await section.locator("h3").textContent()).trim(), "Professional Credentials");
      assert.deepEqual(await section.locator("h4").allTextContents(), expectedTitles);
      assert.equal(await section.locator("article").count(), 3);
      assert.equal(await page.getByText("Qualifications behind the assessment.", { exact: true }).count(), 0);
      const placement = await section.evaluate((element) => ({
        parentHeading: element.parentElement?.querySelector("h2")?.textContent,
        previousText: element.previousElementSibling?.textContent || "",
        nextAboutText: element.closest("#about")?.parentElement?.nextElementSibling?.textContent || ""
      }));
      assert.equal(placement.parentHeading, "Independent advice, not tree work sales.");
      assert(placement.previousText.includes("The assessment is focused on the tree"), "Badges must sit below the existing advice text");
      assert(placement.nextAboutText.includes("Google Reviews"), "Reviews must follow the combined About section");
      const portrait = about.locator("img").first();
      await portrait.scrollIntoViewIfNeeded();
      await portrait.evaluate(async (element) => { await element.decode(); });
      assert.equal(await portrait.getAttribute("alt"), "Peter Toler, ISA Certified Arborist");
      for (let index = 0; index < 3; index++) {
        const image = section.locator("img").nth(index);
        assert.equal(await image.getAttribute("src"), expectedImages[index]);
        assert((await image.getAttribute("alt"))?.length, "Each badge needs alternative text");
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(async (element) => { await element.decode(); });
        assert(await image.evaluate((element) => element.complete && element.naturalWidth > 0), "Badge image must load");
        const box = await image.boundingBox();
        assert(box && box.width >= 25 && box.height >= 35 && box.x >= 0 && box.x + box.width <= width + 1, "Badge must remain visible and fit the viewport");
      }
      const aboutLink = about.locator("a").filter({ hasText: "Verify current ISA profile" });
      const footerLink = page.locator("footer a").filter({ hasText: "Verify ISA Credentials" });
      assert.equal(await aboutLink.count(), 1);
      assert.equal(await footerLink.count(), 1);
      const verificationUrl = await aboutLink.getAttribute("href");
      assert.equal(await footerLink.getAttribute("href"), verificationUrl);
      assert.equal(new URL(verificationUrl).hostname, "certificates.directory.isa-arbor.com");
      const geometry = await about.evaluate((element) => {
        const rect = (node) => {
          const { x, y, width, height } = node.getBoundingClientRect();
          return { x, y, width, height };
        };
        return {
          photoCard: rect(element.firstElementChild.firstElementChild),
          credentials: rect(element.querySelector("#credentials")),
          cards: [...element.querySelectorAll("#credentials article")].map(rect)
        };
      });
      const { photoCard, credentials, cards } = geometry;
      if (width >= 1024) {
        assert(credentials.x >= photoCard.x + photoCard.width, "Desktop credentials must be directly right of the photo card");
        assert(credentials.y < photoCard.y + photoCard.height, "Desktop badges must sit alongside the photo card, not in a new full-width row");
      } else {
        assert(credentials.y >= photoCard.y + photoCard.height, "Narrow screens must place credentials after the photo and text");
      }
      assert(Math.abs(cards[0].y - cards[2].y) < 2, "The three credential badges should share a compact row");
      assert(await section.locator("article").evaluateAll((elements) => elements.every((element) => element.scrollWidth <= element.clientWidth + 1)), "Card text must not overflow");
      const sections = await page.evaluate(() => {
        const top = (id) => document.querySelector(id).getBoundingClientRect().top + window.scrollY;
        return {
          services: top("#services"),
          about: top("#about"),
          reviews: top("#google-reviews"),
          construction: top("#construction-tree-guidance"),
          resources: top("#resources-projects"),
          request: top("#consultation-request"),
          totalHeight: document.documentElement.scrollHeight
        };
      });
      if (width < 1024) {
        assert(sections.services < sections.about && sections.about < sections.reviews, "Mobile service, About, and review sections must appear in that order");
        assert(sections.reviews < sections.construction && sections.construction < sections.resources, "Secondary mobile sections must follow trust content");
        assert(sections.resources < sections.request, "Request form must remain reachable after resources");
      } else {
        assert(sections.services < sections.construction && sections.construction < sections.resources, "Desktop service content must retain its order");
        assert(sections.resources < sections.about && sections.about < sections.reviews, "Desktop About/Reviews must retain their positions");
      }
      if (width < 768) {
        const mobileServices = page.locator("#services .mobile-service-choices");
        assert(await mobileServices.isVisible(), "Compact service choices must appear on narrow screens");
        assert.equal(await mobileServices.locator(":scope > a").count(), 3, "Only three primary mobile service cards");
        const moreServices = mobileServices.locator("details");
        assert.equal(await moreServices.getAttribute("open"), null, "Extra services start collapsed");
        await moreServices.locator("summary").click();
        assert.equal(await moreServices.locator("a").count(), 3, "All additional services remain accessible");
        await moreServices.locator("summary").click();
        const mobileResources = page.locator("#resources-projects .sm\\:hidden details");
        assert.equal(await mobileResources.count(), 1, "Mobile resources should have an expandable list");
      }
      const permitLink = page.locator("#construction-tree-guidance #permit-checker-introduction a[href='/permit-checker']");
      assert.equal(await permitLink.count(), 1, "City permit checker remains discoverable");
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "No horizontal page overflow");
      let violations = [];
      if (process.env.AXE_SCRIPT) {
        await page.addScriptTag({ path: process.env.AXE_SCRIPT });
        const audit = await page.evaluate(async () => window.axe.run({ include: ["#about"] }));
        violations = audit.violations;
        await writeFile(join(output, `accessibility-${width}.json`), JSON.stringify(audit, null, 2));
        assert.equal(violations.length, 0, "Integrated About accessibility audit must pass");
      }
      await section.screenshot({ path: join(output, `credentials-${width}.png`), animations: "disabled" });
      await about.screenshot({ path: join(output, `about-${width}.png`), animations: "disabled" });
      if (width === 390) await page.screenshot({ path: join(output, "mobile-homepage-390.png"), fullPage: true, animations: "disabled" });
      results.push({ width, status: "passed", credentials: expectedTitles, verificationUrl, geometry, sections, accessibilityViolations: violations.length });
      console.log(`PASS ${width}px: 3 loaded badges integrated in About, correct placement, readable layout, verification links preserved`);
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
