import {engineeringReview} from './mobile-tree-property-policy.mjs';
/* Digging/root protection v0.5.0. Screening, not a finding of a violation.
 * Basis reopened 2026-11-18: adopted Mobile Ordinance 65-018-2021,
 * Articles I(2), II, V(4), VII, VIII(1)-(3), X(1)(d),(2),(5).
 * The 6–18 DBH interval is NOT a fixed legal setback or a safe digging radius.
 * Outside-trunk-edge measurement is this tool's conservative screening convention;
 * the ordinance does not specify that measurement endpoint. No center correction
 * is inferred from DBH measured at 4.5 feet.
 */
export const DIGGING_VERSION='0.5.1';
// Project expert clarification (former City Urban Forester), 2026-11-18:
// screen excavation/root protection citywide, including occupied R-1/R-2 lots.
// This is the project's scope interpretation, not a verbatim ordinance quote.
// The published general application exception in Article I(2) remains an
// explicit legal-source review item; do not erase it or declare adjudicated law.
export const DIGGING_SCOPE_VERSION='0.7.2';
export const DIGGING_SCOPE_BASIS=Object.freeze({
 type:'project-expert-interpretation',date:'2026-11-18',
 interpretation:'Citywide digging/root-protection screening; no occupied-residential bypass.',
 sourceReview:'Read Article I(2) together with Articles VIII and X; statutory scope interpretation requires regulatory acceptance before production.'
});
export const DIGGING_SOURCES=Object.freeze([
 {label:'Chapter 65: application and critical root zone definition (pages 2–4)',url:'https://mcclibraryfunctions.azurewebsites.us/api/ordinanceDownload/11265/1073837/pdf#page=2'},
 {label:'Chapter 65: construction root protection, section 65-8 (page 9)',url:'https://mcclibraryfunctions.azurewebsites.us/api/ordinanceDownload/11265/1073837/pdf#page=9'},
 {label:'Chapter 65: tree abuse and curb-cut coordination, section 65-10 (page 11)',url:'https://mcclibraryfunctions.azurewebsites.us/api/ordinanceDownload/11265/1073837/pdf#page=11'},
 {label:'City Engineering and development applications',url:'https://www.buildmobile.org/forms-and-applications/'},
 {label:'Alabama 811: before digging and operator responses',url:'https://www.al811.com/before-you-dig-excavators/'}
]);
const supplied=v=>v!==''&&v!==null&&v!==undefined;
const num=(v,min=0)=>supplied(v)&&Number.isFinite(Number(v))&&Number(v)>=min?Number(v):null;
export function excavationDistance(feet,inches){
 if(!supplied(feet)&&!supplied(inches))return null;
 const f=supplied(feet)?num(feet):0,i=supplied(inches)?num(inches):0;
 return f===null||i===null||i>=12?null:f+i/12;
}
export function rootScreeningRange(dbh,distance,complex=false){
 const d=num(dbh,0.01),x=num(distance);
 if(complex||d===null)return {band:'unknown',lowerFeet:null,upperFeet:null,distanceFeet:x};
 const lowerFeet=d/2,upperFeet=d*1.5;
 return {band:x===null?'unknown':x<=lowerFeet?'inner':x<=upperFeet?'possible':'beyond',lowerFeet,upperFeet,distanceFeet:x};
}
const pretty=n=>Number(n.toFixed(2)).toString();
export function screenDigging(a={}){
 const active=['root','roots'].includes(a.work)||a.alsoDigging===true;
 if(!active)return {active:false,version:DIGGING_VERSION};
 const target=a.target||'same';
 const dbh=target==='same'?a.dbh:a.otherDbh;
 const distance=excavationDistance(a.distanceFeet,a.distanceInches);
 const range=rootScreeningRange(dbh,distance,a.complexTrunk===true);
 const knownCity=a.city==='inside';
 const publicTree=['row','park','city','city-property'].includes(a.location)&&target==='same';
 const differentTree=target!=='same';
 const outside=a.city==='outside';
 // Zoning, property use, a habitable dwelling, heritage status and plan status
 // do not switch OFF excavation/root protection anywhere inside Mobile.
 // A different unidentified tree still needs its own jurisdiction check.
 // An address or tree outside Mobile cannot establish jurisdiction for a different tree.
 const scope=differentTree?'unresolved':outside?'outside':knownCity?'covered':'unresolved';
 // Administrative routing is separate from citywide root-protection screening.
 const knownApprovalIssue=publicTree||a.plan==='yes'||a.historic==='yes'||
  ['commercial','undeveloped'].includes(a.property)||a.taxClass==='commercial'||a.splitZoned===true;
 const approvalRouteUnresolved=scope==='covered'&&!['private','row','park','city','city-property'].includes(a.location);
 const damaged=a.stage==='damaged', exposed=a.stage==='exposed';
 const indiscriminate=a.rootHandling==='cut';
 const cityReview=scope==='covered'&&knownApprovalIssue;
 let title,code;
 if(damaged){code='DAMAGE_REPORTED';title='Stop digging near the damaged roots and get an arborist assessment';}
 else if(exposed){code='ROOTS_EXPOSED';title='Pause at exposed roots before continuing';}
 else if(range.band==='unknown'){code='MEASUREMENTS_NEEDED';title='More information is needed before judging root proximity';}
 else if(range.band==='inner'){code='CLOSE_EXCAVATION';title='Review this close excavation before digging';}
 else if(range.band==='possible'){code='POSSIBLE_ROOT_CONFLICT';title='The digging may affect important roots';}
 else{code='OUTSIDE_SCREENING_RANGE';title='Outside the estimated range—not cleared to cut roots';}
 let proximity='A reliable trunk diameter and nearest excavation distance are needed.';
 if(range.lowerFeet!==null){
  proximity='For a '+pretty(Number(dbh))+'-inch trunk, the ordinance’s 6–18-times-diameter definition gives a screening range of '+pretty(range.lowerFeet)+'–'+pretty(range.upperFeet)+' feet.';
  if(distance!==null)proximity+=' Your nearest excavation edge is reported '+pretty(distance)+' feet from the outside of the trunk at ground level.';
  if(range.band==='inner')proximity+=' That is at or inside the lower end of the range.';
  if(range.band==='possible')proximity+=' That is between the lower and upper ends of the range.';
  if(range.band==='beyond')proximity+=' Roots can still be affected beyond this estimate.';
 }
 const legal=scope==='outside'
   ? 'This tool makes no City of Mobile determination outside the city. Check the applicable jurisdiction; the root-protection advice still matters.'
   :scope==='covered'
    ? 'This checker applies the Chapter 65 digging/root-protection check citywide, including private R-1/R-2 lots with habitable homes. Under section 65-8, non-selective root pruning in the critical root zone of a tree retained during construction or improvements is prohibited; selective root pruning requires ISA Certified Arborist supervision. A separate approval route must be evaluated for the actual project.'
    : 'Confirm the jurisdiction of the affected tree. Once it is established as inside Mobile, the digging/root-protection check is not bypassed because of residential zoning or a habitable home.';
 let handling=indiscriminate
  ? 'Do not plan to cut or tear whatever roots lie in the trench. Expose and evaluate individual roots with an ISA Certified Arborist before deciding what may be cut. On covered sites, the described method may conflict with sections 65-8 and 65-10; this is not a finding that a violation has occurred.'
  :a.rootHandling==='expose'
   ? 'Your proposed expose-first method needs an ISA Certified Arborist supervising individual root decisions where section 65-8 applies. A selected method, entered name, or certification number is not verified supervision or City approval.'
   : 'Stop when roots are encountered and have an ISA Certified Arborist evaluate them before cutting. Hand tools, air/water excavation, and underground boring do not by themselves establish a safe or compliant method.';
 if(damaged)handling='Pause further excavation in the affected area and keep people and equipment away from any potentially unstable tree. Obtain a prompt ISA Certified Arborist assessment; report public-tree damage to Urban Forestry. Do not assume the tree is safe or unsafe based on this form alone. '+handling;
 else if(exposed)handling='Protect the exposed roots from further work and have the method reviewed before proceeding. '+handling;
 const coordination=cityReview
  ? 'Send the proposed excavation and root-handling plan to Urban Forestry to establish the tree-protection and approval route. The checker does not issue a tree permit or choose a Tree Commission application solely from this distance.'
  :scope==='outside'
   ? 'Check the applicable local authority. This tool does not apply Mobile requirements outside the city.'
   :scope==='unresolved'
    ? 'Confirm the affected tree and its jurisdiction first. Unknown facts alone do not establish a City permit or mandatory email.'
    : 'Comply with the root-protection and supervision requirements. A City permit or email is not automatically required solely because the citywide digging check applies; separate project approvals remain to be determined.';
 const engineeringFinding=engineeringReview(a);
 const engineering=engineeringFinding
  ? engineeringFinding.title+': '+engineeringFinding.requirement+' '+engineeringFinding.note
  : 'Confirm any applicable Engineering and land-disturbance approval for the project. Utility locating is not tree-root authorization.';
 const notes=[
  'Scope basis: citywide digging screening follows the project owner’s clarification as a former City Urban Forester (18 November 2026). This is recorded separately from the published Article I(2) general residential exception, not quoted as a statutory amendment.',
  'Screening estimate only: this is not a surveyed critical root zone, legal setback, approved root cut, or risk assessment. Species tolerance, tree age and health influence the appropriate root zone.',
  'The outside-trunk-edge distance is the tool’s field-measurement convention, not an ordinance-specified measuring point. Depth, width and length describe the project; this version does not use them to calculate permission or stability.',
  'ISA credentials, professional findings and any City authorization have NOT been verified. A tree-service name is not proof of arborist supervision.',
  'A removal species exemption, utility-line-clearing provision, self-reported emergency, or land-disturbance permit is not treated as blanket permission for root damage.'
 ];
 if(differentTree)notes.push('This digging concerns another or unidentified tree. The original address/tree pin does not verify that tree’s ownership or regulatory status; conduct a separate tree-location check.');
 if(a.otherTrees!=='no')notes.push('Other or neighboring trees may also be affected. One tree measurement does not clear the whole trench or excavation.');
 if(a.method==='boring')notes.push('Boring depth, entry/exit pits and roots still need a site-specific review; boring is not an automatic exemption.');
 if(a.storage!=='no')notes.push('Equipment, stockpiled soil, materials and spills also need a tree-protection plan. Section 65-8 addresses these within the critical root zone on covered work.');
 if(a.purpose==='curbcut')notes.push('Section 65-10(5) requires prior Urban Forester coordination for curb cuts involving public or heritage trees; applicability must be established for this tree.');
 if(a.purpose==='utility')notes.push('Utility companies on designated Tree Trails must coordinate projects affecting those trees with the Urban Forester and Tree Commission under section 65-5(4). Tree-Trail status is not verified by this module.');
 if(a.measurement!=='measured')notes.push('The distance is not identified as a field measurement. Confirm it on site before relying on the proximity screening.');
 if(a.plan==='yes')notes.push('An approved plan is reported; check the retained tree, protection details and approved excavation scope rather than assuming the plan authorizes root cutting.');
 const missing=[];
 if(num(dbh,0.01)===null||a.complexTrunk)missing.push('reliable diameter of the tree affected by digging');
 if(distance===null)missing.push('nearest excavation-edge distance');
 for(const [key,label] of [['purpose','work purpose'],['excavationArea','excavation location'],['method','digging method'],['rootHandling','plan for encountered roots'],['stage','whether work or root damage has already occurred']])if(!a[key]||a[key]==='unknown')missing.push(label);
 const dimensions={depthInches:num(a.depthInches),widthFeet:num(a.widthFeet),lengthFeet:num(a.lengthFeet)};
 const locate='Contact Alabama 811 before excavation, allow the required notice period, and confirm utility-operator responses. A locate ticket does not authorize cutting tree roots. Reported locate status: '+(a.locate||'unknown')+' (not verified).';
 return {active:true,version:DIGGING_VERSION,scopeVersion:DIGGING_SCOPE_VERSION,scopeBasis:DIGGING_SCOPE_BASIS,code,title,scope,cityReview,approvalRouteUnresolved,range,proximity,legal,handling,coordination,engineering,engineeringCode:engineeringFinding?.code||'NOT_EVALUATED',locate,notes,missing,dimensions,authorizationGranted:false,violationDetermined:false};
}
export function diggingRecord(a,r){
 if(!r?.active)return '';
 const text=v=>String(v??'').replace(/[\r\n]+/g,' ').trim().slice(0,180)||'Not supplied';
 const inputs=[['Purpose',a.purpose],['Tree being checked',a.target],['Tree location',a.location],['Excavation location',a.excavationArea],['Trunk diameter (in)',a.target==='same'?a.dbh:a.otherDbh],['Nearest excavation distance (ft)',a.distanceFeet],['Additional distance (in)',a.distanceInches],['Distance source',a.measurement],['Depth (in)',a.depthInches],['Width (ft)',a.widthFeet],['Length near tree (ft)',a.lengthFeet],['Digging method',a.method],['Root handling',a.rootHandling],['Work/damage status',a.stage],['Other affected trees',a.otherTrees],['Equipment/soil near roots',a.storage],['Named supervising arborist',a.arborist],['ISA credential (unverified)',a.credential],['811 status (unverified)',a.locate]];
 return ['DIGGING / UTILITY WORK NEAR A TREE — '+DIGGING_VERSION,...inputs.map(([k,v])=>k+': '+text(v)),r.title,r.proximity,r.legal,r.handling,r.coordination,r.engineering,r.locate,...r.notes,'Still needed: '+(r.missing.join('; ')||'No listed input gaps; professional review/authorization are still not verified.'),r.cityReview?'REQUEST: Please review the proposed excavation, root-protection method, supervision and applicable City approvals.':'The citywide root-protection check is separate from permit routing. No automatic City email is requested by this result; additional project approvals remain unverified.',...DIGGING_SOURCES.map(s=>s.label+': '+s.url)].join('\n');
}
