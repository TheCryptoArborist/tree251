import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "The Arborist | Peter Toler, ISA Certified Arborist",
    template: "%s | The Arborist"
  },
  description:
    "Request an independent tree assessment from Peter Toler, ISA Certified Arborist in Mobile, Alabama, before paying for tree removal, pruning, storm cleanup, or permit-related tree work.",
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
