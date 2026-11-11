const ids=['parcel','district','use','condition','zoneConfirmed','address','shape','zoning','width','depth','area','front','rear','left','right','source','verified','impervious','used','dpod','trees'];
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
function render(){const d=values(),r=calculate(d);updateHelp(d);let warnings=[];let html='';const metric=(label,value)=>`<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
 if(r.errors.length){html='<p>Please correct the measurements below.</p>';warnings.push(...r.errors);}else if(!(r.area>0)){html='<p>Enter your lot dimensions or surveyed lot area to see the initial budgets.</p>';}else{
 html+=metric('Total lot area',fmt(r.area)); html+=metric('CIZ ceiling · 40% of lot',fmt(r.area*.4));
 html+=metric('Estimated remaining CIZ',d.used===null?'Unknown':fmt(Math.max(0,r.area*.4-d.used)));
 if(d.zoning==='residential'){html+=metric('Residential impervious ceiling · 25%',fmt(r.area*.25));html+=metric('Remaining impervious budget',d.impervious===null?'Unknown':fmt(Math.max(0,r.area*.25-d.impervious)));if(d.impervious>r.area*.25)warnings.push('Entered existing impervious area exceeds the standard 25% ceiling. Confirm lawful existing conditions and any approvals with the Town.');}
 else warnings.push('Confirm residential zoning before applying the 25% residential impervious limit.');
 html+=metric('Rectangular setback envelope',r.envelope===null?'Not established':fmt(r.envelope));
 if(d.used>r.area*.4)warnings.push('Previously used CIZ exceeds 40% of the lot. Town records and review are required.');
 if(d.used===null)warnings.push('Town documentation of previously used CIZ is needed to estimate remaining construction allowance.');
 if(d.impervious===null)warnings.push('Existing impervious area is unknown; remaining impervious budget cannot be calculated.');
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
function populate(d){ids.forEach(id=>{if(el(id).type==='checkbox')el(id).checked=Boolean(d[id]);else el(id).value=d[id]??(el(id).tagName==='SELECT'?el(id).options[0].value:'');});render();}
el('form').addEventListener('input',(event)=>{if(['address','parcel','shape','dpod','district','use','condition','zoneConfirmed','width','front','rear','left','right'].includes(event.target.id)&&event.target.id!=='verified')el('verified').checked=false;if(['address','parcel','district'].includes(event.target.id)){el('zoneConfirmed').checked=false;if(event.target.id!=='district')el('zoning').value='unknown';}el('saved').textContent='Unsaved changes';render();});el('save').onclick=()=>{try{localStorage.setItem('di-property-v1',JSON.stringify(values()));el('saved').textContent='Saved on this browser and device.';}catch{el('saved').textContent='This browser could not save your details.';}};el('print').onclick=()=>window.print();el('reset').onclick=()=>{el('form').reset();try{localStorage.removeItem('di-property-v1');}catch{}el('saved').textContent='Cleared.';render();};el('example').onclick=()=>{populate({shape:'rectangle',zoning:'residential',width:100,depth:100,front:20,rear:20,left:10,right:10,verified:true,district:'unknown',use:'single',condition:'unknown',source:'Illustrative values only — not Town setback requirements',impervious:700,used:1000,dpod:'unknown'});el('saved').textContent='Example only — replace all values with property records.';};try{const saved=JSON.parse(localStorage.getItem('di-property-v1'));if(saved)populate(saved);}catch{}render();
