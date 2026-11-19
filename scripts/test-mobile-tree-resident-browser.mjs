import assert from 'node:assert/strict';
import {execSync} from 'node:child_process';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import * as policy from '../public/testing/mobile-tree-property-policy.mjs';

// Preserve the resident/GIS scenarios from the original workflow. Read the
// checked-out versions instead of waiting forever for old literal versions.
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const files=['mobile-tree-property-policy.mjs','mobile-tree-resident-workflow.mjs','mobile-tree-map-data.mjs','mobile-tree-address-answers.mjs','mobile-tree-address-map.mjs','mobile-tree-final-result.mjs','mobile-tree-contact-paths.mjs','mobile-tree-task-tabs.mjs'];
const expected=await Promise.all(files.map(name=>readFile('public/testing/'+name,'utf8')));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let ready=false,mismatches=files;
for(let attempt=0;attempt<50;attempt++){
 try{
  const actual=await Promise.all(files.map(async name=>{
   const response=await fetch(origin+'/testing/'+name,{cache:'no-store',signal:AbortSignal.timeout(12000)});
   return response.ok?response.text():'';
  }));
  mismatches=files.filter((name,index)=>actual[index]!==expected[index]);
  if(!mismatches.length){ready=true;break;}
 }catch{}
 await sleep(4000);
}
assert.ok(ready,'Exact resident preview not deployed: '+mismatches.join(', '));
let assertions=0;
const eq=(actual,expected,message)=>{assert.equal(actual,expected,message);assertions++;};
const matches=(text,pattern)=>{assert.match(text,pattern);assertions++;};
const check=(condition,message)=>{assert.ok(condition,message);assertions++;};
const json=async path=>{
 const response=await fetch(origin+path,{signal:AbortSignal.timeout(30000)});
 eq(response.status,200,path+' must respond');return response.json();
};
// Live public data: the address point alone must not determine the entire lot.
const airportAddress=await json('/api/mobile-tree-gis?mode=address&q=2721%20Airport%20Boulevard');
eq(airportAddress.features.length,1);
const airportPoint=airportAddress.features[0].geometry;
const parcelZoning=await json('/api/mobile-tree-gis?'+new URLSearchParams({mode:'property',lon:String(airportPoint.x),lat:String(airportPoint.y)}));
eq(parcelZoning.propertyStatus,'ok');eq(parcelZoning.zoningStatus,'ok');
// Compare the gateway to the CURRENT authoritative fields. City parcel IDs and
// optional tax attributes can change; never manufacture yesterday's value.
const upstreamURL=new URL('https://maps.cityofmobile.org/arcgis/rest/services/Parcel_Details_MS/MapServer/0/query');
upstreamURL.search=new URLSearchParams({where:'1=1',geometry:airportPoint.x+','+airportPoint.y,geometryType:'esriGeometryPoint',inSR:'4326',spatialRel:'esriSpatialRelIntersects',returnGeometry:'false',outFields:'parcel,keyx,classcode_desc,undeveloped',f:'json'}).toString();
const upstreamResponse=await fetch(upstreamURL,{signal:AbortSignal.timeout(30000),cache:'no-store'});
eq(upstreamResponse.status,200);
const upstream=await upstreamResponse.json();check(!upstream.error,'Direct City parcel query must succeed');
eq(upstream.features?.length,1,'Direct City parcel must be unambiguous');
const cityAttrs=Object.fromEntries(Object.entries(upstream.features[0].attributes).map(([key,value])=>[key.toLowerCase(),value]));
for(const key of ['parcel','keyx','classcode_desc','undeveloped'])eq(parcelZoning.parcel[key],cityAttrs[key]??null,'Gateway preserves current City '+key);
const liveTaxClass=policy.mappedProperty({parcel:{matches:[{attributes:cityAttrs}]}}).taxClass;
if(!cityAttrs.classcode_desc)eq(liveTaxClass,'unknown','Absent City classification must stay unknown');
assert.deepEqual(parcelZoning.zoningDistricts.map(x=>x.code).sort(),['B-1','R-1']);assertions++;
const f=(code='R-1',name='Single-Family Residential',overlay='N/A')=>({zoning:{state:'inside',matches:[{attributes:{district_code:code,district_name:name,sub_district_name:'Suburban',overlay}}]},overlays:{state:'none',matches:[]}});
eq(policy.mappedProperty(f()).zoning,'r1r2');eq(policy.mappedProperty(f()).overlay,'none');
eq(policy.mappedProperty(f('R-2','Two-Family Residential')).zoning,'r1r2');
eq(policy.mappedProperty(f('DDD','Downtown Development District')).overlay,'downtown');
eq(policy.mappedProperty(f('PD','Planned Development')).overlay,'planned');
eq(policy.mappedProperty(f('B-2','Neighborhood Business','Springhill Overlay')).overlay,'springhill');
eq(policy.mappedProperty({...f(),zoning:{...f().zoning,state:'boundary'}}).zoning,'unknown');
eq(policy.mappedProperty({...f(),overlays:{state:'unavailable'}}).overlay,'unknown');
eq(policy.mappedProperty(f('R-1','Single-Family Residential',null)).overlay,'unknown');
eq(policy.mappedProperty(f()).priorApprovals,'not_verified');
eq(policy.staffPlanReview({city:'inside',location:'private',property:'commercial',plan:'unknown'}).code,'STAFF_VERIFICATION');
eq(policy.staffPlanReview({city:'inside',location:'private',property:'developed',zoning:'r1r2',overlay:'none',development:'no',plan:'unknown'}).code,'STANDARD_EXCLUSION');
eq(policy.staffPlanReview({city:'inside',location:'private',development:'yes',landDisturbance:'issued'}).code,'STAFF_VERIFICATION');
matches(policy.staffPlanReview({development:'yes',landDisturbance:'issued'}).projectNote,/not treated as tree-removal approval/);
matches(policy.engineeringReview({city:'inside',location:'row',work:'planting'}).requirement,/Engineering/);
// Routine tree work has an explicit no-ground-work answer; omission is unknown.
eq(policy.engineeringReview({city:'inside',location:'row',work:'removal',rowGroundWork:'no'}).code,'ROUTINE_NO_TRIGGER');
eq(policy.engineeringReview({city:'inside',location:'row',work:'removal'}).code,'WORK_SCOPE_UNKNOWN');

const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
let page;const errors=[];
await mkdir('test-artifacts/resident',{recursive:true});
try{
 page=await browser.newPage({viewport:{width:390,height:844}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/testing/mobile-tree-checker.html',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#propertyMapAddress');
 await page.waitForFunction(()=>document.getElementById('permitForm')?.dataset.residentWorkflow);
 eq(await page.getAttribute('#permitForm','data-resident-workflow'),policy.RESIDENT_VERSION);
 await page.waitForSelector('.hero .notice[data-permitting-guidance="yes"]');
 matches(await page.textContent('.hero .notice'),/City of Mobile departments.*final decisions on permit applications/);
 matches(await page.textContent('.hero .notice'),/does not issue permits, grant approval, or authorize work/);
 await page.fill('#propertyMapAddress','6 Maury Drive');
 eq(await page.isChecked('#propertyMapConsent'),true);eq(await page.locator('#propertyMapConsent').isVisible(),false);
 await page.click('#findPropertyMap');
 await page.locator('#propertyMapCandidates button').first().click({timeout:40000});
 await page.waitForFunction(()=>document.getElementById('udcZoning').value==='r1r2',{},{timeout:50000});
 await page.waitForSelector('#applyMapAnswers:not([disabled])',{timeout:45000});
 eq(await page.inputValue('#udcOverlay'),'none');
 eq(await page.locator('#scExtra').isVisible(),false);
 eq(await page.locator('#udcZoning').isVisible(),false);eq(await page.locator('#udcOverlay').isVisible(),false);
 matches(await page.textContent('#udcZoningRecord'),/R-1.*Single-Family/);
 matches(await page.textContent('#udcOverlayRecord'),/NOT been ruled out/);
 eq(await page.locator('#scProperty option[value="commercial"]').count(),1);
 eq(await page.locator('#scProperty option[value="undeveloped"]').count(),1);
 eq(await page.locator('#udcPlan option[value="no"]').count(),1);
 for(const id of ['udcRequiredTree','udcCredit','udcBuffer']){eq(await page.locator('#'+id).isVisible(),false);eq(await page.inputValue('#'+id),'unknown');}
 await page.waitForFunction(()=>!document.getElementById('residentGISAnswers')?.hidden,{},{timeout:15000});
 matches(await page.textContent('#residentGISRows'),/R-1.*Single-Family Residential/s);
 matches(await page.textContent('#residentGISRows'),/Parcel.*development/s);
 matches(await page.textContent('#residentGISRows'),/Approved landscape plan/);
 matches(await page.textContent('#residentGISAnswers'),/confirming the actual tree location/);
 await page.click('#applyMapAnswers');eq(await page.inputValue('#udcZoning'),'r1r2');
 await page.waitForFunction(()=>document.getElementById('residentGISAnswers').textContent.includes('Inside City of Mobile'),{},{timeout:12000});
 matches(await page.textContent('#residentGISAnswers'),/Not in a locally designated district/);
 eq(await page.locator('#scCity').isVisible(),false);eq(await page.locator('#scHistoric').isVisible(),false);
 await page.click('#reviewGISAnswers');
 eq(await page.locator('#scCity').isVisible(),true);eq(await page.locator('#scHistoric').isVisible(),true);
 await page.selectOption('#udcPlan','no');eq(await page.inputValue('#udcPlan'),'no');
 matches(await page.textContent('#udcPlanPlainHelp'),/City map|approved|plan/i);
 await page.selectOption('#udcPlan','unknown');
 await page.click('#step-property');
 const box=await page.locator('#propertyTreeMap').boundingBox();
 await page.locator('#propertyTreeMap').click({position:{x:box.width/2+20,y:box.height/2-18}});
 await page.waitForSelector('#applyMapAnswers:not([disabled])',{timeout:45000});await page.click('#applyMapAnswers');
 eq(await page.inputValue('#udcZoning'),'r1r2');
 await page.selectOption('#scLocation','private');await page.selectOption('#scProperty','developed');
 await page.selectOption('#scWork','removal');await page.selectOption('#scSpecies','liveoak');await page.fill('#scDbh','20');
 await page.selectOption('#udcDevelopment','no');await page.selectOption('#rowGroundWork','no');
 await page.click('#screenNow');await page.waitForSelector('#permitOutput:not(.hidden)');
 matches(await page.textContent('#permitOutcome'),/No Chapter 65/i);
 await page.waitForSelector('#simplePermitAnswer[data-outcome="residential-no-permit"]',{timeout:12000});
 matches(await page.textContent('#simplePermitAnswer'),/No City Chapter 65 tree permit required/);
 matches(await page.textContent('#simplePermitAnswer'),/No City tree-permit application or Forestry email is needed/);
 matches(await page.textContent('#forestryEmailCTA'),/Optional: Need clarification/);
 eq(await page.locator('#resultDetails').evaluate(el=>el.open),false);
 check(await page.locator('#requestArboristCallback').isVisible(),'Optional consulting remains available without a permit trigger');
 await page.click('#step-work');await page.selectOption('#scLocation','row');await page.selectOption('#scWork','pruning');await page.fill('#scLimb','7');
 await page.click('#screenNow');await page.waitForSelector('#workerQualifications:not(.hidden)');
 matches(await page.textContent('#permitOutcome'),/Commission/);
 matches(await page.textContent('#workerQualifications'),/ISA Certified Arborist/);
 matches(await page.textContent('label[for="scLocation"]'),/trunk meet the ground/);
 await page.click('#step-work');await page.selectOption('#scWork','planting');
 eq(await page.locator('#scLimb').isVisible(),false);eq(await page.locator('#scDbh').isVisible(),false);
 await page.click('#screenNow');await page.waitForSelector('#residentEngineering:not([hidden])');
 matches(await page.textContent('#residentEngineering'),/Engineering.*right-of-way/);
 await page.click('#step-work');await page.selectOption('#scWork','removal');await page.selectOption('#scLocation','private');await page.selectOption('#scProperty','undeveloped');await page.fill('#scDbh','18');
 await page.selectOption('#udcDevelopment','yes');await page.selectOption('#residentLDStatus','issued');await page.fill('#residentLDNumber','TEST-REVIEW-ONLY');
 await page.click('#screenNow');await page.waitForSelector('#permitOutput:not(.hidden)');
 matches(await page.textContent('#permitOutcome'),/permit required/i);
 matches(await page.textContent('#udcOutcome'),/separately from the land-disturbance/);
 await page.click('#reviewForestryEmail');await page.waitForSelector('#draftArea:not(.hidden)');
 const body=await page.inputValue('#emailBody');matches(body,/approved landscaping plan affects this tree/);matches(body,/TEST-REVIEW-ONLY/);
 matches(await page.inputValue('#screeningRecord'),/not treated as tree-removal approval/);
 for(const width of [320,390,820,1200]){await page.setViewportSize({width,height:844});check(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2),'No horizontal overflow at '+width);}
 await page.click('#step-property');await page.fill('#propertyMapAddress','205 Government Street');
 eq(await page.inputValue('#udcZoning'),'unknown');eq(await page.locator('#permitOutput').isVisible(),false);eq(await page.locator('#draftArea').isVisible(),false);
 await page.fill('#propertyMapAddress','2721 Airport Boulevard');await page.click('#findPropertyMap');
 await page.locator('#propertyMapCandidates button').first().click({timeout:35000});
 await page.waitForSelector('#permitForm[data-property-records="ready"]',{timeout:60000,state:'attached'});
 eq(await page.getAttribute('#permitForm','data-parcel-tax-class'),liveTaxClass);eq(await page.getAttribute('#permitForm','data-split-zoned'),'yes');
 matches(await page.textContent('#udcZoningRecord'),/R-1.*B-1/);
 if(cityAttrs.classcode_desc)check((await page.textContent('#residentParcelStatus')).includes('Tax classification: '+cityAttrs.classcode_desc),'UI preserves the current classification');
 else check(!(await page.textContent('#residentParcelStatus')).includes('Tax classification: Commercial'),'Missing classification is not displayed as Commercial');
 eq(await page.locator('#scProperty option[value="commercial"]').count(),1);eq(await page.inputValue('#scProperty'),'unknown');
 await page.waitForSelector('#applyMapAnswers:not([disabled])',{timeout:45000});await page.click('#applyMapAnswers');
 eq(await page.inputValue('#scCity'),'inside');eq(await page.inputValue('#scHistoric'),'no');
 await page.selectOption('#scLocation','private');await page.selectOption('#scProperty','developed');await page.selectOption('#scWork','removal');
 await page.selectOption('#scSpecies','liveoak');await page.fill('#scDbh','18');await page.selectOption('#udcPlan','no');await page.selectOption('#udcDevelopment','no');
 await page.click('#screenNow');await page.waitForSelector('#permitOutput:not(.hidden)');
 // A reported residence and a missing tax class do not fabricate a Chapter 65
 // conflict. Split zoning still requires independent Chapter 64 verification.
 if(liveTaxClass==='commercial')matches(await page.textContent('#permitOutcome'),/verification/i);
 else matches(await page.textContent('#permitOutcome'),/No Chapter 65/i);
 matches(await page.textContent('#udcOutcome'),/staff verification/i);
 await page.waitForSelector('#simplePermitAnswer:not([hidden])');
 check((await page.getAttribute('#simplePermitAnswer','data-outcome'))!=='residential-no-permit','Split-zoned parcel cannot inherit residential clearance, even with missing classification');
 matches(await page.textContent('#simplePermitAnswer'),/Split zoning/);
 await page.click('#step-work');await page.selectOption('#scProperty','commercial');await page.click('#screenNow');await page.waitForSelector('#permitOutput:not(.hidden)');
 matches(await page.textContent('#permitOutcome'),/Tree permit required/);matches(await page.textContent('#simplePermitAnswer'),/Split zoning/);
 // Preserve commercial conflict coverage with a labelled, controlled browser
 // fixture. This is never written to the live GIS or used as real parcel data.
 const fixture=await browser.newPage({viewport:{width:390,height:844}});
 fixture.on('pageerror',e=>errors.push(e.message));
 const pt={x:-88.1102672,y:30.6882158};
 const rings=[[[pt.x-.002,pt.y-.002],[pt.x+.002,pt.y-.002],[pt.x+.002,pt.y+.002],[pt.x-.002,pt.y+.002],[pt.x-.002,pt.y-.002]]];
 let fixtureClass='Commercial';
 await fixture.route('**/api/mobile-tree-gis?*',async route=>{
  const u=new URL(route.request().url()),mode=u.searchParams.get('mode');
  const parcel={objectid:1,parcel:'CONTROLLED-TEST-NOT-A-CITY-RECORD',keyx:'TEST',undeveloped:null,classcode_desc:fixtureClass,acreage:1};
  const attributes={city:{objectid:1,name:'MOBILE'},zoning:{objectid:1,district_code:'R-1',district_name:'Single-Family Residential',sub_district_name:'Suburban',overlay:'N/A'},parcel};
  const fetchedAt=new Date().toISOString();let data;
  if(mode==='address')data={status:'ok',fetchedAt,features:[{attributes:{address:'CONTROLLED TEST PROPERTY'},geometry:pt}]};
  else if(mode==='property')data={status:'ok',fetchedAt,point:{lon:pt.x,lat:pt.y},propertyStatus:'ok',parcel,zoningStatus:'ok',zoningDistricts:[{code:'R-1',name:'Single-Family Residential'}]};
  else data={status:'ok',fetchedAt,point:{lon:pt.x,lat:pt.y},layers:Object.fromEntries((u.searchParams.get('layer')?[u.searchParams.get('layer')]:['city','historic','zoning','overlays','parcel','cityProperty','park','planning']).map(k=>[k,{status:'ok',source:'https://example.invalid/controlled-test',fetchedAt,spatialReference:{wkid:4326},features:attributes[k]?[{attributes:attributes[k],geometry:{rings}}]:[]}]))};
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
 });
 const loadFixture=async()=>{
  await fixture.goto(origin+'/testing/mobile-tree-checker.html',{waitUntil:'domcontentloaded'});
  await fixture.waitForSelector('#propertyMapAddress');
  await fixture.fill('#propertyMapAddress','1 Controlled Test');await fixture.click('#findPropertyMap');
  await fixture.locator('#propertyMapCandidates button').first().click();
  await fixture.waitForSelector('#permitForm[data-property-records="ready"]',{state:'attached'});
  await fixture.waitForSelector('#applyMapAnswers:not([disabled])');await fixture.click('#applyMapAnswers');
 };
 await loadFixture();
 eq(await fixture.getAttribute('#permitForm','data-parcel-tax-class'),'commercial');
 eq(await fixture.inputValue('#scProperty'),'unknown','Tax class must not silently set actual use');
 await fixture.selectOption('#scLocation','private');await fixture.selectOption('#scProperty','developed');
 await fixture.selectOption('#scWork','removal');await fixture.selectOption('#scSpecies','liveoak');
 await fixture.fill('#scDbh','18');await fixture.selectOption('#udcPlan','no');await fixture.selectOption('#udcDevelopment','no');
 await fixture.selectOption('#rowGroundWork','no');await fixture.click('#screenNow');
 await fixture.waitForSelector('#simplePermitAnswer:not([hidden])');
 matches(await fixture.textContent('#permitOutcome'),/verification/i);
 check((await fixture.getAttribute('#simplePermitAnswer','data-outcome'))!=='residential-no-permit','Controlled Commercial/R-1 conflict must not inherit home exclusion');
 fixtureClass=null;await loadFixture();
 eq(await fixture.getAttribute('#permitForm','data-parcel-tax-class'),'unknown','Controlled null classification stays unknown');
 eq(await fixture.inputValue('#scProperty'),'unknown','R-1 zoning does not fill a missing property use');
 await fixture.selectOption('#scLocation','private');await fixture.selectOption('#scWork','removal');
 await fixture.selectOption('#scSpecies','liveoak');await fixture.fill('#scDbh','18');
 await fixture.selectOption('#udcPlan','unknown');await fixture.selectOption('#udcDevelopment','no');await fixture.selectOption('#rowGroundWork','no');
 await fixture.click('#screenNow');await fixture.waitForSelector('#simplePermitAnswer:not([hidden])');
 check((await fixture.getAttribute('#simplePermitAnswer','data-outcome'))!=='residential-no-permit','Missing classification and unconfirmed actual use cannot become residential clearance');
 await fixture.close();
 assert.deepEqual(errors,[]);assertions++;
 await page.screenshot({path:'test-artifacts/resident/commercial-result.png',fullPage:true});
 const result={assertions,liveAddresses:['6 MAURY DR','2721 AIRPORT BLVD'],liveTaxClass,upstreamClassification:cityAttrs.classcode_desc??null,controlledBrowserFixtures:['Commercial record with R-1 zoning and conflicting reported residence','Missing classification with unconfirmed actual use'],exactHostedFiles:files,automaticPropertyZoning:true,technicalPlanQuestionsHidden:true,landDisturbanceNotTreePermission:true,rowPlantingEngineeringRoute:true,changedAddressInvalidates:true,physicalIPhone:false,noEmailSent:true,noJotformSubmission:true,errors};
 await writeFile('test-artifacts/resident/result.json',JSON.stringify(result,null,2));
 console.log('RESIDENT_WORKFLOW_PASS',JSON.stringify(result));
}catch(error){
 await writeFile('test-artifacts/resident/failure.json',JSON.stringify({assertions,error:String(error),errors},null,2));
 if(page)await page.screenshot({path:'test-artifacts/resident/failure.png',fullPage:true}).catch(()=>{});
 throw error;
}finally{await browser.close();}
