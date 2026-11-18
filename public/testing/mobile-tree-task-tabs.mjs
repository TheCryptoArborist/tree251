/* Task navigation v0.6.0. Presentation/routing only; no permit-rule changes.
 * One shared form, map and result editor move between two accessible panels.
 * Switching tasks changes work scope and invalidates results through existing
 * input/change handlers; it never clears site facts or authorizes excavation.
 */
export const TASK_TABS_VERSION='0.6.0';
export function installTaskTabs(doc){
 const $=id=>doc.getElementById(id),win=doc.defaultView;
 const permit=$('permitCard'),form=$('permitForm'),work=$('scWork');
 if(!permit||!form||!work||!$('diggingFields')||$('treeTaskTabs'))return false;
 const make=(tag,text,parent)=>{const n=doc.createElement(tag);if(text)n.textContent=text;if(parent)parent.append(n);return n;};
 const root=make('section','');root.id='treeTaskTabs';root.dataset.version=TASK_TABS_VERSION;
 permit.before(root);
 const nav=make('div','',root);nav.className='card task-choice';
 const title=make('h2','What do you need to check?',nav);title.id='taskChoiceTitle';
 make('p','Choose the type of work. The same property lookup supports both checks.',nav);
 const list=make('div','',nav);list.id='treeTaskTablist';list.setAttribute('role','tablist');list.setAttribute('aria-labelledby',title.id);
 const definitions=[
  {key:'tree-work',id:'treeWorkTab',panel:'treeWorkPanel',label:'Tree work',sub:'Pruning, removal or planting',heading:'Check tree-work permits',text:'Find the approval route for pruning, removal, planting or other tree work. A job that also disturbs roots can include the digging check without starting over.'},
  {key:'digging',id:'diggingTab',panel:'diggingTaskPanel',label:'Digging near trees',sub:'Utilities, trenches and root disturbance',heading:'Check work near tree roots',text:'Start here for digging, utility installation, sidewalks, driveways or other ground work—even when the tree will remain. Review root protections and the applicable approval route; distance alone is not permission to dig.'}
 ];
 const buttons=new Map(),panels=new Map();
 for(const d of definitions){
  const b=make('button','',list);b.type='button';b.id=d.id;b.setAttribute('role','tab');b.setAttribute('aria-controls',d.panel);b.setAttribute('aria-selected','false');b.tabIndex=-1;
  make('strong',d.label,b);make('span',d.sub,b);
  const panel=make('div','',root);panel.id=d.panel;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',d.id);panel.tabIndex=0;panel.hidden=true;
  const intro=make('div','',panel);intro.className='task-intro';make('h2',d.heading,intro);make('p',d.text,intro);
  buttons.set(d.key,b);panels.set(d.key,panel);
 }
 const stateNote=make('p','Your address, map pin and measurements are shared. After changing the work type, run the check again.',nav);stateNote.className='help';
 const announce=make('p','',nav);announce.id='taskChangeStatus';announce.className='help';announce.setAttribute('aria-live','polite');
 const flow=make('div','');flow.id='treeTaskSharedFlow';
 // Keep IDs and live DOM nodes unchanged, including Leaflet and email edits.
 for(const id of ['propertyMapCard','permitCard','emailCard','workCard']){const n=$(id);if(n)flow.append(n);}
 const activityBox=work.parentElement;activityBox.dataset.taskField='activity';
 const companion=$('digAlso')?.closest('div.full');if(companion)companion.dataset.taskField='companion';
 const limb=$('scLimb');if(limb)limb.parentElement.dataset.taskField='limb';
 const storm=$('scStorm')?.closest('div.full');if(storm)storm.dataset.taskField='storm';
 const style=make('style','',doc.head);style.textContent=[
 '#treeTaskTabs{min-width:0}',
 '#treeTaskTabs [role="tabpanel"][hidden]{display:none!important}',
 '#treeTaskTablist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:16px 0 12px}',
 '#treeTaskTablist [role="tab"]{display:block;min-width:0;width:100%;min-height:88px;padding:14px;text-align:left;white-space:normal;background:var(--wash);border:2px solid var(--line);color:var(--ink);border-radius:10px;line-height:1.35;overflow-wrap:anywhere}',
 '#treeTaskTablist [role="tab"][aria-selected="true"]{background:var(--green);border-color:var(--green);color:#fff;box-shadow:inset 0 -4px 0 var(--amberline)}',
 '#treeTaskTablist strong{display:block;font-size:18px}',
 '#treeTaskTablist span{display:block;font-size:13px;font-weight:450;margin-top:6px}',
 '#treeTaskTablist [role="tab"]:focus-visible{outline:3px solid #bd7725;outline-offset:3px}',
 '#treeTaskTabs .task-choice{margin-top:8px}',
 '#treeTaskTabs .task-intro{padding:8px 3px 0}',
 '#treeTaskTabs .task-intro p{color:var(--muted);font-size:15px}',
 '#treeTaskTabs[data-active-task="digging"] [data-task-field="activity"],#treeTaskTabs[data-active-task="digging"] [data-task-field="companion"],#treeTaskTabs[data-active-task="digging"] [data-task-field="limb"],#treeTaskTabs[data-active-task="digging"] [data-task-field="storm"]{display:none!important}',
 '#taskChangeStatus:empty{display:none}',
 '@media(max-width:480px){#treeTaskTablist{gap:8px}#treeTaskTablist [role="tab"]{padding:12px 10px}#treeTaskTablist strong{font-size:16px}#treeTaskTablist span{font-size:12px}}',
 '@media print{#treeTaskTablist,#treeTaskTabs .task-choice,#treeTaskTabs .task-intro{display:none}}'
 ].join('');
 let active=null,changing=false,savedTreeWork=['root','roots'].includes(work.value)?'removal':work.value;
 let savedLimbDisabled=null;
 // Existing asynchronous control initializers must not re-enable an input
 // belonging only to the inactive task and trigger hidden-field validation.
 if(limb)new win.MutationObserver(()=>{
  if(active==='digging'&&!limb.disabled)limb.disabled=true;
 }).observe(limb,{attributes:true,attributeFilter:['disabled']});
 const isDigging=()=>['root','roots'].includes(work.value);
 const emit=n=>{n.dispatchEvent(new win.Event('input',{bubbles:true}));n.dispatchEvent(new win.Event('change',{bubbles:true}));};
 function updateText(){
  const digging=active==='digging';
  const h=$('permitTitle');if(h)h.textContent=digging?'Tell us about the tree and the excavation':'Tell us about the tree work';
  const intro=permit.querySelector('.stephead .muted');if(intro)intro.textContent=digging?'Use the shared property lookup, then describe the trunk size, digging distance and how roots will be handled. You do not need to complete a removal application first.':'Confirm the property details, choose the tree work and check the applicable requirements. Include digging if it is part of the same job.';
  const submit=$('screenNow');if(submit)submit.textContent=digging?'Check digging and root requirements':'Check tree-work requirements';
  const heading=doc.querySelector('.hero h1');if(heading)heading.textContent='Check tree work or digging near a tree.';
  const lead=doc.querySelector('.hero .lead');if(lead)lead.textContent='Choose the task below. Use City map information and a few details about the tree to check the relevant requirements.';
 }
 function activate(next,{url=true,fromWork=false,initial=false}={}){
  if(!panels.has(next))return;
  const changed=active!==next;
  if(changed&&next==='digging'&&!isDigging())savedTreeWork=work.value||'removal';
  active=next;root.dataset.activeTask=next;form.dataset.taskTab=next;
  panels.get(next).append(flow);
  for(const d of definitions){const on=d.key===next;panels.get(d.key).hidden=!on;buttons.get(d.key).setAttribute('aria-selected',String(on));buttons.get(d.key).tabIndex=on?0:-1;}
  if(!fromWork){
   const target=next==='digging'?'root':savedTreeWork;
   if(work.value!==target){changing=true;try{work.value=target;emit(work);}finally{changing=false;}}
  }
  // A stale or invalid pruning-only measurement must not block a root check.
  if(limb){
   if(next==='digging'){
    if(savedLimbDisabled===null)savedLimbDisabled=limb.disabled;
    limb.disabled=true;
   }else if(savedLimbDisabled!==null){limb.disabled=savedLimbDisabled;savedLimbDisabled=null;}
  }
  updateText();
  if(fromWork&&next==='digging'&&doc.activeElement===work)buttons.get(next).focus();
  if(changed&&!initial)announce.textContent=next==='digging'?'Digging check selected. Property and measurement entries are kept; run this check for the changed work scope.':'Tree-work check selected. Property and measurement entries are kept; run this check for the changed work scope.';
  if(url){try{win.history.replaceState(win.history.state,'','#'+next);}catch{/* File previews may not support history changes. */}}
  // Moving a rendered map preserves its state but may change available width.
  win.requestAnimationFrame(()=>win.dispatchEvent(new win.Event('resize')));
 }
 for(const d of definitions){
  const button=buttons.get(d.key);button.addEventListener('click',()=>activate(d.key));
  button.addEventListener('keydown',e=>{
   const keys=definitions.map(x=>x.key),index=keys.indexOf(d.key);let target;
   if(e.key==='ArrowRight')target=keys[(index+1)%keys.length];
   else if(e.key==='ArrowLeft')target=keys[(index-1+keys.length)%keys.length];
   else if(e.key==='Home')target=keys[0];else if(e.key==='End')target=keys.at(-1);
   if(target){e.preventDefault();buttons.get(target).focus();}
   // Enter/Space use native button activation (manual-activation tabs).
  });
 }
 work.addEventListener('change',()=>{
  if(changing)return;
  if(!isDigging())savedTreeWork=work.value||'removal';
  activate(isDigging()?'digging':'tree-work',{fromWork:true});
 });
 win.addEventListener('hashchange',()=>{
  const key=win.location.hash.slice(1);if(panels.has(key))activate(key,{url:false});
 });
 // Mapping loads asynchronously and inserts its card immediately before the
 // same permitCard. No clone, new lookup, or address reset is needed.
 let mapSeen=false;
 const observer=new win.MutationObserver(()=>{
  if(mapSeen||!$('propertyMapCard'))return;mapSeen=true;
  const mapCard=$('propertyMapCard');if(mapCard.parentElement!==flow)flow.prepend(mapCard);
  updateText();observer.disconnect();
 });
 if($('propertyMapCard')){mapSeen=true;}else observer.observe(doc.body,{childList:true,subtree:true});
 const requested=win.location.hash.slice(1);
 activate(panels.has(requested)?requested:isDigging()?'digging':'tree-work',{url:false,initial:true});
 // The original questionnaire enables controls later in the same module load.
 // Reapply the digging-only constraint after that initialization completes.
 win.setTimeout(()=>{if(active==='digging'&&limb)limb.disabled=true;updateText();},0);
 const footer=doc.querySelector('footer');if(footer)make('span',' · Task tabs '+TASK_TABS_VERSION,footer);
 return true;
}
