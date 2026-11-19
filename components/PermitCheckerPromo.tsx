import { ArrowRight, FileText } from "lucide-react";

/** Homepage entry point only. The checker retains its independent screening rules. */
export function PermitCheckerPromo() {
  return (
    <aside
      id="permit-checker-introduction"
      aria-labelledby="permit-checker-introduction-title"
      className="mt-8 rounded-2xl border border-[#f6c95a]/40 bg-[#0b1f17] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.22)] sm:mt-10 sm:p-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0 max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#f6c95a]">
            <FileText className="size-5 shrink-0" aria-hidden="true" />
            Mobile Tree Permit Checker
          </p>
          <h3 id="permit-checker-introduction-title" className="text-xl font-black leading-tight text-white sm:text-2xl">
            Planning tree work in Mobile, Alabama?
          </h3>
          <p className="mt-3 text-sm leading-6 text-emerald-50/85 sm:text-base sm:leading-7">
            Before you prune, remove, plant, or dig, check which permits, City reviews, and tree-protection requirements may apply to your property and project.
          </p>
        </div>
        {/* Full navigation opens the standalone checker and its existing module assets. */}
        <a
          href="/permit-checker"
          data-track-event="Permit Checker Click"
          data-track-label="Check permit requirements"
          data-track-location="construction_conflict_section"
          className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[#f6c95a]/70 bg-[#f6c95a]/10 px-5 py-3 text-center text-sm font-black text-[#f6c95a] transition hover:bg-[#f6c95a]/20 focus-ring lg:w-auto"
        >
          Check permit requirements
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-5 border-t border-teal-300/20 pt-4 text-xs leading-5 text-emerald-50/75">
        Independent guidance from The Arborist. City of Mobile departments make the final permitting decisions.
      </p>
    </aside>
  );
}
