const ids=['projectType','parcel','district','use','condition','zoneConfirmed','address','shape','zoning','width','depth','area','front','rear','left','right','source','verified','impervious','used','dpod','trees'];
const el=id=>document.getElementById(id), number=id=>el(id).value.trim()===''?null:Number(el(id).value), fmt=n=>n.toLocaleString('en-US',{maximumFractionDigits:1})+' sq ft';
function calculate(d){
 const errors=[]; for(const key of ['width','depth','area','front','rear','left','right','impervious','used']){const v=d[key];if(v!==null&&(!Number.isFinite(v)||v<0))errors.push('Enter valid nonnegative measurements.');}
 const area=d.area!==null?d.area:d.shape==='rectangle'&&d.width>0&&d.depth>0?d.width*d.depth:null;
 if(area!==null&&area<=0)errors.push('Total lot area must be greater than zero.');
 if(area>0){for(const key of ['impervious','used'])if(d[key]>area)errors.push('Existing site areas cannot exceed total lot area.');}
 const allSetbacks=['front','rear','left','right'].every(k=>d[k]!==null&&d[k]>=0);
 const envelope=d.shape==='rectangle'&&d.width>0&&d.depth>0&&allSetbacks&&d.verified?Math.max(0,d.width-d.left-d.right)*Math.max(0,d.depth-d.front-d.rear):null;
 return {area,envelope,errors:[...new Set(errors)]};
}
function values(){return Object.fromEntries(ids.map(id=>[id,el(id).type==='checkbox'?el(id).checked:el(id).type==='number'?number(id):el(id).value]));}
function render(){const d=values(),r=calculate(d);const ss=window.diSurfaceSummary;const guidance={unknown:'Choose a project to see the relevant planning guidance.',renovation:'For interior work or maintenance without exterior disturbance, these area calculations may not be relevant. Confirm permit requirements for the actual work with the Town.',addition:'Review final surface coverage, affected trees, construction access, and drainage changes.',new:'Review coverage, construction disturbance, setbacks, trees, drainage, and applicable coastal restrictions together.',tree:'Focus on the tree assessment and removal approval. Whole-lot coverage calculations may not be relevant to an individual tree request. Emergencies require the applicable Town procedure.'};el('projectGuidance').textContent=guidance[d.projectType]||guidance.unknown;updateHelp(d);let warnings=[];let html='';const metric=(label,value)=>`<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
 if(r.errors.length){html='<p>Please correct the measurements below.</p>';warnings.push(...r.errors);}else if(!(r.area>0)){html='<p>Enter your lot dimensions or surveyed lot area to see the initial budgets.</p>';}else{
 html+=metric('Total lot area',fmt(r.area)); html+=metric('Construction disturbance · conditional 40% ceiling',fmt(r.area*.4));
 html+=metric('Potential additional construction disturbance',d.used===null?'Town record needed':d.used>r.area*.4?'Over scenario by '+fmt(d.used-r.area*.4):fmt(r.area*.4-d.used));warnings.push('Construction disturbance subtraction is conditional: confirm prior usage and its treatment with the Town.');
 const residential=el('surfaceResidential').value==='yes'||(!ss?.hasRows&&d.zoning==='residential');
 if(ss?.hasRows){
 html+=metric('Existing counted surfaces retained',fmt(ss.existing));html+=metric('Existing counted surfaces to remove',fmt(ss.removed));html+=metric('Proposed counted additions',fmt(ss.proposed));html+=metric('Final counted surface coverage',fmt(ss.total)+' · '+(ss.total/r.area*100).toFixed(1)+'%');
 if(ss.unknown)html+=metric('Unresolved final surface area',fmt(ss.unknown));
 if(ss.removedUnknown)warnings.push('Some removed surfaces have unresolved classifications; no removal credit is assumed.');
 if(ss.errors.length||ss.incomplete)warnings.push('Surface estimate incomplete: '+ss.incomplete+' missing measurement(s). '+ss.errors.join(' '));
 if(residential){const cap=r.area*.25;html+=metric('Conditional residential ceiling · 25%',fmt(cap));html+=metric('Final coverage compared with ceiling',ss.errors.length||ss.incomplete?'Incomplete estimate':ss.total>cap?'Over by '+fmt(ss.total-cap):ss.max>cap?'Unresolved surfaces may exceed limit':fmt(cap-ss.max)+(ss.unknown?' to '+fmt(cap-ss.total):'')+' remaining');}
 warnings.push('Detailed surface entries control this summary; the manual retained-area field is not added. Include every retained and proposed surface.');
 }else if(residential){html+=metric('Conditional residential ceiling · 25%',fmt(r.area*.25));html+=metric('Manual retained-area comparison',d.impervious===null?'Unknown':d.impervious>r.area*.25?'Over by '+fmt(d.impervious-r.area*.25):fmt(r.area*.25-d.impervious)+' remaining before additions');}
 if(!residential)warnings.push('Confirm residential zoning before applying the conditional 25% scenario.');
 html+=metric('Rectangular setback envelope',r.envelope===null?'Not established':fmt(r.envelope));
 if(d.used>r.area*.4)warnings.push('Previously used CIZ exceeds 40% of the lot. Town records and review are required.');
 if(d.used===null)warnings.push('Town documentation of previously used CIZ is needed to estimate remaining construction allowance.');
 if(!ss?.hasRows&&d.impervious===null)warnings.push('Existing impervious area is unknown; remaining impervious budget cannot be calculated.');
 if(d.shape==='rectangle'&&d.area!==null&&d.width>0&&d.depth>0&&Math.abs(d.area-d.width*d.depth)>Math.max(1,d.area*.01))warnings.push('Survey area differs from width × depth. Budgets use survey area; the rectangular diagram may not represent the parcel.');
 if(r.envelope===0)warnings.push('Entered setbacks leave no rectangular envelope. Verify dimensions and setbacks.');
 }
 if(!d.verified)warnings.push('Confirm setbacks with the Town before relying on a setback envelope.');
 if(d.shape==='irregular')warnings.push('An irregular lot requires a surveyed layout; no rectangular setback envelope is calculated.');
 if(d.dpod==='yes'&&r.area>0)warnings.push('DPOD: at least '+fmt(r.area*.3)+' must remain undisturbed native vegetation under Section B.3. This is not verified in Step 1.');
 if(d.dpod==='unknown')warnings.push('Confirm whether the property is within the Dune Protection Overlay District.');
 warnings.push('Tree retention, tree protection zones, canopy removal, and Heritage Tree approvals have not been evaluated.');
 el('results').innerHTML=html; el('messages').replaceChildren(...warnings.map(t=>{const p=document.createElement('p');p.className='alert';p.textContent=t;return p;}));
 let svg='<text x="160" y="100" text-anchor="middle" fill="#687e73" font-size="13">Enter rectangular lot dimensions</text>';
 if(d.shape==='rectangle'&&d.width>0&&d.depth>0&&!r.errors.length){const scale=Math.min(240/d.width,150/d.depth),w=d.width*scale,h=d.depth*scale,x=(320-w)/2,y=20;svg=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#edf0e6" stroke="#7f9888"/>`;if(r.envelope>0)svg+=`<rect x="${x+d.left*scale}" y="${y+d.rear*scale}" width="${Math.max(0,d.width-d.left-d.right)*scale}" height="${Math.max(0,d.depth-d.front-d.rear)*scale}" fill="#bed4b4" stroke="#315d48" stroke-dasharray="5 4"/>`;svg+=`<text x="${x-9}" y="${y+h/2}" text-anchor="end" fill="#416052" font-size="11">A</text><text x="${x+w+9}" y="${y+h/2}" fill="#416052" font-size="11">B</text><text x="160" y="${y+h+20}" text-anchor="middle" fill="#416052" font-size="12">FRONT / STREET · ${d.width} ft</text><text x="160" y="13" text-anchor="middle" fill="#416052" font-size="12">Depth ${d.depth} ft</text>`;}
 el('diagram').innerHTML=svg;
}
function updateHelp(d){
 const eligible=['R1','R2'].includes(d.district)&&d.use==='single'&&d.condition==='standard'&&d.dpod!=='yes'&&d.zoneConfirmed&&d.width>0;
 el('suggest').disabled=!eligible;
 let message='You don’t need to know your setbacks to begin. Find your parcel in the County map, then ask the Town to confirm its zoning district and any overlays. The County parcel map alone does not establish zoning.';
 if(d.district==='other')message='This guided suggestion covers single-family houses in R-1 or R-2 only. Ask the Town for the requirements for your district and proposed use, then enter the confirmed values below.';
 else if(['R1','R2'].includes(d.district)){
 if(d.use!=='single')message='Duplexes, accessory buildings, and other uses can follow different rules. Ask the Town to confirm the applicable requirements.';
 else if(d.condition!=='standard'||d.dpod==='yes')message='Corner, waterfront, through lots, overlays, and uncertain conditions require property-specific review. Confirm these with the Town before setting the building envelope.';
 else if(!d.zoneConfirmed)message='Confirm your zoning with Town records or staff before filling standard setback suggestions.';
 else if(!(d.width>0))message='Enter the lot width first. R-1 side-yard requirements change at 50 feet.';
 else message=d.width<=50?'Standard R-1 single-family baseline: front 30 ft, rear 10 ft; one side 5 ft and the other 8 ft. Ask the Town which side assignment applies. R-2 single-family houses use this same baseline.':'Standard R-1 single-family baseline: front 30 ft, rear 10 ft, both sides 10 ft. R-2 single-family houses use this same baseline. Confirm these against your property records before using the envelope.';
 }
 el('setbackHelp').textContent=message;
 el('request').value='Please confirm the current zoning and applicable building setbacks for '+(d.address||'[property address]')+'; parcel '+(d.parcel||'[parcel number]')+'. I am planning '+(d.use==='single'?'a single-family house':'[describe improvement]')+'. Please identify the front, rear, side and any waterside boundaries, applicable overlay districts (including DPOD and West End), amendments, variances, easements or special lot conditions, and which setbacks apply to each boundary. Please also confirm the parcel’s documented prior CIZ usage. Thank you.';
}
el('suggest').onclick=()=>{if(el('suggest').disabled)return;const narrow=number('width')<=50;el('front').value=30;el('rear').value=10;el('left').value=narrow?5:10;el('right').value=narrow?8:10;el('verified').checked=false;el('source').value='Suggested baseline: Town-posted Ordinance 105, §4.9.1.2 & Table 5.2. Property confirmation pending.';el('zoning').value='residential';el('manual').open=true;el('saved').textContent='Suggestions filled — confirm requirements and side assignments before checking the confirmation box.';render();};
el('copyRequest').onclick=async()=>{try{await navigator.clipboard.writeText(el('request').value);el('copyStatus').textContent=' Request copied.';}catch{el('copyStatus').textContent=' Select and copy the request above.';}};
document.addEventListener('surface-summary',render);
function populate(d){ids.forEach(id=>{if(el(id).type==='checkbox')el(id).checked=Boolean(d[id]);else el(id).value=d[id]??(el(id).tagName==='SELECT'?el(id).options[0].value:'');});render();}
el('form').addEventListener('input',(event)=>{if(['address','parcel','shape','dpod','district','use','condition','zoneConfirmed','width','front','rear','left','right'].includes(event.target.id)&&event.target.id!=='verified')el('verified').checked=false;if(['parcel','district'].includes(event.target.id)){el('zoneConfirmed').checked=false;if(event.target.id!=='district')el('zoning').value='unknown';}el('saved').textContent='Unsaved changes';render();});el('save').onclick=()=>{try{localStorage.setItem('di-property-v1',JSON.stringify(values()));el('saved').textContent='Saved on this browser and device.';}catch{el('saved').textContent='This browser could not save your details.';}};el('print').onclick=()=>{const details=[...document.querySelectorAll('main details')];const opened=details.map(x=>x.open);details.forEach(x=>x.open=true);const restore=()=>{details.forEach((x,i)=>x.open=opened[i]);window.removeEventListener('afterprint',restore);};window.addEventListener('afterprint',restore);window.print();};el('reset').onclick=()=>{el('form').reset();try{localStorage.removeItem('di-property-v1');}catch{}el('saved').textContent='Cleared.';render();};el('example').onclick=()=>{populate({shape:'rectangle',zoning:'residential',width:100,depth:100,front:20,rear:20,left:10,right:10,verified:true,district:'unknown',use:'single',condition:'unknown',source:'Illustrative values only — not Town setback requirements',impervious:700,used:1000,dpod:'unknown'});el('saved').textContent='Example only — replace all values with property records.';};try{const saved=JSON.parse(localStorage.getItem('di-property-v1'));if(saved)populate(saved);}catch{}render();
