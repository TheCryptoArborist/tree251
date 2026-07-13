import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, Landmark, Scale, TreePine } from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile Tree Knowledge Center",
  description:
    "A source-linked library of Mobile, Alabama tree laws, property-maintenance provisions, historic trees, and public educational resources from The Arborist.",
  alternates: { canonical: "/knowledge-center" }
};

const officialResources = [
  ["Chapter 65 - Tree Protection and Management", "https://library.municode.com/al/mobile/codes/code_of_ordinances?nodeId=COMOALVOII_CH65TRPRMA"],
  ["Alabama Act 2015-116", "https://alison.legislature.state.al.us/files/pdf/SearchableInstruments/2015RS/Acts/2015-116.pdf"],
  ["City tree trimming and removal permits", "https://www.cityofmobile.gov/public-works/tree-trimming-removal-permits/"],
  ["City Urban Forestry tree resources", "https://www.cityofmobile.gov/public-works/environment/trees/"],
  ["Urban Forestry FAQs", "https://www.cityofmobile.gov/public-works/urban-forestry-department/urban-forestry-faqs/"],
  ["Mobile Tree Commission", "https://www.buildmobile.org/tree-commission/"]
] as const;

export default function KnowledgeCenterPage() {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-14 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_75%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">Source-linked public education</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.98] sm:text-6xl">Mobile Tree Knowledge Center</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">
            Plain-language orientation to Mobile&apos;s tree laws, official resources, historic trees, and urban-forestry topics - with direct links to the controlling sources.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Link href="/knowledge-center/laws-regulations/mobile-property-maintenance-code" className="group rounded-2xl border border-[#f6c95a]/35 bg-white/[0.06] p-6 transition hover:border-[#f6c95a]/70 hover:bg-white/[0.09] focus-ring">
              <Scale className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Laws &amp; Regulations</p>
              <h2 className="mt-2 text-2xl font-black">Property Maintenance Code: Trees</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">Definitions, hazard-tree and hazard-limb provisions, and related nuisance-abatement obligations in Chapter 52.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a]">Open reference <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>

            <Link href="/knowledge-center/laws-regulations/mobile-chapter-65" className="group rounded-2xl border border-teal-300/20 bg-white/[0.05] p-6 transition hover:border-teal-300/50 hover:bg-white/[0.08] focus-ring">
              <Landmark className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Official code</p>
              <h2 className="mt-2 text-2xl font-black">Mobile Chapter 65</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">Tree Protection and Management: permits, heritage trees, public trees, construction protection, contractors, tree abuse, and enforcement.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a]">Open reference <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>

            <a href="https://alison.legislature.state.al.us/files/pdf/SearchableInstruments/2015RS/Acts/2015-116.pdf" target="_blank" rel="noreferrer" className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-6 transition hover:border-teal-300/50 hover:bg-white/[0.08] focus-ring">
              <BookOpen className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">State law</p>
              <h2 className="mt-2 text-2xl font-black">Alabama Act 2015-116</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">Open the official enrolled act concerning tree protection in a Class 2 municipality.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-teal-300/15 bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TreePine className="size-9 text-[#f6c95a]" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">Official Mobile tree resources</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {officialResources.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/60 hover:bg-white/[0.08] focus-ring">
                <span>{label}</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 rounded-2xl border border-[#f6c95a]/25 bg-[#050b12]/75 p-5 text-sm leading-6 text-emerald-50/76">
            The Arborist does not issue citations or permits and does not speak on behalf of the City of Mobile or any municipality. This library is educational, is not legal advice, and should be checked against current official sources.
          </p>
        </div>
      </section>
    </div>
  );
}
