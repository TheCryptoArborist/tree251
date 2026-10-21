import type { Metadata } from "next";
import HalloweenPage from "@/components/halloween/HalloweenPage";
export const metadata: Metadata = {
  title: "Cromwell Place Halloween Map",
  description: "Find participating homes and add your house to the Cromwell Place Halloween candy map in Mobile, Alabama.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/halloween" },
  openGraph: { title: "Cromwell Place Halloween Candy Map 🎃", description: "Who's handing out candy? Add your house and explore our neighborhood map. October 31, 2026 · Mobile, Alabama", url: "/halloween", images: [] },
  twitter: { card: "summary", title: "Cromwell Place Halloween Candy Map", description: "Add your house and find participating neighbors.", images: [] }
};
export default function Page() { return <HalloweenPage />; }
