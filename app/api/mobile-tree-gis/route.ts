/* Read-only, fixed-source GIS gateway. No user-supplied SQL, upstream URL,
 * credentials, owner names, contact data, writes, or permit determinations.
 * Use the same origin so a browser CORS restriction is not confused with no data.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const ROOT = 'https://maps.cityofmobile.org/arcgis/rest/services/';
const OP = ROOT + 'Operational_Map_Data1_MS/MapServer/';
const ZONE = ROOT + 'Portal_Operational_Layers/PLAN_ZONE_APP_MS/MapServer/';
const ADDRESS = ROOT + 'Address_Points_MS/MapServer/0';
const defs: Record<string, {url:string; fields:string}> = {
  city:{url:OP+'0',fields:'objectid,name'},
  historic:{url:OP+'7',fields:'objectid,name'},
  zoning:{url:ZONE+'10',fields:'objectid,district_code,district_name,sub_district_code,sub_district_name,overlay,rev_date'},
  overlays:{url:ZONE+'3',fields:'objectid,neighborhood_name,sub_dist,ordinance,adopt_date'},
  parcel:{url:ROOT+'Parcel_Details_MS/MapServer/0',fields:'objectid,parcel,keyx,acreage,undeveloped'},
  cityProperty:{url:OP+'2',fields:'objectid,asset_name,status'},
  park:{url:OP+'10',fields:'objectid,name'},
  planning:{url:ROOT+'EG_Data_MS/MapServer/55',fields:'objectid,tmcaseno,fileno,mtg_date,request,decision,mod_type'}
};
type Attrs = Record<string, string|number|null>;
type Feature = {attributes:Attrs; geometry?:{x?:number;y?:number;rings?:number[][][]}};
type FeatureSet = {features:Feature[]; spatialReference?:{wkid?:number;latestWkid?:number}; exceededTransferLimit?:boolean; error?:unknown};
const reply = (body:unknown,status=200) => Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex'}});
const number = (s:string|null) => s !== null && s.trim() !== '' ? Number(s) : NaN;
function point(lon:number,lat:number) {
  if(!Number.isFinite(lon)||!Number.isFinite(lat)||lon < -89 || lon > -87.5 || lat < 30 || lat > 31.5)throw new Error('LOCATION');
  return {lon,lat};
}
function normalizedAttributes(attrs:Attrs,fields:string) {
  const source = Object.fromEntries(Object.entries(attrs||{}).map(([k,v])=>[k.toLowerCase(),v]));
  return Object.fromEntries(fields.split(',').map(k=>[k,source[k]??null]));
}
async function query(url:string,params:Record<string,string>,fields:string) {
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),11000);
  try {
    const u=new URL(url+'/query');u.search=new URLSearchParams({...params,outFields:fields,outSR:'4326',f:'json'}).toString();
    const response=await fetch(u,{signal:controller.signal,cache:'no-store',redirect:'error',headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error('UPSTREAM');
    const raw=await response.text();if(raw.length>4000000)throw new Error('SIZE');
    const data=JSON.parse(raw) as FeatureSet;
    if(data.error||!Array.isArray(data.features)||data.exceededTransferLimit)throw new Error('INCOMPLETE');
    if(data.features.length && (data.spatialReference?.latestWkid??data.spatialReference?.wkid)!==4326)throw new Error('COORDINATES');
    return {features:data.features.map(f=>({attributes:normalizedAttributes(f.attributes,fields),geometry:f.geometry})),spatialReference:{wkid:4326}};
  } finally {clearTimeout(timeout);}
}
export async function GET(request:Request) {
  const u=new URL(request.url);const mode=u.searchParams.get('mode');
  const fetchedAt=new Date().toISOString();
  if([...u.searchParams.keys()].some(k=>!['mode','q','lon','lat','layer'].includes(k)))return reply({error:'Unsupported request parameter.'},400);
  try {
    if(mode==='address'){
      const text=(u.searchParams.get('q')||'').trim().split(',')[0];
      if(text.length>120)throw new Error('ADDRESS');
      const match=text.match(/^(\d{1,7})\s+([A-Za-z0-9 .'-]{2,90})$/);if(!match)throw new Error('ADDRESS');
      const road=match[2].trim().replace(/\s+(?:STREET|ST|DRIVE|DR|AVENUE|AVE|ROAD|RD|BOULEVARD|BLVD|LANE|LN|COURT|CT|PLACE|PL|WAY)\.?$/i,'').trim().toUpperCase();
      if(road.length<2)throw new Error('ADDRESS');
      const where=`hsn = ${Number(match[1])} AND UPPER(roadname) LIKE '%${road.replace(/'/g,"''")}%'`;
      const data=await query(ADDRESS,{where,returnGeometry:'true',resultRecordCount:'25',orderByFields:'address,objectid'},'objectid,address,hsn,roadname,unitno,zipcode,city');
      if(data.features.some(f=>!f.geometry||!Number.isFinite(f.geometry.x)||!Number.isFinite(f.geometry.y)||!f.attributes.address))throw new Error('UPSTREAM');
      return reply({status:'ok',fetchedAt,source:ADDRESS,query:match[1]+' '+road,...data});
    }
    if(mode==='context'){
      const p=point(number(u.searchParams.get('lon')),number(u.searchParams.get('lat')));
      const requested=u.searchParams.get('layer');
      if(requested&&!Object.hasOwn(defs,requested))throw new Error('LAYER');
      const entries=requested?[[requested,defs[requested]] as const]:Object.entries(defs);
      const results=await Promise.all(entries.map(async([kind,def])=>{
        try {
          const data=await query(def.url,{where:kind==='city'?"UPPER(name) = 'MOBILE'":'1=1',geometry:`${p.lon},${p.lat}`,geometryType:'esriGeometryPoint',inSR:'4326',spatialRel:'esriSpatialRelIntersects',distance:'25',units:'esriSRUnit_Meter',returnGeometry:'true',geometryPrecision:'7',maxAllowableOffset:'0.000003',resultRecordCount:'40'},def.fields);
          return [kind,{status:'ok',source:def.url,fetchedAt,...data}];
        } catch {return [kind,{status:'unavailable',source:def.url,fetchedAt,features:[],message:'This City layer could not be checked. This is not a no-match result.'}];}
      }));
      return reply({status:'ok',fetchedAt,point:p,searchRadiusMeters:25,layers:Object.fromEntries(results)});
    }
    return reply({error:'Choose address or context lookup.'},400);
  } catch(error) {
    const message=error instanceof Error?error.message:'';
    if(message==='ADDRESS')return reply({status:'invalid',error:'Enter a house number and street, such as 6 Maury Drive. For unusual addresses or vacant land, use the manual questions.'},400);
    if(message==='LOCATION'||message==='LAYER')return reply({status:'invalid',error:'Use a valid Mobile-area map point and a supported layer.'},400);
    return reply({status:'unavailable',error:'A live City GIS response could not be verified. No property or permit conclusion was made.',fetchedAt},502);
  }
}
