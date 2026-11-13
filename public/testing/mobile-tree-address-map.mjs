import {interpretContext, validPoint} from './mobile-tree-map-data.mjs';
import {renderMapFacts, describeMapFact, MAP_LABELS, MAP_FACTS_VERSION} from './mobile-tree-map-facts.mjs';
const API='/api/mobile-tree-gis';
const GEO=['scCity','scHistoric','udcZoning','udcOverlay'];
let leafletPromise;
async function loadLeaflet(doc) {
  const win=doc.defaultView;if(win.L)return win.L;
  if(!leafletPromise)leafletPromise=new Promise((resolve,reject)=>{
    const css=doc.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    css.integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';css.crossOrigin='anonymous';doc.head.append(css);
    const script=doc.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';script.crossOrigin='anonymous';
    const timeout=win.setTimeout(()=>reject(Error('Map library unavailable')),15000);
    script.onload=()=>{win.clearTimeout(timeout);win.L?resolve(win.L):reject(Error('Map library unavailable'));};
    script.onerror=()=>{win.clearTimeout(timeout);reject(Error('Map library unavailable'));};doc.head.append(script);
  });
  try{return await leafletPromise;}catch(error){leafletPromise=null;throw error;}
}
export function installAddressMap(doc) {
  const el=id=>doc.getElementById(id),win=doc.defaultView,form=el('permitForm'),permit=el('permitCard');
  if(!form||!permit||el('propertyMapCard'))return false;
  const make=(tag,text,parent)=>{const n=doc.createElement(tag);if(text)n.textContent=text;if(parent)parent.append(n);return n;};
  const event=name=>new win.Event(name,{bubbles:true});
  const card=make('section','');card.id='propertyMapCard';card.className='card';card.setAttribute('aria-labelledby','propertyMapTitle');
  make('h2','Start with the property address',card).id='propertyMapTitle';
  make('p','Let the City maps look up location details. Then mark the tree so we do not mistake the house address for the tree’s position.',card);
  const searchForm=make('form','',card);searchForm.id='propertyMapSearch';searchForm.method='dialog';
  make('label','Property address',searchForm).htmlFor='propertyMapAddress';
  const address=make('input','',searchForm);address.id='propertyMapAddress';address.type='text';address.maxLength=120;address.placeholder='For example: 6 Maury Drive';address.autocomplete='street-address';address.required=true;
  const consentLabel=make('label','',searchForm);consentLabel.className='check';
  const consent=make('input','',consentLabel);consent.type='checkbox';consent.id='propertyMapConsent';
  make('span','Use public City GIS records for this address and display the map. This sends the address to City services through this website; map images come from Esri and map software from unpkg. No contact details or photographs are sent.',consentLabel);
  const actions=make('div','',searchForm);actions.className='actions';
  const find=make('button','Find property on map',actions);find.type='submit';find.id='findPropertyMap';
  const skip=make('button','Continue without a map',actions);skip.type='button';skip.className='secondary';
  const status=make('p','',card);status.id='propertyMapStatus';status.className='status';status.setAttribute('role','status');
  const candidates=make('div','',card);candidates.id='propertyMapCandidates';candidates.className='candidates';
  const workspace=make('div','',card);workspace.hidden=true;workspace.id='propertyMapWorkspace';
  const mapDiv=make('div','',workspace);mapDiv.id='propertyTreeMap';mapDiv.setAttribute('aria-label','Property map. Tap the tree location or drag the tree marker.');mapDiv.tabIndex=0;
  const selected=make('p','',workspace);selected.id='propertyMapPoint';selected.className='help';
  make('p','Tap the tree’s approximate position or drag the green T marker. The blue dot is the address point. Map lines and imagery are not a survey; a gap between parcels does not prove a public right-of-way.',workspace).className='help';
  const useActions=make('div','',workspace);useActions.className='actions';
  const use=make('button','Use this tree location to fill answers',useActions);use.type='button';use.id='applyMapAnswers';use.disabled=true;
  const center=make('button','Return to the address',useActions);center.type='button';center.className='secondary';
  const factsBox=make('div','',workspace);factsBox.id='propertyMapFacts';factsBox.className='results';factsBox.setAttribute('aria-label','Answers from the City map for the selected pin');
  const limitation=make('p','',workspace);limitation.className='help';
  limitation.textContent='The City’s available answers are displayed here. Source links are optional references, not another step needed to read the answers. Map data cannot confirm tree species, size, legal ownership, required landscaping or the contents of an approved plan.';
  permit.before(card);
  const legacy=el('locationCard');if(legacy)legacy.classList.add('hidden');
  const geoDetails=make('details','',form);geoDetails.id='mapFilledQuestions';
  make('summary','Location answers — filled from the map, or answer manually',geoDetails);
  make('p','The map results above show the available facts. Clear results can fill these questions after you confirm the tree pin. A boundary caution does not hide the mapped designation, but keeps the affected permit answer uncertain. A manual correction is marked as your answer.',geoDetails).className='help';
  const geoGrid=make('div','',geoDetails);geoGrid.className='grid';
  for(const id of GEO){const field=el(id);if(field)geoGrid.append(field.parentElement);}
  const originalGrid=form.querySelector('.grid');if(originalGrid&&originalGrid!==geoGrid)originalGrid.before(geoDetails);
  const hero=doc.querySelector('.hero .lead');if(hero)hero.textContent='Start with an address and mark the tree on the map. We will fill in the location facts we can check, then ask about the tree and the work.';
  const intro=doc.querySelector('#permitCard .stephead .muted');if(intro)intro.textContent='Check the map-filled location answers, then tell us about the tree and what you want done. You can continue without a map.';
  const styles=make('style','',doc.head);styles.textContent='#mapProvenance{overflow-wrap:anywhere;word-break:break-word}#propertyTreeMap{height:380px;border:1px solid var(--line);border-radius:10px;margin-top:16px;z-index:0}#propertyMapCard .leaflet-control a{color:#203b32}#propertyMapCard .tree-pin{border-radius:50%;background:#224f3c;color:white;font:bold 18px/30px system-ui;text-align:center;border:2px solid white;box-shadow:0 1px 5px #333}#propertyMapCard [hidden]{display:none!important}#propertyMapCard .leaflet-container{font:13px/1.4 system-ui}#propertyMapCard .leaflet-control-layers label{font:13px/1.4 system-ui;margin:3px}#propertyMapCard .leaflet-control-layers input{display:inline;width:auto;min-height:0}#mapFilledQuestions{margin:16px 0;padding:14px;border:1px solid var(--line);border-radius:9px}#propertyMapCard .resultrow a{overflow-wrap:anywhere}#propertyMapFacts .resultrow>div{min-width:0;overflow-wrap:anywhere}#propertyMapFacts .map-answer{font-size:15px;display:block}#propertyMapFacts .map-source{border:0;margin-top:9px;padding:0}#propertyMapFacts .map-source summary{font-weight:400;font-size:12px;padding:6px 0}#propertyMapFacts .map-caution{padding:9px 10px;background:var(--amber);border-left:3px solid var(--amberline);color:var(--ink)}@media(max-width:680px){#propertyTreeMap{height:330px}}';
  let map,L,marker,refMarker,parcelLines,context=null,point=null,addressPoint=null,currentAddress='',epoch=0,controller=null,applying=false,accepted=false,mapReady=false;
  const sources=new Map();const originalText=new Map();
  for(const id of GEO){const field=el(id);originalText.set(id,new Map([...field.options].map(o=>[o.value,o.textContent])));}
  function setAnswer(id,value,sourceNote){
    const field=el(id);if(!field)return;
    for(const o of field.options)o.textContent=originalText.get(id)?.get(o.value)||o.textContent;
    field.value=value;
    if(sourceNote){field.selectedOptions[0].textContent+=' — City map suggestion';sources.set(id,sourceNote);}
    else sources.delete(id);
    applying=true;field.dispatchEvent(event('input'));field.dispatchEvent(event('change'));applying=false;
  }
  function clearGeo(){
    for(const id of GEO)setAnswer(id,'unknown',null);
    const loc=el('scLocation');if(loc){loc.value='unknown';loc.dispatchEvent(event('change'));}
    accepted=false;use.disabled=true;el('permitOutput')?.classList.add('hidden');
  }
  function cancel(){epoch++;controller?.abort();controller=null;context=null;clearGeo();}
  function changedAddress(){cancel();candidates.replaceChildren();workspace.hidden=true;currentAddress='';addressPoint=null;point=null;
    const prop=el('propertyAddress');if(prop){prop.value='';prop.dispatchEvent(event('input'));}
    status.textContent='Address changed. Find and select the property again; earlier map answers have been cleared.';find.disabled=false;
  }
  address.addEventListener('input',changedAddress);
  el('propertyAddress')?.addEventListener('input',()=>{if(currentAddress&&el('propertyAddress').value.trim()!==currentAddress){cancel();workspace.hidden=true;currentAddress='';status.textContent='The address in your email was changed. Repeat the property lookup before using map-filled answers.';}});
  consent.addEventListener('change',()=>{if(!consent.checked){changedAddress();if(map){map.remove();map=null;marker=null;refMarker=null;mapReady=false;}status.textContent='Map access is off. You can answer the questions manually.';}});
  for(const id of GEO)el(id).addEventListener('change',()=>{if(!applying){sources.delete(id);for(const o of el(id).options)o.textContent=originalText.get(id)?.get(o.value)||o.textContent;}});
  skip.addEventListener('click',()=>{geoDetails.open=true;permit.scrollIntoView({behavior:'smooth',block:'start'});});
  async function request(params,signal){
    const response=await win.fetch(API+'?'+new URLSearchParams(params),{signal,cache:'no-store'});
    const data=await response.json();if(!response.ok||data.status!=='ok')throw Error(data.error||'City records unavailable.');return data;
  }
  function renderFacts(){
    renderMapFacts(doc,factsBox,context,{applied:accepted});
    if(map&&L){
      parcelLines?.remove();parcelLines=L.layerGroup().addTo(map);
      const raw=context.facts.parcel;
      const seen=new Set();
      for(const feature of [...raw.matches,...raw.nearby]){
        const id=feature.attributes.objectid;if(seen.has(id))continue;seen.add(id);
        for(const ring of feature.geometry.rings)L.polyline(ring.map(([x,y])=>[y,x]),{color:'#f3ce70',weight:2,interactive:false}).addTo(parcelLines);
      }
    }
  }
  async function queryPoint(p,token){
    context=null;use.disabled=true;accepted=false;factsBox.replaceChildren();
    status.textContent='Checking City limits, local historic districts, current zoning, parcels, parks and planning records…';
    try{
      const data=await request({mode:'context',lon:p.lon.toFixed(7),lat:p.lat.toFixed(7)},controller.signal);
      if(token!==epoch)return;context=interpretContext(data);renderFacts();use.disabled=!mapReady;
      status.textContent='City map answers are shown below. Position the T marker at the tree, then fill the available location questions. A caution appears beside any uncertain value rather than replacing it.';
      selected.textContent=(accepted?'Tree pin':'Map point')+': '+p.lat.toFixed(6)+', '+p.lon.toFixed(6)+' · Records fetched '+new Date(context.fetchedAt).toLocaleString()+'. Fetch time is not the data’s revision date.';
    }catch(error){if(token===epoch){status.textContent='Unable to check these City layers. No map answers were filled. You can use the manual questions.';use.disabled=true;}}
  }
  function moveTree(p){
    if(!validPoint(p)||!consent.checked)return;
    cancel();controller=new win.AbortController();point=p;
    marker?.setLatLng([p.lat,p.lon]);selected.textContent='Approximate tree position — not survey verified.';
    queryPoint(p,epoch);
  }
  async function showMap(p,token){
    try{
      L=await loadLeaflet(doc);if(token!==epoch||!consent.checked)return;
      if(!map){
        map=L.map(mapDiv,{scrollWheelZoom:false,maxZoom:21}).setView([p.lat,p.lon],19);
        const imagery=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:21,maxNativeZoom:19,attribution:'Imagery © Esri and imagery providers; City GIS / Mobile County parcel information'}).addTo(map);
        imagery.on('tileerror',()=>{status.textContent='Some map images did not load. Do not guess the tree location; the manual questions remain available.';});
        map.on('click',e=>moveTree({lon:e.latlng.lng,lat:e.latlng.lat}));
      }
      map.setView([p.lat,p.lon],19);map.invalidateSize();refMarker?.remove();marker?.remove();
      refMarker=L.circleMarker([p.lat,p.lon],{radius:6,color:'#146db4',fillColor:'#fff',fillOpacity:1}).addTo(map).bindTooltip('City address point — not necessarily the tree');
      marker=L.marker([p.lat,p.lon],{draggable:true,title:'Approximate tree location; drag or tap map',icon:L.divIcon({className:'tree-pin',html:'T',iconSize:[32,32],iconAnchor:[16,16]})}).addTo(map);
      marker.on('dragend',()=>{const q=marker.getLatLng();moveTree({lon:q.lng,lat:q.lat});});
      mapReady=true;use.disabled=!context;if(context)renderFacts();
    }catch{if(token===epoch){mapReady=false;use.disabled=true;status.textContent='Map display could not load. City record results can still be read below; use the manual questions rather than guessing the tree position.';}}
  }
  async function choose(feature){
    cancel();controller=new win.AbortController();const token=epoch;
    point={lon:feature.geometry.x,lat:feature.geometry.y};if(!validPoint(point)){status.textContent='The address coordinates are outside this checker’s area.';return;}
    addressPoint={...point};currentAddress=feature.attributes.address;candidates.replaceChildren();workspace.hidden=false;
    const prop=el('propertyAddress');if(prop){prop.value=currentAddress;prop.dispatchEvent(event('input'));}
    selected.textContent='Address reference point only. Mark the tree before using the location answers.';
    await Promise.allSettled([showMap(point,token),queryPoint(point,token)]);
  }
  searchForm.addEventListener('submit',async e=>{
    e.preventDefault();cancel();workspace.hidden=true;candidates.replaceChildren();
    if(!consent.checked){status.textContent='Allow the public map lookup, or continue without a map.';consent.focus();return;}
    controller=new win.AbortController();const token=epoch;find.disabled=true;status.textContent='Searching the City address records…';
    try{
      const data=await request({mode:'address',q:address.value.trim()},controller.signal);if(token!==epoch)return;
      status.textContent=data.features.length?'Select the matching address. We will then load its map and City records.':'No matching address was returned. This does not mean the property is outside Mobile. Try the street name without the road suffix, or continue manually.';
      for(const f of data.features){const b=make('button',[f.attributes.address,f.attributes.unitno,f.attributes.zipcode].filter(Boolean).join(' · '),candidates);b.type='button';b.className='candidate';b.addEventListener('click',()=>choose(f));}
    }catch(error){if(token===epoch)status.textContent=error.message||'The City address service is unavailable. No property conclusion was made.';}
    finally{if(token===epoch)find.disabled=false;}
  });
  center.addEventListener('click',()=>{if(map&&addressPoint)map.setView([addressPoint.lat,addressPoint.lon],19);});
  use.addEventListener('click',()=>{
    if(!context||!point||!mapReady||!consent.checked)return;
    const sourceKeys={scCity:'city',scHistoric:'historic',udcZoning:'zoning',udcOverlay:'zoning'};
    for(const id of GEO){const value=context.proposals[id]||'unknown';const fact=context.facts[sourceKeys[id]];
      setAnswer(id,value,value==='unknown'?null:{source:fact.source,fetchedAt:context.fetchedAt,point:{...point},address:currentAddress});}
    accepted=true;const count=sources.size;geoDetails.open=true;renderFacts();
    status.textContent=count+' location answer'+(count===1?'':'s')+' filled from City maps for your approximate tree pin. Confirm the remaining tree and work details. Ownership and plan obligations were not inferred.';
    selected.textContent='Tree pin selected by you: '+point.lat.toFixed(6)+', '+point.lon.toFixed(6)+' (not a surveyed boundary).';
    permit.scrollIntoView({behavior:'smooth',block:'start'});
  });
  form.addEventListener('submit',()=>{
    if(!accepted||!sources.size)return;
    const notes=el('permitNotes');if(!notes)return;
    el('mapProvenance')?.remove();const n=make('p','',notes);n.id='mapProvenance';
    const shown=Object.entries(context.facts).map(([kind,fact])=>{const r=describeMapFact(kind,fact);return MAP_LABELS[kind]+': '+[r.answer,...r.details,...r.warnings].join(' ');}).join('\n');
    n.style.whiteSpace='pre-line';
    n.textContent='Map source: '+currentAddress+'; user-positioned tree pin '+point.lat.toFixed(6)+', '+point.lon.toFixed(6)+'. Preliminary GIS suggestions, not legal boundary verification. '+[...sources].map(([id,s])=>id+': '+s.source+' (fetched '+s.fetchedAt+')').join('; ')+'.\n'+shown+'\nTree ownership and approved-plan obligations were not determined by these map results.';
  });
  const foot=doc.querySelector('footer');if(foot)make('span',' · Address and map '+MAP_FACTS_VERSION,foot);
  return true;
}
