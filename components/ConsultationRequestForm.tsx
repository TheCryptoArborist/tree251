"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, ImageUp } from "lucide-react";
import { jotformConsultationUrl } from "@/components/ConsultBranding";

const jotformEmbedUrl = `${jotformConsultationUrl}?embed=1`;

export function ConsultationRequestForm() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-teal-300/20 bg-[#07131b] shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
      <div className="relative isolate overflow-hidden bg-[#07131b] p-5 text-white sm:p-6">
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-2/3 rotate-180 opacity-35" />
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
          Assessment request
        </p>
        <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
          Ready to tell Peter what is happening with your tree?
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">
          Start the request when you are ready. You can describe the concern, provide property details, and add tree photos from your phone or computer.
        </p>

        <div className="mt-4 flex gap-3 rounded-xl border border-teal-300/20 bg-white/[0.06] p-3 text-sm leading-6 text-emerald-50/85">
          <ImageUp className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
          <span>Uploading 3–5 photos when possible gives Peter useful context before follow-up.</span>
        </div>

        {!showForm ? (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              data-track-event="Start Assessment Form Click"
              data-track-location="request_form_panel"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] shadow-[0_16px_34px_rgba(246,201,90,0.18)] transition hover:bg-[#ffdc70] focus-ring sm:w-auto"
            >
              Start Assessment Request
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <a
              href={jotformConsultationUrl}
              target="_blank"
              rel="noreferrer"
              data-track-event="Open Jotform Click"
              data-track-location="request_form_panel"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#f6c95a]/45 bg-white/[0.05] px-5 py-3 text-sm font-black text-[#f6c95a] transition hover:bg-white/[0.1] focus-ring sm:w-auto"
            >
              Open Full-Screen Form
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-emerald-50/80">Assessment form opened below.</p>
            <a
              href={jotformConsultationUrl}
              target="_blank"
              rel="noreferrer"
              data-track-event="Open Jotform Click"
              data-track-location="request_form_panel_open"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#f6c95a]/45 px-4 py-2.5 text-sm font-black text-[#f6c95a] transition hover:bg-white/[0.1] focus-ring"
            >
              Open Full-Screen Instead
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      {showForm ? (
        <iframe
          src={jotformEmbedUrl}
          title="Consult Request with Peter Toler, ISA Certified Consulting Arborist"
          className="h-[900px] w-full border-t border-teal-300/15 bg-white sm:h-[1120px]"
          loading="lazy"
          allow="camera; clipboard-write"
        />
      ) : null}
    </div>
  );
}
