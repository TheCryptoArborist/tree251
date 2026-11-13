import test from 'node:test';
import assert from 'node:assert/strict';
import {screenUDC} from '../public/testing/mobile-tree-udc-rules.mjs';
import {screenPermit} from '../public/testing/mobile-tree-permit-rules.mjs';

const base={jurisdiction:'inside',location:'private',zoning:'other',overlay:'none',
  plan:'unknown',requiredTree:'unknown',credit:'unknown',buffer:'unknown',development:'unknown'};
const allNo={plan:'no',requiredTree:'no',credit:'no',buffer:'no',development:'no'};
const cases=[
 ['all unknown requires verification',{},'VERIFICATION_REQUIRED'],
 ['unknown zoning requires verification',{zoning:'unknown'},'VERIFICATION_REQUIRED'],
 ['five no answers ordinary site',{...allNo},'NO_ISSUE_IDENTIFIED'],
 ['R-1/R-2 ordinary landscaping exclusion',{...allNo,zoning:'r1r2'},'STANDARD_EXCLUSION'],
 ['R-1/R-2 unknown plan is not unrestricted',{zoning:'r1r2'},'STANDARD_EXCLUSION'],
 ['approved plan yes',{plan:'yes'},'PLAN_REVIEW'],
 ['required tree yes',{requiredTree:'yes'},'PLAN_REVIEW'],
 ['preservation credit yes',{credit:'yes'},'PLAN_REVIEW'],
 ['required buffer yes',{buffer:'yes'},'PLAN_REVIEW'],
 ['construction yes',{development:'yes'},'PLAN_REVIEW'],
 ['contradictory plan no credit yes',{...allNo,credit:'yes'},'PLAN_REVIEW'],
 ['downtown special applicability',{...allNo,overlay:'downtown'},'SPECIAL_REVIEW'],
 ['Springhill overlay special applicability',{...allNo,overlay:'springhill'},'SPECIAL_REVIEW'],
 ['planned development conditions',{...allNo,overlay:'planned'},'SPECIAL_REVIEW'],
 ['outside Mobile',{jurisdiction:'outside'},'OUTSIDE'],
 ['unverified jurisdiction',{jurisdiction:'unknown'},'VERIFICATION_REQUIRED'],
 ['right-of-way tree',{location:'row'},'PUBLIC_LOCATION'],
 ['city park tree',{location:'park'},'PUBLIC_LOCATION'],
 ['prior plan for R-1/R-2',{zoning:'r1r2',plan:'yes'},'PLAN_REVIEW'],
 ['unknown special-district status',{...allNo,overlay:'unknown'},'VERIFICATION_REQUIRED']
];
for(const [name,patch,expected] of cases){
  test('UDC: '+name,()=>{
    const result=screenUDC({...base,...patch});
    assert.equal(result.code,expected);
    assert.notEqual(result.code,'PERMIT');
    assert.ok(result.reason.length>25);
    assert.ok(result.next.length>20);
  });
}
test('Chapter 65 has independent permit requirement for protected live oak',()=>{
 const r=screenPermit({jurisdiction:'inside',location:'private',work:'removal',
   property:'undeveloped',historic:'no',species:'liveoak',dbh:'18',plan:'no',extra:'none'});
 assert.equal(r.code,'PERMIT');
});
test('Commercial approved plan is applied in the Chapter 65 branch',()=>{
 const r=screenPermit({jurisdiction:'inside',location:'private',work:'removal',
  property:'commercial',historic:'unknown',species:'wateroak',plan:'yes',extra:'none'});
 assert.equal(r.code,'PERMIT');
 assert.equal(screenUDC({...base,plan:'yes'}).code,'PLAN_REVIEW');
});
test('Chapter 64 unknown does not override a Chapter 65 exemption',()=>{
 const r=screenPermit({jurisdiction:'inside',location:'private',work:'removal',
   property:'developed',historic:'no',species:'liveoak',dbh:'20',plan:'no',extra:'none'});
 assert.equal(r.code,'NO_IDENTIFIED');
 assert.equal(screenUDC({...base}).code,'VERIFICATION_REQUIRED');
});
test('Storm reporting never changes a permit into a no-permit result',()=>{
 const a={jurisdiction:'inside',location:'private',work:'removal',
   property:'undeveloped',historic:'no',species:'liveoak',dbh:'18',plan:'no',extra:'none'};
 assert.equal(screenPermit({...a,storm:false}).code,'PERMIT');
 assert.equal(screenPermit({...a,storm:true}).code,'PERMIT');
});
