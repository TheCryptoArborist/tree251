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

const polygonData=await query(base+'Parcel_Details_MS/MapServer/0','parcel = \'R022909301000006.01\' && objectid = 6542385',{returnGeometry:'true'});
if(polygonData.features.length===1){
 const poly=polygonData.features[0].geometry;
 const zoneParts=await query(base+'Portal_Operational_Layers/PLAN_ZONE_APP_MS/MapServer/10','1=1',{geometry:JSON.stringify(poly),geometryType:'esriGeometryPolygon',inSR:'4326',spatialRel:'esriSpatialRelIntersects',outFields:'objectid,district_code,district_name',returnGeometry:'false'});
 console.log('PARCEL_ZONING_INTERSECTS',JSON.stringify(zoneParts.features.map(z=>z.attributes)));
 const rings=poly.rings||[];
 const points=rings.flat();
 const bounds={xmin:Math.min(...points.map(q=>q[0])),xmax:Math.max(...points.map(q=>q[0])),ymin:Math.min(...points.map(q=>q[1])),ymax:Math.max(...points.map(q=>q[1]))};
 console.log('PARCEL_BOUNDING_BOX',JSON.stringify(bounds));
 const inside=(lon,lat)=>{let a=false;for(const ring of rings){for(let i=0,j=ring.length-1;i<ring.length;j=i++){const v=ring[i],w=ring[j];if((v[1]>lat)!==(w[1]>lat)&&lon<(w[0]-v[0])*(lat-v[1])/(w[1]-v[1])+v[0])a=!a;}}return a;};
 let samples=[];
 for(let i=1;i<=5;i++)for(let j=1;j<=5;j++){const x=bounds.xmin+(bounds.xmax-bounds.xmin)*i/6,y=bounds.ymin+(bounds.ymax-bounds.ymin)*j/6;if(inside(x,y))samples.push([x,y]);}
 samples=samples.slice(0,18);
 const zoning=base+'Portal_Operational_Layers/PLAN_ZONE_APP_MS/MapServer/10';
 const results=await Promise.all(samples.map(async([x,y])=>{
  try{const d=await query(zoning,'1=1',{geometry:x+','+y,geometryType:'esriGeometryPoint',inSR:'4326',returnGeometry:'false',outFields:'district_code'});return {x,y,code:d.features.map(f=>f.attributes.district_code)}}catch(e){return {x,y,error:String(e)}}}));
 console.log('PARCEL_INTERIOR_ZONING_SAMPLES',JSON.stringify(results));
}
