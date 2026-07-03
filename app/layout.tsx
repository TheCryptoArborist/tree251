import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const siteUrl = "https://tree251.xyz";
const siteTitle = "The Arborist | Peter Toler, ISA Certified Arborist";
const siteDescription =
  "Request an independent tree assessment from Peter Toler, ISA Certified Arborist in Mobile, Alabama, before paying for tree removal, pruning, storm cleanup, or permit-related tree work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "The Arborist",
  title: {
    default: siteTitle,
    template: "%s | The Arborist"
  },
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "The Arborist",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/arborist-logo-cropped.png",
        alt: "The Arborist logo"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/arborist-logo-cropped.png"]
  },
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
