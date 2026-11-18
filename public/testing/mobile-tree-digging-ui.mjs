import {DIGGING_VERSION,DIGGING_SOURCES,screenDigging,diggingRecord} from './mobile-tree-digging-rules.mjs';
/* Additive form branch. No requests, email sending, credential verification,
 * permission to cut roots, or automated violation determinations. */
export function installDigging(doc){
 const $=id=>doc.getElementById(id),win=doc.defaultView,form=$('permitForm'),out=$('permitOutput');
 if(!form||!out||$('diggingFields'))return false;
 const make=(tag,text,parent)=>{const n=doc.createElement(tag);if(text)n.textContent=text;if(parent)parent.append(n);return n;};
 const val=id=>$(id)?.value||'';
 const option=$('scWork')?.querySelector('option[value="root"]');
 if(option)option.textContent='Dig, install utilities, or disturb soil near a tree';
 const alsoWrap=make('div','');alsoWrap.className='full';
 const label=make('label','',alsoWrap);label.className='check';
 const also=make('input','',label);also.type='checkbox';also.id='digAlso';
 make('span','This job also involves digging, cutting roots, or moving soil near a tree that will remain.',label);
 make('p','Select this for additional ground work even when the main job is pruning, removal or planting. Check each tree that could be affected.',alsoWrap).className='help';
 $('scWork')?.parentElement.insertAdjacentElement('afterend',alsoWrap);
 const section=make('fieldset','');section.id='diggingFields';section.hidden=true;
 make('legend','Before digging near a tree',section);
 make('p','Describe the actual excavation. Trunk size and distance help screen for root conflicts; they cannot decide which roots are safe to cut or grant permission to dig.',section).className='help';
 make('p','Use a tree that will remain. The tree’s location and excavation location are separate: digging in your yard can affect a street tree. For another tree, its location must be checked separately.',section).className='help';
 const grid=make('div','',section);grid.className='grid';const fields={};
 function help(n,box,text){if(!text)return;const p=make('p',text,box);p.className='help';p.id=n.id+'Help';n.setAttribute('aria-describedby',p.id);}
 function select(id,text,choices,explanation){
  const box=make('div','',grid),l=make('label',text,box);l.htmlFor=id;
  const n=make('select','',box);n.id=id;for(const [value,title] of choices){const o=make('option',title,n);o.value=value;}help(n,box,explanation);fields[id]=n;return n;
 }
 function input(id,text,explanation,{min=0,max=null,type='number',length=120}={}){
  const box=make('div','',grid),l=make('label',text,box);l.htmlFor=id;
  const n=make('input','',box);n.id=id;n.type=type;n.autocomplete='off';
  if(type==='number'){n.min=String(min);n.step='any';n.inputMode='decimal';n.placeholder='Unknown / not measured';if(max!==null)n.max=String(max);}
  else{n.maxLength=length;n.placeholder='Optional — not verified';}
  help(n,box,explanation);fields[id]=n;return n;
 }
 const unknown=['unknown',"I'm not sure / not decided"];
 select('digTarget','Which tree could lose roots?',[
  ['same','The tree already entered in this checker'],['other','A different tree that will remain'],unknown
 ],'For planting or removal, consider the other trees that will remain. The original map pin does not identify a different tree.');
 input('digOtherDbh','Different tree: trunk width in inches','Measure at 4½ feet above ground. Do not use a new sapling or a tree being removed to assess another tree.',{min:0.1});
 select('digComplex','Can the trunk be measured reliably?',[
  ['no','Yes — one trunk with a reliable diameter'],['yes','Multiple stems, unusual trunk, or measurement uncertain']
 ],'An uncertain measurement does not produce a numeric root-zone conclusion.');
 select('digPurpose','What are you installing or repairing?',[
  unknown,['utility','Water, sewer, gas, electricity, cable or another utility'],['drainage','Drainage or a stormwater pipe'],['sidewalk','Sidewalk'],['driveway','Driveway or parking area'],['curbcut','Curb cut or new driveway entrance'],['fence','Fence posts or small holes'],['foundation','Building, foundation or other construction'],['other','Other ground work']
 ]);
 select('digArea','Where will the digging happen?',[
  unknown,['private','On private land'],['row','In the public street area / right-of-way'],['city','In a City park or on other City land'],['mixed','Across more than one type of property']
 ],'This can differ from the tree location. A sidewalk, fence or gap in a parcel map does not establish ownership.');
 input('digFeet','Nearest edge of digging: feet','Measure from the nearest outside edge of the trunk at ground level to the closest excavation edge—not the middle of a trench. This is the tool’s screening convention, not an ordinance-specified endpoint.');
 input('digInches','Additional inches, if any','For 10 feet 6 inches, enter 10 feet and 6 inches. Zero is allowed for work touching the trunk; blank is unknown.',{max:11.99});
 select('digMeasured','How was the distance obtained?',[unknown,['measured','Measured on the ground'],['estimated','Estimated; not yet measured']]);
 input('digDepth','Planned excavation depth: inches','Describe the deepest part near this tree. Depth is recorded for review, not used to declare digging safe.');
 input('digWidth','Excavation or trench width: feet','Include the full excavation width and working space.');
 input('digLength','Excavation length near this tree: feet','Approximate length of trench or excavation alongside the tree.');
 select('digMethod','How will the ground be opened?',[
  unknown,['machinery','Excavator, backhoe, trencher or other machinery'],['hand','Hand tools'],['air-water','Air or water excavation to expose roots'],['boring','Underground boring / trenchless installation']
 ],'No method automatically permits root cutting. Include boring entry and exit pits in the work plan.');
 select('digHandling','What will happen if roots are encountered?',[
  unknown,['stop','Stop and ask an ISA Certified Arborist to evaluate them'],['expose','Expose and evaluate individual roots before cuts, with arborist supervision'],['cut','Cut through roots as digging proceeds']
 ],'Describe what the crew will do; you do not need to classify the work as selective or non-selective root pruning.');
 select('digStage','Has work started, or have roots been affected?',[
  ['unknown',"I don't know"],['not-started','Work has not started'],['started','Work started; no root damage observed'],['exposed','Roots are exposed; no cutting or tearing observed'],['damaged','Roots have been cut, torn or otherwise damaged']
 ],'Your observations are not a verified arborist assessment or a City finding of tree abuse.');
 select('digOtherTrees','Could this job affect other or neighboring trees?',[
  unknown,['no','No — only the tree being checked'],['yes','Yes — other trees may be affected']
 ],'One tree measurement cannot clear an entire trench.');
 select('digStorage','Will equipment, materials or piled soil be near the roots?',[
  unknown,['no','No'],['equipment','Equipment or vehicles'],['soil','Excavated soil, materials or liquids'],['both','Both equipment and piled materials']
 ],'Construction can affect roots outside the excavation itself.');
 input('digArborist','Supervising ISA Certified Arborist: name','A tree-service name alone does not establish who supervises root decisions.',{type:'text'});
 input('digCredential','ISA certification number','Recorded for follow-up, not verified by this tool.',{type:'text',length:60});
 select('dig811','What is the underground utility-locate status?',[
  ['unknown',"I don't know"],['not-requested','Not requested'],['pending','Requested; waiting for notice period or responses'],['reported-complete','Required notice and responses reported complete']
 ],'811 utility locating is separate from tree-root permission. The checker does not verify the ticket.');
 const terms=make('details','',section);terms.className='dig-terms';
 make('summary','What do “selective root pruning” and “tree abuse” mean?',terms);
 make('p','Expose first, evaluate individual roots, then decide: Chapter 65 describes selective root pruning using air, water or hand excavation followed by individual root cutting under ISA Certified Arborist supervision. Choosing an answer does not establish compliance.',terms);
 make('p','Cutting through whatever roots are in the path is different. On covered sites, non-selective root cutting in the critical root zone can violate root-protection provisions. Section 65-10 addresses public or heritage-tree root damage, including curb, sidewalk and driveway work. A distance alone does not establish a violation.',terms);
 make('p','City-recognized agricultural/nursery exceptions and City-issued emergency waivers need separate verification. Utility-line clearing is not treated as an exemption for underground excavation.',terms);
 if($('chapter64'))$('chapter64').before(section);else form.append(section);
 const panel=make('section','');panel.id='diggingResult';panel.hidden=true;panel.setAttribute('aria-live','polite');out.prepend(panel);
 const css=make('style','',doc.head);css.textContent=[
 '#diggingFields[hidden],#diggingResult[hidden]{display:none!important}',
 '#diggingFields{border:1px solid var(--line);border-radius:12px;padding:18px;margin:18px 0}',
 '#diggingFields legend{font-size:20px;font-weight:750;padding:0 8px}',
 '#diggingFields .grid{gap:20px}#diggingFields input,#diggingFields select{max-width:100%;min-width:0}',
 '#diggingFields .dig-terms{margin-top:18px}',
 '#diggingResult{border:2px solid var(--amberline);background:var(--amber);padding:18px;margin:0 0 18px;border-radius:12px;overflow-wrap:anywhere}',
 '#diggingResult h3{font-size:22px;line-height:1.3;margin:0 0 12px}',
 '#diggingResult h4{font-size:16px;margin:18px 0 5px}#diggingResult p{margin:6px 0 10px}',
 '#diggingSummary{white-space:pre-line;overflow-wrap:anywhere}',
 '#permitOutput[data-digging-primary="yes"] #simplePermitAnswer{display:none!important}',
 '@media(max-width:640px){#diggingFields,#diggingResult{padding:14px}#diggingResult h3{font-size:20px}}'
 ].join('');
 let epoch=0,last=null;
 const primary=()=>['root','roots'].includes(val('scWork'));
 const active=()=>primary()||also.checked;
 function updateVisibility(){
  const on=active();form.dataset.diggingActive=on?'yes':'no';section.hidden=!on;also.disabled=primary();
  for(const n of Object.values(fields))n.disabled=!on;
  const other=val('digTarget')!=='same';$('digOtherDbh').parentElement.hidden=!other;$('digOtherDbh').disabled=!on||!other;
  win.setTimeout(()=>{if(active()&&val('digTarget')==='same'&&$('scDbh'))$('scDbh').parentElement.hidden=false;},0);
 }
 const read=()=>({work:val('scWork'),alsoDigging:also.checked,city:val('scCity'),location:val('scLocation'),property:val('scProperty'),historic:val('scHistoric'),zoning:val('udcZoning'),taxClass:form.dataset.parcelTaxClass,splitZoned:form.dataset.splitZoned==='yes',overlay:val('udcOverlay'),plan:val('udcPlan'),target:val('digTarget'),dbh:val('scDbh'),otherDbh:val('digOtherDbh'),complexTrunk:val('digComplex')==='yes',purpose:val('digPurpose'),excavationArea:val('digArea'),distanceFeet:val('digFeet'),distanceInches:val('digInches'),measurement:val('digMeasured'),depthInches:val('digDepth'),widthFeet:val('digWidth'),lengthFeet:val('digLength'),method:val('digMethod'),rootHandling:val('digHandling'),stage:val('digStage'),otherTrees:val('digOtherTrees'),storage:val('digStorage'),arborist:val('digArborist'),credential:val('digCredential'),locate:val('dig811')});
 function invalidate(){epoch++;last=null;panel.hidden=true;out.dataset.diggingPrimary='no';$('diggingSummary')?.remove();}
 form.addEventListener('input',invalidate);form.addEventListener('change',invalidate);
 for(const n of [also,$('scWork'),$('digTarget')])n?.addEventListener('change',updateVisibility);
 function render(token){
  if(token!==epoch||out.classList.contains('hidden')||!active())return;
  const a=read(),r=screenDigging(a);last={input:a,result:r,fingerprint:JSON.stringify(a)};
  out.dataset.diggingPrimary=primary()?'yes':'no';panel.replaceChildren();panel.hidden=false;panel.dataset.outcome=r.code;panel.dataset.scope=r.scope;
  make('h3',r.title,panel);const part=(title,text)=>{make('h4',title,panel);make('p',text,panel);};
  part('How close is the work?',r.proximity);part('What to do about roots',r.handling);part('City tree requirements',r.legal);part('Next action',r.coordination);part('Digging permissions and utility locating',r.engineering+' '+r.locate);
  if(r.missing.length)make('p','Still needed: '+r.missing.join('; ')+'.',panel).className='help';
  const details=make('details','',panel);make('summary','Calculation limits and official sources',details);
  for(const note of r.notes)make('p',note,details);
  for(const s of DIGGING_SOURCES){const p=make('p','',details),a=make('a',s.label,p);a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';}
  $('diggingSummary')?.remove();const summary=make('p',diggingRecord(a,r));summary.id='diggingSummary';$('permitNotes')?.append(summary);
  if(primary()){
   $('permitOutcome').textContent=r.title;$('permitReason').textContent=r.legal;
   $('permitMissing').textContent=r.missing.length?'Still needed: '+r.missing.join('; '):'';
   $('permitNext').textContent=r.coordination+' '+r.engineering;
   if(r.scope==='residential-exception'){
    $('udcOutcome').textContent='No standard Chapter 64 landscaping review indicated for this home';
    $('udcReason').textContent='The reported habitable single-/two-family site is R-1/R-2, outside the identified special districts, with no known approved plan affecting the work. This is separate from excavation safety and any Engineering approval.';
    $('udcMissing').textContent='';$('udcNext').textContent=r.engineering;
    $('udcNotes').textContent='An unknown historical plan alone is not treated as a mandatory staff referral for this reported ordinary residence. No site approval, utility ticket or contractor credential has been verified.';
   }
  }
  // Run after the existing 40 ms presentation pass, without changing its
  // pruning/removal finding. A no-tree-permit result is not digging clearance.
  win.setTimeout(()=>{
   if(token!==epoch||out.classList.contains('hidden')||!last)return;
   const simple=$('simplePermitAnswer'),rows=$('simpleResultRows');
   if(!primary()&&simple&&rows){
    const row=make('div','',rows);make('strong','Digging / roots',row);make('span',r.title+'. '+r.coordination,row);
    if(simple.dataset.outcome==='residential-no-permit'){
     simple.dataset.outcome='tree-permit-with-root-advice';const title=simple.querySelector('h3');if(title)title.textContent='No pruning/removal permit indicated—digging needs a separate check';
     for(const row of rows.children)if(row.firstElementChild?.textContent==='Next step')row.lastElementChild.textContent=r.coordination;
    }
   }
   const cta=$('forestryEmailCTA'),heading=$('forestryEmailCTATitle'),button=$('reviewForestryEmail');
   const optional=!r.cityReview&&(primary()||$('permitOutcome')?.textContent.startsWith('No Chapter 65'));
   if(cta){cta.classList.toggle('optional-email',optional);const p=cta.querySelector('p:not(.help)');if(p)p.textContent=optional?'Arborist advice and utility locating remain separate. No automatic Urban Forestry referral is made for this reported residential exception.':'Review an email containing the excavation measurements, method and root-protection questions. Nothing is sent automatically.';}
   if(heading)heading.textContent=optional?'Optional: Ask about the digging plan':'Ask Urban Forestry to review the digging plan';
   if(button){button.textContent=optional?'Ask a digging question (optional)':'Review my digging-plan email';button.classList.toggle('secondary',optional);}
  },80);
 }
 doc.addEventListener('submit',e=>{
  if(e.target===form){const token=++epoch;last=null;panel.hidden=true;out.dataset.diggingPrimary='no';win.queueMicrotask(()=>render(token));}
  if(e.target===$('workForm'))win.queueMicrotask(()=>{
   // Remove only the legacy module's generated staff-plan request for a root-
   // only ordinary home result. Keep user notes and the new root record intact.
   if(!last||!primary()||last.result.scope!=='residential-exception')return;
   const body=$('emailBody');if(!body)return;const start='[Requested records and project review]',end='[/Requested records and project review]';
   const i=body.value.indexOf(start),j=body.value.indexOf(end,i);
   if(i>=0&&j>=i){body.value=(body.value.slice(0,i)+body.value.slice(j+end.length)).trim();body.dispatchEvent(new win.Event('input',{bubbles:true}));}
  });
 });
 // Prevent silent programmatic root-field edits from reusing an old result.
 for(const id of ['reviewForestryEmail','sendToEmail','copyScreeningSummary','saveScreeningSummary'])$(id)?.addEventListener('click',e=>{
  if(last&&last.fingerprint!==JSON.stringify(read())){e.preventDefault();e.stopImmediatePropagation();invalidate();out.classList.add('hidden');$('draftArea')?.classList.add('hidden');if($('resultWorkflowStatus'))$('resultWorkflowStatus').textContent='Digging details changed. Check again before using this result.';}
 },true);
 const resetSite=()=>{invalidate();for(const n of Object.values(fields)){if(n.tagName==='SELECT')n.selectedIndex=0;else n.value='';}updateVisibility();};
 let bound=false;const bind=()=>{if(bound||!$('propertyMapAddress'))return;bound=true;$('propertyMapAddress').addEventListener('input',resetSite);};
 const observer=new win.MutationObserver(()=>{bind();if(bound)observer.disconnect();});observer.observe(doc.body,{childList:true,subtree:true});bind();
 updateVisibility();form.dataset.diggingVersion=DIGGING_VERSION;
 const footer=doc.querySelector('footer');if(footer)make('span',' · Digging and root protection '+DIGGING_VERSION,footer);
 return true;
}
