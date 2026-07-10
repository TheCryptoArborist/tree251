import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Handshake,
  Home,
  SearchCheck,
  ShieldCheck,
  TreePine
} from "lucide-react";
import {
  consultationAnchor,
  phoneConsultationAnchor,
  RequestConsultationButton,
  SchedulePhoneButton
} from "@/components/ConsultBranding";

export const metadata: Metadata = {
  title: "Real Estate Tree Assessments",
  description:
    "Independent tree due diligence for homebuyers, sellers, real estate agents, investors, and commercial property transactions across the Gulf Coast."
};

const checklist = [
  {
    title: "Tree Risk Assessment",
    detail:
      "Evaluate visible defects, targets, likelihood of failure, consequences, storm exposure, and whether additional investigation or monitoring is warranted."
  },
  {
    title: "ANSI A300-Informed Pruning Prescription",
    detail:
      "When pruning is recommended, the scope should identify the objective, affected branches, pruning method, clearance needs, risk-reduction goal, and applicable tree care standards instead of using vague directions such as 'trim the trees.'"
  },
  {
    title: "Root System and Soil Evaluation",
    detail:
      "Look for root cutting, excavation, utility conflicts, grade changes, soil compaction, fill soil, restricted rooting space, surface-root conflicts, and construction damage."
  },
  {
    title: "Previous Pruning and Storm History",
    detail:
      "Identify topping, heading cuts, lion-tailing, excessive canopy raising, large pruning wounds, broken scaffold limbs, lightning damage, old failures, and storm-related defects."
  },
  {
    title: "Species, Mature Size, and Site Compatibility",
    detail:
      "Document the tree species, likely mature dimensions, expected maintenance, site suitability, potential conflicts, and whether the tree is likely to remain an asset over time."
  },
  {
    title: "Deferred Maintenance and Priority Planning",
    detail:
      "Separate urgent work from short-term maintenance, routine pruning, monitoring, preservation opportunities, and budgetable future work."
  },
  {
    title: "Construction and Utility Impacts",
    detail:
      "Review driveways, foundations, pools, drainage changes, utility installations, trenching, grading, and other past or planned work that may affect roots or tree stability."
  },
  {
    title: "Preserve, Improve, Monitor, or Remove",
    detail:
      "Avoid treating every concern as a removal decision. Determine which trees should be preserved, improved through prescribed work, monitored, investigated further, or removed."
  },
  {
    title: "Future Maintenance and Transaction Planning",
    detail:
      "Organize immediate, one-to-three-year, and longer-term priorities so buyers and sellers understand likely responsibilities before closing."
  }
] as const;

const audiences = [
  {
    title: "Homebuyers",
    text:
      "Understand tree risk, root conditions, deferred maintenance, preservation opportunities, and likely future costs before the inspection or due-diligence period ends.",
    Icon: Home
  },
  {
    title: "Real Estate Agents",
    text:
      "Help clients identify tree-related questions early, reduce surprises, and bring qualified arborist guidance into the transaction when mature trees are a material concern.",
    Icon: Handshake
  },
  {
    title: "Home Sellers",
    text:
      "Address visible concerns before listing, document tree condition, prioritize maintenance, and present valuable mature trees as a managed asset rather than an unknown liability.",
    Icon: ClipboardCheck
  },
  {
    title: "Commercial Buyers and Investors",
    text:
      "Use tree inventories, surveys, risk assessments, maintenance prioritization, and preservation planning for apartments, retail centers, offices, campuses, churches, schools, and large managed properties.",
    Icon: Building2
  }
] as const;

export default function RealEstatePage() {
  return (
    <div className="bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-14 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_75%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Real estate tree due diligence
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.98] text-white sm:text-6xl">
            Know the condition of the trees before you close.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">
            Mature trees can add shade, beauty, privacy, and property value. They can also carry hidden defects, root damage, storm history, deferred maintenance, and substantial future costs. An independent arborist assessment helps buyers, sellers, agents, and investors make better-informed decisions before the transaction is complete.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RequestConsultationButton />
            <SchedulePhoneButton />
            <Link
              href="/real-estate/checklist"
              data-track-event="Real Estate Checklist Click"
              data-track-location="real_estate_hero"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-teal-300/30 bg-white/[0.05] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-white/[0.09] focus-ring"
            >
              Open homebuyer checklist
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {audiences.map(({ title, text, Icon }) => (
              <article key={title} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
                <Icon className="size-8 text-[#f6c95a]" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-black text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-emerald-50/78">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#07131b] py-12 sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_20%,rgba(18,192,168,0.12),transparent_24rem),radial-gradient(circle_at_88%_75%,rgba(246,201,90,0.12),transparent_22rem)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">Pre-purchase checklist</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
              What should be evaluated before a home purchase?
            </h2>
            <p className="mt-4 text-base leading-7 text-emerald-50/80">
              The evaluation should address both present risk and long-term ownership responsibilities. The goal is not to create unnecessary alarm. It is to distinguish urgent issues from manageable maintenance and valuable preservation opportunities.
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {checklist.map((item) => (
              <details key={item.title} className="group rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 open:border-[#f6c95a]/45 open:bg-white/[0.08] sm:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-white [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                    {item.title}
                  </span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 border-t border-teal-300/15 pt-4 text-sm leading-6 text-emerald-50/78">{item.detail}</p>
              </details>
            ))}
          </div>

          <Link
            href="/real-estate/checklist"
            data-track-event="Real Estate Checklist Click"
            data-track-location="real_estate_checklist_section"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring sm:w-auto"
          >
            View printable checklist
            <FileText className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 sm:p-6">
            <SearchCheck className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-white">A home inspection is not a tree risk assessment.</h2>
            <p className="mt-4 text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">
              A general home inspection may note visible tree concerns, but an arborist evaluation focuses on tree structure, defects, targets, roots, site conditions, maintenance history, preservation options, and appropriate tree-care recommendations.
            </p>
          </article>
          <article className="rounded-2xl border border-[#f6c95a]/25 bg-white/[0.05] p-5 sm:p-6">
            <ShieldCheck className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-white">Pruning should begin with a prescription.</h2>
            <p className="mt-4 text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">
              When work is recommended, a proper pruning prescription should define the objective, scope, priority, and applicable standards. This gives the buyer, seller, and contractor a clearer work plan and helps avoid indiscriminate cutting that may increase stress, defects, or future risk.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">Real-world transaction concern</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Utility work can change the value and risk picture.</h2>
            <p className="mt-4 text-base leading-7 text-emerald-50/80">
              A plumbing contractor working near a large historic tree needed guidance about replacing a lateral without unnecessarily damaging major roots. Situations like this matter during real estate transactions because past excavation, future utility replacement, root conflicts, and preservation feasibility may affect both ownership costs and the long-term condition of the tree.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <TreePine className="mx-auto size-10 text-[#f6c95a]" aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-black text-white sm:text-5xl">
            Understand the trees before making one of your largest investments.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-emerald-50/80 sm:text-lg">
            Peter provides independent arborist guidance across the Gulf Coast for buyers, sellers, agents, property managers, investors, and commercial transaction teams.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={consultationAnchor}
              data-track-event="Request Assessment Click"
              data-track-location="real_estate_closing_cta"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Request real estate tree due diligence
            </a>
            <a
              href={phoneConsultationAnchor}
              data-track-event="Schedule Phone Click"
              data-track-location="real_estate_closing_cta"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-teal-300/30 bg-white/[0.05] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-white/[0.09] focus-ring"
            >
              Schedule a phone consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
