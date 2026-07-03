import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CloudLightning,
  ClipboardCheck,
  ExternalLink,
  Hammer,
  Home,
  Leaf,
  MessageSquareText,
  ShieldCheck,
  TreePine
} from "lucide-react";
import {
  ArboristLogo,
  calendlySchedulingUrl,
  consultationAnchor,
  isaCredentialUrl,
  phoneConsultationAnchor,
  reportVerificationPath,
  RequestConsultationButton,
  SchedulePhoneButton,
  VerifyIsaButton
} from "@/components/ConsultBranding";
import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";
import { PeterHeadshot } from "@/components/PeterHeadshot";

const calendlyEmbedUrl = `${calendlySchedulingUrl}?hide_gdpr_banner=1&primary_color=047857`;

const services = [
  ["Tree Risk Assessments", "Independent review of defects, targets, likelihood of failure, and practical next steps.", ShieldCheck],
  ["Storm Damage and Hurricane Prep", "Guidance before or after severe weather so urgent concerns are separated from normal cleanup.", CloudLightning],
  ["Work Prioritization", "A clear order of operations so safety items come before cosmetic or optional work.", ClipboardCheck],
  ["Second Opinions", "A neutral assessment before approving removal, pruning, cabling, or expensive tree work.", MessageSquareText],
  ["Preservation and Permit Guidance", "Help understanding preservation options, documentation needs, and local review questions.", Leaf],
  ["Property Owner Consultations", "On-site or phone guidance for homeowners, property managers, HOAs, buyers, and sellers across the Gulf Coast.", Home]
] as const;

const whenToCall = [
  {
    title: "Before you approve a tree service quote",
    text: "Understand what is actually needed, what can wait, and what should be handled first."
  },
  {
    title: "After storm damage or before hurricane season",
    text: "Sort visible damage from real risk, document the condition, and avoid rushed decisions."
  },
  {
    title: "When preservation, permits, or property records matter",
    text: "Get practical notes for HOAs, insurance, real estate, construction, or local review questions."
  }
] as const;

const independent = [
  "Peter does not need to sell removal, pruning, cabling, or cleanup work.",
  "The assessment is focused on the tree, the target, the risk, and the decision in front of you.",
  "You can use the guidance when comparing quotes or deciding whether work is urgent, optional, or avoidable."
];

function SectionHeading({
  title,
  text,
  center = false,
  light = false
}: {
  title: string;
  text: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 className={`text-3xl font-black leading-tight sm:text-4xl ${light ? "text-white" : "text-emerald-950"}`}>{title}</h2>
      <p className={`mt-4 text-base leading-7 ${light ? "text-emerald-50/80" : "text-stone-700"}`}>{text}</p>
    </div>
  );
}

function CheckList({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 text-sm leading-6 ${light ? "text-emerald-50" : "text-stone-700"}`}>
          <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${light ? "text-lime-300" : "text-emerald-800"}`} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TheArboristHomePage() {
  return (
    <div className="bg-[#06110d] text-stone-900">
      <section className="relative isolate overflow-hidden bg-[#06110d] text-white">
        <Image
          src="/consult-request-background.jpeg"
          alt="Tree canopy background for independent arborist assessments"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,17,13,0.9)_0%,rgba(6,17,13,0.66)_50%,rgba(6,17,13,0.24)_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-3/5 opacity-70" />
        <div className="mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-lime-300/35 bg-black/20 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-lime-200 shadow-[0_10px_28px_rgba(0,0,0,0.25)]">
              Independent Arborist Guidance
            </p>
            <h1 className="text-5xl font-black leading-[0.95] text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">Concerned About a Tree?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50 sm:text-xl">Get an independent tree assessment before paying for tree work.</p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100/85">
              Peter Toler helps Gulf Coast property owners, including Mobile and Baldwin Counties, understand what is actually needed, what can wait, and what should be prioritized before hiring a tree service.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RequestConsultationButton />
              <SchedulePhoneButton />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-lime-300/20 bg-[#0b1f17] px-4 py-4 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 text-sm font-black uppercase tracking-[0.14em] text-emerald-50 sm:grid-cols-3">
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3">ISA Certified Arborist</div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3">Serving the Gulf Coast</div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3">Mobile and Baldwin Counties</div>
        </div>
      </section>

      <section id="services" className="relative isolate overflow-hidden bg-[#f7f8f0] py-14 sm:py-16">
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-25" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Tree consulting that helps you decide."
            text="The work starts with the tree and the decision in front of you, not with a sales quote. Each assessment is meant to clarify risk, timing, preservation options, and the next practical step."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, text, Icon]) => (
              <article key={title} className="rounded-lg border border-emerald-950/10 bg-white/90 p-5 shadow-[0_18px_42px_rgba(25,50,35,0.08)] backdrop-blur">
                <Icon className="size-8 text-emerald-800" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black text-emerald-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="when-to-call" className="relative isolate overflow-hidden bg-[#0b1f17] py-14 text-white sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(190,255,78,0.14),transparent_26rem),linear-gradient(135deg,#06110d_0%,#0b1f17_55%,#143527_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-1/2 opacity-50" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-8">
          <SectionHeading
            light
            title="When a tree assessment helps."
            text="A short, independent review can prevent a rushed or expensive decision. These are the situations where consulting guidance is usually most useful."
          />
          <div className="grid gap-4">
            {whenToCall.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur">
                <h3 className="text-lg font-black text-lime-200">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/80">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 bg-[#06110d] py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_54px_rgba(0,0,0,0.24)]">
            <div className="overflow-hidden rounded-md border border-lime-300/20 bg-white">
              <PeterHeadshot className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="mt-6 space-y-3 text-sm leading-6 text-emerald-50/85">
              <p className="font-black uppercase tracking-[0.14em] text-lime-300">Peter Toler</p>
              <p className="text-2xl font-black leading-tight text-white">ISA Certified Arborist serving the Gulf Coast.</p>
              <a href={isaCredentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-black text-lime-200 hover:text-lime-100 focus-ring">
                <BadgeCheck className="size-4" aria-hidden="true" />
                Verify current ISA profile
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">Independent advice, not tree work sales.</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-emerald-50/85">
              Peter provides practical arborist guidance across the Gulf Coast, including Mobile and Baldwin Counties, for property owners who need a clearer read on tree condition, risk, storm damage, preservation, and local decision-making before paying for work.
            </p>
            <div className="mt-8 rounded-lg border border-white/10 bg-[#0b1f17] p-6 shadow-[0_18px_42px_rgba(0,0,0,0.2)]">
              <CheckList items={independent} light />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <TreePine className="size-8 text-lime-300" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-white">Mature-tree decisions</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/80">Guidance for live oaks, storm-exposed trees, property lines, targets, and preservation tradeoffs.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <Hammer className="size-8 text-lime-300" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-white">Contractor clarity</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/80">Better questions and priorities before you compare quotes or authorize work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="phone-consultation" className="relative isolate scroll-mt-28 overflow-hidden bg-[#0b1f17] py-14 text-white sm:py-16">
        <Image
          src="/consult-request-background.jpeg"
          alt="Tree canopy background"
          fill
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(6,17,13,0.96),rgba(11,31,23,0.88))]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_54px_rgba(0,0,0,0.24)] backdrop-blur">
            <CalendarDays className="size-10 text-lime-300" aria-hidden="true" />
            <div className="mt-5">
              <SectionHeading
                light
                title="Schedule a phone consultation."
                text="Use the embedded scheduler to book a tree-care phone consultation with Peter. This call is separate from the full Jotform assessment request."
              />
            </div>
            <a
              href={calendlySchedulingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-lime-400 px-5 py-3 text-sm font-black text-emerald-950 shadow-[0_14px_30px_rgba(190,255,78,0.18)] transition hover:bg-lime-300 focus-ring"
            >
              Open Scheduler in New Tab
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="overflow-hidden rounded-lg border border-lime-300/20 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.28)]">
            <iframe
              src={calendlyEmbedUrl}
              title="Schedule a phone consultation with Peter Toler"
              className="h-[700px] w-full bg-white sm:h-[760px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section id="consultation-request" className="relative isolate scroll-mt-28 overflow-hidden bg-[#06110d] py-14 text-white sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_85%_15%,rgba(217,164,65,0.16),transparent_24rem),radial-gradient(circle_at_12%_82%,rgba(190,255,78,0.12),transparent_22rem)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-40" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-8">
          <div>
            <SectionHeading
              light
              title="Request a Tree Assessment."
              text="Use the Jotform request below for assessment details and photo uploads. Photos belong inside the request form, so there is no separate Submit Photos button."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SchedulePhoneButton className="border-white/20 bg-white/10 text-white hover:bg-white/15" />
              <VerifyIsaButton className="border-white/20 bg-white/10 text-white hover:bg-white/15" />
            </div>
          </div>
          <ConsultationRequestForm />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#030806] px-4 py-10 text-sm text-emerald-50/75 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <ArboristLogo showText={false} />
              <div>
                <p className="font-black uppercase tracking-[0.14em] text-white">The Arborist</p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-lime-300">Peter Toler</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm leading-6">Independent arborist consulting for Gulf Coast property owners, including Mobile and Baldwin Counties.</p>
          </div>
          <div>
            <p className="font-black uppercase tracking-[0.14em] text-lime-300">Services</p>
            <ul className="mt-4 space-y-2">
              <li>Tree risk assessments</li>
              <li>Storm damage evaluations</li>
              <li>Second opinions before tree work</li>
              <li>Permit and preservation guidance</li>
            </ul>
          </div>
          <div>
            <p className="font-black uppercase tracking-[0.14em] text-lime-300">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={consultationAnchor} className="hover:text-white focus-ring">Request a Tree Assessment</a>
              </li>
              <li>
                <a href={phoneConsultationAnchor} className="hover:text-white focus-ring">Schedule a Phone Consultation</a>
              </li>
              <li>
                <a href={isaCredentialUrl} target="_blank" rel="noreferrer" className="hover:text-white focus-ring">Verify ISA Credentials</a>
              </li>
              <li>
                <Link href={reportVerificationPath} className="text-emerald-50/55 hover:text-white focus-ring">Report verification</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
