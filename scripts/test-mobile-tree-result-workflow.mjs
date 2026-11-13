import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {formatScreeningSummary,replaceScreeningSummary} from '../public/testing/mobile-tree-result-workflow.mjs';
import {getWorkQualifications} from '../public/testing/mobile-tree-worker-qualifications.mjs';

// Controlled handoff fixture: does not purport to revalidate the ordinance engine.
const base={createdAt:'2026-11-13T15:30:00.000Z',answers:[['Largest proposed limb (inches)','7']],permit:{title:'Tree Commission approval required',reason:'Controlled test finding',next:'ROW application',missing:'',notes:'Reported facts'},udc:{title:'Development status unresolved',reason:'Unknown plan',next:'Plan review',missing:'Plan history',notes:''},worker:getWorkQualifications({jurisdiction:'inside',location:'row',work:'pruning'}),sources:['Example test reference']};

test('Summary includes limb, separate findings, supervision and unverified status',()=>{
 const s=formatScreeningSummary(base);
 for(const expected of ['Largest proposed limb (inches): 7','CHAPTER 65','CHAPTER 64','ISA Certified Arborist','NOT VERIFIED','not a City permit'])assert.ok(s.includes(expected),expected);
});
test('Generated summary never truncates user work notes',()=>{
 const manual='Work notes: '+'x'.repeat(2400);
 const s=replaceScreeningSummary(manual,formatScreeningSummary(base));
 assert.ok(s.startsWith(manual));assert.ok(s.endsWith('--- END TREE251 SCREENING SUMMARY ---'));
});
test('Replacement is idempotent and preserves manual notes',()=>{
 const x=replaceScreeningSummary('User notes','FIRST');
 assert.equal(replaceScreeningSummary(x,'SECOND'),replaceScreeningSummary('User notes','SECOND'));
});
test('Duplicate generated blocks are replaced with one current summary',()=>{
 const x=replaceScreeningSummary('User notes','FIRST');
 assert.equal(replaceScreeningSummary(x+'\n'+x,'NEW').split('BEGIN TREE251').length,2);
});
test('Unclosed user-edited block is not silently deleted',()=>{
 const s='My text --- BEGIN TREE251 SCREENING SUMMARY --- changed';
 assert.ok(replaceScreeningSummary(s,'new').startsWith(s));
});
test('No worker determination does not imply all contractors are qualified',()=>{
 assert.ok(formatScreeningSummary({...base,worker:null}).includes('not verification of a contractor'));
});
test('Worker outputs match the pre-change v0.2.2 baseline across 90 scenarios',()=>{
 const records=[];
 for(const jurisdiction of ['inside','outside','unknown'])for(const location of ['row','private','park','city','city-property','unknown'])for(const work of ['pruning','removal','root','clearing','planting']){
  const input={jurisdiction,location,work};records.push({input,result:getWorkQualifications(input)});
 }
 // Baseline generated from original blob d5c4af27bd48b00f4ed4f099890afd5e582a6393.
 assert.equal(records.length,90);
 assert.equal(createHash('sha256').update(JSON.stringify(records)).digest('hex'),'631e90849c443e5132c3b8161a2e5acd19c51ddca71ec9fc5b230ac63b7092c2');
});
