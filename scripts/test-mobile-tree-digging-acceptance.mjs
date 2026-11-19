import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {screenDigging} from '../public/testing/mobile-tree-digging-rules.mjs';
import {quickDiggingSummary,quickDiggingRecord,QUICK_DIGGING_VERSION} from '../public/testing/mobile-tree-quick-digging.mjs';
import {screenPermit} from '../public/testing/mobile-tree-permit-rules.mjs';
// Software acceptance against the project-approved citywide digging scope.
// Fixtures are not verified ownership, site surveys or adjudications of law.
const home={work:'root',city:'inside',location:'private',property:'developed',historic:'no',zoning:'r1r2',overlay:'none',taxClass:'residential',plan:'no',target:'same',dbh:'24',distanceFeet:'10',stage:'not-started',purpose:'utility',method:'unknown',rootHandling:'unknown',excavationArea:'private',otherTrees:'no'};
const evaluate=patch=>{const a={...home,...patch},r=screenDigging(a),s=quickDiggingSummary(a,r);return {a,r,s,record:quickDiggingRecord(a,r,s)};};
const cases=[];
function add(id,name,patch,expected,check){
 const v=evaluate(patch);let pass=false,error='';try{pass=!!check(v);}catch(e){error=String(e);}
 cases.push({id,name,patch,expected,pass,error,actual:{code:v.r.code,scope:v.r.scope,cityReview:v.r.cityReview,pending:v.s.pending,method:v.s.rootRule.status,title:v.s.title,root:v.s.root,city:v.s.city,next:v.s.next,authorizationGranted:v.s.authorizationGranted}});
}
add('D01','Occupied R-1 private home retains citywide root duties',{},'Covered; no residential root exemption; no automatic City email',({r,s})=>r.scope==='covered'&&!s.readyForCity&&s.city.includes('citywide')&&s.city.includes('supervised'));
add('D02','Street tree and utility trench',{location:'row',excavationArea:'row'},'Close excavation; City review indicated',({r,s})=>r.code==='CLOSE_EXCAVATION'&&s.readyForCity&&s.next.includes('Urban Forestry'));
add('D03','Commercial building on R-1 land',{property:'commercial',taxClass:'commercial'},'Commercial review, not house exemption',({r,s})=>r.scope==='covered'&&s.readyForCity);
add('D04','City park tree',{location:'park'},'City review indicated',({s})=>s.readyForCity);
add('D05','Same tree outside Mobile',{city:'outside'},'No Mobile applicability; advice only',({r,s})=>r.scope==='outside'&&!s.readyForCity&&!s.rootRule.ordinanceRelevant);
add('D06','Jurisdiction not established',{city:'unknown'},'Unresolved, not no-permit clearance',({r,s})=>r.scope==='unresolved'&&s.pending&&!s.readyForCity);
add('D07','Different tree from inside-city address',{target:'other',otherDbh:'30'},'New tree jurisdiction unresolved',({r,s})=>r.scope==='unresolved'&&s.pending);
add('D08','Different tree from outside-city address',{city:'outside',target:'other',otherDbh:'30'},'Do not inherit outside-city status from a different tree',({r,s})=>r.scope==='unresolved'&&s.pending);
add('D09','Unknown ownership inside city',{location:'unknown'},'Root duties apply; approval routing uncertain',({r,s})=>r.scope==='covered'&&s.pending&&!s.readyForCity);
add('D10','Excavation touches trunk',{distanceFeet:'0'},'Zero is known close work',({r})=>r.code==='CLOSE_EXCAVATION'&&r.range.distanceFeet===0);
add('D11','Measurements blank',{dbh:'',distanceFeet:''},'Measurements needed, not zero',({r})=>r.code==='MEASUREMENTS_NEEDED'&&r.range.distanceFeet===null);
add('D12','Multiple trunks not reliably measured',{complexTrunk:true},'No numerical root-zone conclusion',({r})=>r.range.band==='unknown');
add('D13','Exactly six times diameter',{distanceFeet:'12'},'Inner screening boundary',({r})=>r.range.band==='inner');
add('D14','Just beyond six times diameter',{distanceFeet:'12.01'},'Potential root conflict',({r})=>r.range.band==='possible');
add('D15','Exactly eighteen times diameter',{distanceFeet:'36'},'Potential root conflict',({r})=>r.range.band==='possible');
add('D16','Beyond estimated range',{distanceFeet:'40'},'No permission to cut roots',({r,s})=>r.range.band==='beyond'&&!s.authorizationGranted&&s.root.includes('does not clear'));
add('D17','Damaged roots without measurements',{stage:'damaged',dbh:'',distanceFeet:''},'Damage overrides missing measurements',({r,s})=>r.code==='DAMAGE_REPORTED'&&s.next.includes('Pause excavation'));
add('D18','Exposed roots beyond range',{stage:'exposed',distanceFeet:'60'},'Pause at exposed roots',({r,s})=>r.code==='ROOTS_EXPOSED'&&s.next.includes('Protect exposed'));
add('D19','Cut-through with hand tools',{method:'hand',rootHandling:'cut'},'Change method; no tool-name shortcut',({s})=>s.rootRule.status==='CUT_THROUGH_PROPOSED'&&s.title.includes('Change'));
add('D20','Hand exposure and individual cuts',{method:'hand',rootHandling:'expose'},'Sequence reported; supervision and permission unverified',({s})=>s.rootRule.status==='SELECTIVE_PROPOSED_UNVERIFIED'&&!s.rootRule.supervisionVerified&&!s.authorizationGranted);
add('D21','Air/water exposure and individual cuts',{method:'air-water',rootHandling:'expose'},'Selective sequence reported, not approved',({s})=>s.rootRule.status==='SELECTIVE_PROPOSED_UNVERIFIED'&&!s.rootRule.complianceDetermined);
add('D22','Backhoe called selective pruning',{method:'machinery',rootHandling:'expose'},'Method conflict, not adjudicated violation',({s})=>s.rootRule.status==='EXPOSURE_METHOD_CONFLICT'&&!s.rootRule.violationDetermined);
add('D23','Boring called selective pruning',{method:'boring',rootHandling:'expose'},'No trenchless exemption',({s})=>s.rootRule.status==='EXPOSURE_METHOD_CONFLICT'&&!s.authorizationGranted);
add('D24','Stop before cutting roots',{rootHandling:'stop'},'Later selective cutting still needs supervision',({s})=>s.next.includes('subsequent selective root pruning must be supervised'));
add('D25','Entered credential number',{method:'hand',rootHandling:'expose',arborist:'Test only',credential:'TEST-UNVERIFIED'},'No verified-supervision claim',({s})=>!s.rootRule.supervisionVerified&&s.next.includes('not verification'));
add('D26','Water oak removal exemption is not a root-work exemption',{location:'row',species:'wateroak'},'Root protection stays covered',({r,s})=>r.scope==='covered'&&s.readyForCity);
add('D27','811 reported complete',{locate:'reported-complete'},'Locate status not root permission',({r,s,record})=>!s.authorizationGranted&&r.locate.includes('does not authorize')&&record.includes('not verified'));
add('D28','Private tree with public ROW excavation',{excavationArea:'row'},'Engineering ROW route visible in short result',({s})=>/Engineering.*right-of-way/i.test(s.city+' '+s.next));
add('D29','Public tree with cut-through plan',{location:'row',excavationArea:'row',rootHandling:'cut',method:'machinery'},'Method warning retains named Forestry route',({s})=>s.next.includes('Do not cut through')&&s.next.includes('Urban Forestry'));
add('D30','Known approved landscape plan',{plan:'yes'},'Plan flag retains City review',({s})=>s.readyForCity);
add('D31','Split zoning and a home answer',{splitZoned:true},'Citywide root duty and split-property review',({r,s})=>r.scope==='covered'&&s.readyForCity);
add('D32','Optional work-plan information omitted',{method:'unknown',rootHandling:'unknown',otherTrees:'unknown',storage:'unknown',excavationArea:'unknown'},'Initial screening allowed; no authorization',({r,s,record})=>r.code==='CLOSE_EXCAVATION'&&!s.authorizationGranted&&s.rootRule.status==='METHOD_NOT_REPORTED'&&record.includes('remain unknown'));
let invariantCases=0,invariantsPassed=true;
for(const city of ['inside','outside','unknown'])for(const location of ['row','private','unknown'])for(const rootHandling of ['cut','expose','stop','unknown'])for(const method of ['hand','air-water','machinery','boring','unknown'])for(const distanceFeet of ['0','10','24','40','']){
 const {r,s}=evaluate({city,location,rootHandling,method,distanceFeet});invariantCases++;
 invariantsPassed&&=r.authorizationGranted===false&&r.violationDetermined===false&&s.authorizationGranted===false&&s.rootRule.authorizationGranted===false&&s.rootRule.violationDetermined===false&&s.rootRule.supervisionVerified===false;
}
const permit=screenPermit({jurisdiction:'inside',location:'private',property:'developed',zoning:'r1r2',historic:'no',species:'liveoak',dbh:'24',plan:'no',extra:'none',work:'removal'});
const result={version:QUICK_DIGGING_VERSION,caseCount:cases.length,passed:cases.filter(c=>c.pass).length,cases,invariantCases,invariantsPassed,ordinaryResidentialRemovalUnchanged:permit.code==='NO_IDENTIFIED'};
await mkdir('test-artifacts',{recursive:true});await writeFile('test-artifacts/digging-acceptance-matrix.json',JSON.stringify(result,null,2));
console.log('DIGGING_ACCEPTANCE_MATRIX',JSON.stringify({...result,cases:undefined,failed:cases.filter(c=>!c.pass).map(c=>c.id)}));
assert.equal(result.passed,result.caseCount,'Failed scenarios: '+cases.filter(c=>!c.pass).map(c=>c.id).join(', '));
assert.equal(invariantsPassed,true,'No tested combination may grant authorization or verify supervision');
assert.equal(result.ordinaryResidentialRemovalUnchanged,true,'Keep residential removal separate from citywide root protection');
