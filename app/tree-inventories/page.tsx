import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  HardHat,
  Mail,
  MapPinned,
  TreePine
} from "lucide-react";
import { EmailPeterButton, inventoryMailto, RequestConsultationButton } from "@/components/ConsultBranding";

export const metadata: Metadata = {
  title: "Tree Inventories for Planning, Permitting, and Development | The Arborist",
  description:
    "Professional tree inventories for municipalities, HOAs, apartment communities, commercial properties, engineers, design teams, development projects, and permitting support across the Gulf Coast."
};

const inventoryTypes = [
  {
    title: "Planning and maintenance inventories",
    text: "For municipalities, HOAs, apartment communities, commercial properties, campuses, country clubs, and other sites that need tree condition records, maintenance priorities, and long-term planning.",
    Icon: Building2
  },
  {
    title: "Construction and permitting inventories",
    text: "For engineers, architects, developers, surveyors, landscape architects, and contractors who need existing trees documented for permitting, design coordination, plan overlays, or construction documents.",
    Icon: HardHat
  },
  {
    title: "Focused or limited-scope inventories",
    text: "For a project area, right-of-way, construction corridor, tree-protection zone, storm-damaged area, or selected group of trees where a complete property-wide inventory is not required.",
    Icon: MapPinned
  }
] as const;

const collected = [
  "Unique tree identification number",
  "Tree species",
  "Diameter at breast height or the diameter required by the applicable project or ordinance",
  "Tree location",
  "Existing condition and visible structural observations",
  "Maintenance recommendation or project disposition",
  "Priority or timeframe",
  "Risk-related concerns when included in the scope",
  "Photographs and field notes",
  "Conflicts with buildings, utilities, grading, drainage, access, paving, or other proposed improvements"
] as const;

const deliverables = [
  "Tree inventory spreadsheet or database",
  "Numbered tree schedule",
  "Species, diameter, condition, and recommendation fields",
  "Tree-location data or mapping",
  "Annotated survey or site-plan information",
  "Tree inventory overlay for the design team",
  "GIS, CAD-compatible, or other agreed digital data",
  "Preservation, removal, or maintenance schedule",
  "Photographs when included in the scope",
  "Prioritized work plan",
  "Permit-support documentation",
  "Written report, executive summary, or arborist narrative when required"
] as const;

const process = [
  ["Define objectives", "Identify the permitting, design, maintenance, budgeting, risk-management, or documentation goals."],
  ["Confirm scope and format", "Determine the project limits, required data fields, tree-measurement standards, mapping needs, and final file formats."],
  ["Conduct field inventory", "Assign identifiers and document the agreed tree, site, and location information."],
  ["Assess and organize findings", "Record condition, visible defects, project conflicts, maintenance needs, or risk information included in the scope."],
  ["Prepare project deliverables", "Provide the spreadsheet, schedule, mapping information, photographs, recommendations, and supporting narrative required by the agreement."],
  ["Coordinate with the project team", "Clarify findings and support incorporation of the tree information into surveys, site plans, permit drawings, or management plans."]
] as const;

function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-xl border border-emerald-950/10 bg-white p-4 text-sm leading-6 text-stone-700 shadow-sm">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TreeInventoriesPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="bg-[#050b12] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to the homepage
          </Link>
          <div className="mt-8 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">Professional tree inventories</p>
            <h1 className="mt-3 text-4xl font-black leading-[0.98] sm:text-6xl">Tree data organized for the decision, permit, or plan in front of you.</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/85 sm:text-xl sm:leading-8">
              Tree inventories can support long-term property management, municipal planning, construction, permitting, and design. The scope and deliverables are built around the client’s objectives and the information the project team needs.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <EmailPeterButton label="Email About an Inventory" />
              <RequestConsultationButton />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-emerald-950 sm:text-4xl">Three common inventory applications</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {inventoryTypes.map(({ title, text, Icon }) => (
              <article key={title} className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-[0_18px_44px_rgba(6,17,13,0.08)] sm:p-6">
                <Icon className="size-8 text-emerald-800" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black text-emerald-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <ClipboardList className="size-8 text-[#f6c95a]" aria-hidden="true" />
              <h2 className="text-2xl font-black sm:text-4xl">Information that may be collected</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">The exact fields depend on the project scope, local requirements, and intended use of the inventory.</p>
            <div className="mt-6"><Checklist items={collected} /></div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="size-8 text-[#f6c95a]" aria-hidden="true" />
              <h2 className="text-2xl font-black sm:text-4xl">Potential deliverables</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">Deliverables are developed around the project’s design, permitting, documentation, and management requirements.</p>
            <div className="mt-6"><Checklist items={deliverables} /></div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800 sm:text-sm">Inventory process</p>
            <h2 className="mt-3 text-2xl font-black text-emerald-950 sm:text-4xl">From project objectives to usable deliverables</h2>
          </div>
          <ol className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {process.map(([title, text], index) => (
              <li key={title} className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-[0_18px_44px_rgba(6,17,13,0.08)] sm:p-6">
                <div className="grid size-9 place-items-center rounded-full bg-emerald-900 text-sm font-black text-white">{index + 1}</div>
                <h3 className="mt-4 text-lg font-black text-emerald-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-700">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#07131b] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-teal-300/20 bg-white/[0.05] p-6 text-center shadow-[0_22px_60px_rgba(0,0,0,0.24)] sm:p-10">
          <TreePine className="mx-auto size-10 text-[#f6c95a]" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-black sm:text-4xl">Need tree data for a permit, plan overlay, or property-management program?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">
            Email Peter with the project location, approximate number of trees, intended use of the inventory, required data fields, available survey or plan files, and target schedule. The final scope can then be coordinated with the engineer, architect, surveyor, landscape architect, municipality, or property-management team.
          </p>
          <a href={inventoryMailto} className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring sm:w-auto">
            <Mail className="size-4" aria-hidden="true" />
            Email Peter About the Project
          </a>
        </div>
      </section>
    </main>
  );
}
