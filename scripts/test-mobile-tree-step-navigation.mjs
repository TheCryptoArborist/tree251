import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {execSync} from 'node:child_process';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const expected=await Promise.all(['mobile-tree-step-navigation.mjs','mobile-tree-worker-qualifications.mjs','mobile-tree-quick-digging.mjs'].map(s=>readFile('public/testing/'+s,'utf8')));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let ready=false;
for(let i=0;i<45;i++){
 try{
  const actual=await Promise.all(['mobile-tree-step-navigation.mjs','mobile-tree-worker-qualifications.mjs','mobile-tree-quick-digging.mjs'].map(async s=>{
   const r=await fetch(origin+'/testing/'+s,{cache:'no-store',signal:AbortSignal.timeout(10000)});
   return r.ok?r.text():'';
  }));
  if(actual.every((s,i)=>s===expected[i])){ready=true;break;}
 }catch{}
 await sleep(4000);
}
assert.ok(ready,'The exact stage-navigation build has not reached the preview');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
let assertions=0;const eq=(a,b,m)=>{assert.equal(a,b,m);assertions++};
const match=(s,re,m)=>{assert.match(s,re,m);assertions++};
const errors=[];
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 page.on('pageerror',e=>errors.push(e.message));
 const set=async v=>page.evaluate(entries=>{
  for(const [id,value] of Object.entries(entries)){
   const el=document.getElementById(id);
   if(!el)throw Error('Missing '+id);
   if(el.type==='checkbox')el.checked=value;else el.value=String(value);
   el.dispatchEvent(new Event('input',{bubbles:true}));
   el.dispatchEvent(new Event('change',{bubbles:true}));
  }
 },v);
 await page.goto(origin+'/testing/mobile-tree-checker.html#digging',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#treeStepNavigation');
 await page.waitForFunction(()=>!document.getElementById('screenNow')?.disabled);
 eq(await page.getAttribute('#diggingTab','aria-selected'),'true');
 eq(await page.getAttribute('#treeTaskTabs','data-active-step'),'property');
 eq(await page.locator('#propertyMapCard').isVisible(),true);
 eq(await page.locator('#permitCard').isVisible(),false);
 eq(await page.locator('#step-property').getAttribute('aria-pressed'),'true');
 await page.click('#stepContinueWork');
 eq(await page.locator('#permitForm').isVisible(),true);
 eq(await page.locator('#digQuickCore input:visible,#digQuickCore select:visible').count(),5);
 eq(await page.locator('#propertyMapCard').isVisible(),false);
 await page.click('#step-results');
 eq(await page.getAttribute('#treeTaskTabs','data-active-step'),'work','Cannot show a stale/no result');
 match(await page.textContent('#treeStepMessage'),/run the check/i);
 await set({scCity:'inside',scLocation:'row',scDbh:'24',digPurpose:'utility',digFeet:'10',digStage:'not-started',digArea:'unknown'});
 await page.click('#screenNow');
 await page.waitForSelector('#treeTaskTabs[data-active-step="results"]',{timeout:12000});
 await page.waitForSelector('#digQuickResultRows:visible');
 eq(await page.locator('#permitForm').isVisible(),false);
 eq(await page.locator('#digQuickAreaFollow').isVisible(),true);
 eq(await page.locator('#diggingFullRecordDetails').isVisible(),true);
 eq(await page.locator('#resultWorkflow').isVisible(),false,'Full record starts collapsed');
 eq(await page.locator('#simplePermitAnswer').isVisible(),false,'No redundant removal heading in digging results');
 await page.click('#digQuickAreaFollow');
 eq(await page.getAttribute('#treeTaskTabs','data-active-step'),'work');
 eq(await page.locator('#digArea').isVisible(),true,'Excavation location is not buried under technical details');
 eq(await page.evaluate(()=>document.activeElement?.id),'digArea');
 await page.selectOption('#digArea','row');
 await page.click('#screenNow');
 await page.waitForSelector('#treeTaskTabs[data-active-step="results"]',{timeout:12000});
 match(await page.textContent('#digQuickResultRows'),/Engineering right-of-way authorization/);
 await page.locator('#diggingFullRecordDetails>summary').click();
 eq(await page.locator('#screeningRecord').isVisible(),true,'Full technical record available on demand');
 match(await page.inputValue('#screeningRecord'),/Engineering right-of-way authorization/);
 await page.click('#treeWorkTab');
 eq(await page.getAttribute('#treeTaskTabs','data-active-step'),'work','Switching tasks leaves stale results behind');
 eq(await page.locator('#permitForm').isVisible(),true);
 await page.click('#step-property');
 eq(await page.locator('#propertyMapCard').isVisible(),true);
 await page.click('#step-work');
 await set({scCity:'inside',scLocation:'private',scHistoric:'no',scProperty:'developed',
  scWork:'removal',scSpecies:'liveoak',scDbh:'20',udcZoning:'r1r2',
  udcOverlay:'none',udcPlan:'no',udcDevelopment:'no'});
 await page.click('#screenNow');
 await page.waitForSelector('#treeTaskTabs[data-active-step="results"]',{timeout:12000});
 match(await page.textContent('#simplePermitAnswer'),/No City Chapter 65 tree permit required/);
 eq(await page.locator('#diggingFullRecordDetails').isVisible(),false);
 for(const width of [320,390,820,1200]){
  await page.setViewportSize({width,height:900});
  eq(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2),true,'No horizontal scroll at '+width);
 }
 assert.deepEqual(errors,[]);assertions++;
 console.log('STAGE_NAVIGATION_PASS',JSON.stringify({
  assertions,threeStages:true,diggingFiveInputs:true,excavationLocationFollowup:true,
  engineeringVisible:true,fullRecordOnDemand:true,switchInvalidates:true,
  savedTreeResults:true,physicalIPhone:false,noEmailSent:true
 }));
}finally{await browser.close();}
