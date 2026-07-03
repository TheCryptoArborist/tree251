import { ExternalLink, FileText, ImageUp, ShieldCheck } from "lucide-react";
import { jotformConsultationUrl } from "@/components/ConsultBranding";

const jotformEmbedUrl = `${jotformConsultationUrl}?embed=1`;

export function ConsultationRequestForm() {
  return (
    <div className="overflow-hidden rounded-2xl border border-teal-300/20 bg-[#07131b] shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
      <div className="relative isolate overflow-hidden border-b border-teal-300/15 bg-[#07131b] p-5 text-white">
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-2/3 rotate-180 opacity-35" />
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f6c95a]">
          Assessment request
        </p>
        <h3 className="mt-2 text-2xl font-black text-white">
          Request an assessment and upload photos.
        </h3>
        <p className="mt-2 text-sm leading-6 text-emerald-50/80">
          This is Peter&apos;s Jotform intake for tree assessments, storm damage concerns,
          preservation questions, appointment details, and tree photos.
        </p>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-emerald-50/85 sm:grid-cols-3">
          <div className="flex gap-3 rounded-xl border border-teal-300/20 bg-white/[0.06] p-3">
            <FileText className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            <span>Use one form for the full consult request.</span>
          </div>
          <div className="flex gap-3 rounded-xl border border-teal-300/20 bg-white/[0.06] p-3">
            <ImageUp className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            <span>Attach photos inside this request form.</span>
          </div>
          <div className="flex gap-3 rounded-xl border border-teal-300/20 bg-white/[0.06] p-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            <span>Peter does not sell tree removal or pruning work.</span>
          </div>
        </div>
        <a
          href={jotformConsultationUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] shadow-[0_18px_38px_rgba(246,201,90,0.2)] transition hover:bg-[#ffdc70] focus-ring sm:w-auto"
        >
          Open Form in New Tab
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>

      <iframe
        src={jotformEmbedUrl}
        title="Consult Request with Peter Toler, ISA Certified Consulting Arborist"
        className="h-[980px] w-full bg-white sm:h-[1120px]"
        loading="lazy"
        allow="clipboard-write"
      />
    </div>
  );
}
