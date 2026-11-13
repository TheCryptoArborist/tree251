/* Email access v0.2.5: expose the existing prepared draft beside the result.
 * Reuses the screened-result handoff and email builder; no rule changes,
 * network requests, storage, automatic mail-client launch or sending.
 */
export const EMAIL_ACCESS_VERSION = '0.2.5';
export function installEmailAccess(doc) {
  const el = id => doc.getElementById(id);
  const output = el('permitOutput'), transfer = el('sendToEmail');
  const workForm = el('workForm'), emailCard = el('emailCard');
  const permitForm = el('permitForm'), prepare = el('prepare');
  if (!output || !transfer || !workForm || !emailCard || !permitForm || !prepare || output.dataset.emailAccess) return false;
  const win = doc.defaultView;
  const make = (tag, text, parent) => { const n=doc.createElement(tag);n.textContent=text;if(parent)parent.appendChild(n);return n; };
  const cta=make('section','');cta.id='forestryEmailCTA';cta.className='notice';
  cta.setAttribute('aria-labelledby','forestryEmailCTATitle');
  make('h3','Ask Urban Forestry about this result',cta).id='forestryEmailCTATitle';
  make('p','Your answers can fill in a message to forestry@cityofmobile.gov. Review it and add any missing details before you send it.',cta);
  const actions=make('div','',cta);actions.className='actions no-print';
  const review=make('button','Review my email to Urban Forestry',actions);
  review.type='button';review.id='reviewForestryEmail';review.setAttribute('aria-controls','emailCard');
  const note=make('p','Nothing is sent automatically. No address search is needed to prepare a draft.',cta);note.className='help';
  const status=make('p','',cta);status.id='emailAccessStatus';status.className='status';status.setAttribute('role','status');
  (el('permitOutcome') || output.firstElementChild).insertAdjacentElement('afterend',cta);
  transfer.textContent='Review my email to Urban Forestry';
  transfer.classList.remove('secondary');transfer.setAttribute('aria-controls','emailCard');
  // Keep the actual editor near the results, before the optional map lookup.
  el('permitCard')?.insertAdjacentElement('afterend',emailCard);
  const title=el('emailTitle');if(title){title.textContent='Your email to Urban Forestry';title.tabIndex=-1;}
  const number=emailCard.querySelector('.number');if(number)number.textContent='✉';
  const empty=el('emptyDraft');if(empty)empty.textContent='After checking the tree, choose “Review my email to Urban Forestry” beside your result. Your prepared message will appear here.';
  const help=make('p','Add your property address, name and any missing work details before sending. You can edit the message below. Attach photographs separately in your email app.');
  help.id='emailReviewHelp';help.className='notice';
  el('draftArea')?.prepend(help);
  const edit=make('button','Add or change tree / contact details');edit.type='button';edit.className='secondary';edit.id='editForestryDetails';
  help.insertAdjacentElement('afterend',edit);
  edit.addEventListener('click',()=>{el('workCard')?.scrollIntoView({block:'start'});el('propertyAddress')?.focus({preventScroll:true});});
  const back=make('a','Back to my result');back.href='#permitOutput';back.className='button secondary';
  edit.insertAdjacentElement('afterend',back);
  const style=make('style','');style.textContent='#forestryEmailCTA{border-width:2px;margin:14px 0 20px}#forestryEmailCTA button{width:100%;white-space:normal}#emailCard{scroll-margin-top:16px}#editForestryDetails{margin:0 8px 14px 0}#emailReviewHelp{margin:0 0 12px}';doc.head.appendChild(style);
  let coreClick=false,busy=false,readyFingerprint=null;
  const fingerprint=()=>JSON.stringify([permitForm,workForm].flatMap(f=>[...f.querySelectorAll('input,select,textarea')].map(n=>[n.id,n.type==='checkbox'?n.checked:n.value])));
  const draftVisible=()=>el('draftArea') && !el('draftArea').classList.contains('hidden') && !!el('emailBody')?.value;
  const showDraft=()=>{title?.focus({preventScroll:true});emailCard.scrollIntoView({block:'start',behavior:'auto'});};
  const readDraft=()=>{
    if(busy)return;
    if(output.classList.contains('hidden')){status.textContent='Check the tree again before preparing an email from this result.';return;}
    if(doc.documentElement.dataset.checkerReady!=='true' || prepare.disabled){status.textContent='The email tool has not loaded. Refresh this hosted page and try again. Nothing has been sent.';return;}
    if(draftVisible() && readyFingerprint===fingerprint()){showDraft();return;} // Preserve edits on repeat clicks.
    busy=true;review.disabled=true;status.textContent='Preparing your editable email…';
    // Allow the existing result-capture listeners to finish before transferring.
    win.setTimeout(()=>{
      try{
        if(output.classList.contains('hidden')){status.textContent='Your answers changed. Check the tree again before preparing this email.';return;}
        coreClick=true;try{transfer.click();}finally{coreClick=false;}
        if(output.classList.contains('hidden')){status.textContent='Your answers changed. Check the tree again before preparing this email.';return;}
        if(!workForm.checkValidity()){
          status.textContent='Please correct the highlighted detail, then choose “Prepare Forestry email”.';
          el('workCard')?.scrollIntoView({block:'start'});workForm.reportValidity();return;
        }
        // This invokes the local draft builder, not an email submission.
        if(typeof workForm.requestSubmit==='function')workForm.requestSubmit(prepare);else prepare.click();
        win.setTimeout(()=>{
          if(!draftVisible()){status.textContent='The draft could not be opened. Add your tree details below and choose “Prepare Forestry email”.';return;}
          readyFingerprint=fingerprint();
          status.textContent='Your prepared email is ready below. Review it, add missing details, then copy it or open your email app. Nothing has been sent.';
          showDraft();
        },0);
      }finally{busy=false;review.disabled=false;}
    },0);
  };
  review.addEventListener('click',readDraft);
  // Catch the bottom button before its legacy capture listener. The internal
  // guarded click still executes that listener exactly once, preserving checks.
  output.addEventListener('click',e=>{
    if(coreClick || !transfer.contains(e.target))return;
    e.preventDefault();e.stopImmediatePropagation();readDraft();
  },true);
  for(const form of [permitForm,workForm])for(const name of ['input','change'])form.addEventListener(name,()=>{readyFingerprint=null;status.textContent='';});
  const footer=doc.querySelector('footer');if(footer)make('span',' · Email access '+EMAIL_ACCESS_VERSION,footer);
  output.dataset.emailAccess=EMAIL_ACCESS_VERSION;
  return true;
}
