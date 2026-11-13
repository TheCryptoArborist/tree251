import {installResidentWorkflow} from './mobile-tree-resident-workflow.mjs';
/* Public GIS interpretation. A 15 m caution is an application safeguard, not a statutory setback.
 * Property zoning is resolved separately from the tree position by the resident workflow.
 */
export const MAP_VERSION = '0.4.0';
export const CAUTION_METERS = 15;
export function validPoint(p) {
  return !!p && typeof p.lon==='number' && typeof p.lat==='number' &&
    Number.isFinite(p.lon) && Number.isFinite(p.lat) &&
    p.lon>=-89 && p.lon<=-87.5 && p.lat>=30 && p.lat<=31.5;
}
export function polygonRelation(rings,point) {
  if(!validPoint(point)||!Array.isArray(rings)||!rings.length)throw Error('Invalid geometry');
  let inside=false,distance=Infinity;
  const sx=111320*Math.cos(point.lat*Math.PI/180),sy=111320;
  for(const ring of rings){
    if(!Array.isArray(ring)||ring.length<4||ring.some(p=>!Array.isArray(p)||!Number.isFinite(p[0])||!Number.isFinite(p[1])||Math.abs(p[0])>180||Math.abs(p[1])>90))throw Error('Invalid ring');
    for(let i=0,j=ring.length-1;i<ring.length;j=i++){
      const [xi,yi]=ring[i], [xj,yj]=ring[j];
      if(((yi>point.lat)!==(yj>point.lat)) && point.lon<(xj-xi)*(point.lat-yi)/(yj-yi)+xi)inside=!inside;
      const ax=(xi-point.lon)*sx,ay=(yi-point.lat)*sy,bx=(xj-point.lon)*sx,by=(yj-point.lat)*sy;
      const dx=bx-ax,dy=by-ay,den=dx*dx+dy*dy;
      const t=den?Math.max(0,Math.min(1,-(ax*dx+ay*dy)/den)):0;
      distance=Math.min(distance,Math.hypot(ax+t*dx,ay+t*dy));
    }
  }
  return {inside,distance};
}
export function analyzeLayer(layer,point) {
  const bad={state:'unavailable',matches:[],nearby:[],source:layer?.source||'',fetchedAt:layer?.fetchedAt||''};
  if(!validPoint(point)||layer?.status!=='ok'||!Array.isArray(layer.features)||layer.exceededTransferLimit||layer.spatialReference?.wkid!==4326)return bad;
  try {
    const related=layer.features.map(f=>({...f,relation:polygonRelation(f.geometry?.rings,point)}));
    const matches=related.filter(f=>f.relation.inside);
    const nearby=related.filter(f=>f.relation.distance<=CAUTION_METERS);
    return {...bad,state:nearby.length?'boundary':matches.length>1?'ambiguous':matches.length===1?'inside':'none',matches,nearby};
  } catch {return bad;}
}
export function interpretContext(data,options={}) {
  if(data?.status!=='ok'||!validPoint(data.point)||!data.layers)throw Error('Incomplete location response');
  const facts=Object.fromEntries(['city','historic','zoning','overlays','parcel','cityProperty','park','planning'].map(k=>[k,analyzeLayer(data.layers[k],data.point)]));
  const proposals={};
  if(facts.city.state==='inside')proposals.scCity='inside';
  else if(facts.city.state==='none')proposals.scCity='outside';
  if(facts.historic.state==='inside')proposals.scHistoric='yes';
  else if(facts.historic.state==='none')proposals.scHistoric='no';
  if(facts.zoning.state==='inside'){
    const a=facts.zoning.matches[0].attributes;
    const code=String(a.district_code||'').trim().toUpperCase();
    if(code)proposals.udcZoning=['R-1','R-2'].includes(code)?'r1r2':'other';
    const tags=[code,a.district_name,a.overlay,a.sub_district_code,a.sub_district_name].map(x=>String(x||''));
    if(facts.overlays.state==='inside')tags.push(...facts.overlays.matches.flatMap(f=>[String(f.attributes.neighborhood_name||''),String(f.attributes.sub_dist||'')]));
    const choices=new Set();
    if(tags.some(t=>t==='DDD'||/Downtown Development District/i.test(t)))choices.add('downtown');
    if(tags.some(t=>/Spring\s*Hill/i.test(t)))choices.add('springhill');
    if(code==='PD')choices.add('planned');
    if(choices.size===1&&facts.overlays.state!=='boundary')proposals.udcOverlay=[...choices][0];
  }
  const result={point:data.point,fetchedAt:data.fetchedAt,facts,proposals};
  if(options.emit!==false&&typeof document!=='undefined'){
    document.dispatchEvent(new document.defaultView.CustomEvent('tree251:map-context',{detail:result}));
  }
  return result;
}
if(typeof document!=='undefined')installResidentWorkflow(document,interpretContext);
