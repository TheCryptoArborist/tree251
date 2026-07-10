"use client";

import { Download } from "lucide-react";

export function PrintChecklistButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-track-event="Real Estate Checklist Print Click"
      data-track-location="real_estate_checklist"
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring print:hidden"
    >
      <Download className="size-4" aria-hidden="true" />
      Print or save as PDF
    </button>
  );
}
