import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const siteUrl = "https://tree251.xyz";
const siteTitle = "The Arborist | Peter Toler, ISA Certified Arborist";
const siteDescription =
  "Request an independent tree assessment from Peter Toler, ISA Certified Arborist serving the Gulf Coast, including Mobile and Baldwin Counties, Alabama, before paying for tree removal, pruning, storm cleanup, or permit-related tree work.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#the-arborist`,
  name: "The Arborist",
  url: siteUrl,
  image: `${siteUrl}/arborist-logo-cropped.png`,
  description: siteDescription,
  founder: {
    "@type": "Person",
    name: "Peter Toler",
    jobTitle: "ISA Certified Arborist"
  },
  areaServed: [
    {
      "@type": "Place",
      name: "Alabama Gulf Coast"
    },
    {
      "@type": "AdministrativeArea",
      name: "Mobile County, Alabama"
    },
    {
      "@type": "AdministrativeArea",
      name: "Baldwin County, Alabama"
    }
  ],
  serviceType: [
    "Tree Risk Assessments",
    "Storm Damage Evaluations",
    "Work Prioritization",
    "Second Opinions Before Hiring a Tree Service",
    "Tree Preservation Guidance",
    "Tree Permit and Tree Commission Guidance",
    "Property Owner Consultations"
  ]
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <a
          href="#"
          aria-label="Back to top"
          className="fixed bottom-24 right-4 z-50 inline-flex min-h-11 items-center justify-center rounded-full border border-teal-300/30 bg-[#07131b]/95 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#f6c95a] shadow-[0_18px_44px_rgba(0,0,0,0.34)] backdrop-blur transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring sm:bottom-6 sm:right-6"
        >
          Top ↑
        </a>
      </body>
    </html>
  );
}
