import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarDays, CheckCircle2, CloudLightning, ClipboardCheck, FileText, Hammer, HeartHandshake, Home, Leaf, Mail, MapPinned, MessageSquareText, ShieldCheck, Sprout, TreePine } from "lucide-react";
import { ArboristLogo, consultationAnchor, isaCredentialUrl, photoSubmissionMailto, reportVerificationPath, schedulePagePath, RequestConsultationButton, SchedulePhoneButton, VerifyIsaButton } from "@/components/ConsultBranding";
import { ConsultationRequestForm } from "@/components/ConsultationRequestForm";
import { PeterHeadshot } from "@/components/PeterHeadshot";

const services = [
  ["Tree Risk Assessments", "Independent review of defects, targets, likelihood of failure, and practical next steps.", ShieldCheck],
  ["Storm Damage Evaluations", "Post-storm guidance for broken limbs, uprooted trees, hanging branches, and cleanup priorities.", CloudLightning],
  ["Work Prioritization", "A clear order of operations so urgent safety items come before cosmetic or optional work.", ClipboardCheck],
  ["Second Opinions", "A neutral assessment before you approve removal, pruning, cabling, or expensive tree work.", MessageSquareText],
  ["Tree Preservation Guidance", "Practical ways to protect valuable canopy during construction, storms, and property changes.", Leaf],
  ["Permit and Tree Commission Guidance", "Help understanding local process, documentation needs, and how to approach protected trees.", FileText],
  ["Property Owner Consultations", "On-site or phone guidance for homeowners, property managers, HOAs, and professional reps.", Home]
] as const;

const independent = [
  "Peter does not need to sell removal, pruning, or cleanup work.",
  "The assessment is about what the tree needs, what can wait, and what should be handled first.",
  "You can use the guidance when comparing quotes or talking with a tree service."
];

const storm = [
  "Identify immediate safety concerns before cleanup starts.",
  "Separate emergency hazards from work that can be scheduled normally.",
  "Document tree condition for insurance, contractor, or property records.",
  "Plan hurricane-season priorities before the next storm track matters."
];

const permit = [
  "Understand whether a tree issue may need permit or Tree Commission review.",
  "Prepare photos, site context, and arborist notes before decisions are rushed.",
  "Keep preservation options visible when removal is not the only reasonable path."
];

const education = [
  "What to ask before approving tree removal",
  "How to sort urgent storm damage from normal cleanup",
  "When a second opinion can save a valuable tree",
  "What photos help an arborist understand a concern"
];

function SectionHeading({ title, text, center = false }: { title: string; text: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 className="text-3xl font-black leading-tight text-emerald-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-stone-700">{text}</p>
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
        <Image src="/arborist-hero-assessment.png" alt="Independent arborist assessing a mature tree with a property owner" fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,17,13,0.96)_0%,rgba(6,17,13,0.78)_43%,rgba(6,17,13,0.2)_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-3/5 opacity-70" />
        <div className="mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">Concerned About a Tree?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50 sm:text-xl">Get an independent tree assessment before paying for tree work.</p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100/85">Peter Toler is an ISA Certified Arborist in Mobile, Alabama. He helps property owners understand what is actually needed, what can wait, and what should be prioritized before hiring a tree service.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RequestConsultationButton />
              <SchedulePhoneButton href={schedulePagePath} />
              <a href={photoSubmissionMailto} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:border-lime-300 hover:bg-white/10 focus-ring">Submit Photos</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-lime-300/20 bg-[#0b1f17] px-4 py-4 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 text-sm font-black uppercase tracking-[0.14em] text-emerald-50 sm:grid-cols-3">
          <div className="rounded-md border border-white/10 px-4 py-3">ISA Certified Arborist</div>
          <div className="rounded-md border border-white/10 px-4 py-3">Mobile, Alabama</div>
          <div className="rounded-md border border-white/10 px-4 py-3">Independent Assessments</div>
        </div>
      </section>

      <section id="services" className="scroll-mt-28 bg-[#f7f8f0] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Tree consulting that helps you decide." text="The work starts with the tree and the decision in front of you, not with a sales quote. Each assessment is meant to clarify risk, timing, preservation options, and the next practical step." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, text, Icon]) => (
              <article key={title} className="rounded-md border border-emerald-950/10 bg-white p-5 shadow-[0_14px_32px_rgba(25,50,35,0.06)]">
                <Icon className="size-8 text-emerald-800" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black text-emerald-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-700">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="independent" className="scroll-mt-28 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <SectionHeading title="Why hire an independent consulting arborist?" text="A tree service may be excellent at tree work, but it still has work to sell. An independent assessment gives you a clearer read before you commit money to removal, pruning, cabling, or storm cleanup." />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><RequestConsultationButton /><VerifyIsaButton /></div>
          </div>
          <div className="rounded-md bg-[#06110d] p-6 text-white shadow-[0_20px_44px_rgba(6,17,13,0.22)]">
            <div className="flex items-center gap-3"><HeartHandshake className="size-10 text-lime-300" aria-hidden="true" /><h3 className="text-2xl font-black">Independent guidance before tree work.</h3></div>
            <div className="mt-6"><CheckList items={independent} light /></div>
          </div>
        </div>
      </section>

      <section id="storm" className="scroll-mt-28 bg-[#0b1f17] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div className="relative min-h-[22rem] overflow-hidden rounded-md border border-white/10">
            <Image src="/consult-request-background.jpeg" alt="Tree canopy texture in dark green light" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,13,0.12),rgba(6,17,13,0.72))]" />
            <div className="absolute bottom-0 p-6"><CloudLightning className="size-10 text-lime-300" aria-hidden="true" /><p className="mt-4 max-w-sm text-2xl font-black leading-tight">Storm decisions are easier when priorities are clear.</p></div>
          </div>
          <div><h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">Storm damage and hurricane preparation.</h2><p className="mt-4 text-base leading-7 text-emerald-50/85">Mobile properties need practical tree guidance before and after severe weather. A consulting assessment helps sort real risk from visible damage that only looks urgent.</p><div className="mt-8"><CheckList items={storm} light /></div></div>
        </div>
      </section>

      <section id="permit-guidance" className="scroll-mt-28 bg-[#f7f8f0] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div><SectionHeading title="Permit and Tree Commission guidance." text="Some tree decisions need more than a contractor estimate. Peter can help property owners understand local review questions, documentation, and preservation options without turning the website into a permit tracker." /><div className="mt-8"><CheckList items={permit} /></div></div>
          <div className="rounded-md border border-emerald-950/10 bg-white p-6 shadow-[0_18px_42px_rgba(25,50,35,0.08)]"><MapPinned className="size-10 text-emerald-800" aria-hidden="true" /><h3 className="mt-5 text-2xl font-black text-emerald-950">Useful when the tree decision affects more than one person.</h3><p className="mt-4 text-sm leading-6 text-stone-700">This can include neighbors, HOAs, property managers, insurers, city process, construction teams, or buyers and sellers.</p></div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div className="rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-6"><div className="overflow-hidden rounded-md border border-emerald-950/10 bg-white"><PeterHeadshot className="aspect-[1/1.05] w-full object-cover" /></div><div className="mt-8 space-y-3 text-sm leading-6 text-stone-700"><ArboristLogo /><p className="font-black uppercase tracking-[0.14em] text-emerald-800">Peter Toler</p><p className="text-2xl font-black leading-tight text-emerald-950">ISA Certified Arborist serving Mobile, Alabama.</p><a href={isaCredentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-black text-emerald-900 hover:text-emerald-700 focus-ring"><BadgeCheck className="size-4" aria-hidden="true" />Verify current ISA profile</a></div></div>
          <div><SectionHeading title="About Peter." text="Peter provides independent arborist guidance for property owners who need a practical read on tree condition, risk, storm damage, preservation, and local decision-making. The value is not selling tree work. The value is knowing what work is actually needed before you pay for it." /><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-5"><TreePine className="size-8 text-emerald-800" aria-hidden="true" /><h3 className="mt-4 text-lg font-black text-emerald-950">Mature-tree decisions</h3><p className="mt-2 text-sm leading-6 text-stone-700">Guidance for live oaks, storm-exposed trees, property lines, targets, and preservation tradeoffs.</p></div><div className="rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-5"><Hammer className="size-8 text-emerald-800" aria-hidden="true" /><h3 className="mt-4 text-lg font-black text-emerald-950">Contractor clarity</h3><p className="mt-2 text-sm leading-6 text-stone-700">Better questions and priorities before you compare quotes or authorize work.</p></div></div></div>
        </div>
      </section>

      <section className="bg-[#f7f8f0] py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading center title="Practical confidence before the invoice." text="Independent assessment is useful when the decision has cost, safety, insurance, permit, or preservation consequences." /><div className="mt-10 grid gap-4 md:grid-cols-3">{["Independent by design", "Local Mobile context", "Decision-ready notes"].map((point) => <article key={point} className="rounded-md border border-emerald-950/10 bg-white p-5"><Sprout className="size-8 text-lime-600" aria-hidden="true" /><h3 className="mt-4 text-xl font-black text-emerald-950">{point}</h3><p className="mt-3 text-sm leading-6 text-stone-700">Practical guidance before you commit money to tree work.</p></article>)}</div></div></section>

      <section className="bg-white py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"><SectionHeading title="Educational videos and field notes." text="Short, practical education can help property owners ask better questions before storm season, before removal, and before paying for work that may not be the first priority." /><div className="grid gap-3">{education.map((post) => <div key={post} className="flex items-center gap-4 rounded-md border border-emerald-950/10 bg-[#f7f8f0] p-4"><Leaf className="size-6 shrink-0 text-emerald-800" aria-hidden="true" /><p className="text-base font-black text-emerald-950">{post}</p></div>)}</div></div></section>

      <section id="schedule-call" className="scroll-mt-28 bg-[#0b1f17] py-16 text-white sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8"><div><CalendarDays className="size-10 text-lime-300" aria-hidden="true" /><h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">Want to talk it through first?</h2><p className="mt-4 max-w-3xl text-base leading-7 text-emerald-50/85">Schedule a phone consultation, send photos, or start with the assessment request form.</p></div><div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end"><SchedulePhoneButton href={schedulePagePath} /><a href={photoSubmissionMailto} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:border-lime-300 hover:bg-white/10 focus-ring"><Mail className="size-4 text-lime-300" aria-hidden="true" />Submit Photos</a></div></div></section>

      <section id="consultation-request" className="scroll-mt-28 bg-white py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-8"><div><SectionHeading title="Request a Tree Assessment." text="Send the concern, the location, and what decision you are trying to make. Photos help, but the most important detail is what you need to decide before paying for tree work." /><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><SchedulePhoneButton href={schedulePagePath} /><VerifyIsaButton /></div></div><ConsultationRequestForm /></div></section>

      <section className="bg-[#06110d] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8"><div className="mx-auto max-w-4xl text-center"><h2 className="text-4xl font-black leading-tight sm:text-5xl">Get an independent assessment before the work begins.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-emerald-50/85">If a tree service has recommended removal or major pruning, a second opinion can help you understand whether the work is urgent, optional, or worth preserving around.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap"><RequestConsultationButton /><SchedulePhoneButton href={schedulePagePath} /></div></div></section>

      <footer className="border-t border-white/10 bg-[#030806] px-4 py-10 text-sm text-emerald-50/75 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr_1fr]"><div><div className="flex items-center gap-3"><ArboristLogo showText={false} /><div><p className="font-black uppercase tracking-[0.14em] text-white">The Arborist</p><p className="text-xs font-bold uppercase tracking-[0.14em] text-lime-300">Peter Toler</p></div></div><p className="mt-4 max-w-sm leading-6">The Arborist is Peter Toler&apos;s independent arborist consulting website for Mobile, Alabama property owners.</p></div><div><p className="font-black uppercase tracking-[0.14em] text-lime-300">Services</p><ul className="mt-4 space-y-2"><li>Tree risk assessments</li><li>Storm damage evaluations</li><li>Second opinions before tree work</li><li>Permit and Tree Commission guidance</li></ul></div><div><p className="font-black uppercase tracking-[0.14em] text-lime-300">Contact</p><ul className="mt-4 space-y-2"><li><a href={consultationAnchor} className="hover:text-white focus-ring">Request a Tree Assessment</a></li><li><Link href={schedulePagePath} className="hover:text-white focus-ring">Schedule a Phone Consultation</Link></li><li><a href={isaCredentialUrl} target="_blank" rel="noreferrer" className="hover:text-white focus-ring">Verify ISA Credentials</a></li><li><Link href={reportVerificationPath} className="text-emerald-50/55 hover:text-white focus-ring">Report verification</Link></li></ul></div></div></footer>
    </div>
  );
}
