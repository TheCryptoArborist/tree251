import test from 'node:test';
import assert from 'node:assert/strict';
import {screenDigging} from '../public/testing/mobile-tree-digging-rules.mjs';
import {rootPruningConclusion} from '../public/testing/mobile-tree-root-pruning-policy.mjs';
import {quickDiggingSummary,quickDiggingRecord} from '../public/testing/mobile-tree-quick-digging.mjs';
const base={work:'root',city:'inside',location:'row',target:'same',dbh:'24',distanceFeet:'10',stage:'not-started',purpose:'utility',rootHandling:'unknown',method:'unknown'};
const evaluate=patch=>{const a={...base,...patch},r=screenDigging(a);return {a,r,s:quickDiggingSummary(a,r),p:rootPruningConclusion(a,r)};};
test('Short City result states prohibition and supervision even with no optional work plan',()=>{
 const {s,p}=evaluate({});assert.match(s.city,/non-selective root pruning.*prohibited/s);assert.match(s.city,/Selective root pruning must be supervised by an ISA Certified Arborist/);assert.match(s.city,/Public Trees or Heritage Trees/);assert.equal(p.status,'METHOD_NOT_REPORTED');assert.equal(p.complianceDetermined,false);
});
test('Cut-through plan changes the conclusion, even with hand tools',()=>{
 const {s,p}=evaluate({rootHandling:'cut',method:'hand'});assert.equal(p.status,'CUT_THROUGH_PROPOSED');assert.match(s.title,/Change the proposed root-cutting method/);assert.match(s.next,/Do not cut through roots/);assert.equal(p.violationDetermined,false);
});
for(const method of ['hand','air-water'])test('Reported selective sequence with '+method+' is not verified approval',()=>{
 const {s,p}=evaluate({rootHandling:'expose',method,arborist:'Entered name',credential:'Entered number'});assert.equal(p.status,'SELECTIVE_PROPOSED_UNVERIFIED');assert.equal(p.supervisionVerified,false);assert.equal(p.authorizationGranted,false);assert.match(s.city,/not approval/);assert.match(s.next,/supervising individual root pruning/);
});
for(const method of ['machinery','boring'])test(method+' does not itself establish selective root pruning',()=>{
 const {s,p}=evaluate({rootHandling:'expose',method});assert.equal(p.status,'EXPOSURE_METHOD_CONFLICT');assert.match(s.city,/not automatically a violation/);assert.equal(p.violationDetermined,false);
});
test('Selective label without exposure method remains incomplete',()=>assert.equal(evaluate({rootHandling:'expose'}).p.status,'EXPOSURE_METHOD_NEEDED'));
test('Stopping for evaluation is not permission to cut later',()=>{
 const {s,p}=evaluate({rootHandling:'stop'});assert.equal(p.status,'STOP_BEFORE_ROOT_CUTTING');assert.match(s.next,/subsequent selective root pruning must be supervised/);
});
for(const stage of ['damaged','exposed'])test('Urgent root status overrides the method headline: '+stage,()=>{
 const {s,r}=evaluate({rootHandling:'cut',stage});assert.equal(s.title,r.title);assert.match(s.next,/arborist/i);
});
test('Distance beyond screening range never exempts destructive root cutting',()=>{
 const {s,r,p}=evaluate({distanceFeet:'70',rootHandling:'cut'});assert.equal(r.code,'OUTSIDE_SCREENING_RANGE');assert.match(s.root,/does not clear root cutting/);assert.match(s.city,/critical root zone/);assert.equal(p.criticalRootZoneEstablished,false);assert.equal(s.authorizationGranted,false);
});
test('Unknown private use does not bypass citywide root rules or automatically mandate email',()=>{
 const {s,p}=evaluate({location:'private',property:'unknown',rootHandling:'cut'});assert.equal(s.pending,false);assert.equal(s.readyForCity,false);assert.match(s.city,/citywide/);assert.equal(p.violationDetermined,false);
});
test('Ordinary residential pruning/removal exception does not exempt root work',()=>{
 const {r,s,p}=evaluate({location:'private',property:'developed',historic:'no',zoning:'r1r2',taxClass:'residential',overlay:'none',plan:'no',otherTrees:'no',rootHandling:'cut'});assert.equal(r.scope,'covered');assert.match(s.city,/citywide/);assert.equal(p.ordinanceRelevant,true);assert.equal(s.readyForCity,false);assert.match(s.next,/Do not cut through roots/);assert.match(s.title,/Change the proposed root-cutting method/);
});
test('Outside-City check cannot impose Mobile applicability',()=>{
 const {s,p}=evaluate({city:'outside',rootHandling:'stop'});assert.equal(p.ordinanceRelevant,false);assert.equal(s.readyForCity,false);assert.match(s.city,/outside the City/);
});
test('Saved record contains the method finding and definition source',()=>{
 const {a,r,s}=evaluate({rootHandling:'expose',method:'air-water'}),text=quickDiggingRecord(a,r,s);assert.match(text,/SELECTIVE_PROPOSED_UNVERIFIED/);assert.match(text,/supersonic air tools, pressurized water or hand tools/);assert.match(text,/ANSI A300 \(Part 8\)/);assert.match(text,/Article VIII\(1\)\(a\)/);assert.match(text,/Article X\(1\)\(d\)/);assert.match(text,/NOT VERIFIED/);
});
test('Every tested method, distance and scope remains unapproved and non-adjudicative',()=>{
 for(const location of ['row','private'])for(const method of ['hand','air-water','machinery','boring','unknown'])for(const rootHandling of ['cut','expose','stop','unknown'])for(const distanceFeet of ['0','10','24','70','']){
  const {s,p}=evaluate({location,method,rootHandling,distanceFeet});assert.equal(s.authorizationGranted,false);assert.equal(p.complianceDetermined,false);assert.equal(p.violationDetermined,false);assert.equal(p.supervisionVerified,false);assert.equal(p.criticalRootZoneEstablished,false);
 }
});
