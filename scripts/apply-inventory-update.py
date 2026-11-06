from pathlib import Path
import hashlib, json, re

inventory=json.loads(Path('app/plant/tree-inventory.json').read_text())
ids=[t['id'] for t in inventory]; names=[t['name'] for t in inventory]
assert ids==['ogeechee-tupelo','live-oak','overcup-oak','bald-cypress','chaste-tree','longleaf-pine','chickasaw-plum','sweetbay-magnolia','american-beech','pawpaw']
assert len(set(names))==10
for tree in inventory:
    assert all(tree.get(k) for k in ['name','botanical','height','width','pot','plant','water','season','care','placement','sources'])
protected=['package.json','package-lock.json','components/SiteHeader.tsx','app/plant/opengraph-image.tsx','public/arborist-logo-cropped.png']
protected_hashes={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in protected}
def replace(s,old,new):
    assert old in s, f'Missing expected text: {old[:90]}'
    return s.replace(old,new)

p=Path('app/plant/InventorySections.tsx');s=p.read_text().replace("YOUR TREE'S","YOUR TREE’S").replace("your tree's","your tree’s");p.write_text(s)
p=Path('app/plant/PlantingGuide.tsx');s=p.read_text()
s=replace(s,'import { SpeciesPhotos, PhotoCredits, PlantingDiagram } from "./PlantingVisuals";', 'import { PhotoCredits, PlantingDiagram } from "./PlantingVisuals";\nimport { InventoryNotice, InventoryCards, InventoryProfiles, InventoryReferences, AftercareSummary } from "./InventorySections";')
a=s.index('<section aria-labelledby="tree-title"');b=s.index('<section aria-labelledby="care-title"',a)
s=s[:a]+'''<section aria-labelledby="tree-title" className="section container" id="tree-guide"><InventoryNotice /><div className="section-heading"><div><p className="eyebrow">01 / GET TO KNOW YOUR TREE</p><h2 id="tree-title">Know your tree. Plan for its future.</h2></div><p className="description">All ten trees are listed by common name. Compare mature dimensions, then open your tree for its planting and aftercare instructions.</p></div><div className="space-notice"><p><strong>Plan for the mature tree.</strong> Allow room for its branches and a broad, connected area of suitable soil for its roots. Crown width is not a minimum lawn-area requirement. Site conditions and tree form affect the space needed.</p></div><InventoryCards /><InventoryProfiles onStage={setActiveStage} /></section>

'''+s[b:]
a=s.index('<ol className="onsite-reference-list">');b=s.index('</ol>',a)+len('</ol>')
s=s[:a]+'''<InventoryReferences /><ul className="other-reference-list"><li id="ref-root-space">Iowa State Extension and University of California IPM: connected soil, root growth, and growing space.</li><li id="ref-establishment">Alabama Extension: <a href="https://www.aces.edu/blog/topics/landscaping/planting-establishing-woody-landscape-plants/" target="_blank" rel="noopener noreferrer">Planting &amp; Establishing Woody Landscape Plants</a>; <a href="https://www.aces.edu/blog/topics/lawn-garden/proper-tree-planting/" target="_blank" rel="noopener noreferrer">Proper Tree Planting</a>.</li></ul>'''+s[b:]
s=s.replace('Species information reviewed November 5, 2026.','Species list and care guidance updated November 6, 2026.')
s=replace(s,'      const target = document.getElementById(id);', '''      // Preserve previously shared links without retaining the wrong species guide.
      if (id === "black-gum" || id === "ref-black-gum") {
        id = id === "black-gum" ? "ogeechee-tupelo" : "ref-ogeechee-tupelo";
        window.history.replaceState(null, "", `#${id}`);
      }
      const target = document.getElementById(id);''')
s=replace(s,'<PlantingDiagram />', '''<PlantingDiagram /><aside className="inventory-exceptions" aria-label="Important species-specific planting needs"><p><strong>Longleaf Pine:</strong> Keep the central growing bud above the soil and mulch, especially on a grass-stage plant. Do not mow, top, or bury it. <a href="#longleaf-pine">Read Longleaf Pine care.</a></p><p><strong>Pawpaw:</strong> Support the root ball, protect the taproot, and shelter small or shade-grown trees from sudden strong sun. Do not automatically tear apart or shave the roots. <a href="#pawpaw">Read Pawpaw care.</a></p><p><strong>Match drainage to the tree:</strong> Ogeechee Tupelo, Bald Cypress, and Sweetbay Magnolia suit moist sites; Chaste Tree, Longleaf Pine, and American Beech should not be planted into a chronically waterlogged pocket.</p></aside>''')
s=replace(s,'Correct circling or crossing roots; dense root mats may need shaving. Get help when substantial root correction is needed.', 'Inspect for circling or crossing roots. Do not indiscriminately tear apart every root ball; Pawpaw and Longleaf Pine need especially careful handling. Get help when substantial root correction is needed.')
s=replace(s,'Contact Alabama 811. Allow at least two full working days, excluding the notification day, and follow the timing on your request. Confirm all responses. Private irrigation, electrical, septic, or propane lines may need separate locating.', 'Contact Alabama 811 before digging and follow the notice period and instructions on your locate request. Confirm all notified utilities have responded. Private irrigation, electrical, septic, or propane lines may need separate locating.')
s=replace(s,'<div className="watering-highlight">','<AftercareSummary /><div className="watering-highlight">')
s=replace(s,'A three-gallon container does <strong>not</strong> mean three gallons of water.', 'A three-gallon container does <strong>not</strong> mean three gallons of water. For grass-stage Longleaf Pine, use root-ball moisture rather than a trunk-diameter formula.')
s=replace(s,'Make a mulch ring at least four feet across.','Make a broad mulch ring, ideally at least four feet across where space allows.')
s=replace(s,'Keep mulch off the trunk and the flare visible.','Keep mulch off the trunk and the flare visible. Keep the central bud of Longleaf Pine completely clear.')
p.write_text(s)

p=Path('app/plant/TreePicker.tsx');s=p.read_text();a=s.index('const trees = [');b=s.index('] as const;',a)+len('] as const;')
s=s[:a]+"import inventory from './tree-inventory.json';\nconst trees = inventory;"+s[b:]
s=s.replace('Compare the five trees','Compare all ten trees');p.write_text(s)
p=Path('app/plant/page.tsx');s=p.read_text();a=s.index('const description = ');b=s.index(';',a)+1
s=s[:a]+'const description = "Planting and aftercare for all ten Mobile giveaway trees, including Ogeechee Tupelo, Longleaf Pine, Pawpaw, and Shoal Creek Chaste Tree. Common-name guides, mature sizes, and first-year care.";'+s[b:];p.write_text(s)
p=Path('app/plant/PlantingVisuals.tsx');s=p.read_text();a=s.index('const trees = [');b=s.index('export function SpeciesPhotos',a);s=s[:a]+s[b:]
s=replace(s,'  return <div className="species-photos">', '  if (!photographs.some(photo => photo.species === species)) return null;\n  return <div className="species-photos">')
s=replace(s,'These photos show named selections. Your tree may have a different form or flower color; use its tag to confirm the cultivar.', 'The supplied Chaste Tree is ‘Shoal Creek’. These labeled photos show other selections of the same species, not ‘Shoal Creek’; they are identification examples, not photographs of the supplied cultivar.')
s=replace(s,'<figcaption>General guidance for a well-drained site.', '<figcaption>General guidance for a well-drained site. Longleaf Pine must have its central growing bud clear of soil and mulch; see its own planting instructions.');p.write_text(s)
for name in ['app/plant/plant-photos.json','public/plant/PHOTO-LICENSES.json']:
    p=Path(name);photos=json.loads(p.read_text());assert isinstance(photos,list)
    photos=[photo for photo in photos if photo['species']!='black-gum'];assert len(photos)==8
    p.write_text(json.dumps(photos,indent=2,ensure_ascii=False)+'\n')

jsids=json.dumps(ids);jsnames=json.dumps(names)
p=Path('scripts/verify-plant.mjs');s=p.read_text()
s=re.sub(r"const ids = \[.*?\];",f'const ids = {jsids};',s,count=1)
s=re.sub(r"const names = \[.*?\];",f'const names = {jsnames};',s,count=1)
s=s.replace('.count(), 5)', '.count(), 10)').replace('five common-name','ten common-name').replace('speciesGuides: 5','speciesGuides: 10').replace('black-gum','ogeechee-tupelo')
s=s.replace("    assert.ok(pickerBox.y + pickerBox.height <= page.viewportSize().height - 80);", "    assert.ok(pickerBox.y < 250, 'Ten-tree selector must begin immediately after the header');")
s=s.replace("    assert.equal(await page.locator('.quick-species').count(), 0);", """    assert.equal(await page.locator('.quick-species').count(), 0);
    assert.equal(await page.locator('.aftercare-priorities article').count(), 10);
    assert.equal(await page.locator('#black-gum').count(), 0);
    assert.equal(await page.locator('.species-photo img[src*=\"black-gum\"]').count(), 0);
    assert((await page.locator('#chaste-tree').textContent()).includes('Shoal Creek'));
    assert((await page.locator('#longleaf-pine').textContent()).includes('bud'));
    assert((await page.locator('#pawpaw').textContent()).includes('taproot'));""")
s=s.replace("    await page.goto(`${origin}/plant#ogeechee-tupelo`, { waitUntil: 'networkidle' });", "    await page.goto(`${origin}/plant#black-gum`, { waitUntil: 'networkidle' });");p.write_text(s)
p=Path('scripts/verify-plant-polish.mjs');s=p.read_text()
s=re.sub(r"const species = \[.*?\];",f'const species = {jsids};',s,count=1)
s=s.replace('.count(),5)', '.count(),10)')
s=s.replace("assert.equal(await page.locator(`#${id} .species-photo`).count(),2);", "assert.equal(await page.locator(`#${id} .species-photo`).count(), ['live-oak','overcup-oak','chaste-tree','bald-cypress'].includes(id) ? 2 : 0);")
s=s.replace("'#black-gum .species-photo", "'#live-oak .species-photo").replace("'#black-gum .species-actions", "'#live-oak .species-actions")
s=s.replace(".photo-credit-list li').count(),10)", ".photo-credit-list li').count(),8)")
s=s.replace('plant#black-gum','plant#ogeechee-tupelo').replace("getElementById('black-gum')", "getElementById('ogeechee-tupelo')")
s=s.replace('localPhotos:10,workingSpeciesGuides:5','localPhotos:8,workingSpeciesGuides:10');p.write_text(s)
p=Path('.github/workflows/plant-live-check.yml');s=p.read_text()
s=re.sub(r"const ids=\[.*?\];",f'const ids={jsids};',s,count=1)
s=s.replace("html.includes('species-photo')&&html.includes('photo-credits')", "html.includes('ogeechee-tupelo')&&html.includes('sweetbay-magnolia')&&html.includes('pawpaw')")
s=s.replace(".tree-picker-buttons a').count(),5)",".tree-picker-buttons a').count(),10)")
s=s.replace(".species-photo').count(),10)",".species-photo').count(),8)")
s=s.replace("assert.equal(await page.locator(`#${id} .species-photo`).count(),2);", "assert.equal(await page.locator(`#${id} .species-photo`).count(),['live-oak','overcup-oak','chaste-tree','bald-cypress'].includes(id)?2:0);")
s=s.replace('localPhotos:10,treeButtons:5','localPhotos:8,treeButtons:10');p.write_text(s)
p=Path('.github/workflows/dependency-security-review.yml');s=p.read_text();s=s.replace("['live-oak','overcup-oak','black-gum','chaste-tree','bald-cypress']",jsids).replace('treeButtons:5','treeButtons:10');p.write_text(s)
assert {p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in protected} == protected_hashes
assert 'Nyssa sylvatica' not in Path('app/plant/PlantingGuide.tsx').read_text()
assert '<InventoryProfiles onStage={setActiveStage} />' in Path('app/plant/PlantingGuide.tsx').read_text()
print('Updated ten common-name guides, general care exceptions, metadata, photos, sources, and verification. Protected branding/dependency files unchanged.')
