import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { jotformConsultationUrl } from "@/components/ConsultBranding";

const jotformEmbedUrl = `${jotformConsultationUrl}?embed=1`;

export function ConsultationRequestForm() {
  return (
    <div className="overflow-hidden rounded-md border border-emerald-950/10 bg-[#f7f8f0] shadow-[0_18px_42px_rgba(25,50,35,0.08)]">
      <div className="border-b border-emerald-950/10 bg-white p-5">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
          Assessment request
        </p>
        <h3 className="mt-2 text-2xl font-black text-emerald-950">
          Complete Peter&apos;s consult request form.
        </h3>
        <p className="mt-2 text-sm leading-6 text-stone-700">
          This is Peter&apos;s Jotform intake for tree assessments, storm damage concerns,
          preservation questions, photos, and appointment details.
        </p>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-stone-700 sm:grid-cols-2">
          <div className="flex gap-3 rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-3">
            <FileText className="mt-0.5 size-5 shrink-0 text-emerald-800" aria-hidden="true" />
            <span>Use the form below to send the full consult request.</span>
          </div>
          <div className="flex gap-3 rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-800" aria-hidden="true" />
            <span>Peter does not sell tree removal or pruning work.</span>
          </div>
        </div>
        <a
          href={jotformConsultationUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 focus-ring sm:w-auto"
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
      />
    </div>
  );
}
