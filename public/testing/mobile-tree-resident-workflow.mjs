import {RESIDENT_VERSION,mappedProperty,propertyIsDifferent,staffPlanReview,engineeringReview} from './mobile-tree-property-policy.mjs';
/* Presentation and record handoff. Underlying Chapter 65 species/size rules remain unchanged.
 * Zoning is looked up for the selected property address, not borrowed from a tree across a boundary.
 * Only user-requested City lookups run. No contacts, photos, emails or permit submissions are sent.
 */
export function installResidentWorkflow(doc,interpret) {
  const el=id=>doc.getElementById(id),win=doc.defaultView,form=el('permitForm');
  if(!form||form.dataset.residentWorkflow)return false;
  form.dataset.residentWorkflow=RESIDENT_VERSION;
  const make=(tag,text,parent)=>{const n=doc.createElement(tag);if(text)n.textContent=text;if(parent)parent.append(n);return n;};
  const emit=n=>{n.dispatchEvent(new win.Event('input',{bubbles:true}));n.dispatchEvent(new win.Event('change',{bubbles:true}));};
  const label=(id,s)=>{const n=doc.querySelector('label[for="'+id+'"]');if(n)n.textContent=s;};
  const replaceOptions=(n,items)=>{const previous=n.value;n.replaceChildren();for(const [value,s] of items){const o=make('option',s,n);o.value=value;}n.value=items.some(x=>x[0]===previous)?previous:'unknown';};
  let property=null,propertyContext=null,treeContext=null,address='',revision=0,controller=null,loading=false,writing=false;
  let mappingInstalled=false,propertyMode='',propertyError='',mismatch=false;
  const sources={};
  for(const [id,title] of [['udcZoning','Property zoning — found automatically'],['udcOverlay','Mapped special districts — found automatically']]){
    const field=el(id);if(!field)continue;label(id,title);field.hidden=true;field.classList.add('resident-record-control');
    const record=make('p','Enter and select the address above. The checker will retrieve these records; you do not need to know the zoning code.',field.parentElement);
    record.id=id+'Record';record.className='safe';record.setAttribute('role','status');
    const oldHelp=[...field.parentElement.children].find(n=>n.matches('p.help'));
    if(oldHelp)oldHelp.textContent='Read from City map records. If records are missing or conflicting, the result calls for staff verification instead of asking you to guess.';
    for(const d of field.parentElement.querySelectorAll('details.plain-explanation'))d.hidden=true;
  }
  const styles=make('style','',doc.head);styles.textContent='.resident-record-control[hidden]{display:none!important}#residentRecordsState,#residentPlanHelp,#residentEngineering,#residentProjectSummary{overflow-wrap:anywhere}.resident-staff-list{padding-left:22px;font-size:14px}#residentPlanHelp{margin:12px 0}#residentLDFields[hidden]{display:none!important}';
  const chapter=el('chapter64');
  const heading=chapter?.querySelector('legend');if(heading)heading.textContent='Project details and records City staff may need to check';
  const intro=chapter?.querySelector(':scope > p.help');if(intro)intro.textContent='You are not expected to find or interpret an approved landscape plan. For an applicable site, the prepared email asks City staff to retrieve the plan and check this tree.';
  const five=el('udcQuestions');if(five)five.hidden=true;
  for(const id of ['udcRequiredTree','udcCredit','udcBuffer']){const n=el(id);if(n)n.value='unknown';}
  const plan=el('udcPlan');
  if(plan){chapter.append(plan.parentElement);replaceOptions(plan,[['unknown',"I don't know"],['yes','Yes, I know the City approved a plan']]);
    label('udcPlan','Do you already know of a City-approved plan for this property?');
    const help=plan.parentElement.querySelector('p.help');if(help)help.textContent='It is fine not to know. You do not need to search City files or decide whether this tree appears on the plan.';
    for(const d of plan.parentElement.querySelectorAll('details'))d.hidden=true;
  }
  const help=make('div','',chapter);help.id='residentPlanHelp';help.className='safe';
  make('strong','City staff will check the approved drawing, when a plan applies:',help);
  const list=make('ul','',help);list.className='resident-staff-list';
  for(const s of ['Whether this tree is at a required planting location or is marked to be retained.','Whether it was preserved or counted toward required landscaping.','Whether removing it changes required street-front, parking-area or screening plantings.'])make('li',s,list);
  make('p','A missing online case does not prove no plan exists. Plan review is separate from the tree-permit result.',help);
  const development=el('udcDevelopment');
  if(development){chapter.append(development.parentElement);label('udcDevelopment','Is this tree work connected to a building project, site expansion or land clearing?');
    replaceOptions(development,[['unknown',"I'm not sure of the full project"],['no','No — only routine tree work'],['yes','Yes — part of construction or site work']]);}
  const ldBox=make('div','',chapter);ldBox.id='residentLDFields';ldBox.hidden=true;ldBox.className='grid';
  const ldWrap=make('div','',ldBox);label;
  const ldLabel=make('label','What is the land-disturbance permit status, if known?',ldWrap);ldLabel.htmlFor='residentLDStatus';
  const ld=make('select','',ldWrap);ld.id='residentLDStatus';
  replaceOptions(ld,[['unknown',"I don't know"],['planned','Not applied for yet / planning the project'],['pending','Applied for — decision pending'],['issued','A permit has been issued']]);
  make('p','An issued land-disturbance permit does not automatically answer whether separate tree approval is needed.',ldWrap).className='help';
  const caseWrap=make('div','',ldBox);const caseLabel=make('label','Permit or project number (optional)',caseWrap);caseLabel.htmlFor='residentLDNumber';
  const caseNumber=make('input','',caseWrap);caseNumber.id='residentLDNumber';caseNumber.maxLength=100;caseNumber.autocomplete='off';
  function propertyQuestions(){
    const field=el('scProperty');if(!field)return;
    const mode=property?.zoning==='r1r2'&&!mismatch?'residential':'other';
    if(mode===propertyMode)return;propertyMode=mode;const before=field.value;
    if(mode==='residential'){
      label('scProperty','What is on this residential property now?');
      replaceOptions(field,[['unknown',"I'm not sure"],['developed','A house or duplex that is fit to live in'],['undeveloped','A vacant home lot — no habitable house or duplex'],['multifamily','Something else: apartments, a business, church or mixed use']]);
    }else{
      label('scProperty','What is on the property now?');
      replaceOptions(field,[['unknown',"I'm not sure"],['developed','A house or duplex that is fit to live in'],['undeveloped','An undeveloped residential lot'],['commercial','A business or other nonresidential site (occupied or vacant)'],['multifamily','Apartments, mixed use or another situation']]);
    }
    if(before!==field.value)emit(field);
    const info=field.parentElement.querySelector('p.help');if(info)info.textContent=mode==='residential'?'City records show residential zoning. Please confirm whether a habitable home actually exists; the zoning map cannot tell us that. Choose Something else if the actual use differs.':'Tell us the current condition and use. Zoning is not proof of a habitable building or of the actual use.';
  }
  function scopeQuestions(){
    const work=el('scWork')?.value;
    label('scLocation',work==='planting'?'Where will the new tree be planted?':'Where does the tree trunk meet the ground?');
    const loc=el('scLocation');const info=loc?.parentElement.querySelector('p.help');if(info)info.textContent=work==='planting'?'Identify the actual planting spot, not the nearest house. Planting in City street land uses Engineering’s right-of-way permit process.':'We need the location of the trunk at ground level—not where branches hang over a road, yard or property line. Choose unsure if the boundary is not established.';
    const branch=el('scLimb')?.parentElement;if(branch)branch.hidden=work!=='pruning';
    const trunk=el('scDbh')?.parentElement;if(trunk)trunk.hidden=work==='planting';
    ldBox.hidden=!(development?.value==='yes'||['root','clearing'].includes(work));
  }
  function setValue(id,value){const n=el(id);if(!n||n.value===value)return;writing=true;try{n.value=value;emit(n);}finally{writing=false;}}
  function refreshRecords(){
    const zone=el('udcZoningRecord'),overlay=el('udcOverlayRecord');
    if(!property){
      const msg=loading?'Looking up the selected property’s zoning and mapped districts…':propertyError||'Select the property address above. The checker retrieves zoning and mapped districts; you do not need to supply a code.';
      if(zone)zone.textContent=msg;if(overlay)overlay.textContent=msg;
      setValue('udcZoning','unknown');setValue('udcOverlay','unknown');
    }else{
      if(zone)zone.textContent=property.zoneText+' — property address lookup. '+(mismatch?'The tree pin is in a different mapped parcel: confirm the correct property before using its zoning.':property.caution);
      if(overlay)overlay.textContent=property.overlayText+' Prior site/landscape-plan conditions require a separate records review.';
      setValue('udcZoning',mismatch?'unknown':property.zoning);setValue('udcOverlay',mismatch?'unknown':property.overlay);
    }
    propertyQuestions();
  }
  const clearProperty=()=>{revision++;controller?.abort();controller=null;property=null;propertyContext=null;treeContext=null;address='';loading=false;mismatch=false;propertyError='';refreshRecords();};
  async function loadProperty(value){
    value=String(value||'').trim();if(!value||!el('propertyMapConsent')?.checked){clearProperty();return;}
    if(value===address&&(property||loading))return;
    clearProperty();address=value;loading=true;refreshRecords();controller=new win.AbortController();const token=revision;
    const request=async params=>{const r=await win.fetch('/api/mobile-tree-gis?'+new URLSearchParams(params),{signal:controller.signal,cache:'no-store'});const data=await r.json();if(!r.ok||data.status!=='ok')throw Error('City records unavailable');return data;};
    try{
      const found=await request({mode:'address',q:value});if(token!==revision)return;
      const norm=s=>String(s||'').toUpperCase().replace(/\s+/g,' ').trim();
      const exact=found.features.filter(f=>norm(f.attributes?.address)===norm(value));
      if(exact.length!==1)throw Error('The property reference address could not be uniquely verified.');
      const p=exact[0].geometry;if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y))throw Error('Property coordinates unavailable');
      const data=await request({mode:'context',lon:String(p.x),lat:String(p.y)});if(token!==revision)return;
      propertyContext=interpret(data,{emit:false});property=mappedProperty(propertyContext.facts);
      mismatch=propertyIsDifferent(propertyContext.facts,treeContext?.facts);loading=false;
      sources.address=value;sources.point={lon:p.x,lat:p.y};sources.fetchedAt=data.fetchedAt;
      refreshRecords();
    }catch{if(token===revision){loading=false;propertyError='The property’s zoning or special-area records could not be verified. Staff verification is needed; you are not expected to choose a zoning code.';refreshRecords();}}
  }
  // Property zoning remains based on the selected address; a nearby tree pin is a separate fact.
  doc.addEventListener('tree251:map-context',e=>{
    treeContext=e.detail;mismatch=propertyIsDifferent(propertyContext?.facts,treeContext?.facts);
    if(property&&!mismatch){
      if(property.zoning!=='unknown')treeContext.proposals.udcZoning=property.zoning;
      if(property.overlay!=='unknown')treeContext.proposals.udcOverlay=property.overlay;
    }
    refreshRecords();
  });
  for(const id of ['udcZoning','udcOverlay'])el(id)?.addEventListener('change',()=>{if(!writing&&property)win.queueMicrotask(refreshRecords);});
  const addressField=el('propertyAddress');addressField?.addEventListener('input',()=>loadProperty(addressField.value));
  const bindMap=()=>{
    if(mappingInstalled||!el('propertyMapAddress'))return;mappingInstalled=true;
    el('propertyMapAddress').addEventListener('input',clearProperty);
    el('propertyMapConsent')?.addEventListener('change',()=>{if(!el('propertyMapConsent').checked)clearProperty();});
    el('applyMapAnswers')?.addEventListener('click',()=>win.queueMicrotask(refreshRecords));
  };
  const observer=new win.MutationObserver(()=>{bindMap();if(mappingInstalled)observer.disconnect();});observer.observe(doc.body,{childList:true,subtree:true});bindMap();
  el('scWork')?.addEventListener('change',scopeQuestions);development?.addEventListener('change',scopeQuestions);scopeQuestions();propertyQuestions();
  const read=()=>({city:el('scCity')?.value,location:el('scLocation')?.value,work:el('scWork')?.value,property:el('scProperty')?.value,
    zoning:el('udcZoning')?.value,overlay:el('udcOverlay')?.value,plan:el('udcPlan')?.value,development:development?.value,
    landDisturbance:ld.value,caseNumber:caseNumber.value.trim()});
  const engineering=make('section','');engineering.id='residentEngineering';engineering.className='notice';engineering.hidden=true;
  el('udcResultSection')?.before(engineering);
  let lastRequest='';
  function paintStaffReview(){
    const a=read(),review=staffPlanReview(a),eng=engineeringReview(a);
    el('udcOutcome').textContent=review.title;el('udcReason').textContent=review.reason;el('udcNext').textContent=review.next;
    el('udcMissing').textContent=review.code==='STAFF_VERIFICATION'?'To be checked by City staff—not questions the resident must research.':'';
    const notes=el('udcNotes');notes.replaceChildren();
    make('p','No staff review has been requested or completed by this website. Use the prepared email to ask for it.',notes);
    if(review.projectNote)make('p',review.projectNote+(a.caseNumber?' Reference supplied: '+a.caseNumber+'.':''),notes);
    el('residentProjectSummary')?.remove();
    const permitNotes=el('permitNotes');const summary=make('p','',permitNotes);summary.id='residentProjectSummary';
    summary.textContent=(property?'Property record: '+address+'; zoning '+property.zoneText+'; special districts '+property.overlayText+'; fetched '+sources.fetchedAt+'. This is an address-based map finding, not verified site use or plan history. ':'')+review.projectNote+(a.caseNumber?' Project reference: '+a.caseNumber+' (not verified).':'');
    engineering.replaceChildren();engineering.hidden=!eng;
    if(eng){
      make('h3',eng.title,engineering);make('p',eng.requirement,engineering);make('p',eng.note,engineering);
      for(const url of eng.sources){const p=make('p','',engineering),link=make('a',url.includes('ROWAPPLICATION')?'City ROW landscape-permit form (older published form; not a current fee quote)':'City Engineering permit information',p);link.href=url;link.target='_blank';link.rel='noopener noreferrer';}
      summary.textContent+=' '+eng.title+': '+eng.requirement;
      if(a.city==='inside'&&a.location==='row')el('permitNext').textContent=eng.requirement;
    }
    lastRequest=review.code==='STAFF_VERIFICATION'?'Please retrieve the approved site/landscape plan and any conditions for this property. Please check whether this tree is at a required planting location, marked for retention, credited toward required landscaping, or within required frontage, parking or buffer planting. Please advise whether the proposed work needs a separate tree permit, plan modification or replacement planting.':'';
    if(review.projectNote)lastRequest+=' '+review.projectNote+' Please check the land-disturbance permit and approved tree work separately.';
    if(a.caseNumber)lastRequest+=' Project/permit reference supplied (not verified): '+a.caseNumber+'.';
    if(eng)lastRequest+=' '+eng.requirement+' Please identify the current Engineering ROW planting application and required Urban Forestry coordination.';
  }
  // Runs after the existing synchronous decision renderer, before snapshot timers.
  doc.addEventListener('submit',e=>{if(e.target===form)paintStaffReview();
    if(e.target===el('workForm')&&lastRequest&&!el('draftArea')?.classList.contains('hidden')){
      const body=el('emailBody');if(body){const start='[Requested records and project review]',end='[/Requested records and project review]';
        const i=body.value.indexOf(start),j=body.value.indexOf(end,i);if(i>=0&&j>=i)body.value=(body.value.slice(0,i)+body.value.slice(j+end.length)).trim();
        body.value+='\n\n'+start+'\n'+lastRequest.trim()+'\n'+end;body.dispatchEvent(new win.Event('input',{bubbles:true}));}
    }
  });
  form.addEventListener('input',()=>{lastRequest='';engineering.hidden=true;});
  form.addEventListener('change',()=>{lastRequest='';engineering.hidden=true;});
  const foot=doc.querySelector('footer');if(foot)make('span',' · Resident workflow '+RESIDENT_VERSION,foot);
  return true;
}
