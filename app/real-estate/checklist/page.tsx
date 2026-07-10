import type { Metadata } from "next";
import Link from "next/link";
import { CheckSquare, TreePine } from "lucide-react";
import { PrintChecklistButton } from "@/components/PrintChecklistButton";

export const metadata: Metadata = {
  title: "Homebuyer Tree Due Diligence Checklist",
  description:
    "A printable checklist for homebuyers, real estate agents, sellers, and investors evaluating mature trees before closing."
};

const sections = [
  {
    heading: "Tree risk and targets",
    items: [
      "Request an independent tree risk assessment when mature trees could affect the home, garage, driveway, vehicles, neighboring property, sidewalks, pools, utility lines, or outdoor living areas.",
      "Document visible defects, storm damage, dead or broken limbs, cracks, cavities, decay, unusual lean, root-plate movement, and previous failures.",
      "Separate immediate concerns from trees that can be monitored or maintained over time."
    ]
  },
  {
    heading: "Pruning prescription and work scope",
    items: [
      "When pruning is recommended, request a written pruning prescription that identifies the objective, priority, affected branches, and intended outcome.",
      "Ask that the scope align with applicable ANSI A300 tree care standards and accepted arboricultural practice.",
      "Avoid vague instructions such as 'trim everything,' 'cut it back,' or 'raise it as high as possible.'",
      "Confirm that the selected contractor understands the prescription and carries appropriate insurance, including workers' compensation where applicable."
    ]
  },
  {
    heading: "Roots, soil, and construction history",
    items: [
      "Look for severed roots, trenching, utility installation, driveway or sidewalk work, pools, additions, retaining walls, grade changes, fill soil, and soil compaction.",
      "Identify surface-root conflicts and determine whether proposed repairs could damage major roots.",
      "Ask about planned construction, drainage, fencing, utilities, or landscaping that may affect the root zone after closing."
    ]
  },
  {
    heading: "Species, condition, and site compatibility",
    items: [
      "Identify the major tree species and their expected mature size, maintenance needs, growth habits, and compatibility with the site.",
      "Consider whether trees are crowding structures, utilities, access routes, foundations, roofs, or neighboring property.",
      "Distinguish valuable preservation candidates from trees that are declining, poorly located, or unlikely to remain sustainable."
    ]
  },
  {
    heading: "Previous pruning and storm history",
    items: [
      "Look for topping, heading cuts, lion-tailing, excessive crown raising, flush cuts, large stubs, and repeated clearance cutting.",
      "Ask whether major storms, lightning, limb failures, emergency removals, or insurance claims affected the property.",
      "Determine whether past pruning may have increased future maintenance needs or created weakly attached regrowth."
    ]
  },
  {
    heading: "Maintenance priorities and transaction planning",
    items: [
      "Organize recommendations into immediate, short-term, and long-term priorities.",
      "Identify pruning, removal, monitoring, preservation, cabling or bracing considerations, and additional investigation when appropriate.",
      "Use the findings to support negotiations, seller repairs, maintenance planning, contractor estimates, or post-closing budgeting.",
      "Keep the arborist's assessment and pruning prescription with the property records."
    ]
  },
  {
    heading: "Questions for the buyer or agent",
    items: [
      "Are any trees excluded from the general home inspection or outside the inspector's scope?",
      "Has a tree service recommended removal without an independent arborist assessment?",
      "Are there municipal, historic-area, Tree Commission, or property-association questions that should be clarified?",
      "Are there planned utility, construction, drainage, or access projects near mature trees?",
      "What tree work is likely within the first year of ownership?"
    ]
  }
] as const;

export default function RealEstateChecklistPage() {
  return (
    <div className="bg-[#050b12] py-12 text-white print:bg-white print:py-0 print:text-black">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
        <div className="rounded-2xl border border-teal-300/20 bg-[#07131b] p-5 shadow-[0_20px_54px_rgba(0,0,0,0.22)] sm:p-8 print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none">
          <div className="flex flex-col gap-5 border-b border-teal-300/20 pb-6 sm:flex-row sm:items-start sm:justify-between print:border-black/20">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] print:text-black">The Arborist - Peter Toler</p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl print:text-black">
                Homebuyer Tree Due Diligence Checklist
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7 print:text-black">
                Use this checklist with your real estate agent, home inspector, property manager, or arborist before closing on a property with mature trees.
              </p>
            </div>
            <TreePine className="size-12 shrink-0 text-[#f6c95a] print:text-black" aria-hidden="true" />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row print:hidden">
            <PrintChecklistButton />
            <Link
              href="/real-estate"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-teal-300/30 px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-white/[0.06] focus-ring"
            >
              Return to real estate page
            </Link>
          </div>

          <div className="mt-8 space-y-6 print:mt-5 print:space-y-4">
            {sections.map((section) => (
              <section key={section.heading} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 sm:p-5 print:break-inside-avoid print:rounded-none print:border-black/20 print:bg-white print:p-3">
                <h2 className="text-xl font-black text-[#f6c95a] print:text-black">{section.heading}</h2>
                <ul className="mt-4 space-y-3 print:mt-2 print:space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50/82 print:text-black">
                      <CheckSquare className="mt-0.5 size-5 shrink-0 text-[#f6c95a] print:text-black" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#f6c95a]/30 bg-[#050b12]/70 p-5 print:break-inside-avoid print:rounded-none print:border-black print:bg-white">
            <h2 className="text-xl font-black text-white print:text-black">Important professional boundary</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/80 print:text-black">
              This checklist is educational and does not replace a site-specific assessment. Peter does not issue permits or speak on behalf of any municipality. He provides independent arborist guidance to help clients understand tree condition, risk, maintenance priorities, documentation needs, and appropriate next steps.
            </p>
          </div>

          <div className="mt-8 border-t border-teal-300/20 pt-5 text-sm text-emerald-50/70 print:border-black/20 print:text-black">
            <p className="font-black">tree251.xyz/real-estate</p>
            <p className="mt-1">Independent arborist consulting for the Gulf Coast, including Mobile and Baldwin Counties.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
