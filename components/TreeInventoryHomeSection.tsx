import Link from "next/link";
import { ArrowRight, Building2, ClipboardCheck, FileSpreadsheet, Mail, MapPinned } from "lucide-react";
import { inventoryMailto } from "@/components/ConsultBranding";

const inventoryUses = [
  {
    title: "Property planning",
    text: "Tree-by-tree records that support maintenance priorities, budgeting, contractor scopes, and long-term management.",
    Icon: Building2
  },
  {
    title: "Construction and permitting",
    text: "Species, diameter, location, condition, and other required information documented for design teams and permit submittals.",
    Icon: MapPinned
  },
  {
    title: "Project deliverables",
    text: "Spreadsheets, numbered schedules, maps, photographs, summaries, and plan-overlay data prepared around the agreed scope.",
    Icon: FileSpreadsheet
  }
] as const;

export function TreeInventoryHomeSection() {
  return (
    <section id="tree-inventories" className="bg-stone-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800 sm:text-sm">Tree inventories</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-emerald-950 sm:text-4xl">Planning for more than one tree—or documenting trees for a building project?</h2>
            <p className="mt-4 text-sm leading-6 text-stone-700 sm:text-base sm:leading-7">
              A professional tree inventory can support property management, municipal planning, construction, permitting, and design. The scope can be tailored to document the tree information your client, engineer, surveyor, architect, landscape architect, or permitting authority needs.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/tree-inventories" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-center text-sm font-black uppercase tracking-[0.04em] text-white transition hover:bg-emerald-800 focus-ring sm:w-auto">
                View Inventory Services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a href={inventoryMailto} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-900/25 bg-white px-6 py-3 text-center text-sm font-black uppercase tracking-[0.04em] text-emerald-950 transition hover:border-emerald-900/50 hover:bg-emerald-50 focus-ring sm:w-auto">
                <Mail className="size-4" aria-hidden="true" />
                Email About a Project
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {inventoryUses.map(({ title, text, Icon }) => (
              <article key={title} className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-[0_18px_44px_rgba(6,17,13,0.08)]">
                <Icon className="size-8 text-emerald-800" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-emerald-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-700">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-950/10 bg-emerald-950 p-5 text-white shadow-[0_20px_50px_rgba(6,17,13,0.18)] sm:mt-10 sm:p-6">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-0.5 size-6 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            <p className="text-sm leading-6 text-emerald-50/90 sm:text-base sm:leading-7">
              <strong className="text-white">Typical deliverables may include</strong> a tree inventory spreadsheet, numbered tree schedule, species and diameter data, condition notes, priority recommendations, photographs, maps, permit-support documentation, and data that can be incorporated into surveys, site plans, or construction documents. Final deliverables depend on the agreed project scope.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
