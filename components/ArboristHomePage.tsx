import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  CloudLightning,
  FileCheck2,
  HeartPulse,
  Home,
  Landmark,
  Mail,
  Scale,
  ShieldCheck,
  Trees,
  WalletCards
} from "lucide-react";
import {
  consultationMailto,
  professionalServiceLines,
  reportVerificationPath,
  RequestConsultationButton,
  TreeBenefitsButton,
  TreeVerifiedLogo,
  VerifyReportButton
} from "@/components/ConsultBranding";
import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";

type Service = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const photosMailto = "mailto:petertoler@me.com?subject=Submit%20Consultation%20Photos";
const isaVerificationUrl = "https://certificates.directory.isa-arbor.com/";

const services: Service[] = [
  {
    title: "Professional Arborist Consulting",
    description:
      "Independent guidance for owners, managers, attorneys, insurers, HOAs, municipalities, and commercial sites.",
    Icon: ClipboardCheck
  },
  {
    title: "Tree Risk Assessments",
    description:
      "Evaluate visible defects, targets, site conditions, likelihood of failure, and practical risk-reduction options.",
    Icon: ShieldCheck
  },
  {
    title: "Tree Health Evaluations",
    description:
      "Review canopy condition, root-zone concerns, pests, stress indicators, soil, drainage, and preservation options.",
    Icon: HeartPulse
  },
  {
    title: "Development & Permit Consulting",
    description:
      "Clarify tree issues connected to construction, preservation commitments, local review, and permit decisions.",
    Icon: Scale
  },
  {
    title: "Storm Damage Assessments",
    description:
      "Separate urgent structural concerns from cosmetic storm damage after wind, rain, hurricanes, or saturated soil.",
    Icon: CloudLightning
  },
  {
    title: "Expert Recommendations",
    description:
      "Receive clear next steps you can share with contractors, boards, adjusters, buyers, sellers, or public officials.",
    Icon: FileCheck2
  }
];

const audiences = [
  ["Homeowners", Home],
  ["Property managers", Building2],
  ["Attorneys", Scale],
  ["Insurance representatives", BadgeCheck],
  ["HOA representatives", Trees],
  ["Municipal and commercial owners", Landmark]
] as const;

const processSteps = [
  {
    title: "Request consultation",
    text: "Share the tree concern, property context, photos if available, and the decision you need to make."
  },
  {
    title: "Assessment and review",
    text: "Peter evaluates tree condition, risk, health, site constraints, storm impact, or permit-related questions."
  },
  {
    title: "Recommendations",
    text: "You receive practical guidance on urgency, preservation, documentation, contractor questions, and next steps."
  }
];

function SectionHeading({
  label,
  title,
  text,
  align = "left"
}: {
  label?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label ? (
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
          {label}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-black leading-tight text-emerald-950 sm:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-7 text-stone-700">{text}</p> : null}
    </div>
  );
}

function PrimaryMailCta({
  children,
  href = consultationMailto,
  Icon = ArrowRight
}: {
  children: React.ReactNode;
  href?: string;
  Icon?: LucideIcon;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 focus-ring"
    >
      {children}
      <Icon className="size-4" aria-hidden="true" />
    </a>
  );
}

function SecondaryMailCta({
  children,
  href,
  Icon
}: {
  children: React.ReactNode;
  href: string;
  Icon: LucideIcon;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-900/20 bg-white px-4 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring"
    >
      <Icon className="size-4 text-emerald-800" aria-hidden="true" />
      {children}
    </a>
  );
}

export function ArboristHomePage() {
  return (
    <div className="bg-[#f7f8f0] text-stone-900">
      <section className="relative isolate overflow-hidden border-b border-emerald-950/10">
        <Image
          src="/consult-request-background.jpeg"
          alt="Mature waterfront tree under a clear blue sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,13,0.94)_0%,rgba(7,20,13,0.84)_40%,rgba(7,20,13,0.34)_70%,rgba(7,20,13,0.06)_100%)]" />

        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center px-4 py-12 sm:min-h-[640px] sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <TreeVerifiedLogo className="mb-7 text-white [&_span:last-child]:text-emerald-100 [&_span:last-child_span]:text-white" />
            <h1 className="text-5xl font-black uppercase leading-[0.94] tracking-[0.06em] sm:text-6xl lg:text-7xl">
              Consult Request
            </h1>
            <div className="mt-5">
              <p className="text-3xl font-black leading-tight text-white sm:text-4xl">
                Peter Toler
              </p>
              <p className="mt-2 text-xl font-black leading-8 text-emerald-100 sm:text-2xl">
                ISA Certified Consulting Arborist
              </p>
            </div>
            <div className="mt-7 grid max-w-2xl gap-2 text-base font-black text-emerald-50 sm:grid-cols-2">
              {professionalServiceLines.map((line) => (
                <div key={line} className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-200" aria-hidden="true" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
            <p className="mt-7 max-w-2xl text-base leading-7 text-stone-100 sm:text-lg">
              Request a professional tree consultation for risk, health, storm damage,
              development, permit, insurance, legal, HOA, municipal, or commercial property
              decisions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RequestConsultationButton />
              <VerifyReportButton className="border-white/60 bg-white/95" />
              <TreeBenefitsButton className="border-white/35 text-white hover:border-white hover:bg-white/10 hover:text-white" />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-stone-200">
              Secure report verification and timestamped consultation records powered by TREE.
              Blockchain verification is optional. Cryptocurrency knowledge is not required.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto grid max-w-7xl px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            "Professional arborist consulting",
            "Independent recommendations",
            "Optional TREE report verification"
          ].map((item) => (
            <div
              key={item}
              className="flex items-center justify-center gap-3 border-emerald-950/10 py-5 text-sm font-black uppercase tracking-[0.12em] text-emerald-950 lg:border-l lg:first:border-l-0"
            >
              <CheckCircle2 className="size-5 text-emerald-700" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-28 bg-[#f7f8f0] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            label="Consulting platform"
            title="Professional Tree Consultations for Real Property Decisions"
            text="The consultation request is built around independent arborist judgment, clear documentation, and recommendations that help you decide what to do next."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="rounded-md border border-emerald-950/10 bg-white p-6 shadow-[0_18px_42px_rgba(25,50,35,0.08)] transition hover:-translate-y-1 hover:border-emerald-800/35"
              >
                <span className="grid size-12 place-items-center rounded-md bg-emerald-50 text-emerald-800 ring-1 ring-emerald-900/10">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-black leading-tight text-emerald-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-700">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="professional-scope" className="scroll-mt-28 border-y border-emerald-950/10 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.7fr)] lg:items-start lg:px-8">
          <div>
            <SectionHeading
              label="Who this is for"
              title="A consultation surface for homeowners and professional representatives."
              text="The page should read first as a professional consulting intake, whether the request comes from a home, HOA, commercial property, legal matter, insurance claim, municipal question, or development project."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {audiences.map(([label, Icon]) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-4 text-sm font-black text-emerald-950"
                >
                  <Icon className="size-5 shrink-0 text-emerald-800" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-emerald-950/10 bg-[#eef3e6] p-6 shadow-[0_18px_42px_rgba(25,50,35,0.08)]">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
              Client perception goal
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-stone-700">
              {[
                "You are requesting a professional tree consultation.",
                "The consultation is performed by Peter Toler.",
                "Peter is an ISA Certified Consulting Arborist.",
                "Blockchain verification is an optional report feature.",
                "Cryptocurrency knowledge is not required."
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-800" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-28 bg-[#f7f8f0] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Consultation flow"
            title="Request, assessment, recommendations."
            text="The workflow stays familiar for clients: send the concern, review the tree issue, receive useful guidance. TREE verification sits behind the report process, not in front of the consultation."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-md border border-emerald-950/10 bg-white p-6">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-xl font-black text-emerald-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-700">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="report-verification" className="scroll-mt-28 border-y border-emerald-950/10 bg-emerald-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.58fr)] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-200">
              Powered by TREE Verified
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Secure report verification, kept secondary to the consultation.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50">
              Secure report verification and timestamped consultation records powered by TREE.
              This helps confirm when a consultation record or report was issued while keeping
              the client experience familiar and professional.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-100">
              Wallet connection is optional and only relevant for TREE benefits. A client can
              request a consultation or verify a report without knowing anything about
              cryptocurrency.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <VerifyReportButton className="border-white/60 bg-white" />
              <TreeBenefitsButton className="border-white/35 text-white hover:border-white hover:bg-white/10 hover:text-white" />
            </div>
          </div>
          <div className="rounded-md border border-white/15 bg-white/8 p-6">
            <TreeVerifiedLogo className="[&_span:last-child]:text-emerald-100 [&_span:last-child_span]:text-white" />
            <div className="mt-6 space-y-4 text-sm leading-6 text-emerald-50">
              <p>
                TREE Verified is presented as an integrity and timestamp layer, not as the main
                product and not as a requirement to request professional arborist guidance.
              </p>
              <p>
                The primary service remains the professional tree assessment and
                recommendation process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="tree-benefits" className="scroll-mt-28 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.55fr)] lg:items-center lg:px-8">
          <div>
            <SectionHeading
              label="Optional TREE benefits"
              title="Wallet connection is optional and never the first step."
              text="Clients can request consultations and verify reports without connecting a wallet. TREE benefits are an optional layer for users who already want them."
            />
          </div>
          <div className="rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-6">
            <WalletCards className="size-10 text-emerald-800" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-black text-emerald-950">
              Connect Wallet for TREE Benefits
            </h3>
            <p className="mt-3 text-sm leading-6 text-stone-700">
              This optional action should remain tertiary. It supports TREE-related benefits and
              verification features, not the consultation request itself.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 border-y border-emerald-950/10 bg-[#f7f8f0] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-center lg:px-8">
          <div className="rounded-md border border-emerald-950/10 bg-white p-6 shadow-[0_18px_42px_rgba(25,50,35,0.08)]">
            <div className="relative mx-auto size-44 overflow-hidden rounded-md bg-emerald-950 ring-1 ring-emerald-900/10">
              <Image
                src="/arborist-logo-cropped.png"
                alt="TREE Verified logo"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
            <div className="mt-6 rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-4">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                Credential
              </p>
              <p className="mt-2 text-xl font-black text-emerald-950">
                ISA Certified Consulting Arborist
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">Peter Toler</p>
            </div>
          </div>

          <div>
            <SectionHeading
              label="About Peter"
              title="Independent consulting arborist guidance."
              text="Peter Toler provides professional tree assessments, tree risk evaluations, health evaluations, storm damage assessments, permit and development consulting, and expert recommendations."
            />
            <div className="mt-6 space-y-4 text-base leading-7 text-stone-700">
              <p>
                The consultation is built around tree condition, risk, health, preservation, storm
                readiness, documentation, and decision support. The goal is to clarify the next
                step before a property owner or representative commits to work, paperwork, or a
                dispute position.
              </p>
              <p>
                TREE Verified can support timestamped consultation records, but the professional
                arborist consultation remains the primary service.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RequestConsultationButton />
              <SecondaryMailCta href={isaVerificationUrl} Icon={BadgeCheck}>
                Verify ISA Credentials
              </SecondaryMailCta>
            </div>
          </div>
        </div>
      </section>

      <section id="consultation-request" className="scroll-mt-28 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(20rem,0.6fr)] lg:items-center lg:px-8">
          <div>
            <SectionHeading
              label="Request consultation"
              title="Start with the tree question and the decision you need to make."
              text="Send a short description, photos if you have them, and the context behind the request. The next step can be a tree risk assessment, tree health evaluation, storm damage review, permit consultation, or expert recommendation."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryMailCta href={consultationMailto} Icon={Mail}>
                Request Consultation
              </PrimaryMailCta>
              <SecondaryMailCta href={photosMailto} Icon={Camera}>
                Submit Photos
              </SecondaryMailCta>
              <Link
                href={reportVerificationPath}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-900/20 bg-[#f7f8f0] px-4 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring"
              >
                <FileCheck2 className="size-4 text-emerald-800" aria-hidden="true" />
                Verify Report
              </Link>
            </div>
          </div>
          <ConsultationRequestForm />
        </div>
      </section>

      <footer className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <TreeVerifiedLogo className="[&_span:last-child]:text-emerald-100 [&_span:last-child_span]:text-white" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-emerald-50">
              CONSULT REQUEST by Peter Toler, ISA Certified Consulting Arborist.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-100">
              Secure report verification and timestamped consultation records powered by TREE.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-emerald-200">
              Consulting
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-emerald-50">
              {services.slice(0, 5).map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-emerald-200">
              Verification
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-emerald-50">
              <li><Link href={reportVerificationPath} className="hover:text-white focus-ring">Verify Report</Link></li>
              <li><Link href="/#tree-benefits" className="hover:text-white focus-ring">TREE Benefits</Link></li>
              <li>
                <a href={isaVerificationUrl} target="_blank" rel="noreferrer" className="hover:text-white focus-ring">
                  Verify ISA Credentials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-emerald-200">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-emerald-50">
              <li>Mobile, Alabama</li>
              <li>
                <a href={consultationMailto} className="inline-flex items-center gap-2 rounded-md border border-white/25 px-3 py-2 font-bold hover:bg-white/10 focus-ring">
                  Request Consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 px-4 py-5 text-center text-xs leading-5 text-emerald-100">
          Consult Request is a professional arborist consulting platform. TREE Verified is an optional report verification and timestamping feature.
        </div>
      </footer>
    </div>
  );
}

export default ArboristHomePage;
