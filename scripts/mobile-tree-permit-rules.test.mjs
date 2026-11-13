import test from 'node:test';
import assert from 'node:assert/strict';
import {screenPermit,SPECIES} from '../public/testing/mobile-tree-permit-rules.mjs';
const base={jurisdiction:'inside',location:'private',work:'removal',property:'developed',historic:'no',plan:'no',species:'liveoak',dbh:24,extra:'none'};
const cases=[
 ['Qualifying developed residential outside district',{},'NO_IDENTIFIED'],
 ['Unknown historic status',{historic:'unknown'},'VERIFY'],
 ['Unknown city status',{jurisdiction:'unknown'},'VERIFY'],
 ['Outside city is not an exemption',{jurisdiction:'outside'},'OUTSIDE'],
 ['Unknown tree location',{location:'unknown'},'VERIFY'],
 ['Unknown property type',{property:'unknown'},'VERIFY'],
 ['Multifamily is not single-family exemption',{property:'multifamily'},'VERIFY'],
 ['Unknown plan blocks exemption',{plan:'unknown'},'VERIFY'],
 ['Unresolved construction blocks exemption',{extra:'yes'},'VERIFY'],
 ['Unresolved other restrictions blocks exemption',{extra:'unknown'},'VERIFY'],
 ['Historic pecan at 8',{historic:'yes',species:'pecan',dbh:8},'PERMIT'],
 ['Historic pecan below 8',{historic:'yes',species:'pecan',dbh:7.9},'NO_IDENTIFIED'],
 ['Historic pecan unknown DBH',{historic:'yes',species:'pecan',dbh:''},'VERIFY'],
 ['Historic pecan uncertain multistem',{historic:'yes',species:'pecan',dbh:30,measurementUncertain:true},'VERIFY'],
 ['Historic unidentified tree',{historic:'yes',species:'unknown'},'VERIFY'],
 ['Other species not an automatic exemption',{historic:'yes',species:'other'},'VERIFY'],
 ['Historic bald cypress not heritage',{historic:'yes',species:'baldcypress'},'NO_IDENTIFIED'],
 ['Commercial heritage at 18',{property:'commercial',dbh:18},'PERMIT'],
 ['Commercial heritage below 18',{property:'commercial',dbh:17.9},'NO_IDENTIFIED'],
 ['Commercial historic threshold 8',{property:'commercial',historic:'yes',dbh:8},'PERMIT'],
 ['Commercial known trigger survives unknown historic',{property:'commercial',historic:'unknown',dbh:18},'PERMIT'],
 ['Commercial plan overrides nonheritage',{property:'commercial',plan:'yes',species:'baldcypress',dbh:2},'PERMIT'],
 ['Undeveloped live oak at 18',{property:'undeveloped',dbh:18},'PERMIT'],
 ['Undeveloped live oak below 18',{property:'undeveloped',dbh:17.9},'NO_IDENTIFIED'],
 ['Undeveloped historic live oak at 8',{property:'undeveloped',historic:'yes',dbh:8},'PERMIT'],
 ['Undeveloped nonhistoric pecan',{property:'undeveloped',species:'pecan',dbh:30},'NO_IDENTIFIED'],
 ['ROW nonexempt at 3',{location:'row',dbh:3},'ADMIN'],
 ['ROW nonexempt above 3',{location:'row',dbh:3.01},'COMMISSION'],
 ['ROW nonexempt below 3',{location:'row',dbh:2.9},'ADMIN'],
 ['ROW unknown DBH',{location:'row',dbh:''},'VERIFY'],
 ['ROW unknown species',{location:'row',species:'unknown'},'VERIFY'],
 ['ROW bald cypress not exempt',{location:'row',species:'baldcypress'},'COMMISSION'],
 ['ROW larger limbs',{location:'row',work:'pruning',limb:3},'COMMISSION'],
 ['ROW smaller limbs are not unrestricted',{location:'row',work:'pruning',limb:2.9},'ROW_REVIEW'],
 ['ROW unknown limb size',{location:'row',work:'pruning'},'ROW_REVIEW'],
 ['Park cannot borrow ROW exemption',{location:'park',species:'wateroak'},'PUBLIC'],
 ['City property cannot borrow ROW exemption',{location:'city',species:'wateroak'},'PUBLIC'],
 ['Historic clearing is a separate process',{work:'clearing',historic:'yes',dbh:1},'SPECIAL'],
 ['Roots a separate process',{work:'roots'},'SPECIAL'],
 ['Planting a separate process',{work:'planting'},'SPECIAL'],
 ['Relocation a separate process',{work:'relocation'},'SPECIAL'],
 ['Unknown work not an exemption',{work:'unknown'},'VERIFY'],
 ['Unknown properties do not erase definite historic trigger',{property:'unknown',historic:'yes',species:'pecan',dbh:8},'PERMIT'],
 ['Invalid species key fails safely',{historic:'yes',species:'<script>'},'VERIFY'],
 ['Negative DBH fails safely',{historic:'yes',dbh:-5},'VERIFY'],
 ['NaN DBH fails safely',{historic:'yes',dbh:'banana'},'VERIFY']
];
for(const [name,changes,expected]of cases)test(name,()=>assert.equal(screenPermit({...base,...changes}).code,expected));
for(const species of ['wateroak','camphor','popcorn','cherrylaurel']){
 for(const dbh of [2,3,6,30,''])test(`ROW ${species} removal exemption independent of DBH ${dbh}`,()=>assert.equal(screenPermit({...base,location:'row',species,dbh}).code,'ROW_EXEMPT'));
 test(`ROW ${species} pruning recommended not unrestricted`,()=>assert.equal(screenPermit({...base,location:'row',species,work:'pruning',limb:6}).code,'RECOMMENDED'));
 test(`ROW ${species} removal with other impacts not blanket clearance`,()=>assert.equal(screenPermit({...base,location:'row',species,extra:'yes'}).code,'VERIFY'));
}
test('Storm claims never change rule outcome',()=>{for(const [,changes]of cases){const a=screenPermit({...base,...changes}),b=screenPermit({...base,...changes,storm:true,arborist:'Unverified credential'});assert.equal(b.code,a.code);assert.equal(b.reason,a.reason);assert(b.notes.some(n=>n.includes('unverified observation')));}});
test('Pecan maps to heritage Carya group',()=>{assert.equal(SPECIES.pecan.heritage,true);assert.match(screenPermit({...base,historic:'yes',species:'pecan'}).notes.join(' '),/Carya/);});
test('No user field can claim City approval',()=>{assert.equal(screenPermit({...base,historic:'yes',approved:true,waiver:true,arboristVerified:true}).code,'PERMIT');});
test('Empty input safe',()=>assert.equal(screenPermit().code,'VERIFY'));
