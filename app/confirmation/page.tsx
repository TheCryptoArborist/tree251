import type { Metadata } from "next";
import Link from "next/link";
import {
  ArboristLogo,
  consultationMailto,
  isaCredentialUrl,
  schedulePagePath
} from "@/components/ConsultBranding";
import { ArrowRight, BadgeCheck, CalendarDays, CheckCircle2, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Assessment Request Confirmation",
  description:
    "Confirmation page for tree assessment requests to Peter Toler, ISA Certified Arborist."
};

type SearchParams = Promise<{ status?: string }>;

const statusCopy: Record<string, { title: string; text: string }> = {
  received: {
    title: "Tree assessment request received.",
    text:
      "Thank you for requesting independent arborist guidance. Peter will review the tree concern, context, and photos if provided."
  },
  incomplete: {
    title: "A few required details are missing.",
    text:
      "Please send your name, email, and tree concern so the assessment request can be reviewed."
  },
  "not-configured": {
    title: "The assessment form is ready.",
    text:
      "The online save step is not configured in this runtime, so use email for this request until deployment settings are connected."
  },
  error: {
    title: "The online request could not be saved.",
    text:
      "Please use email for this request. The form is in place, but the save step needs attention."
  }
};

export default async function ConfirmationPage({
  searchParams
}: {
  searchParams?: SearchParams;
}) {
  const params = searchParams ? await searchParams : {};
  const status = typeof params.status === "string" ? params.status : "received";
  const copy = statusCopy[status] ?? statusCopy.received;

  return (
    <div className="bg-[#f7f8f0] text-stone-900">
      <section className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <ArboristLogo />
          </div>
          <h1 className="mt-8 text-4xl font-black uppercase leading-none tracking-[0.08em] text-emerald-950 sm:text-5xl">
            The Arborist
          </h1>
          <p className="mt-5 text-3xl font-black text-stone-900">Peter Toler</p>
          <p className="mt-2 text-xl font-black text-emerald-800">
            ISA Certified Arborist
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-6 text-left">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-1 size-6 shrink-0 text-emerald-800" aria-hidden="true" />
              <div>
                <h2 className="text-2xl font-black text-emerald-950">{copy.title}</h2>
                <p className="mt-3 text-base leading-7 text-stone-700">{copy.text}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={consultationMailto}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 focus-ring"
            >
              <Mail className="size-4" aria-hidden="true" />
              Send Another Request
            </a>
            <Link
              href={schedulePagePath}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-900/20 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring"
            >
              <CalendarDays className="size-4 text-emerald-800" aria-hidden="true" />
              Schedule a Call
            </Link>
            <a
              href={isaCredentialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-900/20 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring"
            >
              <BadgeCheck className="size-4 text-emerald-800" aria-hidden="true" />
              Verify ISA Credentials
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 px-5 py-3 text-sm font-bold text-stone-700 transition hover:border-emerald-700 hover:text-emerald-950 focus-ring"
            >
              Back to Home
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
