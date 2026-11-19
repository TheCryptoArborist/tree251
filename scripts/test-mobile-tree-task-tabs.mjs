import assert from 'node:assert/strict';
import {execSync} from 'node:child_process';
import {readFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const digest=x=>createHash('sha256').update(x).digest('hex');
const expected=await readFile('public/testing/mobile-tree-task-tabs.mjs','utf8');
const expectedLoader=await readFile('public/testing/mobile-tree-worker-qualifications.mjs','utf8');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ready=false;
for(let i=0;i<45;i++){
 try{
  const files=await Promise.all(['mobile-tree-task-tabs.mjs','mobile-tree-worker-qualifications.mjs'].map(async n=>{
   const r=await fetch(origin+'/testing/'+n,{cache:'no-store',signal:AbortSignal.timeout(10000)});return r.ok?r.text():'';
  }));
  if(digest(files[0])===digest(expected)&&digest(files[1])===digest(expectedLoader)){ready=true;break;}
 }catch{}
 await sleep(5000);
}
assert.ok(ready,'The exact tab build has not reached the preview');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
let assertions=0;
const eq=(a,b,msg)=>{assert.equal(a,b,msg);assertions++;};
const matches=(text,re)=>{assert.match(text,re);assertions++;};
const errors=[];
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 page.on('pageerror',e=>errors.push(e.message));
 let gisRequests=0;
 // Controlled map fixtures test UI retention, not new City/parcel verification.
 const point={lon:-88.1102672,lat:30.6882158};
 const polygon={rings:[[[point.lon-.005,point.lat-.005],[point.lon+.005,point.lat-.005],[point.lon+.005,point.lat+.005],[point.lon-.005,point.lat+.005],[point.lon-.005,point.lat-.005]]]};
 const parcel={objectid:1,parcel:'TEST-PARCEL-NOT-A-CITY-RECORD',keyx:'TEST',undeveloped:'No',classcode_desc:'Residential',acreage:1};
 const attributes={city:{objectid:1,name:'MOBILE'},zoning:{objectid:1,district_code:'R-1',district_name:'Single-Family Residential',sub_district_code:'Suburban',sub_district_name:'Suburban',overlay:'N/A'},parcel};
 await page.route('**/api/mobile-tree-gis?*',async route=>{
  gisRequests++;
  const url=new URL(route.request().url()),mode=url.searchParams.get('mode');
  const fetchedAt=new Date().toISOString();let data;
  if(mode==='address')data={status:'ok',fetchedAt,source:'https://example.invalid/test/address',features:[{attributes:{objectid:1,address:'6 MAURY DR',zipcode:'36606'},geometry:{x:point.lon,y:point.lat}}]};
  else if(mode==='property')data={status:'ok',fetchedAt,point,propertyStatus:'ok',parcel,zoningStatus:'ok',zoningDistricts:[{code:'R-1',name:'Single-Family Residential'}]};
  else{
   const all=['city','historic','zoning','overlays','parcel','cityProperty','park','planning'];
   const requested=url.searchParams.get('layer');
   data={status:'ok',fetchedAt,point,layers:Object.fromEntries((requested?[requested]:all).map(k=>[k,{status:'ok',source:'https://example.invalid/test/'+k,fetchedAt,spatialReference:{wkid:4326},features:attributes[k]?[{attributes:attributes[k],geometry:polygon}]:[]}]))};
  }
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
 });
 const set=async values=>page.evaluate(values=>{
  for(const [id,value] of Object.entries(values)){
   const n=document.getElementById(id);if(!n)throw Error('Missing field '+id);
   if(n.type==='checkbox')n.checked=value;else n.value=String(value);
   n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));
  }
 },values);
 const run=async()=>{await page.click('#screenNow');await page.waitForSelector('#permitOutput:not(.hidden)');await page.waitForTimeout(180);};
 await page.goto(origin+'/testing/mobile-tree-checker.html',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#treeTaskTabs');await page.waitForSelector('#propertyMapAddress');
 await page.waitForFunction(()=>!document.getElementById('screenNow')?.disabled);
 eq(await page.getAttribute('#treeWorkTab','aria-selected'),'true');
 eq(await page.locator('#treeWorkPanel').isVisible(),true);
 eq(await page.locator('#diggingTaskPanel').isVisible(),false);
 eq(await page.locator('#diggingFields').isVisible(),false);
 eq(gisRequests,0,'No lookup merely from opening the tabs');
 await page.fill('#propertyMapAddress','6 Maury Drive');await page.click('#findPropertyMap');
 await page.locator('#propertyMapCandidates button').first().click();
 await page.waitForSelector('#permitForm[data-property-records="ready"]');
 await page.waitForSelector('#applyMapAnswers:not([disabled])');await page.click('#applyMapAnswers');
 await set({scLocation:'row',scSpecies:'liveoak',scDbh:24});
 const requestsBefore=gisRequests;
 await page.evaluate(()=>window.__originalTaskMap=document.getElementById('propertyTreeMap'));
 await page.click('#diggingTab');
 eq(await page.getAttribute('#diggingTab','aria-selected'),'true');
 eq(await page.locator('#treeWorkPanel').isVisible(),false);
 eq(await page.locator('#diggingTaskPanel').isVisible(),true);
 eq(await page.inputValue('#scWork'),'root');
 eq(await page.locator('#scWork').isVisible(),false);
 eq(await page.locator('#scLimb').isVisible(),false);
 eq(await page.locator('#scLimb').isDisabled(),true);
 eq(await page.locator('#diggingFields').isVisible(),true);
 eq(await page.inputValue('#propertyMapAddress'),'6 Maury Drive');
 eq(await page.inputValue('#scCity'),'inside');eq(await page.inputValue('#scHistoric'),'no');
 eq(await page.inputValue('#scDbh'),'24');
 eq(await page.evaluate(()=>window.__originalTaskMap===document.getElementById('propertyTreeMap')),true);
 eq(gisRequests,requestsBefore,'Tab switch does not rerun GIS');
 matches(await page.textContent('#screenNow'),/Check whether tree review is needed/);
 await set({digPurpose:'utility',digArea:'row',digFeet:'10',digDepth:'24',digWidth:'2',digLength:'20',digMeasured:'measured',digMethod:'machinery',digHandling:'cut',digStage:'not-started',digOtherTrees:'no',digStorage:'no',dig811:'pending'});
 await run();await page.waitForSelector('#diggingResult:not([hidden])');
 eq(await page.getAttribute('#diggingResult','data-outcome'),'CLOSE_EXCAVATION');
 matches(await page.textContent('#diggingResult'),/12–36 feet/);
 matches(await page.textContent('#diggingResult'),/not a finding that a violation/);
 matches(await page.inputValue('#screeningRecord'),/Nearest excavation distance \(ft\): 10/);
 await page.click('#reviewForestryEmail');await page.waitForSelector('#draftArea:not(.hidden)');
 matches(await page.inputValue('#emailBody'),/digging \/ utility work near a tree/i);
 await page.click('#treeWorkTab');
 eq(await page.inputValue('#scWork'),'removal');
 eq(await page.locator('#permitOutput').isVisible(),false);
 eq(await page.locator('#draftArea').isVisible(),false);
 eq(await page.inputValue('#digFeet'),'10');eq(await page.locator('#digFeet').isDisabled(),true);
 eq(await page.inputValue('#scLocation'),'row');eq(await page.inputValue('#udcZoning'),'r1r2');
 await page.selectOption('#scWork','pruning');await page.fill('#scLimb','7');await run();
 matches(await page.textContent('#permitOutcome'),/Commission/);
 await page.click('#diggingTab');await page.selectOption('#digStage','damaged');await run();
 eq(await page.getAttribute('#diggingResult','data-outcome'),'DAMAGE_REPORTED');
 await page.click('#treeWorkTab');eq(await page.inputValue('#scWork'),'pruning');eq(await page.inputValue('#scLimb'),'7');
 await page.check('#digAlso');eq(await page.getAttribute('#treeWorkTab','aria-selected'),'true');
 eq(await page.locator('#diggingFields').isVisible(),true);await run();
 matches(await page.textContent('#permitOutcome'),/Commission/);
 eq(await page.getAttribute('#diggingResult','data-outcome'),'DAMAGE_REPORTED');
 await page.uncheck('#digAlso');
 await page.selectOption('#scWork','root');eq(await page.getAttribute('#diggingTab','aria-selected'),'true');
 await page.click('#treeWorkTab');eq(await page.inputValue('#scWork'),'pruning');
 await page.focus('#treeWorkTab');await page.keyboard.press('ArrowRight');
 eq(await page.evaluate(()=>document.activeElement.id),'diggingTab');
 eq(await page.getAttribute('#treeWorkTab','aria-selected'),'true');
 await page.keyboard.press('Enter');eq(await page.getAttribute('#diggingTab','aria-selected'),'true');
 await page.keyboard.press('Home');eq(await page.evaluate(()=>document.activeElement.id),'treeWorkTab');
 await page.keyboard.press('Space');eq(await page.getAttribute('#treeWorkTab','aria-selected'),'true');
 const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));
 assert.deepEqual(ids.filter((id,i)=>ids.indexOf(id)!==i),[]);assertions++;
 for(const width of [320,390,820,1200]){
  await page.setViewportSize({width,height:900});
  eq(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2),true,'No overflow at '+width);
  const box=await page.locator('#treeTaskTablist').boundingBox();assert.ok(box.width<=width);assertions++;
 }
 await page.setViewportSize({width:390,height:844});await page.click('#diggingTab');await page.locator('#treeTaskTabs').scrollIntoViewIfNeeded();
 await page.evaluate(()=>window.scrollTo(0,0));await mkdir('test-artifacts',{recursive:true});
 await page.screenshot({path:'test-artifacts/task-tabs-mobile.png'});
 const direct=await browser.newPage({viewport:{width:390,height:844}});direct.on('pageerror',e=>errors.push(e.message));
 await direct.goto(origin+'/testing/mobile-tree-checker.html#digging',{waitUntil:'domcontentloaded'});
 await direct.waitForSelector('#stepContinueWork');await direct.click('#stepContinueWork');
 await direct.waitForSelector('#screenNow:not([disabled])');await direct.waitForSelector('#diggingFields:not([hidden])');
 eq(await direct.getAttribute('#diggingTab','aria-selected'),'true');eq(await direct.inputValue('#scWork'),'root');
 eq(await direct.locator('#scLimb').isDisabled(),true);
 await direct.click('#treeWorkTab');await direct.selectOption('#scWork','pruning');
 eq(await direct.locator('#scLimb').isEnabled(),true,'Initial deep link must not strand the pruning field disabled');
 await direct.close();
 assert.deepEqual(errors,[]);assertions++;
 console.log('TASK_TABS_PASS',JSON.stringify({assertions,sharedMapAndAnswers:true,diggingDirectLink:true,keyboardNavigation:true,staleResultsInvalidated:true,controlledGIS:true,physicalIPhone:false,noEmailSent:true}));
}finally{await browser.close();}
