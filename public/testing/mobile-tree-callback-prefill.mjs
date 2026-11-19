/* Optional property-only Jotform prefill, requested 2026-11-19.
 * Supersedes the original blank-link handoff for address/type only.
 * No requests or submissions: the browser opens Jotform only on visitor action.
 * Published field names/options checked against the real intake form.
 * Official method: https://www.jotform.com/help/71-prepopulating-fields-to-your-jotform-via-url-parameters/
 */
export const CALLBACK_PREFILL_VERSION='0.1.0';
export const CALLBACK_INTAKE_URL='https://form.jotform.com/221198646412861';
const clean=value=>String(value??'').replace(/[\r\n\t]+/g,' ').trim();
export function resolveCallbackProperty({property='',taxClass='',records=''}={}){
 const reported={developed:'Residential',undeveloped:'Residential',commercial:'Commercial'}[property]||'';
 const mapped=records==='ready'?({residential:'Residential',commercial:'Commercial'}[taxClass]||''):'';
 if(property==='multifamily')return {value:'',basis:'The reported apartments, mixed-use or other-site category needs your confirmation in the request form.'};
 if(reported&&mapped&&reported!==mapped)return {value:'',basis:'Your reported property use and the City parcel classification differ. Confirm the property type in the request form.'};
 if(reported)return {value:reported,basis:mapped?'From your reported use, consistent with the City parcel classification. Please confirm.':'From the property use you reported. Please confirm.'};
 if(mapped)return {value:mapped,basis:'Suggested from City parcel records, not zoning or verified actual use. Please confirm.'};
 return {value:'',basis:'Property type is not established. Select it in the request form; zoning alone is not used.'};
}
export function readCallbackPrefill(doc){
 const el=id=>doc.getElementById(id),value=id=>clean(el(id)?.value);
 const form=el('permitForm');
 const property=resolveCallbackProperty({property:value('scProperty'),taxClass:form?.dataset?.parcelTaxClass,records:form?.dataset?.propertyRecords});
 return {address:value('propertyAddress')||value('propertyMapAddress'),propertyType:property.value,propertyBasis:property.basis};
}
export function callbackPrefillURL({address='',propertyType=''}={}){
 const url=new URL(CALLBACK_INTAKE_URL);
 // Preserve the entire supplied address; do not invent missing city/ZIP fields.
 if(clean(address))url.searchParams.set('propertyAddress[addr_line1]',clean(address));
 if(['Residential','Commercial'].includes(propertyType))url.searchParams.set('propertyType',propertyType);
 return url.toString();
}
export function installCallbackPrefill(doc){
 const el=id=>doc.getElementById(id),win=doc.defaultView;
 const panel=el('arboristCallbackPanel'),request=el('requestArboristCallback'),link=el('openArboristRequest'),form=el('permitForm'),out=el('permitOutput');
 if(!panel||!request||!link||!form||!out||panel.dataset.propertyPrefill)return false;
 panel.dataset.propertyPrefill=CALLBACK_PREFILL_VERSION;
 const info=doc.createElement('p');info.id='callbackPropertyPrefill';info.className='safe';info.setAttribute('aria-live','polite');info.style.whiteSpace='pre-line';
 const paragraphs=[...panel.querySelectorAll(':scope > p')];
 panel.querySelector('h3')?.insertAdjacentElement('afterend',info);
 if(paragraphs[0])paragraphs[0].textContent='Continue to Request Arborist Services with the property details shown here already filled in. Review or correct them there, add your callback details, and submit that form to request contact from Peter.';
 if(paragraphs.at(-1))paragraphs.at(-1).textContent='Continuing shares the address and available property type with Jotform through its prefilled link. Do not share that link. These fields remain editable; opening the form does not submit a request. The screening summary is not sent automatically. Nothing is sent to the City. This is not an emergency service.';
 link.textContent='Continue with these property details';link.setAttribute('aria-describedby',info.id);
 const blank=doc.createElement('a');blank.id='openBlankArboristRequest';blank.textContent='Open a blank request instead';blank.href=CALLBACK_INTAKE_URL;blank.target='_blank';blank.rel='noopener noreferrer';blank.referrerPolicy='no-referrer';blank.className='small';
 panel.append(blank);
 const current=()=>!out.classList.contains('hidden')&&!el('contactNextSteps')?.hidden&&!panel.hidden;
 function refresh(){
  if(!current())return false;
  const p=readCallbackPrefill(doc);
  link.href=callbackPrefillURL(p);
  info.textContent='Property address: '+(p.address||'Not entered — add it in the request form.')+'\nProperty type: '+(p.propertyType||'Please confirm in the request form.')+'\n'+p.propertyBasis;
  // Keep the optional copied summary consistent with the actual prefilled address.
  const summary=el('callbackScreeningSummary');
  if(summary&&p.address)summary.value=summary.value.replace(/^Property:.*$/m,()=> 'Property: '+p.address);
  return true;
 }
 function clear(){link.href=CALLBACK_INTAKE_URL;info.textContent='';}
 request.addEventListener('click',refresh);
 link.addEventListener('click',e=>{if(!refresh())e.preventDefault();},true);
 blank.addEventListener('click',e=>{if(!current())e.preventDefault();});
 for(const event of ['input','change'])form.addEventListener(event,clear);
 doc.addEventListener('input',e=>{if(['propertyMapAddress','propertyAddress'].includes(e.target?.id))clear();});
 new win.MutationObserver(()=>{if(out.classList.contains('hidden'))clear();}).observe(out,{attributes:true,attributeFilter:['class']});
 return true;
}
