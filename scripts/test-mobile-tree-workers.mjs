import test from 'node:test';
import assert from 'node:assert/strict';
import {screenPermit} from '../public/testing/mobile-tree-permit-rules.mjs';
import {getWorkQualifications,withWorkerSummary,stripWorkerSummary} from '../public/testing/mobile-tree-worker-qualifications.mjs';
const base={jurisdiction:'inside',location:'row',work:'pruning',species:'liveoak',limb:'7',extra:'none'};
test('7-inch live-oak limb: Commission plus explicit supervisor',()=>{
 const r=screenPermit(base);assert.equal(r.code,'COMMISSION');assert.equal(r.workQualifications.code,'SUPERVISION_REQUIRED');
 assert.match(r.workQualifications.requirement,/ISA Certified Arborist/);assert.match(r.workQualifications.requirement,/supervised/);
 assert.match(r.workQualifications.verification,/NOT VERIFIED/);assert.ok(r.workQualifications.checklist.some(x=>x.includes('ANSI A300')));
});
for(const species of ['wateroak','camphor','popcorn','cherrylaurel']){
 test(species+' removal keeps exemption AND supervisor',()=>{const r=screenPermit({...base,work:'removal',species});assert.equal(r.code,'ROW_EXEMPT');assert.equal(r.workQualifications.code,'SUPERVISION_REQUIRED');});
}
test('exempt pruning keeps recommended review AND qualifications',()=>{const r=screenPermit({...base,species:'wateroak'});assert.equal(r.code,'RECOMMENDED');assert.equal(r.workQualifications.code,'SUPERVISION_REQUIRED');});
test('3-inch administrative removal retains qualifications',()=>{const r=screenPermit({...base,work:'removal',dbh:'3'});assert.equal(r.code,'ADMIN');assert.equal(r.workQualifications.code,'SUPERVISION_REQUIRED');});
test('unknown species does not hide supervisor',()=>{const r=screenPermit({...base,species:'unknown'});assert.equal(r.code,'VERIFY');assert.equal(r.workQualifications.code,'SUPERVISION_REQUIRED');});
test('park supervision',()=>assert.equal(getWorkQualifications({...base,location:'park'}).code,'SUPERVISION_REQUIRED'));
test('other City property scoped permit documentation',()=>assert.equal(getWorkQualifications({...base,location:'city'}).code,'PUBLIC_WORK_REVIEW'));
test('private property not assigned public qualifications',()=>assert.equal(getWorkQualifications({...base,location:'private'}),null));
test('outside Mobile not assigned Mobile qualifications',()=>assert.equal(getWorkQualifications({...base,jurisdiction:'outside'}),null));
test('unknown jurisdiction conditional',()=>assert.match(getWorkQualifications({...base,jurisdiction:'unknown'}).requirement,/^If the tree is confirmed/));
test('email preserves notes and replaces generated block',()=>{const r=getWorkQualifications(base);const a=withWorkerSummary('Original pruning objectives',r);assert.equal(withWorkerSummary(a,r),a);assert.equal(stripWorkerSummary(a),'Original pruning objectives');assert.match(a,/NOT VERIFIED/);});
test('removal does not display pruning standards',()=>assert.ok(!getWorkQualifications({...base,work:'removal'}).checklist.some(x=>x.includes('ANSI A300'))));
