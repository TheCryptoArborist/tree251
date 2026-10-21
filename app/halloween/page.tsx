import type { Metadata } from "next";
import HalloweenPage from "@/components/halloween/HalloweenPage";
export const metadata: Metadata = {
  title: "Cromwell Place Halloween Map",
  description: "Find participating homes and add your house to the Cromwell Place Halloween candy map in Mobile, Alabama.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/halloween" },
  openGraph: { title: "Cromwell Place Halloween Candy Map 🎃", description: "Who's handing out candy? Add your house and explore our neighborhood map. October 31, 2026 · Mobile, Alabama", url: "/halloween", type: "website", images: [{ url: "/halloween/cromwell-halloween-share-2026.png", width: 1200, height: 630, alt: "Cromwell Place Halloween Candy Map — add your house for October 31 in Mobile, Alabama" }] },
  twitter: { card: "summary_large_image", title: "Cromwell Place Halloween Candy Map", description: "Add your house and find participating neighbors.", images: ["/halloween/cromwell-halloween-share-2026.png"] }
};
export default function Page() { return <HalloweenPage />; }
