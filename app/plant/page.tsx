import type { Metadata } from "next";
import PlantingGuide from "./PlantingGuide";

export const metadata: Metadata = {
  title: "Your New Tree: Planting & Care",
  description: "On-page tree guides for live oak, overcup oak, black gum, chaste tree, and bald cypress. Learn mature size, site needs, container care, planting, and first-year aftercare.",
  alternates: { canonical: "/plant" },
  openGraph: {
    title: "Your New Tree: Planting & Care | The Arborist",
    description: "From a three-gallon container to a healthy landscape tree: planting guidance from Peter Toler, ISA Certified Arborist.",
    url: "/plant",
    type: "article",
    images: [{ url: "/plant/opengraph-image", alt: "The Arborist tree planting and care guide" }]
  }
};

export default function PlantPage() {
  return <PlantingGuide />;
}
