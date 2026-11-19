/* Three-stage mobile navigation shared by Tree work and Digging.
 * Presentation only. Keeps one property GIS map, one questionnaire, one result,
 * and one editable email. Switching stages does not change permit logic.
 */
export const STEP_NAV_VERSION='0.8.4';
export function installStepNav(doc){
 const $=id=>doc.getElementById(id),win=doc.defaultView,root=$('treeTaskTabs'),
       flow=$('treeTaskSharedFlow'),form=$('permitForm'),output=$('permitOutput');
 if(!root||!flow||!form||!output||$('treeStepNavigation'))return false;
 const make=(tag,text,parent)=>{const n=doc.createElement(tag);n.textContent=text;if(parent)parent.append(n);return n;};
 const nav=make('nav','',root);nav.id='treeStepNavigation';nav.className='card';nav.setAttribute('aria-label','Checker progress');
 const legend=make('p','Complete these sections in order. Your answers stay in place as you move between them.',nav);
 legend.className='help';legend.id='treeStepHint';
 const controls=make('div','',nav);controls.id='treeStepButtons';
 const defs=[
  {key:'property',label:'1. Property & map',short:'Address and tree pin'},
  {key:'work',label:'2. Work details',short:'Tree or digging questions'},
  {key:'results',label:'3. Result & next steps',short:'City requirements and email'}
 ];
 const buttons=new Map();
 for(const def of defs){
  const button=make('button','',controls);button.type='button';button.id='step-'+def.key;
  button.setAttribute('aria-controls',def.key==='property'?'propertyMapCard':def.key==='work'?'permitForm':'permitOutput');
  button.setAttribute('aria-pressed','false');button.dataset.step=def.key;
  make('strong',def.label,button);make('span',def.short,button);
  buttons.set(def.key,button);
 }
 const message=make('p','',nav);message.id='treeStepMessage';message.className='help';
 const workActions=make('div','',nav);workActions.id='treeStepActions';workActions.className='actions';
 // Keep the forward action out of the progress header. It belongs AFTER the
 // property/map review, so it cannot become the first prominent shortcut.
 const next=make('button','Continue to work details');next.type='button';next.id='stepContinueWork';
 const back=make('button','Back to property & map',workActions);back.type='button';back.id='stepBackProperty';back.className='secondary';
 // The top task tabs are a different choice; keep this subnavigation underneath
 // their task introductions while maintaining a single source of truth.
 const firstPanel=$('treeWorkPanel');firstPanel?.before(nav);
 const mountPropertyContinue=()=>{
  const card=$('propertyMapCard');if(!card)return false;
  let footer=$('propertyMapContinue');
  if(!footer){
   footer=make('div','',card);footer.id='propertyMapContinue';footer.className='property-map-continue';
   const guidance=make('p','Review the address and tree location above before moving on. If the map is unavailable, you can continue and answer missing location questions manually.',footer);
   guidance.className='help';
  }
  footer.append(next);
  return true;
 };
 if(!mountPropertyContinue()){
  const attach=new win.MutationObserver(()=>{if(mountPropertyContinue())attach.disconnect();});
  attach.observe(doc.body,{childList:true,subtree:true});
 }
 let stage='property',activeTask=root.dataset.activeTask||'tree-work',stageEpoch=0;
 // Later stages unlock only after the user deliberately completes the map
 // step or chooses the bottom/manual continuation action.
 let propertyAdvanced=false;
 const labels={'property':'Property & map','work':'Work details','results':'Result & next steps'};
 const scrollHere=()=>{
  nav.scrollIntoView({behavior:'auto',block:'start'});
  win.requestAnimationFrame(()=>win.dispatchEvent(new win.Event('resize')));
 };
 const update=()=>{
  root.dataset.activeStep=stage;
  const valid=!output.classList.contains('hidden');
  for(const [key,button] of buttons){
   const on=stage===key;
   button.setAttribute('aria-pressed',String(on));
   button.setAttribute('aria-current',on?'step':'false');
   button.disabled=key!=='property'&&!propertyAdvanced;
  }
  next.hidden=stage!=='property';
  back.hidden=stage!=='work';
  workActions.hidden=stage!=='work';
  if(stage==='results'&&!valid)message.textContent='No current result yet. Open Work details, then run the check.';
  else if(stage==='results')message.textContent='This is a screening result, not City authorization. The full record is available below if needed.';
  else if(stage==='property')message.textContent='Start with the City address lookup, or continue manually if the map is unavailable.';
  else message.textContent='Confirm the proposed work and submit the check. Your map results are retained.';
  nav.setAttribute('aria-label',activeTask==='digging'?'Digging check progress':'Tree work check progress');
 };
 const setStage=(key,opts={})=>{
  if(!buttons.has(key))return;
  if(key==='results'&&output.classList.contains('hidden')){
   stage='work';update();
   message.textContent='Complete the work questions and run the check before viewing results.';
   if(opts.scroll!==false)scrollHere();
   return;
  }
  stage=key;if(key!=='property')propertyAdvanced=true;
  stageEpoch++;update();
  if(opts.scroll!==false)scrollHere();
 };
 for(const [key,button] of buttons)button.addEventListener('click',()=>setStage(key));
 next.addEventListener('click',()=>setStage('work'));
 back.addEventListener('click',()=>setStage('property'));
 // The map still performs its own GIS checking and answer invalidation.
 // Transition AFTER its existing click logic has copied the location answers.
 doc.addEventListener('click',e=>{
  const target=e.target?.closest?.('button,a');
  if(!target)return;
  if(target.id==='applyMapAnswers'||target.id==='skipPropertyMap'){
   const currentEpoch=stageEpoch;
   win.queueMicrotask(()=>{if(stageEpoch===currentEpoch&&stage==='property')setStage('work');});
  }
  // Method and excavation-location follow-ups belong to the editable job
  // stage. Switch before the original click handler scrolls to its control.
  if(['digQuickRootFollow','digQuickAreaFollow','digQuickConfirm','digQuickPrepare'].includes(target.id)){
   setStage('work',{scroll:false});
  }
  if(['reviewForestryEmail','sendToEmail'].includes(target.id)){
   root.dataset.stepEmailOpen='yes';
   if(!output.classList.contains('hidden'))setStage('results',{scroll:false});
  }
 },true);
 // Preserve the long record and contractor evidence, but make the digging
 // result a single concise panel until the user elects to view details.
 const technical=make('details','');technical.id='diggingFullRecordDetails';
 make('summary','View contractor qualifications and full screening record',technical);
 const record=$('resultWorkflow'),workers=$('workerQualifications');
 const sources=[record,workers].filter(Boolean),origins=new Map();
 for(const node of sources){const marker=doc.createComment('step-original-'+node.id);node.before(marker);origins.set(node,marker);}
 output.append(technical);
 const syncDetails=()=>{
  if(activeTask==='digging'){
   for(const node of sources)technical.append(node);
   technical.hidden=false;
  }else{
   for(const node of sources){const origin=origins.get(node);if(origin.parentNode)origin.after(node);}
   technical.hidden=true;technical.open=false;
  }
 };
 const observer=new win.MutationObserver(()=>{
  if(root.dataset.activeTask===activeTask)return;
  activeTask=root.dataset.activeTask||'tree-work';
  root.dataset.stepEmailOpen='no';
  syncDetails();
  // Work scope has changed; do not present the previous task's result.
  if(stage==='results')setStage('work',{scroll:false});
  else update();
 });
 observer.observe(root,{attributes:true,attributeFilter:['data-active-task']});
 form.addEventListener('submit',()=>{
  const currentEpoch=stageEpoch;
  win.setTimeout(()=>{
   if(stageEpoch===currentEpoch&&!output.classList.contains('hidden'))setStage('results');
  },200);
 });
 form.addEventListener('input',()=>{
  if(stage==='results')setStage('work',{scroll:false});
  root.dataset.stepEmailOpen='no';
 });
 form.addEventListener('change',()=>{
  if(stage==='results')setStage('work',{scroll:false});
 });
 const addr=$('propertyMapAddress');
 const bindAddr=()=>{
  const n=$('propertyMapAddress');
  if(!n||n.dataset.stepNavigationBound)return false;
  n.dataset.stepNavigationBound='true';
  n.addEventListener('input',e=>{
   if(e.isTrusted){root.dataset.stepEmailOpen='no';if(stage==='results')setStage('property',{scroll:false});}
  });
  return true;
 };
 if(!bindAddr()){
  const check=new win.MutationObserver(()=>{if(bindAddr())check.disconnect();});
  check.observe(doc.body,{childList:true,subtree:true});
 }
 const style=make('style','',doc.head);
 style.textContent=[
 '#treeStepNavigation{margin:12px 0 16px;padding:12px;scroll-margin-top:88px}',
 '#treeStepButtons{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}',
 '#treeStepButtons button{border:1px solid var(--line);background:var(--wash);color:var(--ink);border-radius:9px;min-width:0;white-space:normal;text-align:left;padding:11px;min-height:75px;overflow-wrap:anywhere}',
 '#treeStepButtons button[aria-pressed="true"]{background:var(--green);border-color:var(--green);color:white;box-shadow:inset 0 -3px var(--amberline)}',
 '#treeStepButtons button:disabled{cursor:default;opacity:.65;box-shadow:none}',
 '#treeStepButtons button strong{display:block;font-size:14px;line-height:1.25}',
 '#treeStepButtons button span{display:block;font-size:11px;margin-top:5px;line-height:1.3}',
 '#treeStepButtons button:focus-visible{outline:3px solid #bd7725;outline-offset:2px}',
 '#treeStepMessage{margin:12px 0 0}',
 '#treeStepActions{margin-top:9px}',
 '#treeStepActions[hidden],#treeStepActions button[hidden],#propertyMapContinue button[hidden],#diggingFullRecordDetails[hidden]{display:none!important}',
 '#propertyMapContinue{margin-top:24px;padding-top:18px;border-top:1px solid var(--line)}',
 '#propertyMapContinue .help{margin:0 0 12px}',
 '#propertyMapContinue button{width:100%;max-width:680px}',
 '#treeTaskTabs[data-active-step="property"] #permitCard,#treeTaskTabs[data-active-step="property"] #emailCard,#treeTaskTabs[data-active-step="property"] #workCard{display:none!important}',
 '#treeTaskTabs[data-active-step="work"] #propertyMapCard,#treeTaskTabs[data-active-step="work"] #permitOutput,#treeTaskTabs[data-active-step="work"] #emailCard,#treeTaskTabs[data-active-step="work"] #workCard{display:none!important}',
 '#treeTaskTabs[data-active-step="results"] #propertyMapCard,#treeTaskTabs[data-active-step="results"] #permitForm,#treeTaskTabs[data-active-step="results"] #permitCard>.stephead,#treeTaskTabs[data-active-step="results"] #permitReady{display:none!important}',
 '#treeTaskTabs[data-active-step="results"]:not([data-step-email-open="yes"]) #emailCard,#treeTaskTabs[data-active-step="results"]:not([data-step-email-open="yes"]) #workCard{display:none!important}',
 '#treeTaskTabs[data-active-task="digging"][data-active-step="results"] #simplePermitAnswer,#treeTaskTabs[data-active-task="digging"][data-active-step="results"] #permitOutput>.tag{display:none!important}',
 '#diggingFullRecordDetails{margin:18px 0;padding:12px;border-top:1px solid var(--line)}',
 '#diggingFullRecordDetails>summary{font-size:14px;font-weight:650;cursor:pointer}',
 '@media(max-width:450px){#treeStepNavigation{padding:10px}#treeStepButtons{gap:5px}#treeStepButtons button{padding:9px 6px;min-height:72px}#treeStepButtons button strong{font-size:12px}#treeStepButtons button span{font-size:10px}}',
 '@media print{#treeStepNavigation{display:none!important}}'
 ].join('');
 syncDetails();update();
 const footer=doc.querySelector('footer');if(footer)make('span',' · Step navigation '+STEP_NAV_VERSION,footer);
 return true;
}
