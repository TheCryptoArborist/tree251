import Image from "next/image";
import photographs from "./plant-photos.json";

export function SpeciesPhotos({ species }: { species: string }) {
  // These local WebP assets are already resized to at most 960px. Serve them
  // directly so opening a guide does not depend on an image-conversion request.
  if (!photographs.some(photo => photo.species === species)) return null;
  return <div className="species-photos">
    {photographs.filter(photo => photo.species === species).map(photo => <figure key={photo.src} className="species-photo">
      <div className="photo-frame"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} unoptimized loading="lazy" /></div>
      <figcaption><strong>{photo.title}</strong><span>{photo.author} · <a href="#photo-credits">Photo credit &amp; license</a></span></figcaption>
    </figure>)}
    {species === "chaste-tree" && <p className="cultivar-photo-note">The supplied Chaste Tree is ‘Shoal Creek’. These labeled photos show other selections of the same species, not ‘Shoal Creek’; they are identification examples, not photographs of the supplied cultivar.</p>}
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
    <figcaption>General guidance for a well-drained site. Longleaf Pine must have its central growing bud clear of soil and mulch; see its own planting instructions. Poor drainage or substantial root defects need site-specific advice. <a href="#guide-sources">Planting sources</a></figcaption>
  </figure>;
}
