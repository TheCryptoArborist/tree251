/* Resident workflow policies v0.4.0. No municipal permission is issued.
 * Property/address zoning is separate from the tree pin and actual site use.
 * A missing planning record is never evidence that no approved plan exists.
 */
export const RESIDENT_VERSION='0.4.0';
export const ENGINEERING_SOURCE='https://www.cityofmobile.gov/public-works/engineering-department/';
export const ROW_LANDSCAPE_SOURCE='https://www.cityofmobile.gov/pdf/ROWAPPLICATION.pdf';
const text=v=>String(v??'').trim();
const upper=v=>text(v).toUpperCase();
const attrs=f=>f?.attributes||{};
const unique=a=>[...new Set(a.filter(Boolean))];
export function mappedProperty(facts={}) {
  const z=facts.zoning, o=facts.overlays;
  const matches=z?.matches||[];
  const codes=unique(matches.map(f=>upper(attrs(f).district_code)));
  const names=unique(matches.map(f=>text(attrs(f).district_name)));
  const answer={code:codes.join(' / '),name:names.join(' / '),zoning:'unknown',overlay:'unknown',
    zoneText:codes.length?codes.join(' / ')+' — '+names.join(' / '):'Zoning could not be established from these records.',
    overlayText:'Mapped special-area status needs verification.',
    caution:'',source:z?.source||'',fetchedAt:z?.fetchedAt||'',priorApprovals:'not_verified'};
  // Do not guess zoning from land use, imagery, a nearby feature or a partial response.
  if(z?.state!=='inside'||codes.length!==1){
    answer.caution=z?.state==='boundary'?'The property reference point is close to a mapped zoning boundary. Records are shown, but staff must resolve the location; the resident is not asked to choose a zone.':'A single reliable zoning match was not established.';
    return answer;
  }
  const code=codes[0]; answer.zoning=['R-1','R-2'].includes(code)?'r1r2':'other';
  const a=attrs(matches[0]);
  const tags=[code,a.district_name,a.sub_district_code,a.sub_district_name,a.overlay].map(text);
  if(o?.state==='inside')for(const f of o.matches||[])tags.push(text(attrs(f).neighborhood_name),text(attrs(f).sub_dist));
  const choices=[];
  if(tags.some(t=>/^DDD$/i.test(t)||/Downtown Development District/i.test(t)))choices.push('downtown');
  if(tags.some(t=>/Spring\s*Hill/i.test(t)))choices.push('springhill');
  if(code==='PD'||tags.some(t=>/^Planned Development$/i.test(t)))choices.push('planned');
  if(choices.length===1 && !['boundary','ambiguous','unavailable'].includes(o?.state)){
    answer.overlay=choices[0];answer.overlayText={downtown:'Downtown Development District',springhill:'Springhill Overlay',planned:'Planned Development district — approved conditions still need review.'}[choices[0]];
  }else if(choices.length>1){
    answer.overlayText='More than one mapped special designation was returned: '+choices.join(', ')+'. Staff review needed.';
  }else if(o?.state==='none' && /^(N\/?A|NONE|NOT APPLICABLE)$/i.test(text(a.overlay)) && tags.slice(1,4).some(Boolean)){
    answer.overlay='none';answer.overlayText='No Downtown Development District, Springhill Overlay or PD designation returned for this property. Earlier project-specific approvals have NOT been ruled out.';
  }else{
    const records=unique([text(a.overlay),...(o?.matches||[]).flatMap(f=>[text(attrs(f).neighborhood_name),text(attrs(f).sub_dist)])]);
    answer.overlayText=records.length?'Mapped designation: '+records.join(' · ')+'. Applicable special conditions still need review.':'Special-area records were incomplete or inconclusive; staff verification is needed.';
  }
  return answer;
}
export function propertyIsDifferent(propertyFacts,treeFacts){
  const p=propertyFacts?.parcel,t=treeFacts?.parcel;
  if(p?.state!=='inside'||t?.state!=='inside')return false;
  const one=attrs(p.matches?.[0]).parcel,two=attrs(t.matches?.[0]).parcel;
  return !!one&&!!two&&one!==two;
}
export function staffPlanReview(a={}) {
  const construction=a.development==='yes'||['root','roots','clearing'].includes(a.work);
  const ldp=['issued','pending','planned','unknown'].includes(a.landDisturbance)?a.landDisturbance:'unknown';
  const projectNote=construction?'Construction-related work. Land-disturbance permit status: '+ldp+' (reported, not verified). A land-disturbance permit is not treated as tree-removal approval.':'';
  const common={title:'Approved-plan status needs staff verification',
    reason:'City staff need to retrieve any approved site and landscape drawings and compare this specific tree location with the approved planting locations, retained trees, preservation credits and required buffers.',
    next:'Use the prepared Forestry email to request that review. A missing online planning record does not prove no plan exists. This is not an automatic tree-permit determination.',
    projectNote,code:'STAFF_VERIFICATION'};
  if(a.city==='outside')return {...common,code:'OUTSIDE',title:'Outside this Mobile review',reason:'The reported location is outside Mobile.',next:'Check the applicable jurisdiction.'};
  if(a.city!=='inside')return {...common,reason:'First establish whether the tree is within Mobile. Zoning and plan applicability have not been established.'};
  if(a.location!=='private')return {...common,code:'PUBLIC_REVIEW',title:construction?'Project and public-tree approvals must be coordinated':'Public-tree approval route applies',reason:construction?common.reason:'The proposed work is on public land or its location is uncertain. Private-site landscape obligations have not been inferred.',next:construction?common.next:'Follow the public-tree approval and work-qualification findings. Any related development or landscape plan must be checked separately.'};
  if(a.zoning==='r1r2'&&a.property==='developed'&&a.development==='no'&&a.plan!=='yes'&&a.overlay==='none')return {...common,code:'STANDARD_EXCLUSION',title:'Ordinary R-1/R-2 landscaping rule does not apply',reason:'For the reported house/duplex site, ordinary Chapter 64 section 3-7 landscaping requirements exclude R-1/R-2 zoning. This does not confirm that the property has no earlier special approval or tree-protection condition.',next:'The tree-permit finding remains separate. Any known previous approval or changed project scope must still be reviewed.'};
  if(a.plan==='yes')return {...common,title:'Known approved plan — staff must check this tree',reason:'An approved plan is reported. Staff must check the tree against the required planting locations and retention/credit requirements on that plan. The resident is not expected to interpret the drawing.'};
  if(construction)return {...common,title:'Check tree approval separately from the land-disturbance permit'};
  return common;
}
export function engineeringReview(a={}) {
  if(a.work!=='planting')return null;
  if(a.city==='outside')return null;
  if(a.location==='row')return {title:'Planting in street right-of-way: Engineering permit route',
    requirement:'Arrange the Engineering right-of-way landscaping permit and Urban Forestry planting-plan review before planting. A tree trimming/removal application is not the planting application.',
    note:'This follows the project expert\u2019s ROW planting guidance and the City\u2019s published ROW landscape-permit category. Confirm current submission requirements with Engineering; no fee or processing time is inferred from the older form.',sources:[ENGINEERING_SOURCE,ROW_LANDSCAPE_SOURCE]};
  if(a.location==='unknown')return {title:'Planting location needs confirmation',requirement:'Establish whether the planting spot is in the public street right-of-way. If it is, the Engineering ROW landscaping permit route applies.',note:'The canopy of an existing tree or a parcel-map gap does not determine the planting location.',sources:[ENGINEERING_SOURCE]};
  return null;
}
