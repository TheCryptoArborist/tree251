/* Tree251 screening rules v0.2.0. Decisions are conditional on reported facts.
 * Public sources and Peter's expert ROW policy are deliberately distinguished.
 * No GIS, self-reported emergency, or entered credential can grant authorization.
 */
export const RULE_VERSION = '0.2.0';
export const REFERENCES = Object.freeze({
  private: {label:'City of Mobile: private-property trimming/removal guidance; Chapter 65 §§65-1, 65-2, 65-6',url:'https://www.cityofmobile.gov/public-works/tree-trimming-removal-permits/'},
  bylaws: {label:'Mobile Tree Commission bylaws, Article VII(f), adopted November 19, 2019',url:'https://www.buildmobile.org/pdf/MTC%20Adopted%20Nov%2019%202019%20BY%20LAWS.pdf'},
  public: {label:'Chapter 65 §§65-7–65-10: public trees, protection and contractor requirements',url:'https://www.cityofmobile.gov/public-works/urban-forestry-department/urban-forestry-rules-regulations-and-forms/'},
  expert: {label:'Project expert review: Peter, former Mobile Urban Forester (11 years), November 12, 2026. Four ROW removal exemptions and recommended pruning review; not a quotation from a published exemption list.',url:null}
});
export const SPECIES = Object.freeze({
  unknown:{label:'Not sure / identification needed'},
  liveoak:{label:'Live oak — Quercus virginiana',heritage:true,live:true},
  pecan:{label:'Pecan — Carya illinoinensis',heritage:true,note:'Pecan belongs to Carya, the hickory group in Chapter 65.'},
  hickory:{label:'Hickory — Carya species',heritage:true},
  longleaf:{label:'Longleaf pine — Pinus palustris',heritage:true},
  magnolia:{label:'Magnolia — Magnolia species',heritage:true},
  oak:{label:'Other identified oak (not water oak or live oak)',heritage:true},
  riverbirch:{label:'River birch — Betula nigra',heritage:true},
  sweetgum:{label:'Sweetgum — Liquidambar styraciflua',heritage:true},
  sycamore:{label:'Sycamore — Platanus occidentalis',heritage:true},
  yellowpoplar:{label:'Yellow poplar / tulip tree — Liriodendron tulipifera',heritage:true},
  wateroak:{label:'Water oak — Quercus nigra',heritage:false,rowExempt:true},
  camphor:{label:'Camphor — Cinnamomum camphora',heritage:false,rowExempt:true},
  popcorn:{label:'Popcorn / Chinese tallow — Triadica sebifera',heritage:false,rowExempt:true},
  cherrylaurel:{label:'Carolina cherry laurel — Prunus caroliniana',heritage:false,rowExempt:true},
  baldcypress:{label:'Bald cypress — Taxodium distichum',heritage:false},
  loblolly:{label:'Loblolly pine — Pinus taeda',heritage:false},
  slash:{label:'Slash pine — Pinus elliottii',heritage:false},
  other:{label:'Other species / classification needs review'}
});
const positive = value => {
  if (value === '' || value == null || typeof value === 'boolean') return null;
  const n = Number(value); return Number.isFinite(n) && n > 0 ? n : null;
};
export function screenPermit(input = {}) {
  const a = {...input};
  const species = SPECIES[a.species] || SPECIES.unknown;
  const dbh = a.measurementUncertain ? null : positive(a.dbh);
  const limb = positive(a.limb);
  const notes = ['Preliminary screening based on your answers, not a City permit, ownership determination, or approval to start work.'];
  if (species.note) notes.push(species.note);
  if (a.extra !== 'none') notes.push('Additional project restrictions or impacts have not been resolved. A stated approval pathway does not clear those separate requirements.');
  if (a.storm) notes.push('Storm damage is recorded as an unverified observation. A named ISA Certified Arborist’s credential and report must be verified before accepting professional findings. Neither damage nor a report automatically waives approval.');
  if (['row','park','city'].includes(a.location)) notes.push('Public-tree work qualifications remain separate: applicable ISA certification, licensing, bonding and other work requirements still apply.');
  const finish = (code,title,reason,next,refs,missing=[]) => ({code,title,reason,next,refs,missing,notes,version:RULE_VERSION});
  const unresolved = (reason,missing=[],refs=['private']) => finish('VERIFY','Additional verification needed',reason,'Resolve the listed facts, then check again. Use the prepared Forestry email for questions; do not assume an exemption.',refs,missing);
  if (a.jurisdiction === 'outside') return finish('OUTSIDE','Outside this Mobile checker’s jurisdiction','You reported that the tree is outside Mobile corporate limits. A Mobile mailing address alone does not establish municipal jurisdiction.','Check the applicable jurisdiction. This result does not mean no permit is required elsewhere.',['public']);
  if (a.jurisdiction !== 'inside') return unresolved('The tree’s location within Mobile corporate limits has not been established.',['City-limit status']);
  if (!['private','row','park','city'].includes(a.location)) return unresolved('The approval process depends on the actual tree location, not just the nearest address.',['Private property, street right-of-way, or other City property'],['public']);
  if (!['removal','pruning','relocation','roots','clearing','planting'].includes(a.work)) return unresolved('Choose the proposed work to identify the applicable process.',['Proposed work']);
  if (['park','city'].includes(a.location)) return finish('PUBLIC','City authorization required — public property','A park or other City-owned tree outside the street ROW uses a different authorization process. A ROW species exemption does not authorize work here.','Ask Urban Forestry to identify the applicable City-property approval. For removal, the Council-resolution pathway and Urban Forester exception require case-specific handling.',['public']);
  if (!['removal','pruning'].includes(a.work)) return finish('SPECIAL','Project-specific review needed','Relocation, planting, root work, construction, and clearing are not ordinary pruning/removal screenings. Different protections and approvals can apply.','Describe the complete scope in the Forestry email. In particular, historic-district clearing/grubbing must not be treated as several small exempt removals.',['public','private']);
  if (a.location === 'row') {
    if (species.rowExempt) {
      if (a.work === 'pruning') return finish('RECOMMENDED','Administrative pruning review recommended','The four-species removal exemption is not being used as unrestricted pruning permission. Pruning is routed to Urban Forestry under the project’s expert-reviewed safety recommendation.','Email the proposed pruning plan to forestry@cityofmobile.gov before work. This recommendation is not represented as a newly established statutory permit requirement.',['expert','public']);
      if (a.extra !== 'none') return unresolved('The reported species is exempt from Tree Commission approval for removal under the project’s expert-reviewed rule, but additional work or restrictions are unresolved. This is not blanket ROW clearance.',['Confirm removal-only scope and any other restrictions'],['expert','public']);
      return finish('ROW_EXEMPT','Tree Commission approval not required for removal','The reported species is one of the four ROW removal exemptions supplied by the project’s former-Urban-Forester reviewer. The exemption is independent of the 3-inch DBH rule.','Confirm species and ROW location and use an appropriately qualified arborist. This answers the Commission-approval question only, not every possible ROW-work requirement.',['expert','public']);
    }
    if (a.species === 'unknown' || a.species === 'other' || !SPECIES[a.species]) return unresolved('Species identification is needed before the separate ROW species exemption can be evaluated.',['Tree species'],['expert','bylaws']);
    if (a.work === 'pruning') {
      if (limb !== null && limb >= 3) return finish('COMMISSION','Tree Commission approval required','For a nonexempt ROW tree, the published bylaws require Commission application before trimming limbs 3 inches in diameter or larger. Limb diameter is not trunk DBH.','Apply for the applicable ROW authorization and provide the pruning plan.',['bylaws','public']);
      return finish('ROW_REVIEW','ROW authorization required — confirm review route','The removal DBH threshold cannot decide a pruning application. The largest proposed limb diameter is '+(limb === null ? 'not established.' : 'below 3 inches; that alone is not a permit exemption.'),'Submit the pruning plan to Urban Forestry to establish the applicable approval route.',['bylaws','public'],limb === null ? ['Largest proposed limb diameter'] : []);
    }
    if (dbh === null) return unresolved('A nonexempt ROW removal needs approval; the trunk measurement determines administrative processing versus Commission review.',['Reliable DBH measurement'],['bylaws']);
    if (dbh <= 3) return finish('ADMIN','Administrative approval required','For a nonexempt ROW tree at or below 3 inches DBH, the published bylaws direct the removal application to administrative processing. This is not a species exemption.','Submit the ROW tree-removal application for administrative review; obtain approval before work.',['bylaws','public']);
    return finish('COMMISSION','Tree Commission approval required','The reported tree is not one of the four project-confirmed ROW removal exemptions and is larger than 3 inches DBH.','Apply for ROW tree-removal authorization. Arborist qualifications do not replace approval.',['bylaws','public']);
  }
  // Private property: retain every definite trigger even if another fact is unknown.
  const required = reason => finish('PERMIT','Tree permit required',reason,'Use the City’s private-property tree trimming/removal application. Permit submission is not approval; additional project conditions may remain.',['private']);
  if (a.property === 'commercial' && a.plan === 'yes') return required('The commercial property has an applicable approved tree or landscaping plan. The City’s published guidance requires a permit for trimming/removal independently of the usual species-size threshold.');
  if (a.historic === 'yes' && species.heritage === true && dbh !== null && dbh >= 8) return required('The reported heritage species is at least 8 inches DBH in a locally designated historic district.');
  if (a.property === 'commercial' && species.heritage === true && dbh !== null && dbh >= 18) return required('The reported commercial-site heritage tree meets the 18-inch threshold outside a local historic district and would also meet the lower threshold inside one.');
  if (a.property === 'undeveloped' && species.live && dbh !== null && dbh >= 18) return required('A live oak of at least 18 inches DBH on undeveloped residential property meets the permit threshold; historic designation would not remove that requirement.');
  if (a.extra !== 'none') return unresolved('An additional restriction, adjacent public-tree impact, or construction/ground-disturbance activity is present or has not been ruled out.',['Full work scope and other site restrictions'],['private','public']);
  if (!['developed','undeveloped','commercial'].includes(a.property)) return unresolved('The qualifying residential exemption must not be applied automatically to multifamily, mixed-use, or unclassified sites.',['Applicable property classification']);
  if (a.plan !== 'no') return unresolved('Approved tree or landscaping plan obligations have not been ruled out.',['Applicable plan and its conditions']);
  if (!['yes','no'].includes(a.historic)) return unresolved('Historic-district status is unknown. It cannot be silently treated as outside a district.',['Locally designated historic-district status']);
  const noPermit = reason => finish('NO_IDENTIFIED','No Chapter 65 trimming/removal permit identified',reason,'This conditional result covers the reported individual-tree work only. It does not waive ownership consent, other permits, protections for adjacent trees, or project-specific conditions.',['private']);
  if (a.historic === 'no' && a.property === 'developed') return noPermit('You reported a single- or two-family lot with an existing habitable structure, outside a local historic district and outside the ROW, with no applicable plan or additional restriction.');
  if (species.heritage === undefined) return unresolved('The species has not been classified. An unknown or unlisted selection is not an exemption.',['Tree species']);
  if (a.historic === 'yes' || a.property === 'commercial') {
    const threshold = a.historic === 'yes' ? 8 : 18;
    if (!species.heritage) return noPermit('The identified species is not included in the private-property heritage-tree list. No applicable plan or additional restriction was reported.');
    if (dbh === null) return unresolved('A reliable DBH measurement is needed to evaluate the '+threshold+'-inch heritage-tree threshold.',['Reliable DBH measurement']);
    if (dbh >= threshold) return required('The reported heritage tree meets the applicable '+threshold+'-inch DBH threshold.');
    return noPermit('The reported heritage tree is below the applicable '+threshold+'-inch DBH threshold, with no applicable plan or additional restriction reported.');
  }
  if (!species.live) return noPermit('For the reported undeveloped residential site outside a local historic district, this identified species does not trigger the live-oak-specific permit rule.');
  if (dbh === null) return unresolved('A reliable DBH is needed to evaluate the 18-inch live-oak threshold.',['Reliable DBH measurement']);
  return noPermit('The reported live oak is below 18 inches DBH on an undeveloped residential site outside a local historic district, with no additional restriction reported.');
}
