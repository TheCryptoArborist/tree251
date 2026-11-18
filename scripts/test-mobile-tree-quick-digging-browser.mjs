import assert from 'node:assert/strict';
import {execSync} from 'node:child_process';
import {mkdir,readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const paths=['public/testing/mobile-tree-quick-digging.mjs','public/testing/mobile-tree-worker-qualifications.mjs'];
const expected=await Promise.all(paths.map(p=>readFile(p,'utf8')));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let ready=false;
for(let i=0;i<45;i++){
 try{const actual=await Promise.all(paths.map(async p=>{const r=await fetch(origin+'/'+p.replace(/^public\//,''),{cache:'no-store',signal:AbortSignal.timeout(15000)});return r.ok?r.text():'';}));if(actual.every((s,i)=>s===expected[i])){ready=true;break;}}catch{}
 await sleep(5000);
}
assert.ok(ready,'Exact short-check source has not reached existing preview');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
let assertions=0;const eq=(a,b,m)=>{assert.equal(a,b,m);assertions++;};const matches=(s,re)=>{assert.match(s,re);assertions++;};let page;
try{
 page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/testing/mobile-tree-checker.html#digging',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#permitForm[data-quick-digging="yes"]');await page.waitForTimeout(300);
 const set=async values=>page.evaluate(values=>{for(const [id,value] of Object.entries(values)){const n=document.getElementById(id);if(!n)throw Error('Missing '+id);if(n.type==='checkbox')n.checked=value;else n.value=String(value);n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));}},values);
 const run=async()=>{await page.click('#screenNow');await page.waitForSelector('#diggingResult[data-quick-version="0.7.0"]:not([hidden])');await page.waitForTimeout(230);};
 eq(await page.locator('#digQuickCore input:visible,#digQuickCore select:visible').count(),5,'Five core controls visible, not a 20-field work plan');
 for(const id of ['scLocation','digPurpose','scDbh','digFeet','digStage'])eq(await page.locator('#'+id).isVisible(),true,id+' visible');
 for(const id of ['scProperty','scSpecies','udcPlan','digDepth','digWidth','digLength','digArborist','digCredential','dig811'])eq(await page.locator('#'+id).isVisible(),false,id+' deferred');
 matches(await page.textContent('#screenNow'),/Check whether tree review is needed/);
 await mkdir('test-artifacts/screenshots',{recursive:true});
 await page.locator('#diggingFields').screenshot({path:'test-artifacts/screenshots/quick-digging-form-mobile.png'});
 // Immediate warning must not depend on dimensions or clicking submit.
 await page.selectOption('#digStage','damaged');
 eq(await page.locator('#digQuickImmediate').isVisible(),true);
 matches(await page.textContent('#digQuickImmediate'),/Pause excavation/);
 eq(await page.inputValue('#scDbh'),'');eq(await page.inputValue('#digFeet'),'');
 await set({scCity:'inside',scLocation:'row',scHistoric:'no',digPurpose:'utility'});await run();
 eq(await page.getAttribute('#diggingResult','data-outcome'),'DAMAGE_REPORTED');
 // Five practical answers suffice for a first concern finding. Other answers remain unknown.
 await page.selectOption('#digStage','not-started');await page.fill('#scDbh','24');await page.fill('#digFeet','10');await run();
 eq(await page.getAttribute('#diggingResult','data-outcome'),'CLOSE_EXCAVATION');
 eq(await page.locator('#digQuickResultRows>div').count(),3);
 matches(await page.textContent('#digQuickResultRows'),/24-inch.*10 feet/s);
 matches(await page.textContent('#digQuickResultRows'),/Urban Forestry/);
 eq(await page.inputValue('#digMethod'),'unknown');eq(await page.inputValue('#digHandling'),'unknown');
 matches(await page.inputValue('#screeningRecord'),/QUICK CHECK/);
 await page.locator('#diggingResult').screenshot({path:'test-artifacts/screenshots/quick-digging-result-mobile.png'});
 await page.click('#digQuickPrepare');eq(await page.locator('#digMethod').isVisible(),true);
 await page.selectOption('#digMethod','machinery');await page.selectOption('#digHandling','cut');await page.fill('#digDepth','24');await page.fill('#digWidth','2');
 eq(await page.locator('#permitOutput').isVisible(),false,'Adding optional details invalidates previous finding');
 await run();await page.click('#reviewForestryEmail');await page.waitForSelector('#draftArea:not(.hidden)');
 matches(await page.inputValue('#emailBody'),/Depth \(in\): 24/);matches(await page.inputValue('#emailBody'),/QUICK CHECK/);
 await page.fill('#digFeet','40');eq(await page.locator('#draftArea').isVisible(),false);
 await run();eq(await page.getAttribute('#diggingResult','data-outcome'),'OUTSIDE_SCREENING_RANGE');matches(await page.textContent('#digQuickResultRows'),/does not clear/);
 // Private unknown property requires facts, not a fabricated residential exemption or mandatory email.
 await page.selectOption('#scLocation','private');await run();
 matches(await page.textContent('#digQuickResultRows'),/City requirements are not yet determined/);
 matches(await page.textContent('#forestryEmailCTA'),/email is optional/);
 const pendingRecord=await page.inputValue('#screeningRecord');
 matches(pendingRecord,/CITY STATUS UNRESOLVED/);
 eq(pendingRecord.includes('Send the proposed excavation and root-handling plan to Urban Forestry'),false);
 await page.click('#digQuickConfirm');eq(await page.locator('#scProperty').isVisible(),true);
 await set({scProperty:'developed',udcZoning:'r1r2',udcOverlay:'none',udcPlan:'no',digOtherTrees:'no'});await run();
 eq(await page.getAttribute('#diggingResult','data-scope'),'residential-exception');
 matches(await page.textContent('#digQuickResultRows'),/application exception/);
 // Switching task must keep the same nodes/values and restore the original tree-work form.
 await page.click('#treeWorkTab');eq(await page.locator('#digQuickCore').isVisible(),false);
 eq(await page.locator('#scProperty').isVisible(),true);eq(await page.locator('#scSpecies').isVisible(),true);
 eq(await page.inputValue('#scDbh'),'24');eq(await page.inputValue('#digFeet'),'40');
 await page.selectOption('#scWork','pruning');await page.fill('#scLimb','2');await page.click('#screenNow');
 await page.waitForSelector('#simplePermitAnswer[data-outcome="residential-no-permit"]');
 await page.click('#diggingTab');eq(await page.inputValue('#scDbh'),'24');eq(await page.inputValue('#digDepth'),'24');
 await page.fill('#digFeet','');await page.fill('#scDbh','');await run();
 eq(await page.getAttribute('#diggingResult','data-outcome'),'MEASUREMENTS_NEEDED');
 await page.fill('#scDbh','24');await page.fill('#digFeet','10');
 await page.locator('#digQuickTrunkDetails summary').click();await page.selectOption('#digComplex','yes');await run();
 eq(await page.getAttribute('#diggingResult','data-outcome'),'MEASUREMENTS_NEEDED');
 const ids=await page.locator('[id]').evaluateAll(ns=>ns.map(n=>n.id));eq(new Set(ids).size,ids.length,'No duplicated controls');
 for(const width of [320,390,820,1200]){await page.setViewportSize({width,height:900});eq(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2),true,'No horizontal overflow '+width);}
 await page.fill('#propertyMapAddress','Different address');eq(await page.inputValue('#digFeet'),'');eq(await page.locator('#diggingResult').isVisible(),false);
 assert.deepEqual(errors,[]);assertions++;
 console.log('QUICK_DIGGING_BROWSER_PASS',JSON.stringify({assertions,fiveCoreQuestions:true,immediateDamageWarning:true,unknownNotNo:true,optionalDetailHandoff:true,phoneViewport:true,physicalIPhone:false,controlledLocationFacts:true,noEmailSent:true}));
}catch(e){if(page){await mkdir('test-artifacts/screenshots',{recursive:true});await page.screenshot({path:'test-artifacts/screenshots/quick-digging-failure.png',fullPage:true}).catch(()=>{});}throw e;}finally{await browser.close();}
