import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {execSync} from 'node:child_process';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const files=['mobile-tree-brief-email.mjs','mobile-tree-result-workflow.mjs'];
const expected=await Promise.all(files.map(n=>readFile('public/testing/'+n,'utf8')));
let ready=false;
for(let i=0;i<45;i++){
 try{const actual=await Promise.all(files.map(async n=>{const r=await fetch(origin+'/testing/'+n,{cache:'no-store',signal:AbortSignal.timeout(10000)});return r.ok?r.text():'';}));if(actual.every((s,i)=>s===expected[i])){ready=true;break;}}catch{}
 await new Promise(r=>setTimeout(r,4000));
}
assert.ok(ready,'Exact brief-email build must be deployed');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
const checks=[],errors=[];const check=(name,ok)=>{checks.push({name,pass:!!ok});assert.ok(ok,name);};
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/testing/mobile-tree-checker.html#digging',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#stepContinueWork');await page.click('#stepContinueWork');
 await page.waitForSelector('#permitForm[data-quick-digging="yes"][data-resident-workflow]');await page.waitForSelector('#propertyMapAddress',{state:'attached'});await page.waitForTimeout(250);
 const set=values=>page.evaluate(vs=>{for(const [id,v] of Object.entries(vs)){const n=document.getElementById(id);if(!n)throw Error(id);if(n.type==='checkbox')n.checked=v;else n.value=String(v);n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));}},values);
 const run=async()=>{await page.click('#screenNow');await page.waitForSelector('#permitOutput:not(.hidden)');await page.waitForTimeout(230);};
 const draft=async()=>{await page.click('#reviewForestryEmail');await page.waitForSelector('#draftArea:not(.hidden)');await page.waitForFunction(()=>document.getElementById('emailBody').dataset.format==='brief-0.8.0');await page.waitForTimeout(80);return page.inputValue('#emailBody');};
 // Set a controlled email address without dispatching a synthetic GIS-selection event.
 await page.evaluate(()=>{document.getElementById('propertyAddress').value='Example property';});
 await set({contactName:'Example Contractor',phone:'555-0100',email:'example@example.invalid'});
 await set({scCity:'inside',scLocation:'row',scHistoric:'no',scWork:'root',scSpecies:'liveoak',scDbh:'24',udcZoning:'unknown',udcOverlay:'none',udcPlan:'unknown',udcDevelopment:'no',digPurpose:'utility',digArea:'row',digFeet:'10',digDepth:'24',digWidth:'2',digLength:'20',digMeasured:'measured',digMethod:'machinery',digHandling:'cut',digStage:'not-started',digOtherTrees:'no',digStorage:'no',digArborist:'Example Arborist',digCredential:'TEST-NOT-VERIFIED',dig811:'pending'});
 await run();let body=await draft();const record=await page.inputValue('#screeningRecord');const words=body.split(/\s+/).length;
 await mkdir('test-artifacts',{recursive:true});await writeFile('test-artifacts/example-brief-email.txt',body);await writeFile('test-artifacts/full-screening-record.txt',record);
 console.log('BRIEF_RECORD_DIAGNOSTIC',JSON.stringify({words,recordWords:record.split(/\s+/).length,quick:record.includes('QUICK CHECK'),policy:record.includes('§65-8'),method:record.includes('CUT_THROUGH_PROPOSED'),notes:(await page.textContent('#permitNotes')).slice(-1600),errors}));
 check('Brief draft under 230 words with supplied optional facts',words<230);
 check('Internal report not appended',!['QUICK CHECK','REFERENCES','SCREENING SUMMARY','CUT_THROUGH_PROPOSED','§65'].some(x=>body.includes(x)));
 check('Complete record kept separately',['QUICK CHECK','§65-8','CUT_THROUGH_PROPOSED'].every(x=>record.includes(x)));
 check('Key project facts retained',['24 inches','10 feet','depth 24 inches','width 2 feet','length near the tree 20 feet','cuts through roots','public street right-of-way'].every(x=>body.includes(x)));
 check('Credential not misrepresented',body.includes('TEST-NOT-VERIFIED (not verified'));
 check('Mailto matches short draft',await page.evaluate(()=>decodeURIComponent(document.getElementById('openEmail').href.split('&body=')[1]))===body);
 await page.fill('#emailBody',body+'\nPlease call after lunch.');body=await draft();check('Reopening preserves edits',body.endsWith('Please call after lunch.'));
 await page.click('#step-work');await page.fill('#digFeet','11');check('Fact change invalidates draft',!(await page.locator('#draftArea').isVisible()));
 await run();body=await draft();check('Rebuilt draft uses current distance',body.includes('11 feet')&&!body.includes('10 feet'));
 await set({digStage:'damaged'});await run();body=await draft();check('Damage in subject',(await page.inputValue('#emailSubject')).includes('Root damage reported'));check('Damage facts visible',body.includes('Roots have reportedly been cut or torn.'));
 await set({digTarget:'other',digOtherDbh:'30'});await run();body=await draft();check('Different tree has no invented ownership',body.includes('different tree')&&!body.includes('Tree location: public'));check('Correct affected-tree diameter',body.includes('30 inches')&&!body.includes('trunk width 24'));
 await page.click('#treeWorkTab');await set({scWork:'pruning',scLimb:'7',digAlso:false});await run();body=await draft();
 check('Pruning draft remains short',body.split(/\s+/).length<200);check('Branch diameter retained',body.includes('Largest branch proposed for cutting: 7 inches'));check('Prior digging facts omitted',!body.includes('Nearest digging edge')&&!body.includes('Roots have reportedly'));
 await set({species:'Different species',work:'removal',dbh:'12',location:'Private property — reported, not verified',scope:'Please check the tree beside the rear fence.'});
 await page.evaluate(()=>document.getElementById('workForm').requestSubmit(document.getElementById('prepare')));await page.waitForTimeout(150);body=await page.inputValue('#emailBody');
 check('Unlinked draft uses only email-form facts',body.includes('Different species')&&body.includes('12 inches')&&!body.includes('7 inches')&&!body.includes('Nearest digging'));
 check('User work notes retained',body.includes('Please check the tree beside the rear fence.'));check('No invented attachments',!body.includes('attached'));
 for(const width of [320,390,820,1200]){await page.setViewportSize({width,height:900});check('No horizontal overflow '+width,await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2));}
 await page.setViewportSize({width:390,height:844});await page.locator('#emailCard').screenshot({path:'test-artifacts/brief-email-mobile.png'});
 check('No page errors',!errors.length);
 const result={assertions:checks.length,checks,exampleWords:words,fullRecordWords:record.split(/\s+/).length,controlledSiteFacts:true,physicalIPhone:false,noEmailSent:true};
 await writeFile('test-artifacts/brief-email-browser.json',JSON.stringify(result,null,2));
 console.log('BRIEF_EMAIL_BROWSER_PASS',JSON.stringify({...result,checks:undefined}));
}finally{await browser.close();}
