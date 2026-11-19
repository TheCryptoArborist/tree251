import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {CITY_CONTACTS,CALLBACK_FORM_URL,buildCityInquiry,cityMailto,callbackSummary,readContactFacts} from '../public/testing/mobile-tree-contact-paths.mjs';
const facts={address:'EXAMPLE PROPERTY — NOT A CLIENT RECORD',work:'Dig near a tree',workCode:'root',digging:true,treeLocation:'Private land — reported',groundLocation:'City ROW — reported',plan:'Unknown',disturbedArea:'1250',distance:'6',dbh:'24',name:'Example',landStatus:'Not applied for',treeFinding:'Arborist review before digging'};
test('City contact addresses are .gov only',()=>{
 for(const route of Object.values(CITY_CONTACTS))for(const email of [route.to,route.cc].filter(Boolean))assert.match(email,/@cityofmobile\.gov$/);
});
test('Planning inquiry goes to Planning and copies Forestry only',()=>{
 const d=buildCityInquiry('plans',facts);assert.equal(d.to,'planning@cityofmobile.gov');assert.equal(d.cc,'forestry@cityofmobile.gov');
 assert.match(d.body,/latest approved site, landscape or tree-preservation plan/);assert.match(d.body,/subsequent revisions/);assert.match(d.body,/preservation credits/);
 assert.match(d.body,/not a permit application/);assert.match(d.body,/Unknown/);
 const url=new URL(cityMailto('plans',d.subject,d.body));assert.equal(url.pathname,d.to);assert.equal(url.searchParams.get('cc'),d.cc);assert.equal(url.searchParams.get('body'),d.body);
});
test('Land disturbance is not sent to Forestry or silently copied',()=>{
 const d=buildCityInquiry('land',facts);assert.equal(d.to,'land.disturbance@cityofmobile.gov');assert.equal(d.cc,'');
 assert.match(d.body,/1250 square feet/);assert.match(d.body,/professional engineer/);
 const url=new URL(cityMailto('land',d.subject,d.body));assert.equal(url.searchParams.has('cc'),false);
});
test('Missing area is not invented or treated as zero',()=>{
 const d=buildCityInquiry('land',{...facts,disturbedArea:''});assert.doesNotMatch(d.body,/square feet/);assert.doesNotMatch(d.body,/0 square/);
});
test('Zero is preserved when explicitly reported',()=>assert.match(buildCityInquiry('land',{...facts,disturbedArea:'0'}).body,/0 square feet/));
test('Unknown fields are not clearance and missing address stays a placeholder',()=>{
 const d=buildCityInquiry('plans');assert.match(d.subject,/\[Property address\]/);assert.match(d.body,/Not supplied \/ unverified/);assert.doesNotMatch(d.body,/no plan exists/i);
});
test('Header values are single line and recipient routes cannot be injected',()=>{
 const d=buildCityInquiry('plans',{address:'Example\r\nBcc: hidden@example.invalid'});assert.doesNotMatch(d.subject,/[\r\n]/);
 const u=new URL(cityMailto('plans','Subject\r\nBcc: other@example.invalid','Literal & body\nSecond line'));
 assert.equal(u.searchParams.has('bcc'),false);assert.equal(u.searchParams.get('body'),'Literal & body\nSecond line');
 for(const kind of ['__proto__','unknown','constructor']){assert.throws(()=>buildCityInquiry(kind),TypeError);assert.throws(()=>cityMailto(kind,'',''),TypeError);}
});
test('Callback context stays preliminary, timestamped and not an automatic submission',()=>{
 const s=callbackSummary(facts,'2026-11-19T16:00:00Z');assert.match(s,/24/);assert.match(s,/6/);assert.match(s,/preliminary/);assert.match(s,/does not submit a request/);assert.match(s,/2026-11-19T16:00:00Z/);
});
test('Jotform link carries no personal data or auto-submission parameter',()=>{
 const u=new URL(CALLBACK_FORM_URL);assert.equal(u.hostname,'form.jotform.com');assert.equal(u.pathname,'/221198646412861');assert.equal(u.search,'');assert.equal(u.hash,'');
});
test('Contact module does not perform background requests or store visitor data',async()=>{
 const s=await readFile(new URL('../public/testing/mobile-tree-contact-paths.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(s,/\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|createElement\(['"]iframe/);
 assert.doesNotMatch(s,/@cityofmobile\.org/);assert.match(s,/rel='noopener noreferrer'/);assert.match(s,/readOnly=true/);
});

const fakeDoc=values=>({getElementById:id=>id in values?{value:values[id],tagName:'INPUT'}:null});
test('Routine work does not inherit inactive digging answers',()=>{
 const f=readContactFacts(fakeDoc({scWork:'pruning',rowGroundWork:'no',rowWorkArea:'OLD ROW',residentLDArea:'9000',residentLDStatus:'issued',residentLDNumber:'OLD-PERMIT',digFeet:'1',digStage:'damaged'}));
 assert.equal(f.groundLocation,'');assert.equal(f.disturbedArea,'');assert.equal(f.landStatus,'');assert.equal(f.projectNumber,'');assert.equal(f.distance,'');assert.equal(f.stage,'');
});
test('A different affected tree never inherits original trunk facts',()=>{
 const f=readContactFacts(fakeDoc({scWork:'root',digTarget:'other',scDbh:'24',digOtherDbh:'36',scLocation:'ROW',scSpecies:'liveoak'}));
 assert.equal(f.dbh,'36');assert.match(f.treeLocation,/unverified/);assert.match(f.species,/Not identified/);
});
test('Planting uses the planting location and keeps reported area',()=>{
 const f=readContactFacts(fakeDoc({scWork:'planting',scLocation:'ROW',residentLDArea:'25'}));assert.equal(f.groundLocation,'ROW');assert.equal(f.disturbedArea,'25');
});
