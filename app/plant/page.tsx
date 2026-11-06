import type { Metadata } from "next";
import PlantingGuide from "./PlantingGuide";
import TreePicker from "./TreePicker";
import "./tree-picker.css";
import "./plant-print-finish.css";

const title = "Your New Tree: Planting & Care";
const description = "Planting and aftercare for all ten Mobile giveaway trees, including Ogeechee Tupelo, Longleaf Pine, Pawpaw, and Shoal Creek Chaste Tree. Common-name guides, mature sizes, and first-year care.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/plant" },
  openGraph: { title: `${title} | The Arborist`, description, url: "/plant", type: "article", images: [{ url: "/plant/opengraph-image", width: 1200, height: 630, alt: "Your New Tree: Planting & Care — The Arborist, Peter Toler" }] },
  twitter: { card: "summary_large_image", title: `${title} | The Arborist`, description, images: ["/plant/opengraph-image"] }
};
export default function PlantPage() {
  const article = { "@context": "https://schema.org", "@type": "Article", headline: title, description, url: "https://tree251.xyz/plant", dateModified: "2026-11-06", author: { "@type": "Person", name: "Peter Toler", jobTitle: "ISA Certified Arborist" }, publisher: { "@type": "Organization", name: "The Arborist", url: "https://tree251.xyz" }, image: "https://tree251.xyz/plant/opengraph-image", inLanguage: "en-US" };
  return <div className="plant-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} /><TreePicker /><PlantingGuide /></div>;
}
