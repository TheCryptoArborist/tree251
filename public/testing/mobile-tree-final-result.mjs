/* Display-only outcome summary. Does not alter permit rules. */
import {installContactPaths} from './mobile-tree-contact-paths.mjs';
export const RESULT_VERSION='0.4.6';
export function installFinalResult(doc){
 const $=id=>doc.getElementById(id),form=$('permitForm'),out=$('permitOutput'),old=$('permitOutcome');
 if(!form||!out||!old||$('simplePermitAnswer'))return false;
 const make=(tag,content,parent)=>{const n=doc.createElement(tag);n.textContent=content;if(parent)parent.appendChild(n);return n;};
 const panel=make('section','');panel.id='simplePermitAnswer';panel.hidden=true;
 panel.setAttribute('aria-label','Plain-language permit result');old.insertAdjacentElement('afterend',panel);
 const heading=make('h3','',panel),explanation=make('p','',panel),rows=make('div','',panel),foot=make('p','',panel);
 rows.id='simpleResultRows';foot.className='help';
 const cta=$('forestryEmailCTA'),ctah=$('forestryEmailCTATitle'),ctap=cta?.querySelector('p:not(.help)'),email=$('reviewForestryEmail');
 const details=make('details','');details.id='resultDetails';
 make('summary','See ordinance details, limitations, and City sources',details);
 ($('workerQualifications')||cta||panel).insertAdjacentElement('afterend',details);
 for(const id of ['permitReason','permitMissing','permitNext','permitNotes','permitSources','udcResultSection','combinedStatus']){
  const node=$(id);if(!node)continue;
  if(id==='permitNext'&&node.previousElementSibling?.tagName==='H3')details.appendChild(node.previousElementSibling);
  details.appendChild(node);
 }
 const style=make('style','',doc.head);
 style.textContent=[
 '#simplePermitAnswer[hidden]{display:none!important}',
 '#simplePermitAnswer{border-left:4px solid var(--green);padding:8px 0 10px 15px;margin:12px 0}',
 '#simplePermitAnswer h3{font-size:clamp(21px,4vw,28px);margin:0 0 9px}',
 '#simpleResultRows>div{display:grid;grid-template-columns:155px minmax(0,1fr);padding:10px 0;gap:10px;border-top:1px solid var(--line);font-size:14px}',
 '#simplePermitAnswer .help{margin:10px 0}',
 '#resultDetails{margin:16px 0 22px}',
 '#resultDetails>summary{font-size:14px}',
 '#forestryEmailCTA.optional-email{background:none;border:0;padding:9px 0;margin:0 0 10px}',
 '#forestryEmailCTA.optional-email h3{font-size:15px}',
 '#forestryEmailCTA.optional-email button{width:auto;font-size:14px}',
 '@media(max-width:640px){#simpleResultRows>div{grid-template-columns:1fr;gap:2px}}'
 ].join('');
 const add=(label,val)=>{const r=make('div','',rows);make('strong',label,r);make('span',val,r);};
 const val=id=>$(id)?.value||'unknown';
 function render(){
  if(out.classList.contains('hidden'))return;
  // The address-map module loads asynchronously. If it creates the important
  // Engineering planting alert inside our collapsed ordinance details, move
  // it out so the required next action is never hidden.
  const engineering=$('residentEngineering');
  if(engineering&&details.contains(engineering))details.insertAdjacentElement('beforebegin',engineering);
  const land=$('residentLandDisturbance');
  // Chapter 17 is an independent approval route and must stay visible.
  if(land&&details.contains(land)){
    if(engineering&&!details.contains(engineering))engineering.insertAdjacentElement('afterend',land);
    else details.insertAdjacentElement('beforebegin',land);
  }
  const p=old.textContent.trim(),chapter=$('udcOutcome')?.textContent?.trim()||'Not evaluated';
  const isHome=form.dataset.parcelTaxClass!=='commercial'&&form.dataset.splitZoned!=='yes'&&val('scCity')==='inside'&&val('scLocation')==='private'&&val('scHistoric')==='no'&&
   val('scProperty')==='developed'&&val('udcZoning')==='r1r2'&&val('udcOverlay')==='none'&&
   val('udcPlan')!=='yes'&&val('udcDevelopment')!=='yes'&&['removal','pruning'].includes(val('scWork'));
  const clear=p.startsWith('No Chapter 65')&&isHome&&(chapter.includes('No standard Chapter 64')||chapter.includes('Ordinary R-1/R-2'));
  panel.hidden=false;old.hidden=true;rows.replaceChildren();panel.dataset.outcome=clear?'residential-no-permit':'review';
  if(clear){
   heading.textContent='No City Chapter 65 tree permit required';
   explanation.textContent='The tree is reported on a private lot with a habitable house or duplex, outside the street right-of-way and a locally designated historic district.';
   add('Tree permit','Not required for the reported routine tree pruning or removal.');
   add('Landscape rules','No ordinary Chapter 64 landscaping review indicated for this reported R-1/R-2 residence.');
   add('Next step','No City tree-permit application or Forestry email is needed for these circumstances.');
   foot.textContent='Conditional on the reported tree position, habitable residence, and no known construction project or special approval. Check ownership and choose a competent tree-care professional.';
   if(cta){cta.classList.add('optional-email');if(ctah)ctah.textContent='Optional: Need clarification?';if(ctap)ctap.textContent='There is no need to email the City to confirm this routine residential result. You may still ask a question if something about the property or work differs.';}
   if(email){email.textContent='Ask Urban Forestry a question (optional)';email.classList.add('secondary');}
  }else{
   heading.textContent=p.startsWith('No Chapter 65')?'No Chapter 65 permit identified — other checks remain':p;
   explanation.textContent=$('permitReason')?.textContent?.trim()||'Check the requirements below.';
   add('Tree-work finding',p);
   if(form.dataset.splitZoned==='yes')add('Split zoning','City mapping shows multiple zoning districts crossing the selected tax parcel. The address-point zoning must not be treated as the zoning of the entire site or tree.');
   if(form.dataset.parcelTaxClass==='commercial')add('Property classification','The City parcel is assessed Commercial. Zoning R-1 does not establish that the building is a qualifying residence.');
   add('Other property rules',chapter);
   add('Next step',$('permitNext')?.textContent?.trim()||'Confirm the applicable review requirements.');
   foot.textContent='These are screening findings, not City authorization. Review unresolved details and the supporting sources below.';
   if(cta){cta.classList.remove('optional-email');if(ctah)ctah.textContent='Ask Urban Forestry about this result';if(ctap)ctap.textContent='If review or additional authorization is needed, use a prepared editable email containing your answers.';}
   if(email){email.textContent='Review my email to Urban Forestry';email.classList.remove('secondary');}
  }
 }
 form.addEventListener('submit',()=>doc.defaultView.setTimeout(render,40));
 for(const event of ['input','change'])form.addEventListener(event,()=>{panel.hidden=true;old.hidden=false;details.open=false;});
 const footer=doc.querySelector('footer');if(footer)make('span',' · Clear results '+RESULT_VERSION,footer);
 installContactPaths(doc);
 return true;
}
