/* Plain-language presentation v0.2.4. Labels and help only.
 * Preserve every option value, selection, input, and regulatory decision.
 * No network calls, storage, geolocation, or automatic City submission.
 */
export const PLAIN_VERSION = '0.2.4';
export const FIELD_COPY = Object.freeze({
  scCity: {
    label:'Is the tree inside the City of Mobile?',
    options:{unknown:"I'm not sure",inside:'Yes, inside city limits',outside:'No, outside city limits'},
    help:'A Mobile mailing address does not necessarily mean the property is inside the City.'
  },
  scLocation: {
    label:'Where is the tree growing?',
    options:{unknown:"I'm not sure where the boundary is",private:'On a private lot, outside the street area',row:'In the public street area (right-of-way)',park:'In a City park','city-property':'On other City-owned land'},
    help:"Not sure whether it is private or public? Choose \"I'm not sure\" rather than guessing.",
    detail:'The public street area is called the right-of-way. It may include land beside the pavement or sidewalk. A sidewalk, curb, fence, or the fact that you mow the grass does not prove the boundary. A tree near a street can still be on private property.'
  },
  scWork: {
    label:'What do you want to do to the tree?',
    options:{removal:'Cut down or remove the whole tree',pruning:'Trim branches (prune)',root:'Dig or build near the roots',clearing:'Clear trees, brush or stumps from a site',relocation:'Move the tree to another location',planting:'Plant a new tree'},
    help:'Choose the whole job you are planning, not just one step of it.'
  },
  scProperty: {
    label:'What kind of property is this?',
    options:{unknown:"I'm not sure which describes it",developed:'House or duplex with a livable home',undeveloped:'Home lot that has not been developed',commercial:'Business or other non-home property',multifamily:'Apartments or another type of property'},
    help:'A livable home means an existing house or duplex fit to live in, even if no one lives there now.',
    detail:'Business and other non-home properties include shops, offices, factories, churches and similar sites. Do not assume an empty lot is a residential lot. For a vacant building, mixed uses, or a lot whose use you do not know, choose the unsure option. This question is about use; it does not verify zoning.'
  },
  scHistoric: {
    label:'Is this in a City-designated historic district?',
    options:{unknown:"I'm not sure",yes:'Yes, the City has designated it',no:'No, it is outside those districts'},
    help:'An old house or historic-looking neighborhood is not enough to answer Yes.',
    detail:'This means a historic district formally designated by the City of Mobile. A National Register listing is a different designation. The optional City map lookup below can help you investigate; leave this unsure until the correct local designation is known.'
  },
  scSpecies: {
    label:'What kind of tree is it?',
    help:"Use the name you know. Choose \"I'm not sure\" if you cannot identify it confidently."
  },
  scDbh: {
    label:'How wide is the trunk, in inches?',
    help:'Measure straight across the trunk at 4½ feet above the ground—not the distance around it.',
    detail:'This trunk measurement is called diameter at breast height, or DBH. Leave the box blank if you are unsure. A tree with several trunks, a low fork, or sloping ground may need an arborist to determine the correct measurement.'
  },
  scLimb: {
    label:'How thick is the largest branch you want cut?',
    help:'Enter its diameter in inches: the width across the branch, not its length.',
    detail:'This question is for branch trimming. It is not the trunk measurement. Leave it blank if you do not know. Do not climb the tree or cut a branch just to measure it; ask the arborist who will assess the work.'
  },
  scExtra: {
    label:'Could other restrictions or nearby public trees affect this job?',
    options:{unknown:"I'm not sure / I haven't checked",none:'No, I have checked',present:'Yes, or possibly'},
    help:'For example: digging near a street tree, a tree-protection condition, or limits on work along a property edge.',
    detail:'This catches restrictions not covered by the other questions. A simple tree-permit result does not clear construction, work on someone else’s land, or effects on nearby public trees. Not knowing of a restriction is not the same as confirming there is none.'
  },
  udcZoning: {
    label:"Do you know the City's zoning label for this property?",
    options:{unknown:"I'm not sure / I haven't checked",r1r2:'City records say R-1 or R-2',other:'City records show a different zone'},
    help:'Zoning is the City’s official land-use category. Having a house does not by itself establish R-1 or R-2.',
    detail:'Use the label on City zoning records, not just how the property is being used. Leave this unsure if you have not checked. These labels help decide which landscape rules need review; they do not prove that tree work is allowed.'
  },
  udcOverlay: {
    label:'Do City records show special area or development rules here?',
    options:{unknown:"I'm not sure / I haven't checked",none:'No special rules identified after checking',downtown:'Downtown Development District rules',springhill:'Springhill Overlay rules',planned:'Special approval for the development'},
    help:'Being near downtown or in the Spring Hill area does not by itself establish these designations.',
    detail:'Some areas and approved developments have rules in addition to ordinary zoning. “Overlay” means an extra set of rules for a mapped area. Choose a named designation only when it has been confirmed for this property.'
  },
  udcPlan: {
    label:'Has the City approved a building-site or landscaping plan here?',
    options:{unknown:"I'm not sure / I haven't seen the records",yes:'Yes, there is a City-approved plan',no:'No, I have checked the plan history'},
    help:'This means a plan approved by the City—not simply a drawing or estimate from a contractor.',
    detail:'A site plan shows how a property will be arranged, such as buildings, parking and landscaping. A landscape plan shows trees and other planting. An approval obtained by a previous owner can matter; not having a copy does not mean no plan exists.'
  },
  udcRequiredTree: {
    label:'Does that approved plan say this tree must be planted or kept?',
    options:{unknown:"I'm not sure / I haven't checked the plan",yes:'Yes, the plan requires this tree',no:'No, I have checked the plan'},
    help:'A tree marked to stay on an approved plan may need review before it is changed or removed.'
  },
  udcCredit: {
    label:'Was this tree counted toward the project’s required landscaping?',
    options:{unknown:"I'm not sure / I haven't checked",yes:'Yes, it received a landscaping credit',no:'No, I have checked the records'},
    help:'For example, an approved plan counted an existing tree toward the trees the project needed to provide.',
    detail:'This is called a tree-preservation or landscaping credit. It is not a tax credit or a payment. Check the approved plan and tree calculations; a tree’s size or age alone does not show whether it received credit.'
  },
  udcBuffer: {
    label:'Is this tree part of landscaping the City requires along an edge or parking area?',
    options:{unknown:"I'm not sure / I haven't checked",yes:'Yes, it is part of required landscaping',no:'No, I have checked the requirements'},
    help:'Examples include required trees along a street, around parking, or between neighboring properties.',
    detail:'A landscape buffer is planting that separates or screens one property use from another. Being beside a parking lot or fence does not prove that this tree is required. Check the approved plan or conditions; otherwise choose the unsure answer.'
  },
  udcDevelopment: {
    label:'Is the tree work part of building, expanding or changing the site?',
    options:{unknown:"I'm not sure of the full project",yes:'Yes, it is part of a building or site project',no:'No, this is only tree work'},
    help:'Examples: a building addition, new parking, site clearing, or a change to an approved property layout.'
  },
  species:{label:'What kind of tree is it? (if known)'},
  dbh:{label:'Trunk width in inches (DBH, if known)'},
  limbDiameter:{label:'Largest branch to be cut: width in inches'},
  scope:{label:'Describe exactly what you want done',help:'For trimming, describe which branches and what you want to achieve. Keep this separate from the permit result.'}
});
export const SPECIES_COPY = Object.freeze({unknown:"I'm not sure what kind of tree this is",liveoak:'Live oak',pecan:'Pecan',hickory:'Hickory',longleaf:'Longleaf pine',magnolia:'Magnolia',oak:'Another oak (not live oak or water oak)',riverbirch:'River birch',sweetgum:'Sweetgum',sycamore:'Sycamore',yellowpoplar:'Tulip tree / yellow poplar',wateroak:'Water oak',camphor:'Camphor',popcorn:'Popcorn tree / Chinese tallow',cherrylaurel:'Carolina cherry laurel',baldcypress:'Bald cypress',loblolly:'Loblolly pine',slash:'Slash pine',other:'Another tree / needs identification'});
export function relabelOptions(select,labels) {
  if(!select)return;
  for(const option of select.options){
    const value=option.value;
    if(!Object.hasOwn(labels,value))continue;
    // An option without a value attribute otherwise changes value with its text.
    if(!option.hasAttribute('value'))option.setAttribute('value',value);
    option.textContent=labels[value];
  }
}
export function installPlainLanguage(doc) {
  const form=doc.getElementById('permitForm');
  if(!form||form.dataset.plainLanguage===PLAIN_VERSION)return false;
  const byId=id=>doc.getElementById(id);
  const set=(selector,text)=>{const node=doc.querySelector(selector);if(node)node.textContent=text;};
  for(const [id,copy] of Object.entries(FIELD_COPY)){
    const field=byId(id);if(!field)continue;
    set(`label[for="${id}"]`,copy.label);
    if(copy.options)relabelOptions(field,copy.options);
    if(copy.help){
      const parent=field.parentElement;
      let help=[...parent.children].find(n=>n.matches('p.help'));
      if(!help){help=doc.createElement('p');help.className='help';field.insertAdjacentElement('afterend',help);}
      if(!help.id)help.id=id+'PlainHelp';help.textContent=copy.help;
      const ids=new Set((field.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean));ids.add(help.id);
      field.setAttribute('aria-describedby',[...ids].join(' '));
      if(copy.detail){
        const detail=doc.createElement('details');detail.className='plain-explanation';
        const title=doc.createElement('summary');title.textContent='What does this mean?';
        const body=doc.createElement('p');body.textContent=copy.detail;body.className='help';
        detail.append(title,body);help.insertAdjacentElement('afterend',detail);
      }
    }
  }
  set('.hero .eyebrow','Mobile Tree Permit Checker');
  set('.hero .lead','Answer a few questions about the tree and the job. We will explain which City permissions may be needed, who may do the work, and what still needs checking.');
  set('#permitCard .stephead .muted','Answer what you know. “I’m not sure” is a valid answer—we will explain what needs checking. You do not need an address search to start.');
  set('#chapter64 legend','Other property rules to check');
  set('#chapter64 > p.help','Some trees must stay because of an earlier City approval for the property. This is a separate check from the tree permit (Chapter 64 landscaping and development rules).');
  set('#udcQuestions > summary','Has the City required certain trees or landscaping here?');
  set('#udcQuestions > p.help','These five questions concern earlier property approvals and any building project. You do not need to know the answers: choose “I’m not sure” rather than guessing.');
  set('#screenNow','Check what is needed');
  set('#checkMaps','Check the City maps');
  set('#permitOutput > p.tag','Tree-work permission (Chapter 65)');
  set('#udcResultSection > p.tag','Other property and landscaping rules (Chapter 64)');
  set('#udcResultSection > h3:nth-of-type(2)','What to check about the property');
  set('#permitForm label.check span','I think the tree may have storm damage. This is my observation, not a confirmed arborist assessment or permission to remove it.');
  const select=byId('scSpecies');
  if(select){
    const originals=new Map();
    const identity=doc.createElement('p');identity.id='speciesScientificName';identity.className='help';
    select.parentElement.appendChild(identity);
    const identify=()=>{
      const original=originals.get(select.value)||'';
      identity.textContent=original&& !['unknown','other'].includes(select.value)?'Tree identification used for the rules: '+original:'';
      identity.hidden=!identity.textContent;
    };
    const names=()=>{
      for(const option of select.options)if(!originals.has(option.value))originals.set(option.value,option.textContent);
      relabelOptions(select,SPECIES_COPY);identify();
    };
    names();select.addEventListener('change',identify);
    // The existing questionnaire fills species options after its module imports.
    const Observer=doc.defaultView?.MutationObserver;
    if(Observer)new Observer(names).observe(select,{childList:true});
    const ids=(select.getAttribute('aria-describedby')||'').split(/\s+/).filter(Boolean);ids.push(identity.id);
    select.setAttribute('aria-describedby',ids.join(' '));
  }
  const styles=doc.createElement('style');styles.id='plainLanguageStyles';
  styles.textContent='.plain-explanation{border:0;margin:4px 0 0;padding:0}.plain-explanation>summary{font-size:13px;min-height:40px;display:list-item;padding:8px 0}.plain-explanation>p{margin:0 0 8px}.grid>div{min-width:0}fieldset{min-inline-size:0}select{max-width:100%}';
  doc.head.appendChild(styles);
  const footer=doc.querySelector('footer');
  if(footer){const note=doc.createElement('span');note.textContent=' · Plain-English questions '+PLAIN_VERSION;footer.appendChild(note);}
  form.dataset.plainLanguage=PLAIN_VERSION;
  return true;
}
