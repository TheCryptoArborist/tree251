import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "Consult Request | Peter Toler, ISA Certified Consulting Arborist",
    template: "%s | Consult Request"
  },
  description:
    "Request professional tree consultations, tree risk assessments, tree health evaluations, storm damage assessments, permit and development consulting, and TREE Verified report verification from Peter Toler.",
  icons: {
    icon: "/arborist-logo-cropped.png",
    apple: "/arborist-logo-cropped.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
