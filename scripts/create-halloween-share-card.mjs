import sharp from 'sharp';
const pumpkin = (x,y,scale=1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M-5-65 Q-12-92 12-91 L19-78 Q4-82 5-62" fill="#8aab58"/><ellipse cx="0" cy="0" rx="74" ry="64" fill="#dd792a"/><ellipse cx="-29" cy="0" rx="39" ry="62" fill="#ef8d35"/><ellipse cx="29" cy="0" rx="39" ry="62" fill="#ef8d35"/><ellipse cx="0" cy="0" rx="30" ry="65" fill="#ffa346"/><path d="M-46-14 L-22-33 L-13-7 Z M13-7 L22-33 L46-14 Z M-41 17 L-24 24 L-18 15 L-7 30 L7 30 L18 15 L24 24 L41 17 Q29 53 0 48 Q-29 53-41 17" fill="#16392c"/></g>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><radialGradient id="bg"><stop stop-color="#28523d"/><stop offset="1" stop-color="#0d2921"/></radialGradient></defs>
<rect width="1200" height="630" fill="url(#bg)"/><rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="#deb778" stroke-opacity=".5"/>
<g opacity=".12" fill="none" stroke="#e6e8ce" stroke-width="13"><path d="M800 0V630M1040 0V630M690 160H1200M690 470H1200"/><path d="M835 210H1000V410H835Z"/></g>
<path d="M770 545 Q720 460 825 400 T1030 305 T1000 125" fill="none" stroke="#efbd76" stroke-width="5" stroke-dasharray="10 13" opacity=".55"/>
<circle cx="1040" cy="122" r="48" fill="#ffdf9d"/><circle cx="1061" cy="109" r="42" fill="#18382b"/>
<g fill="#f8d596"><circle cx="734" cy="82" r="3"/><circle cx="1123" cy="250" r="4"/><circle cx="1094" cy="540" r="3"/><circle cx="688" cy="515" r="3"/></g>
<text x="74" y="102" font-family="DejaVu Sans,sans-serif" font-size="19" font-weight="bold" letter-spacing="4" fill="#edbd78">MOBILE, ALABAMA · OCTOBER 31</text>
<text x="68" y="210" font-family="DejaVu Serif,serif" font-size="76" fill="#fff6df">Cromwell Place</text>
<text x="73" y="285" font-family="DejaVu Sans,sans-serif" font-size="48" font-weight="bold" fill="#ffbd77">Halloween Candy Map</text>
<text x="76" y="355" font-family="DejaVu Sans,sans-serif" font-size="29" fill="#e4e9d8">Find the treats. Meet your neighbors.</text>
<text x="76" y="399" font-family="DejaVu Sans,sans-serif" font-size="29" fill="#e4e9d8">Put your pumpkin on the map!</text>
<rect x="74" y="448" width="365" height="64" rx="16" fill="#ef923f"/>
<text x="104" y="491" font-family="DejaVu Sans,sans-serif" font-size="27" font-weight="bold" fill="#102e23">ADD YOUR HOUSE →</text>
<text x="76" y="565" font-family="DejaVu Sans,sans-serif" font-size="24" fill="#e4c692">tree251.xyz/halloween</text>
${pumpkin(977,368,1.7)}${pumpkin(795,527,.52)}${pumpkin(1110,502,.54)}
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/halloween/cromwell-halloween-share-2026.png');
