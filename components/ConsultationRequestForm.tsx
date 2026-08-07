import { ExternalLink, ImageUp } from "lucide-react";
import { jotformConsultationUrl } from "@/components/ConsultBranding";

const jotformEmbedUrl = `${jotformConsultationUrl}?embed=1`;

export function ConsultationRequestForm() {
  return (
    <div className="overflow-hidden rounded-2xl border border-teal-300/20 bg-[#07131b] shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
      <div className="relative isolate overflow-hidden border-b border-teal-300/15 bg-[#07131b] p-4 text-white sm:p-5">
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-2/3 rotate-180 opacity-35" />
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
          Start here
        </p>
        <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
          Fill out the assessment request form below.
        </h3>
        <p className="mt-2 text-sm leading-6 text-emerald-50/80">
          Tell Peter what is happening and add tree photos when available. On mobile, you can choose existing photos from your gallery or use your camera.
        </p>
        <div className="mt-3 flex gap-3 rounded-xl border border-teal-300/20 bg-white/[0.06] p-3 text-sm leading-6 text-emerald-50/85">
          <ImageUp className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
          <span>Uploading 3–5 photos when possible gives Peter useful context before follow-up.</span>
        </div>
        <a
          href={jotformConsultationUrl}
          target="_blank"
          rel="noreferrer"
          data-track-event="Open Jotform Click"
          data-track-location="request_form_panel"
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#f6c95a]/45 bg-white/[0.05] px-5 py-2.5 text-sm font-black text-[#f6c95a] transition hover:bg-white/[0.1] focus-ring sm:w-auto"
        >
          Prefer Full-Screen Form?
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>

      <iframe
        src={jotformEmbedUrl}
        title="Consult Request with Peter Toler, ISA Certified Consulting Arborist"
        className="h-[900px] w-full bg-white sm:h-[1120px]"
        loading="eager"
        allow="camera; clipboard-write"
      />
    </div>
  );
}
