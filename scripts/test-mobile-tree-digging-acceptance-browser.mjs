import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {execSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {QUICK_DIGGING_VERSION} from '../public/testing/mobile-tree-quick-digging.mjs';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
const files=['mobile-tree-digging-rules.mjs','mobile-tree-quick-digging.mjs'];
const expected=await Promise.all(files.map(n=>readFile('public/testing/'+n,'utf8')));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let ready=false;
for(let i=0;i<45;i++){
 try{const actual=await Promise.all(files.map(async n=>{const r=await fetch(origin+'/testing/'+n,{cache:'no-store',signal:AbortSignal.timeout(12000)});return r.ok?r.text():'';}));if(actual.every((s,i)=>s===expected[i])){ready=true;break;}}catch{}
 await sleep(5000);
}
assert.ok(ready,'Exact acceptance fixes must be deployed before browser testing');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
const checks=[],errors=[];
const check=(name,condition)=>{checks.push({name,pass:!!condition});assert.ok(condition,name);};
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/testing/mobile-tree-checker.html#digging',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#stepContinueWork');await page.click('#stepContinueWork');
 await page.waitForSelector('#permitForm[data-quick-digging="yes"]');await page.waitForTimeout(250);
 const set=values=>page.evaluate(values=>{for(const [id,value] of Object.entries(values)){const n=document.getElementById(id);if(!n)throw Error('Missing '+id);if(n.type==='checkbox')n.checked=value;else n.value=String(value);n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));}},values);
 const run=async()=>{await page.click('#screenNow');await page.waitForSelector('#diggingResult[data-quick-version="'+QUICK_DIGGING_VERSION+'"]:not([hidden])');await page.waitForTimeout(220);};
 check('Five initial controls unchanged',await page.locator('#digQuickCore input:visible,#digQuickCore select:visible').count()===5);
 check('Optional depth is initially hidden',!(await page.locator('#digDepth').isVisible()));
 check('Email form initially hidden',!(await page.locator('#emailCard').isVisible()));
 check('Original concise measurement help preserved',(await page.textContent('#scDbhPlainHelp')).includes('Leave blank if you have not measured'));
 // These are controlled site facts, not a fresh cadastral or GIS verification.
 await set({scCity:'inside',scLocation:'row',scHistoric:'no',scDbh:'24',digFeet:'10',digPurpose:'utility',digStage:'not-started',digHandling:'cut',digMethod:'machinery',digArea:'row'});
 await run();
 const next=await page.textContent('#digQuickResultRows>div:last-child>p');
 check('Cut-through headline retained',(await page.textContent('#diggingResult>h3')).includes('Change the proposed root-cutting method'));
 check('Forestry routing not replaced by method warning',next.includes('Do not cut through')&&next.includes('Urban Forestry'));
 check('Engineering ROW route visible',next.includes('Engineering right-of-way authorization'));
 check('Saved record retains full next action',(await page.inputValue('#screeningRecord')).includes(next));
 await page.click('#reviewForestryEmail');await page.waitForSelector('#draftArea:not(.hidden)');
 const email=await page.inputValue('#emailBody');
 check('Short email retains method and ROW location',email.includes('cuts through roots as digging proceeds')&&email.includes('Digging location: public street right-of-way'));
 check('Full policy report is not pasted into email',!email.includes('QUICK CHECK'));
 await page.fill('#digFeet','11');
 check('Changed distance invalidates result',!(await page.locator('#permitOutput').isVisible()));
 check('Changed distance invalidates draft',!(await page.locator('#draftArea').isVisible()));
 await set({scLocation:'private',scProperty:'developed',udcZoning:'r1r2',udcOverlay:'none',udcPlan:'no',digOtherTrees:'no',digHandling:'stop',digArea:'row',digFeet:'10'});
 await run();
 check('Occupied home remains covered',await page.getAttribute('#diggingResult','data-scope')==='covered');
 check('Private-tree ROW excavation has visible Engineering guidance',(await page.textContent('#digQuickResultRows')).includes('Engineering right-of-way authorization'));
 check('Engineering requirement does not invent Forestry permit',await page.locator('#forestryEmailCTA').evaluate(e=>e.classList.contains('optional-email')));
 await mkdir('test-artifacts/screenshots',{recursive:true});
 await page.locator('#diggingResult').screenshot({path:'test-artifacts/screenshots/acceptance-private-tree-row.png'});
 await set({scCity:'outside',digTarget:'other',digOtherDbh:'30',digArea:'unknown'});
 await run();
 check('Different tree does not inherit outside-city determination',await page.getAttribute('#diggingResult','data-scope')==='unresolved');
 check('Different tree gets explicit location follow-up',(await page.textContent('#digQuickResultRows')).includes('Locate the affected tree separately'));
 check('Unresolved jurisdiction is not a mandatory email',await page.locator('#forestryEmailCTA').evaluate(e=>e.classList.contains('optional-email')));
 await set({scCity:'inside',digTarget:'same',scDbh:'',digFeet:'',digStage:'damaged'});
 check('Damage warning immediate without measurements',await page.locator('#digQuickImmediate').isVisible());
 await run();
 check('Damage overrides missing measurements',await page.getAttribute('#diggingResult','data-outcome')==='DAMAGE_REPORTED');
 for(const width of [320,390,820,1200]){await page.setViewportSize({width,height:900});check('No horizontal overflow at '+width,await page.evaluate(()=>document.body.scrollWidth<=innerWidth+2));}
 await page.click('#treeWorkTab');
 check('Tab switch invalidates old digging result',!(await page.locator('#permitOutput').isVisible()));
 await set({scWork:'pruning',scLocation:'row',scSpecies:'liveoak',scLimb:'7',scDbh:'24',digAlso:false});
 await page.click('#screenNow');await page.waitForSelector('#permitOutput:not(.hidden)');
 check('Seven-inch public live-oak limb still routes to Commission',(await page.textContent('#permitOutcome')).includes('Commission'));
 check('No page JavaScript errors',errors.length===0);
 const result={version:QUICK_DIGGING_VERSION,assertions:checks.length,checks,errors,hostedPreview:true,controlledSiteFacts:true,freshGISValidation:false,physicalIPhone:false,noEmailSent:true};
 await writeFile('test-artifacts/digging-acceptance-browser.json',JSON.stringify(result,null,2));
 console.log('DIGGING_ACCEPTANCE_BROWSER_PASS',JSON.stringify({...result,checks:undefined}));
}finally{await browser.close();}
