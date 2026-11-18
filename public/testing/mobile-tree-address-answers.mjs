/* v0.4.6: readable City GIS facts in the actual questionnaire.
 * This is presentation only: the existing rule engine and GIS validation
 * remain authoritative. Never infer private ownership, habitability, or
 * approved-plan absence from parcel records.
 */
export const ADDRESS_FACTS_VERSION='0.4.6';
export function installAddressFacts(doc){
 const $=id=>doc.getElementById(id),form=$('permitForm');
 if(!form||$('residentGISAnswers'))return false;
 const win=doc.defaultView,make=(tag,value,parent)=>{const e=doc.createElement(tag);e.textContent=value;if(parent)parent.appendChild(e);return e;};
 const panel=make('section','',form);panel.id='residentGISAnswers';panel.hidden=true;
 panel.setAttribute('aria-label','Information filled from City maps');
 const h=make('h3','City map information for this tree',panel);
 const explain=make('p','',panel);explain.className='help';
 const facts=make('div','',panel);facts.id='residentGISRows';
 const note=make('p','',panel);note.className='help';
 const revise=make('button','Check or correct the mapped location answers',panel);
 revise.type='button';revise.className='secondary';revise.id='reviewGISAnswers';
 const first=form.querySelector('.grid');if(first)first.insertAdjacentElement('beforebegin',panel);
 const css=make('style','',doc.head);
 css.textContent=[
  '#residentGISAnswers[hidden]{display:none!important}',
  '#residentGISAnswers{padding:16px;margin:10px 0 22px;background:var(--wash);border-radius:12px;border:1px solid var(--line)}',
  '#residentGISAnswers h3{margin:0 0 9px}',
  '#residentGISRows{display:grid;gap:1px}',
  '#residentGISRows>div{display:grid;grid-template-columns:165px minmax(0,1fr);gap:12px;padding:9px 0;border-bottom:1px solid var(--line);font-size:14px}',
  '#residentGISAnswers button{margin-top:10px}',
  '@media(max-width:640px){#residentGISRows>div{grid-template-columns:1fr;gap:2px}}'
 ].join('');
 let confirmed=false,manual=false,latestContext=null,installed=false;
 const rows=(name,text)=>{const r=make('div','',facts);make('strong',name,r);make('span',text,r);};
 const value=id=>$(id)?.value||'unknown';
 const safeText=id=>$(id)?.textContent?.trim()||'Not available';
 const clear=()=>{
  confirmed=false;manual=false;latestContext=null;panel.hidden=true;facts.replaceChildren();
  for(const id of ['scCity','scHistoric']){const n=$(id);if(n)n.parentElement.hidden=false;}
 };
 const render=()=>{
  const addr=$('propertyAddress')?.value?.trim(),record=form.dataset.propertyRecords;
  if(!addr||record==='idle'){panel.hidden=true;return;}
  panel.hidden=false;facts.replaceChildren();
  h.textContent='City map information for '+addr;
  explain.textContent=confirmed
   ? 'The tree pin was selected on the map. City GIS filled the known location answers; only the remaining tree and work details need your input.'
   : 'These are property address records. Place the tree pin and select “Use this tree location to fill answers” before using City-boundary and historic-district findings as tree-location answers.';
  const answered=(id,yes,no)=>value(id)==='yes'?yes:value(id)==='no'?no:'Not established for the tree location';
  const city=value('scCity')==='inside'?'Inside City of Mobile':value('scCity')==='outside'?'Outside City of Mobile':'Tree location not yet confirmed';
  rows('City limits',confirmed?city:'Available after confirming the actual tree location');
  rows('Historic district',confirmed?answered('scHistoric','Inside a locally designated district','Not in a locally designated district'):'Available after confirming the actual tree location');
  rows('Property zoning',safeText('udcZoningRecord'));
  rows('Mapped special areas',safeText('udcOverlayRecord'));
  rows('Parcel / development',safeText('residentParcelStatus'));
  rows('Approved landscape plan','Not verified by the currently connected public GIS services. If you know the status, choose Yes or No below; otherwise choose I don’t know.');
  rows('Tree ownership / ROW','Not determined from the house address or parcel line alone. Confirm where the trunk meets the ground.');
  note.textContent='Map results and parcel flags are not a survey, proof of habitability, or confirmation of an approved plan. City data may need verification near boundaries.';
  const geo=$('mapFilledQuestions');
  if(confirmed&&!manual){
   for(const id of ['scCity','scHistoric']){
    const n=$(id);if(n)n.parentElement.hidden=n.selectedOptions?.[0]?.textContent?.includes('City map suggestion')||false;
   }
   if(geo)geo.open=false;
  }else if(!confirmed){
   for(const id of ['scCity','scHistoric']){const n=$(id);if(n)n.parentElement.hidden=false;}
  }
 };
 revise.addEventListener('click',()=>{
  manual=true;
  const geo=$('mapFilledQuestions');if(geo)geo.open=true;
  for(const id of ['scCity','scHistoric']){const n=$(id);if(n)n.parentElement.hidden=false;}
  $('mapFilledQuestions')?.scrollIntoView({behavior:'smooth',block:'start'});
 });
 doc.addEventListener('tree251:map-context',e=>{latestContext=e.detail;confirmed=false;win.setTimeout(render,0);});
 const attach=()=>{
  if(installed||!$('applyMapAnswers'))return false;installed=true;
  $('applyMapAnswers').addEventListener('click',()=>win.setTimeout(()=>{
    // The actual map control updates its answers synchronously.
    if($('propertyMapWorkspace')?.hidden)return;
    confirmed=true;manual=false;render();
  },0));
  $('propertyMapAddress')?.addEventListener('input',clear);
  $('propertyMapConsent')?.addEventListener('change',clear);
  $('propertyAddress')?.addEventListener('input',e=>{if(e.isTrusted)clear();});
  return true;
 };
 const obs=new win.MutationObserver(()=>{if(attach())obs.disconnect();});
 if(!attach())obs.observe(doc.body,{childList:true,subtree:true});
 const zone=$('udcZoningRecord');
 if(zone)new win.MutationObserver(render).observe(zone,{characterData:true,childList:true,subtree:true});
 for(const e of ['change','input'])form.addEventListener(e,ev=>{
  if(['scCity','scHistoric'].includes(ev.target?.id)&&confirmed){
   const selected=ev.target.selectedOptions?.[0]?.textContent||'';
   if(!selected.includes('City map suggestion'))manual=true;
  }
 });
 const foot=doc.querySelector('footer');if(foot)make('span',' · Address answers '+ADDRESS_FACTS_VERSION,foot);
 return true;
}
