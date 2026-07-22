import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CloudLightning,
  Hammer,
  Home,
  Landmark,
  ShieldCheck,
  TreePine,
  Users
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
import { AudienceTrustSection } from "@/components/AudienceTrustSection";
import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";
import { FAQSection } from "@/components/FAQSection";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { PeterHeadshot } from "@/components/PeterHeadshot";
import { SocialLinksFooter } from "@/components/SocialLinksFooter";
import { WhatYouReceiveSection } from "@/components/WhatYouReceiveSection";

const audiencePathways = [
  {
    title: "Homeowners",
    text: "Independent guidance for storm damage, defects, removal decisions, pruning proposals, and second opinions before approving tree work.",
    href: consultationAnchor,
    label: "Request an assessment",
    icon: Home
  },
  {
    title: "Property Managers, HOAs, and Businesses",
    text: "Tree inventories, maintenance priorities, risk screening, budgeting, and practical plans for properties with multiple trees.",
    href: "/#services",
    label: "Explore consulting services",
    icon: Building2
  },
  {
    title: "Real Estate",
    text: "Tree-related due diligence for buyers, sellers, agents, inspectors, and property owners before a transaction or major decision.",
    href: "/real-estate",
    label: "Explore real estate services",
    icon: Users
  },
  {
    title: "Municipalities and Project Teams",
    text: "Support for public trees, surveys, construction planning, preservation decisions, right-of-way concerns, and long-range maintenance.",
    href: "/#services",
    label: "Review project support",
    icon: Landmark
  }
] as const;

const serviceGroups = [
  {
    title: "Assess",
    text: "Tree risk, storm damage, visible defects, targets, and second opinions before removal or major work.",
    items: ["Tree risk assessments", "Storm damage evaluations", "Second opinions before tree work"],
    icon: ShieldCheck
  },
  {
    title: "Plan",
    text: "Clear priorities for properties with one tree or hundreds of trees, including maintenance, surveys, and budgeting.",
    items: ["Tree inventories and surveys", "Work prioritization", "Municipal, HOA, and commercial planning"],
    icon: ClipboardCheck
  },
  {
    title: "Preserve",
    text: "Arborist input before construction, grading, trenching, access changes, or other work that could affect valuable trees.",
    items: ["Construction planning", "Root-zone protection", "Mature-tree preservation guidance"],
    icon: Hammer
  }
] as const;

const resources = [
  {
    title: "Hidden Giants & Historic Trees",
    text: "Explore remarkable Gulf Coast trees, their stories, measurements, arboricultural observations, and preservation value.",
    href: "/historic-trees",
    icon: TreePine,
    external: false
  },
  {
    title: "Emergency Tree Board",
    text: "Public tree-hazard awareness, weather context, outage resources, and emergency safety information for Mobile and the Gulf Coast.",
    href: "https://mobile-tree-emergency.netlify.app",
    icon: CloudLightning,
    external: true
  },
  {
    title: "Tree Codes & Guidance",
    text: "General educational guidance about tree-related codes, permits, planning requirements, and public processes.",
    href: "/knowledge-center",
    icon: BookOpen,
    external: false
  },
  {
    title: "Tree Benefit Calculator",
    text: "Use a third-party tool to explore estimated environmental and economic benefits associated with an individual tree.",
    href: "/resources/tree-benefit-calculator",
    icon: TreePine,
    external: false
  }
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

function CheckList({ items }: { items: readonly string[] }) {
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
              Peter Toler helps Gulf Coast property owners and project teams understand what is needed, what can wait, and what should be prioritized before hiring a tree service.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <RequestConsultationButton className="min-h-12 w-full sm:w-auto" />
              <SchedulePhoneButton className="min-h-12 w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </section>

      <AudienceTrustSection />

      <section id="start-here" className="bg-stone-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Start with the kind of decision you need to make."
            text="Different properties require different levels of documentation and planning. Choose the pathway that best matches your situation."
          />
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {audiencePathways.map(({ title, text, href, label, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-[0_18px_44px_rgba(6,17,13,0.08)] sm:p-6">
                <Icon className="size-8 text-emerald-800" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black text-emerald-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-700">{text}</p>
                <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-800 hover:text-emerald-950 focus-ring">
                  {label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative isolate overflow-hidden bg-[#050b12] py-12 text-white sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_0%,rgba(18,192,168,0.18),transparent_28rem),radial-gradient(circle_at_86%_24%,rgba(246,201,90,0.14),transparent_24rem),linear-gradient(145deg,#050b12_0%,#07131b_46%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="Assess. Plan. Preserve."
            text="The work starts with the tree, the site, and the decision in front of you. Each service is designed to clarify risk, timing, preservation options, maintenance priorities, and the next practical step."
          />
          <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
            {serviceGroups.map(({ title, text, items, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-teal-300/20 bg-[#07131b]/80 p-5 shadow-[0_22px_54px_rgba(0,0,0,0.22)] backdrop-blur sm:p-6">
                <Icon className="size-8 text-[#f6c95a]" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-emerald-50/78">{text}</p>
                <div className="mt-5">
                  <CheckList items={items} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WhatYouReceiveSection />

      <section id="resources-projects" className="bg-[#0b1f17] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="Explore tree resources and signature projects."
            text="Educational tools, public-awareness projects, and regional tree stories are organized here so they support the business website without competing with the primary assessment pathway."
          />
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {resources.map(({ title, text, href, icon: Icon, external }) => {
              const card = (
                <>
                  <Icon className="size-8 text-[#f6c95a]" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-emerald-50/78">{text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a]">
                    Explore resource
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </>
              );

              return external ? (
                <a key={title} href={href} target="_blank" rel="noreferrer" className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-white/[0.08] focus-ring sm:p-6">
                  {card}
                </a>
              ) : (
                <Link key={title} href={href} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-white/[0.08] focus-ring sm:p-6">
                  {card}
                </Link>
              );
            })}
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
              Peter provides practical arborist guidance for property owners, municipalities, HOAs, businesses, and project teams that need a clearer read on tree condition, risk, preservation, construction impacts, and maintenance priorities.
            </p>
            <div className="mt-6 rounded-2xl border border-teal-300/20 bg-[#07131b] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.2)] sm:mt-8 sm:p-6">
              <CheckList items={independent} />
            </div>
          </div>
        </div>
      </section>

      <GoogleReviewsSection />

      <FAQSection />

      <section id="phone-consultation" className="border-y border-teal-300/15 bg-[#0b1f17] py-10 text-white sm:py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black sm:text-3xl">Need to talk through the situation first?</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:text-base">Schedule a phone consultation for an initial discussion. A phone consultation is separate from an on-site tree assessment.</p>
          </div>
          <a href={calendlySchedulingUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring">
            Schedule a Phone Consultation
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
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
              text="Serving the Gulf Coast, including Mobile County, Baldwin County, municipalities, HOAs, commercial properties, and construction or planning teams. Use the request form for assessments, inventories, surveys, construction planning, preservation questions, and photo uploads."
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
            <p className="mt-4 max-w-sm leading-6">Independent arborist consulting for Gulf Coast homeowners, municipalities, HOAs, businesses, and project teams.</p>
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
              <li><a href={consultationAnchor} className="hover:text-white focus-ring">Request a Tree Assessment</a></li>
              <li><a href={phoneConsultationAnchor} className="hover:text-white focus-ring">Schedule a Phone Consultation</a></li>
              <li><a href={isaCredentialUrl} target="_blank" rel="noreferrer" className="hover:text-white focus-ring">Verify ISA Credentials</a></li>
              <li><Link href={reportVerificationPath} className="text-emerald-50/55 hover:text-white focus-ring">Report verification</Link></li>
            </ul>
          </div>
          <SocialLinksFooter />
        </div>
      </footer>
    </div>
  );
}
