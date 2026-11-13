/*
 * Mobile Tree Permit Checker — independent Chapter 64 / UDC screening v0.2.1
 * Returns landscape/development review guidance, never an ordinance tree permit.
 * All inputs are self-reported; a blank or unknown answer is not a negative finding.
 */
export const UDC_RULE_VERSION = '0.2.1';
export const UDC_REFERENCES = Object.freeze({
  article3: {
    label: 'City of Mobile Unified Development Code Article 3 (amended June 3, 2025), §§64-3-7, 64-3-8, 64-3-10',
    url: 'https://www.buildmobile.org/uploads/03StandardsAdoptedJune32025.pdf'
  },
  official: {
    label: 'Build Mobile: adopted UDC articles, procedures, overlays, and current amendments',
    url: 'https://www.buildmobile.org/forms-and-applications/'
  }
});
const allowed = value => ['yes','no','unknown'].includes(value) ? value : 'unknown';
const responses = ['plan','requiredTree','credit','buffer','development'];
function result(code,title,reason,next,details=[],missing=[]){
  return {code,title,reason,next,details,missing,refs:['article3','official'],version:UDC_RULE_VERSION};
}
export function screenUDC(input={}){
  const area=input.jurisdiction||'unknown';
  const location=input.location||'unknown';
  const zone=input.zoning||'unknown';
  const overlay=input.overlay||'unknown';
  const a=Object.fromEntries(responses.map(k=>[k,allowed(input[k])]));
  const yes=responses.filter(k=>a[k]==='yes');
  const unknown=responses.filter(k=>a[k]==='unknown');
  const topicLabels={
    plan:'whether an applicable site/landscape plan exists',
    requiredTree:'whether the tree appears as a required planting or preserved tree',
    credit:'whether the tree received a planting/preservation credit',
    buffer:'whether the tree is in required parking, frontage or screening landscaping',
    development:'whether the proposed activity involves construction, redevelopment, or a site-plan change'
  };
  const missing=unknown.map(k=>topicLabels[k]);
  const notes=[
    'Chapter 64 landscape/site-plan obligations are independent of Chapter 65 tree permits and Tree Commission authorization.',
    'This is screening based on user-reported facts; it does not establish zoning, approved plans, preservation credits, variances or tree ownership.'
  ];
  if(area==='outside')return result('OUTSIDE','Chapter 64 screening not applicable to this location as reported','You indicated the tree is outside Mobile corporate limits. No City of Mobile determination is made.','Verify the actual jurisdiction and its development rules.',notes);
  if(area!=='inside')return result('VERIFICATION_REQUIRED','Chapter 64 jurisdiction not verified','It is not established that the tree is in Mobile city limits.','Verify the tree location and city boundary before relying on Mobile UDC rules.',notes,['City-limit status']);
  if(!['private','row','park','city','city-property'].includes(location))return result('VERIFICATION_REQUIRED','Tree location needs verification','Private-site landscaping and public-tree work follow different pathways.','Identify whether the tree is on a private lot, street ROW, park or other City property.',notes,['Tree location']);
  if(location!=='private')return result('PUBLIC_LOCATION','Separate public-land and development review','This tool does not apply ordinary private building-site landscape rules as if the tree were on a private parcel.','Follow the Chapter 65/ROW or City-property result. If work is part of a development or affects an approved plan, identify that separately.',notes);

  const details=[...notes];
  if(a.requiredTree==='yes'&&a.plan==='no')details.push('Your answers say the tree is a required plan tree but that no approved plan exists. Review the records to reconcile this discrepancy.');
  if(a.credit==='yes'&&a.plan==='no')details.push('A preservation credit is reported but a plan is denied. Confirm the approved application and any credited-tree obligations.');
  if(zone==='r1r2')details.push('Ordinary §64-3-7 landscaping requirements generally exclude property zoned R-1 or R-2. This is not an exemption from Chapter 65, other approvals, conditions, or site-specific restrictions.');
  if(['downtown','springhill','planned'].includes(overlay))details.push('The Downtown Development District, Springhill Overlay, or planned-development approval can use different applicability rules or additional conditions. Do not use the ordinary §64-3-7 checklist as a definitive exemption.');
  if(overlay==='unknown')details.push('Downtown/Springhill/planned-development status has not been checked.');

  if(yes.length){
    let label = yes.map(k=>topicLabels[k]).join('; ');
    return result('PLAN_REVIEW','Landscape or development review indicated',
      'One or more reported conditions could affect approved landscaping or development obligations: '+label+'. This result does not determine that a Chapter 65 tree permit is required.',
      'Locate the applicable approved site/landscape plan and conditions; compare the proposed work to the requirements. If necessary, request guidance about a plan revision, replacement planting, buffer or development review.',
      details,missing);
  }
  if(['downtown','springhill','planned'].includes(overlay)){
    return result('SPECIAL_REVIEW','Overlay or planned-development requirements need checking',
      'A special district/development designation was reported; standard Article 3 landscaping rules should not be applied without examining the controlling provisions or approval.',
      'Review the governing special district or planned-development approval and any adopted landscape conditions.',
      details,missing);
  }
  if(zone==='r1r2'){
    return result('STANDARD_EXCLUSION','Standard UDC landscape rules generally excluded by zoning',
      'The location was reported as R-1/R-2. Ordinary §64-3-7 landscaping requirements do not apply to those zoning districts in the same way as covered development sites.',
      unknown.length || overlay==='unknown'
        ? 'No blanket clearance: confirm any existing approved plan, conditions, special district or development project before assuming work is unrestricted.'
        : 'No Chapter 64 landscape-plan restriction was identified from these reported answers; Chapter 65 and any other applicable requirements remain separate.',
      details,[...missing,...(overlay==='unknown'?['Overlay/planned-development status']:[])]);
  }
  if(zone==='unknown'){
    return result('VERIFICATION_REQUIRED','Chapter 64 applicability not yet established',
      'The property zoning is unknown. Chapter 64 landscaping applicability and any continuing plan obligations cannot be determined from these answers.',
      'Verify the zoning and whether the site is subject to an approved landscape/development plan; then finish the screening.',
      details,['Property zoning',...missing,...(overlay==='unknown'?['Overlay/planned-development status']:[])]);
  }
  if(zone!=='other'){
    return result('VERIFICATION_REQUIRED','Zoning category not recognized',
      'The submitted zoning category could not be evaluated.','Verify zoning and any applicable development plans.',details,['Property zoning']);
  }
  if(unknown.length||overlay==='unknown'){
    return result('VERIFICATION_REQUIRED','Landscape-plan and development status not yet determined',
      'No affirmative Chapter 64 trigger was reported, but one or more plan, credit, buffer, development or overlay answers are unknown.',
      'Check approved site/landscape plans, tree-credit records, buffer requirements and current/proposed development before declaring this issue resolved.',
      details,[...missing,...(overlay==='unknown'?['Overlay/planned-development status']:[])]);
  }
  return result('NO_ISSUE_IDENTIFIED','No Chapter 64 plan issue identified from these answers',
    'All five plan/development checks were reported as No for an ordinary non-R-1/R-2 property outside the identified special districts.',
    'This is not a determination that removal is authorized. If an approved plan or development condition is discovered, rerun this screen and obtain the appropriate review.',
    details);
}
