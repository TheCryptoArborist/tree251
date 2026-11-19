import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveCallbackProperty as resolve,callbackPrefillURL,readCallbackPrefill,CALLBACK_INTAKE_URL} from '../public/testing/mobile-tree-callback-prefill.mjs';
for(const [code,expected] of [['developed','Residential'],['undeveloped','Residential'],['commercial','Commercial']])test('Reported property use '+code,()=>assert.equal(resolve({property:code}).value,expected));
for(const [tax,expected] of [['residential','Residential'],['commercial','Commercial']])test('City parcel classification '+tax,()=>assert.equal(resolve({property:'unknown',records:'ready',taxClass:tax}).value,expected));
test('Commercial parcel in residential zoning stays Commercial',()=>assert.equal(resolve({records:'ready',taxClass:'commercial',zoning:'r1r2'}).value,'Commercial'));
test('Zoning alone is never a property classification',()=>assert.equal(resolve({zoning:'r1r2'}).value,''));
test('Conflicting reported and parcel use remains unselected',()=>{for(const [property,taxClass] of [['developed','commercial'],['commercial','residential']])assert.equal(resolve({property,taxClass,records:'ready'}).value,'');});
test('Mixed-use/multifamily is not silently forced into a two-choice category',()=>assert.equal(resolve({property:'multifamily',taxClass:'commercial',records:'ready'}).value,''));
test('Stale or failed parcel lookups are not reused',()=>{for(const records of ['idle','loading','unavailable',''])assert.equal(resolve({taxClass:'residential',records}).value,'');});
test('Unknown stays blank',()=>assert.equal(resolve().value,''));
test('Only address and permitted property type are transferred',()=>{
 const u=new URL(callbackPrefillURL({address:'TEST PLACE & propertyType=Commercial # not a client',propertyType:'Residential',name:'DO NOT TRANSFER',phone:'NO',summary:'NO'}));
 assert.equal(u.origin,'https://form.jotform.com');assert.equal(u.pathname,'/221198646412861');assert.deepEqual([...u.searchParams.keys()],['propertyAddress[addr_line1]','propertyType']);assert.equal(u.searchParams.get('propertyType'),'Residential');assert.match(u.searchParams.get('propertyAddress[addr_line1]'),/& propertyType=/);assert.equal(u.hash,'');
});
test('Missing fields do not invent Mobile, Alabama or ZIP',()=>assert.equal(callbackPrefillURL(),CALLBACK_INTAKE_URL));
test('Unsupported categories are omitted',()=>assert.equal(new URL(callbackPrefillURL({propertyType:'Other'})).searchParams.has('propertyType'),false));
test('Selected property address wins over a partial search',()=>{
 const fields={propertyAddress:{value:'TEST COMPLETE ADDRESS'},propertyMapAddress:{value:'TEST'},scProperty:{value:'unknown'},permitForm:{dataset:{propertyRecords:'ready',parcelTaxClass:'residential'}}};
 const d={getElementById:id=>fields[id]};assert.equal(readCallbackPrefill(d).address,'TEST COMPLETE ADDRESS');assert.equal(readCallbackPrefill(d).propertyType,'Residential');fields.propertyAddress.value='';assert.equal(readCallbackPrefill(d).address,'TEST');
});
