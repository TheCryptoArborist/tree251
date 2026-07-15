import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Tree Assessments in Mobile & Baldwin Counties",
  description:
    "Independent tree assessments for homebuyers, sellers, agents, investors, and commercial property transactions in Mobile and Baldwin Counties, Alabama.",
  alternates: {
    canonical: "/real-estate"
  },
  openGraph: {
    title: "Real Estate Tree Assessments in Mobile & Baldwin Counties",
    description:
      "Independent arborist due diligence for buyers, sellers, agents, investors, and commercial property transactions across Alabama's Gulf Coast.",
    url: "/real-estate",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Real Estate Tree Assessments in Mobile & Baldwin Counties",
    description:
      "Independent arborist due diligence for real estate transactions across Alabama's Gulf Coast."
  }
};

export default function RealEstateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
