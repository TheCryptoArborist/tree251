/* Read-only public City GIS metadata audit. No private data, tokens, parcel
 * addresses, screenshots, credential use or permit determinations.
 * Print only layer names and field names relevant to landscape-plan status.
 */
const base='https://maps.cityofmobile.org/arcgis/rest/services';
const folders=['','BaseMappingLayers','LandUse','Portal_Operational_Layers','Nexgen','GIS_Dept_Editing','Portal_Editing','SecureLayers','SecureServices','TreeInventory'];
const wanted=/landscape|landscap|tree.plan|tree.preserv|tree.permit|site.plan|approved.plan|plan.approv|plan.status|permit.flag|parcel.flag|forestry|planting/i;
const abortLimit=10000;
async function json(u){
 const r=await fetch(u,{signal:AbortSignal.timeout(abortLimit),redirect:'follow',headers:{Accept:'application/json'}});
 if(!r.ok)throw Error(String(r.status));
 const txt=await r.text();
 if(txt.length>1000000||!txt.trim().startsWith('{'))throw Error('not public JSON');
 const o=JSON.parse(txt);
 if(o.error)throw Error('ArcGIS denied');
 return o;
}
const all=new Map(), denied=[];
for(const folder of folders){
 const u=base+(folder?'/'+folder:'')+'?f=json';
 try{
  const d=await json(u);
  for(const service of d.services||[]){
   if(service.type==='MapServer'||service.type==='FeatureServer')all.set(service.name+'/'+service.type,{name:service.name,type:service.type});
  }
  console.log('FOLDER',folder||'root',(d.services||[]).length,'services');
 }catch(e){denied.push(folder||'root');console.log('FOLDER_UNAVAILABLE',folder||'root',String(e));}
}
const services=[...all.values()];console.log('PUBLIC_SERVICES_DISCOVERED',services.length);
const hits=[];
let position=0;
async function worker(){
 while(position<services.length){
  const id=position++;
  const svc=services[id];
  try {
   const meta=await json(base+'/'+svc.name+'/'+svc.type+'?f=json');
   for(const layer of meta.layers||[]){
    const desc=[layer.name,layer.description||''].join(' ');
    if(wanted.test(desc))hits.push({service:svc.name,type:svc.type,id:layer.id,name:layer.name,reason:'name'});
    // Resolve fields for candidate data layers only to avoid excess network access.
   }
  }catch{}
 }
}
await Promise.all(Array.from({length:8},worker));
console.log('LAYER_NAME_MATCHES',JSON.stringify(hits));
const priority=services.filter(s=>/EG_Data|EG_Display|Parcel|Permitt|Tree|Landscape|Forestry|Plan/i.test(s.name)).slice(0,25);
const allHits=[];
for(const svc of priority){
 try{
  const meta=await json(base+'/'+svc.name+'/'+svc.type+'/layers?f=json');
  for(const layer of meta.layers||[]){
   const fields=(layer.fields||[]).map(f=>String(f.name||''));
   const cols=fields.filter(x=>wanted.test(x));
   if(cols.length||wanted.test(layer.name||''))allHits.push({service:svc.name,id:layer.id,name:layer.name,fields:cols,kind:svc.type});
  }
 }catch{}
}
console.log('FIELD_NAME_MATCHES',JSON.stringify(allHits));
console.log('FOLDERS_UNAVAILABLE',JSON.stringify(denied));

try{
  const qp=new URLSearchParams({where:'1=1',outFields:'flag_type,flag_name',
    returnDistinctValues:'true',returnGeometry:'false',resultRecordCount:'250',f:'json'});
  const records=await json(base+'/EG_Data_MS/MapServer/71/query?'+qp);
  console.log('PUBLIC_PERMITTING_FLAG_TYPES',JSON.stringify((records.features||[]).slice(0,75).map(f=>f.attributes)));
}catch(e){console.log('PUBLIC_PERMITTING_FLAG_TYPES_UNAVAILABLE',String(e));}


// Inspect the EXACT public ArcGIS Experience supplied by the site owner.
// No authentication or attempts to access private services.
const EXPERIENCE_ID='d8de938559b14c2aaf043a2e19142e15';
const endpoints=[
 ['experience_item','https://www.arcgis.com/sharing/rest/content/items/'+EXPERIENCE_ID+'?f=json'],
 ['experience_item_data','https://www.arcgis.com/sharing/rest/content/items/'+EXPERIENCE_ID+'/data?f=json'],
 ['experience_config','https://experience.arcgis.com/experience/'+EXPERIENCE_ID+'/config/config.json'],
 ['experience_app_config','https://experience.arcgis.com/experience/'+EXPERIENCE_ID+'/config.json'],
 ['experience_page','https://experience.arcgis.com/experience/'+EXPERIENCE_ID+'/page/Home']
];
const publicIds=new Set();
function scan(obj,label){
 const ds=obj?.dataSources;
 if(ds&&typeof ds==='object'){
  const nodes=Object.entries(ds).slice(0,250).map(([key,value])=>({
   key,itemId:value?.itemId||value?.webMapId||'',type:value?.type||'',url:String(value?.url||'').split('?')[0].slice(0,250),
   source:value?.rootDataSourceId||''
  }));
  console.log('EXPERIENCE_DATASOURCES',label,JSON.stringify(nodes));
 }
 const text=JSON.stringify(obj);
 console.log('EXPERIENCE_JSON_SIZE',label,text.length);
 const matches=[...text.matchAll(/.{0,110}(?:landscap|landscape.?plan|forestry|approved.?plan|tree.?plan|tree.?preserv).{0,170}/ig)]
  .slice(0,50).map(x=>x[0].replace(/[^\x20-\x7e]/g,' '));
 console.log('EXPERIENCE_MATCHES',label,JSON.stringify(matches));
 for(const m of text.matchAll(/(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])/ig))publicIds.add(m[0].toLowerCase());
 if(typeof obj?.title==='string')console.log('EXPERIENCE_TITLE',label,obj.title,obj.type||'',obj.owner||'');
}
for(const [label,u] of endpoints){
 try{
  const response=await fetch(u,{signal:AbortSignal.timeout(15000),headers:{Accept:'application/json'}});
  const raw=await response.text();
  console.log('EXPERIENCE_FETCH',label,response.status,response.url.split('?')[0],raw.length,raw.slice(0,100).replace(/[\r\n]/g,' '));
  if(response.ok&&raw.trim().startsWith('{')){
   const parsed=JSON.parse(raw);
   if(parsed.error)console.log('EXPERIENCE_ERROR',label,JSON.stringify(parsed.error).slice(0,300));
   else scan(parsed,label);
  }
 }catch(err){console.log('EXPERIENCE_UNAVAILABLE',label,String(err).slice(0,200))}
}
console.log('EXPERIENCE_REFERENCED_ITEM_IDS',JSON.stringify([...publicIds].slice(0,80)));
// Inspect the public web maps referenced by the Experience, not unrelated maps.
let inspected=0;
for(const id of publicIds){
 if(id===EXPERIENCE_ID||inspected>=25)continue;inspected++;
 try{
  const meta=await json('https://www.arcgis.com/sharing/rest/content/items/'+id+'?f=json');
  console.log('REFERENCED_ITEM',id,meta.title||'',meta.type||'',meta.access||'');
  if(/web map|web scene/i.test(meta.type||'')){
   const data=await json('https://www.arcgis.com/sharing/rest/content/items/'+id+'/data?f=json');
   const layers=[...(data.operationalLayers||[]),...(data.tables||[])];
   console.log('REFERENCED_MAP_LAYERS',id,JSON.stringify(layers.slice(0,150).map(l=>({
     id:l.id,title:l.title,url:String(l.url||'').split('?')[0],itemId:l.itemId,
     subLayerIds:l.layers?.map(x=>x.id),description:String(l.description||'').slice(0,100)
   }))));
   scan(data,'webmap_'+id);
  }
 }catch(e){console.log('REFERENCED_ITEM_UNAVAILABLE',id,String(e).slice(0,130))}
}


// Public ArcGIS Online catalog search for City-created landscape/site-plan data.
// This is discovery only, never a basis for a no-plan permit clearance.
const searches=[
 'owner:gis_cityofmobile AND landscape',
 'owner:gis_cityofmobile AND (title:"site plan" OR title:"landscape")',
 'orgid:AcvBA1fcgucsFQvO AND landscape',
 '(title:"Landscape Plan" OR title:"Landscape Plans") AND Mobile'
];
for(const q of searches){
 try{
  const url='https://www.arcgis.com/sharing/rest/search?'+new URLSearchParams({q,f:'json',num:'100'});
  const d=await json(url);
  console.log('LANDSCAPE_CATALOG_QUERY',q,'TOTAL',d.total||0,JSON.stringify((d.results||[]).slice(0,35).map(x=>({
    id:x.id,title:x.title,type:x.type,owner:x.owner,access:x.access,
    url:String(x.url||'').split('?')[0].slice(0,200)
  }))));
 }catch(e){console.log('LANDSCAPE_CATALOG_UNAVAILABLE',q,String(e).slice(0,180))}
}
// The experience itself includes feature-layer dataSources: inspect their
// public definitions for a different name that hides landscape data.
try{
 const d=await json('https://www.arcgis.com/sharing/rest/content/items/'+EXPERIENCE_ID+'/data?f=json');
 for(const [k,x] of Object.entries(d.dataSources||{})){
  console.log('EXPERIENCE_DATASOURCE_DETAIL',k,JSON.stringify(x).slice(0,1100));
 }
}catch(e){console.log('EXPERIENCE_DATASOURCE_DETAIL_UNAVAILABLE',String(e))}


// Follow the "City Map" application referenced in the Planning & Zoning
// Experience's metadata, to determine whether landscape plans are on that map.
const CITY_MAP_EXPERIENCE='9393644bb39343a59d613453e98edadf';
try{
 const meta=await json('https://www.arcgis.com/sharing/rest/content/items/'+CITY_MAP_EXPERIENCE+'?f=json');
 console.log('CITY_MAP_EXPERIENCE_TITLE',meta.title||'',meta.type||'');
 const config=await json('https://www.arcgis.com/sharing/rest/content/items/'+CITY_MAP_EXPERIENCE+'/data?f=json');
 const nodes=Object.entries(config.dataSources||{}).map(([id,d])=>({id,type:d.type,itemId:d.itemId||'',name:d.sourceLabel||d.label||'',url:String(d.url||'').split('?')[0]}));
 console.log('CITY_MAP_EXPERIENCE_DATASOURCES',JSON.stringify(nodes.slice(0,120)));
 const raw=JSON.stringify(config);
 const matches=[...raw.matchAll(/.{0,90}(?:landscap(?:e|ing)|tree.?plan|approved.?plan).{0,140}/ig)].slice(0,45).map(x=>x[0].slice(0,260));
 console.log('CITY_MAP_EXPERIENCE_LANDSCAPE_REFERENCES',JSON.stringify(matches));
 for(const d of nodes.filter(x=>x.type==='WEB_MAP'&&x.itemId).slice(0,15)){
  try{
   const cfg=await json('https://www.arcgis.com/sharing/rest/content/items/'+d.itemId+'/data?f=json');
   const layers=[...(cfg.operationalLayers||[]),...(cfg.tables||[])];
   console.log('CITY_MAP_REFERENCED_LAYERS',d.name,JSON.stringify(layers.map(x=>({title:x.title,url:String(x.url||'').split('?')[0]})).slice(0,120)));
  }catch(e){console.log('CITY_MAP_REFERENCED_UNAVAILABLE',d.itemId,String(e))}
 }
}catch(e){console.log('CITY_MAP_EXPERIENCE_UNAVAILABLE',String(e))}


// Larger public "City Map" app config may exceed audit helper's 1 MB cap.
// Inspect its size and named layers only, without printing the full config.
try{
 const url='https://www.arcgis.com/sharing/rest/content/items/9393644bb39343a59d613453e98edadf/data?f=json';
 const r=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{Accept:'application/json'}});
 const raw=await r.text();
 console.log('CITY_MAP_CONFIG_RESPONSE',r.status,raw.length,raw.slice(0,120));
 if(r.ok&&raw.trim().startsWith('{')){
  const c=JSON.parse(raw);
  const ds=Object.entries(c.dataSources||{}).map(([key,d])=>({key,id:d.itemId||'',name:d.sourceLabel||d.label||'',type:d.type}));
  console.log('CITY_MAP_DATASOURCE_NAMES',JSON.stringify(ds.slice(0,100)));
  const hits=[...raw.matchAll(/.{0,90}(?:landscape.?plan|landscap(?:e|ing)|tree.?plan|approved.?plan|tree.?preserv).{0,140}/ig)].slice(0,50).map(x=>x[0].slice(0,260));
  console.log('CITY_MAP_LANDSCAPE_REFERENCES',JSON.stringify(hits));
  const webIds=ds.filter(x=>x.type==='WEB_MAP'&&x.id).slice(0,16);
  for(const wm of webIds){
   try{
    const uri='https://www.arcgis.com/sharing/rest/content/items/'+wm.id+'/data?f=json';
    const resp=await fetch(uri,{signal:AbortSignal.timeout(12000)});
    const data=JSON.parse(await resp.text());
    const layers=[...(data.operationalLayers||[]),...(data.tables||[])];
    console.log('CITY_MAP_WEBMAP_LAYERS',wm.name,JSON.stringify(layers.slice(0,130).map(x=>({title:x.title,url:String(x.url||'').split('?')[0]}))));
   }catch(e){console.log('CITY_MAP_WEBMAP_UNAVAILABLE',wm.name,String(e))}
  }
 }
}catch(e){console.log('CITY_MAP_DEEP_UNAVAILABLE',String(e))}
