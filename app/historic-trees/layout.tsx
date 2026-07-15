import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historic Trees of Mobile, Alabama",
  description:
    "Explore notable and historic trees in Mobile, Alabama, including their stories, significance, preservation needs, and place in the city's urban forest.",
  alternates: {
    canonical: "/historic-trees"
  },
  openGraph: {
    title: "Historic Trees of Mobile, Alabama",
    description:
      "Stories, significance, and preservation of Mobile's notable historic trees.",
    url: "/historic-trees",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Historic Trees of Mobile, Alabama",
    description:
      "Stories, significance, and preservation of Mobile's notable historic trees."
  }
};

export default function HistoricTreesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
