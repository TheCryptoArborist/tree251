/* City of Mobile Chapter 17 land-disturbance preliminary screening.
 * Sources: current Municode Chapter 17, §§17-6(c), 17-8(a)-(b);
 * City Engineering FAQ (rev 2020) and SFRA application (rev 2025).
 * Exemptions are conditional; engineering requirements are not inferred
 * merely from area, a tree permit or a right-of-way permit.
 */
export const LAND_DISTURBANCE_VERSION='0.1.0';
export const LAND_DISTURBANCE_SOURCES=Object.freeze([
 {label:'City Chapter 17, §§17-6 and 17-8 (permit triggers and exemptions)',url:'https://library.municode.com/al/mobile/codes/code_of_ordinances?nodeId=CICO_CH17STMAFLCO'},
 {label:'Engineering land-disturbance FAQ (City, 2020)',url:'https://www.buildmobile.org/pdf/Land%20Disturbance%20-%20FAQs.pdf'},
 {label:'Single-Family Residential Affidavit application (City, March 2025)',url:'https://www.buildmobile.org/uploads/SFRALDPermitApplicationFinal.pdf'},
 {label:'City land-development forms and application packages',url:'https://www.buildmobile.org/forms-and-applications/'}
]);
const answer=(code,title,summary,next,category='Not determined')=>({
 code,title,summary,next,category,sources:LAND_DISTURBANCE_SOURCES,
 permitIssued:false,authorizationGranted:false,exemptionVerified:false
});
const number=v=>v!==''&&v!=null&&Number.isFinite(Number(v))&&Number(v)>=0?Number(v):null;
export function screenLandDisturbance(a={}){
 const work=a.work||'unknown',city=a.city||'unknown';
 const noGround=a.rowGroundWork==='no'&&a.alsoDigging!==true&&a.development!=='yes'&&!['root','roots','planting','clearing'].includes(work);
 const knownGround=['root','roots','planting','clearing'].includes(work)||a.alsoDigging===true||a.rowGroundWork==='yes'||a.development==='yes';
 const area=number(a.disturbedSqFt);
 const tier=area===null?'Area unverified':area>=43560?'Tier I candidate (1 acre or more)':area>=4000?'Tier II / III candidate (under 1 acre)':'Minor-scope or Tier II / III review (under 4,000 sq. ft.)';
 if(city==='outside')return answer('OUTSIDE','Outside Mobile land-disturbance screening',
  'City of Mobile Chapter 17 does not determine requirements outside the City.',
  'Check the controlling jurisdiction for the actual work site.');
 if(noGround)return answer('NO_GROUND_REPORTED','No land-disturbing activity reported',
  'The job is reported as routine tree work with no digging, clearing, grading, grubbing, excavation, filling or associated development.',
  'No City land-disturbance permit trigger is identified from the reported work alone. Tree and ROW approvals remain separate.','No disturbance reported');
 if(!knownGround)return answer('SCOPE_UNKNOWN','Confirm whether the project disturbs land',
  'Chapter 17 applies to activities such as clearing vegetation, grubbing, digging, excavating, grading and filling; limited exemptions exist.',
  'Confirm whether any part of this project disturbs soil or changes vegetative cover before treating the land-disturbance review as complete.');
 if(city!=='inside')return answer('CITY_UNKNOWN','Confirm Mobile jurisdiction for land disturbance',
  'The work is reported to disturb land, but City jurisdiction has not been established.',
  'Verify the actual work area is within Mobile. An address or tree-map point does not establish every work boundary.',tier);
 if(a.landDisturbance==='issued')return answer('PERMIT_REPORTED','Land-disturbance permit reported—scope not verified',
  'You reported an issued permit, but the permit number, approved work area, erosion controls and plan conditions have not been verified.',
  'Verify the issued permit covers the exact disturbance. It does not replace Engineering ROW, tree or root-protection approvals.',tier);
 if(a.landDisturbance==='pending')return answer('APPLICATION_PENDING','Land-disturbance permit application pending',
  'A pending application is not an issued permit or permission to start.',
  'Wait for the City decision and verify any separate ROW, tree and root-protection requirements.',tier);
 if(area!==null&&area>=43560)return answer('TIER_I_REVIEW','Tier I land-disturbance permit review indicated',
  'The reported disturbed area is at least one acre. City Engineering classifies projects of one acre or greater in the Tier I category.',
  'Contact Engineering Permitting to confirm the approved project limits, stormwater and erosion-control plans, and permit requirements before disturbance.',tier);
 if(a.ldSensitive==='yes')return answer('SENSITIVE_SITE','Engineering land-disturbance review needed',
  'Flood-zone fill, wetlands, changed drainage or substantial new impervious area can make a residential minor-work exception or SFRA inapplicable.',
  'Confirm the site-specific requirements with Engineering. Do not rely on a minor landscaping exemption or self-classify a Tier III plan.',tier);
 if(area!==null&&area>=4000)return answer('FOUR_THOUSAND_REVIEW','Land-disturbance permit review indicated at 4,000 sq. ft. or more',
  'Chapter 17 specifically requires permitting for covered clearing or grubbing at 4,000 square feet or more; other land disturbance is generally regulated under §17-8.',
  'Have Engineering determine the proper Tier II or Tier III application, any other approvals and any site-specific exemptions before work starts.',tier);
 const residential=a.property==='developed'&&a.taxClass!=='commercial'&&a.location==='private'&&!['row','mixed'].includes(a.excavationArea)&&!['row','mixed'].includes(a.rowWorkArea);
 if(residential&&area!==null&&area<4000&&a.ldSensitive==='no'){
  return answer('MINOR_RESIDENTIAL_POSSIBLE','Possible minor residential landscaping exception—verify',
   'Chapter 17 §17-8(b) provides conditional exceptions for certain minor work on individual residential lots. Area alone is insufficient: excavation depth, slope, drainage, cumulative post-1984 impervious area and other site restrictions matter. The SFRA is a separate application path where applicable.',
   'Check the Chapter 17 conditions and current City SFRA package. Engineering may still require a land-disturbance permit or erosion-control measures; ROW and tree permits are independent.',tier);
 }
 return answer('REVIEW_NEEDED','Land-disturbance permit or exemption needs verification',
  'The proposed planting, clearing, excavation or associated project may fall under Chapter 17. The available answers do not establish a permit tier or a qualifying exception.',
  'Confirm disturbed area, grading depth, drainage, flood/wetlands status and impervious area. Ask Engineering Permitting whether a Tier I/II/III, SFRA or conditional exemption applies.',tier);
}
