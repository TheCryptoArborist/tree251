import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, Info, Landmark, Scale, ShieldAlert, TreePine } from "lucide-react";

const officialOrdinancesUrl = "https://www.townofdauphinisland.org/town-ordinances";
const ordinancePdfUrl = "https://233b9393-d606-4527-bb55-be83050c5c72.filesusr.com/ugd/222868_f2eceba6d269496db76a9c4c1923a65f.pdf";

export const metadata: Metadata = {
  title: "Dauphin Island Ordinance 87C: Trees and Vegetation Protection",
  description:
    "A source-linked guide to Dauphin Island Ordinance 87C covering protected and heritage trees, permits, construction impact zones, mitigation fees, prohibited acts, exemptions, enforcement, and the Tree Committee.",
  alternates: { canonical: "/knowledge-center/laws-regulations/dauphin-island-ordinance-87c" }
};

const definitions = [
  ["Certified Arborist", "A person holding current ISA certification and qualified to assess tree health, structure, risk, and suitability for preservation."],
  ["Clear cutting", "Removal, destruction, or killing of a substantial portion of vegetation resulting in elimination of 40% or more of existing tree canopy on a parcel."],
  ["Construction Impact Zone (CIZ)", "The approved construction area where tree removal may occur without mitigation, limited to the minimum necessary and no more than 40% of total lot area."],
  ["Diameter at Breast Height (DBH)", "Tree diameter derived from circumference measured 4.5 feet above ground and divided by pi, with special measurement rules for forks, slopes, and irregular trunks."],
  ["Heritage Tree", "Live oak at least 24 inches DBH; other hardwood at least 20 inches; pine at least 14 inches; tupelo gum at least 6 inches; red cedar at least 12 inches; or magnolia at least 12 inches."],
  ["Protected Tree", "Any tree meeting or exceeding 4 inches DBH for its species under the ordinance."],
  ["Tree Mitigation Fund", "The Town fund receiving mitigation fees and fines for environmental restoration, tree preservation, and habitat enhancement."],
  ["Tree Protection Zone", "The canopy drip-line area or one foot of radius per inch of DBH, whichever is greater."]
] as const;

const sectionMap = [
  ["Section A", "Definitions", "Defines protected and heritage trees, DBH, canopy, clear cutting, CIZ, impervious surfaces, permits, mitigation fees, vegetation, enforcement, and related terms."],
  ["Section B", "Tree retention, removal, and mitigation", "Requires permits, establishes new-construction surveys and CIZ limits, addresses developed land and vegetation removal, and sets factors for permit decisions."],
  ["Section C", "Permit process", "Requires a complete signed application and supporting documentation, establishes pre-construction review, written findings, and permit-expiration rules."],
  ["Section D", "Mitigation costs", "Establishes DBH-based mitigation fees for protected and heritage trees and directs payment to the Tree Mitigation Fund."],
  ["Section E", "Prohibited acts", "Prohibits clear cutting, unauthorized right-of-way work, unauthorized heritage-tree or other tree removal, damaging retained trees, destructive treatment, harvesting for profit, and avoiding required mitigation fees."],
  ["Section F", "Exempt trees", "Identifies specified invasive, dead, diseased, damaged, detrimental, and imminently hazardous trees, while distinguishing mitigation-fee exemptions from permit requirements."],
  ["Section G", "Violations and penalties", "Addresses fines, mitigation and restoration liability, stop-work orders, certificate-of-occupancy consequences, contractor responsibility, repeat violations, liens, and separate violations by tree and day."],
  ["Section H", "Tree Committee", "Creates an advisory Tree Committee, defines membership and terms, lists advisory duties, and requires public meetings and records."],
  ["Section I", "Severability", "Keeps remaining provisions in force if part of the ordinance is held invalid."],
  ["Section J", "Repealer", "Repeals Ordinance 87B and conflicting provisions to the extent of conflict."],
  ["Section K", "Effective date", "Makes Ordinance 87C effective following adoption and publication; the signed copy records an effective date of April 28, 2026."]
] as const;

const permitHighlights = [
  "A Tree Removal Permit is required before removing or destroying any tree measuring 4 inches DBH or greater on any lot.",
  "The permit requirement also reaches trees in designated common areas, shared subdivision property, and Town rights-of-way.",
  "New construction generally requires a survey locating trees 4 inches DBH or greater before a building permit is issued.",
  "Trees within property setbacks generally remain unless an ordinance exemption applies.",
  "The CIZ may not exceed 40% of total lot area; the ordinance also retains a 25% impervious-surface ratio.",
  "Heritage-tree removal outside the CIZ requires Town Council approval and is not presumed to be approved.",
  "Permits expire after six months and can become void through delay, suspension, or abandonment as described in Section C."
] as const;

const feeHighlights = [
  ["Protected trees", "$100 multiplied by the tree's DBH in inches"],
  ["Heritage trees", "$150 multiplied by the tree's DBH in inches"],
  ["Calculation", "Each tree is calculated separately; paying a fee does not replace a fine, penalty, restoration obligation, or enforcement action."]
] as const;

const exemptTrees = [
  "Chinese tallow and the other common names listed in Section F",
  "Other invasive species identified through recognized lists and the Enforcement Officer",
  "Dead trees",
  "Diseased or detrimental trees",
  "Trees damaged by nature or fire",
  "Trees posing an imminent threat to life or property"
] as const;

export default function DauphinIslandOrdinance87CPage() {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-12 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_72%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_54%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 opacity-30" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/knowledge-center#dauphin-island" className="inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring">
            <ArrowLeft className="size-4" aria-hidden="true" /> Gulf Coast Tree Knowledge Center
          </Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">Dauphin Island, Alabama · Municipal ordinance</p>
          <h1 className="mt-4 text-4xl font-black leading-[1.02] sm:text-6xl">Trees and Vegetation Protection Ordinance 87C</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">
            A practical guide to protected trees, heritage trees, construction impact zones, removal permits, mitigation fees, prohibited acts, exemptions, enforcement, and the Town Tree Committee.
          </p>
          <div className="mt-7 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-50/68">
            <span className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2">Adopted April 21, 2026</span>
            <span className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2">Effective April 28, 2026</span>
            <span className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2">Replaces Ordinance 87B</span>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#f6c95a]/35 bg-[#f6c95a]/10 p-5 sm:p-6">
            <Info className="size-7 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-black">Important boundary</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/82">
              The Arborist does not issue permits or citations and does not speak on behalf of the Town of Dauphin Island or any municipality. This guide is educational, is not legal advice, and does not replace the signed ordinance, Town interpretations, permit conditions, or advice from a qualified attorney.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BookOpen className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="text-3xl font-black sm:text-4xl">Key definitions</h2>
          </div>
          <p className="mt-4 text-sm leading-6 text-emerald-50/70">Plain-language orientation based on Section A. Consult the ordinance for the complete definitions and measurement instructions.</p>
          <dl className="mt-7 grid gap-4 md:grid-cols-2">
            {definitions.map(([term, text]) => (
              <div key={term} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5">
                <dt className="text-lg font-black text-[#f6c95a]">{term}</dt>
                <dd className="mt-3 text-sm leading-6 text-emerald-50/82">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-teal-300/15 bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Landmark className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Complete ordinance map</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Sections A through K</h2>
            </div>
          </div>
          <div className="mt-7 space-y-3">
            {sectionMap.map(([number, title, summary], index) => (
              <details key={number} className="group rounded-2xl border border-teal-300/20 bg-white/[0.05] open:border-[#f6c95a]/45 open:bg-white/[0.08]" open={index === 0}>
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-ring">
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.14em] text-[#f6c95a]">{number}</span>
                    <span className="mt-1 block text-lg font-black">{title}</span>
                  </span>
                  <span className="text-2xl font-black text-[#f6c95a] transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="border-t border-teal-300/15 px-5 py-5 text-sm leading-7 text-emerald-50/82">{summary}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <TreePine className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="text-3xl font-black sm:text-4xl">Permit and construction highlights</h2>
          </div>
          <ul className="mt-7 grid gap-3">
            {permitHighlights.map((item) => <li key={item} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 text-sm leading-6 text-emerald-50/82">{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="border-y border-red-400/20 bg-[#11090c] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldAlert className="size-8 text-red-300" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-red-300">Sections D through G</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Fees, exemptions, and enforcement</h2>
            </div>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-5">
              <h3 className="text-lg font-black">Mitigation fees</h3>
              <dl className="mt-4 space-y-4">
                {feeHighlights.map(([term, text]) => <div key={term}><dt className="font-black text-red-200">{term}</dt><dd className="mt-1 text-sm leading-6 text-emerald-50/80">{text}</dd></div>)}
              </dl>
            </article>
            <article className="rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-5">
              <h3 className="text-lg font-black">Exempt-tree categories</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50/74">Section F generally exempts these trees from mitigation fees, not automatically from permits:</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-emerald-50/82">
                {exemptTrees.map((tree) => <li key={tree}>• {tree}</li>)}
              </ul>
            </article>
          </div>

          <p className="mt-5 rounded-2xl border border-red-400/25 bg-black/20 p-5 text-sm leading-6 text-emerald-50/80">
            Section G can treat each affected tree and each continuing day as a separate offense. It also authorizes restoration requirements, stop-work orders, certificate-of-occupancy consequences, contractor liability, and other remedies allowed by law.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Scale className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="text-3xl font-black sm:text-4xl">Sources and verification</h2>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-emerald-50/76">
            Reviewed page by page against the signed 13-page Ordinance 87C PDF supplied to The Arborist. The signature pages record adoption on April 21, 2026, posting on April 22, and an effective date of April 28, 2026. Verify later amendments with the Town.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={ordinancePdfUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-[#f6c95a]/30 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">
              <span>Open Ordinance 87C PDF</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            </a>
            <a href={officialOrdinancesUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-teal-300/25 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">
              <span>Town of Dauphin Island ordinances</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-6 text-xs leading-5 text-emerald-50/58">Last reviewed July 13, 2026.</p>
        </div>
      </section>
    </div>
  );
}
