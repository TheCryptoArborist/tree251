"""Reconcile the finishing pass with already-added draft navigation and illustration."""
from pathlib import Path
import hashlib,re
p=Path('scripts/apply-plant-polish.py');s=p.read_text()
assert hashlib.sha256(p.read_bytes()).hexdigest()=='1357f9741277ffdfb56ea245f1065251d5d25cfc55b0fd9fbbec6647c76910c2'
changes={
'9d3f7553fc788b4bce2c7e04ddd7ee966bef2e97985d8ff3541d4bcd229c6e3b':'c853c8b55f90d61a8025774d53bc54304be90e36c98a9ccbe594bddd0f2a1a69',
'ee5cb18685303f36da7be4f41d4dbf3e37b3f796355196f9e98bf74ccda8380c':'e958046a9ba003acf72ccb38f628983921f4a75d98a37d3ce7fdfa0182597cfc',
'ab263283124120447d37ebfbac1e0749cdb30df5bc358045a0e25480224b8e62':'3fb7cb3c39dc90fc5c7e43323977591193bd2f0ec168b7b5a1bd8b03f3a7177a',
'0b8acea59aca7449196d43d9a2eb05ab3f4da7c22c97936bb05c5dcb39013ffb':'c8aeabcddfb23cc3b3b40bb4463345ad0cd78114e7e4e5d0d8197a43a2a894d1',
'<strong>Canopy size and green space are different.</strong> Crown width describes the spread of the branches. Green space is the usable soil available to roots. Do not multiply canopy dimensions to calculate a required lawn size.':'<strong>Give the tree room to mature.</strong> Crown width describes branch spread; healthy roots need connected, uncompacted soil. Plan for the mature tree: leave room for its branches and a broad, connected area of suitable soil for its roots.'
}
for old,new in changes.items():
 assert old in s,old
 s=s.replace(old,new)
s=s.replace("s=s.replace('const resourceNavItems = [','const resourceNavItems = [\\n  { href: \"/plant\", label: \"Tree Planting & Care\", external: false },',1)", "assert s.count('{ href: \"/plant\", label: \"Tree Planting & Care\", external: false }') == 1\ns=s.replace('          <Link href=\"/plant\" className=\"min-w-[6.4rem] rounded-full border border-white/10 px-2 py-2.5 focus-ring\">Planting Guide</Link>\\n', '')")
s=s.replace("p=Path('app/sitemap.ts');s=p.read_text();s=s.replace('  return [','  return [\\n    { url: `${siteUrl}/plant`, changeFrequency: \"monthly\", priority: 0.8 },',1);p.write_text(s)", "p=Path('app/sitemap.ts');s=p.read_text();assert s.count('`${siteUrl}/plant`') == 1")
s=s.replace("p=Path('app/plant/PlantingGuide.tsx'); s=p.read_text()", "p=Path('app/plant/PlantingGuide.tsx'); s=p.read_text()\ns,n=re.subn(r'<figure className=\"planting-figure\">.*?</figure>', '', s,count=1,flags=re.S);assert n==1")
css=Path('app/plant/plant-guide.css')
assert hashlib.sha256(css.read_bytes()).hexdigest()=='f02d1a007fdd4a7f08e537dbe8092eb926187fcb3623b3833f41a25982d72119'
cs=css.read_text();assert cs.count('/* Final guide polish */')==1
s=s.replace("media = Path('media-import')", "css=Path('app/plant/plant-guide.css')\nassert hashlib.sha256(css.read_bytes()).hexdigest()=='f02d1a007fdd4a7f08e537dbe8092eb926187fcb3623b3833f41a25982d72119'\ncss.write_text(css.read_text().split('/* Final guide polish */')[0].rstrip()+'\\n')\n\nmedia = Path('media-import')")
p.write_text(s)
