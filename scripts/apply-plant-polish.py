"""One-time, checksum-guarded polish of the reviewed /plant draft.
Run only on review/plant-education-2026-11-05. No dependency or production edits.
"""
import hashlib
import json
import re
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path('.')
EXPECTED = {
    'app/plant/PlantingGuide.tsx': '9d3f7553fc788b4bce2c7e04ddd7ee966bef2e97985d8ff3541d4bcd229c6e3b',
    'components/SiteHeader.tsx': 'ee5cb18685303f36da7be4f41d4dbf3e37b3f796355196f9e98bf74ccda8380c',
    'components/TheArboristHomePage.tsx': 'b897a86d72e1675ca79bc8e12d88c2ab37cdf22530a1b458ef15872ca446ad2f',
    'app/sitemap.ts': 'ab263283124120447d37ebfbac1e0749cdb30df5bc358045a0e25480224b8e62',
    'app/plant/page.tsx': '0b8acea59aca7449196d43d9a2eb05ab3f4da7c22c97936bb05c5dcb39013ffb'
}
for name, digest in EXPECTED.items():
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest() == digest, f'Unexpected source change: {name}'

media = Path('media-import')
manifest = media / 'plant-photos.json'
assert hashlib.sha256(manifest.read_bytes()).hexdigest() == '349fe61ae80837566dcfc6d6f40c5ec3e17bdf013dc3a788da8f422a01c283f5'
photos = json.loads(manifest.read_text())
assert len(photos) == 10
asset_dir = Path('public/plant'); asset_dir.mkdir(parents=True, exist_ok=True)
for photo in photos:
    filename = Path(photo['src']).name
    raw = (media / filename).read_bytes()
    assert hashlib.sha256(raw).hexdigest() == photo['sha256'], filename
    (asset_dir / filename).write_bytes(raw)
Path('app/plant/plant-photos.json').write_text(json.dumps(photos, indent=2) + '\n')
logo = Image.open('public/arborist-logo-cropped.png').convert('RGBA')
logo.thumbnail((200,200), Image.Resampling.LANCZOS)
logo.save(asset_dir / 'brand-logo.png', optimize=True)

visuals = r'''import Image from "next/image";
import photographs from "./plant-photos.json";

const trees = [
  ["live-oak", "Southern live oak"],
  ["overcup-oak", "Overcup oak"],
  ["black-gum", "Black gum"],
  ["chaste-tree", "Chaste tree / vitex"],
  ["bald-cypress", "Bald cypress"]
] as const;

export function TreeFinder() {
  return <aside className="tree-finder" aria-labelledby="tree-finder-title" id="tree-selector">
    <p className="eyebrow">START WITH YOUR TREE</p>
    <h2 id="tree-finder-title">Which tree did you bring home?</h2>
    <p>Choose the name on its identification tag.</p>
    <nav aria-label="Choose your tree" className="tree-picker">
      {trees.map(([id, name]) => <a key={id} href={`#${id}`} data-species-link aria-controls={id}>
        <span>{name}</span><span aria-hidden="true">↗</span>
      </a>)}
    </nav>
    <a className="tree-finder-compare" href="#tree-guide">Compare mature sizes <span aria-hidden="true">↓</span></a>
  </aside>;
}

export function SpeciesPhotos({ species }: { species: string }) {
  return <div className="species-photos">
    {photographs.filter(photo => photo.species === species).map(photo => <figure key={photo.src} className="species-photo">
      <div className="photo-frame"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 640px) 85vw, (max-width: 1000px) 40vw, 520px" loading="lazy" /></div>
      <figcaption><strong>{photo.title}</strong><span>{photo.author} · <a href="#photo-credits">Photo credit &amp; license</a></span></figcaption>
    </figure>)}
    {species === "chaste-tree" && <p className="cultivar-photo-note">These photos show named selections. Your tree may have a different form or flower color; use its tag to confirm the cultivar.</p>}
  </div>;
}

export function PhotoCredits() {
  return <details id="photo-credits" className="sources photo-credits">
    <summary>Photo credits &amp; reuse licenses <span className="plus">+</span></summary>
    <p>These are species examples, not photographs of the trees distributed. Images are hosted on this website, resized, and converted to WebP with their composition preserved. Each image retains the license listed below; that license does not apply to unrelated website content.</p>
    <ul className="photo-credit-list">
      {photographs.map(photo => <li key={photo.src}><strong>{photo.title}</strong><span>{photo.author} · {photo.license}</span><span><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">Original source ↗</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">License terms ↗</a></span></li>)}
    </ul>
    <p className="credit-note">Source and license links open a new tab. The tree identification and care guides remain available here.</p>
  </details>;
}

export function PlantingDiagram() {
  return <figure className="planting-illustration" aria-labelledby="planting-illustration-title">
    <div className="diagram-heading"><p className="eyebrow">AT A GLANCE</p><h4 id="planting-illustration-title">Plant wide. Keep the flare visible.</h4><p>A container-grown tree in a well-drained planting site. Diagram is not to scale.</p></div>
    <svg className="planting-cross-section" viewBox="0 0 800 400" role="img" aria-labelledby="planting-svg-title planting-svg-desc">
      <title id="planting-svg-title">Planting a container-grown tree at the correct depth</title>
      <desc id="planting-svg-desc">The pot is removed. The root flare sits just above the surrounding soil surface. A wide, shallow hole surrounds the root ball, which rests on firm, undisturbed soil. Backfill is the soil removed from the hole. A thin, broad mulch layer is kept away from the trunk and root flare.</desc>
      <defs><pattern id="plant-soil-pattern" width="32" height="26" patternUnits="userSpaceOnUse"><circle cx="8" cy="9" r="2" fill="#a18465"/><path d="M18 20h8" stroke="#a18465" strokeWidth="2"/></pattern></defs>
      <path d="M30 205H770V365H30Z" fill="#645444"/>
      <path d="M30 205H770V365H30Z" fill="url(#plant-soil-pattern)"/>
      <path d="M110 205L292 332H508L690 205Z" fill="#a28869" stroke="#d3b895" strokeWidth="2"/>
      <path d="M301 200Q400 185 499 200L477 332H323Z" fill="#79624b" stroke="#c8aa81" strokeWidth="2"/>
      <path d="M393 42L392 173Q389 187 369 201L348 210Q380 206 400 195Q420 206 452 210L431 201Q411 187 408 173L407 42Z" fill="#d0aa76" stroke="#ead0a5" strokeWidth="2"/>
      <g fill="none" stroke="#d0aa76" strokeWidth="5" strokeLinecap="round"><path d="M391 197L349 231L329 266M405 201L448 238L474 272M396 204L387 249L370 281L365 319M410 217L423 260L445 310M352 229L340 246L315 251M444 235L463 243L487 247"/></g>
      <g stroke="#d0aa76" strokeWidth="7" fill="none" strokeLinecap="round"><path d="M399 115L365 86M401 84L433 57"/></g>
      <g fill="#7fb5a0"><ellipse cx="350" cy="78" rx="28" ry="11" transform="rotate(27 350 78)"/><ellipse cx="447" cy="47" rx="28" ry="11" transform="rotate(-25 447 47)"/><ellipse cx="399" cy="28" rx="13" ry="26"/></g>
      <path d="M120 191Q202 182 290 197L290 205H120Z M510 197Q598 182 680 191V205H510Z" fill="#b49060"/>
      <path d="M30 205H300M500 205H770" stroke="#d7ded2" strokeWidth="2" strokeDasharray="8 7"/>
      <g fill="none" stroke="#f6c95a" strokeWidth="2"><path d="M110 375H690M110 366V385M690 366V385"/><path d="M472 138L431 190M229 141L218 190M547 318L490 333"/></g>
      <g fill="#f6c95a" stroke="#0e1b24" strokeWidth="3"><circle cx="480" cy="125" r="23"/><circle cx="400" cy="374" r="23"/><circle cx="566" cy="312" r="23"/><circle cx="225" cy="121" r="23"/></g>
      <g fill="#102027" fontSize="26" fontFamily="Arial, sans-serif" fontWeight="700" textAnchor="middle"><text x="480" y="134">1</text><text x="400" y="383">2</text><text x="566" y="321">3</text><text x="225" y="130">4</text></g>
    </svg>
    <ol className="diagram-key">
      <li><b>1</b><div><strong>Root flare visible</strong><p>Locate the first structural roots. Keep them at or slightly above the surrounding soil surface.</p></div></li>
      <li><b>2</b><div><strong>Wide, shallow hole</strong><p>Dig 2–3 times the root-ball width. Backfill with the soil you removed.</p></div></li>
      <li><b>3</b><div><strong>Firm support below</strong><p>Rest the root ball on undisturbed soil so it does not settle too deeply. Remove the pot completely.</p></div></li>
      <li><b>4</b><div><strong>Broad mulch ring</strong><p>Use 2–3 inches over the surrounding soil; keep any mulch over the root ball thin and keep the trunk and flare clear.</p></div></li>
    </ol>
    <figcaption>General guidance for a well-drained site. Poor drainage or substantial root defects need site-specific advice. <a href="#guide-sources">Planting sources</a></figcaption>
  </figure>;
}
'''
Path('app/plant/PlantingVisuals.tsx').write_text(visuals)

css = r'''/* Finishing pass: scoped to /plant, preserving the site's shared theme. */
.plant-guide{--sans:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.plant-guide .hero{grid-template-columns:1.05fr 1fr;gap:60px;padding-top:48px;padding-bottom:38px;align-items:center}
.plant-guide .hero h1{font-size:62px;line-height:1.02;margin-bottom:22px}
.plant-guide .hero .intro{max-width:530px;font-size:18px;line-height:1.65;margin-bottom:23px}
.plant-guide .hero-actions{gap:12px;margin:0 0 20px}
.plant-guide .hero-actions .button{font-size:14px;min-height:48px;padding:12px 20px;letter-spacing:0;text-transform:none}
.plant-guide .hero-note{font-size:13px;line-height:1.65;display:block;margin-top:0}
.plant-guide .eyebrow{font-size:12px;letter-spacing:.13em}
.plant-guide .tree-finder{padding:28px;border:1px solid rgba(155,203,188,.25);border-radius:24px;background:rgba(234,241,232,.04);box-shadow:0 16px 44px rgba(0,0,0,.12)}
.plant-guide .tree-finder .eyebrow{color:var(--amber);margin-bottom:12px}
.plant-guide .tree-finder h2{font-family:var(--sans);font-size:29px;font-weight:850;line-height:1.15;letter-spacing:-.035em;margin:0 0 12px}
.plant-guide .tree-finder>p:not(.eyebrow){font-size:15px;color:var(--muted);margin-bottom:20px}
.plant-guide .tree-picker{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.plant-guide .tree-picker a{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:50px;padding:11px 14px;background:#193039;border:1px solid rgba(155,203,188,.24);border-radius:12px;color:var(--ink);font-size:14px;font-weight:700;text-decoration:none;line-height:1.4}
.plant-guide .tree-picker a:last-child{grid-column:1/-1}
.plant-guide .tree-picker a>span:last-child{color:var(--amber)}
.plant-guide .tree-picker a:hover{border-color:var(--amber);background:#203b43}
.plant-guide .tree-finder-compare{display:inline-flex;align-items:center;gap:10px;min-height:44px;margin-top:12px;font-size:14px;color:var(--green);font-weight:700}
.plant-guide .section-nav{padding:17px 0;gap:16px;flex-wrap:wrap;justify-content:space-between}
.plant-guide .section-nav a,.plant-guide .section-nav button{font-size:14px;min-height:44px;display:inline-flex;align-items:center;gap:8px;line-height:1.35}
.plant-guide .section{padding-top:46px}
.plant-guide .space-notice{font-size:15px;line-height:1.7}
.plant-guide .size-context{font-size:14px;color:var(--muted);line-height:1.7;margin:22px 0 0;max-width:940px}
.plant-guide .tree-label,.plant-guide .tree-badge,.plant-guide .metric-label{font-size:12px;line-height:1.5}
.plant-guide .tree-metrics strong{line-height:1.2}
.plant-guide .space-guidance p{font-size:15px}
.plant-guide .species-card-link{font-size:14px;min-height:48px}
.plant-guide .species-profile,.plant-guide .sources,.plant-guide .care-tabs{scroll-margin-top:170px}
.plant-guide .species-facts dt{font-size:12px;letter-spacing:.05em}
.plant-guide .species-jump-nav a,.plant-guide .species-actions>a,.plant-guide .species-actions>a.button{font-size:14px;min-height:46px}
.plant-guide .species-cite{font-size:12px}
.plant-guide .species-photos{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:26px}
.plant-guide .species-photo{margin:0;min-width:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#0c1920}
.plant-guide .photo-frame{height:250px;display:flex;align-items:center;justify-content:center;padding:10px}
.plant-guide .photo-frame img{display:block;width:100%;height:100%;object-fit:contain}
.plant-guide .species-photo figcaption{padding:13px 15px 16px;border-top:1px solid var(--line);line-height:1.55}
.plant-guide .species-photo figcaption strong{display:block;font-size:14px;color:var(--ink);font-weight:700;margin-bottom:5px}
.plant-guide .species-photo figcaption span{display:block;font-size:12px;color:var(--muted)}
.plant-guide .species-photo figcaption a{color:var(--green)}
.plant-guide .cultivar-photo-note{grid-column:1/-1;font-size:13px;color:var(--muted);line-height:1.65;margin:0}
.plant-guide .care-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:5px;gap:5px}
.plant-guide .care-tab{font-size:15px;line-height:1.4;letter-spacing:0;text-transform:none;min-height:55px;padding:12px}
.plant-guide .planting-illustration{margin:0 0 28px;padding:26px;background:#142b33;border:1px solid var(--line);border-radius:20px;break-inside:avoid}
.plant-guide .diagram-heading .eyebrow{color:var(--amber);margin-bottom:8px}
.plant-guide .diagram-heading h4{font-family:var(--sans);font-weight:850;color:var(--ink);font-size:24px;line-height:1.25;margin:0 0 10px;letter-spacing:-.02em}
.plant-guide .diagram-heading>p:last-child{font-size:14px;line-height:1.6;color:var(--muted);margin-bottom:0}
.plant-guide .planting-cross-section{display:block;width:100%;max-width:800px;height:auto;margin:16px auto 20px}
.plant-guide .diagram-key{display:grid;grid-template-columns:1fr 1fr;gap:20px 26px;list-style:none;padding:0;margin:0}
.plant-guide .diagram-key li{display:flex;align-items:flex-start;gap:12px}
.plant-guide .diagram-key li>b{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:50%;background:var(--amber);color:#102027;font-size:15px}
.plant-guide .diagram-key strong{display:block;font-size:16px;line-height:1.4;color:var(--ink);margin-bottom:5px}
.plant-guide .diagram-key p{font-size:14px;line-height:1.65;color:var(--muted);margin:0}
.plant-guide .planting-illustration>figcaption{font-size:12px;color:var(--muted);line-height:1.65;margin-top:22px}
.plant-guide .planting-illustration>figcaption a{color:var(--green)}
.plant-guide .photo-credits{margin-top:18px}
.plant-guide .photo-credit-list{display:grid;grid-template-columns:1fr 1fr;gap:18px 28px;padding:0!important;list-style:none}
.plant-guide .photo-credit-list li{padding:0 0 16px;border-bottom:1px solid var(--line);margin:0;line-height:1.7}
.plant-guide .photo-credit-list strong,.plant-guide .photo-credit-list span{display:block;font-size:13px}
.plant-guide .photo-credit-list strong{color:var(--ink)}
.plant-guide .sources summary{font-size:15px;min-height:48px;align-items:center}
.plant-guide .sources>p,.plant-guide .sources li{font-size:14px;line-height:1.7}
.plant-guide .inline-back-top{display:inline-flex;min-height:44px;align-items:center;gap:8px;color:var(--amber);font-size:14px;font-weight:700}
.plant-guide .print-guide-heading{display:none}
/* The guide has an inline return link; the shared floating control must not cover instructions. */
body:has(.plant-guide)>a[aria-label="Back to top"]{display:none!important}
@media(max-width:1000px){.plant-guide .hero{gap:30px}.plant-guide .hero h1{font-size:49px}.plant-guide .tree-finder{padding:24px}.plant-guide .tree-finder h2{font-size:26px}}
@media(max-width:760px){.plant-guide .hero{grid-template-columns:1fr;padding-top:30px;padding-bottom:25px;gap:25px}.plant-guide .hero h1{font-size:46px;margin-bottom:15px}.plant-guide .hero .intro{font-size:16px;line-height:1.65;margin-bottom:18px;max-width:none}.plant-guide .hero-actions{margin-bottom:14px}.plant-guide .hero-actions .button{font-size:14px;flex:1;padding:12px}.plant-guide .hero-note{font-size:12px}.plant-guide .tree-finder h2{font-size:26px}.plant-guide .tree-finder-compare{margin-top:8px}.plant-guide .tree-picker{gap:8px}.plant-guide .tree-picker a{font-size:14px;min-height:48px;padding:10px 12px}.plant-guide .section-nav{display:grid;grid-template-columns:1fr 1fr;gap:4px 14px;padding:12px 0}.plant-guide .section-nav button{grid-column:1/-1;justify-content:center;border-top:1px solid var(--line);padding-top:12px;margin-top:5px}.plant-guide .section{padding-top:32px}.plant-guide .care-tab{font-size:14px;min-height:60px;padding:10px 6px}.plant-guide .care-tab svg{display:none}.plant-guide .photo-frame{height:225px}.plant-guide .species-profile,.plant-guide .sources{scroll-margin-top:165px}}
@media(max-width:640px){.plant-guide .container{width:calc(100% - 36px)}.plant-guide .hero h1{font-size:42px}.plant-guide .tree-finder{padding:20px;border-radius:18px}.plant-guide .tree-finder>p:not(.eyebrow){margin-bottom:15px}.plant-guide .species-photos{grid-template-columns:1fr;gap:14px}.plant-guide .photo-frame{height:225px}.plant-guide .planting-illustration{padding:18px}.plant-guide .diagram-heading h4{font-size:22px}.plant-guide .diagram-key{grid-template-columns:1fr;gap:17px}.plant-guide .diagram-key p{font-size:15px}.plant-guide .planting-illustration>figcaption{font-size:13px}.plant-guide .photo-credit-list{grid-template-columns:1fr}.plant-guide .section-nav a{font-size:14px}.plant-guide .species-facts dd{font-size:15px}.plant-guide .profile-topic p{font-size:16px}.plant-guide .theme-footer-inner{gap:16px}}
@media(max-width:370px){.plant-guide .hero h1{font-size:38px}.plant-guide .hero .eyebrow{font-size:12px}.plant-guide .hero-actions{flex-direction:column}.plant-guide .hero-actions .button{width:100%}.plant-guide .tree-finder h2{font-size:24px}.plant-guide .tree-picker a{font-size:13px}.plant-guide .care-tab{font-size:13px}}
@media print{
 @page{size:letter;margin:16mm 14mm}
 html:has(.plant-guide),body:has(.plant-guide){background:#fff!important;color:#111!important;overflow:visible!important;min-height:0!important}
 body:has(.plant-guide)>:not(main):not(script){display:none!important}
 body:has(.plant-guide) main{overflow:visible!important}
 .plant-guide{background:#fff!important;color:#111!important;font-size:10pt;line-height:1.45;padding:0!important}
 .plant-guide *{box-shadow:none!important;text-shadow:none!important;border-color:#bbb!important}
 .plant-guide .container{max-width:none!important;width:100%!important;margin:0!important}
 .plant-guide .print-guide-heading{display:block!important;font-size:10pt;border-bottom:1px solid #777;padding-bottom:8pt;margin-bottom:14pt;color:#111}
 .plant-guide .tree-finder,.plant-guide .hero-actions,.plant-guide .section-nav,.plant-guide .tree-grid,.plant-guide .species-photos,.plant-guide .photo-credits,.plant-guide .species-jump-nav,.plant-guide .care-tabs,.plant-guide .species-actions,.plant-guide .panel-next,.plant-guide .theme-footer,.plant-guide .inline-back-top{display:none!important}
 .plant-guide .hero{display:block!important;padding:0 0 12pt!important}
 .plant-guide .hero h1{font-size:26pt!important;line-height:1.1!important;margin:0 0 10pt!important}
 .plant-guide .hero .intro{font-size:11pt!important;max-width:none!important;margin-bottom:8pt!important}
 .plant-guide .hero-note{font-size:9pt!important}
 .plant-guide .section,.plant-guide .care-section,.plant-guide .species-library,.plant-guide .source-section{padding:14pt 0!important;margin:0!important;background:#fff!important;border:none!important}
 .plant-guide .section-heading,.plant-guide .care-panel-header{display:block!important;margin:0 0 10pt!important}
 .plant-guide h2{font-size:18pt!important;line-height:1.2!important;margin-bottom:8pt!important;break-after:avoid}
 .plant-guide h3{font-size:15pt!important;line-height:1.2!important;break-after:avoid}
 .plant-guide .section-heading .description,.plant-guide .size-context,.plant-guide .space-notice{font-size:10pt!important}
 .plant-guide .species-profile{break-before:page;break-inside:auto!important;margin:0!important;overflow:visible!important}
 .plant-guide .species-body{padding:12pt!important}
 .plant-guide .species-topics{display:block!important}
 .plant-guide .profile-topic{margin-bottom:11pt;break-inside:avoid}
 .plant-guide .profile-topic p,.plant-guide .species-introduction>p:first-child{font-size:10pt!important;line-height:1.5!important}
 .plant-guide .species-facts{grid-template-columns:1fr 1fr!important;margin:10pt 0!important;padding:10pt!important}
 .plant-guide .species-facts dt{font-size:8pt!important}.plant-guide .species-facts dd{font-size:10pt!important}
 .plant-guide .species-takeaway{display:block!important;margin:10pt 0 0!important;padding:8pt!important}
 .plant-guide .care-panel,.plant-guide .care-panel[hidden]{display:block!important;break-before:page;padding:0!important}
 .plant-guide .care-steps,.plant-guide .timeline{display:block!important}
 .plant-guide .care-step,.plant-guide .timeline>div{margin:0 0 9pt!important;padding:9pt!important;break-inside:avoid}
 .plant-guide .care-step h4{font-size:11pt!important}.plant-guide .care-step p,.plant-guide .timeline p{font-size:10pt!important;line-height:1.5!important}
 .plant-guide .planting-illustration{background:white!important;margin:12pt 0!important;padding:10pt!important;break-inside:avoid}
 .plant-guide .planting-cross-section{max-width:420px!important;margin:8pt auto!important}
 .plant-guide .diagram-heading h4{font-size:14pt!important}.plant-guide .diagram-heading p{font-size:9pt!important}
 .plant-guide .diagram-key{grid-template-columns:1fr 1fr!important;gap:9pt!important}.plant-guide .diagram-key strong{font-size:10pt!important}.plant-guide .diagram-key p{font-size:9pt!important;line-height:1.4!important}.plant-guide .diagram-key li>b{width:20px!important;height:20px!important;font-size:10pt!important}
 .plant-guide .planting-illustration>figcaption{font-size:8pt!important;margin-top:10pt!important}
 .plant-guide .faq-grid{display:block!important}.plant-guide .faqs details{break-inside:avoid}
 .plant-guide .contact{display:block!important;background:white!important;padding:12pt 0!important;break-inside:avoid}
 .plant-guide .contact .button{display:none!important}.plant-guide .contact-right{margin-top:8pt!important}
 .plant-guide .sources{break-before:page}.plant-guide .sources>p,.plant-guide .sources li{font-size:9pt!important;line-height:1.45!important}
 .plant-guide h1,.plant-guide h1 em,.plant-guide h2,.plant-guide h3,.plant-guide h4,.plant-guide p,.plant-guide strong,.plant-guide span,.plant-guide a,.plant-guide dt,.plant-guide dd,.plant-guide summary,.plant-guide small,.plant-guide figcaption,.plant-guide time{color:#111!important}
 .plant-guide .hero-shell,.plant-guide .care-section,.plant-guide .species-profile,.plant-guide .space-notice,.plant-guide .care-note,.plant-guide .watering-highlight{background:white!important}
}
'''
Path('app/plant/plant-polish.css').write_text(css)

p=Path('app/plant/PlantingGuide.tsx'); s=p.read_text()
s=s.replace('import "./species-profiles.css";', 'import "./species-profiles.css";\nimport "./plant-polish.css";\nimport { TreeFinder, SpeciesPhotos, PhotoCredits, PlantingDiagram } from "./PlantingVisuals";')
s=s.replace('let printDetails: Array<[HTMLDetailsElement, boolean]> = [];', 'let printDetails: Array<[HTMLDetailsElement, boolean]> = [];\n    let printActive = false;')
s=s.replace('function beforePrint() {\n      printDetails', 'function beforePrint() {\n      if (printActive) return;\n      printActive = true;\n      printDetails')
s=s.replace('printDetails.forEach(([detail, open]) => { detail.open = open; });', 'printDetails.forEach(([detail, open]) => { detail.open = open; });\n      printActive = false;\n      printDetails = [];')
hero='''<div className="print-guide-heading"><strong>The Arborist · Your New Tree: Planting &amp; Care</strong><br />Peter Toler · ISA Certified Arborist · 251-622-3200 · tree251.xyz/plant</div>
<div className="hero-shell"><section aria-labelledby="hero-title" className="hero container" id="top"><div className="hero-copy"><p className="eyebrow">YOUR NEW TREE · A PRACTICAL CARE GUIDE</p><h1 id="hero-title">Your new tree.<br /><em>A healthy start.</em></h1><p className="intro">From a three-gallon pot to your landscape. Find your tree, give it room to grow, and get planting and first-year care right.</p><div className="hero-actions"><a className="button" href="#care" onClick={() => setActiveStage("before")}>Still in the pot? <span aria-hidden="true">→</span></a><a className="button secondary" href="#care" onClick={() => setActiveStage("planting")}>Planting steps <span aria-hidden="true">↓</span></a></div><p className="hero-note">Peter Toler · ISA Certified Arborist<br /><time dateTime="2026-11-06">Updated November 6, 2026</time></p></div><TreeFinder /></section></div>'''
s,n=re.subn(r'<div className="hero-shell">.*?</aside> </section></div>',lambda _:hero,s,count=1,flags=re.S);assert n==1
s,n=re.subn(r'<aside className="start-note">.*?</aside>', '', s,count=1,flags=re.S);assert n==1
s=s.replace('<strong>Canopy size and green space are different.</strong> Crown width describes the spread of the branches. Green space is the usable soil available to roots. Do not multiply canopy dimensions to calculate a required lawn size.','<strong>Plan for the mature tree.</strong> Allow room for its branches and a broad, connected area of suitable soil for its roots.')
s,n=re.subn(r'<div className="space-explainer">.*?</div>', '<p className="size-context">Mature sizes are typical ranges, not limits. Cultivar, soil, and site conditions affect growth. Keep your tree’s tag and confirm any species not listed here before planting.</p>',s,count=1,flags=re.S);assert n==1
s,n=re.subn(r'<p className="species-size-note">.*?</p>', '', s,flags=re.S);assert n==5
for slug in ['live-oak','overcup-oak','black-gum','chaste-tree','bald-cypress']:
    pattern=r'(<details[^>]*id="'+slug+r'".*?<div className="species-body">)'
    s,n=re.subn(pattern,lambda m:m.group(1)+f'<SpeciesPhotos species="{slug}" />',s,count=1,flags=re.S);assert n==1,slug
pattern=r'(id="panel-planting".*?<div className="care-panel-header">.*?</div>)'
s,n=re.subn(pattern,lambda m:m.group(1)+'<PlantingDiagram />',s,count=1,flags=re.S);assert n==1
s=s.replace('Sources &amp; growing-space notes','Sources &amp; further reading')
s=s.replace('These guides are original summaries informed by the university Extension and forestry publications credited below. Source numbers open these credits on this page; no outside website is needed to read the tree guides. Mature dimensions vary by age, cultivar, and site. Growing-space recommendations require an assessment of the actual soil and surroundings.','These guides summarize the university Extension and forestry publications credited below. Source numbers open these credits without leaving the guide. General information does not replace advice about your specific tree and planting site.')
# Keep the photo-license links in a separate credits panel, not in the species guides.
s,n=re.subn(r'(<section className="source-section container">.*?</details>)(</section>)',r'\1<PhotoCredits />\2',s,count=1,flags=re.S);assert n==1
s=s.replace('<footer className="theme-footer">','<div className="container"><a href="#top" className="inline-back-top">Back to top ↑</a></div><footer className="theme-footer">')
assert 'Do not multiply' not in s and 'planning area' not in s.lower()
p.write_text(s)

p=Path('components/SiteHeader.tsx');s=p.read_text()
s=s.replace('const resourceNavItems = [','const resourceNavItems = [\n  { href: "/plant", label: "Tree Planting & Care", external: false },',1)
s=s.replace('<Link href="/#start-here" className="min-w-[5.2rem]', '<Link href="/plant" className="min-w-[8rem] rounded-full border border-[#f6c95a]/45 bg-[#f6c95a]/10 px-3 py-2.5 focus-ring">Planting &amp; Care</Link>\n          <Link href="/#start-here" className="min-w-[5.2rem]',1)
s=s.replace('text-[10px]','text-xs')
assert 'tel:+12516223200' in s
p.write_text(s)
p=Path('components/TheArboristHomePage.tsx');s=p.read_text();s=s.replace('const resources = [','''const resources = [
  {
    title: "Tree Planting & Care",
    text: "Brought home a new tree? Find your species, choose its planting location, and follow container care, planting, and first-year guidance.",
    href: "/plant",
    icon: TreePine,
    external: false
  },''',1);p.write_text(s)
p=Path('app/sitemap.ts');s=p.read_text();s=s.replace('  return [','  return [\n    { url: `${siteUrl}/plant`, changeFrequency: "monthly", priority: 0.8 },',1);p.write_text(s)

page=r'''import type { Metadata } from "next";
import PlantingGuide from "./PlantingGuide";

const title = "Your New Tree: Planting & Care";
const description = "Tree guides for live oak, overcup oak, black gum, chaste tree, and bald cypress. Learn mature size, site needs, container care, planting, and first-year aftercare.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/plant" },
  openGraph: { title: `${title} | The Arborist`, description, url: "/plant", type: "article", images: [{ url: "/plant/opengraph-image", width: 1200, height: 630, alt: "Your New Tree: Planting & Care — The Arborist, Peter Toler" }] },
  twitter: { card: "summary_large_image", title: `${title} | The Arborist`, description, images: ["/plant/opengraph-image"] }
};
export default function PlantPage() {
  const article = { "@context": "https://schema.org", "@type": "Article", headline: title, description, url: "https://tree251.xyz/plant", dateModified: "2026-11-06", author: { "@type": "Person", name: "Peter Toler", jobTitle: "ISA Certified Arborist" }, publisher: { "@type": "Organization", name: "The Arborist", url: "https://tree251.xyz" }, image: "https://tree251.xyz/plant/opengraph-image", inLanguage: "en-US" };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} /><PlantingGuide /></>;
}
'''
Path('app/plant/page.tsx').write_text(page)
og=r'''/* eslint-disable @next/next/no-img-element -- ImageResponse renders an image, not browser HTML. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "Your New Tree: Planting & Care — The Arborist, Peter Toler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/plant/brand-logo.png"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 68px", background: "linear-gradient(120deg, #050b12, #112d31)", color: "#f1eee5", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 22, letterSpacing: 3, color: "#f6c95a" }}>THE ARBORIST</div><div style={{ fontSize: 21, marginTop: 10 }}>Peter Toler · ISA Certified Arborist</div></div><img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={110} height={110} style={{ objectFit: "contain" }} /></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3 }}>Your new tree.</div><div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3, color: "#f6c95a" }}>Planting &amp; care.</div><div style={{ fontSize: 25, marginTop: 22, color: "#b8c6c3" }}>Know your tree. Plant it right. Help it thrive.</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #4a6261", paddingTop: 22, fontSize: 24 }}><div>tree251.xyz/plant</div><div>251-622-3200</div></div>
    </div>, size);
}
'''
Path('app/plant/opengraph-image.tsx').write_text(og)
Path('public/plant/PHOTO-LICENSES.json').write_text(json.dumps(photos,indent=2)+'\n')
print('Applied page polish, first-party photo assets, navigation, sitemap, social metadata, and print rules.')
