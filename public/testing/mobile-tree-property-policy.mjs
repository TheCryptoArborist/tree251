/* Resident workflow policies v0.4.0. No municipal permission is issued.
 * Property/address zoning is separate from the tree pin and actual site use.
 * A missing planning record is never evidence that no approved plan exists.
 */
export const RESIDENT_VERSION='0.4.8';
export const ENGINEERING_SOURCE='https://www.buildmobile.org/forms-and-applications/';
export const ROW_LANDSCAPE_SOURCE='https://www.buildmobile.org/pdf/Major-Minor%20ROW%20Permit%20Application%20-%206-1-19.pdf';
const text=v=>String(v??'').trim();
const upper=v=>text(v).toUpperCase();
const attrs=f=>f?.attributes||{};
const unique=a=>[...new Set(a.filter(Boolean))];
export function mappedProperty(facts={}) {
  const z=facts.zoning, o=facts.overlays;
  const matches=z?.matches||[];
  const codes=unique(matches.map(f=>upper(attrs(f).district_code)));
  const names=unique(matches.map(f=>text(attrs(f).district_name)));
  const parcelMatches=facts.parcel?.matches||[];
  const parcel=parcelMatches.length===1?attrs(parcelMatches[0]):null;
  const parcelFlag=upper(parcel?.undeveloped);
  const parcelId=text(parcel?.parcel);
  const classDescription=text(parcel?.classcode_desc);
  const taxClass=/commercial|business|office|retail/i.test(classDescription)?'commercial':/residential/i.test(classDescription)?'residential':'unknown';
  const parcelPhrase=parcelFlag==='NO'?'This parcel is listed as NOT undeveloped (a developed-parcel indicator).':
    parcelFlag==='YES'?'This parcel is listed as undeveloped.':
    parcelFlag==='TBD'?'The City has not determined whether this parcel is undeveloped.':
    'The developed/vacant status is not available.';
  const parcelDescription=parcel?
    'City parcel record'+(parcelId?' '+parcelId:'')+': '+parcelPhrase+
      (classDescription?' Tax classification: '+classDescription+'.':'')+
      ' These records do not verify that a house or duplex is habitable, that the tree is on private land, or that an approved landscaping plan exists. Please confirm the actual building and tree location.':
    'The City did not return one unambiguous parcel record at the address point; confirm the property before selecting a building type.';
  const answer={code:codes.join(' / '),name:names.join(' / '),zoning:'unknown',overlay:'unknown',
    zoneText:codes.length?codes.join(' / ')+' — '+names.join(' / '):'Zoning could not be established from these records.',
    overlayText:'Mapped special-area status needs verification.',
    parcelDescription,parcelFlag,parcelId,taxClass,splitZoned:false,
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
// The street-address point is not a property-wide zoning determination.
// An exact tax parcel can intersect multiple legally mapped districts.
export function reconcileParcelZones(property,inventory){
  if(!property||inventory?.propertyStatus!=='ok'||inventory?.zoningStatus!=='ok')return property;
  const districts=[...new Map((inventory.zoningDistricts||[]).filter(z=>z?.code).map(z=>[
    String(z.code).trim().toUpperCase(),{
      code:String(z.code).trim().toUpperCase(),
      name:String(z.name||'').trim()
    }
  ])).values()];
  if(districts.length<2)return {...property,verifiedParcelZones:districts};
  const summary=districts.map(z=>z.code+(z.name?' — '+z.name:'')).join('; ');
  return {...property,verifiedParcelZones:districts,splitZoned:true,
    zoning:'unknown',overlay:'unknown',
    zoneText:'More than one zoning district intersects this tax parcel: '+summary+'.',
    caution:'SPLIT-ZONED PARCEL: The address reference point does not represent all portions of this lot. A tree or proposed work area may be in a different district. Confirm the exact tree position and the applicable City approval route.',
    overlayText:'The site is split-zoned. Mapped overlay results at the address point are not a complete determination for the entire property. Prior approval conditions also need checking.'};
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
  if(a.zoning==='r1r2'&&a.taxClass!=='commercial'&&a.property==='developed'&&!construction&&a.plan!=='yes'&&a.overlay==='none')return {...common,code:'STANDARD_EXCLUSION',title:'No standard Chapter 64 landscaping review indicated for this home',reason:'The property is reported as a house or duplex with a habitable structure in R-1/R-2 zoning, outside mapped special districts. Ordinary Chapter 64 section 3-7 landscaping requirements do not apply in the same way as covered development sites. No separate plan review is triggered solely because an owner does not know whether an older plan exists.',next:'For ordinary tree pruning or removal, follow the separate Chapter 65 result. No Urban Forestry email is necessary solely to confirm this standard residential landscape exclusion. If the job is part of construction or an approved plan is known, review those conditions separately.'};
  if(a.plan==='yes')return {...common,title:'Known approved plan — staff must check this tree',reason:'An approved plan is reported. Staff must check the tree against the required planting locations and retention/credit requirements on that plan. The resident is not expected to interpret the drawing.'};
  if(construction)return {...common,title:'Check tree approval separately from the land-disturbance permit'};
  return common;
}
// Project arborist clarification 2026-11-19. Published forms sometimes
// describe "any ROW work"; City Engineering confirmation is needed before
// these operational distinctions are treated as controlling legal guidance.
export function engineeringReview(a={}) {
 const sources=[ENGINEERING_SOURCE,ROW_LANDSCAPE_SOURCE];
 const found=(code,title,requirement,note)=>({code,title,requirement,note,sources,authorizationGranted:false});
 const planting=a.work==='planting';
 const ground=['root','roots'].includes(a.work)||a.alsoDigging===true||a.rowGroundWork==='yes';
 if(a.city==='outside')return null;
 if(!planting&&!ground){
  if(a.rowGroundWork==='no'){
   return a.location==='row'?found('ROUTINE_NO_TRIGGER','Routine tree work: no Engineering ROW construction permit indicated',
    'Routine tree pruning or removal without digging, trenching, utilities, planting or other soil disturbance does not trigger an Engineering ROW construction permit under the project arborist’s guidance.',
    'This is not City authorization and does not remove Chapter 65 or Tree Commission obligations.'):null;
  }
  return found('WORK_SCOPE_UNKNOWN','Confirm ground work on the job',
   'Will any digging, trenching, underground utility work, stump excavation or soil disturbance occur? If so, identify the actual work area.',
   'The tree-trunk location alone cannot answer this. An unanswered question is not No.');
 }
 let area=planting?a.location:(['root','roots'].includes(a.work)||a.alsoDigging===true?a.excavationArea:a.rowWorkArea);
 if(planting&&a.alsoDigging===true){
  if(a.excavationArea==='row')area='row';
  else if(a.excavationArea==='mixed'&&area!=='row')area='mixed';
  else if((!a.excavationArea||a.excavationArea==='unknown')&&area!=='row')area='unknown';
 }
 if(a.city!=='inside')return found('JURISDICTION_UNKNOWN','Confirm City jurisdiction',
  'Confirm the jurisdiction of the actual planting or excavation area before determining an Engineering ROW permit.',
  'A Mobile mailing address or tree location does not establish the ROW boundary.');
 if(area==='row')return found('ROW_PERMIT_REQUIRED','Engineering ROW permit required',
  'Engineering right-of-way authorization is required before '+(planting?'planting trees or excavating':'digging, trenching, utility work or other soil disturbance')+' in the City public ROW. Obtain the applicable Engineering ROW permit before starting. Coordinate affected tree protection and planting plans with Urban Forestry.',
  'This is separate from tree-work approval, root-cutting permission and Alabama 811. Confirm the current application with Engineering.');
 if(!area||area==='unknown'||area==='mixed')return found('ROW_LOCATION_UNKNOWN','Engineering ROW permit status: location confirmation needed',
  'Confirm whether any part of the planting, digging, trenching, utility work or ground disturbance is in City ROW. If so, the Engineering ROW permit route applies.',
  'The tree and excavation can have different locations. GIS is not a ROW boundary survey.');
 if(area==='private')return found('NO_ROW_TRIGGER','No City ROW permit trigger identified from the work location',
  'The reported planting or soil disturbance takes place entirely on private land outside the public ROW, so no City Engineering ROW construction permit is indicated on those facts.',
  'Other City approvals, utility locating and tree-root protection remain separate; this is not digging clearance.');
 return found('OTHER_PUBLIC_LAND','Other public land: verify approvals',
  'Planting or soil disturbance on City parks or other City property requires checking the applicable authority, rather than automatically treating the location as street ROW.',
  'No permission to perform work on public land is granted.');
}
