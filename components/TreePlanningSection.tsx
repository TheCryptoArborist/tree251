import { ClipboardCheck, Hammer, Home, Leaf, ShieldCheck, TreePine } from "lucide-react";

const clientGroups = [
  {
    title: "Municipalities and public properties",
    text:
      "Tree assessments, tree surveys, inventory support, and priority guidance for public trees, parks, right-of-way concerns, and municipal planning.",
    Icon: Home
  },
  {
    title: "HOAs, country clubs, campuses, and businesses",
    text:
      "Inventory and survey work helps boards and property managers plan removals, pruning, monitoring, budgets, and maintenance cycles before problems become urgent.",
    Icon: ClipboardCheck
  },
  {
    title: "Construction planning and tree preservation",
    text:
      "Pre-construction arborist input helps identify trees worth preserving, likely conflicts, root-zone concerns, and practical protection measures before work begins.",
    Icon: Hammer
  }
] as const;

const inventoryOutcomes = [
  "Identify high-risk trees, low-risk trees, and trees that simply need monitoring.",
  "Prioritize removals, pruning, clearance work, and preservation recommendations.",
  "Build a maintenance plan instead of reacting to every tree concern as an emergency.",
  "Support budgets, board decisions, municipal records, and contractor scopes of work."
];

const planningServices = [
  {
    title: "Tree inventories",
    detail:
      "A tree-by-tree record of what is on the property, current condition, maintenance needs, and priority level. Useful for HOAs, municipalities, country clubs, campuses, and businesses that need a maintenance plan."
  },
  {
    title: "Tree surveys",
    detail:
      "A survey documents trees and site conditions for planning, preservation, construction, reporting, or decision-making before work begins."
  },
  {
    title: "Construction planning",
    detail:
      "Early arborist input helps identify preservation conflicts, root-zone concerns, access issues, grading impacts, and tree-protection needs before construction decisions are locked in."
  },
  {
    title: "Utility and excavation root protection",
    detail:
      "ANSI A300-informed arborist guidance for plumbing laterals, sewer lines, drainage, irrigation, trenching, boring, and underground utility work near mature or historic trees."
  },
  {
    title: "Tree preservation plans",
    detail:
      "A preservation plan helps define which trees are worth protecting, what protection measures are needed, and how work should be staged around valuable trees."
  },
  {
    title: "Maintenance prioritization",
    detail:
      "Prioritization separates urgent risk reduction from lower-risk pruning, monitoring, clearance work, and budgetable future maintenance."
  },
  {
    title: "Municipal and commercial tree assessments",
    detail:
      "Independent guidance for public properties, commercial sites, boards, and managers that need defensible recommendations before assigning work or setting budgets."
  }
] as const;

export function TreePlanningSection() {
  return (
    <section id="tree-planning" className="relative isolate overflow-hidden bg-[#07131b] py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(18,192,168,0.16),transparent_26rem),radial-gradient(circle_at_82%_10%,rgba(246,201,90,0.15),transparent_22rem),linear-gradient(135deg,#050b12_0%,#07131b_50%,#0b1f17_100%)]" />
      <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            More than one tree? You need a plan.
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
            Tree inventories, surveys, excavation, and preservation planning for larger properties.
          </h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:mt-4 sm:text-base sm:leading-7">
            Peter works with homeowners, municipalities, HOAs, country clubs, businesses, campuses,
            contractors, and project teams that need more than a one-tree opinion. A tree inventory,
            survey, or root-protection consultation gives you a practical view of what you have,
            what needs attention, and what can be planned before damage happens.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 lg:grid-cols-3">
          {clientGroups.map(({ title, text, Icon }) => (
            <article key={title} className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_22px_54px_rgba(0,0,0,0.2)] backdrop-blur sm:p-5">
              <Icon className="size-7 text-[#f6c95a] sm:size-8" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black leading-6 text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/78">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-2xl border border-teal-300/20 bg-[#050b12]/72 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.2)] backdrop-blur">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-8 text-[#f6c95a]" aria-hidden="true" />
              <h3 className="text-xl font-black text-white">What an inventory helps you decide</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {inventoryOutcomes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50/82">
                  <Leaf className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#f6c95a]/25 bg-white/[0.06] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.2)] backdrop-blur">
            <div className="flex items-center gap-3">
              <TreePine className="size-8 text-[#f6c95a]" aria-hidden="true" />
              <h3 className="text-xl font-black text-white">Planning services to ask about</h3>
            </div>
            <div className="mt-5 grid gap-2">
              {planningServices.map((service) => (
                <details
                  key={service.title}
                  className="group rounded-[1.35rem] border border-teal-300/20 bg-white/[0.05] px-4 py-3 text-sm text-emerald-50 transition hover:border-[#f6c95a]/45 hover:bg-white/[0.07] open:border-[#f6c95a]/45 open:bg-white/[0.07]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-black [&::-webkit-details-marker]:hidden">
                    <span>{service.title}</span>
                    <span className="grid size-6 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 border-t border-teal-300/15 pt-3 font-medium leading-6 text-emerald-50/78">
                    {service.detail}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
