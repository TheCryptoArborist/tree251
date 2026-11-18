import test from 'node:test';
import assert from 'node:assert/strict';
import {screenPermit} from '../public/testing/mobile-tree-permit-rules.mjs';
import {engineeringReview,staffPlanReview,mappedProperty,reconcileParcelZones} from '../public/testing/mobile-tree-property-policy.mjs';

const base={jurisdiction:'inside',location:'private',work:'removal',property:'developed',
  zoning:'r1r2',historic:'no',species:'liveoak',dbh:'40',limb:'',plan:'unknown',
  extra:'unknown',storm:false};
const checks=[
 ['R-1/R-2 home with unknown plan is not automatically sent for a tree permit',{},'NO_IDENTIFIED'],
 ['Unknown zoning and unknown plan remain unresolved',{zoning:'unknown'},'VERIFY'],
 ['Known approved plan still needs case review',{plan:'yes'},'VERIFY'],
 ['Known additional restrictions remain unresolved',{extra:'present'},'VERIFY'],
 ['Nonresidential or unverified zoning cannot inherit the home exemption',{zoning:'other'},'VERIFY'],
 ['18 inch live oak on undeveloped residential lot',{property:'undeveloped',dbh:'18'},'PERMIT'],
 ['ROW exempt water oak removal needs no Commission approval even when another plan is unknown',{location:'row',species:'wateroak',dbh:'6'},'ROW_EXEMPT'],
 ['ROW exempt water oak with identified extra work still needs review',{location:'row',species:'wateroak',dbh:'6',extra:'present'},'VERIFY'],
 ['ROW planting follows Engineering route',{location:'row',work:'planting'},'ROW_PLANTING'],
 ['ROW nonexempt live oak pruning seven inch branch requires Commission review',{location:'row',work:'pruning',limb:'7'},'COMMISSION'],
 ['Historic pecan 8 inch requires tree permit',{property:'developed',historic:'yes',species:'pecan',dbh:'8'},'PERMIT'],
 ['Storm report does not bypass a permit',{property:'undeveloped',dbh:'18',storm:true},'PERMIT']
];
for(const [name,delta,code] of checks){
 test(name,()=>assert.equal(screenPermit({...base,...delta}).code,code));
}
test('Engineering planting result does not claim Tree Commission removal application is the planting permit',()=>{
 const e=engineeringReview({city:'inside',location:'row',work:'planting'});
 assert.match(e.requirement,/Engineering right-of-way/);
 assert.match(e.requirement,/Urban Forestry/);
 assert.ok(e.sources.some(url=>url.includes('Major-Minor%20ROW')));
});
test('Ordinary residential Chapter 64 status is distinct from Chapter 65',()=>{
 const r=staffPlanReview({city:'inside',location:'private',property:'developed',zoning:'r1r2',overlay:'none',development:'no',plan:'unknown'});
 assert.equal(r.code,'STANDARD_EXCLUSION');
 assert.match(r.reason,/R-1\/R-2 zoning/i);
});
test('A land-disturbance permit never equals tree-removal permission',()=>{
 const r=staffPlanReview({city:'inside',location:'private',property:'commercial',zoning:'other',development:'yes',landDisturbance:'issued',plan:'unknown'});
 assert.match(r.projectNote,/not treated as tree-removal approval/i);
});

test('R-1 tax-assessed commercial parcel cannot inherit the developed residential exemption',()=>{
 assert.equal(screenPermit({...base,property:'developed',taxClass:'commercial'}).code,'VERIFY');
 const review=staffPlanReview({city:'inside',location:'private',zoning:'r1r2',taxClass:'commercial',property:'developed',overlay:'none',development:'no',plan:'unknown'});
 assert.notEqual(review.code,'STANDARD_EXCLUSION');
});
test('Actual commercial use is screened as commercial even if the zoning is R-1',()=>{
 const s=screenPermit({...base,property:'commercial',taxClass:'commercial',dbh:'18',species:'liveoak',plan:'no'});
 assert.equal(s.code,'PERMIT');
});
test('City tax classification and full-parcel zoning are independent facts',()=>{
 const facts={
  zoning:{state:'inside',matches:[{attributes:{district_code:'R-1',district_name:'Single-Family Residential',sub_district_name:'Suburban',overlay:'N/A'}}]},
  overlays:{state:'none',matches:[]},
  parcel:{state:'boundary',matches:[{attributes:{parcel:'R022909301000006.01',classcode_desc:'Commercial',undeveloped:'No'}}]}
 };
 const p=mappedProperty(facts);
 assert.equal(p.taxClass,'commercial');
 assert.equal(p.zoning,'r1r2');
 const verified=reconcileParcelZones(p,{propertyStatus:'ok',zoningStatus:'ok',
  zoningDistricts:[{code:'R-1',name:'Single-Family Residential'},{code:'B-1',name:'Buffer Business'}]});
 assert.equal(verified.splitZoned,true);
 assert.equal(verified.taxClass,'commercial');
 assert.equal(verified.zoning,'unknown');
 assert.match(verified.zoneText,/R-1.*B-1/);
});
test('Single-zoned parcel is not incorrectly tagged as split-zoned',()=>{
 const original={zoning:'r1r2',taxClass:'residential',splitZoned:false};
 const actual=reconcileParcelZones(original,{propertyStatus:'ok',zoningStatus:'ok',zoningDistricts:[{code:'R-1',name:'Single-Family Residential'}]});
 assert.equal(actual.zoning,'r1r2');
 assert.equal(actual.splitZoned,false);
});
