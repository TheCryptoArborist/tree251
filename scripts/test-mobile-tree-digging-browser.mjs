import assert from 'node:assert/strict';
import {execSync} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ready=false;
for(let i=0;i<45;i++){
 try{
  const [ui,loader]=await Promise.all(['mobile-tree-digging-ui.mjs','mobile-tree-worker-qualifications.mjs'].map(async name=>{
   const r=await fetch(origin+'/testing/'+name,{cache:'no-store',signal:AbortSignal.timeout(12000)});return r.ok?r.text():'';
  }));
  if(ui.includes('win.queueMicrotask(()=>render(token))')&&loader.includes('installDigging(document)')){ready=true;break;}
 }catch{}
 await sleep(6000);
}
assert.ok(ready,'Digging build has not reached the existing preview');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
let assertions=0;const eq=(a,b,msg)=>{assert.equal(a,b,msg);assertions++;};const matches=(s,re)=>{assert.match(s,re);assertions++;};
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/testing/mobile-tree-checker.html',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#stepContinueWork');await page.click('#stepContinueWork');
 await page.waitForSelector('#permitForm[data-digging-version="0.5.0"]');
 // Known manual location fixtures exercise the actual hosted UI. These are
 // not new GIS, ownership, contractor or regulatory-acceptance verifications.
 const set=async values=>page.evaluate(values=>{
  for(const [id,value] of Object.entries(values)){
   const n=document.getElementById(id);if(!n)throw Error('Missing '+id);
   if(n.type==='checkbox')n.checked=value;else n.value=String(value);
   n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));
  }
 },values);
 const run=async()=>{await page.click('#screenNow');await page.waitForSelector('#permitOutput:not(.hidden)');await page.waitForSelector('#diggingResult:not([hidden])');await page.waitForTimeout(180);};
 eq(await page.locator('#diggingFields').isVisible(),false);
 eq(await page.locator('#digFeet').isDisabled(),true);
 matches(await page.locator('#scWork option[value="root"]').textContent(),/Dig, install utilities/);
 await set({scCity:'inside',scLocation:'row',scProperty:'unknown',scHistoric:'no',scWork:'root',scSpecies:'liveoak',scDbh:'24',udcZoning:'unknown',udcOverlay:'none',udcPlan:'unknown',udcDevelopment:'no'});
 await page.waitForSelector('#diggingFields:not([hidden])');
 eq(await page.locator('#digFeet').isEnabled(),true);
 await set({digPurpose:'utility',digArea:'row',digFeet:'10',digDepth:'24',digWidth:'2',digLength:'20',digMeasured:'measured',digMethod:'machinery',digHandling:'cut',digStage:'not-started',digOtherTrees:'no',digStorage:'no',digArborist:'Example Reviewer',digCredential:'TEST-NOT-VERIFIED',dig811:'pending'});
 await run();
 eq(await page.getAttribute('#diggingResult','data-outcome'),'CLOSE_EXCAVATION');
 matches(await page.textContent('#diggingResult'),/12–36 feet/);
 matches(await page.textContent('#diggingResult'),/ISA Certified Arborist/);
 matches(await page.textContent('#diggingResult'),/Alabama 811/);
 matches(await page.textContent('#diggingResult'),/not a finding that a violation/);
 matches(await page.inputValue('#screeningRecord'),/Nearest excavation distance \(ft\): 10/);
 matches(await page.inputValue('#screeningRecord'),/Depth \(in\): 24/);
 matches(await page.inputValue('#screeningRecord'),/NOT been verified/);
 await page.click('#reviewForestryEmail');await page.waitForSelector('#draftArea:not(.hidden)');
 const body=await page.inputValue('#emailBody');
 for(const re of [/digging \/ utility work near a tree/i,/Nearest digging edge: 10 feet/,/width 2 feet/,/length near the tree 20 feet/,/cuts through roots as digging proceeds/,/Please advise what root-protection measures/,/TEST-NOT-VERIFIED/])matches(body,re);
 await page.fill('#digFeet','40');
 eq(await page.locator('#permitOutput').isVisible(),false);eq(await page.locator('#draftArea').isVisible(),false);
 await set({digMethod:'boring',digHandling:'expose'});await run();
 eq(await page.getAttribute('#diggingResult','data-outcome'),'OUTSIDE_SCREENING_RANGE');
 matches(await page.textContent('#diggingResult'),/not cleared|not a safe|not cleared|not.*clear|not a surveyed|not an automatic exemption/i);
 matches(await page.textContent('#diggingResult'),/entered name, or certification number is not verified/);
 await set({digStage:'damaged'});await run();eq(await page.getAttribute('#diggingResult','data-outcome'),'DAMAGE_REPORTED');
 await set({digStage:'not-started',scDbh:'',digFeet:''});await run();eq(await page.getAttribute('#diggingResult','data-outcome'),'MEASUREMENTS_NEEDED');
 await set({scDbh:'24',digFeet:'0'});await run();eq(await page.getAttribute('#diggingResult','data-outcome'),'CLOSE_EXCAVATION');
 await set({scLocation:'private',scProperty:'developed',udcZoning:'r1r2',udcOverlay:'none',udcPlan:'no',digArea:'private',digFeet:'10',digHandling:'stop',digMethod:'hand'});await run();
 eq(await page.getAttribute('#diggingResult','data-scope'),'covered');
 matches(await page.textContent('#diggingResult'),/citywide/);
 matches(await page.textContent('#forestryEmailCTA'),/Optional: Ask/);
 await page.click('#reviewForestryEmail');await page.waitForSelector('#draftArea:not(.hidden)');
 const homeBody=await page.inputValue('#emailBody');matches(homeBody,/digging \/ utility/i);
 eq(homeBody.includes('[Requested records and project review]'),false,'Citywide root protection is not an automatic staff-plan request');
 await set({scWork:'pruning',digAlso:true,scLimb:'2'});await run();
 eq(await page.getAttribute('#simplePermitAnswer','data-outcome'),'tree-permit-with-root-advice');
 matches(await page.textContent('#simplePermitAnswer'),/digging needs a separate check/);
 // New inputs invalidate summaries just like the original questionnaire.
 await page.selectOption('#digHandling','cut');eq(await page.locator('#permitOutput').isVisible(),false);
 await run();await page.uncheck('#digAlso');
 eq(await page.locator('#diggingFields').isVisible(),false);eq(await page.locator('#digFeet').isDisabled(),true);
 await page.click('#screenNow');await page.waitForSelector('#simplePermitAnswer[data-outcome="residential-no-permit"]');
 eq(await page.locator('#diggingResult').isVisible(),false);
 // Every tree-work route can expose the companion question without clearing
 // the original selected activity; planting has independent Engineering checks.
 await set({scWork:'planting',digAlso:true,digTarget:'other',digOtherDbh:'30'});await run();
 eq(await page.inputValue('#scWork'),'planting');eq(await page.getAttribute('#diggingResult','data-scope'),'unresolved');
 matches(await page.textContent('#diggingResult'),/another or unidentified tree/);
 for(const width of [320,390,820,1200]){
  await page.setViewportSize({width,height:900});eq(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2),true,'No horizontal overflow at '+width);
 }
 await page.setViewportSize({width:390,height:844});
 await mkdir('test-artifacts',{recursive:true});
 await page.locator('#diggingResult').screenshot({path:'test-artifacts/digging-mobile-result.png'});
 await page.fill('#propertyMapAddress','A different property');
 eq(await page.inputValue('#digFeet'),'');eq(await page.locator('#diggingResult').isVisible(),false);
 eq(await page.locator('#draftArea').isVisible(),false);
 assert.deepEqual(errors,[]);assertions++;
 console.log('DIGGING_BROWSER_PASS',JSON.stringify({assertions,phoneViewport:true,controlledSiteFacts:true,rootEmailAndRecord:true,rootsNeverAuthorized:true,physicalIPhone:false,noEmailSent:true,pageErrors:errors}));
}finally{await browser.close();}
