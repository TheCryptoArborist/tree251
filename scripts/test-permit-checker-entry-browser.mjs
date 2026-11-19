import assert from 'node:assert/strict';
import {execSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(process.env.BROWSER_DEPS+'/package.json');
const {chromium}=require('playwright');
const origin=process.env.PREVIEW_ORIGIN||'https://deploy-preview-9--tree251.netlify.app';
assert.equal(new URL(origin).hostname,'deploy-preview-9--tree251.netlify.app','This review targets the preview only');
let deployed=false;
for(let attempt=0;attempt<60;attempt++){
  try{
    const home=await fetch(origin+'/',{cache:'no-store',signal:AbortSignal.timeout(12000)});
    const text=await home.text();
    const entry=await fetch(origin+'/permit-checker',{redirect:'manual',cache:'no-store',signal:AbortSignal.timeout(12000)});
    if(home.ok&&text.includes('id="permit-checker-introduction"')&&text.includes('id="construction-conflict-panel"')&&text.includes('id="construction-tree-guidance"')&&[302,307].includes(entry.status)&&entry.headers.get('location')?.includes('/testing/mobile-tree-checker.html')){deployed=true;break;}
  }catch{}
  await new Promise(resolve=>setTimeout(resolve,5000));
}
assert.ok(deployed,'Repositioned homepage entry and shortcut have not reached the preview');
const executablePath=execSync('command -v google-chrome || command -v chromium || command -v chromium-browser',{encoding:'utf8'}).trim();
const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox']});
const checks=[],errors=[];let page;
const check=(name,condition)=>{checks.push({name,pass:!!condition});assert.ok(condition,name);};
await mkdir('test-artifacts/permit-entry',{recursive:true});
try{
  page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*',route=>/submit\.jotform|\/submissions(?:[/?]|$)/i.test(route.request().url())?route.abort():route.continue());
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  await page.waitForSelector('#permit-checker-introduction');
  check('The approved heading appears once',await page.getByRole('heading',{name:'Planning tree work in Mobile, Alabama?',exact:true}).count()===1);
  check('The primary homepage headline remains intact',(await page.locator('h1').textContent()).trim()==='Concerned About a Tree?');
  check('All six service cards remain',await page.locator('#start-here > div.grid > article').count()===6);
  check('The checker is immediately below the construction and hardscape panel',await page.locator('#permit-checker-introduction').evaluate(node=>node.previousElementSibling?.id==='construction-conflict-panel'&&node.closest('section')?.id==='construction-tree-guidance'&&node.previousElementSibling.textContent.includes('Construction & hardscape conflicts near trees')));
  check('No checker panel remains in the six-card Start Here area',await page.locator('#start-here #permit-checker-introduction').count()===0);
  check('City decision authority remains explicit',(await page.locator('#permit-checker-introduction').textContent()).includes('City of Mobile departments make the final permitting decisions.'));
  const desktop=page.locator('nav[aria-label="Primary navigation"]');
  await desktop.getByRole('button',{name:'Resources',exact:true}).focus();
  const desktopLink=desktop.getByRole('link',{name:'Mobile Tree Permit Checker',exact:true});
  await desktopLink.waitFor({state:'visible'});
  check('The checker is first in Resources',await desktopLink.evaluate(link=>link.parentElement.firstElementChild===link));
  await page.locator('#permit-checker-introduction').screenshot({path:'test-artifacts/permit-entry/desktop-panel.png'});
  await page.locator('#construction-tree-guidance').screenshot({path:'test-artifacts/permit-entry/desktop-placement.png'});
  await desktopLink.click();
  await page.waitForURL('**/testing/mobile-tree-checker.html');
  await page.waitForSelector('#treeTaskTabs');
  check('Desktop menu reaches the same preview checker',new URL(page.url()).origin===origin);
  check('The checker retains its approved headline',(await page.locator('.hero h1').textContent())==='Working on or around trees in Mobile?');
  check('The checker retains its decision disclaimer',(await page.locator('.hero .notice').textContent()).includes('make the final decisions on permit applications'));
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  for(const width of [320,390,820,1024,1440]){
    await page.setViewportSize({width,height:900});
    check('No page-wide horizontal overflow at '+width,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
    check('Panel and button fit at '+width,await page.locator('#permit-checker-introduction').evaluate(node=>{const rect=node.getBoundingClientRect(),link=node.querySelector('a').getBoundingClientRect();return rect.left>=0&&rect.right<=innerWidth+1&&link.left>=rect.left&&link.right<=rect.right&&link.height>=44;}));
    check('Service cards and construction panel precede the checker at '+width,await page.locator('#permit-checker-introduction').evaluate(node=>{const panel=document.getElementById('construction-conflict-panel'),cards=[...document.querySelectorAll('#start-here > div.grid > article')];return node.previousElementSibling===panel&&panel.getBoundingClientRect().bottom<=node.getBoundingClientRect().top&&cards.length===6&&cards.every(card=>card.getBoundingClientRect().bottom<=panel.getBoundingClientRect().top);}));
  }
  await page.setViewportSize({width:390,height:844});
  await page.locator('#permit-checker-introduction').screenshot({path:'test-artifacts/permit-entry/mobile-panel.png'});
  await page.locator('#construction-tree-guidance').screenshot({path:'test-artifacts/permit-entry/mobile-placement.png'});
  const mobile=page.locator('nav[aria-label="Mobile quick navigation"]');
  const mobileLink=mobile.getByRole('link',{name:'Permit Checker',exact:true});
  check('Mobile checker link is near the beginning',await mobileLink.evaluate(link=>Array.from(link.parentElement.children).indexOf(link)===1));
  check('Mobile direct-contact actions remain Call Schedule Request',(await page.locator('nav[aria-label="Mobile contact actions"]').innerText()).replace(/\s+/g,' ').trim().toLowerCase()==='call schedule request');
  await mobileLink.click();
  await page.waitForURL('**/testing/mobile-tree-checker.html');
  await page.waitForSelector('#treeTaskTabs');
  check('Mobile navigation reaches the existing checker',new URL(page.url()).origin===origin);
  await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
  await page.locator('#permit-checker-introduction').getByRole('link',{name:'Check permit requirements',exact:true}).click();
  await page.waitForURL('**/testing/mobile-tree-checker.html');
  await page.waitForSelector('#treeTaskTabs');
  await page.waitForFunction(()=>!document.getElementById('screenNow')?.disabled);
  // The map module mounts this button independently after the questionnaire is ready.
  await page.locator('#stepContinueWork').waitFor({state:'visible',timeout:30000});
  check('Homepage panel opens an interactive checker',await page.locator('#stepContinueWork').isVisible());
  check('No page JavaScript errors',errors.length===0);
  const result={checks,errors,previewOnly:true,formSubmitted:false,cityEmailSent:false,physicalIPhone:false};
  await writeFile('test-artifacts/permit-entry/results.json',JSON.stringify(result,null,2));
  console.log('PERMIT_ENTRY_BROWSER_PASS',JSON.stringify({checks:checks.length,errors,previewOnly:true,formSubmitted:false}));
}catch(error){
  if(page)await page.screenshot({path:'test-artifacts/permit-entry/failure.png',fullPage:true}).catch(()=>{});
  await writeFile('test-artifacts/permit-entry/results.json',JSON.stringify({checks,errors,failure:String(error)},null,2));
  throw error;
}finally{await browser.close();}
