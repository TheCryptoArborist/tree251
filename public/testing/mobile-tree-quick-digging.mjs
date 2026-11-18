import {screenDigging,diggingRecord} from './mobile-tree-digging-rules.mjs';
import {rootPruningConclusion,ROOT_PRUNING_SOURCES} from './mobile-tree-root-pruning-policy.mjs';
/* Quick check is a presentation/workflow layer over the existing root rules.
 * Omitted inputs remain unknown. No new exemption, safe radius, authorization,
 * automatic violation finding, credential verification or network request.
 */
export const QUICK_DIGGING_VERSION='0.7.3';
export function quickDiggingSummary(a,r=screenDigging(a)){
 if(!r.active)return null;
 const pending=r.scope==='unresolved'||r.approvalRouteUnresolved===true;
 const rootRule=rootPruningConclusion(a,r);
 const d=r.range.distanceFeet,dbh=a.target==='same'?a.dbh:a.otherDbh;
 let root='Trunk size or excavation distance is missing or uncertain. No distance conclusion is available.';
 if(r.range.band!=='unknown')root=String(dbh)+'-inch trunk; digging '+Number(d.toFixed(2))+' feet away. '+({inner:'This is close enough to need arborist review before digging.',possible:'Important roots may be affected; have the route reviewed.',beyond:'Outside the estimated range, but this does not clear root cutting.'}[r.range.band]);
 if(r.code==='DAMAGE_REPORTED')root='Roots have reportedly been cut or torn. The damage warning takes priority over any distance calculation.';
 if(r.code==='ROOTS_EXPOSED')root='Roots are reportedly exposed. Pause work at those roots until the method has been reviewed.';
 let missing;
 if(a.city!=='inside'&&a.city!=='outside')missing='Confirm the tree is inside Mobile using the map, or provide the known location.';
 else if(a.target!=='same')missing='Locate the affected tree separately; the earlier tree pin cannot establish its property status.';
 else if(!['private','row','park','city','city-property'].includes(a.location))missing='Confirm whether the trunk is on private land, street right-of-way, or City land.';
 else missing='Confirm the property use and whether other trees or known plan conditions are involved.';
 let city=r.scope==='covered'?'The digging/root-protection check applies citywide, including private R-1/R-2 home lots. A pruning/removal permit exception is not used to bypass this check.\n\n'+rootRule.constructionRule+'\n\n'+rootRule.abuseRule:
  r.scope==='outside'?'This is outside the City of Mobile screening. Check the applicable jurisdiction.':
  'City requirements are not yet determined. '+missing+' Missing answers alone do not mean a City permit or email is required.';
 if(rootRule.ordinanceRelevant)city+='\n\n'+(r.scope==='unresolved'?'If the affected tree is inside Mobile: '+rootRule.constructionRule+'\n\n':'')+rootRule.finding;
 let next;
 if(r.code==='DAMAGE_REPORTED')next='Pause excavation in the affected area and obtain a prompt ISA Certified Arborist assessment. Keep people and equipment away from any potentially unstable tree. Report public-tree damage to Urban Forestry.';
 else if(r.code==='ROOTS_EXPOSED')next='Protect exposed roots from further work and have an ISA Certified Arborist review the method before continuing.';
 else if(r.range.band==='unknown')next='Supply the missing measurements, or have an ISA Certified Arborist assess the proposed work. Do not guess a safe digging distance.';
 else if(r.range.band==='beyond')next='Do not treat this distance result as excavation approval. Confirm the applicable site requirements and stop for root evaluation if roots are encountered.';
 else next='Have an ISA Certified Arborist review the excavation route before digging or cutting roots.';
 const urgent=['DAMAGE_REPORTED','ROOTS_EXPOSED'].includes(r.code);
 if(!urgent&&['cut','expose','stop'].includes(a.rootHandling))next=rootRule.action+(pending?' '+missing:'');
 // Method advice must not replace the independently indicated approval route.
 if(r.cityReview&&!urgent)next+=' Coordinate the root-protection and approval route with Urban Forestry.';
 // The excavation can occupy the public ROW even when the trunk is on private land.
 if(a.excavationArea==='row'&&r.scope==='covered')next+=' '+r.engineering;
 const title=!urgent&&r.scope==='covered'&&a.rootHandling==='cut'?'Change the proposed root-cutting method':r.title;
 const readyForCity=r.cityReview===true;
 return {title,root,city,next,pending,readyForCity,missing,rootRule,authorizationGranted:false};
}
export function quickDiggingRecord(a,r,s=quickDiggingSummary(a,r)){
 const record=diggingRecord(a,r).split('\n').filter(line=>!(s.pending&&line===r.coordination)&&!line.startsWith('REQUEST:')&&!line.startsWith('No automatic City review request')&&!line.startsWith('Still needed:')).join('\n');
 return record+'\n\nROOT-PRUNING METHOD: '+s.rootRule.status+'\n'+s.rootRule.finding+'\n'+s.rootRule.selectiveDefinition+'\nMethod compliance, actual ISA supervision, the actual critical root zone, and authorization are NOT VERIFIED.\n'+ROOT_PRUNING_SOURCES.map(x=>x.label+': '+x.url).join('\n')+'\n\nQUICK CHECK — '+QUICK_DIGGING_VERSION+'\nRoot-protection finding: '+s.root+'\nCity requirements: '+s.city+'\nNext action: '+s.next+'\n'+(s.pending?'CITY STATUS UNRESOLVED: Confirm the missing site facts; this is not a finding that a City permit or staff referral is required.':s.readyForCity?'REQUEST: Please review the proposed excavation and applicable root-protection requirements.':'No automatic City review request is made by this result.')+'\nOptional work-plan entries not supplied remain unknown; they have not been accepted as No or verified.';
}
export function installQuickDigging(doc){
 const $=id=>doc.getElementById(id),win=doc.defaultView,form=$('permitForm'),section=$('diggingFields'),out=$('permitOutput');
 if(!form||!section||$('digQuickCore'))return false;
 const make=(tag,text,parent)=>{const n=doc.createElement(tag);if(text)n.textContent=text;if(parent)parent.append(n);return n;};
 const val=id=>$(id)?.value||'';
 const primary=()=>['root','roots'].includes(val('scWork'));
 const read=()=>({work:val('scWork'),alsoDigging:$('digAlso')?.checked,city:val('scCity'),location:val('scLocation'),property:val('scProperty'),historic:val('scHistoric'),zoning:val('udcZoning'),taxClass:form.dataset.parcelTaxClass,splitZoned:form.dataset.splitZoned==='yes',overlay:val('udcOverlay'),plan:val('udcPlan'),target:val('digTarget'),dbh:val('scDbh'),otherDbh:val('digOtherDbh'),complexTrunk:val('digComplex')==='yes',purpose:val('digPurpose'),excavationArea:val('digArea'),distanceFeet:val('digFeet'),distanceInches:val('digInches'),measurement:val('digMeasured'),depthInches:val('digDepth'),widthFeet:val('digWidth'),lengthFeet:val('digLength'),method:val('digMethod'),rootHandling:val('digHandling'),stage:val('digStage'),otherTrees:val('digOtherTrees'),storage:val('digStorage'),arborist:val('digArborist'),credential:val('digCredential'),locate:val('dig811')});
 const originalGrid=section.querySelector(':scope > .grid');
 const core=make('div','',section);core.id='digQuickCore';core.hidden=true;core.className='grid';
 if(originalGrid)originalGrid.before(core);
 const more=make('details','',section);more.id='digQuickDetails';more.hidden=true;
 make('summary','Add work-plan details (optional)',more);
 make('p','Not needed for the initial distance check. Add these details when preparing an arborist or City review request; nothing is sent automatically.',more).className='help';
 const moreGrid=make('div','',more);moreGrid.className='grid';
 const rootFollow=make('section','');rootFollow.id='digQuickRootMethod';rootFollow.hidden=true;more.before(rootFollow);
 make('h3','One follow-up: what happens to the roots?',rootFollow);
 make('p','This answer changes the root-pruning guidance. It is not a permit application, and choosing a method does not establish approval.',rootFollow).className='help';
 const rootGrid=make('div','',rootFollow);rootGrid.className='grid';
 const follow=make('details','',section);follow.id='digQuickProperty';follow.hidden=true;
 make('summary','Confirm property details for the City requirements',follow);
 make('p','Only needed when the first result cannot establish which City rules apply. Use what you know; an unanswered item is not a No.',follow).className='help';
 const followGrid=make('div','',follow);followGrid.className='grid';
 const precision=make('details','');precision.id='digQuickDistanceDetails';
 make('summary','Add inches or identify how you measured (optional)',precision);
 const complex=make('details','');complex.id='digQuickTrunkDetails';
 make('summary','Multiple trunks or difficult to measure?',complex);
 const immediate=make('div','',core);immediate.id='digQuickImmediate';immediate.className='notice full';immediate.hidden=true;immediate.setAttribute('role','alert');
 const anchors=new Map(),labels=new Map(),helps=new Map();
 const ids=['scLocation','scDbh','scProperty','scSpecies','digPurpose','digFeet','digStage','digInches','digMeasured','digComplex','digTarget','digOtherDbh','digOtherTrees','digArea','digDepth','digWidth','digLength','digMethod','digHandling','digStorage','digArborist','digCredential','dig811'];
 for(const id of ids){const n=$(id);if(!n)continue;const box=n.parentElement,anchor=doc.createComment('quick-digging-home:'+id);box.before(anchor);anchors.set(id,{box,anchor});const l=box.querySelector('label[for="'+id+'"]');if(l)labels.set(id,{node:l,text:l.textContent});const h=box.querySelector('p.help');if(h)helps.set(id,{node:h,text:h.textContent});}
 const chapter=$('chapter64'),chapterAnchor=doc.createComment('quick-digging-chapter-home');if(chapter)chapter.before(chapterAnchor);
 const move=(id,destination)=>{const a=anchors.get(id);if(a&&a.box.parentElement!==destination)destination.append(a.box);};
 const label=(id,text)=>{const a=labels.get(id);if(a)a.node.textContent=text;};
 const help=(id,text)=>{const a=helps.get(id);if(a)a.node.textContent=a.text;};
 const originalLegend=section.querySelector('legend')?.textContent;
 const intros=[...section.querySelectorAll(':scope > p.help')].map(n=>({node:n,text:n.textContent}));
 let mode=false,epoch=0,last=null,editingDetails=false;
 function rootAlert(){
  const stage=val('digStage');immediate.hidden=!primary()||!['damaged','exposed'].includes(stage);
  if(immediate.hidden)return;
  immediate.textContent=stage==='damaged'?'Roots cut or torn? Pause excavation in that area. Obtain a prompt ISA Certified Arborist assessment. Keep people and equipment away from any potentially unstable tree; report public-tree damage to Urban Forestry. You do not need to finish this form to take that precaution.':'Roots are exposed: protect them from further work and have an ISA Certified Arborist review the method before continuing. No further form answers are needed to show this warning.';
 }
 function sync(){
  const on=primary();form.dataset.quickDigging=on?'yes':'no';
  if(on){
   core.hidden=false;more.hidden=false;if(originalGrid)originalGrid.hidden=true;
   move('scLocation',core);move('digPurpose',core);
   move(val('digTarget')==='same'?'scDbh':'digOtherDbh',core);
   move(val('digTarget')==='same'?'digOtherDbh':'scDbh',followGrid);
   move('digFeet',core);move('digStage',core);core.append(immediate);
   move('digInches',precision);move('digMeasured',precision);anchors.get('digFeet')?.box.append(precision);
   move('digComplex',complex);anchors.get(val('digTarget')==='same'?'scDbh':'digOtherDbh')?.box.append(complex);
   for(const id of ['scProperty','scSpecies','digTarget','digOtherTrees','digArea'])move(id,followGrid);
   if(chapter&&chapter.parentElement!==follow)follow.append(chapter);
   for(const id of ['digDepth','digWidth','digLength','digMethod','digStorage','digArborist','digCredential','dig811'])move(id,moreGrid);
   move('digHandling',rootFollow.hidden?moreGrid:rootGrid);
   for(const id of ['scLocation','scDbh','digPurpose','digFeet','digStage'])if(anchors.get(id)?.box.parentElement===core)anchors.get(id).box.hidden=false;
   if(val('digTarget')!=='same')anchors.get('digOtherDbh').box.hidden=false;
   label('scLocation','1. Where does the tree trunk meet the ground?');
   label('digPurpose','2. What work are you doing?');
   label(val('digTarget')==='same'?'scDbh':'digOtherDbh','3. How wide is the tree trunk, in inches?');
   label('digFeet','4. How close will digging get, in feet?');
   label('digStage','5. Have roots already been exposed or damaged?');
   help('scLocation','Use the trunk at ground level, not overhanging branches. An address or parcel line alone does not establish ownership.');
   help('scDbh','Measure straight across at 4½ feet above ground—not around the trunk. Leave blank if you have not measured it.');
   help('digFeet','Measure from the outside of the trunk to the nearest edge of digging—not the trench center. Leave blank if unknown.');
   help('digStage','Root damage shows a warning immediately, even without measurements.');
   $('screenNow').textContent='Check whether tree review is needed';
   if($('permitTitle'))$('permitTitle').textContent='Quick check before digging';
   const intro=doc.querySelector('#permitCard .stephead .muted');if(intro)intro.textContent='Use the map findings, then answer these five practical questions. Leave measurements blank if unknown; detailed work-plan information can wait.';
   if(section.querySelector('legend'))section.querySelector('legend').textContent='Five questions about the job';
   if(intros[0])intros[0].node.textContent='Check the tree marked on the map. This first result identifies root concerns and the next step—not permission to cut roots.';
   if(intros[1])intros[1].node.hidden=true;
  }else if(mode){
   for(const {box,anchor} of anchors.values())if(anchor.parentNode)anchor.after(box);
   if(chapter&&chapterAnchor.parentNode)chapterAnchor.after(chapter);
   for(const a of labels.values())a.node.textContent=a.text;
   for(const a of helps.values())a.node.textContent=a.text;
   precision.remove();complex.remove();core.hidden=true;more.hidden=true;follow.hidden=true;rootFollow.hidden=true;
   if(originalGrid)originalGrid.hidden=false;
   if(section.querySelector('legend'))section.querySelector('legend').textContent=originalLegend;
   for(const a of intros){a.node.textContent=a.text;a.node.hidden=false;}
   $('digOtherDbh').parentElement.hidden=val('digTarget')==='same';
  }
  mode=on;rootAlert();
 }
 const openSection=(n,focusId)=>{n.hidden=false;n.open=true;editingDetails=true;n.scrollIntoView({behavior:'smooth',block:'start'});const f=$(focusId);if(f)f.focus({preventScroll:true});};
 function applyCTA(summary){
  if(!primary()||out.classList.contains('hidden'))return;
  const cta=$('forestryEmailCTA'),heading=$('forestryEmailCTATitle'),button=$('reviewForestryEmail');
  if(cta){cta.classList.toggle('optional-email',!summary.readyForCity);const p=cta.querySelector('p:not(.help)');if(p)p.textContent=summary.pending?'First confirm the missing property facts. An email is optional—not an automatic requirement because an answer is unknown.':summary.readyForCity?'A review request can include your measurements. Add work-plan details only when ready; nothing is sent automatically.':'Root-protection and ISA supervision requirements remain part of the citywide check. No City email is automatically required merely because the check applies; other project approvals remain separate.';}
  if(heading)heading.textContent=summary.readyForCity?'Request City review':'Optional: Ask a question';
  if(button){button.textContent=summary.readyForCity?'Review my digging-plan email':'Ask Urban Forestry (optional)';button.classList.toggle('secondary',!summary.readyForCity);}
 }
 function renderQuick(token){
  if(token!==epoch||!primary()||out.classList.contains('hidden'))return;
  const a=read(),r=screenDigging(a),s=quickDiggingSummary(a,r),panel=$('diggingResult');
  if(!s||!panel||panel.hidden)return;
  last={a,r,s,fingerprint:JSON.stringify(a)};
  if(s.rootRule.followUpNeeded){rootFollow.hidden=false;move('digHandling',rootGrid);}
  panel.dataset.rootMethod=s.rootRule.status;
  const original=[...panel.children];panel.replaceChildren();panel.dataset.quickVersion=QUICK_DIGGING_VERSION;
  make('h3',s.title,panel);
  const rows=make('div','',panel);rows.id='digQuickResultRows';
  for(const [heading,text] of [['Root-protection finding',s.root],['City requirements',s.city],['Next action',s.next]]){const row=make('div','',rows);make('h4',heading,row);make('p',text,row);}
  make('p','No distance alone authorizes digging or cutting roots. Contact Alabama 811 before excavation; utility locating and tree-root permission are separate.',panel).className='help';
  const actions=make('div','',panel);actions.className='actions';
  if(s.rootRule.followUpNeeded){
   const b=make('button','Answer the root-handling follow-up',actions);b.id='digQuickRootFollow';b.type='button';b.className='secondary';
   b.addEventListener('click',()=>{rootFollow.hidden=false;move('digHandling',rootGrid);rootFollow.scrollIntoView({behavior:'smooth',block:'start'});$('digHandling')?.focus({preventScroll:true});});
  }
  if(s.pending){const b=make('button','Confirm the missing property details',actions);b.id='digQuickConfirm';b.type='button';b.className='secondary';b.addEventListener('click',()=>openSection(follow,'scProperty'));}
  const detailButton=make('button','Prepare a detailed review request (optional)',actions);detailButton.id='digQuickPrepare';detailButton.type='button';detailButton.className='secondary';detailButton.addEventListener('click',()=>openSection(more,'digMethod'));
  const explanation=make('details','',panel);explanation.id='digQuickExplanation';make('summary','Calculation, root-handling advice and official sources',explanation);
  make('p',s.rootRule.selectiveDefinition,explanation);
  make('p','The ordinance defines Selective Root Pruning. The cut-through description in this form is a plain-language explanation, not a separately quoted ordinance definition of non-selective root pruning. Actual critical root zone and a violation are not determined from distance alone.',explanation);
  for(const source of ROOT_PRUNING_SOURCES){const p=make('p','',explanation),link=make('a',source.label,p);link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';}
  for(const node of original)if(node.tagName!=='H3')explanation.append(node);
  // Preserve all source facts and advice, but an unresolved scope is not a
  // determination that everyone must request City approval.
  if(s.pending){
   for(const heading of explanation.querySelectorAll('h4'))if(heading.textContent==='Next action'&&heading.nextElementSibling)heading.nextElementSibling.textContent=s.missing;
   $('udcOutcome').textContent='Property requirements not yet determined';
   $('udcReason').textContent=s.city;$('udcNext').textContent=s.missing;$('udcMissing').textContent='';
   $('udcNotes').textContent='Unanswered site questions are not evidence of a permit requirement, a plan, an exemption or a mandatory staff referral.';
  }
  $('permitOutcome').textContent=s.title;$('permitReason').textContent=s.city;$('permitNext').textContent=s.next;
  $('permitMissing').textContent=r.range.band==='unknown'?'Measurements needed for the distance comparison.':'';
  if($('diggingSummary'))$('diggingSummary').textContent=quickDiggingRecord(a,r,s);
  follow.hidden=!s.pending&&!editingDetails;
  applyCTA(s);
  win.setTimeout(()=>{if(token===epoch&&last)applyCTA(s);},140);
 }
 const invalidate=()=>{epoch++;last=null;rootAlert();};
 form.addEventListener('input',invalidate);form.addEventListener('change',invalidate);
 for(const id of ['scWork','digTarget'])$(id)?.addEventListener('change',()=>win.queueMicrotask(sync));
 $('digStage')?.addEventListener('change',rootAlert);
 doc.addEventListener('submit',e=>{
  if(e.target===form){const token=++epoch;win.queueMicrotask(()=>renderQuick(token));}
  if(e.target===$('workForm'))win.setTimeout(()=>{
   if(!last||!primary()||last.s.readyForCity)return;
   const body=$('emailBody');if(!body)return;
   const start='[Requested records and project review]',end='[/Requested records and project review]';
   const i=body.value.indexOf(start),j=body.value.indexOf(end,i);
   if(i>=0&&j>=i){body.value=(body.value.slice(0,i)+body.value.slice(j+end.length)).trim();body.dispatchEvent(new win.Event('input',{bubbles:true}));}
  },0);
 });
 // Open a collapsed optional section if the visitor entered an invalid value.
 form.addEventListener('invalid',e=>{let n=e.target.parentElement;while(n&&n!==form){if(n.tagName==='DETAILS'){n.hidden=false;n.open=true;}n=n.parentElement;}},true);
 const reset=()=>{epoch++;last=null;editingDetails=false;follow.hidden=true;follow.open=false;rootFollow.hidden=true;more.open=false;precision.open=false;complex.open=false;rootAlert();};
 let bound=false;const bind=()=>{if(bound||!$('propertyMapAddress'))return;bound=true;$('propertyMapAddress').addEventListener('input',reset);};
 const observer=new win.MutationObserver(()=>{bind();if(bound)observer.disconnect();});observer.observe(doc.body,{childList:true,subtree:true});bind();
 new win.MutationObserver(()=>win.queueMicrotask(sync)).observe(form,{attributes:true,attributeFilter:['data-task-tab']});
 const style=make('style','',doc.head);style.textContent=[
 '#digQuickCore[hidden],#digQuickDetails[hidden],#digQuickProperty[hidden],#digQuickImmediate[hidden],#digQuickRootMethod[hidden]{display:none!important}',
 '#digQuickRootMethod{margin:18px 0;padding:14px;border:1px solid var(--amberline);border-radius:10px}#digQuickRootMethod .grid{grid-template-columns:1fr}',
 '#digQuickCore{grid-template-columns:1fr;gap:20px}',
 '#digQuickCore>div>label{font-size:16px}',
 '#digQuickCore .plain-explanation{display:none}',
 '#digQuickDistanceDetails,#digQuickTrunkDetails{border:0;margin:8px 0 0;padding:0}',
 '#digQuickDistanceDetails summary,#digQuickTrunkDetails summary{font-size:13px;min-height:40px;padding:8px 0}',
 '#digQuickDetails,#digQuickProperty{margin-top:18px;padding-top:14px}',
 '#digQuickResultRows h4{margin:12px 0 4px}#digQuickResultRows p{margin:0 0 8px;white-space:pre-line}',
 '#digQuickImmediate{margin:0;padding:14px;font-weight:600}',
 '#permitForm[data-quick-digging="yes"] #diggingFields> .grid[hidden]{display:none!important}',
 '#permitForm[data-quick-digging="yes"] #diggingFields .dig-terms{display:none}',
 '#digQuickExplanation{font-size:14px}',
 '@media(max-width:680px){#digQuickCore{gap:18px}#digQuickResultRows h4{font-size:15px}}'
 ].join('');
 const submit=$('screenNow');
 if(submit)new win.MutationObserver(()=>{if(primary()&&submit.textContent!=='Check whether tree review is needed')submit.textContent='Check whether tree review is needed';}).observe(submit,{childList:true,characterData:true,subtree:true});
 form.dataset.quickDiggingVersion=QUICK_DIGGING_VERSION;
 sync();win.setTimeout(sync,20);
 const footer=doc.querySelector('footer');if(footer)make('span',' · Quick digging '+QUICK_DIGGING_VERSION,footer);
 return true;
}
