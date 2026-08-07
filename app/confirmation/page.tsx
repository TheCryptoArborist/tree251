import type { Metadata } from "next";
import Link from "next/link";
import {
  ArboristLogo,
  consultationMailto,
  isaCredentialUrl,
  schedulePagePath
} from "@/components/ConsultBranding";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Home,
  Mail,
  MessageCircle,
  TreePine
} from "lucide-react";

export const metadata: Metadata = {
  title: "Assessment Request Confirmation",
  description:
    "Confirmation page for tree assessment requests to Peter Toler, ISA Certified Arborist."
};

type SearchParams = Promise<{ status?: string }>;

const statusCopy: Record<string, { eyebrow: string; title: string; text: string }> = {
  received: {
    eyebrow: "Submission received",
    title: "Thank you. Your request is in.",
    text:
      "Peter will review the information you submitted, including your tree concern, property context, and any photos you provided."
  },
  incomplete: {
    eyebrow: "More information needed",
    title: "A few required details are missing.",
    text:
      "Please send your name, email, and tree concern so the assessment request can be reviewed."
  },
  "not-configured": {
    eyebrow: "Submission needs attention",
    title: "The assessment form is ready, but the online save step is not configured.",
    text:
      "Please use email for this request until the deployment settings are connected."
  },
  error: {
    eyebrow: "Submission needs attention",
    title: "The online request could not be saved.",
    text:
      "Please use email for this request. The form is in place, but the save step needs attention."
  }
};

const nextSteps = [
  {
    title: "Peter reviews your submission",
    text: "The concern, photos, location details, and project context are reviewed together.",
    icon: ClipboardCheck
  },
  {
    title: "The right next step is identified",
    text: "That may be an on-site assessment, inventory, survey, planning consultation, second opinion, or a request for more information.",
    icon: TreePine
  },
  {
    title: "Peter follows up with you",
    text: "You will be contacted using the information provided in the form to coordinate the appropriate next step.",
    icon: MessageCircle
  }
] as const;

export default async function ConfirmationPage({
  searchParams
}: {
  searchParams?: SearchParams;
}) {
  const params = searchParams ? await searchParams : {};
  const status = typeof params.status === "string" ? params.status : "received";
  const copy = statusCopy[status] ?? statusCopy.received;
  const isReceived = status === "received";

  return (
    <main className="min-h-screen bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/15">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_0%,rgba(18,192,168,0.18),transparent_30rem),radial-gradient(circle_at_90%_15%,rgba(246,201,90,0.14),transparent_24rem),linear-gradient(145deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-2/3 rotate-180 opacity-35" />

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <ArboristLogo showText={false} />
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-teal-300/20 bg-white/[0.05] px-4 py-2 text-sm font-black text-emerald-50 transition hover:bg-white/[0.1] focus-ring"
            >
              <Home className="size-4" aria-hidden="true" />
              Home
            </Link>
          </div>

          <div className="mt-10 max-w-3xl sm:mt-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              {copy.eyebrow}
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/82 sm:text-lg sm:leading-8">
              {copy.text}
            </p>
          </div>

          {isReceived ? (
            <div className="mt-8 rounded-2xl border border-[#f6c95a]/25 bg-[#07131b]/85 p-5 shadow-[0_24px_64px_rgba(0,0,0,0.28)] sm:mt-10 sm:p-7">
              <h2 className="text-xl font-black text-white sm:text-2xl">What happens next?</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {nextSteps.map(({ title, text, icon: Icon }, index) => (
                  <article key={title} className="rounded-xl border border-teal-300/15 bg-white/[0.04] p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f6c95a] text-sm font-black text-[#06110d]">
                        {index + 1}
                      </span>
                      <Icon className="size-5 text-[#f6c95a]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-emerald-50/75">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            {isReceived ? (
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
              >
                Return to The Arborist
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : (
              <a
                href={consultationMailto}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email Peter
              </a>
            )}

            <Link
              href={schedulePagePath}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-teal-300/25 bg-white/[0.06] px-6 py-3 text-sm font-black text-white transition hover:bg-white/[0.1] focus-ring"
            >
              <CalendarDays className="size-4 text-[#f6c95a]" aria-hidden="true" />
              Schedule a Phone Consultation
            </Link>

            <a
              href={isaCredentialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-teal-300/25 bg-white/[0.06] px-6 py-3 text-sm font-black text-white transition hover:bg-white/[0.1] focus-ring"
            >
              <BadgeCheck className="size-4 text-[#f6c95a]" aria-hidden="true" />
              Verify ISA Credentials
            </a>
          </div>

          {isReceived ? (
            <p className="mt-7 max-w-3xl text-sm leading-6 text-emerald-50/65">
              If you realize you left out important information or additional photos, you can reply to Peter by email rather than submitting the entire form again.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
