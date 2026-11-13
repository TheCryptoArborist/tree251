// Tree251 preliminary tree-permit screening — v0.2.0
// The City's published guidance and project expert interpretations are kept separate.
export const species={
 unknown:['Not sure / identify tree',null,null],
 liveoak:['Live oak — Quercus virginiana',true,'live'],
 pecan:['Pecan — Carya illinoinensis',true,null],
 hickory:['Hickory — Carya spp.',true,null],
 longleaf:['Longleaf pine — Pinus palustris',true,null],
 magnolia:['Magnolia — Magnolia spp.',true,null],
 oak:['Other oak, excluding water oak',true,null],
 riverbirch:['River birch — Betula nigra',true,null],
 sweetgum:['Sweetgum — Liquidambar styraciflua',true,null],
 sycamore:['Sycamore — Platanus occidentalis',true,null],
 yellowpoplar:['Yellow poplar — Liriodendron tulipifera',true,null],
 wateroak:['Water oak — Quercus nigra',false,'row-exempt'],
 camphor:['Camphor — Cinnamomum camphora',false,'row-exempt'],
 popcorn:['Popcorn / Chinese tallow — Triadica sebifera',false,'row-exempt'],
 cherrylaurel:['Cherry laurel — Prunus caroliniana',false,'row-exempt'],
 baldcypress:['Bald cypress — Taxodium distichum',false,null],
 loblolly:['Loblolly pine — Pinus taeda',false,null],
 slash:['Slash pine — Pinus elliottii',false,null],
 other:['Other / identification not confirmed',null,null]
};
export const sources={
 city:['City of Mobile tree permitting guidance','https://www.cityofmobile.gov/public-works/tree-trimming-removal-permits/'],
 bylaws:['Mobile Tree Commission 2019 bylaws','https://www.buildmobile.org/pdf/MTC%20Adopted%20Nov%2019%202019%20BY%20LAWS.pdf'],
 chapter:['Mobile Chapter 65 rules and forms','https://www.cityofmobile.gov/public-works/urban-forestry-department/urban-forestry-rules-regulations-and-forms/'],
 expert:['Project expert review, former Mobile Urban Forester; four ROW removal exemptions and pruning-plan recommendation (not verified against a published exemption list)',null]
};
const num=(v)=>v!==''&&v!=null&&Number.isFinite(+v)&&+v>0?+v:null;
const yesNo=v=>v==='yes'||v==='no';
export function screen(d){
 const s=species[d.species]||species.unknown,dbh=num(d.dbh),limb=num(d.limb);
 const notes=['This is a conditional educational screening, not City authorization or proof of legal tree ownership.'];
 if(d.storm)notes.push('Suspected storm damage is unverified. A documented assessment by a verified ISA Certified Arborist may inform review but cannot itself waive a permit.');
 if(d.species==='pecan')notes.push('Pecan is Carya illinoinensis, within the Carya (hickory) genus named in Chapter 65.');
 const out=(code,title,reason,next,refs=['city'],missing=[])=>({code,title,reason,next,refs,missing,notes});
 const verify=(reason,missing=[],refs=['city'])=>out('verify','Additional verification needed',reason,'Confirm the missing details before relying on a permit determination. You can prepare an email to Mobile Urban Forestry from this page.',refs,missing);
 const must=(why)=>out('permit','Tree permit required',why,'Apply through the City of Mobile private-property tree trimming/removal process. Application is not approval.',['city','chapter']);
 const clear=(why)=>out('no-identified','No Chapter 65 tree permit identified',why,'This conditional finding does not waive other City approvals, approved plans, right-of-way rules, or land-disturbance restrictions.',['city']);
 if(d.city==='outside')return out('outside','Outside this City of Mobile checker','You reported that the tree lies outside Mobile corporate limits. Mailing addresses do not establish municipal boundaries.','Check the applicable local authority; this is not a finding that no permits are required.',['chapter']);
 if(d.city!=='inside')return verify('City jurisdiction has not been established.',['Confirm whether the tree is inside city limits']);
 if(!['private','row','park','city-property'].includes(d.location))return verify('The tree location and ownership category determine the approval process.',['Tree location (private, right-of-way, park or other City property)'],['chapter']);
 if(!['removal','pruning','root','clearing','relocation','planting'].includes(d.work))return verify('The activity must be identified.',['Type of work']);
 if(['park','city-property'].includes(d.location))return out('public','City-property authorization review required','Trees on City land outside the street right-of-way use a different procedure from privately owned trees or ordinary street trees.','Coordinate with Urban Forestry for the applicable City-property permission and, for removal, the applicable Urban Forester/Council process.',['chapter']);
 if(['root','clearing','relocation','planting'].includes(d.work))return out('special','Project-specific review needed','Construction, root disturbance, land clearing, tree relocation and planting have requirements not resolved by ordinary single-tree pruning/removal thresholds.','Describe the entire activity to Urban Forestry. Land clearing in local historic districts requires a separate check.',['chapter','city']);
 if(d.location==='row'){
   notes.push('Right-of-way work qualifications, including applicable ISA certification, licensing and bonding, are separate from Commission review.');
   if(s[2]==='row-exempt'){
     if(d.work==='pruning')return out('recommended','Administrative pruning-plan review recommended','The project expert has identified this species as exempt from Tree Commission approval for removal; that interpretation does not automatically extend to pruning.','Send the proposed pruning plan to forestry@cityofmobile.gov for administrative review before work. This is a professional recommendation, not stated as a newly adopted statutory requirement.',['expert','chapter']);
     if(d.extra!=='none')return verify('The expert-reviewed removal exemption may apply but other work restrictions are unresolved.',['Confirm no additional ROW work or restrictions'],['expert','chapter']);
     return out('row-exempt','Tree Commission approval not required for this removal — conditional','Based on the project expert’s identified ROW exemption for water oak, camphor, popcorn/Chinese tallow, and cherry laurel. The City’s general online guidance still broadly describes ROW permits, so this rule is not an official clearance.','Have the species and work scope confirmed and use an appropriately qualified arborist. Other ROW permissions may apply.',['expert','city','chapter']);
   }
   if(s[1]===null)return verify('Species identification is needed to determine whether an ROW species exemption applies.',['Reliable species identification'],['expert','bylaws']);
   if(d.work==='pruning'){
     if(limb!==null&&limb>=3)return out('commission','Tree Commission review required for proposed pruning','A limb of at least 3 inches in diameter is proposed for trimming on a nonexempt ROW tree. This is the limb diameter, not trunk DBH.','Submit the proposed pruning plan through the applicable City ROW review process.',['bylaws','chapter']);
     return out('row-review','ROW pruning authorization — route needs confirmation','The 3-inch DBH threshold applies to removal, not pruning. A small proposed limb is not, by itself, an exemption from all review.','Request the applicable pruning review and supply a pruning plan to Urban Forestry.',['bylaws','city'],limb===null?['Largest limb diameter (for review route)']:[]);
   }
   if(dbh===null)return verify('Nonexempt ROW removal requires approval; a reliable trunk DBH determines administrative versus Commission processing.',['DBH'],['bylaws']);
   return dbh<=3?out('administrative','Administrative approval required','For a nonexempt ROW tree of 3 inches DBH or less, published bylaws provide an administrative application route.','Submit the ROW removal application for administrative processing before work.',['bylaws','chapter']):out('commission','Tree Commission review required','This nonexempt ROW tree exceeds 3 inches DBH.','Apply for Tree Commission removal review before work; professional credentials do not replace authorization.',['bylaws','chapter']);
 }
 // Private property — verify definite triggers before requiring the remaining facts.
 if(d.property==='commercial'&&d.plan==='yes')return must('The property has an approved commercial tree or landscaping plan applying to the tree; that creates a permit requirement independent of ordinary species-size thresholds.');
 if(d.historic==='yes'&&s[1]===true&&dbh!==null&&dbh>=8)return must('A protected heritage species at or above 8 inches DBH is reported within a locally designated historic district.');
 if(d.property==='commercial'&&s[1]===true&&dbh!==null&&dbh>=18)return must('A commercial-property heritage tree reaches 18 inches DBH (and would also reach the smaller historic threshold).');
 if(d.property==='undeveloped'&&s[2]==='live'&&dbh!==null&&dbh>=18)return must('An undeveloped residential site has a live oak at or above 18 inches DBH.');
 if(d.extra!=='none')return verify('Additional ground work, plan restrictions, or effects on public trees are unresolved.',['Additional project restrictions']);
 if(!['developed','undeveloped','commercial'].includes(d.property))return verify('Residential developed-site exemptions cannot be assumed for multifamily or unknown property classes.',['Property use and developed status']);
 if(d.plan!=='no')return verify('Approved tree/landscaping plan obligations have not been ruled out.',['Whether an applicable approved plan exists']);
 if(!yesNo(d.historic))return verify('A locally designated historic district may change the threshold to 8 inches.',['Local historic-district designation']);
 if(d.historic==='no'&&d.property==='developed')return clear('Reported qualifying developed single-family/two-family property outside a local historic district, with the tree outside the ROW and no additional restrictions.');
 if(s[1]===null)return verify('The species is not reliably identified, so a species-based exemption cannot be determined.',['Tree species']);
 if(d.historic==='yes'||d.property==='commercial'){
   const limit=d.historic==='yes'?8:18;
   if(s[1]===false)return clear('Reported species is not in the Chapter 65 private-property heritage list; no other restrictions were reported.');
   if(dbh===null)return verify('A reliable trunk diameter is needed to compare with the '+limit+'-inch threshold.',['DBH']);
   return dbh>=limit?must('Protected heritage species meets the '+limit+'-inch DBH threshold.'):clear('Protected heritage species is below the applicable '+limit+'-inch DBH threshold.');
 }
 if(s[2]!=='live')return clear('The outside-historic, undeveloped residential rule specifically uses a live-oak threshold. No separate restrictions were reported.');
 if(dbh===null)return verify('DBH is required to test the 18-inch live-oak threshold.',['DBH']);
 return dbh>=18?must('Live oak is at least 18 inches DBH on undeveloped residential property.'):clear('Live oak is below the 18-inch DBH threshold on undeveloped residential property.');
}
