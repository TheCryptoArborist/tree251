import test from 'node:test';
import assert from 'node:assert/strict';
import {excavationDistance,rootScreeningRange,screenDigging,diggingRecord} from '../public/testing/mobile-tree-digging-rules.mjs';
const base={work:'root',city:'inside',location:'row',property:'unknown',historic:'no',zoning:'unknown',overlay:'none',target:'same',dbh:'24',distanceFeet:'10',distanceInches:'',purpose:'utility',excavationArea:'row',method:'machinery',rootHandling:'cut',stage:'not-started',otherTrees:'no',storage:'no',measurement:'measured',locate:'pending'};
for(const [name,feet,inches,expected] of [
 ['blank is unknown','','',null],['zero is actual zero','0','',0],['inches only','','6',0.5],['mixed units','10','6',10.5],['negative rejected','-2','',null],['12 extra inches rejected','2','12',null],['non-number rejected','x','',null],['zero inches only','','0',0]
])test('distance: '+name,()=>assert.equal(excavationDistance(feet,inches),expected));
for(const [distance,band] of [[0,'inner'],[10,'inner'],[12,'inner'],[12.01,'possible'],[36,'possible'],[36.01,'beyond'],[null,'unknown']])test('24-inch tree at '+distance+' feet',()=>{
 const r=rootScreeningRange('24',distance);assert.equal(r.lowerFeet,12);assert.equal(r.upperFeet,36);assert.equal(r.band,band);
});
test('invalid or complex trunk does not fabricate a range',()=>{for(const d of ['',0,-1,'abc'])assert.equal(rootScreeningRange(d,10).band,'unknown');assert.equal(rootScreeningRange(24,10,true).lowerFeet,null);});
test('ordinary removal without reported digging leaves existing rules alone',()=>assert.equal(screenDigging({...base,work:'removal'}).active,false));
test('companion digging enables screening',()=>assert.equal(screenDigging({...base,work:'pruning',alsoDigging:true}).active,true));
test('close public-tree excavation has no permit or violation declaration',()=>{
 const r=screenDigging(base);assert.equal(r.scope,'covered');assert.equal(r.code,'CLOSE_EXCAVATION');assert.equal(r.cityReview,true);assert.equal(r.authorizationGranted,false);assert.equal(r.violationDetermined,false);assert.match(r.legal,/ISA Certified Arborist/);
});
test('damage overrides even a long reported distance',()=>assert.equal(screenDigging({...base,distanceFeet:100,stage:'damaged'}).code,'DAMAGE_REPORTED'));
test('exposure overrides missing dimensions',()=>assert.equal(screenDigging({...base,dbh:'',distanceFeet:'',stage:'exposed'}).code,'ROOTS_EXPOSED'));
test('missing size returns missing measurements, not exemption',()=>{const r=screenDigging({...base,dbh:''});assert.equal(r.code,'MEASUREMENTS_NEEDED');assert.ok(r.missing.length);assert.equal(r.cityReview,true);});
test('boring is not a safe-method bypass',()=>{const r=screenDigging({...base,method:'boring',distanceFeet:100});assert.equal(r.code,'OUTSIDE_SCREENING_RANGE');assert.equal(r.authorizationGranted,false);assert.ok(r.notes.some(n=>n.includes('Boring depth')));});
test('entered ISA credential never equals verification',()=>{const r=screenDigging({...base,rootHandling:'expose',arborist:'Example Arborist',credential:'EXAMPLE'});assert.ok(r.notes.some(n=>n.includes('NOT been verified')));assert.equal(r.authorizationGranted,false);});
test('cut-as-you-go warning remains with hand tools',()=>assert.match(screenDigging({...base,method:'hand'}).handling,/Do not plan to cut or tear/));
test('public exempt-removal species has no root-damage shortcut',()=>{for(const species of ['wateroak','camphor','popcorn','cherrylaurel'])assert.equal(screenDigging({...base,species}).cityReview,true);});
const home={...base,location:'private',property:'developed',zoning:'r1r2',taxClass:'residential',plan:'no',excavationArea:'private'};
test('private ordinary home remains in citywide root-protection check without automatic City email',()=>{const r=screenDigging(home);assert.equal(r.scope,'covered');assert.equal(r.cityReview,false);assert.equal(r.code,'CLOSE_EXCAVATION');assert.match(r.legal,/citywide/);assert.match(r.legal,/ISA Certified Arborist supervision/);assert.match(r.coordination,/not automatically required/);assert.equal(r.scopeBasis.type,'project-expert-interpretation');});
for(const delta of [{historic:'yes'},{taxClass:'commercial'},{splitZoned:true},{plan:'yes'},{location:'row'},{otherTrees:'unknown'},{target:'other',otherDbh:24},{overlay:'unknown'}])test('do not grant ordinary-house exclusion: '+JSON.stringify(delta),()=>assert.notEqual(screenDigging({...home,...delta}).scope,'residential-exception'));
test('unknown jurisdiction cannot establish exemption',()=>assert.equal(screenDigging({...home,city:'unknown'}).scope,'unresolved'));
test('outside Mobile is not a Mobile tree authorization',()=>{const r=screenDigging({...base,city:'outside'});assert.equal(r.scope,'outside');assert.equal(r.authorizationGranted,false);});
test('curb-cut coordination remains distinct',()=>assert.ok(screenDigging({...base,purpose:'curbcut'}).notes.some(n=>n.includes('65-10(5)'))));
test('depth is recorded, not a safety threshold',()=>{const a=screenDigging({...base,depthInches:1}),b=screenDigging({...base,depthInches:96});assert.equal(a.code,b.code);assert.equal(b.dimensions.depthInches,96);});
test('screening record retains all excavation facts and safety context',()=>{
 const a={...base,depthInches:24,widthFeet:2,lengthFeet:20,arborist:'Example',credential:'NOT-VERIFIED'};
 const text=diggingRecord(a,screenDigging(a));
 for(const s of ['Nearest excavation distance (ft): 10','Depth (in): 24','Width (ft): 2','Length near tree (ft): 20','Root handling: cut','ISA credential (unverified): NOT-VERIFIED','REQUEST: Please review','Alabama 811'])assert.ok(text.includes(s),s);
});
