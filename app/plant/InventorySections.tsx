import inventory from './tree-inventory.json';
import { SpeciesPhotos } from './PlantingVisuals';
import './inventory-care.css';

type Stage = 'before' | 'planting' | 'after';
const topics = [
  ['placement', 'Green space & planting location'],
  ['pot', 'Care while still in the pot'],
  ['plant', 'Planting your tree'],
  ['water', 'Watering & first-year aftercare'],
  ['season', 'What to expect through the seasons'],
  ['care', 'Ongoing care & cautions']
] as const;

export function InventoryNotice() {
  return <aside className="inventory-notice" aria-label="Confirmed tree list">
    <strong>All ten trees from the giveaway are included.</strong>
    <p>The confirmed list identifies <b>Ogeechee Tupelo</b>, not Black Gum, and the <b>‘Shoal Creek’ Chaste Tree</b> selection. Match your nursery tag to the common names below. A different tag should be checked before applying species-specific care.</p>
  </aside>;
}

export function InventoryCards() {
  return <div className="tree-grid inventory-grid">{inventory.map((tree, index) => <article className="tree-card" id={`card-${tree.id}`} key={tree.id}>
    <div className="tree-top"><span className="tree-index">{String(index + 1).padStart(2, '0')}</span><span className="tree-badge">{tree.badge}</span></div>
    <p className="tree-label">{tree.kind}</p><h3>{tree.name}</h3><p className="latin">{tree.botanical}</p>
    <div className="tree-metrics"><div><span className="metric-label">MATURE HEIGHT</span><strong>{tree.height}<small> ft</small></strong></div><div><span className="metric-label">CROWN WIDTH</span><strong>{tree.width}<small> ft</small></strong></div></div>
    <div className="space-guidance"><span className="metric-label">GREEN SPACE &amp; PLACEMENT</span><strong className="space-guidance-title">{tree.space}</strong><p>{tree.placement}</p></div>
    <a className="species-card-link" data-species-link href={`#${tree.id}`} aria-controls={tree.id} aria-label={`Read the ${tree.name} planting and aftercare guide`}>Planting &amp; aftercare <span aria-hidden="true">↓</span></a>
  </article>)}</div>;
}

export function InventoryProfiles({ onStage }: { onStage: (stage: Stage) => void }) {
  return <section className="species-library" aria-labelledby="species-library-title">
    <div className="species-library-heading"><p className="eyebrow">YOUR TREE'S OWN GUIDE</p><h2 id="species-library-title">Planting and aftercare by common name.</h2><p>Open your tree for its container care, planting location, first-year watering, and seasonal changes. Dimensions describe typical mature trees, not minimum yard sizes or guaranteed limits.</p></div>
    <nav className="species-jump-nav" aria-label="Choose a species guide">{inventory.map(tree => <a key={tree.id} data-species-link href={`#${tree.id}`}>{tree.name}</a>)}</nav>
    {inventory.map((tree, index) => <details className="species-profile" id={tree.id} key={tree.id}>
      <summary><span className="species-number">{String(index + 1).padStart(2, '0')}</span><span className="species-heading"><span className="species-name">{tree.name}{tree.cultivar ? ` (‘${tree.cultivar}’)` : ''}</span><i>{tree.botanical}</i></span><span className="species-kind">{tree.kind}</span><span aria-hidden="true" className="species-toggle">+</span></summary>
      <div className="species-body"><SpeciesPhotos species={tree.id} /><div className="species-introduction"><p>{tree.intro} <sup className="species-cite"><a href={`#ref-${tree.id}`} aria-label={`Sources for ${tree.name}`}>[{index + 1}]</a></sup></p></div>
        <dl className="species-facts"><div><dt>Mature height</dt><dd>{tree.height} ft</dd></div><div><dt>Crown width</dt><dd>{tree.width} ft</dd></div><div><dt>Sunlight</dt><dd>{tree.sun}</dd></div><div><dt>Soil &amp; drainage</dt><dd>{tree.soil}</dd></div></dl>
        <div className="species-topics">{topics.map(([key, title]) => <section className="profile-topic" key={key}><h4>{title}</h4><p>{tree[key]}</p></section>)}</div>
        <aside className="species-takeaway"><strong>{tree.name} priority</strong><p>{tree.takeaway}</p></aside>
        <div className="species-actions"><a className="button" data-stage="planting" href="#care" onClick={() => onStage('planting')}>Planting steps <span aria-hidden="true">→</span></a><a data-stage="before" href="#care" onClick={() => onStage('before')}>Still in the pot?</a><a data-stage="after" href="#care" onClick={() => onStage('after')}>Watering &amp; first-year care <span aria-hidden="true">→</span></a><a href="#choose-tree">Choose another tree ↑</a></div>
      </div>
    </details>)}
  </section>;
}

export function AftercareSummary() {
  return <section className="inventory-aftercare" aria-labelledby="inventory-aftercare-title"><h4 id="inventory-aftercare-title">First-year priorities for your tree</h4><p>The moisture checks below apply to all ten trees. Use your tree's own guidance alongside them—not one identical watering schedule for every species.</p><div className="aftercare-priorities">{inventory.map(tree => <article key={tree.id}><h5><a href={`#${tree.id}`}>{tree.name}{tree.cultivar ? ` (‘${tree.cultivar}’)` : ''}</a></h5><p>{tree.water}</p></article>)}</div></section>;
}

export function InventoryReferences() {
  return <><p>Common names and the ‘Shoal Creek’ selection were checked against the packing list supplied for the November 6, 2026 giveaway. The list establishes identity, not horticultural care. Species guidance uses the publications below together with the general planting sources. Original source links are optional and open a new tab.</p>
    <ol className="onsite-reference-list">{inventory.map((tree, index) => <li key={tree.id} id={`ref-${tree.id}`} tabIndex={-1}><strong>{index + 1}. {tree.name}</strong>{tree.sources.map(([label, url]) => <p key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label} ↗</a></p>)}</li>)}</ol></>;
}
