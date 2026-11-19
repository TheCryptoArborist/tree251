import test from 'node:test';
import assert from 'node:assert/strict';
import {screenDigging} from '../public/testing/mobile-tree-digging-rules.mjs';
import {quickDiggingSummary,quickDiggingRecord} from '../public/testing/mobile-tree-quick-digging.mjs';
const base={work:'root',city:'inside',location:'row',target:'same',dbh:'24',distanceFeet:'10',distanceInches:'',stage:'not-started',purpose:'utility',property:'unknown',method:'unknown',rootHandling:'unknown'};
test('Five-question public-tree case keeps existing close-distance outcome',()=>{
 const r=screenDigging(base),s=quickDiggingSummary(base,r);
 assert.equal(r.code,'CLOSE_EXCAVATION');assert.equal(s.authorizationGranted,false);
 assert.equal(s.readyForCity,true);assert.equal(s.pending,false);
 assert.match(s.root,/24-inch.*10 feet/);assert.match(s.next,/ISA Certified Arborist/);
});
test('Private property receives citywide root rules without automatic City email',()=>{
 const a={...base,location:'private'},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.equal(s.pending,false);assert.equal(s.readyForCity,false);
 assert.match(s.city,/citywide/);assert.match(s.city,/Selective root pruning must be supervised/);
 const record=quickDiggingRecord(a,r,s);
 assert.match(record,/citywide/);
 assert.equal(record.includes('Send the proposed excavation and root-handling plan to Urban Forestry'),false);
 assert.equal(record.includes('REQUEST: Please review'),false);
 assert.match(record,/Digging method: unknown/);
});
test('No measurements never becomes zero or safe distance',()=>{
 const a={...base,dbh:'',distanceFeet:''},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.equal(r.code,'MEASUREMENTS_NEEDED');assert.match(s.root,/missing or uncertain/);assert.equal(s.authorizationGranted,false);
});
for(const stage of ['damaged','exposed'])test('Root status overrides missing measurements: '+stage,()=>{
 const a={...base,stage,dbh:'',distanceFeet:''},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.equal(r.code,stage==='damaged'?'DAMAGE_REPORTED':'ROOTS_EXPOSED');assert.match(s.next,/Arborist/);
});
test('Unusual trunk does not get a numeric clearance',()=>{
 const a={...base,complexTrunk:true},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.equal(r.range.band,'unknown');assert.match(s.root,/uncertain/);
});
test('Outside screening range remains not authorized',()=>{
 const a={...base,distanceFeet:'70'},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.equal(r.code,'OUTSIDE_SCREENING_RANGE');assert.match(s.root,/does not clear/);assert.equal(s.authorizationGranted,false);
});
test('Occupied R-1/R-2 lot is not a root-protection exception',()=>{
 const a={...base,location:'private',property:'developed',historic:'no',zoning:'r1r2',taxClass:'residential',splitZoned:false,overlay:'none',plan:'no',otherTrees:'no'},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.equal(r.scope,'covered');assert.equal(s.readyForCity,false);assert.equal(s.pending,false);assert.match(s.city,/citywide/);assert.match(s.city,/non-selective root pruning/);
});
test('Commercial and split zoning cannot inherit a residence exception',()=>{
 const a={...base,location:'private',property:'developed',historic:'no',zoning:'r1r2',taxClass:'commercial',splitZoned:true,overlay:'none',plan:'no',otherTrees:'no'},r=screenDigging(a);
 assert.equal(r.scope,'covered');assert.equal(quickDiggingSummary(a,r).readyForCity,true);
});
test('Another tree is not assigned the original location',()=>{
 const a={...base,target:'other',otherDbh:'30'},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.equal(s.pending,true);assert.match(s.missing,/Locate the affected tree separately/);
});
test('Outside Mobile is not City clearance',()=>{
 const a={...base,city:'outside'},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.match(s.city,/outside.*City of Mobile/);assert.equal(s.readyForCity,false);assert.equal(s.authorizationGranted,false);
});
test('Non-digging work is unchanged',()=>assert.equal(quickDiggingSummary({work:'pruning'}),null));

test('Engineering ROW permit follows excavation rather than tree location',()=>{
 const a={...base,location:'private',excavationArea:'row'},r=screenDigging(a),s=quickDiggingSummary(a,r);
 assert.equal(s.engineeringRow.code,'ROW_PERMIT_REQUIRED');
 assert.match(s.next,/Engineering right-of-way authorization/);
 assert.equal(quickDiggingSummary({...base,excavationArea:'private'}).engineeringRow.code,'NO_ROW_TRIGGER');
 assert.equal(quickDiggingSummary({...base,excavationArea:'unknown'}).engineeringRow.code,'ROW_LOCATION_UNKNOWN');
 assert.match(quickDiggingRecord(a,r,s),/Engineering ROW permit:/);
});
