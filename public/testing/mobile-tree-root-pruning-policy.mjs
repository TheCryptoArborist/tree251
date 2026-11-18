/* Chapter 65 root-pruning review. Source reopened 2026-11-18:
 * Ordinance 65-018-2021, adopted March 16, 2021, Articles II, VIII(1)(a), X(1)(d).
 * The definitions expressly define Selective Root Pruning, not a separate
 * Non-selective Root Pruning entry. Contractor-choice descriptions below are
 * plain-language interpretations, not additional ordinance definitions.
 * Receives the existing applicability and proximity findings; does not grant
 * an exemption, establish the actual CRZ, verify supervision or adjudicate abuse.
 */
export const ROOT_PRUNING_VERSION='0.7.1';
const source='https://mcclibraryfunctions.azurewebsites.us/api/ordinanceDownload/11265/1073837/pdf';
export const ROOT_PRUNING_SOURCES=Object.freeze([
 {label:'§65-2 — Selective Root Pruning (adopted Article II, page 4)',url:source+'#page=4'},
 {label:'§65-8 — Tree protection (adopted Article VIII(1)(a), page 9)',url:source+'#page=9'},
 {label:'§65-10 — Tree abuse (adopted Article X(1)(d), page 11)',url:source+'#page=11'}
]);
export function rootPruningConclusion(a={},r={}){
 const covered=r.scope==='covered',unresolved=r.scope==='unresolved';
 const ordinanceRelevant=covered||unresolved;
 const constructionRule='On construction or improvements covered by §65-8, non-selective root pruning within the critical root zone of a retained tree is prohibited. Selective root pruning must be supervised by an ISA Certified Arborist.';
 const selectiveDefinition='§65-2 describes exposing roots with supersonic air tools, pressurized water or hand tools, followed by individual root cuts under ISA Certified Arborist supervision, following the cited ANSI A300 (Part 8) Best Management Practices.';
 const abuseRule='§65-10 separately prohibits non-selective root damage within the critical root zone of Public Trees or Heritage Trees, including curb, sidewalk and driveway work.';
 let status='METHOD_NOT_REPORTED',finding='Root handling has not been described. Distance alone cannot establish selective pruning or compliance.',action='Describe how encountered roots will be handled before relying on a method-specific conclusion.';
 if(a.rootHandling==='cut'){
  status='CUT_THROUGH_PROPOSED';
  finding='Cutting through roots as digging proceeds does not describe the expose-first, individual-cut process in §65-2. For covered work within the critical root zone, this method must change.';
  action=ordinanceRelevant
   ? 'Do not cut through roots in the protected critical root zone. Have an ISA Certified Arborist review the route and an individual-root plan; confirm the applicable City authorization separately.'
   : 'Have an ISA Certified Arborist review the proposed root cuts before proceeding. This is protective advice, not a finding that the Mobile prohibition applies to this site.';
 }else if(a.rootHandling==='expose'){
  const methodOK=['hand','air-water'].includes(a.method);
  status=methodOK?'SELECTIVE_PROPOSED_UNVERIFIED':['machinery','boring'].includes(a.method)?'EXPOSURE_METHOD_CONFLICT':'EXPOSURE_METHOD_NEEDED';
  finding=methodOK
   ? 'The reported exposure method and individual-cut plan describe the selective sequence. Actual ISA supervision, individual cuts and City authorization remain unverified; this is not approval.'
   : ['machinery','boring'].includes(a.method)
    ? 'Machinery or boring alone does not establish the specified root-exposure process. Explain how roots themselves will be exposed before individual cuts; the equipment choice is not automatically a violation.'
    : 'An expose-first plan was selected, but the root-exposure method and actual ISA supervision have not been established.';
  action=ordinanceRelevant
   ? 'Confirm the root-exposure method, an ISA Certified Arborist supervising individual root pruning, and any applicable City authorization before cutting roots. A name or credential entered in the form is not verification.'
   : 'Arrange an arborist-reviewed root plan before cutting. The reported residential exception or outside-City status does not verify that proposed cuts are safe.';
 }else if(a.rootHandling==='stop'){
  status='STOP_BEFORE_ROOT_CUTTING';
  finding='Stopping when roots appear avoids authorizing cuts in advance. If selective pruning follows on covered work, ISA Certified Arborist supervision is required—not merely an earlier consultation.';
  action='Stop at encountered roots for evaluation. On covered work, any subsequent selective root pruning must be supervised by an ISA Certified Arborist; obtain applicable authorization separately.';
 }
 if(!ordinanceRelevant){
  // Do not turn advice into a City legal requirement where the existing
  // screening indicates an exception or a location outside City jurisdiction.
  finding=a.rootHandling==='cut'?'Cutting through roots can damage the tree. An arborist-reviewed method is recommended; no Chapter 65 violation is determined here.':
   a.rootHandling==='expose'?'The expose-first plan is reported, not verified. Arborist supervision is recommended here; this screen does not impose §65-8 on a site outside its established scope.':
   a.rootHandling==='stop'?'Stopping for root evaluation is a protective plan, not permission for later root cutting.':
   'No root-handling method was reported; the form cannot assess that part of the plan.';
  if(a.rootHandling==='stop')action='Stop at roots and obtain an ISA Certified Arborist assessment before deciding on cuts. This is protective advice, separate from City applicability.';
 }
 return {
  status,constructionRule,selectiveDefinition,abuseRule,finding,action,
  ordinanceRelevant,
  followUpNeeded:ordinanceRelevant&&(r.range?.band!=='beyond'||['exposed','damaged'].includes(a.stage)||['cut','expose'].includes(a.rootHandling)),
  supervisionVerified:false,criticalRootZoneEstablished:false,
  complianceDetermined:false,authorizationGranted:false,violationDetermined:false,
  sources:ROOT_PRUNING_SOURCES,version:ROOT_PRUNING_VERSION
 };
}
