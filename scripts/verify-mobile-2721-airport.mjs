/* Read-only City GIS verification for 2721 Airport Blvd, Mobile.
 * No personal owner data, contact info, or permit determinations.
 */
const base='https://maps.cityofmobile.org/arcgis/rest/services/';
const arc='https://services3.arcgis.com/AcvBA1fcgucsFQvO/arcgis/rest/services/';
const preview='https://deploy-preview-9--tree251.netlify.app';
async function json(url){
 const r=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{Accept:'application/json'}});
 const txt=await r.text(); let d;try{d=JSON.parse(txt)}catch{throw Error('invalid json '+r.status)}
 if(!r.ok||d.error)throw Error(JSON.stringify(d.error||{status:r.status}).slice(0,500));
 return d;
}
async function query(url,where,other={}){
 const args=new URLSearchParams({where,outFields:'*',f:'json',outSR:'4326',returnGeometry:'true',resultRecordCount:'50',...other});
 return json(url+'/query?'+args);
}
const addr=await json(preview+'/api/mobile-tree-gis?'+new URLSearchParams({mode:'address',q:'2721 Airport Boulevard'}));
console.log('ADDRESS_MATCHES',JSON.stringify(addr.features.map(f=>({attributes:f.attributes,geometry:f.geometry}))));
if(addr.features.length!==1)throw Error('Address ambiguous; cannot assign parcel or zoning');
const feature=addr.features[0],p=feature.geometry;
console.log('POINT',JSON.stringify(p));
const layers=[
 ['city_zoning',base+'Portal_Operational_Layers/PLAN_ZONE_APP_MS/MapServer/10','objectid,district_code,district_name,sub_district_code,sub_district_name,overlay,rev_date'],
 ['parcel_details_city',base+'Parcel_Details_MS/MapServer/0','objectid,parcel,keyx,undeveloped,classcode_desc,acreage'],
 ['parcel_details_agol',arc+'PARCEL_DETAILS/FeatureServer/0','objectid,parcel,keyx,undeveloped,classcode_desc,acreage'],
 ['zoning_agol',arc+'Zoning_Districts/FeatureServer/0','*'],
 ['city_limits',base+'Operational_Map_Data1_MS/MapServer/0','objectid,name']
];
for(const [name,url,fields] of layers){
 try{
 const data=await query(url,'1=1',{geometry:p.x+','+p.y,geometryType:'esriGeometryPoint',inSR:'4326',spatialRel:'esriSpatialRelIntersects',outFields:fields,returnGeometry:'false'});
 console.log('POINT_LAYER',name,JSON.stringify({source:url,count:data.features.length,attributes:data.features.slice(0,12).map(f=>f.attributes)}));
 }catch(e){console.log('POINT_LAYER_ERROR',name,String(e))}
}
const offsets=[{x:p.x,y:p.y},{x:p.x+0.00025,y:p.y},{x:p.x-0.00025,y:p.y},{x:p.x,y:p.y+0.00020},{x:p.x,y:p.y-0.00020}];
for(let i=0;i<offsets.length;i++){
 const pt=offsets[i];
 try{
 const d=await json(preview+'/api/mobile-tree-gis?'+new URLSearchParams({mode:'context',lon:String(pt.x),lat:String(pt.y)}));
 const o=Object.fromEntries(Object.entries(d.layers).map(([k,v])=>[k,{status:v.status,count:v.features.length,records:v.features.slice(0,5).map(f=>f.attributes)}]));
 console.log('CONTEXT_SAMPLE',i,JSON.stringify({pt,results:o}));
 }catch(e){console.log('CONTEXT_SAMPLE_ERROR',i,String(e))}
}
