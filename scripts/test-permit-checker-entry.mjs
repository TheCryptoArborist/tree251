import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import config from '../next.config.mjs';
const [home,header,promo]=await Promise.all([
  'components/TheArboristHomePage.tsx','components/SiteHeader.tsx','components/PermitCheckerPromo.tsx'
].map(path=>readFile(path,'utf8')));
test('approved homepage wording and independent-guidance notice are retained',()=>{
  assert.ok(promo.includes('Planning tree work in Mobile, Alabama?'));
  assert.ok(promo.includes('Before you prune, remove, plant, or dig, check which permits, City reviews, and tree-protection requirements may apply to your property and project.'));
  assert.ok(promo.includes('Independent guidance from The Arborist. City of Mobile departments make the final permitting decisions.'));
  assert.ok(promo.includes('Check permit requirements'));
});
test('the entry sits inside Start Here before all six original service cards',()=>{
  const start=home.indexOf('id="start-here"'),entry=home.indexOf('<PermitCheckerPromo />'),cards=home.indexOf('{serviceGroups.map');
  assert.ok(start>=0&&entry>start&&entry<cards);
  assert.equal((home.match(/<PermitCheckerPromo \/>/g)||[]).length,1);
  assert.equal((home.slice(home.indexOf('const serviceGroups'),home.indexOf('const resources')).match(/title: /g)||[]).length,6);
  assert.ok(home.includes('<RequestConsultationButton className="min-h-12 w-full sm:w-auto" />'));
  assert.ok(home.includes('<SchedulePhoneButton href={calendlySchedulingUrl} className="min-h-12 w-full sm:w-auto" />'));
});
test('desktop and mobile links are present without changing contact actions',()=>{
  assert.equal((header.match(/href="\/permit-checker"/g)||[]).length,2);
  assert.ok(header.includes('Mobile Tree Permit Checker'));
  assert.ok(header.includes('>Permit Checker</a>'));
  const contacts=header.slice(header.indexOf('aria-label="Mobile contact actions"'));
  assert.equal(contacts.includes('/permit-checker'),false);
  assert.ok(contacts.includes('tel:+12516223200'));
  assert.ok(contacts.includes('href={calendlySchedulingUrl}'));
  assert.ok(contacts.includes('href={consultationAnchor}'));
});
test('the friendly entry redirects only to the tested standalone checker',async()=>{
  assert.equal(config.reactStrictMode,true);
  assert.deepEqual(await config.redirects(),[{source:'/permit-checker',destination:'/testing/mobile-tree-checker.html',permanent:false}]);
  assert.ok(promo.includes('href="/permit-checker"'));
});
