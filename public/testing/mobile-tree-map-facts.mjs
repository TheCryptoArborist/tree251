/* Map answers 0.3.1: show returned City facts before cautions.
 * Display only. Does not relax boundary checks, infer ownership or clear permits.
 */
export const MAP_FACTS_VERSION = '0.3.1';
export const MAP_LABELS = Object.freeze({
  city:'Inside the City of Mobile?',historic:'City-designated historic district',
  zoning:'Zoning',overlays:'Mapped neighborhood overlays',parcel:'Tax-map parcel',
  cityProperty:'Listed as City property?',park:'Inside a mapped City park?',planning:'Planning-approval records'
});
const value=(attributes,key)=>{
  if(!attributes||typeof attributes!=='object')return '';
  const k=Object.keys(attributes).find(k=>k.toLowerCase()===key.toLowerCase());
  const v=k===undefined?null:attributes[k];
  return v===null||v===undefined?'':String(v).trim();
};
const unique=items=>[...new Set(items.filter(Boolean))];
function recordLabel(kind,feature){
  const a=feature?.attributes||{};
  const join=keys=>unique(keys.map(k=>value(a,k))).join(' — ');
  if(kind==='zoning')return join(['district_code','district_name'])||'Zoning designation not supplied';
  if(kind==='overlays')return join(['neighborhood_name','sub_dist'])||'Overlay name not supplied';
  if(kind==='parcel')return value(a,'parcel')||'Parcel number not supplied';
  if(kind==='cityProperty')return join(['asset_name','status'])||'City-property record (name/status not supplied)';
  if(kind==='planning')return [value(a,'tmcaseno')||'Case number not supplied',value(a,'decision')].filter(Boolean).join(' — ');
  return value(a,'name')||'Name not supplied';
}
const absent=Object.freeze({
  city:['Outside the mapped City of Mobile boundary.','This describes the selected pin, not the mailing address.'],
  historic:['Not in a locally designated historic district on this City map.','National Register districts are a different designation.'],
  zoning:['No zoning designation returned for this pin.','Zoning remains unverified; this does not mean the property is unzoned.'],
  overlays:['No neighborhood overlay shown at this pin in the queried layer.','This does not rule out other development approvals or special conditions.'],
  parcel:['No tax-map parcel returned at this pin.','A gap in parcel mapping does not establish public ownership or right-of-way.'],
  cityProperty:['Not listed in the queried City-property map at this pin.','This does not establish private ownership or rule out a street right-of-way.'],
  park:['Not inside a park shown in the queried City parks map.','This does not establish ownership of the land.'],
  planning:['No planning-approval case returned by this map search.','Approved site or landscape plan: still unknown. This map is not a complete plan archive.']
});
export function describeMapFact(kind,fact={}){
  const details=[],warnings=[];
  const result=(answer)=>({answer,details,warnings,state:fact.state||'unavailable',source:fact.source||'',fetchedAt:fact.fetchedAt||''});
  if(!['inside','none','boundary','ambiguous'].includes(fact.state)){
    details.push('The City source did not return usable information. No Yes or No answer has been inferred.');
    return result('Not available — this check could not be completed.');
  }
  const matches=Array.isArray(fact.matches)?fact.matches:[];
  const nearby=Array.isArray(fact.nearby)?fact.nearby:[];
  const labels=unique(matches.map(f=>recordLabel(kind,f)));
  let answer;
  if(matches.length){
    const joined=labels.join('; ');
    if(kind==='city')answer='Yes — inside the mapped '+joined+' city boundary.';
    else if(kind==='historic')answer='Yes — '+joined+'.';
    else if(kind==='zoning')answer=joined;
    else if(kind==='parcel')answer=(matches.length===1?'Parcel: ':'Parcels covering this pin: ')+joined;
    else if(kind==='cityProperty')answer='Listed in the City-property map: '+joined;
    else if(kind==='park')answer='Yes — '+joined+'.';
    else if(kind==='planning')answer='Planning case'+(matches.length===1?'':'s')+': '+joined;
    else answer=joined;
    if(kind==='zoning'){
      for(const feature of matches){
        const a=feature.attributes||{};
        const prefix=matches.length>1?recordLabel(kind,feature)+' | ':'';
        const sub=unique(['sub_district_code','sub_district_name'].map(k=>value(a,k))).join(' — ');
        if(sub)details.push(prefix+'Subdistrict: '+sub+'.');
        const overlay=value(a,'overlay');
        details.push(prefix+'Overlay in this zoning record: '+(!overlay?'not supplied':/^(N\/?A|none|not applicable)$/i.test(overlay)?'none listed ('+overlay+')':overlay)+'.');
      }
    }
    if(kind==='parcel'){
      for(const feature of matches){
        const raw=value(feature.attributes,'undeveloped');
        const flag=/^no$/i.test(raw)?'No — not marked as undeveloped':/^yes$/i.test(raw)?'Yes':raw||'not supplied';
        details.push((matches.length>1?recordLabel(kind,feature)+' | ':'')+'City “undeveloped” flag: '+flag+'.');
      }
      details.push('A tax-map flag does not verify a habitable home or legal ownership.');
    }
    if(kind==='planning'){
      for(const feature of matches){const request=value(feature.attributes,'request');if(request)details.push(recordLabel(kind,feature)+' | Request: '+request);}
      details.push('A mapped planning case is not the approved landscape plan and does not identify requirements for this individual tree.');
    }
    if(kind==='cityProperty')details.push('The listed asset/status is a map record, not proof of title or permission to work.');
  }else{
    const fallback=absent[kind]||['No record returned for this pin.','This is not permission to work.'];
    answer=fallback[0];details.push(fallback[1]);
  }
  if(fact.state==='boundary'){
    if(!matches.length)answer=kind==='zoning'?'No zoning polygon contains this pin; nearby zoning is listed below.':'No containing record at this pin; a mapped boundary is nearby.';
    warnings.push('Near a mapped boundary (within 15 metres / about 49 feet). The map information is shown here, but this location answer stays uncertain for permit screening until the pin or boundary is checked. This is a map-accuracy caution, not a legal setback.');
    const nearLabels=unique(nearby.filter(f=>!matches.some(m=>m===f||((value(m.attributes,'objectid')!=='')&&value(m.attributes,'objectid')===value(f.attributes,'objectid')))).map(f=>recordLabel(kind,f)));
    if(nearLabels.length)details.push('Nearby only — not containing this pin: '+nearLabels.join('; ')+'.');
  }
  if(matches.length>1||fact.state==='ambiguous'){
    warnings.push('More than one mapped record covers this pin. All returned designations are displayed; no single answer is selected for you.');
  }
  return result(answer);
}
export function renderMapFacts(doc,box,context,{applied=false}={}){
  box.replaceChildren();box.dataset.mapFactsVersion=MAP_FACTS_VERSION;
  const make=(tag,text,parent)=>{const n=doc.createElement(tag);n.textContent=text;if(parent)parent.append(n);return n;};
  const fields={city:'scCity',historic:'scHistoric',zoning:'udcZoning',overlays:'udcOverlay'};
  for(const [kind,fact] of Object.entries(context.facts||{})){
    const shown=describeMapFact(kind,fact);
    const row=make('div','',box);row.className='resultrow';row.dataset.layer=kind;
    make('strong',MAP_LABELS[kind]||kind,row);
    const body=make('div','',row);
    const answer=make('strong',shown.answer,body);answer.className='map-answer';
    for(const line of shown.details)make('p',line,body).className='help map-detail';
    for(const line of shown.warnings){const caution=make('p',line,body);caution.className='help map-caution';caution.style.fontWeight='650';}
    if(fields[kind]&&context.proposals?.[fields[kind]]){
      make('p',applied?'Used to fill the location question below.':'Ready to fill the location question when you confirm the tree pin.',body).className='help map-autofill';
    }
    if(shown.source||shown.fetchedAt){
      const ref=make('details','',body);ref.className='map-source';
      make('summary','Source and retrieval time (optional)',ref);
      if(shown.fetchedAt)make('p','Retrieved: '+shown.fetchedAt+'. This is the lookup time, not the dataset revision date.',ref).className='help';
      // Only a City HTTPS layer link is allowed; attributes are always rendered as text.
      try{const u=new URL(shown.source);if(u.protocol==='https:'&&u.hostname==='maps.cityofmobile.org'){
        const p=make('p','',ref),link=make('a','View the City map dataset',p);link.href=u.href;link.target='_blank';link.rel='noopener noreferrer';
      }}catch{/* Missing/unexpected link does not hide the answer. */}
    }
  }
}
