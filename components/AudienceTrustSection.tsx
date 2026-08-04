import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { inventoryMailto, substackUrl } from "@/components/ConsultBranding";

const audienceGroups = [
  {
    title: "Residential and Commercial",
    detail:
      "Independent assessments for homeowners, property managers, businesses, campuses, country clubs, and other private properties that need clear tree-care priorities before authorizing work."
  },
  {
    title: "Municipal and HOA Consulting",
    detail:
      "Support for municipalities, HOAs, boards, and public-property managers through tree assessments, surveys, inventories, maintenance priorities, and documentation that helps guide decisions."
  },
  {
    title: "Mobile and Baldwin Counties",
    detail:
      "Based on the Gulf Coast and serving Mobile and Baldwin Counties, with consulting guidance for property owners, organizations, and project teams across the surrounding service area."
  }
] as const;

export function AudienceTrustSection() {
  return (
    <>
      <section className="border-y border-teal-300/20 bg-[#07131b] px-4 py-3 text-white sm:px-6 sm:py-4 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-50 sm:grid-cols-3 sm:gap-3 sm:text-sm sm:tracking-[0.14em]">
          {audienceGroups.map((group) => (
            <details
              key={group.title}
              className="group rounded-[1.65rem] border border-teal-300/25 bg-white/[0.03] px-3 py-2.5 transition hover:border-[#f6c95a]/45 hover:bg-white/[0.06] open:border-[#f6c95a]/45 open:bg-white/[0.06] sm:px-4 sm:py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <span>{group.title}</span>
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 border-t border-teal-300/15 pt-3 text-left text-sm font-medium normal-case leading-6 tracking-normal text-emerald-50/80">
                {group.detail}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-b border-emerald-950/10 bg-[#f6c95a] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-[#06110d] sm:text-base">Engineers, municipalities, property managers, and project teams may email Peter directly.</p>
            <a href={inventoryMailto} className="mt-1 inline-block break-all text-sm font-bold text-emerald-950 underline decoration-emerald-900/35 underline-offset-4 hover:decoration-emerald-900 focus-ring">petertoler@me.com</a>
          </div>
          <a href={inventoryMailto} data-track-event="Email Peter Click" data-track-location="homepage_contact_strip" className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#07131b] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:bg-emerald-950 focus-ring sm:w-auto">
            <Mail className="size-4 text-[#f6c95a]" aria-hidden="true" />
            Email Peter
          </a>
        </div>
      </section>

      <section className="border-b border-teal-300/15 bg-[#0b1f17] px-4 py-5 text-white sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex max-w-3xl gap-3">
            <BookOpen className="mt-0.5 size-6 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.12em] text-[#f6c95a]">Long-form tree education</p>
              <p className="mt-1 text-sm leading-6 text-emerald-50/82 sm:text-base">Read Peter&apos;s articles, case studies, and Gulf Coast tree-care discussions on Substack.</p>
            </div>
          </div>
          <a href={substackUrl} target="_blank" rel="noreferrer" data-track-event="Social Link Click" data-track-label="Substack" data-track-location="homepage_substack_strip" className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[#f6c95a]/55 bg-white/[0.06] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a] hover:bg-white/[0.1] focus-ring sm:w-auto">
            Read on Substack
            <ArrowRight className="size-4 text-[#f6c95a]" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
