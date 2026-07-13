import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Info, Scale, ShieldAlert, TreePine } from "lucide-react";

const officialCodeUrl = "https://library.municode.com/al/mobile/codes/code_of_ordinances?nodeId=COMOALVOII_CH52REPRMAEN_ARTIPRMACO_S52-1PRMACO";
const adoptedOrdinanceUrl = "https://www.cityofmobile.gov/uploads/22110901181765-056.pdf";

export const metadata: Metadata = {
  title: "Mobile Property Maintenance Code: Hazard Trees and Limbs",
  description: "A source-linked reference to City of Mobile Chapter 52 definitions and provisions concerning hazard trees, hazard limbs, fallen dead trees, and property maintenance.",
  alternates: { canonical: "/knowledge-center/laws-regulations/mobile-property-maintenance-code" }
};

const definitions = [
  ["Hazard limb", "A tree limb the Urban Forester has determined to have a structural defect and location that increases the chance of falling and hitting a target. The combination of a defect and target can result in property damage or personal injury."],
  ["Hazard tree", "A tree the Urban Forester has determined to have a structural defect and location that increases the chance of falling and hitting a target. The combination of a defect and target can result in property damage or personal injury."],
  ["Tree", "A large woody perennial plant that grows to a mature height greater than 16 feet and typically has a single erect main stem (trunk) with side branches."],
  ["Tree limb", "Any of the main branches arising from the main stem (trunk) of the tree."],
  ["Urban forester", "The City of Mobile employee specially trained in forestry, urban forestry, arboriculture and urbiculture, or his/her duly authorized designee."]
] as const;

const contextSections = [
  ["301.2 - Responsibility", "Places general responsibility on the owner to maintain structures and exterior property in compliance with Chapter 3, while assigning occupants responsibility for areas they occupy and control."],
  ["301.3 - Vacant structures and land", "Requires vacant structures, their premises, and vacant land to be kept clean, safe, secure, and sanitary so they do not create blight or adversely affect public health or safety."],
  ["302.1 - Sanitation", "Requires exterior property and premises to be maintained in a clean, safe, and sanitary condition."],
  ["52-102 - Definitions used by the nuisance article", "Defines trash to include yard clippings, leaves, wood, tree limbs, and trunks. This is a debris classification, not a hazard-tree determination."],
  ["52-103 - Duty to maintain and prevent", "Requires owners or occupants to keep property free of listed nuisances and to remove and prevent accumulations of junk, litter, and debris. Because Section 52-102 includes tree limbs and trunks within trash, those materials can fall within this broader cleanup duty."],
  ["52-104 - Nuisance prevention standards", "Requires owners or occupants to keep property clean and remove listed abandoned items, expressly including fallen dead trees. Noncompliance can lead to enforcement or nuisance-abatement procedures."],
] as const;

export default function MobilePropertyMaintenanceCodePage() {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-12 sm:py-18">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(246,201,90,0.15),transparent_25rem),radial-gradient(circle_at_85%_70%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_55%,#0b1f17_100%)]" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/knowledge-center" className="inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring"><ArrowLeft className="size-4" aria-hidden="true" /> Mobile Tree Knowledge Center</Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">Laws &amp; Regulations - Chapter 52</p>
          <h1 className="mt-4 text-4xl font-black leading-[1.02] sm:text-6xl">Hazard trees, hazard limbs, and property maintenance</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">A focused reference to the City of Mobile Property Maintenance Code provisions that directly regulate tree hazards, plus broader lot-maintenance provisions that mention fallen dead trees.</p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#f6c95a]/35 bg-[#f6c95a]/10 p-5 sm:p-6">
            <Info className="size-7 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-black">Important boundary</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/82">The Arborist does not issue citations or permits and does not speak on behalf of the City of Mobile or any municipality. This page is educational, is not legal advice, and does not replace the current official code, a notice of violation, or advice from a qualified attorney.</p>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><Scale className="size-8 text-[#f6c95a]" aria-hidden="true" /><h2 className="text-3xl font-black sm:text-4xl">Code definitions</h2></div>
          <p className="mt-4 text-sm leading-6 text-emerald-50/70">The following short definitions are transcribed from Section 202 of the adopted Property Maintenance Code.</p>
          <dl className="mt-7 grid gap-4 md:grid-cols-2">
            {definitions.map(([term, text]) => <div key={term} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5"><dt className="text-lg font-black uppercase text-[#f6c95a]">{term}</dt><dd className="mt-3 text-sm leading-6 text-emerald-50/82">{text}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="border-y border-red-400/20 bg-[#11090c] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><ShieldAlert className="size-8 text-red-300" aria-hidden="true" /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-red-300">Direct tree-hazard provisions</p><h2 className="mt-1 text-3xl font-black sm:text-4xl">Sections 302.10 and 302.11</h2></div></div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-5 sm:p-6"><p className="text-sm font-black uppercase tracking-[0.14em] text-red-300">302.10 - Hazard tree</p><p className="mt-4 text-base leading-7 text-emerald-50/88">Any dead or hazard tree on the premises that could fall into the public way or right-of-way must be removed. Failure to remove it after notice of violation from the urban forester violates this section.</p><p className="mt-4 text-xs leading-5 text-emerald-50/62">Plain-language orientation; consult the linked official text for the enacted wording.</p></article>
            <article className="rounded-2xl border border-red-400/30 bg-red-400/[0.06] p-5 sm:p-6"><p className="text-sm font-black uppercase tracking-[0.14em] text-red-300">302.11 - Hazard limb</p><p className="mt-4 text-base leading-7 text-emerald-50/88">Any dead or hazard tree limb at least 2 inches in diameter, attached to a tree on the premises, that could fall into the public way or right-of-way must be removed. Failure to remove it after notice of violation from the urban forester violates this section.</p><p className="mt-4 text-xs leading-5 text-emerald-50/62">Plain-language orientation; consult the linked official text for the enacted wording.</p></article>
          </div>
          <div className="mt-6 rounded-2xl border border-[#f6c95a]/25 bg-[#050b12]/70 p-5 text-sm leading-6 text-emerald-50/78"><strong className="text-white">What makes these provisions distinct:</strong> they address a tree or attached limb with possible impact to a public way or right-of-way, and the defined hazard determination is made by the Urban Forester. They should not be read as a general declaration that every defective private tree is automatically a code-defined hazard tree.</div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><TreePine className="size-8 text-[#f6c95a]" aria-hidden="true" /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Broader maintenance and nuisance context</p><h2 className="mt-1 text-3xl font-black sm:text-4xl">Related Chapter 52 provisions</h2></div></div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-emerald-50/76">These sections do not define a hazard tree or hazard limb. They establish general property-maintenance duties or nuisance-abatement procedures and are included because they can apply to tree debris or fallen dead trees.</p>
          <div className="mt-7 space-y-4">{contextSections.map(([section, summary]) => <article key={section} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5"><h3 className="text-lg font-black text-white">{section}</h3><p className="mt-2 text-sm leading-6 text-emerald-50/78">{summary}</p></article>)}</div>
          <div className="mt-6 rounded-2xl border border-teal-300/20 bg-[#07131b] p-5"><h3 className="font-black text-[#f6c95a]">Tree-related terms captured by this reference</h3><p className="mt-2 text-sm leading-6 text-emerald-50/76">Trees; tree limbs; trunks within the definitions of tree and tree limb; dead or hazard trees; dead or hazard limbs; and fallen dead trees within general nuisance-prevention duties. No unrelated vegetation provision is presented as a tree-hazard rule.</p></div>
        </div>
      </section>

      <section className="border-t border-teal-300/15 bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-black">Official sources</h2><div className="mt-6 grid gap-3 sm:grid-cols-2"><a href={officialCodeUrl} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-[#f6c95a]/30 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring"><span>Current Chapter 52 on Municode</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" /></a><a href={adoptedOrdinanceUrl} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-teal-300/25 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring"><span>City of Mobile adopted ordinance PDF</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" /></a></div><p className="mt-6 text-xs leading-5 text-emerald-50/58">Last reviewed July 13, 2026. Codes can change; verify the current official publication before relying on any provision.</p></div>
      </section>
    </div>
  );
}
