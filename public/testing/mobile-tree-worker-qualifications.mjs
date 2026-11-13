import {installResultWorkflow} from './mobile-tree-result-workflow.mjs';
/* Work qualifications are independent of permit outcomes and species exemptions.
 * Sources checked 2026-11-13: adopted Chapter 65, Article IX(3), (4)(a)-(c),
 * and City Urban Forestry FAQ. This screen never verifies a contractor.
 */
export const WORKER_VERSION = '0.2.2';
export const WORKER_SOURCES = Object.freeze([
  {label:'Chapter 65, section 65-9 / Article IX(3)-(4) — adopted ordinance, pages 10-11',url:'https://mcclibraryfunctions.azurewebsites.us/api/ordinanceDownload/11265/1073837/pdf#page=10'},
  {label:'City Urban Forestry FAQ — hiring for right-of-way work',url:'https://www.cityofmobile.gov/public-works/urban-forestry-department/urban-forestry-faqs/'},
  {label:'Verify the individual arborist\u2019s ISA credential',url:'https://certificates.directory.isa-arbor.com/'}
]);
export function getWorkQualifications(input = {}) {
  const jurisdiction = input.jurisdiction ?? input.city;
  const location = input.location === 'city-property' ? 'city' : input.location;
  if(jurisdiction === 'outside' || !['row','park','city'].includes(location)) return null;
  const routine = ['pruning','removal'].includes(input.work);
  const supervision = routine && ['row','park'].includes(location);
  const conditional = jurisdiction !== 'inside';
  const lead = supervision
    ? 'Private pruning or removal in a City street right-of-way or park must be supervised by a properly certified, licensed and bonded ISA Certified Arborist.'
    : 'For private work requiring a permit on City rights-of-way, parks or other City property, the applicant must document an ISA Certified Arborist responsible for the work and satisfy the applicable contractor requirements. Confirm supervision requirements for the specific work scope.';
  return {
    code:conditional ? 'LOCATION_UNVERIFIED' : supervision ? 'SUPERVISION_REQUIRED' : 'PUBLIC_WORK_REVIEW',
    title:'Who may perform this work?',
    requirement:(conditional ? 'If the tree is confirmed to be within Mobile city limits: ' : '') + lead,
    explanation:supervision
      ? 'A tree-service company may provide the crew, but the work must be under the qualified arborist\u2019s supervision. A company name, removal quote or business license alone does not establish this qualification.'
      : 'A company name or general tree-service quote does not establish who is professionally responsible for the work.',
    checklist:[
      'Identify the responsible arborist by name and ISA certification number; verify that individual\u2019s current credential.',
      'Check the appropriate City business license, compliance with applicable State requirements, and the required bond and insurance documentation.',
      ...(input.work === 'pruning' ? ['Pruning must comply with ANSI A300 standards and the scope and conditions of any approval.'] : [])
    ],
    documentation:'Before a permit for work on these public properties is issued, section 65-9(4)(c) calls for a performance bond of at least $10,000 (or the greater City-specified minimum), City-acceptable insurance with the required additional-insured coverage, a written indemnification agreement acceptable to the City, and documentation that an ISA Certified Arborist will be responsible. These permit-stage documents do not turn a species exemption into a new permit requirement.',
    warning:'Approval and worker qualifications are separate. A permit does not qualify the contractor, and a Tree Commission species exemption does not remove the applicable supervision requirement.',
    verification:'Contractor qualifications: NOT VERIFIED. This checker has not validated a person\u2019s ISA credential, license, bond, insurance or City authorization.',
    scope:'For privately arranged work. This panel does not adjudicate separate municipal-crew, utility or emergency-authority procedures.',
    sources:WORKER_SOURCES,
    version:WORKER_VERSION
  };
}
const START='[Tree251 worker-qualification guidance]';
const END='[/Tree251 worker-qualification guidance]';
export function stripWorkerSummary(value='') {
  const text=String(value),start=text.indexOf(START);
  if(start<0)return text;
  const end=text.indexOf(END,start);
  if(end<0)return text;
  return (text.slice(0,start).trimEnd()+'\n\n'+text.slice(end+END.length).trimStart()).trim();
}
export function withWorkerSummary(value,result) {
  const clean=stripWorkerSummary(value);
  if(!result)return clean;
  const summary=[START,result.title,result.requirement,...result.checklist,result.verification,
    'Please advise which contractor documents and approvals apply to the proposed work.',END].join('\n');
  return [clean,summary].filter(Boolean).join('\n\n');
}
export function installQualificationsUI(doc) {
  const form=doc.getElementById('permitForm'),output=doc.getElementById('permitOutput');
  if(!form||!output||form.dataset.workerQualifications==='installed')return false;
  const anchor=doc.getElementById('permitReason');
  if(!anchor)return false;
  form.dataset.workerQualifications='installed';
  const panel=doc.createElement('section');panel.id='workerQualifications';panel.className='notice hidden';
  panel.setAttribute('aria-labelledby','workerQualificationsTitle');panel.dataset.version=WORKER_VERSION;
  anchor.insertAdjacentElement('afterend',panel);
  let last=null;
  const text=(tag,value,parent=panel)=>{const n=doc.createElement(tag);n.textContent=value;parent.appendChild(n);return n;};
  const read=()=>({jurisdiction:doc.getElementById('scCity')?.value,
    location:doc.getElementById('scLocation')?.value,work:doc.getElementById('scWork')?.value});
  const clear=()=>{
    last=null;panel.classList.add('hidden');
    const scope=doc.getElementById('scope');
    if(scope && scope.value.includes(START)){
      scope.value=stripWorkerSummary(scope.value);
      scope.dispatchEvent(new Event('input',{bubbles:true}));
    }
  };
  form.addEventListener('input',clear);form.addEventListener('change',clear);
  form.addEventListener('submit',()=>setTimeout(()=>{
    if(output.classList.contains('hidden')){clear();return;}
    last=getWorkQualifications(read());panel.replaceChildren();
    if(!last){panel.classList.add('hidden');return;}
    const title=text('h3',last.title);title.id='workerQualificationsTitle';title.style.margin='0 0 10px';
    text('strong',last.requirement);
    text('p',last.explanation);
    const list=doc.createElement('ul');panel.appendChild(list);
    for(const item of last.checklist)text('li',item,list);
    text('p',last.warning);
    const status=text('p',last.verification);status.id='workerVerification';status.style.fontWeight='700';
    const details=doc.createElement('details');panel.appendChild(details);
    text('summary','Permit-stage documents and official references',details);
    text('p',last.documentation,details);text('p',last.scope,details);
    for(const source of last.sources){const p=text('p','',details);const a=doc.createElement('a');a.href=source.url;
      a.target='_blank';a.rel='noopener noreferrer';a.textContent=source.label;p.appendChild(a);}
    panel.classList.remove('hidden');
  }));
  doc.getElementById('sendToEmail')?.addEventListener('click',()=>setTimeout(()=>{
    if(!last||output.classList.contains('hidden'))return;
    const scope=doc.getElementById('scope');
    if(scope){scope.value=withWorkerSummary(scope.value,last);scope.dispatchEvent(new Event('input',{bubbles:true}));}
  }));
  return true;
}
// The existing rule-module import is the entry point; no GIS dependency or storage.
if(typeof document !== 'undefined'){
  installQualificationsUI(document);
  installResultWorkflow(document,getWorkQualifications);
}
