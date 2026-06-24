import Image from "next/image";
import { ArrowRight, FileCheck2, WalletCards } from "lucide-react";

export const consultationMailto =
  "mailto:petertoler@me.com?subject=Request%20Consultation";

export const reportVerificationMailto =
  "mailto:petertoler@me.com?subject=Verify%20Report";

export const consultationAnchor = "/#consultation-request";
export const reportVerificationPath = "/verify";
export const treeBenefitsAnchor = "/#tree-benefits";

export const professionalServiceLines = [
  "Professional Tree Assessments",
  "Tree Risk Evaluations",
  "Tree Health Assessments",
  "Permit & Development Consulting"
];

export function TreeVerifiedLogo({
  className = "",
  showText = true
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-md bg-emerald-950 ring-1 ring-emerald-700/20 sm:size-14">
        <Image
          src="/arborist-logo-cropped.png"
          alt="TREE Verified logo"
          width={56}
          height={56}
          className="h-full w-full object-contain"
          priority
          sizes="56px"
        />
      </span>
      {showText ? (
        <span className="min-w-0 text-xs font-bold uppercase leading-tight tracking-[0.14em] text-emerald-700">
          Powered by
          <span className="block text-emerald-950">TREE Verified</span>
        </span>
      ) : null}
    </div>
  );
}

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
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(6,78,59,0.2)] transition hover:bg-emerald-900 focus-ring ${className}`}
    >
      Request Consultation
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}

export function VerifyReportButton({
  href = reportVerificationPath,
  className = ""
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-emerald-800/30 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring ${className}`}
    >
      <FileCheck2 className="size-4 text-emerald-800" aria-hidden="true" />
      Verify Report
    </a>
  );
}

export function TreeBenefitsButton({
  href = treeBenefitsAnchor,
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
      <WalletCards className="size-4" aria-hidden="true" />
      Connect Wallet for TREE Benefits
    </a>
  );
}
