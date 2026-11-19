import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {execSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {CALLBACK_FORM_URL,CONTACT_PATHS_VERSION} from '../public/testing/mobile-tree-contact-paths.mjs';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const files=['mobile-tree-contact-paths.mjs','mobile-tree-final-result.mjs'];
const expected=await Promise.all(files.map(n=>readFile('public/testing/'+n,'utf8')));
let ready=false;
for(let i=0;i<45;i++){
 try{
  const actual=await Promise.all(files.map(async n=>{const r=await fetch(origin+'/testing/'+n,{cache:'no-store',signal:AbortSignal.timeout(10000)});return r.ok?r.text():'';}));
  if(actual.every((s,i)=>s===expected[i])){ready=true;break;}
 }catch{}
 await new Promise(r=>setTimeout(r,5000));
}
assert.ok(ready,'Exact contact-handoff build has not reached the preview');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
const checks=[],errors=[],externalContacts=[];
const check=(name,condition)=>{checks.push({name,pass:!!condition});assert.ok(condition,name);};
let page;
try{
 page=await browser.newPage({viewport:{width:390,height:844}});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(/jotform\.com|mailto:/i.test(r.url()))externalContacts.push(r.url());});
 await page.goto(origin+'/testing/mobile-tree-checker.html#digging',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#contactNextSteps',{state:'attached'});
 check('Contact options hidden before screening',!(await page.locator('#contactNextSteps').isVisible()));
 await page.waitForSelector('#stepContinueWork');await page.click('#stepContinueWork');
 const set=values=>page.evaluate(values=>{for(const [id,value] of Object.entries(values)){const n=document.getElementById(id);if(!n)throw Error('Missing '+id);if(n.type==='checkbox')n.checked=value;else n.value=String(value);n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));}},values);
 // Controlled reported facts, not a GIS lookup or survey verification.
 await set({scCity:'inside',scLocation:'row',scHistoric:'no',scDbh:'24',digFeet:'6',digPurpose:'utility',digArea:'row',digStage:'not-started',digHandling:'stop'});
 const run=async()=>{await page.click('#screenNow');await page.waitForSelector('#contactNextSteps:not([hidden])');};
 await run();
 check('Arborist option visible',await page.locator('#requestArboristCallback').isVisible());
 check('Direct City path is not gated by contact information',await page.locator('#reviewForestryEmail').isVisible());
 check('Forestry button not cloned',await page.locator('#reviewForestryEmail').count()===1);
 await page.click('#preparePlanningInquiry');
 check('Planning To and Forestry Cc shown',(await page.textContent('#cityInquiryRecipients'))==='To: planning@cityofmobile.gov · Cc: forestry@cityofmobile.gov');
 check('Planning asks for latest approved plans and revisions',(await page.inputValue('#cityInquiryBody')).includes('subsequent revisions'));
 check('Missing address has editable placeholder',(await page.inputValue('#cityInquirySubject')).includes('[Property address]'));
 await page.fill('#cityInquiryBody','My edited planning question.');
 let href=await page.getAttribute('#openCityInquiry','href');
 check('Planning mailto addresses match displayed recipients',href.startsWith('mailto:planning@cityofmobile.gov?cc=forestry%40cityofmobile.gov'));
 await page.click('#prepareLandInquiry');
 check('Land-disturbance inquiry routed independently',(await page.textContent('#cityInquiryRecipients'))==='To: land.disturbance@cityofmobile.gov');
 check('Groundwork location carried from existing question',(await page.inputValue('#cityInquiryBody')).includes('right-of-way'));
 check('Unreported disturbed area not invented',!(await page.inputValue('#cityInquiryBody')).includes('square feet'));
 await page.click('#preparePlanningInquiry');
 check('Switching departments preserves unsent edits',(await page.inputValue('#cityInquiryBody'))==='My edited planning question.');
 await page.fill('#cityInquiryBody','X'.repeat(2400));
 check('Long mailto is disabled rather than truncated',!(await page.getAttribute('#openCityInquiry','href'))&&(await page.getAttribute('#openCityInquiry','aria-disabled'))==='true');
 await page.click('#requestArboristCallback');
 check('Callback context includes dimensions',(await page.inputValue('#callbackScreeningSummary')).includes('Reported trunk diameter, inches: 24'));
 check('Jotform opens the existing intake without personal URL data',(await page.getAttribute('#openArboristRequest','href'))===CALLBACK_FORM_URL);
 check('Manual context sharing is disclosed',(await page.textContent('#arboristCallbackPanel')).includes('not sent automatically'));
 check('No Jotform or mail request from screening or draft preparation',externalContacts.length===0);
 await page.click('#step-work');await page.fill('#digFeet','7');
 check('Edited answers invalidate old contact drafts',!(await page.locator('#contactNextSteps').isVisible()));
 check('Old mailto removed',!(await page.getAttribute('#openCityInquiry','href')));
 await run();await page.click('#preparePlanningInquiry');
 check('New screening does not reuse the old edited draft',!(await page.inputValue('#cityInquiryBody')).includes('My edited planning question.'));
 await page.click('#reviewForestryEmail');await page.waitForSelector('#draftArea:not(.hidden)');
 check('Original Forestry draft route still works',(await page.getAttribute('#openEmail','href')).startsWith('mailto:forestry@cityofmobile.gov'));
 // Re-screen before the next task; this also verifies the shared form survives.
 await page.click('#treeWorkTab');
 await set({scWork:'pruning',scCity:'inside',scLocation:'private',scProperty:'developed',scHistoric:'no',udcZoning:'r1r2',udcOverlay:'none',udcPlan:'no',udcDevelopment:'no',rowGroundWork:'no',digAlso:false,scLimb:'2'});
 await run();
 check('No-permit visitor can still request optional advice',await page.locator('#requestArboristCallback').isVisible());
 check('Private consulting explicitly optional',(await page.textContent('.arborist-path')).includes('Private consulting is optional'));
 for(const width of [320,390,820,1200]){await page.setViewportSize({width,height:900});check('No horizontal overflow at '+width,await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2));}
 const ids=await page.locator('[id]').evaluateAll(ns=>ns.map(n=>n.id));check('No duplicate controls',new Set(ids).size===ids.length);
 check('No JavaScript errors',errors.length===0);
 await mkdir('test-artifacts/screenshots',{recursive:true});
 await page.setViewportSize({width:390,height:844});await page.locator('#contactNextSteps').screenshot({path:'test-artifacts/screenshots/contact-paths-mobile.png'});
 await page.setViewportSize({width:1200,height:900});await page.locator('#contactNextSteps').screenshot({path:'test-artifacts/screenshots/contact-paths-desktop.png'});
 const result={version:CONTACT_PATHS_VERSION,checks,errors,externalContacts,hostedPreview:true,controlledReportedFacts:true,physicalIPhone:false,noEmailSent:true,noJotformSubmission:true};
 await writeFile('test-artifacts/contact-paths.json',JSON.stringify(result,null,2));
 console.log('CONTACT_PATHS_BROWSER_PASS',JSON.stringify({...result,checks:checks.length}));
}catch(e){if(page){await mkdir('test-artifacts/screenshots',{recursive:true});await page.screenshot({path:'test-artifacts/screenshots/contact-paths-failure.png',fullPage:true}).catch(()=>{});}throw e;}finally{await browser.close();}
