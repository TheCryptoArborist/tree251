import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

export const salutingBranchesRegistrationUrl =
  "https://www.salutingbranches.org/locations/mobile-national-cemetery";

export const salutingBranchesImage =
  "/assets/saluting_branches_mobile_event_scannable_qr.png";

export const salutingBranchesImageAlt =
  "Saluting Branches volunteer event at Mobile National Cemetery on September 16, 2026.";

export function SalutingBranchesFeature() {
  return (
    <aside aria-label="Saluting Branches 2026 volunteer event" className="border-b border-[#f6c95a]/35 bg-[#0b1f17] text-white">
      <Link
        href="/saluting-branches-mobile-2026/"
        data-track-event="Saluting Branches Event Details Click"
        data-track-location="homepage_banner"
        className="focus-ring group mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 transition hover:bg-white/[0.05] sm:gap-6 sm:px-6 sm:py-4 lg:px-8"
      >
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-xs">
            Saluting Branches 2026
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-bold text-emerald-50 sm:text-base">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
              Wednesday, September 16, 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
              Mobile National Cemetery
            </span>
          </div>
        </div>
        <span className="inline-flex size-10 items-center justify-center gap-2 rounded-full border border-[#f6c95a]/70 text-xs font-black uppercase tracking-[0.08em] text-[#f6c95a] transition group-hover:border-[#f6c95a] group-hover:bg-[#f6c95a] group-hover:text-[#06110d] sm:h-10 sm:w-auto sm:px-4 sm:py-2">
          <span className="hidden sm:inline">View Event Details</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </aside>
  );
}
