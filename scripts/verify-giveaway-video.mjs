import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.env.PLANT_TEST_ORIGIN || 'http://127.0.0.1:3000';
const out = process.env.BANNER_OUTPUT || 'review-output';
await mkdir(out, {recursive:true});
const browser = await chromium.launch({headless:true});
const results=[];
const id='#giveaway-banner-video';
async function newPage(options={}) {
  const context=await browser.newContext({viewport:{width:390,height:844}, reducedMotion:'no-preference',...options});
  await context.route('**/*',r=>{
    const request=r.request(), url=new URL(request.url());
    return ['GET','HEAD'].includes(request.method())&&url.origin===origin&&!url.pathname.startsWith('/api/')?r.continue():r.abort();
  });
  const page=await context.newPage();
  return {context,page};
}
async function visible(page) {
  await page.locator('.giveaway-video-frame').scrollIntoViewIfNeeded();
}
async function waitPlaying(page) {await page.waitForFunction(()=>{const v=document.getElementById('giveaway-banner-video');return !v.paused&&v.currentTime>0.05;});}
async function waitPaused(page) {await page.waitForFunction(()=>document.getElementById('giveaway-banner-video').paused);}
try {
  for(const width of [320,390,768,1440]) {
    const {context,page}=await newPage({viewport:{width,height:width<600?844:1100}});
    const errors=[],videoRequests=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('request',r=>{if(r.url().endsWith('.mp4'))videoRequests.push(r.url());});
    assert.equal((await page.goto(origin+'/plant',{waitUntil:'networkidle'})).status(),200);
    await page.locator('.giveaway-video-toggle').waitFor({state:'attached'});
    assert.equal(await page.locator('#choose-tree .tree-picker-buttons a').count(),10);
    assert.equal(await page.locator(id).evaluate(v=>v.paused),true);
    assert.equal(videoRequests.length,0,'Video must not download before entering view.');
    assert.equal(await page.locator(id).getAttribute('preload'),'none');
    const order=await page.evaluate(()=>{
      const q=document.getElementById('questions'),e=document.getElementById('giveaway-thanks'),c=document.getElementById('contact');
      return !!(q.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)&&!!(e.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_FOLLOWING);
    });
    assert(order,'Acknowledgment belongs after FAQ and before contact.');
    await visible(page);await waitPlaying(page);
    assert.equal(await page.locator(id).evaluate(v=>v.muted&&v.loop&&v.playsInline),true);
    assert.equal(await page.locator('.giveaway-logo-panel img').count(),3);
    await page.waitForFunction(()=>[...document.querySelectorAll('.giveaway-logo-panel img')].every(i=>i.complete&&i.naturalWidth>0));
    await page.locator('.giveaway-video-toggle').click();await waitPaused(page);
    await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(200);
    await visible(page);await page.waitForTimeout(300);
    assert.equal(await page.locator(id).evaluate(v=>v.paused),true,'Manual Pause must persist across scroll.');
    await page.locator('.giveaway-video-toggle').focus();await page.locator('.giveaway-video-toggle').press('Enter');await waitPlaying(page);
    await page.evaluate(()=>window.scrollTo(0,0));await waitPaused(page);
    await visible(page);await waitPlaying(page);
    await page.locator(id).evaluate(v=>v.currentTime=v.duration-0.25);
    await page.waitForFunction(()=>{const v=document.getElementById('giveaway-banner-video');return v.currentTime<2&&!v.paused;});
    // Browser-tab visibility is simulated without navigating away or submitting data.
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
    await waitPaused(page);
    await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await waitPlaying(page);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.locator('.giveaway-video-toggle').click();await waitPaused(page);
    await page.locator('#giveaway-thanks').screenshot({path:`${out}/giveaway-loop-${width}.png`});
    if(width===1440){
      await page.emulateMedia({media:'print'});assert.equal(await page.locator('#giveaway-thanks').isVisible(),false);await page.emulateMedia({media:'screen'});
      if(process.env.AXE_SCRIPT){
        await page.addScriptTag({path:process.env.AXE_SCRIPT});
        const audit=await page.evaluate(()=>window.axe.run(document.getElementById('giveaway-thanks'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
        await writeFile(`${out}/giveaway-accessibility.json`,JSON.stringify(audit,null,2));
        assert.deepEqual(audit.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)})),[]);
      }
    }
    assert.deepEqual(errors,[]);results.push({width,autoplayInView:true,lazyVideo:true,loop:true,pauseRemembered:true,offscreenPause:true,hiddenTabPause:'simulated: passed',keyboard:true,logos:3,overflow:false});
    await context.close();
  }
  {
    const {context,page}=await newPage({reducedMotion:'reduce'});
    await page.goto(origin+'/plant',{waitUntil:'networkidle'});await visible(page);await page.waitForTimeout(300);
    assert.equal(await page.locator(id).evaluate(v=>v.paused&&v.currentTime===0),true);
    await page.locator('.giveaway-video-toggle').click();await waitPlaying(page);
    assert.equal(await page.locator(id).evaluate(v=>v.loop),false);
    await page.locator(id).evaluate(v=>v.currentTime=v.duration-0.15);await waitPaused(page);
    await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(200);await visible(page);await page.waitForTimeout(300);
    assert.equal(await page.locator(id).evaluate(v=>v.paused),true);
    results.push({reducedMotion:'No autoplay, manual one-pass playback, no repeat'});await context.close();
  }
  {
    const {context,page}=await newPage();
    await page.addInitScript(()=>{const play=HTMLMediaElement.prototype.play;let deny=true;HTMLMediaElement.prototype.play=function(){if(this.id==='giveaway-banner-video'&&deny){deny=false;return Promise.reject(new DOMException('Blocked for test','NotAllowedError'));}return play.call(this);};});
    await page.goto(origin+'/plant',{waitUntil:'networkidle'});await visible(page);
    await page.waitForFunction(()=>document.querySelector('.giveaway-video-status').textContent.includes('Tap Play'));
    await page.locator('.giveaway-video-toggle').click();await waitPlaying(page);
    results.push({autoplayBlocked:'simulated: manual fallback works'});await context.close();
  }
  {
    const {context,page}=await newPage();
    await page.addInitScript(()=>Object.defineProperty(navigator,'connection',{configurable:true,value:{saveData:true}}));
    await page.goto(origin+'/plant',{waitUntil:'networkidle'});await visible(page);await page.waitForTimeout(300);
    assert.equal(await page.locator(id).evaluate(v=>v.paused&&v.currentTime===0),true);
    await page.locator('.giveaway-video-toggle').click();await waitPlaying(page);
    results.push({saveData:'simulated: no autoplay, explicit Play works'});await context.close();
  }
  await writeFile(`${out}/giveaway-checks.json`,JSON.stringify({passed:true,origin,results},null,2));
  console.log(JSON.stringify({passed:true,results},null,2));
}catch(error){await writeFile(`${out}/giveaway-checks.json`,JSON.stringify({passed:false,origin,error:String(error),results},null,2));throw error;}
finally{await browser.close();}
