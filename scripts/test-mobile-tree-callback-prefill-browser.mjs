import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {execSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {CALLBACK_INTAKE_URL} from '../public/testing/mobile-tree-callback-prefill.mjs';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const files=['mobile-tree-callback-prefill.mjs','mobile-tree-final-result.mjs'];
const expected=await Promise.all(files.map(f=>readFile('public/testing/'+f,'utf8')));
let ready=false;
for(let attempt=0;attempt<45;attempt++){
 try{
  const actual=await Promise.all(files.map(async f=>{const r=await fetch(origin+'/testing/'+f,{cache:'no-store',signal:AbortSignal.timeout(10000)});return r.ok?r.text():'';}));
  if(actual.every((s,i)=>s===expected[i])){ready=true;break;}
 }catch{}
 await new Promise(r=>setTimeout(r,5000));
}
assert.ok(ready,'Exact property-prefill build must be deployed');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
const checks=[],errors=[],unexpected=[];
const check=(name,condition)=>{checks.push({name,pass:!!condition});assert.ok(condition,name);};
let page;
try{
 const context=await browser.newContext({viewport:{width:390,height:844}});
 await context.route('**/*',route=>{
  const r=route.request();
  if(/submit\.jotform|\/submissions(?:[/?]|$)/i.test(r.url())){unexpected.push('Submission endpoint requested');return route.abort();}
  return route.continue();
 });
 page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 let jotformRequests=0;context.on('request',r=>{if(new URL(r.url()).hostname==='form.jotform.com')jotformRequests++;});
 await page.goto(origin+'/testing/mobile-tree-checker.html',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#arboristCallbackPanel[data-property-prefill]',{state:'attached'});
 await page.fill('#propertyMapAddress','TEST PROPERTY — NOT A CLIENT ADDRESS');
 await page.click('#stepContinueWork');
 const set=values=>page.evaluate(values=>{for(const [id,value] of Object.entries(values)){const n=document.getElementById(id);if(n.type==='checkbox')n.checked=value;else n.value=value;n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));}},values);
 await set({scCity:'inside',scLocation:'private',scHistoric:'no',scProperty:'developed',scWork:'pruning',scSpecies:'liveoak',scDbh:'24',scLimb:'2',udcZoning:'r1r2',udcOverlay:'none',udcPlan:'no',udcDevelopment:'no',rowGroundWork:'no'});
 const run=async()=>{await page.click('#screenNow');await page.waitForSelector('#contactNextSteps:not([hidden])');await page.click('#requestArboristCallback');};
 await run();
 let href=await page.getAttribute('#openArboristRequest','href'),u=new URL(href);
 check('Entered address is included',u.searchParams.get('propertyAddress[addr_line1]')==='TEST PROPERTY — NOT A CLIENT ADDRESS');
 check('Reported residential use carries over',u.searchParams.get('propertyType')==='Residential');
 check('No external form request before continuing',jotformRequests===0);
 check('Prefill sharing is disclosed',(await page.textContent('#arboristCallbackPanel')).includes('prefilled link'));
 check('Summary transfer is still explicitly manual',(await page.textContent('#arboristCallbackPanel')).includes('copy the summary'));
 check('Blank intake remains available',await page.getAttribute('#openBlankArboristRequest','href')===CALLBACK_INTAKE_URL);
 const popupPromise=context.waitForEvent('page');await page.click('#openArboristRequest');
 const popup=await popupPromise;
 // Defensive endpoint blocking above; this test never submits the live intake.
 await popup.waitForSelector('#input_28_addr_line1');
 await popup.waitForFunction(()=>document.getElementById('input_28_addr_line1').value==='TEST PROPERTY — NOT A CLIENT ADDRESS'&&document.getElementById('input_2').value==='Residential');
 check('Actual Jotform address is prefilled',await popup.inputValue('#input_28_addr_line1')==='TEST PROPERTY — NOT A CLIENT ADDRESS');
 check('Actual Jotform property type is prefilled',await popup.inputValue('#input_2')==='Residential');
 await popup.fill('#input_28_addr_line1','EDITED TEST ADDRESS');await popup.selectOption('#input_2','Commercial');
 check('Both prefilled fields remain editable',(await popup.inputValue('#input_28_addr_line1'))==='EDITED TEST ADDRESS'&&(await popup.inputValue('#input_2'))==='Commercial');
 await popup.close();
 // Controlled City-record fixture: it is not a real parcel or live GIS result.
 await page.click('#step-work');await set({scProperty:'unknown'});
 await page.evaluate(()=>Object.assign(document.getElementById('permitForm').dataset,{parcelTaxClass:'commercial',propertyRecords:'ready'}));
 await run();href=await page.getAttribute('#openArboristRequest','href');
 check('City Commercial finding carries despite R-1/R-2 zoning',new URL(href).searchParams.get('propertyType')==='Commercial');
 const commercial=await context.newPage();await commercial.goto(href,{waitUntil:'domcontentloaded'});await commercial.waitForFunction(()=>document.getElementById('input_2')?.value==='Commercial');
 check('Commercial prefill also works in actual Jotform',await commercial.inputValue('#input_2')==='Commercial');await commercial.close();
 await page.click('#step-work');await set({scProperty:'developed'});await run();
 check('Conflicting reported use is not silently classified',!new URL(await page.getAttribute('#openArboristRequest','href')).searchParams.has('propertyType'));
 check('Conflict reason is shown',(await page.textContent('#callbackPropertyPrefill')).includes('differ'));
 await page.click('#step-property');await page.fill('#propertyMapAddress','SECOND TEST PROPERTY');
 check('Changed address removes old prefill link',await page.getAttribute('#openArboristRequest','href')===CALLBACK_INTAKE_URL);
 check('Changed address hides stale handoff',!(await page.locator('#arboristCallbackPanel').isVisible()));
 await page.click('#stepContinueWork');await set({scCity:'inside',scLocation:'private',scProperty:'commercial'});await run();
 u=new URL(await page.getAttribute('#openArboristRequest','href'));
 check('Fresh address replaces previous property',u.searchParams.get('propertyAddress[addr_line1]')==='SECOND TEST PROPERTY');
 check('No unexpected personal/contact fields in the link',[...u.searchParams.keys()].every(k=>['propertyAddress[addr_line1]','propertyType'].includes(k)));
 for(const width of [320,390,820,1200]){await page.setViewportSize({width,height:900});check('No horizontal overflow '+width,await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2));}
 check('No JavaScript errors in checker',errors.length===0);check('No submission endpoint called',unexpected.length===0);
 await mkdir('test-artifacts/callback-prefill',{recursive:true});
 await page.setViewportSize({width:390,height:844});await page.locator('#arboristCallbackPanel').screenshot({path:'test-artifacts/callback-prefill/mobile.png'});
 const result={checks,errors,unexpected,realJotformPrefillVerified:true,controlledPropertyFacts:true,noSubmission:true,physicalIPhone:false};
 await writeFile('test-artifacts/callback-prefill/results.json',JSON.stringify(result,null,2));
 console.log('CALLBACK_PREFILL_PASS',JSON.stringify({...result,checks:checks.length}));
}catch(e){if(page){await mkdir('test-artifacts/callback-prefill',{recursive:true});await page.screenshot({path:'test-artifacts/callback-prefill/failure.png',fullPage:true}).catch(()=>{});}throw e;}finally{await browser.close();}
