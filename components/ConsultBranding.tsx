import Image from "next/image";
import { ArrowRight, BadgeCheck, CalendarDays, ImageUp } from "lucide-react";

export const consultationMailto =
  "mailto:petertoler@me.com?subject=Request%20a%20Tree%20Assessment";

export const reportVerificationMailto =
  "mailto:petertoler@me.com?subject=Verify%20Report";

export const isaCredentialUrl =
  "https://certificates.directory.isa-arbor.com/profile/becbda421a7e286db985d6fe607e5436b09df137?search_term=toler&page=1";

export const calendlySchedulingUrl =
  "https://calendly.com/petertoler/tree-care-phone-consultation";

export const jotformConsultationUrl = "https://form.jotform.com/221198646412861";

export const consultationAnchor = "/#consultation-request";
export const phoneConsultationAnchor = "/#phone-consultation";
export const scheduleCallAnchor = phoneConsultationAnchor;
export const schedulePagePath = "/schedule";
export const reportVerificationPath = "/verify";
export const treeBenefitsAnchor = "/#tree-benefits";

export const professionalServiceLines = [
  "Tree Risk Assessments",
  "Storm Damage Evaluations",
  "Work Prioritization",
  "Tree Preservation Guidance"
];

export function ArboristLogo({
  className = "",
  showText = true
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-md bg-emerald-950 ring-1 ring-lime-300/25 sm:size-14">
        <Image
          src="/arborist-logo-cropped.png"
          alt="The Arborist logo"
          width={56}
          height={56}
          className="h-full w-full object-contain"
          priority
          sizes="56px"
        />
      </span>
      {showText ? (
        <span className="min-w-0 text-xs font-bold uppercase leading-tight tracking-[0.14em] text-[#f6c95a]">
          The Arborist
          <span className="block text-emerald-950">Peter Toler</span>
        </span>
      ) : null}
    </div>
  );
}

export const TreeVerifiedLogo = ArboristLogo;

export function RequestConsultationButton({
  href = consultationAnchor,
  className = ""
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] shadow-[0_18px_38px_rgba(246,201,90,0.2)] transition hover:bg-[#ffdc70] focus-ring ${className}`}
    >
      Request a Tree Assessment
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}

export function VerifyIsaButton({
  href = isaCredentialUrl,
  className = ""
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-teal-300/35 bg-[#07131b] px-5 py-3 text-sm font-black text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring ${className}`}
    >
      <BadgeCheck className="size-4 text-[#f6c95a]" aria-hidden="true" />
      Verify ISA Credentials
    </a>
  );
}

export const VerifyReportButton = VerifyIsaButton;

export function SchedulePhoneButton({
  href = scheduleCallAnchor,
  className = ""
}: {
  href?: string;
  className?: string;
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-teal-300/35 bg-[#07131b] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring ${className}`}
    >
      <CalendarDays className="size-4 text-[#f6c95a]" aria-hidden="true" />
      Schedule a Phone Consultation
    </a>
  );
}

export function SubmitPhotosButton({
  href = consultationAnchor,
  className = ""
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-teal-300/35 bg-[#07131b] px-4 py-3 text-sm font-bold text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring ${className}`}
    >
      <ImageUp className="size-4 text-[#f6c95a]" aria-hidden="true" />
      Submit Photos With Request
    </a>
  );
}

export const TreeBenefitsButton = SubmitPhotosButton;
