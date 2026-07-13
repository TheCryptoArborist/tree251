import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, Info, Landmark, Scale, ShieldCheck } from "lucide-react";

const codeUrl = "https://library.municode.com/al/mobile/codes/code_of_ordinances?nodeId=COMOALVOII_CH65TRPRMA";
const cityPdfUrl = "https://www.cityofmobile.gov/uploads/210203095234newChapter65ordinance.pdf";
const cityResourcesUrl = "https://www.cityofmobile.gov/public-works/urban-forestry-department/urban-forestry-rules-regulations-and-forms/";

export const metadata: Metadata = {
  title: "Mobile Chapter 65: Tree Protection and Management",
  description: "A source-linked guide to Mobile City Code Chapter 65 covering tree permits, heritage trees, public trees, construction protection, tree companies, tree abuse, and enforcement.",
  alternates: { canonical: "/knowledge-center/laws-regulations/mobile-chapter-65" }
};

const definitions = [
  ["Heritage live oak tree", "A live oak tree that is at least 18 inches DBH."],
  ["Existing heritage tree", "An identified hickory, longleaf pine, magnolia, oak (excluding water oak), river birch, sweet gum, sycamore, or yellow poplar that is at least 18 inches DBH. In historic districts, those species qualify at a minimum of 8 inches DBH."],
  ["Critical root zone (CRZ)", "The soil area containing the minimum roots considered critical to tree stability or health. The code states that, per ANSI A300 Part 5, these roots occur within 6 to 18 times DBH depending on species tolerance, age, and health."],
  ["Public tree", "A tree located on property owned by the City of Mobile."],
  ["Selective root pruning", "Soil excavation using supersonic air tools, pressurized water, or hand tools, followed by cutting individual roots under ISA Certified Arborist supervision as set forth in ANSI A300 Part 8 best management practices."],
  ["Tree", "A self-supporting woody plant of a species suitable for the proposed environment and the city."],
  ["Urban forester", "The qualified city employee, or authorized designee, charged with managing Mobile's naturally occurring and planted trees and associated plants."],
] as const;

const sectionGuide = [
  ["65-1", "General purposes and application", "Explains the chapter's environmental, safety, property-value, water-quality, wildlife, risk-management, education, preservation, and uniform-standard purposes."],
  ["65-2", "Definitions", "Defines the specialized terms used throughout Chapter 65, including heritage trees, public trees, landscape terms, root-protection concepts, the Mobile Tree Act, Tree Commission, and Urban Forester."],
  ["65-3", "Urban forestry", "Establishes the Urban Forestry Department and describes the Urban Forester's responsibility for the public urban forest, rights-of-way, parks, maintenance planning, public-tree protection, and Tree Commission support."],
  ["65-4", "Mobile Tree Commission", "Addresses commission organization, powers, duties, procedures, reviews, and appeals. Commission authority is tied to state and municipal law."],
  ["65-5", "Tree trails", "Designates nine named streets or corridors as tree trails, permits additional designations, requires municipal signs, coordinates utility projects affecting trail trees, and requires certain oversized vehicles or loads to obtain written permission before traversing a tree trail."],
  ["65-6", "Private-property trimming or removal", "Establishes when permits are required for trimming, removing, or relocating heritage trees; application requirements; review criteria; decisions; conditions; and appeal pathways."],
  ["65-7", "Public-tree trimming or removal", "Restricts cutting, trimming, damaging, or removing trees in public rights-of-way and addresses authorization for public trees on other city property."],
  ["65-8", "Tree protection", "Regulates construction around retained trees, critical-root-zone impacts, selective root pruning, protective barriers, and work affecting public property or rights-of-way."],
  ["65-9", "Tree trimming/removal companies", "Sets registration, qualification, insurance, work-standard, and responsibility requirements for companies performing regulated tree work."],
  ["65-10", "Tree abuse", "Prohibits specified damage to public and heritage trees, including mutilation, harmful attachments or substances, and non-selective root damage, while stating identified exceptions."],
  ["65-11", "Enforcement", "Prohibits interference with authorized enforcement and describes possible penalties, court costs, restitution, imprisonment, or community service following a finding of guilt."],
] as const;

const actionCards = [
  ["Private property and heritage trees", "Section 65-6 is the starting point for determining whether proposed trimming, removal, or relocation requires a permit. The answer can depend on tree status, zoning, and historic-district location."],
  ["Public trees and rights-of-way", "Section 65-7 treats public trees separately. Work in a public right-of-way is not governed by the same process as ordinary private-tree maintenance."],
  ["Construction and root protection", "Section 65-8 restricts non-selective root pruning within the critical root zone of retained trees and requires qualified supervision for selective root pruning."],
  ["Tree-service companies", "Section 65-9 applies requirements to companies performing regulated trimming or removal work. Property owners should verify that contractors understand the applicable permit and work standards."],
  ["Tree abuse", "Section 65-10 identifies prohibited damage to public and heritage trees, including certain root damage during curb, sidewalk, and driveway work."],
  ["Appeals and enforcement", "Permit decisions and enforcement carry defined procedures. Use the current code and official City contacts for deadlines, appeal rights, and required filings."],
] as const;

export default function MobileChapter65Page() {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-12 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_72%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_54%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 opacity-30" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/knowledge-center" className="inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring"><ArrowLeft className="size-4" aria-hidden="true" /> Mobile Tree Knowledge Center</Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">Laws &amp; Regulations</p>
          <h1 className="mt-4 text-4xl font-black leading-[1.02] sm:text-6xl">Chapter 65: Tree Protection and Management</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">A practical, source-linked guide to Mobile&apos;s tree permits, heritage trees, public trees, construction protection, contractor requirements, prohibited tree damage, and enforcement.</p>
        </div>
      </section>

      <section className="py-10 sm:py-14"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="rounded-2xl border border-[#f6c95a]/35 bg-[#f6c95a]/10 p-5 sm:p-6"><Info className="size-7 text-[#f6c95a]" aria-hidden="true" /><h2 className="mt-3 text-xl font-black">Important boundary</h2><p className="mt-3 text-sm leading-6 text-emerald-50/82">The Arborist does not issue permits or citations and does not speak on behalf of the City of Mobile or any municipality. This educational guide is not legal advice and does not replace the current code, City instructions, permit conditions, commission decisions, or advice from a qualified attorney.</p></div></div></section>

      <section className="pb-12 sm:pb-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><BookOpen className="size-8 text-[#f6c95a]" aria-hidden="true" /><h2 className="text-3xl font-black sm:text-4xl">Key terms</h2></div><p className="mt-4 max-w-3xl text-sm leading-6 text-emerald-50/70">These descriptions orient readers to the code. Consult Section 65-2 for the complete enacted definitions and all qualifying language.</p><dl className="mt-7 grid gap-4 md:grid-cols-2">{definitions.map(([term, text]) => <div key={term} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5"><dt className="text-lg font-black text-[#f6c95a]">{term}</dt><dd className="mt-3 text-sm leading-6 text-emerald-50/82">{text}</dd></div>)}</dl></div></section>

      <section className="border-y border-teal-300/15 bg-[#07131b] py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><Landmark className="size-8 text-[#f6c95a]" aria-hidden="true" /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Complete chapter map</p><h2 className="mt-1 text-3xl font-black sm:text-4xl">Sections 65-1 through 65-11</h2></div></div><div className="mt-7 space-y-3">{sectionGuide.map(([number, title, summary]) => <article key={number} className="grid gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 sm:grid-cols-[5rem_1fr]"><p className="text-xl font-black text-[#f6c95a]">{number}</p><div><h3 className="text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-emerald-50/78">{summary}</p></div></article>)}</div></div></section>

      <section className="py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><ShieldCheck className="size-8 text-[#f6c95a]" aria-hidden="true" /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Before work begins</p><h2 className="mt-1 text-3xl font-black sm:text-4xl">Where Chapter 65 commonly applies</h2></div></div><div className="mt-7 grid gap-4 md:grid-cols-2">{actionCards.map(([title, text]) => <article key={title} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5"><h3 className="text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-emerald-50/78">{text}</p></article>)}</div><div className="mt-6 rounded-2xl border border-[#f6c95a]/25 bg-[#07131b] p-5 text-sm leading-6 text-emerald-50/78"><strong className="text-white">Do not assume every private tree requires a permit.</strong> Chapter 65 contains specific triggers involving heritage-tree status, zoning, historic districts, public property, regulated work, and other facts. Verify the tree and site before relying on a general summary.</div></div></section>

      <section className="border-t border-teal-300/15 bg-[#07131b] py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><Scale className="size-8 text-[#f6c95a]" aria-hidden="true" /><h2 className="text-3xl font-black">Official sources</h2></div><div className="mt-6 grid gap-3 sm:grid-cols-3"><a href={codeUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-[#f6c95a]/30 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring"><span>Current Chapter 65 on Municode</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" /></a><a href={cityPdfUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-teal-300/25 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring"><span>City-hosted ordinance PDF</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" /></a><a href={cityResourcesUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-teal-300/25 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring"><span>Urban Forestry rules and forms</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" /></a></div><p className="mt-6 text-xs leading-5 text-emerald-50/58">Last reviewed July 13, 2026. Mobile&apos;s online code notes that codification may lag newly adopted legislation; always check official sources and pending amendments.</p></div></section>
    </div>
  );
}
