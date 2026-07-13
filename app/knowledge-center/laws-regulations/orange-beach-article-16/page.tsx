import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, Info, Landmark, Scale, ShieldAlert, TreePine } from "lucide-react";

const officialCodeUrl = "https://library.municode.com/al/orange_beach/codes/code_of_ordinances";
const cityPlanningUrl = "https://www.orangebeachal.gov/409/Planning-Zoning";

export const metadata: Metadata = {
  title: "Orange Beach Article 16: Tree Protection and Landscaping",
  description: "A source-linked guide to Orange Beach Article 16 covering protected and heritage trees, landscaping, tree surveys, permits, replacement, construction protection, and enforcement.",
  alternates: { canonical: "/knowledge-center/laws-regulations/orange-beach-article-16" }
};

const definitions = [
  ["Diameter breast height (DBH)", "Tree-trunk diameter measured 4.5 feet above existing grade."],
  ["Heritage tree", "A healthy protected tree and its root system with DBH of at least 30 inches or circumference of 7 feet 10 inches, whichever qualifying dimension is less."],
  ["Protected tree", "A tree and its root system meeting the criteria in Section 16.07(A)."],
  ["Protective barricade", "A physical barrier at least 3 feet high that limits access and protects protected and heritage trees during construction."],
  ["Removed tree", "A protected or heritage tree that has been irreversibly damaged or destroyed."],
  ["Site clearing", "Development or another activity altering the land, except normal sodding and placement of signs."]
] as const;

const sections = [
  ["16.01", "Purpose", "Protects heritage and protected trees, regulates landscaping, allows removal under stated circumstances, requires replacement, preserves canopy, and balances environmental protection with reasonable property use."],
  ["16.02", "Applicability", "Applies to new construction, expansion, development, redevelopment, clearing, grubbing, and property maintenance unless exempt. Listed exemptions cover specified municipal work, public utilities in rights-of-way, and disaster-damaged protected trees."],
  ["16.03", "Definitions", "Defines DBH, heritage and protected trees, protective methods, removed trees, shade trees, site clearing, and related terms."],
  ["16.04", "Landscaping requirements", "Sets landscaped-area, perimeter, vehicular-use-area, screening, planting, and replacement requirements, generally excluding single-family and duplex uses from this section."],
  ["16.05", "Landscape plan", "Requires qualifying projects to submit a landscape plan and a tree survey covering on-site protected trees and off-site protected trees within 25 feet of proposed construction and earthwork."],
  ["16.06", "Maintenance", "Makes the legal owner responsible for required landscape areas and replacement of dead plant material within the appropriate growing season, not exceeding six months."],
  ["16.07", "Protected trees and preservation", "Defines protected and heritage trees and addresses residential exemptions, credits and debits, replacement, protective radii, utilities, grading, paving, parking reductions, new planting, and right-of-way trees."],
  ["16.08", "Tree removal and site clearing permit", "Requires a permit before cutting, removing, trimming, or damaging a protected tree unless exempt; specifies application information, inspection, approval conditions, and a 15-working-day review period."],
  ["16.09", "Enforcement", "Provides for notices, remedial work, stop-work orders, permit-cost consequences, replacement obligations, and potential criminal penalties."]
] as const;

const thresholds = [
  ["Redbuds and dogwoods", "4 inches DBH or greater"],
  ["Longleaf pine", "18 inches DBH or greater"],
  ["Other trees", "6 inches DBH or greater, subject to listed exclusions"],
  ["Heritage trees", "Healthy protected trees meeting the 30-inch DBH / 7-foot-10-inch circumference threshold"]
] as const;

export default function OrangeBeachArticle16Page() {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-12 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_72%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_54%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 opacity-30" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/knowledge-center" className="inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring"><ArrowLeft className="size-4" aria-hidden="true" /> Gulf Coast Tree Knowledge Center</Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">Orange Beach, Alabama - Laws &amp; Regulations</p>
          <h1 className="mt-4 text-4xl font-black leading-[1.02] sm:text-6xl">Article 16: Tree Protection and Landscaping</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">A practical guide to protected and heritage trees, landscape plans, tree surveys, construction protection, removal permits, replacement requirements, and enforcement in Orange Beach.</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-emerald-50/58">Source document revision: December 5, 2023</p>
        </div>
      </section>

      <section className="py-10 sm:py-14"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="rounded-2xl border border-[#f6c95a]/35 bg-[#f6c95a]/10 p-5 sm:p-6"><Info className="size-7 text-[#f6c95a]" aria-hidden="true" /><h2 className="mt-3 text-xl font-black">Important boundary</h2><p className="mt-3 text-sm leading-6 text-emerald-50/82">The Arborist does not issue permits or citations and does not speak on behalf of the City of Orange Beach or any municipality. This page is educational, is not legal advice, and does not replace the current ordinance, official interpretations, permit conditions, or advice from a qualified attorney.</p></div></div></section>

      <section className="pb-12 sm:pb-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><BookOpen className="size-8 text-[#f6c95a]" aria-hidden="true" /><h2 className="text-3xl font-black sm:text-4xl">Key definitions</h2></div><p className="mt-4 text-sm leading-6 text-emerald-50/70">Plain-language orientation based on Section 16.03. Consult the ordinance for complete wording.</p><dl className="mt-7 grid gap-4 md:grid-cols-2">{definitions.map(([term, text]) => <div key={term} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5"><dt className="text-lg font-black text-[#f6c95a]">{term}</dt><dd className="mt-3 text-sm leading-6 text-emerald-50/82">{text}</dd></div>)}</dl></div></section>

      <section className="border-y border-teal-300/15 bg-[#07131b] py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><Landmark className="size-8 text-[#f6c95a]" aria-hidden="true" /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Complete article map</p><h2 className="mt-1 text-3xl font-black sm:text-4xl">Sections 16.01 through 16.09</h2></div></div><div className="mt-7 space-y-3">{sections.map(([number, title, summary]) => <article key={number} className="grid gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 sm:grid-cols-[5rem_1fr]"><p className="text-xl font-black text-[#f6c95a]">{number}</p><div><h3 className="text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-emerald-50/78">{summary}</p></div></article>)}</div></div></section>

      <section className="py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><TreePine className="size-8 text-[#f6c95a]" aria-hidden="true" /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Section 16.07(A)</p><h2 className="mt-1 text-3xl font-black sm:text-4xl">Protected-tree thresholds</h2></div></div><div className="mt-7 grid gap-4 sm:grid-cols-2">{thresholds.map(([tree, threshold]) => <article key={tree} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5"><h3 className="font-black">{tree}</h3><p className="mt-2 text-sm leading-6 text-emerald-50/78">{threshold}</p></article>)}</div><p className="mt-5 rounded-2xl border border-[#f6c95a]/25 bg-[#07131b] p-5 text-sm leading-6 text-emerald-50/78">The ordinance excludes Chinese tallow, chinaberry, tree of heaven, mimosa, paper mulberry, pines other than longleaf pine, and other recognized nuisance or invasive species. Confirm identification before relying on an exclusion.</p></div></section>

      <section className="border-y border-red-400/20 bg-[#11090c] py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><ShieldAlert className="size-8 text-red-300" aria-hidden="true" /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-red-300">Permit and enforcement overview</p><h2 className="mt-1 text-3xl font-black sm:text-4xl">Before clearing or tree work begins</h2></div></div><div className="mt-7 grid gap-4 lg:grid-cols-2"><article className="rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-5"><h3 className="text-lg font-black">Permit review</h3><p className="mt-3 text-sm leading-6 text-emerald-50/82">Unless exempt, approval is required before cutting, removing, trimming, or damaging a protected tree on private property or in a road right-of-way. Applications identify trees, improvements, grading, preservation, and removal. The department has 15 working days after receiving a complete application to act.</p></article><article className="rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-5"><h3 className="text-lg font-black">Enforcement</h3><p className="mt-3 text-sm leading-6 text-emerald-50/82">Section 16.09 provides for notice, remedial work, and stop-work orders. Work without approval can trigger twice the permit cost, replacement equal to diameter inches removed, and potential misdemeanor penalties upon conviction.</p></article></div></div></section>

      <section className="py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><Scale className="size-8 text-[#f6c95a]" aria-hidden="true" /><h2 className="text-3xl font-black">Construction and replacement highlights</h2></div><div className="mt-7 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5"><h3 className="text-lg font-black">Protective radii</h3><p className="mt-3 text-sm leading-6 text-emerald-50/78">Barricades are generally placed at least 10 feet from protected-tree trunks and 20 feet from heritage-tree trunks. The same minimum distances apply to underground utilities unless the ordinance&apos;s hardship method is used.</p></article><article className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5"><h3 className="text-lg font-black">Replacement</h3><p className="mt-3 text-sm leading-6 text-emerald-50/78">Article 16 uses tree credits and debits based on DBH, requires qualifying replacement trees when protected trees are removed, and includes planting requirements where a development site has no existing protected trees.</p></article></div></div></section>

      <section className="border-t border-teal-300/15 bg-[#07131b] py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-black">Sources and verification</h2><p className="mt-4 max-w-3xl text-sm leading-6 text-emerald-50/76">Reviewed against the City of Orange Beach Article 16 PDF supplied to The Arborist, marked revised December 5, 2023. Ordinances can change; verify current requirements with official City sources before acting.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><a href={officialCodeUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-[#f6c95a]/30 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring"><span>Orange Beach Code of Ordinances</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" /></a><a href={cityPlanningUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-teal-300/25 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring"><span>Orange Beach Planning &amp; Zoning</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" /></a></div><p className="mt-6 text-xs leading-5 text-emerald-50/58">Last reviewed July 13, 2026.</p></div></section>
    </div>
  );
}
