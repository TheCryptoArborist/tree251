import { ArrowRight, CalendarDays, ClipboardCheck, Construction, ShieldAlert, TreePine } from "lucide-react";
import { consultationAnchor, phoneConsultationAnchor } from "@/components/ConsultBranding";

const stormChecklist = [
  "New lean or a sudden change in canopy position.",
  "Cracked soil, lifted roots, or movement around the root plate.",
  "Hanging limbs, broken limbs, or split branch unions over targets.",
  "Fresh trunk cracks, bark separation, cavities, or exposed decay.",
  "Large broken limbs near homes, roads, driveways, fences, utilities, or gathering areas.",
  "Trees that were previously topped, lion-tailed, over-raised, or poorly pruned."
];

const inventoryPlanner = [
  "How many trees are on the property and where they are located.",
  "Which trees are high priority, lower priority, or simply need monitoring.",
  "Which trees likely need pruning, clearance, removal, preservation, or future reassessment.",
  "How the work can be phased into realistic maintenance cycles and budgets.",
  "What boards, managers, municipalities, or contractors need to understand before approving work."
];

const constructionPlanner = [
  "Building additions, driveways, pools, hardscapes, grading, fill, trenching, and utility work.",
  "Equipment access, material storage, parking, and staging areas near trees.",
  "Root-zone protection, soil compaction, grade changes, and clearance pruning needs.",
  "Which trees are realistic preservation candidates before construction decisions are locked in.",
  "Tree protection expectations that can be communicated to contractors or project teams."
];

const utilityPlanner = [
  "Plumbing laterals, sewer lines, drainage, irrigation, boring, trenching, or underground utilities near mature trees.",
  "Whether the existing trench can be reused or the new line can be rerouted around important roots.",
  "Whether hand digging, air excavation, boring, or adjusted routing may reduce root impacts.",
  "Whether proposed root cutting could create decline, instability, or a future risk concern.",
  "What should be documented before excavation begins."
];

const seasonalTiming = [
  {
    season: "Before hurricane season",
    text: "Prioritize risk assessments, deadwood concerns, storm-exposed trees, clearance issues, and trees near high-value targets."
  },
  {
    season: "After severe weather",
    text: "Document damage, separate cleanup from risk, and avoid rushed removal or pruning decisions."
  },
  {
    season: "Before construction or excavation",
    text: "Plan preservation and root protection before access routes, grading, trenching, boring, and staging areas are set."
  },
  {
    season: "Before annual budgeting",
    text: "Use inventories and surveys to phase pruning, removals, monitoring, and preservation work over time."
  }
] as const;

export function DecisionGuidesSection() {
  return (
    <section id="decision-guides" className="relative isolate overflow-hidden bg-[#07131b] py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_20%,rgba(246,201,90,0.12),transparent_22rem),radial-gradient(circle_at_86%_72%,rgba(18,192,168,0.13),transparent_24rem),linear-gradient(135deg,#050b12_0%,#07131b_48%,#0b1f17_100%)]" />
      <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-1/2 opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Decision guides
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
            Practical checklists for storm damage, inventories, excavation, and construction planning.
          </h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:mt-4 sm:text-base sm:leading-7">
            These guides help visitors understand when to request an independent assessment, when a broader inventory makes sense, and why tree preservation and root protection should be addressed before construction or excavation begins.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <details className="group rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.2)] backdrop-blur open:border-[#f6c95a]/45 sm:p-5" open>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3">
                <ShieldAlert className="size-8 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                <span className="text-xl font-black text-white">Storm damage quick checklist</span>
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-5 space-y-3 border-t border-teal-300/15 pt-4">
              {stormChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50/80">
                  <TreePine className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={consultationAnchor}
              data-track-event="Request Assessment Click"
              data-track-location="storm_decision_guide"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Request storm guidance
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </details>

          <details className="group rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.2)] backdrop-blur open:border-[#f6c95a]/45 sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3">
                <ClipboardCheck className="size-8 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                <span className="text-xl font-black text-white">Tree inventory planning tool</span>
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 border-t border-teal-300/15 pt-4 text-sm leading-6 text-emerald-50/78">
              Useful for HOAs, municipalities, country clubs, businesses, campuses, and large properties that need more than a one-tree opinion.
            </p>
            <ul className="mt-4 space-y-3">
              {inventoryPlanner.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50/80">
                  <ClipboardCheck className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={consultationAnchor}
              data-track-event="Request Assessment Click"
              data-track-location="inventory_decision_guide"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Ask about an inventory
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </details>

          <details className="group rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.2)] backdrop-blur open:border-[#f6c95a]/45 sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3">
                <Construction className="size-8 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                <span className="text-xl font-black text-white">Utility and excavation root protection</span>
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 border-t border-teal-300/15 pt-4 text-sm leading-6 text-emerald-50/78">
              Call before trenching, boring, or utility replacement may affect mature tree roots.
            </p>
            <ul className="mt-4 space-y-3">
              {utilityPlanner.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50/80">
                  <Construction className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={consultationAnchor}
              data-track-event="Request Assessment Click"
              data-track-location="utility_excavation_decision_guide"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Request root protection guidance
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </details>

          <details className="group rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.2)] backdrop-blur open:border-[#f6c95a]/45 sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3">
                <Construction className="size-8 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                <span className="text-xl font-black text-white">Construction planning wizard</span>
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 border-t border-teal-300/15 pt-4 text-sm leading-6 text-emerald-50/78">
              Call before site work starts when the project may affect existing trees.
            </p>
            <ul className="mt-4 space-y-3">
              {constructionPlanner.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50/80">
                  <Construction className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={consultationAnchor}
              data-track-event="Request Assessment Click"
              data-track-location="construction_decision_guide"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Request planning guidance
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </details>
        </div>

        <div className="mt-6 rounded-2xl border border-[#f6c95a]/25 bg-[#050b12]/72 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.2)] backdrop-blur">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <h3 className="text-xl font-black text-white">Gulf Coast tree timing</h3>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {seasonalTiming.map((item) => (
              <div key={item.season} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4">
                <p className="text-sm font-black text-[#f6c95a]">{item.season}</p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/78">{item.text}</p>
              </div>
            ))}
          </div>
          <a
            href={phoneConsultationAnchor}
            data-track-event="Schedule Phone Click"
            data-track-location="timing_decision_guide"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-teal-300/30 bg-[#07131b] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring sm:w-auto"
          >
            Talk through timing
          </a>
        </div>
      </div>
    </section>
  );
}
