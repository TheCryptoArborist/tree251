"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import GiveawayAcknowledgment from "./GiveawayAcknowledgment";
import { ArboristLogo, consultationAnchor } from "@/components/ConsultBranding";
import "./plant-guide.css";
import "./plant-flow.css";
import "./species-profiles.css";
import "./plant-polish.css";
import { PhotoCredits, PlantingDiagram } from "./PlantingVisuals";
import { InventoryNotice, InventoryCards, InventoryProfiles, InventoryReferences, AftercareSummary } from "./InventorySections";

type Stage = "before" | "planting" | "after";
const stages: Stage[] = ["before", "planting", "after"];

export default function PlantingGuide() {
  const [activeStage, setActiveStage] = useState<Stage>("before");
  const rootRef = useRef<HTMLDivElement>(null);
  function focusTab(stage: Stage) {
    requestAnimationFrame(() => {
      rootRef.current?.querySelector<HTMLButtonElement>(`#tab-${stage}`)?.focus({ preventScroll: true });
    });
  }
  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, stage: Stage) {
    const index = stages.indexOf(stage);
    let next: Stage;
    switch (event.key) {
      case "ArrowRight": next = stages[(index + 1) % stages.length]; break;
      case "ArrowLeft": next = stages[(index + stages.length - 1) % stages.length]; break;
      case "Home": next = stages[0]; break;
      case "End": next = stages[stages.length - 1]; break;
      default: return;
    }
    event.preventDefault();
    setActiveStage(next);
    focusTab(next);
  }
  function goToStage(stage: Stage) {
    setActiveStage(stage);
    focusTab(stage);
    rootRef.current?.querySelector(".care-tabs")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  }
  useEffect(() => {
    let printDetails: Array<[HTMLDetailsElement, boolean]> = [];
    let printActive = false;
    function beforePrint() {
      if (printActive) return;
      printActive = true;
      printDetails = Array.from(rootRef.current?.querySelectorAll<HTMLDetailsElement>("details") ?? [])
        .map((detail) => [detail, detail.open]);
      printDetails.forEach(([detail]) => { detail.open = true; });
    }
    function afterPrint() {
      printDetails.forEach(([detail, open]) => { detail.open = open; });
      printActive = false;
      printDetails = [];
    }
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    function reveal(hash: string, scroll: boolean) {
      if (!hash || hash.length < 2) return;
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      // Preserve previously shared links without retaining the wrong species guide.
      if (id === "black-gum" || id === "ref-black-gum") {
        id = id === "black-gum" ? "ogeechee-tupelo" : "ref-ogeechee-tupelo";
        window.history.replaceState(null, "", `#${id}`);
      }
      const target = document.getElementById(id);
      if (!target || !root?.contains(target)) return;
      const detail = target instanceof HTMLDetailsElement ? target : target.closest("details");
      if (detail instanceof HTMLDetailsElement) detail.open = true;
      if (scroll) requestAnimationFrame(() => target.scrollIntoView({ behavior: "auto", block: "start" }));
    }
    function onClick(event: MouseEvent) {
      const element = event.target instanceof Element ? event.target : null;
      const anchor = element?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (anchor) {
        const hash = anchor.getAttribute("href") || "";
        reveal(hash, false);
        if (anchor.closest(".tree-shortcuts") && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          const target = document.getElementById(hash.slice(1));
          const summary = target?.querySelector<HTMLElement>("summary");
          requestAnimationFrame(() => summary?.focus({ preventScroll: true }));
        }
      }
    }
    const onHashChange = () => reveal(window.location.hash, true);
    root.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    reveal(window.location.hash, true);
    return () => {
      root.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);
  // app/layout.tsx supplies SiteHeader, the real site logo, and mobile contact actions.
  return <div className="plant-guide" ref={rootRef}>
 
<div className="print-guide-heading"><strong>The Arborist · Your New Tree: Planting &amp; Care</strong><br />Peter Toler · ISA Certified Arborist · 251-622-3200 · tree251.xyz/plant</div>
<div className="hero-shell"><section aria-labelledby="hero-title" className="hero container" id="top"><div className="hero-copy"><p className="eyebrow">YOUR NEW TREE · A PRACTICAL CARE GUIDE</p><h1 id="hero-title">Your new tree.<br /><em>A healthy start.</em></h1><p className="intro">From a three-gallon pot to your landscape. Find your tree, give it room to grow, and get planting and first-year care right.</p><div className="hero-actions"><a className="button" href="#care" onClick={() => setActiveStage("before")}>Still in the pot? <span aria-hidden="true">→</span></a><a className="button secondary" href="#care" onClick={() => setActiveStage("planting")}>Planting steps <span aria-hidden="true">↓</span></a></div><p className="hero-note">Peter Toler · ISA Certified Arborist<br /><time dateTime="2026-11-06">Updated November 6, 2026</time></p></div></section></div>
 
<div className="container"> <nav aria-label="Guide sections" className="section-nav"><a href="#tree-guide"><b>01</b> Know your tree</a><a data-stage="before" href="#care" onClick={() => setActiveStage("before")}><b>02</b> Before planting</a><a data-stage="planting" href="#care" onClick={() => setActiveStage("planting")}><b>03</b> Plant it right</a><a data-stage="after" href="#care" onClick={() => setActiveStage("after")}><b>04</b> First-year care</a><button type="button" id="print-guide" onClick={() => window.print()}><svg aria-hidden="true" fill="none" height="15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="15"><path d="M6 9V3h12v6M6 17H3v-7h18v7h-3M6 14h12v7H6zM17 12h1"></path></svg> Print guide</button></nav></div>
 
<section aria-labelledby="tree-title" className="section container" id="tree-guide"><InventoryNotice /><div className="section-heading"><div><p className="eyebrow">01 / GET TO KNOW YOUR TREE</p><h2 id="tree-title">Know your tree. Plan for its future.</h2></div><p className="description">All ten trees are listed by common name. Compare mature dimensions, then open your tree for its planting and aftercare instructions.</p></div><div className="space-notice"><p><strong>Plan for the mature tree.</strong> Allow room for its branches and a broad, connected area of suitable soil for its roots. Crown width is not a minimum lawn-area requirement. Site conditions and tree form affect the space needed.</p></div><InventoryCards /><InventoryProfiles onStage={setActiveStage} /></section>

<section aria-labelledby="care-title" className="section care-section" id="care"><div className="container"><div className="section-heading"><div><p className="eyebrow">02–04 / FROM NURSERY POT TO ESTABLISHMENT</p><h2 id="care-title">A good start changes everything.</h2></div><p className="description">Start with the stage your tree is in now: still in its container, ready to plant, or already in the ground.</p></div> <div aria-label="Tree care stages" className="care-tabs" role="tablist"><button type="button" aria-controls="panel-before" className="care-tab" data-panel="before" id="tab-before" role="tab" aria-selected={activeStage === "before"} tabIndex={activeStage === "before" ? 0 : -1} onClick={() => setActiveStage("before")} onKeyDown={(event) => handleTabKeyDown(event, "before")}><svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="20"><path d="M5 12h14l-2 9H7l-2-9ZM4 9h16v3H4zM12 9V3M12 7C7 7 7 3 7 3c4 0 5 4 5 4ZM12 6c0-4 5-4 5-4s0 4-5 4Z"></path></svg> Before planting</button><button type="button" aria-controls="panel-planting" className="care-tab" data-panel="planting" id="tab-planting" role="tab" aria-selected={activeStage === "planting"} tabIndex={activeStage === "planting" ? 0 : -1} onClick={() => setActiveStage("planting")} onKeyDown={(event) => handleTabKeyDown(event, "planting")}><svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="20"><path d="M2 16h20M4 20h2M10 20h4M18 20h2M12 16V5M12 9C6 9 6 3 6 3s6 0 6 6ZM12 12c6 0 6-6 6-6s-6 0-6 6Z"></path></svg> Planting day</button><button type="button" aria-controls="panel-after" className="care-tab" data-panel="after" id="tab-after" role="tab" aria-selected={activeStage === "after"} tabIndex={activeStage === "after" ? 0 : -1} onClick={() => setActiveStage("after")} onKeyDown={(event) => handleTabKeyDown(event, "after")}><svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="20"><path d="M12 2S5 11 5 15a7 7 0 0 0 14 0c0-4-7-13-7-13Z"></path><path d="M8 15a4 4 0 0 0 4 4"></path></svg> First-year care</button></div> <div aria-labelledby="tab-before" className="care-panel" id="panel-before" role="tabpanel" tabIndex={0} hidden={activeStage !== "before"}> <div className="care-panel-header"><h3>Care for it now.<br />Plant when the site is ready.</h3><p>The nursery pot is temporary housing, not a required growing stage. Keep the root ball moist and protect the tree while you prepare its permanent location.</p></div> <div className="care-steps"> <article className="care-step"><span className="step-no">01</span><div><h4>Transport it by the container.</h4><p>Lift the pot—not the trunk or branches. Secure it so it cannot tip or slide, and protect the tree from highway wind. An enclosed vehicle works well when the tree fits without damage.</p></div></article> <article className="care-step"><span className="step-no">02</span><div><h4>Give it a sheltered outdoor spot.</h4><p>Keep the tree upright and protect it from strong wind and intense afternoon sun. Avoid hot pavement. Leave drainage holes open, and do not let the pot sit in standing water.</p></div></article> <article className="care-step"><span className="step-no">03</span><div><h4>Check daily. Water as needed.</h4><p>Feel below the potting-mix surface. When it begins to dry, water slowly and thoroughly until excess water drains away. Aim for a moist root ball, not continuously saturated soil.</p></div></article> <article className="care-step"><span className="step-no">04</span><div><h4>Protect the pot during a hard freeze.</h4><p>Aboveground roots are more exposed to cold. Protect the container or temporarily move the unplanted tree to a sheltered, unheated location. Continue checking moisture.</p></div></article> <article className="care-step"><span className="step-no">05</span><div><h4>Choose a site for the mature tree.</h4><p>Check buildings, sidewalks, driveways, nearby trees, and overhead utilities. Large trees do not belong under power lines just because they fit today. Consider drainage and connected rooting space.</p></div></article> <article className="care-step"><span className="step-no">06</span><div><h4>Complete utility locating before digging.</h4><p>Contact Alabama 811 before digging and follow the notice period and instructions on your locate request. Confirm all notified utilities have responded. Private irrigation, electrical, septic, or propane lines may need separate locating.</p></div></article> </div><div className="care-note"><svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="20"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7h.01"></path></svg><p><strong>No need to wait for a bigger tree.</strong> Fall and winter are favorable planting seasons in Alabama. Plant after the site is ready and you can provide care; avoid saturated soil and extreme conditions. Ask for guidance if container storage will last several weeks or longer.</p></div><div className="care-next"><button type="button" data-next="planting" onClick={() => goToStage("planting")}>Next: planting day <svg aria-hidden="true" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="18"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></button></div> </div> <div aria-labelledby="tab-planting" className="care-panel" id="panel-planting" role="tabpanel" tabIndex={0} hidden={activeStage !== "planting"}> <div className="care-panel-header"><h3>Wide hole.<br />Visible root flare. Room to grow.</h3><p>Measure the actual root ball—not the container label. Correct depth and root condition matter more than adding products to the planting hole.</p></div><PlantingDiagram /><aside className="inventory-exceptions" aria-label="Important species-specific planting needs"><p><strong>Longleaf Pine:</strong> Keep the central growing bud above the soil and mulch, especially on a grass-stage plant. Do not mow, top, or bury it. <a href="#longleaf-pine">Read Longleaf Pine care.</a></p><p><strong>Pawpaw:</strong> Support the root ball, protect the taproot, and shelter small or shade-grown trees from sudden strong sun. Do not automatically tear apart or shave the roots. <a href="#pawpaw">Read Pawpaw care.</a></p><p><strong>Match drainage to the tree:</strong> Ogeechee Tupelo, Bald Cypress, and Sweetbay Magnolia suit moist sites; Chaste Tree, Longleaf Pine, and American Beech should not be planted into a chronically waterlogged pocket.</p></aside> <div className="care-steps"> <article className="care-step"><span className="step-no">01</span><div><h4>Moisten the root ball.</h4><p>Water thoroughly and let the container drain. Prepare the planting area before removing the tree from the pot so the roots are not left exposed.</p></div></article> <article className="care-step"><span className="step-no">02</span><div><h4>Find the flare. Inspect the roots.</h4><p>Gently uncover the point where the trunk widens into its main roots. Remove the container completely. Inspect for circling or crossing roots. Do not indiscriminately tear apart every root ball; Pawpaw and Longleaf Pine need especially careful handling. Get help when substantial root correction is needed.</p></div></article> <article className="care-step"><span className="step-no">03</span><div><h4>Dig two to three times as wide.</h4><p>Keep a firm base under the root ball. Set the uppermost structural roots at or slightly above the surrounding soil surface, with the root flare visible. Do not bury the flare or dig a deep hole that lets the tree settle.</p></div></article> <article className="care-step"><span className="step-no">04</span><div><h4>Backfill with the existing soil.</h4><p>Position the tree upright. Break up large clods and backfill with the soil you removed. Avoid an isolated pocket of compost or potting mix. Settle gently with water; do not stomp the soil into a hard mass.</p></div></article> <article className="care-step"><span className="step-no">05</span><div><h4>Water, then mulch broadly.</h4><p>Moisten the root ball and backfill. Make a broad mulch ring, ideally at least four feet across where space allows. Use two to three inches over surrounding soil, with no more than about one inch over the root ball. Keep mulch off the trunk and the flare visible. Keep the central bud of Longleaf Pine completely clear.</p></div></article> <article className="care-step"><span className="step-no">06</span><div><h4>Stake only if support is necessary.</h4><p>A secure tree usually needs no staking. If the root ball rocks, use flexible supports that allow some trunk movement. Check attachments and remove them as soon as the tree is stable, generally within one growing season.</p></div></article> </div><div className="care-note"><svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="20"><path d="M20 4c0 9-4 15-10 15a6 6 0 0 1-6-6C4 7 11 4 20 4Z"></path><path d="M4 21 15 10M8 17v-5M8 17h5"></path></svg><p><strong>Skip the extra stress.</strong> Avoid heavy pruning at planting and do not routinely fertilize the first year. Remove broken or dead branches as needed, retain healthy foliage, and focus on watering, mulch, and protection from damage.</p></div><div className="care-next"><button type="button" data-next="after" onClick={() => goToStage("after")}>Next: first-year care <svg aria-hidden="true" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="18"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></button></div> </div> <div aria-labelledby="tab-after" className="care-panel" id="panel-after" role="tabpanel" tabIndex={0} hidden={activeStage !== "after"}> <div className="care-panel-header"><h3>Water the roots.<br />Watch the conditions.</h3><p>A watering calendar is only a starting point. Check the original root ball and the adjoining soil; their moisture levels can differ, even when the lawn looks wet.</p></div> <AftercareSummary /><div className="watering-highlight"><div><p className="eyebrow">A STARTING AMOUNT, NOT A RULE</p><h4>About 2 gallons per inch of trunk diameter.</h4></div><p>For example, a ½-inch trunk starts around <strong>1 gallon per watering</strong>; a 1-inch trunk starts around <strong>2 gallons</strong>. Adjust for soil, weather, and actual moisture. A three-gallon container does <strong>not</strong> mean three gallons of water. For grass-stage Longleaf Pine, use root-ball moisture rather than a trunk-diameter formula. Water slowly and do not add water to an already saturated root ball.</p></div> <div className="timeline"><div><p className="eyebrow">FIRST TWO WEEKS</p><h4>Check every day.</h4><p>Water when needed. Warm, dry, or windy conditions can require frequent watering. Skip watering when the root ball is still adequately moist.</p></div><div><p className="eyebrow">NEXT TWO TO THREE MONTHS</p><h4>Keep checking frequently.</h4><p>Every two or three days may be an appropriate watering interval during dry weather. Let actual moisture and drainage—not the calendar—determine timing.</p></div><div><p className="eyebrow">REST OF THE FIRST YEAR</p><h4>Expand the watered area.</h4><p>Reduce frequency gradually as roots establish. Continue moisture checks through dry periods and the first summer. Water a wider area as roots spread.</p></div></div> <div className="care-steps"><article className="care-step"><span className="step-no">01</span><div><h4>Keep the mulch ring maintained.</h4><p>Keep grass and weeds away from the trunk. Maintain a broad, shallow ring—not a mulch volcano. Keep the root flare visible and protect the trunk from mowers and string trimmers.</p></div></article><article className="care-step"><span className="step-no">02</span><div><h4>Resist unnecessary fertilizer and pruning.</h4><p>Routine fertilizer is generally unnecessary in the first year. Base later fertilization on soil testing and an identified need. Avoid heavy pruning while the tree establishes; remove broken or dead branches when needed.</p></div></article></div> <div className="care-note"><svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="20"><path d="M12 2S5 11 5 15a7 7 0 0 0 14 0c0-4-7-13-7-13Z"></path><path d="M8 15a4 4 0 0 0 4 4"></path></svg><p><strong>New leaves do not automatically mean “established.”</strong> Roots need time to grow beyond the original ball. Continue monitoring through the first growing season and later droughts. Establishment time varies with tree size and site conditions.</p></div> </div></div></section>
 
<section className="section container" id="questions"><div className="faq-layout"><div className="faq-intro"><p className="eyebrow">A FEW COMMON QUESTIONS</p><h2>Before you grab<br />the shovel.</h2><p>Small decisions now can make a big difference as your tree grows.</p></div><div className="faqs"> <details><summary>Does my tree need a bigger pot first?<span className="plus">+</span></summary><div className="answer"><p>No. A healthy three-gallon tree can go directly into a suitable landscape location. Container storage is temporary; a larger pot is not a required step before planting.</p></div></details> <details><summary>Does “check daily” mean “water daily”?<span className="plus">+</span></summary><div className="answer"><p>No. Check moisture daily at first, but water only when needed. Weather, soil, drainage, and root-ball moisture determine timing. Wet soil needs air, not more water.</p></div></details> <details><summary>What counts as green space for my tree?<span className="plus">+</span></summary><div className="answer"><p>Look for suitable, connected soil where roots can expand. Consider soil depth, drainage, compaction, and barriers such as pavement—not only surface area. Crown width describes branch spread; it is not a formula for required green space. Have a restricted site assessed before planting.</p></div></details> <details><summary>Should I add potting soil to the planting hole?<span className="plus">+</span></summary><div className="answer"><p>Backfill with the existing soil rather than creating an isolated pocket of potting mix or compost. For compacted or poorly drained sites, seek advice on the broader soil and drainage problem.</p></div></details> <details><summary>What if my tree is not listed here?<span className="plus">+</span></summary><div className="answer"><p>Keep or photograph the identification tag. Confirm the species and cultivar, then check its mature size, growing-space needs, and site preferences before planting. Contact The Arborist when identification or placement is uncertain.</p></div></details> </div></div></section>
 
<GiveawayAcknowledgment />

<section aria-labelledby="contact-title" className="contact container" id="contact"><div><p className="eyebrow">RIGHT TREE. RIGHT PLACE.</p><h2 id="contact-title">Need help with<br />your new tree?</h2><p>Get guidance on your tree’s identity, mature size, growing space, planting location, root concerns, and aftercare.</p></div><div className="contact-right"><a aria-label="Call The Arborist at 251-622-3200" href="tel:+12516223200">251-622-3200</a><a className="button" href={consultationAnchor}>Request planting guidance <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16"><path d="M5 12h14m-6-6 6 6-6 6"></path></svg></a><small>Peter Toler · ISA Certified Arborist</small></div></section>
 
<section className="source-section container"><details className="sources" id="guide-sources"><summary>Sources &amp; further reading <span className="plus">+</span></summary><p>These guides summarize the university Extension and forestry publications credited below. Source numbers open these credits without leaving the guide. General information does not replace advice about your specific tree and planting site.</p><InventoryReferences /><ul className="other-reference-list"><li id="ref-root-space">Iowa State Extension and University of California IPM: connected soil, root growth, and growing space.</li><li id="ref-establishment">Alabama Extension: <a href="https://www.aces.edu/blog/topics/landscaping/planting-establishing-woody-landscape-plants/" target="_blank" rel="noopener noreferrer">Planting &amp; Establishing Woody Landscape Plants</a>; <a href="https://www.aces.edu/blog/topics/lawn-garden/proper-tree-planting/" target="_blank" rel="noopener noreferrer">Proper Tree Planting</a>.</li></ul><h3 className="other-reference-heading">Additional planting references</h3><ul className="onsite-additional-sources"><li>Alabama Extension · Tree selection, planting &amp; care</li><li>Alabama Extension · Planting &amp; establishing woody landscape plants</li><li>Alabama Extension · Proper tree planting</li><li>Colorado State Forest Service · How to plant a tree</li><li>Iowa State Extension · Tree root-system space</li><li>Alabama Extension · Container gardening</li><li>Iowa State Extension · Overwintering unplanted trees</li><li>Alabama 811 · Locate requests &amp; safe digging</li><li>Alabama 811 · Public vs. private utilities</li><li>UF/IFAS · Planting &amp; establishing trees</li><li>University of California IPM · Provide for roots</li><li>UF/IFAS · Live oak placement and care</li></ul><p className="source-editorial-note">Species list and care guidance updated November 6, 2026. Guidance is general; it does not replace an assessment of your tree or planting site.</p></details><PhotoCredits /></section>
 
<div className="container"><a href="#top" className="inline-back-top">Back to top ↑</a></div><footer className="theme-footer"><div className="container theme-footer-inner"><div><div className="shared-logo-slot"><ArboristLogo showText={false} compact /></div><div className="theme-footer-brand">The Arborist</div><p>Peter Toler · ISA Certified Arborist<br />Independent tree-care guidance for the Gulf Coast.</p><p style={{marginTop: "10px"}}><a href="tel:+12516223200">251-622-3200</a> · <Link href="/">tree251.xyz</Link></p></div><div><nav aria-label="Footer navigation" className="theme-footer-links"><Link href="/#services">Services</Link><Link href="/#about">About Peter</Link><a href={consultationAnchor}>Request Guidance</a><a href="#top">Back to top ↑</a></nav><p className="theme-footer-note">Educational guidance does not replace an assessment of your tree and planting site.<br />Your New Tree: Planting &amp; Care · /plant</p></div></div></footer>

</div>;
}
