import Image from "next/image";
import { ArrowRight, BadgeCheck, CalendarDays, ImageUp } from "lucide-react";

export const consultationMailto =
  "mailto:petertoler@me.com?subject=Request%20a%20Tree%20Assessment";

export const photoSubmissionMailto =
  "mailto:petertoler@me.com?subject=Tree%20Assessment%20Photos";

export const reportVerificationMailto =
  "mailto:petertoler@me.com?subject=Verify%20Report";

export const isaCredentialUrl =
  "https://certificates.directory.isa-arbor.com/profile/becbda421a7e286db985d6fe607e5436b09df137?search_term=toler&page=1";

export const calendlySchedulingUrl =
  "https://calendly.com/petertoler/tree-care-phone-consultation";

export const consultationAnchor = "/#consultation-request";
export const scheduleCallAnchor = calendlySchedulingUrl;
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
        <span className="min-w-0 text-xs font-bold uppercase leading-tight tracking-[0.14em] text-lime-700">
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
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-lime-400 px-5 py-3 text-sm font-black text-emerald-950 shadow-[0_14px_30px_rgba(190,255,78,0.18)] transition hover:bg-lime-300 focus-ring ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-emerald-800/30 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring ${className}`}
    >
      <BadgeCheck className="size-4 text-emerald-800" aria-hidden="true" />
      Verify ISA Credentials
    </a>
  );
}

export const VerifyReportButton = VerifyIsaButton;

export function SchedulePhoneButton({
  href = calendlySchedulingUrl,
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
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-emerald-800/30 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring ${className}`}
    >
      <CalendarDays className="size-4 text-emerald-800" aria-hidden="true" />
      Schedule a Phone Consultation
    </a>
  );
}

export function SubmitPhotosButton({
  href = photoSubmissionMailto,
  className = ""
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-transparent px-4 py-3 text-sm font-bold text-stone-700 transition hover:border-emerald-700 hover:text-emerald-950 focus-ring ${className}`}
    >
      <ImageUp className="size-4" aria-hidden="true" />
      Submit Photos
    </a>
  );
}

export const TreeBenefitsButton = SubmitPhotosButton;
