import QRCode from "qrcode";
import sharp from "sharp";

const registrationUrl =
  "https://www.salutingbranches.org/locations/mobile-national-cemetery";
const logoPath = "public/assets/saluting-branches-logo.jpg";
const outputPath =
  "public/assets/saluting_branches_mobile_event_scannable_qr.png";

const qrCode = await QRCode.toBuffer(registrationUrl, {
  errorCorrectionLevel: "H",
  margin: 3,
  width: 300,
  color: {
    dark: "#06110d",
    light: "#ffffff"
  }
});

const artwork = Buffer.from(`
  <svg width="1200" height="1500" viewBox="0 0 1200 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1070 940) rotate(133) scale(710 650)">
        <stop stop-color="#1d5a42"/>
        <stop offset="1" stop-color="#06110d" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="1500" fill="#06110d"/>
    <rect width="1200" height="1500" fill="url(#glow)"/>
    <g opacity="0.08" fill="none" stroke="#f6c95a" stroke-width="2">
      <circle cx="80" cy="1110" r="150"/>
      <circle cx="80" cy="1110" r="220"/>
      <circle cx="80" cy="1110" r="290"/>
      <circle cx="80" cy="1110" r="360"/>
    </g>
    <rect x="34" y="34" width="1132" height="1432" rx="34" fill="none" stroke="#f6c95a" stroke-width="4"/>
    <rect x="55" y="55" width="1090" height="1390" rx="24" fill="none" stroke="#f6c95a" stroke-opacity="0.42" stroke-width="2"/>

    <text x="90" y="735" fill="#f6c95a" font-family="Arial, sans-serif" font-size="34" font-weight="800" letter-spacing="5">SALUTING BRANCHES 2026 · MOBILE, ALABAMA</text>
    <text x="90" y="818" fill="#ffffff" font-family="Arial, sans-serif" font-size="64" font-weight="900">USE YOUR SKILLS TO</text>
    <text x="90" y="890" fill="#ffffff" font-family="Arial, sans-serif" font-size="64" font-weight="900">HONOR THEIR SERVICE</text>
    <line x1="90" y1="930" x2="1110" y2="930" stroke="#f6c95a" stroke-width="4"/>

    <text x="90" y="1005" fill="#f6c95a" font-family="Arial, sans-serif" font-size="23" font-weight="800" letter-spacing="3">DATE</text>
    <text x="90" y="1050" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="800">Wednesday, September 16, 2026</text>

    <text x="90" y="1125" fill="#f6c95a" font-family="Arial, sans-serif" font-size="23" font-weight="800" letter-spacing="3">LOCATION</text>
    <text x="90" y="1170" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="800">Mobile National Cemetery</text>
    <text x="90" y="1215" fill="#d7e6dd" font-family="Arial, sans-serif" font-size="27">1202 Virginia Street</text>
    <text x="90" y="1254" fill="#d7e6dd" font-family="Arial, sans-serif" font-size="27">Mobile, Alabama 36604</text>

    <text x="960" y="994" fill="#f6c95a" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="2">SCAN TO REGISTER</text>

    <rect x="90" y="1333" width="1020" height="2" fill="#f6c95a" opacity="0.5"/>
    <text x="600" y="1392" fill="#ffffff" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" font-weight="700">ARBORISTS · EQUIPMENT OPERATORS · COMMUNITY VOLUNTEERS</text>
    <text x="600" y="1428" fill="#d7e6dd" text-anchor="middle" font-family="Arial, sans-serif" font-size="22">Every participant must register individually.</text>
  </svg>
`);

const logo = await sharp(logoPath)
  .resize({ width: 1020, height: 585, fit: "contain", withoutEnlargement: true })
  .jpeg({ quality: 96 })
  .toBuffer();

await sharp(artwork)
  .composite([
    { input: logo, left: 90, top: 90 },
    { input: qrCode, left: 810, top: 1018 }
  ])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outputPath);

console.log(outputPath);
