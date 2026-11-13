/* Result handoff v0.2.3. No permit rules, GIS lookups, storage or email sending.
 * Capture displayed findings after screening. Keep them out of the user's plan
 * textarea, replace them on re-screening, and invalidate drafts when facts change.
 */
export const WORKFLOW_VERSION = '0.2.3';
const START = '--- BEGIN TREE251 SCREENING SUMMARY ---';
const END = '--- END TREE251 SCREENING SUMMARY ---';
export const APPLICATION_GUIDANCE = 'https://www.cityofmobile.gov/public-works/tree-trimming-removal-permits/';
export function replaceScreeningSummary(value = '', summary = '') {
  let text = String(value);
  let start = text.indexOf(START);
  while (start >= 0) {
    const end = text.indexOf(END, start);
    if (end < 0) break; // Do not discard an unbounded user edit.
    text = text.slice(0, start) + text.slice(end + END.length);
    start = text.indexOf(START);
  }
  return [text.trimEnd(), summary ? `${START}\n${summary}\n${END}` : '']
    .filter(Boolean).join('\n\n');
}
export function formatScreeningSummary(s) {
  const sections = [
    'TREE251 — PRELIMINARY SCREENING RECORD',
    `Prepared: ${s.createdAt} | Workflow ${WORKFLOW_VERSION}`,
    'Based on reported answers. This is not a City permit, verified property boundary, or authorization to work.',
    '', 'ANSWERS USED',
    ...s.answers.map(([label, value]) => `${label}: ${value}`),
    '', 'CHAPTER 65 — TREE APPROVAL', s.permit.title, s.permit.reason,
    s.permit.missing, `Next action: ${s.permit.next}`,
    '', 'CHAPTER 64 — LANDSCAPE / DEVELOPMENT', s.udc.title,
    s.udc.reason, s.udc.missing, `Next action: ${s.udc.next}`,
    '', 'WHO MAY PERFORM THE WORK?'
  ];
  if (s.worker) sections.push(s.worker.requirement, ...s.worker.checklist,
    s.worker.warning, s.worker.verification);
  else sections.push('No public-tree contractor determination was made for this reported location. This is not verification of a contractor or a finding that every contractor is eligible.');
  sections.push('', 'ADDITIONAL LIMITATIONS', s.permit.notes, s.udc.notes,
    'An email request is not an application or an issued approval. This record does not waive plan conditions or verify an ISA credential.',
    '', 'REFERENCES', ...s.sources,
    `Official City application instructions (when applicable): ${APPLICATION_GUIDANCE}`);
  return sections.filter(x => x !== undefined && x !== null).join('\n');
}
const FIELD_LABELS = Object.freeze({
  scCity:'City limits (reported)', scLocation:'Tree location (reported)',
  scWork:'Proposed work', scProperty:'Property type', scHistoric:'Local historic district',
  scSpecies:'Tree species', scDbh:'Trunk DBH (inches)', scLimb:'Largest proposed limb (inches)',
  scExtra:'Other restrictions', scStorm:'Suspected storm damage (unverified)',
  udcZoning:'Zoning (reported)', udcOverlay:'Special district / planned development',
  udcPlan:'Approved site / landscape plan', udcRequiredTree:'Required or preserved tree',
  udcCredit:'Preservation credit', udcBuffer:'Required landscape / buffer',
  udcDevelopment:'Construction / redevelopment / plan change'
});
export function installResultWorkflow(doc, getWorkQualifications) {
  const byId = id => doc.getElementById(id);
  const form = byId('permitForm'), output = byId('permitOutput');
  const transfer = byId('sendToEmail'), workForm = byId('workForm');
  if (!form || !output || !transfer || !workForm || form.dataset.resultWorkflow) return false;
  form.dataset.resultWorkflow = WORKFLOW_VERSION;
  const win = doc.defaultView;
  const event = name => new win.Event(name, {bubbles:true});
  const content = id => byId(id)?.textContent?.trim() || '';
  const values = () => Object.keys(FIELD_LABELS).map(id => {
    const n=byId(id); return [id, n?.type==='checkbox' ? n.checked : n?.value ?? ''];
  });
  const fingerprint = () => JSON.stringify(values());
  const qualificationsInput = () => ({jurisdiction:byId('scCity')?.value,
    location:byId('scLocation')?.value,work:byId('scWork')?.value});
  let snapshot=null, generation=0, draftGeneration=0, transferring=false;
  let preparedSnapshot=null, linkedFingerprint=null;
  const create = (tag,text,parent) => {
    const n=doc.createElement(tag); if(text)n.textContent=text; if(parent)parent.appendChild(n); return n;
  };
  const status = create('p',''); status.id='resultWorkflowStatus'; status.className='status';
  status.setAttribute('role','status'); form.insertAdjacentElement('afterend',status);
  const panel=create('section',''); panel.id='resultWorkflow'; panel.className='divider hidden';
  panel.setAttribute('aria-labelledby','resultWorkflowTitle');
  create('h3','Next steps and your screening record',panel).id='resultWorkflowTitle';
  create('p','Use the approval route above. A separate review recommendation is not a tree permit. The City instructions distinguish right-of-way and private-property applications.',panel).className='help';
  const actions=create('div','',panel); actions.className='actions no-print';
  const official=create('a','City application instructions',actions);
  official.className='button secondary';official.href=APPLICATION_GUIDANCE;
  official.target='_blank';official.rel='noopener noreferrer';
  const copy=create('button','Copy screening summary',actions);copy.type='button';copy.className='secondary';copy.id='copyScreeningSummary';
  const save=create('button','Save screening summary',actions);save.type='button';save.className='secondary';save.id='saveScreeningSummary';
  const details=create('details','',panel);create('summary','View the complete screening record',details);
  const label=create('label','Reported answers, both findings, and worker requirements',details);label.htmlFor='screeningRecord';
  const record=create('textarea','',details);record.id='screeningRecord';record.readOnly=true;record.rows=16;
  const actionStatus=create('p','',panel);actionStatus.id='screeningRecordStatus';actionStatus.className='status';actionStatus.setAttribute('role','status');
  output.insertBefore(panel,transfer.parentElement);
  // Repair the legacy select markup so its options can actually retain the handoff.
  const location=byId('location');
  const locationOptions=['Unknown / boundary not verified','Public street right-of-way — reported, not verified',
    'Private property — reported, not verified','City park — reported, not verified','Other City property — reported, not verified'];
  if (location && locationOptions.some(value=>![...location.options].some(o=>o.value===value))) {
    const prior=location.value;location.replaceChildren();
    for(const value of locationOptions){const opt=create('option',value,location);opt.value=value;}
    location.value=locationOptions.includes(prior)?prior:locationOptions[0];
  }
  const disableDraft = () => {
    draftGeneration++; preparedSnapshot=null;
    byId('draftArea')?.classList.add('hidden');byId('emptyDraft')?.classList.remove('hidden');
    const link=byId('openEmail');if(link){link.removeAttribute('href');link.setAttribute('aria-disabled','true');}
  };
  const invalidate = () => {
    const had=!!snapshot;generation++;snapshot=null;linkedFingerprint=null;record.value='';panel.classList.add('hidden');
    output.classList.add('hidden');disableDraft();
    if(had)status.textContent='Answers changed. Check requirements again before using or emailing this result. Your work notes have been kept.';
  };
  form.addEventListener('input',invalidate);form.addEventListener('change',invalidate);
  // Original rendering is synchronous; capture once all existing listeners finish.
  form.addEventListener('submit',()=>{
    const token=++generation;disableDraft();
    win.setTimeout(()=>{
      if(token!==generation||output.classList.contains('hidden')||!content('permitOutcome'))return;
      const answers=Object.entries(FIELD_LABELS).map(([id,label])=>{
        const n=byId(id);const value=n?.type==='checkbox'?(n.checked?'Yes — observation only':'No reported concern'):
          n?.tagName==='SELECT'?n.selectedOptions[0]?.textContent?.trim():n?.value;
        return [label,value||'Unknown / not supplied'];
      });
      const sources=[...output.querySelectorAll('#permitSources a,#udcSources a')].map(a=>`${a.textContent}: ${a.href}`);
      const worker=getWorkQualifications(qualificationsInput());
      if(worker)for(const source of worker.sources)sources.push(`${source.label}: ${source.url}`);
      snapshot={fingerprint:fingerprint(),createdAt:new Date().toISOString(),answers,
        permit:{title:content('permitOutcome'),reason:content('permitReason'),missing:content('permitMissing'),next:content('permitNext'),notes:content('permitNotes')},
        udc:{title:content('udcOutcome'),reason:content('udcReason'),missing:content('udcMissing'),next:content('udcNext'),notes:content('udcNotes')},worker,sources};
      record.value=formatScreeningSummary(snapshot);panel.classList.remove('hidden');
      actionStatus.textContent='';status.textContent='Screening updated. Nothing has been submitted to the City; contractor credentials remain unverified.';
    },0);
  });
  const current = () => snapshot && snapshot.fingerprint===fingerprint() && !output.classList.contains('hidden');
  // Replace the legacy append-to-scope listener rather than leaving contradictory summaries.
  transfer.addEventListener('click',e=>{
    e.preventDefault();e.stopImmediatePropagation();
    if(!current()){invalidate();status.textContent='Check requirements again before transferring the result.';return;}
    const loc={private:locationOptions[2],row:locationOptions[1],park:locationOptions[3],'city-property':locationOptions[4]};
    const works={removal:'removal',pruning:'pruning',root:'root or construction work',clearing:'other',relocation:'other',planting:'other'};
    transferring=true;
    try {
      const entries={location:loc[byId('scLocation').value]||locationOptions[0],work:works[byId('scWork').value]||'other',
        species:byId('scSpecies').selectedOptions[0]?.textContent||'',dbh:byId('scDbh').value,
        limbDiameter:byId('scWork').value==='pruning'?byId('scLimb').value:''};
      for(const [id,value] of Object.entries(entries)){const n=byId(id);if(n){n.value=value;n.dispatchEvent(event('input'));}}
      byId('storm').checked=byId('scStorm').checked;byId('storm').dispatchEvent(event('input'));
    } finally {transferring=false;}
    linkedFingerprint=snapshot.fingerprint;
    disableDraft();
    status.textContent='Tree details copied. Add your location, objectives and work notes below, then prepare the email. Both findings and worker requirements will be attached separately.';
    byId('workCard')?.scrollIntoView({behavior:'smooth',block:'start'});
  },true);
  const workChanged = e => {
    disableDraft();
    if(!transferring && ['location','work','species','dbh','limbDiameter','storm'].includes(e.target?.id) && snapshot) {
      invalidate();status.textContent='Tree details changed in the email form. Update the permit questions and check again to include a matching screening. Manual guidance emails remain available.';
    }
  };
  workForm.addEventListener('input',workChanged);workForm.addEventListener('change',workChanged);
  // Append outside the scope field: the legacy scope formatter is length-limited.
  workForm.addEventListener('submit',()=>{
    const version=++draftGeneration;const used=current()&&linkedFingerprint===snapshot.fingerprint?snapshot:null;
    win.setTimeout(()=>{
      if(version!==draftGeneration||byId('draftArea')?.classList.contains('hidden'))return;
      const body=byId('emailBody');if(!body)return;
      body.value=replaceScreeningSummary(body.value,used?formatScreeningSummary(used):'');
      preparedSnapshot=used;
      body.dispatchEvent(event('input')); // Refresh the encoded mailto with the full text.
      byId('openEmail')?.removeAttribute('aria-disabled');
      if(used)byId('draftStatus').textContent='Both findings and worker requirements are included. Review the draft; attach photos separately. For this long message use Copy draft or Save text rather than risking a shortened email link.';
    },0);
  });
  // Fail closed on a stale visible draft, including programmatic form changes.
  for(const id of ['openEmail','copyEmail','saveEmail'])byId(id)?.addEventListener('click',e=>{
    if(byId('draftArea')?.classList.contains('hidden')||(preparedSnapshot&&(!current()||preparedSnapshot!==snapshot))){
      e.preventDefault();e.stopImmediatePropagation();disableDraft();status.textContent='Prepare a fresh email from the current answers.';
    }
  },true);
  copy.addEventListener('click',async()=>{
    if(!current()){invalidate();return;}
    try{await win.navigator.clipboard.writeText(record.value);actionStatus.textContent='Screening summary copied. Nothing was sent.';}
    catch{details.open=true;record.focus();record.select();actionStatus.textContent='Automatic copy is unavailable. The complete record is selected for manual copying.';}
  });
  save.addEventListener('click',()=>{
    if(!current()){invalidate();return;}
    const url=win.URL.createObjectURL(new win.Blob([record.value],{type:'text/plain;charset=utf-8'}));
    const a=create('a','',doc.body);a.href=url;a.download='tree251-screening-'+snapshot.createdAt.replace(/[:.]/g,'-')+'.txt';a.click();a.remove();
    win.setTimeout(()=>win.URL.revokeObjectURL(url),1000);actionStatus.textContent='A text-file save was requested. This is a screening record, not a permit.';
  });
  return true;
}
