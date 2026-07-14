import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, Landmark, MapPin, Scale, TreePine } from "lucide-react";

export const metadata: Metadata = {
  title: "Gulf Coast Tree Knowledge Center",
  description:
    "A jurisdiction-organized, source-linked library of Alabama and Gulf Coast municipal tree laws, property-maintenance provisions, and official resources.",
  alternates: { canonical: "/knowledge-center" }
};

const mobileResources = [
  ["Chapter 65 - Tree Protection and Management", "https://library.municode.com/al/mobile/codes/code_of_ordinances?nodeId=COMOALVOII_CH65TRPRMA"],
  ["Tree trimming and removal permits", "https://www.cityofmobile.gov/public-works/tree-trimming-removal-permits/"],
  ["Urban Forestry tree resources", "https://www.cityofmobile.gov/public-works/environment/trees/"],
  ["Urban Forestry FAQs", "https://www.cityofmobile.gov/public-works/urban-forestry-department/urban-forestry-faqs/"],
  ["Mobile Tree Commission", "https://www.buildmobile.org/tree-commission/"]
] as const;

const orangeBeachResources = [
  ["Orange Beach Code of Ordinances", "https://library.municode.com/al/orange_beach/codes/code_of_ordinances"],
  ["Orange Beach Planning & Zoning", "https://www.orangebeachal.gov/409/Planning-Zoning"]
] as const;

const dauphinIslandResources = [
  ["Town ordinances", "https://www.townofdauphinisland.org/town-ordinances"],
  ["Ordinance 87C PDF", "https://233b9393-d606-4527-bb55-be83050c5c72.filesusr.com/ugd/222868_f2eceba6d269496db76a9c4c1923a65f.pdf"]
] as const;

function ResourceLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/60 hover:bg-white/[0.08] focus-ring"
    >
      <span>{label}</span>
      <ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
    </a>
  );
}

export default function KnowledgeCenterPage() {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-14 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_75%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">Organized by jurisdiction</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.98] sm:text-6xl">Gulf Coast Tree Knowledge Center</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">
            Select the state or municipality whose tree laws and official resources you need. Each jurisdiction is grouped separately to prevent confusion between state law and local requirements.
          </p>
          <nav aria-label="Knowledge Center jurisdictions" className="mt-7 flex flex-wrap gap-2">
            <a href="#alabama" className="rounded-full border border-[#f6c95a]/35 bg-white/[0.05] px-4 py-2 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">State of Alabama</a>
            <a href="#mobile" className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">Mobile</a>
            <a href="#orange-beach" className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">Orange Beach</a>
            <a href="#dauphin-island" className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">Dauphin Island</a>
          </nav>
        </div>
      </section>

      <section id="alabama" className="scroll-mt-40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[#f6c95a]/35 bg-[#f6c95a]/10">
              <Landmark className="size-7 text-[#f6c95a]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Statewide law</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">State of Alabama</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/72">State legislation and codified provisions that are separate from municipal ordinances.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Link href="/knowledge-center/laws-regulations/alabama-act-2015-116" className="group rounded-2xl border border-[#f6c95a]/35 bg-white/[0.06] p-6 transition hover:border-[#f6c95a]/70 hover:bg-white/[0.09] focus-ring">
              <BookOpen className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Act 2015-116 · HB207</p>
              <h3 className="mt-2 text-2xl font-black">Tree Commission in a Class 2 Municipality</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">Clean, section-by-section enacted text with struck-through prior language omitted.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a]">Open state reference <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section id="mobile" className="scroll-mt-40 border-y border-teal-300/15 bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-teal-300/25 bg-teal-300/10">
              <MapPin className="size-7 text-[#f6c95a]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Municipal documents</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Mobile, Alabama</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/72">City codes, hazard-tree provisions, permits, Tree Commission information, and Urban Forestry resources.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Link href="/knowledge-center/laws-regulations/mobile-property-maintenance-code" className="group rounded-2xl border border-[#f6c95a]/35 bg-white/[0.06] p-6 transition hover:border-[#f6c95a]/70 hover:bg-white/[0.09] focus-ring">
              <Scale className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Chapter 52</p>
              <h3 className="mt-2 text-2xl font-black">Property Maintenance Code: Trees</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">Definitions, hazard-tree and hazard-limb provisions, and related nuisance-abatement obligations.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a]">Open Mobile reference <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>

            <Link href="/knowledge-center/laws-regulations/mobile-chapter-65" className="group rounded-2xl border border-teal-300/20 bg-white/[0.05] p-6 transition hover:border-teal-300/50 hover:bg-white/[0.08] focus-ring">
              <Landmark className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Chapter 65</p>
              <h3 className="mt-2 text-2xl font-black">Tree Protection and Management</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">Permits, heritage trees, public trees, construction protection, contractors, tree abuse, and enforcement.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a]">Open Mobile reference <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-black">Official Mobile resources</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mobileResources.map(([label, href]) => <ResourceLink key={href} label={label} href={href} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="orange-beach" className="scroll-mt-40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[#f6c95a]/35 bg-[#f6c95a]/10">
              <TreePine className="size-7 text-[#f6c95a]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Municipal documents</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Orange Beach, Alabama</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/72">Tree protection, landscaping, surveys, construction protection, removal permits, and replacement requirements.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Link href="/knowledge-center/laws-regulations/orange-beach-article-16" className="group rounded-2xl border border-[#f6c95a]/30 bg-white/[0.05] p-6 transition hover:border-[#f6c95a]/65 hover:bg-white/[0.08] focus-ring">
              <TreePine className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Article 16</p>
              <h3 className="mt-2 text-2xl font-black">Tree Protection and Landscaping</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">Protected and heritage trees, landscape plans, tree surveys, construction protection, permits, replacement, and enforcement.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a]">Open Orange Beach reference <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-black">Official Orange Beach resources</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {orangeBeachResources.map(([label, href]) => <ResourceLink key={href} label={label} href={href} />)}
            </div>
          </div>

        </div>
      </section>

      <section id="dauphin-island" className="scroll-mt-40 border-y border-teal-300/15 bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-teal-300/25 bg-teal-300/10">
              <TreePine className="size-7 text-[#f6c95a]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Municipal documents</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Dauphin Island, Alabama</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/72">Protected and heritage trees, construction impact zones, permits, mitigation fees, prohibited acts, exemptions, enforcement, and the Town Tree Committee.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Link href="/knowledge-center/laws-regulations/dauphin-island-ordinance-87c" className="group rounded-2xl border border-[#f6c95a]/30 bg-white/[0.05] p-6 transition hover:border-[#f6c95a]/65 hover:bg-white/[0.08] focus-ring">
              <TreePine className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Ordinance 87C · Effective April 28, 2026</p>
              <h3 className="mt-2 text-2xl font-black">Trees and Vegetation Protection</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">A section-by-section guide covering protected trees, construction, permits, mitigation, prohibited acts, exemptions, enforcement, and the Tree Committee.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a]">Open Dauphin Island reference <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-black">Official Dauphin Island resources</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dauphinIslandResources.map(([label, href]) => <ResourceLink key={href} label={label} href={href} />)}
            </div>
          </div>

          <p className="mt-10 rounded-2xl border border-[#f6c95a]/25 bg-[#050b12]/75 p-5 text-sm leading-6 text-emerald-50/76">
            The Arborist does not issue citations or permits and does not speak on behalf of the State of Alabama, the City of Mobile, the City of Orange Beach, the Town of Dauphin Island, or any municipality. This library is educational, is not legal advice, and should be checked against current official sources.
          </p>
        </div>
      </section>
    </div>
  );
}
