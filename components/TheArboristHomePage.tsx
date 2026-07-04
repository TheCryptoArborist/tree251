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
import { CredentialBadges } from "@/components/CredentialBadges";
import { PeterHeadshot } from "@/components/PeterHeadshot";
import { SocialLinksFooter } from "@/components/SocialLinksFooter";
import { TreePlanningSection } from "@/components/TreePlanningSection";

const calendlyEmbedUrl = `${calendlySchedulingUrl}?hide_gdpr_banner=1&hide_event_type_details=1&primary_color=f6c95a`;

const audienceHighlights = [
  {
    title: "Residential and Commercial",
    text: "Independent guidance for homeowners, commercial properties, country clubs, campuses, businesses, and property managers who need practical tree decisions before paying for work."
  },
  {
    title: "Municipal and HOA Consulting",
    text: "Tree assessments, inventories, surveys, and priority planning for municipalities, HOAs, boards, public properties, parks, common areas, and right-of-way concerns."
  },
  {
    title: "Mobile and Baldwin Counties",
    text: "Serving the Gulf Coast with local context for storm exposure, mature live oaks, development pressure, preservation questions, and long-term tree maintenance."
  }
] as const;

const services = [
  {
    title: "Tree Risk and Storm Damage Assessments",
    text: "Independent review of defects, targets, storm damage, likelihood of failure, and practical risk priorities.",
    details: [
      "Useful after severe weather, before hurricane season, or before approving urgent tree work.",
      "Helps separate immediate concerns from lower-priority maintenance or monitoring."
    ],
    Icon: ShieldCheck
  },
  {
    title: "Tree Inventories and Surveys",
    text: "Tree-by-tree documentation for HOAs, municipalities, country clubs, campuses, and businesses that need a maintenance plan.",
    details: [
      "Helps identify high-risk trees, low-risk trees, removals, pruning needs, and trees that can be monitored.",
      "Useful for budgeting, board decisions, municipal planning, and contractor scopes of work."
    ],
    Icon: ClipboardCheck
  },
  {
    title: "Construction Planning and Preservation",
    text: "Arborist guidance before construction so valuable trees, root zones, and preservation options are considered early.",
    details: [
      "Supports planning around access, grading, root zones, equipment movement, and tree protection expectations.",
      "Helps determine which trees are worth preserving and which conflicts need to be addressed before work begins."
    ],
    Icon: Hammer
  },
  {
    title: "Municipal and Public Property Consulting",
    text: "Assessment and survey support for public trees, parks, right-of-way concerns, and municipal tree planning.",
    details: [
      "Useful for prioritizing limited budgets and documenting public-tree concerns.",
      "Can support maintenance planning, tree surveys, preservation questions, and risk-based decision-making."
    ],
    Icon: Home
  },
  {
    title: "Work Prioritization and Maintenance Planning",
    text: "Clear separation between high-risk work, lower-risk monitoring, removals, pruning needs, and budgetable future maintenance.",
    details: [
      "Creates a practical order of operations instead of treating every tree concern as an emergency.",
      "Helps property owners and managers compare quotes and phase work logically."
    ],
    Icon: Leaf
  },
  {
    title: "Second Opinions Before Tree Work",
    text: "A neutral assessment before approving removal, pruning, cabling, construction impacts, or expensive tree work.",
    details: [
      "Useful when recommendations conflict or when the proposed work is expensive, disruptive, or permanent.",
      "The goal is clarity before the work is authorized, not selling the work afterward."
    ],
    Icon: MessageSquareText
  }
] as const;

const whenToCall = [
  ["Before you approve a tree service quote", "Understand what is actually needed, what can wait, and what should be handled first."],
  ["When you manage more than one tree", "Tree inventories and surveys help boards, businesses, municipalities, and property managers plan maintenance instead of reacting to every concern."],
  ["Before construction or site changes", "Tree preservation decisions are easier when protection zones, access routes, grading, roots, and tree condition are considered early."],
  ["After storm damage or before hurricane season", "Sort visible damage from real risk, document the condition, and avoid rushed decisions."]
] as const;

const independent = [
  "Peter does not need to sell removal, pruning, cabling, or cleanup work.",
  "The assessment is focused on the tree, the target, the risk, and the decision in front of you.",
  "You can use the guidance when comparing quotes, planning maintenance, managing construction impacts, or deciding whether work is urgent, optional, or avoidable."
];

function SectionHeading({
  title,
  text,
  light = false
}: {
  title: string;
  text: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className={`text-2xl font-black leading-tight sm:text-4xl ${light ? "text-white" : "text-emerald-950"}`}>{title}</h2>
      <p className={`mt-3 text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 ${light ? "text-emerald-50/80" : "text-stone-700"}`}>{text}</p>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TheArboristHomePage() {
  return (
    <div className="bg-[#050b12] text-stone-900">
      <section className="relative isolate overflow-hidden bg-[#050b12] text-white">
        <Image
          src="/consult-request-background.jpeg"
          alt="Tree canopy background for independent arborist assessments"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-75"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,11,18,0.96)_0%,rgba(6,17,13,0.76)_48%,rgba(6,17,13,0.28)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(18,192,168,0.16),transparent_24rem),radial-gradient(circle_at_88%_10%,rgba(246,201,90,0.18),transparent_22rem)]" />
        <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-3/5 opacity-60" />
        <div className="mx-auto flex min-h-[58svh] max-w-7xl items-center px-4 py-10 sm:min-h-[72vh] sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-teal-300/35 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] shadow-[0_10px_28px_rgba(0,0,0,0.25)]">
              Independent Arborist Guidance
            </p>
            <h1 className="text-4xl font-black leading-[0.98] text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">Concerned About a Tree?</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50 sm:mt-6 sm:text-xl sm:leading-8">Get an independent tree assessment before paying for tree work.</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-100/85 sm:mt-5 sm:text-base sm:leading-7">
              Peter Toler helps Gulf Coast homeowners, HOAs, municipalities, country clubs, businesses, and project teams understand what is actually needed, what can wait, and what should be prioritized before hiring a tree service.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <RequestConsultationButton className="min-h-12 w-full sm:w-auto" />
              <SchedulePhoneButton className="min-h-12 w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-teal-300/20 bg-[#07131b] px-4 py-3 text-white sm:px-6 sm:py-4 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-50 sm:grid-cols-3 sm:gap-3 sm:text-sm sm:tracking-[0.14em]">
          {audienceHighlights.map((item) => (
            <details key={item.title} className="group rounded-[1.6rem] border border-teal-300/25 bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <span>{item.title}</span>
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-[#f6c95a]/35 text-sm font-black text-[#f6c95a] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 border-t border-teal-300/15 pt-3 text-sm font-medium normal-case leading-6 tracking-normal text-emerald-50/80">
                {item.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section id="services" className="relative isolate overflow-hidden bg-[#050b12] py-12 text-white sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_0%,rgba(18,192,168,0.18),transparent_28rem),radial-gradient(circle_at_86%_24%,rgba(246,201,90,0.14),transparent_24rem),linear-gradient(145deg,#050b12_0%,#07131b_46%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="Tree consulting that helps you plan, prioritize, and decide."
            text="The work starts with the tree, the site, and the decision in front of you. Each assessment is meant to clarify risk, timing, preservation options, maintenance priorities, and the next practical step."
          />
          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {services.map(({ title, text, details, Icon }) => (
              <details key={title} className="group rounded-2xl border border-teal-300/20 bg-[#07131b]/80 p-4 shadow-[0_22px_54px_rgba(0,0,0,0.22)] backdrop-blur sm:p-5">
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="size-7 shrink-0 text-[#f6c95a] sm:size-8" aria-hidden="true" />
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/35 text-base font-black text-[#f6c95a] transition group-open:rotate-45">+</span>
                  </div>
                  <h3 className="mt-4 text-lg font-black text-white sm:mt-5 sm:text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-50/78 sm:mt-3">{text}</p>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[#f6c95a]/80">Tap to expand</p>
                </summary>
                <div className="mt-4 border-t border-teal-300/15 pt-4">
                  <ul className="space-y-2">
                    {details.map((detail) => (
                      <li key={detail} className="flex gap-2 text-sm leading-6 text-emerald-50/82">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <TreePlanningSection />

      <section id="when-to-call" className="relative isolate overflow-hidden bg-[#0b1f17] py-12 text-white sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(18,192,168,0.16),transparent_26rem),radial-gradient(circle_at_82%_10%,rgba(246,201,90,0.15),transparent_22rem),linear-gradient(135deg,#050b12_0%,#0b1f17_55%,#143527_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-1/2 opacity-50" />
        <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-8">
          <SectionHeading
            light
            title="When a tree assessment or survey helps."
            text="A short independent review can prevent a rushed or expensive decision. A broader inventory or survey can help larger properties plan tree maintenance before problems become urgent."
          />
          <div className="grid gap-3 sm:gap-4">
            {whenToCall.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur sm:p-5">
                <h3 className="text-base font-black text-[#f6c95a] sm:text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/80">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 bg-[#050b12] py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-8">
          <div className="mx-auto w-full max-w-xs rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 shadow-[0_20px_54px_rgba(0,0,0,0.24)] sm:max-w-none sm:p-5">
            <div className="overflow-hidden rounded-xl border border-[#f6c95a]/25 bg-white">
              <PeterHeadshot className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="mt-5 space-y-3 text-sm leading-6 text-emerald-50/85 sm:mt-6">
              <p className="font-black uppercase tracking-[0.14em] text-[#f6c95a]">Peter Toler</p>
              <p className="text-xl font-black leading-tight text-white sm:text-2xl">ISA Certified Arborist serving the Gulf Coast.</p>
              <a href={isaCredentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring">
                <BadgeCheck className="size-4" aria-hidden="true" />
                Verify current ISA profile
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black leading-tight text-white sm:text-4xl">Independent advice, not tree work sales.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/85 sm:mt-4 sm:text-base sm:leading-7">
              Peter provides practical arborist guidance across the Gulf Coast for homeowners, municipalities, HOAs, businesses, country clubs, and project teams who need a clearer read on tree condition, risk, preservation, construction impacts, and maintenance priorities.
            </p>
            <div className="mt-6 rounded-2xl border border-teal-300/20 bg-[#07131b] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.2)] sm:mt-8 sm:p-6">
              <CheckList items={independent} />
            </div>
            <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 sm:p-5">
                <TreePine className="size-7 text-[#f6c95a] sm:size-8" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-white">Mature-tree decisions</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/80">Guidance for live oaks, storm-exposed trees, property lines, targets, inventories, surveys, and preservation tradeoffs.</p>
              </div>
              <div className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 sm:p-5">
                <Hammer className="size-7 text-[#f6c95a] sm:size-8" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black text-white">Project and contractor clarity</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/80">Better questions and priorities before you compare quotes, approve work, plan construction, or budget maintenance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CredentialBadges />

      <section id="phone-consultation" className="relative isolate scroll-mt-28 overflow-hidden bg-[#0b1f17] py-12 text-white sm:py-16">
        <Image
          src="/consult-request-background.jpeg"
          alt="Tree canopy background"
          fill
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(5,11,18,0.96),rgba(11,31,23,0.88))]" />
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-8">
          <div className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-5 shadow-[0_20px_54px_rgba(0,0,0,0.24)] backdrop-blur sm:p-6">
            <CalendarDays className="size-9 text-[#f6c95a] sm:size-10" aria-hidden="true" />
            <div className="mt-4 sm:mt-5">
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
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] shadow-[0_18px_38px_rgba(246,201,90,0.2)] transition hover:bg-[#ffdc70] focus-ring sm:mt-8 sm:w-auto"
            >
              Open Scheduler in New Tab
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-teal-300/20 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.28)]">
            <iframe
              src={calendlyEmbedUrl}
              title="Schedule a phone consultation with Peter Toler"
              className="h-[560px] w-full bg-white sm:h-[760px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section id="consultation-request" className="relative isolate scroll-mt-28 overflow-hidden bg-[#050b12] py-12 text-white sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_85%_15%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_12%_82%,rgba(18,192,168,0.12),transparent_22rem)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-40" />
        <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-8">
          <div>
            <SectionHeading
              light
              title="Request a Tree Assessment."
              text="Use the Jotform request below for assessments, inventories, surveys, construction planning, preservation questions, and photo uploads. Photos belong inside the request form."
            />
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <SchedulePhoneButton className="min-h-12 w-full border-teal-300/25 bg-white/[0.06] text-white hover:bg-white/[0.1] sm:w-auto" />
              <VerifyIsaButton className="min-h-12 w-full border-teal-300/25 bg-white/[0.06] text-white hover:bg-white/[0.1] sm:w-auto" />
            </div>
          </div>
          <ConsultationRequestForm />
        </div>
      </section>

      <footer className="border-t border-teal-300/15 bg-[#030806] px-4 py-10 text-sm text-emerald-50/75 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <ArboristLogo showText={false} />
              <div>
                <p className="font-black uppercase tracking-[0.14em] text-white">The Arborist</p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f6c95a]">Peter Toler</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm leading-6">Independent arborist consulting for Gulf Coast homeowners, municipalities, HOAs, country clubs, businesses, and project teams.</p>
          </div>
          <div>
            <p className="font-black uppercase tracking-[0.14em] text-[#f6c95a]">Services</p>
            <ul className="mt-4 space-y-2">
              <li>Tree risk assessments</li>
              <li>Tree inventories and surveys</li>
              <li>Construction planning</li>
              <li>Tree preservation guidance</li>
              <li>Municipal and HOA consulting</li>
            </ul>
          </div>
          <div>
            <p className="font-black uppercase tracking-[0.14em] text-[#f6c95a]">Contact</p>
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
          <SocialLinksFooter />
        </div>
      </footer>
    </div>
  );
}
