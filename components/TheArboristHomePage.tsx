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
  FileText,
  Hammer,
  Home,
  ShieldCheck,
  TreePine,
} from "lucide-react";
import {
  ArboristLogo,
  calendlySchedulingUrl,
  consultationAnchor,
  isaCredentialUrl,
  phoneConsultationAnchor,
  reportVerificationPath,
  RequestConsultationButton,
  SchedulePhoneButton
} from "@/components/ConsultBranding";
import { AudienceTrustSection } from "@/components/AudienceTrustSection";
import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";
import { FAQSection } from "@/components/FAQSection";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { PeterHeadshot } from "@/components/PeterHeadshot";
import { SocialLinksFooter } from "@/components/SocialLinksFooter";
import { WhatYouReceiveSection } from "@/components/WhatYouReceiveSection";

const serviceGroups = [
  {
    title: "I’m worried about a tree",
    text: "Visible defects, leaning, cavities, dead limbs, storm damage, declining health, or a tree that simply does not look right.",
    detail: "Find out what appears urgent, what can wait, and what should be watched.",
    href: consultationAnchor,
    label: "Request an assessment",
    icon: ShieldCheck
  },
  {
    title: "I was told a tree needs work or removal",
    text: "Get an independent second opinion before approving removal, major pruning, cabling, or other expensive tree work.",
    detail: "Understand whether the recommendation is necessary, appropriately prioritized, or worth questioning.",
    href: consultationAnchor,
    label: "Get a second opinion",
    icon: BadgeCheck
  },
  {
    title: "I need to protect trees during construction",
    text: "Driveways, retaining walls, grading, trenching, utilities, drainage, foundations, access changes, and other work near mature trees.",
    detail: "Identify root-zone constraints and preservation options before excavation or design decisions cause avoidable damage.",
    href: consultationAnchor,
    label: "Request project guidance",
    icon: Hammer
  },
  {
    title: "I manage a property with many trees",
    text: "Tree inventories, maintenance priorities, budgeting, risk screening, and long-range planning for HOAs, businesses, campuses, and municipalities.",
    detail: "Turn a large tree population into an organized, prioritized management plan.",
    href: "/tree-inventories",
    label: "Explore tree inventories",
    icon: Building2
  },
  {
    title: "I’m buying or selling property",
    text: "Tree-related due diligence for buyers, sellers, agents, inspectors, and property owners before a real-estate decision.",
    detail: "Identify significant tree concerns before they become an expensive surprise.",
    href: "/real-estate",
    label: "Explore real estate services",
    icon: Home
  },
  {
    title: "I need documentation or professional guidance",
    text: "Written recommendations, reports, permit support, project coordination, and information that can be shared with contractors, boards, engineers, insurers, or attorneys.",
    detail: "Match the level of documentation to the decision, project, or professional need in front of you.",
    href: consultationAnchor,
    label: "Discuss your assignment",
    icon: FileText
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
            <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-emerald-50 sm:mt-6 sm:text-xl sm:leading-8">
              Get an independent assessment from an ISA Certified Consulting Arborist before deciding what tree work to authorize.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-100/85 sm:mt-5 sm:text-base sm:leading-7">
              Tree risk, health concerns, storm damage, preservation, development, permit, HOA, municipal, and commercial consulting.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <RequestConsultationButton className="min-h-12 w-full sm:w-auto" />
              <SchedulePhoneButton href={calendlySchedulingUrl} className="min-h-12 w-full sm:w-auto" />
            </div>
            <div className="mt-5 flex max-w-2xl items-start gap-3 rounded-xl border border-teal-300/20 bg-black/25 p-4 text-sm leading-6 text-emerald-50/90 backdrop-blur-sm">
              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
              <p>
                <span className="font-black text-white">Peter Toler — ISA Certified Consulting Arborist.</span>{" "}
                Independent recommendations with no tree-removal sales pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AudienceTrustSection />

      <section id="services" className="relative isolate overflow-hidden bg-[#050b12] py-12 text-white sm:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_0%,rgba(18,192,168,0.18),transparent_28rem),radial-gradient(circle_at_86%_24%,rgba(246,201,90,0.14),transparent_24rem),linear-gradient(145deg,#050b12_0%,#07131b_46%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="What do you need help with?"
            text="Start with the problem or decision in front of you. You do not need to know the technical name of the arborist service you need."
          />
          <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {serviceGroups.map(({ title, text, detail, href, label, icon: Icon }) => (
              <article key={title} className="flex h-full flex-col rounded-2xl border border-teal-300/20 bg-[#07131b]/80 p-5 shadow-[0_22px_54px_rgba(0,0,0,0.22)] backdrop-blur sm:p-6">
                <Icon className="size-8 text-[#f6c95a]" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black leading-tight text-white sm:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-emerald-50/82">{text}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-emerald-100/65">{detail}</p>
                <Link
                  href={href}
                  data-track-event="Service Situation Click"
                  data-track-label={title}
                  data-track-location="services_section"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] transition hover:text-[#ffdc70] focus-ring"
                >
                  {label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
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

      <section id="consultation-request" className="relative isolate scroll-mt-28 overflow-hidden bg-[#050b12] py-8 text-white sm:py-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_85%_15%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_12%_82%,rgba(18,192,168,0.12),transparent_22rem)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 sm:mb-7">
            <SectionHeading
              light
              title="Request a Tree Assessment."
              text="Choose Start Assessment Request below when you are ready to tell Peter what is happening, add photos if you have them, and submit your request."
            />
          </div>
          <ConsultationRequestForm />
          <div className="mt-6 rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-lg font-black text-white">Prefer to talk first?</h3>
                <p className="mt-1 text-sm leading-6 text-emerald-50/75">A phone consultation is available if you want to discuss the situation before submitting an on-site assessment request.</p>
              </div>
              <a href={calendlySchedulingUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[#f6c95a]/45 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-[#f6c95a] transition hover:bg-white/[0.1] focus-ring sm:w-auto">
                Schedule a Phone Consultation
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
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