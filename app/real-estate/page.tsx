import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
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
    id: "buyers",
    eyebrow: "I’m buying",
    title: "Know what you are taking on before closing.",
    text:
      "Understand tree risk, root conditions, deferred maintenance, preservation opportunities, and likely future costs before the inspection or due-diligence period ends.",
    Icon: Home
  },
  {
    id: "sellers",
    eyebrow: "I’m selling",
    title: "Prepare the trees before they become a negotiation surprise.",
    text:
      "Address visible concerns before listing, document priorities, and present valuable mature trees as managed assets rather than unknown liabilities.",
    Icon: ClipboardCheck
  },
  {
    id: "professionals",
    eyebrow: "I’m a real estate professional",
    title: "Give clients an independent path for tree questions.",
    text:
      "Help buyers, sellers, and investors identify concerns early, reduce surprises, and use qualified arborist guidance during due diligence and negotiations.",
    Icon: Handshake
  }
] as const;

const concerns = ["Hidden decay or structural defects", "Storm damage and broken limbs", "Root damage, trenching, or soil compaction", "Poor pruning or topping", "Trees over homes and use areas", "Deferred maintenance and removal costs", "Construction or utility conflicts", "Municipal or historic-area questions"];

const deliverables = ["Independent tree and site evaluation", "Clear immediate, near-term, and monitoring priorities", "ANSI A300-informed pruning prescription when pruning is recommended", "Preservation, further-investigation, and removal considerations", "Questions and scope language to use with tree contractors", "Documentation that can support transaction discussions"];

const questions = [
  ["Should this tree come down?", "Removal is not assumed. The assessment distinguishes defects, targets, risk, preservation options, monitoring, and when further investigation is appropriate."],
  ["Can the recommended work wait?", "Priorities can be organized into immediate concerns, work to plan during the next one to three years, and routine monitoring."],
  ["Are roots likely to affect the property?", "Visible root conditions, soil changes, excavation history, utilities, hardscape conflicts, and construction impacts can be evaluated in context."],
  ["Can the findings help during negotiations?", "Independent observations and maintenance priorities can help the parties understand the issue and ask better questions. Peter does not provide legal, insurance, or valuation advice."],
  ["Does a home inspector cover this?", "A home inspector evaluates the property broadly. An arborist focuses on the trees, their structure, roots, targets, site conditions, maintenance history, and tree-care recommendations."],
  ["Could the trees affect insurance?", "Insurers make their own underwriting decisions. An arborist can document tree conditions and recommended priorities for you to discuss with the appropriate insurance professional."]
] as const;

export default function RealEstatePage() {
  return (
    <div className="bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-14 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_75%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6c95a]/45 bg-[#f6c95a]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a] sm:text-sm"><ShieldCheck className="size-4" /> Pre-purchase tree due diligence</div>
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

      <section className="py-12 sm:py-16" aria-labelledby="choose-path-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">Choose your path</p><h2 id="choose-path-heading" className="mt-3 text-3xl font-black text-white sm:text-4xl">Start with where you are in the transaction.</h2></div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {audiences.map(({ id, eyebrow, title, text, Icon }) => (
              <article id={id} key={id} className="scroll-mt-40 rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.18)] sm:p-6">
                <Icon className="size-8 text-[#f6c95a]" aria-hidden="true" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.15em] text-[#f6c95a]">{eyebrow}</p>
                <h3 className="mt-2 text-xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-emerald-50/78">{text}</p>
                <a href={consultationAnchor} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring">Request guidance <ArrowRight className="size-4" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">What can go wrong?</p><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Tree concerns can become expensive surprises after closing.</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{concerns.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-teal-300/15 bg-white/[0.04] p-4 text-sm font-bold text-emerald-50/85"><AlertTriangle className="size-5 shrink-0 text-[#f6c95a]" />{item}</div>)}</div></div>
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">What you receive</p><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Decision-ready guidance—not a vague “trim the trees.”</h2><div className="mt-6 space-y-3">{deliverables.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-[#f6c95a]/20 bg-white/[0.04] p-4 text-sm font-bold text-emerald-50/85"><CheckCircle2 className="size-5 shrink-0 text-[#f6c95a]" />{item}</div>)}</div></div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-5 lg:grid-cols-2"><article className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-6"><SearchCheck className="size-8 text-[#f6c95a]" /><h2 className="mt-4 text-2xl font-black">Home inspector</h2><p className="mt-3 leading-7 text-emerald-50/78">Evaluates the home and property broadly and may flag visible tree concerns for specialist review.</p></article><article className="rounded-2xl border border-[#f6c95a]/30 bg-[#f6c95a]/[0.07] p-6"><TreePine className="size-8 text-[#f6c95a]" /><h2 className="mt-4 text-2xl font-black">Arborist</h2><p className="mt-3 leading-7 text-emerald-50/78">Evaluates tree structure, defects, targets, roots, site conditions, maintenance history, preservation options, and appropriate tree-care recommendations.</p></article></div><p className="mt-5 text-center text-lg font-black text-[#f6c95a]">A home inspector inspects the house. An arborist evaluates the trees.</p></div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">Typical questions</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Questions buyers, sellers, and agents ask.</h2><div className="mt-7 space-y-3">{questions.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 open:border-[#f6c95a]/45 sm:p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black [&::-webkit-details-marker]:hidden"><span>{question}</span><span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">+</span></summary><p className="mt-4 border-t border-teal-300/15 pt-4 text-sm leading-6 text-emerald-50/78">{answer}</p></details>)}</div></div>
      </section>

      <section className="bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="text-center text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">Where the assessment fits</p><h2 className="mt-3 text-center text-3xl font-black sm:text-4xl">Build tree due diligence into the transaction timeline.</h2><ol className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">{["Offer accepted", "Home inspection", "Tree assessment", "Review priorities", "Negotiations", "Closing"].map((step, index) => <li key={step} className={`rounded-2xl border p-4 text-center ${step === "Tree assessment" ? "border-[#f6c95a]/55 bg-[#f6c95a]/10" : "border-teal-300/20 bg-white/[0.04]"}`}><span className="mx-auto grid size-8 place-items-center rounded-full bg-[#f6c95a] text-sm font-black text-[#06110d]">{index + 1}</span><p className="mt-3 text-sm font-black">{step}</p></li>)}</ol><p className="mt-5 text-center text-sm text-emerald-50/70">Schedule as early as possible during the inspection or due-diligence period. Availability and transaction deadlines vary.</p></div>
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
