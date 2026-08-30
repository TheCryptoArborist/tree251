import { ArrowRight, Building2, Home, Landmark, Mail } from "lucide-react";
import Link from "next/link";
import { consultationAnchor, inventoryMailto } from "@/components/ConsultBranding";

const audienceGroups = [
  {
    title: "Homeowners",
    eyebrow: "One tree or a few trees",
    detail:
      "Concerned about storm damage, visible defects, pruning or removal recommendations, tree health, or whether work is really necessary? Start with an independent tree assessment.",
    href: consultationAnchor,
    label: "Request a Tree Assessment",
    Icon: Home
  },
  {
    title: "Property Managers, HOAs & Businesses",
    eyebrow: "Multiple trees or managed properties",
    detail:
      "Need an inventory, maintenance priorities, risk screening, budgeting, documentation, or a practical plan for a property with multiple trees? Start with professional inventory and consulting services.",
    href: "/tree-inventories",
    label: "Explore Tree Inventories",
    Icon: Building2
  },
  {
    title: "Municipalities & Project Teams",
    eyebrow: "Planning, permitting & public trees",
    detail:
      "Need GIS-based inventory data, construction or permit support, preservation guidance, right-of-way documentation, disaster preparedness, or project coordination? Review professional project support.",
    href: "/tree-inventories",
    label: "Review Project Support",
    Icon: Landmark
  }
] as const;

export function AudienceTrustSection() {
  return (
    <>
      <section className="border-y border-teal-300/20 bg-[#07131b] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
              Choose the path that fits your situation
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
              Homeowner concern or professional property project?
            </h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/78 sm:text-base sm:leading-7">
              You do not need to know which technical service to request. Start with the type of decision or property you are managing.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {audienceGroups.map(({ title, eyebrow, detail, href, label, Icon }) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)] sm:p-6"
              >
                <Icon className="size-8 text-[#f6c95a]" aria-hidden="true" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-emerald-200">
                  {eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-black text-white">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-emerald-50/80">{detail}</p>
                <Link
                  href={href}
                  data-track-event="Audience Path Click"
                  data-track-label={title}
                  data-track-location="audience_pathways"
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#f6c95a]/45 px-4 py-2.5 text-center text-sm font-black text-[#f6c95a] transition hover:border-[#f6c95a] hover:bg-[#f6c95a]/10 focus-ring"
                >
                  {label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.12em] text-emerald-50/60 sm:text-sm">
            Based on the Gulf Coast · Serving Mobile and Baldwin Counties and surrounding project areas
          </p>
        </div>
      </section>

      <section className="border-b border-emerald-950/10 bg-[#f6c95a] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-[#06110d] sm:text-base">
              Professional clients can send project details directly to Peter.
            </p>
            <a
              href={inventoryMailto}
              className="mt-1 inline-block break-all text-sm font-bold text-emerald-950 underline decoration-emerald-900/35 underline-offset-4 hover:decoration-emerald-900 focus-ring"
            >
              consultingarborist@icloud.com
            </a>
          </div>
          <a
            href={inventoryMailto}
            data-track-event="Email Peter Click"
            data-track-location="homepage_contact_strip"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#07131b] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:bg-emerald-950 focus-ring sm:w-auto"
          >
            <Mail className="size-4 text-[#f6c95a]" aria-hidden="true" />
            Email Peter About a Project
          </a>
        </div>
      </section>
    </>
  );
}
