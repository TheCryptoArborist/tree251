import { Building2, ClipboardCheck, Construction, FileQuestion, Home, Shovel, TreePine } from "lucide-react";
import { consultationAnchor } from "@/components/ConsultBranding";

const scenarios = [
  {
    title: "Homeowner second opinion",
    audience: "Residential property",
    situation:
      "A homeowner is told a tree needs to be removed and wants an independent assessment before approving expensive work.",
    outcome:
      "Peter helps clarify whether removal appears necessary, whether pruning or monitoring may be reasonable, and what questions to ask the tree service.",
    Icon: Home
  },
  {
    title: "Tree-work process guidance",
    audience: "Property owner / municipal question",
    situation:
      "A property owner wants to prune, remove, or alter a tree and is not sure whether municipal review, Tree Commission questions, historic-area concerns, or professional documentation may be involved.",
    outcome:
      "Peter does not issue permits or speak on behalf of any municipality. He provides independent arborist guidance to help clarify tree-related questions, documentation needs, work feasibility, and when municipal review or qualified contractor involvement may be needed.",
    Icon: FileQuestion
  },
  {
    title: "HOA tree inventory",
    audience: "HOA / property manager",
    situation:
      "A board needs to understand which trees are high priority, which can wait, and how to budget future maintenance.",
    outcome:
      "A tree inventory or survey can organize removals, pruning, monitoring, preservation options, and maintenance cycles.",
    Icon: ClipboardCheck
  },
  {
    title: "Plumbing lateral near a historic tree",
    audience: "Contractor / historic property",
    situation:
      "A plumbing contractor replacing a lateral near a large historic tree needs to avoid unnecessary root damage or tree removal.",
    outcome:
      "ANSI A300-informed arborist guidance helps evaluate root-zone conflicts, routing concerns, preservation options, and what should be documented before excavation begins.",
    Icon: Shovel
  },
  {
    title: "Construction near mature trees",
    audience: "Owner / builder / project team",
    situation:
      "A project may affect root zones, access routes, grading, trenching, equipment staging, or tree preservation goals.",
    outcome:
      "Early arborist guidance helps identify conflicts, preservation feasibility, and practical tree-protection expectations before work starts.",
    Icon: Construction
  },
  {
    title: "Municipal or public-property assessment",
    audience: "Municipality / public site",
    situation:
      "A public property needs tree assessments, survey support, maintenance priorities, or documentation for decision-making.",
    outcome:
      "Independent recommendations help organize risk priorities, records, contractor scopes, and next steps for public trees or managed sites.",
    Icon: Building2
  }
] as const;

export function ScenarioCardsSection() {
  return (
    <section id="scenarios" className="relative isolate overflow-hidden bg-[#050b12] py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(18,192,168,0.12),transparent_23rem),radial-gradient(circle_at_82%_76%,rgba(246,201,90,0.12),transparent_22rem)]" />
      <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-25" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Common situations
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
            See where independent arborist guidance fits.
          </h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:mt-4 sm:text-base sm:leading-7">
            These examples help homeowners, contractors, boards, municipalities, property managers, and project teams recognize when a consultation can make the next decision clearer.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map(({ title, audience, situation, outcome, Icon }) => (
            <article key={title} className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-[#f6c95a]/45 sm:p-5">
              <Icon className="size-8 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#f6c95a]">{audience}</p>
              <h3 className="mt-2 text-lg font-black leading-6 text-white">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-emerald-50/84">Situation:</p>
              <p className="mt-1 text-sm leading-6 text-emerald-50/76">{situation}</p>
              <p className="mt-3 text-sm font-bold leading-6 text-emerald-50/84">How it helps:</p>
              <p className="mt-1 text-sm leading-6 text-emerald-50/76">{outcome}</p>
            </article>
          ))}
        </div>

        <a
          href={consultationAnchor}
          data-track-event="Request Assessment Click"
          data-track-location="scenario_cards"
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring sm:w-auto"
        >
          Ask which path fits your property
          <TreePine className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
