/* Brief Forestry email 0.8.0. Correspondence only; no decision-rule changes.
 * The detailed screening record is saved separately, never pasted into mail.
 * Reported facts remain reported; no credentials, ownership or permission verified.
 */
export const BRIEF_EMAIL_VERSION='0.8.0';
const line=v=>String(v??'').replace(/[\r\n\t]+/g,' ').trim();
const known=v=>line(v)&&!['unknown',''].includes(line(v));
const number=v=>v!==''&&v!==null&&v!==undefined&&Number.isFinite(Number(v))&&Number(v)>=0?Number(v):null;
const locations={private:'private property',row:'public street right-of-way',park:'a City park',city:'other City property','city-property':'other City property',mixed:'more than one property area'};
const purposes={utility:'utility installation or repair',drainage:'drainage work',sidewalk:'sidewalk work',driveway:'driveway or parking-area work',curbcut:'a curb cut / driveway entrance',fence:'fence-post work',foundation:'foundation or building work',other:'other ground work'};
const methods={machinery:'machinery',hand:'hand tools','air-water':'air/water excavation',boring:'underground boring'};
const handling={cut:'The proposed method cuts through roots as digging proceeds.',expose:'The proposed plan is to expose roots and evaluate individual cuts with arborist supervision.',stop:'The proposed plan is to stop at roots for arborist evaluation.'};
const stages={'not-started':'Work has not started.',started:'Work has started; no root damage has been reported.',exposed:'Roots are reportedly exposed; no cutting or tearing was reported.',damaged:'Roots have reportedly been cut or torn.'};
const workNames={removal:'tree removal',pruning:'tree pruning',planting:'tree planting',clearing:'land clearing',relocation:'tree relocation',root:'digging / utility work near a tree',roots:'digging / utility work near a tree','root or construction work':'digging / utility work near a tree',other:'tree work'};
export function removeGeneratedNotes(value=''){
 let text=String(value);
 for(const [start,end] of [['--- BEGIN TREE251 SCREENING SUMMARY ---','--- END TREE251 SCREENING SUMMARY ---'],['[Tree251 worker-qualification guidance]','[/Tree251 worker-qualification guidance]'],['[Requested records and project review]','[/Requested records and project review]']]){
  let i=text.indexOf(start);
  while(i>=0){const j=text.indexOf(end,i);if(j<0)break;text=text.slice(0,i)+text.slice(j+end.length);i=text.indexOf(start);}
 }
 return text.trim(); // Never truncate the visitor's own explanation.
}
export function buildBriefForestryEmail(a={}){
 const address=line(a.address)||'[Property address / nearest location]';
 const work=workNames[a.work]||'tree work';
 const primary=['root','roots','root or construction work'].includes(a.work);
 const digging=primary||a.alsoDigging===true;
 const different=digging&&a.target&&a.target!=='same';
 const damage=digging&&a.stage==='damaged';
 const subject=(damage?'Root damage reported':digging?'Digging near a tree':a.work==='pruning'?'Tree pruning review':'Tree-work question')+' — '+address;
 const rows=['Hello Urban Forestry,','',`I am requesting guidance on ${work}${!primary&&digging?' with nearby digging':''} at ${address}.`,''];
 if(digging&&stages[a.stage])rows.push(stages[a.stage]);
 if(different){
  rows.push('The digging affects a different tree; its location and species are not established by the original tree record.');
  if(number(a.otherDbh)>0)rows.push('Affected tree trunk width: '+number(a.otherDbh)+' inches (reported).');
 }else{
  const tree=[];
  if(known(a.species)&&!/not sure|not identified|unknown|identification needed/i.test(a.species))tree.push(line(a.species));
  if(number(a.dbh)>0)tree.push('trunk width '+number(a.dbh)+' inches');
  if(tree.length)rows.push('Tree: '+tree.join('; ')+' (reported).');
  const location=locations[a.location]||line(a.location).replace(/\s*[—–].*$/,'');
  rows.push('Tree location: '+(location&&!/unknown|not sure/i.test(location)?location+' (reported).':'boundary / ownership not confirmed.'));
 }
 if(line(a.description))rows.push('Location details: '+line(a.description));
 if(a.work==='pruning'&&number(a.limb)>0)rows.push('Largest branch proposed for cutting: '+number(a.limb)+' inches in diameter.');
 if(digging){
  if(purposes[a.purpose])rows.push('Project: '+purposes[a.purpose]+'.');
  const feet=number(a.distanceFeet),inches=number(a.distanceInches);
  if(feet!==null||inches!==null){
   const distance=(feet??0)+(inches??0)/12;
   const source=a.measurement==='measured'?'reported field measurement':a.measurement==='estimated'?'estimate':'reported; measurement not confirmed';
   rows.push('Nearest digging edge: '+Number(distance.toFixed(2))+' feet from the outside of the trunk ('+source+').');
  }
  const dims=[['depth',a.depthInches,'inches'],['width',a.widthFeet,'feet'],['length near the tree',a.lengthFeet,'feet']].filter(([,v])=>number(v)!==null).map(([k,v,u])=>k+' '+number(v)+' '+u);
  if(dims.length)rows.push('Excavation: '+dims.join('; ')+'.');
  if(locations[a.excavationArea])rows.push('Digging location: '+locations[a.excavationArea]+' (reported).');
  if(methods[a.method])rows.push('Equipment / method: '+methods[a.method]+'.');
  if(handling[a.rootHandling])rows.push(handling[a.rootHandling]);
  if(a.otherTrees==='yes')rows.push('Other or neighboring trees may also be affected.');
 }
 if(a.suspectedStormDamage)rows.push('Possible storm damage is an observation, not a confirmed arborist finding.');
 const arborist=line(a.arborist),credential=line(a.credential);
 if(arborist||credential)rows.push('Proposed arborist: '+[arborist,credential].filter(Boolean).join(' / ')+' (not verified by the checker).');
 if(known(a.caseNumber))rows.push('Project / permit reference supplied: '+line(a.caseNumber));
 const notes=[removeGeneratedNotes(a.reason),removeGeneratedNotes(a.notes)].filter(Boolean);
 if(notes.length)rows.push('',...new Set(notes));
 const request=damage?'Please advise on the reported damage, arborist assessment, and any City follow-up required.':digging?'Please advise what root-protection measures, arborist supervision, and City approvals are needed for this work.':a.work==='planting'?'Please advise on the proposed planting and any Urban Forestry or Engineering approvals needed.':'Please advise whether this work needs City approval and what information you need to review it.';
 rows.push('',request);
 if(a.planReview)rows.push('Please also check whether an approved landscaping plan affects this tree.');
 rows.push('',line(a.name)||'[Your name]',[line(a.phone),line(a.email)].filter(Boolean).join(' | ')||'[Your phone or email]');
 return {subject,body:rows.join('\n'),version:BRIEF_EMAIL_VERSION};
}
export function readForestryEmailFacts(doc,linked=false){
 const get=id=>doc.getElementById(id),v=id=>get(id)?.value||'';
 // Unlinked/manual drafts use only the visible email form, never stale check answers.
 const a={address:v('propertyAddress'),location:v('location'),work:v('work'),species:v('species'),dbh:v('dbh'),limb:v('limbDiameter'),description:v('treeDescription'),reason:v('reason'),notes:v('scope'),arborist:v('arborist'),name:v('contactName'),phone:v('phone'),email:v('email'),suspectedStormDamage:!!get('storm')?.checked};
 if(!linked)return a;
 a.work=v('scWork');a.location=v('scLocation');a.alsoDigging=!!get('digAlso')?.checked;
 a.planReview=v('udcPlan')==='yes'||(['commercial','undeveloped','multifamily'].includes(v('scProperty'))&&v('udcPlan')!=='no');
 a.caseNumber=v('residentLDNumber');
 const digging=['root','roots'].includes(a.work)||a.alsoDigging;
 if(digging){
  const fields={target:'digTarget',otherDbh:'digOtherDbh',purpose:'digPurpose',excavationArea:'digArea',distanceFeet:'digFeet',distanceInches:'digInches',measurement:'digMeasured',depthInches:'digDepth',widthFeet:'digWidth',lengthFeet:'digLength',method:'digMethod',rootHandling:'digHandling',stage:'digStage',otherTrees:'digOtherTrees',credential:'digCredential'};
  for(const [key,id] of Object.entries(fields))a[key]=v(id);
  a.arborist=v('digArborist')||a.arborist;
 }
 return a;
}
