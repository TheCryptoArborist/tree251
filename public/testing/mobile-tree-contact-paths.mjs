/* Optional contact handoff, not a permit rule. No network, storage, submission,
 * analytics, iframe, or mail-client launch until the visitor chooses an action.
 * City recipients approved by the project owner on 2026-11-19: .gov only.
 * Existing Jotform intake is unchanged. Screening transfer is review/copy/paste,
 * never personal data in a URL or an unannounced third-party submission.
 */
export const CONTACT_PATHS_VERSION='0.1.0';
export const CALLBACK_FORM_URL='https://form.jotform.com/221198646412861';
export const ENGINEERING_FORMS_URL='https://www.buildmobile.org/forms-and-applications/';
export const CITY_CONTACTS=Object.freeze({
 forestry:Object.freeze({label:'Tree-permitting questions',to:'forestry@cityofmobile.gov',cc:''}),
 plans:Object.freeze({label:'Approved tree / landscape plans',to:'planning@cityofmobile.gov',cc:'forestry@cityofmobile.gov'}),
 land:Object.freeze({label:'Land-disturbance questions',to:'land.disturbance@cityofmobile.gov',cc:''})
});
const line=v=>String(v??'').replace(/[\r\n\t]+/g,' ').trim();
const reported=v=>line(v)||'Not supplied / unverified';
export function buildCityInquiry(kind,facts={}){
 if(!Object.hasOwn(CITY_CONTACTS,kind))throw new TypeError('Unknown City contact route');
 const route=CITY_CONTACTS[kind];
 const subject={forestry:'Tree-permitting inquiry',plans:'Approved tree / landscape plan inquiry',land:'Land-disturbance permit inquiry'}[kind]+' — '+(line(facts.address)||'[Property address]');
 const rows=['Property address (reported): '+reported(facts.address),'Proposed work (reported): '+reported(facts.work)];
 if(kind==='land'){
  rows.push('Ground-work location (reported): '+reported(facts.groundLocation));
  if(line(facts.disturbedArea))rows.push('Estimated disturbed area (reported): '+line(facts.disturbedArea)+' square feet');
  rows.push('Land-disturbance permit status (reported): '+reported(facts.landStatus));
  if(line(facts.projectNumber))rows.push('Reported project/permit reference: '+line(facts.projectNumber));
 }else{
  rows.push('Tree / planting location (reported): '+reported(facts.treeLocation));
  if(kind==='plans')rows.push('Existing approved-plan status (reported): '+reported(facts.plan));
 }
 const question={
  forestry:'Please advise which tree-permitting or Tree Commission approvals apply to this proposed work and what information is needed. Engineering ROW and land-disturbance approvals are separate questions.',
  plans:'Please check for the latest approved site, landscape or tree-preservation plan, subsequent revisions, and tree-related conditions of approval for this property. Are there required plantings, retained trees, preservation credits or landscape buffers that affect the proposed work? Please provide copies of applicable records or instructions for obtaining them. If another office holds the records, please direct me there.',
  land:'Please advise whether this work requires a land-disturbance permit, which application or exemption process applies, and what plans or information are needed. Are plans prepared by a professional engineer required? Please identify any separate Engineering ROW coordination needed. Tree and root-protection approvals are separate.'
 }[kind];
 const greeting=kind==='plans'?'Planning and Urban Forestry':kind==='land'?'Engineering Permitting':'Urban Forestry';
 return {...route,subject:subject.slice(0,240),body:[
  'Hello '+greeting+',','',...rows,'',question,'',
  'These are owner/user-reported details, not verified City findings. This is an inquiry, not a permit application or authorization to begin work.',
  '','Thank you,',line(facts.name)||'[Your name]','[Your preferred contact information]'
 ].join('\n')};
}
export function cityMailto(kind,subject,body){
 if(!Object.hasOwn(CITY_CONTACTS,kind))throw new TypeError('Unknown City contact route');
 const {to,cc}=CITY_CONTACTS[kind];
 const params=(cc?'cc='+encodeURIComponent(cc)+'&':'')+'subject='+encodeURIComponent(line(subject))+'&body='+encodeURIComponent(String(body??''));
 return 'mailto:'+to+'?'+params;
}
export function readContactFacts(doc){
 const el=id=>doc.getElementById(id),val=id=>el(id)?.value??'';
 const choice=id=>{const n=el(id);return n?.tagName==='SELECT'?n.selectedOptions[0]?.textContent||'':val(id);};
 const digging=['root','roots'].includes(val('scWork'))||el('digAlso')?.checked===true;
 const text=id=>el(id)?.textContent?.trim()||'';
 return {
  address:val('propertyMapAddress')||val('propertyAddress'),name:val('contactName'),
  work:choice('scWork'),workCode:val('scWork'),digging,
  treeLocation:choice('scLocation'),groundLocation:choice(digging?'digArea':'rowWorkArea'),
  plan:choice('udcPlan'),disturbedArea:val('residentLDArea'),landStatus:choice('residentLDStatus'),projectNumber:val('residentLDNumber'),
  species:choice('scSpecies'),dbh:val('scDbh'),distance:digging?val('digFeet'):'',stage:digging?val('digStage'):'',
  treeFinding:text('permitOutcome'),planFinding:text('udcOutcome'),
  engineeringFinding:el('residentEngineering')?.hidden?'':el('residentEngineering')?.querySelector('h3')?.textContent||'',
  landFinding:el('residentLandDisturbance')?.hidden?'':el('residentLandDisturbance')?.querySelector('h3')?.textContent||'',
  record:val('screeningRecord')
 };
}
export function callbackSummary(facts={},timestamp=new Date().toISOString()){
 const rows=['THE ARBORIST — CALLBACK CONTEXT','Prepared: '+timestamp+' | Contact handoff '+CONTACT_PATHS_VERSION,
  'Reported facts and preliminary screening only. This is not a permit, inspection, verified boundary, or authorization.',
  '', 'Property: '+reported(facts.address),'Proposed work: '+reported(facts.work),'Tree / planting location: '+reported(facts.treeLocation)];
 if(facts.digging)rows.push('Digging location: '+reported(facts.groundLocation),'Digging distance, feet: '+reported(facts.distance));
 if(line(facts.species))rows.push('Reported species: '+line(facts.species));
 if(line(facts.dbh)&&facts.workCode!=='planting')rows.push('Reported trunk diameter, inches: '+line(facts.dbh));
 if(line(facts.disturbedArea))rows.push('Reported disturbed area, square feet: '+line(facts.disturbedArea));
 for(const [label,key] of [['Tree / root finding','treeFinding'],['Plan review finding','planFinding'],['Engineering ROW finding','engineeringFinding'],['Land-disturbance finding','landFinding']]){
  if(line(facts[key]))rows.push(label+': '+line(facts[key]));
 }
 rows.push('','I would like to discuss: [Add your question, preferred callback time, and any deadline.]',
  'This copied summary does not submit a request. Complete and submit the Request Arborist Services form to request contact.');
 return rows.join('\n');
}
export function installContactPaths(doc){
 const $=id=>doc.getElementById(id),win=doc.defaultView,form=$('permitForm'),out=$('permitOutput'),forestry=$('forestryEmailCTA');
 if(!form||!out||!forestry||$('contactNextSteps'))return false;
 const make=(tag,text,parent)=>{const n=doc.createElement(tag);if(text)n.textContent=text;if(parent)parent.append(n);return n;};
 const button=(id,text,parent)=>{const n=make('button',text,parent);n.id=id;n.type='button';return n;};
 const root=make('section','',out);root.id='contactNextSteps';root.hidden=true;root.dataset.version=CONTACT_PATHS_VERSION;root.setAttribute('aria-labelledby','contactNextStepsTitle');
 make('h2','How would you like to take the next step?',root).id='contactNextStepsTitle';
 make('p','Get independent arborist guidance, or contact the City directly. Either route is optional; your result remains available without a contact request.',root).className='help';
 const columns=make('div','',root);columns.className='contact-path-columns';
 const privateCard=make('section','',columns);privateCard.className='contact-path-card arborist-path';
 make('h3','Get help from The Arborist',privateCard);
 const invitation=make('p','',privateCard);invitation.id='arboristInvitation';
 const callback=button('requestArboristCallback','Request an arborist callback',privateCard);callback.setAttribute('aria-controls','arboristCallbackPanel');callback.setAttribute('aria-expanded','false');
 make('p','Private consulting is optional. Scope and fees for assessments, reports or other services are discussed before you engage those services.',privateCard).className='help';
 const cityCard=make('section','',columns);cityCard.className='contact-path-card city-path';cityCard.id='cityContactOptions';
 make('h3','Contact the City directly',cityCard);
 make('p','Choose the office for your question. Review the draft before sending; no contact details need to be shared with The Arborist.',cityCard).className='help';
 cityCard.append(forestry); // Existing Forestry editor and handlers remain intact.
 make('p','To: '+CITY_CONTACTS.forestry.to,forestry).className='help contact-recipient';
 const plans=button('preparePlanningInquiry','Ask about an approved tree / landscape plan',cityCard);plans.className='secondary';
 make('p','To: '+CITY_CONTACTS.plans.to+' · Cc: '+CITY_CONTACTS.plans.cc,cityCard).className='help contact-recipient';
 const land=button('prepareLandInquiry','Ask about land-disturbance permitting',cityCard);land.className='secondary';
 make('p','To: '+CITY_CONTACTS.land.to,cityCard).className='help contact-recipient';
 const row=make('a','Engineering ROW application information',cityCard);row.href=ENGINEERING_FORMS_URL;row.target='_blank';row.rel='noopener noreferrer';row.className='small';
 // No distinct ROW email address has been verified: never invent one or
 // silently reroute all ROW questions to the land-disturbance inbox.
 const callbackPanel=make('section','',root);callbackPanel.id='arboristCallbackPanel';callbackPanel.hidden=true;
 make('h3','Your callback request',callbackPanel);
 make('p','Continue to the existing Request Arborist Services form to provide your name, callback number and preferred timing. Submit that form to request contact from Peter.',callbackPanel);
 make('p','Your screening is not sent automatically. To include it, copy the summary below and paste it into “Please provide any additional details” on the request form.',callbackPanel).className='help';
 const callbackLabel=make('label','Review your screening summary before sharing it',callbackPanel);callbackLabel.htmlFor='callbackScreeningSummary';
 const summary=make('textarea','',callbackPanel);summary.id='callbackScreeningSummary';summary.readOnly=true;summary.rows=8;
 const callbackActions=make('div','',callbackPanel);callbackActions.className='actions';
 const copySummary=button('copyCallbackSummary','Copy summary for my request',callbackActions);copySummary.className='secondary';
 const jotform=make('a','Continue to callback request',callbackActions);jotform.id='openArboristRequest';jotform.href=CALLBACK_FORM_URL;jotform.target='_blank';jotform.rel='noopener noreferrer';jotform.referrerPolicy='no-referrer';jotform.className='button';
 make('p','Opens Jotform in a new tab. Only information you enter or paste and submit there is included in the request. Nothing is sent to the City. This form is not an emergency service.',callbackPanel).className='help';
 const editor=make('section','',root);editor.id='cityInquiryEditor';editor.hidden=true;
 const editorTitle=make('h3','',editor);editorTitle.id='cityInquiryTitle';editorTitle.tabIndex=-1;
 const recipients=make('p','',editor);recipients.id='cityInquiryRecipients';recipients.className='safe';
 const subjectLabel=make('label','Subject',editor);subjectLabel.htmlFor='cityInquirySubject';
 const subject=make('input','',editor);subject.id='cityInquirySubject';subject.maxLength=240;
 const bodyLabel=make('label','Review and edit your City inquiry',editor);bodyLabel.htmlFor='cityInquiryBody';
 const body=make('textarea','',editor);body.id='cityInquiryBody';body.rows=13;
 const draftActions=make('div','',editor);draftActions.className='actions';
 const copyDraft=button('copyCityInquiry','Copy email draft',draftActions);copyDraft.className='secondary';
 const openMail=make('a','Open my email app',draftActions);openMail.id='openCityInquiry';openMail.className='button';
 const draftHelp=make('p','',editor);draftHelp.id='cityInquiryHelp';draftHelp.className='help';
 const status=make('p','',root);status.id='contactHandoffStatus';status.className='status';status.setAttribute('role','status');
 make('p','You may also save the full screening record without requesting contact. Inquiries and callback requests are not permit applications or permission to begin work.',root).className='help';
 const style=make('style','',doc.head);style.textContent=`
 #contactNextSteps{margin:24px 0;padding-top:22px;border-top:1px solid var(--line);overflow-wrap:anywhere}
 #contactNextSteps[hidden],#arboristCallbackPanel[hidden],#cityInquiryEditor[hidden]{display:none!important}
 .contact-path-columns{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px}
 .contact-path-card{border:1px solid var(--line);border-radius:12px;padding:18px;min-width:0}
 .arborist-path{background:var(--wash)}
 #contactNextSteps button,#contactNextSteps .button{white-space:normal;max-width:100%;overflow-wrap:anywhere}
 .contact-path-card>button{width:100%;margin-top:10px}
 #contactNextSteps #forestryEmailCTA{border:0;background:none;padding:0;margin:14px 0}
 #contactNextSteps #forestryEmailCTATitle{font-size:16px}
 #contactNextSteps #forestryEmailCTA button{background:transparent;color:var(--green);width:100%}
 .contact-recipient{font-size:12px;margin:7px 0 16px}
 #arboristCallbackPanel,#cityInquiryEditor{margin-top:18px;padding:18px;border:1px solid var(--line);border-radius:12px;scroll-margin-top:100px}
 #contactNextSteps textarea,#contactNextSteps input{max-width:100%;min-width:0}
 #cityInquiryBody{min-height:280px}
 #openCityInquiry[aria-disabled="true"]{opacity:.6;pointer-events:none}
 @media(max-width:760px){.contact-path-columns{grid-template-columns:1fr}.contact-path-card,#arboristCallbackPanel,#cityInquiryEditor{padding:14px}}
 @media print{#contactNextSteps{display:none!important}}
 `;
 let generation=0,activeRoute=null,ready=false;const drafts=new Map();
 const current=()=>ready&&!out.classList.contains('hidden')&&!root.hidden;
 const clearDrafts=()=>{drafts.clear();activeRoute=null;editor.hidden=true;openMail.removeAttribute('href');subject.value='';body.value='';};
 const invalidate=()=>{generation++;ready=false;root.hidden=true;callbackPanel.hidden=true;callback.setAttribute('aria-expanded','false');summary.value='';status.textContent='';clearDrafts();};
 const reveal=node=>{node.hidden=false;node.scrollIntoView({block:'start',behavior:'auto'});};
 const requireCurrent=()=>{if(current())return true;status.textContent='Your answers changed. Run the check again before using this handoff.';return false;};
 const updateMail=()=>{
  if(!activeRoute)return;
  drafts.set(activeRoute,{subject:subject.value,body:body.value});
  const url=cityMailto(activeRoute,subject.value,body.value),long=url.length>1800;
  if(long)openMail.removeAttribute('href');else openMail.href=url;
  openMail.setAttribute('aria-disabled',String(long));
  draftHelp.textContent=long?'This draft is long. Use Copy email draft and paste it into your email app; the To and Cc lines are included. Nothing has been sent.':'Review the recipient, subject and message, replace any placeholders, then send it yourself. This is an inquiry, not a permit application. Nothing has been sent.';
 };
 const prepare=kind=>{
  if(!requireCurrent())return;
  const draft=drafts.get(kind)||buildCityInquiry(kind,readContactFacts(doc));activeRoute=kind;
  const route=CITY_CONTACTS[kind];editorTitle.textContent=route.label;recipients.textContent='To: '+route.to+(route.cc?' · Cc: '+route.cc:'');
  subject.value=draft.subject;body.value=draft.body;updateMail();reveal(editor);editorTitle.focus({preventScroll:true});
 };
 const copy=async(text,field,message)=>{
  if(!requireCurrent())return;
  try{await win.navigator.clipboard.writeText(text);status.textContent=message;}
  catch{field.focus();field.select();status.textContent='Automatic copy is unavailable. The text is selected for manual copying.';}
 };
 plans.addEventListener('click',()=>prepare('plans'));land.addEventListener('click',()=>prepare('land'));
 for(const node of [subject,body])node.addEventListener('input',updateMail);
 copyDraft.addEventListener('click',()=>{
  if(!activeRoute)return;const {to,cc}=CITY_CONTACTS[activeRoute];
  copy('To: '+to+'\n'+(cc?'Cc: '+cc+'\n':'')+'Subject: '+line(subject.value)+'\n\n'+body.value,body,'Email draft copied, including recipients. Nothing has been sent.');
 });
 openMail.addEventListener('click',e=>{if(!requireCurrent()||openMail.getAttribute('aria-disabled')==='true')e.preventDefault();});
 callback.addEventListener('click',()=>{if(!requireCurrent())return;summary.value=callbackSummary(readContactFacts(doc));callback.setAttribute('aria-expanded','true');reveal(callbackPanel);summary.focus({preventScroll:true});});
 copySummary.addEventListener('click',()=>copy(summary.value,summary,'Summary copied. Paste it into the request form’s additional-details field; it has not been submitted.'));
 jotform.addEventListener('click',e=>{if(!requireCurrent())e.preventDefault();});
 for(const event of ['input','change'])form.addEventListener(event,invalidate);
 doc.addEventListener('input',e=>{if(e.target?.id==='propertyMapAddress'||e.target?.id==='propertyAddress')invalidate();});
 // Contact edits in the legacy email form must not resurrect a stale City draft.
 $('workForm')?.addEventListener('input',clearDrafts);
 new win.MutationObserver(()=>{if(out.classList.contains('hidden'))invalidate();}).observe(out,{attributes:true,attributeFilter:['class']});
 form.addEventListener('submit',()=>{
  const token=++generation;
  win.setTimeout(()=>{
   if(token!==generation||out.classList.contains('hidden'))return;
   ready=true;root.hidden=false;
   const f=readContactFacts(doc);
   invitation.textContent=f.stage==='damaged'||f.stage==='exposed'
    ? 'Discuss reported root damage and a professional assessment. Follow the safety guidance in your result now; do not wait for a callback to address an immediate hazard.'
    :f.digging?'Need help protecting a tree before digging? Discuss root impacts, work methods and whether an on-site assessment or tree-protection plan is appropriate.'
    :f.workCode==='planting'?'Get independent advice on tree selection, placement, establishment and any tree-related coordination your planting project needs.'
    :'Need help deciding what to do about your tree or navigating City review? Discuss assessment, preservation, pruning or permitting support with Peter.';
  },240);
 });
 return true;
}
