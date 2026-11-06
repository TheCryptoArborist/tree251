/* eslint-disable @next/next/no-img-element -- ImageResponse renders an image, not browser HTML. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "Your New Tree: Planting & Care — The Arborist, Peter Toler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/plant/brand-logo.png"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 68px", background: "linear-gradient(120deg, #050b12, #112d31)", color: "#f1eee5", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 22, letterSpacing: 3, color: "#f6c95a" }}>THE ARBORIST</div><div style={{ fontSize: 21, marginTop: 10 }}>Peter Toler · ISA Certified Arborist</div></div><img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={110} height={110} style={{ objectFit: "contain" }} /></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3 }}>Your new tree.</div><div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3, color: "#f6c95a" }}>Planting &amp; care.</div><div style={{ fontSize: 25, marginTop: 22, color: "#b8c6c3" }}>Know your tree. Plant it right. Help it thrive.</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #4a6261", paddingTop: 22, fontSize: 24 }}><div>tree251.xyz/plant</div><div>251-622-3200</div></div>
    </div>, size);
}
