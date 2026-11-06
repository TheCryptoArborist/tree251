import { ImageResponse } from "next/og";

export const alt = "The Arborist — Your New Tree: Planting & Care";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 78, color: "#f8f8ef", background: "linear-gradient(130deg, #06141b 0%, #0b3634 100%)", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: 4, color: "#f6c95a", marginBottom: 34 }}>THE ARBORIST</div>
        <div style={{ display: "flex", fontSize: 78, fontWeight: 800, lineHeight: 1.1 }}>Your New Tree.</div>
        <div style={{ display: "flex", fontSize: 78, fontWeight: 800, lineHeight: 1.1, color: "#f6c95a" }}>A Healthy Start.</div>
        <div style={{ display: "flex", marginTop: 38, fontSize: 28, color: "#d4e6df" }}>Tree selection · Planting · First-year care</div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 22, color: "#b8d1c6" }}>tree251.xyz/plant  |  251-622-3200</div>
      </div>
    ),
    size
  );
}
