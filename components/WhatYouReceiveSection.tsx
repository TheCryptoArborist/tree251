import { ClipboardCheck, FileText, MessageSquareText, ShieldCheck } from "lucide-react";
import { TreeInventoryHomeSection } from "@/components/TreeInventoryHomeSection";

const deliverables = [
  {
    title: "Clear next-step guidance",
    text:
      "A practical explanation of what appears urgent, what can wait, what should be monitored, and what questions to ask before approving work.",
    Icon: MessageSquareText
  },
  {
    title: "Risk and priority notes",
    text:
      "Tree condition, targets, visible defects, storm concerns, work priorities, and mitigation options are organized so decisions are easier to compare.",
    Icon: ShieldCheck
  },
  {
    title: "Inventory and project data",
    text:
      "Tree-by-tree records may include species, diameter, condition, location, photographs, recommendations, priority fields, and project-specific information for planning or permitting.",
    Icon: ClipboardCheck
  },
  {
    title: "Defined project deliverables",
    text:
      "Depending on scope, deliverables may include spreadsheets, numbered schedules, maps, plan-overlay data, photographs, summaries, recommendations, or permit-support documentation.",
    Icon: FileText
  }
] as const;

export function WhatYouReceiveSection() {
  return (
    <>
      <TreeInventoryHomeSection />

      <section id="what-you-receive" className="relative isolate overflow-hidden bg-[#07131b] py-12 text-white sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(246,201,90,0.12),transparent_22rem),radial-gradient(circle_at_82%_30%,rgba(18,192,168,0.12),transparent_24rem),linear-gradient(135deg,#050b12_0%,#07131b_55%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-1/2 opacity-30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
              What you receive
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
              Guidance and documentation built around the assignment.
            </h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:mt-4 sm:text-base sm:leading-7">
              A consultation or inventory should leave you with usable direction, not just a general opinion. The exact documentation depends on whether the assignment involves an individual tree, a managed property, a construction project, permitting, or long-term planning.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map(({ title, text, Icon }) => (
              <article key={title} className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur sm:p-5">
                <Icon className="size-7 text-[#f6c95a] sm:size-8" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black leading-6 text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/78">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
