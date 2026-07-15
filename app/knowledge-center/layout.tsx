import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile, Alabama Tree Codes and Legal References",
  description:
    "Find municipal tree codes, Alabama laws, permit references, and public guidance related to tree protection, tree work, and development in Mobile, Alabama.",
  alternates: {
    canonical: "/knowledge-center"
  },
  openGraph: {
    title: "Mobile, Alabama Tree Codes and Legal References",
    description:
      "Municipal tree codes, Alabama laws, permit references, and public guidance for Mobile, Alabama.",
    url: "/knowledge-center",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Mobile, Alabama Tree Codes and Legal References",
    description:
      "Municipal tree codes, Alabama laws, permit references, and public guidance for Mobile, Alabama."
  }
};

export default function TreeCodesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
