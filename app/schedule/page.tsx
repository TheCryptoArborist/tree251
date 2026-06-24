import type { Metadata } from "next";
import { CalendarDays, ExternalLink, Mail, PhoneCall } from "lucide-react";
import {
  calendlySchedulingUrl,
  consultationMailto,
  RequestConsultationButton,
  TreeVerifiedLogo
} from "@/components/ConsultBranding";

export const metadata: Metadata = {
  title: "Schedule Phone Consultation",
  description:
    "Schedule a 30-minute phone consultation with Peter Toler, ISA Certified Consulting Arborist in Mobile, Alabama."
};

const calendlyEmbedUrl = `${calendlySchedulingUrl}?hide_gdpr_banner=1&primary_color=047857`;
const scheduleFacts = [
  { label: "30 minutes", Icon: CalendarDays },
  { label: "Outbound phone call", Icon: PhoneCall }
] as const;

export default function SchedulePage() {
  return (
    <div className="bg-[#f7f8f0] text-stone-900">
      <section className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(22rem,0.78fr)] lg:items-start lg:px-8">
          <div>
            <TreeVerifiedLogo className="mb-6" />
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
              Phone consultation
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-emerald-950 sm:text-5xl">
              Schedule a 30-minute call with Peter.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-700">
              Book a phone consultation to talk through the tree concern, property context,
              photos, storm damage, preservation options, or whether an on-site assessment is the
              better next step.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {scheduleFacts.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-4 text-sm font-black text-emerald-950"
                >
                  <Icon className="size-5 shrink-0 text-emerald-800" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={calendlySchedulingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-800/30 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring"
              >
                <CalendarDays className="size-4 text-emerald-800" aria-hidden="true" />
                Open Calendly
                <ExternalLink className="size-4 text-emerald-800" aria-hidden="true" />
              </a>
              <a
                href={consultationMailto}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 focus-ring"
              >
                <Mail className="size-4" aria-hidden="true" />
                Send Details Instead
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-emerald-950/10 bg-[#f7f8f0] shadow-[0_18px_42px_rgba(25,50,35,0.08)]">
            <div className="border-b border-emerald-950/10 bg-emerald-950 px-4 py-3 text-white">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-100">
                Calendly
              </p>
              <p className="text-base font-black">30 Minute Meeting</p>
            </div>
            <iframe
              src={calendlyEmbedUrl}
              title="Schedule a phone consultation with Peter Toler"
              className="h-[680px] w-full bg-white sm:h-[740px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8f0] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-emerald-950/10 bg-white p-6">
            <h2 className="text-2xl font-black text-emerald-950">
              Need a full assessment request instead?
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-700">
              The phone consultation is useful for clarifying priorities. For tree risk
              assessments, storm damage evaluations, permit guidance, preservation questions, or
              written recommendations, start with the assessment request form.
            </p>
            <div className="mt-6">
              <RequestConsultationButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
