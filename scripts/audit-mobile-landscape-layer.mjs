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
