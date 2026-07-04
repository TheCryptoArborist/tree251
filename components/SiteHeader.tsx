import Link from "next/link";
import {
  ArboristLogo,
  consultationAnchor,
  isaCredentialUrl,
  phoneConsultationAnchor,
  socialLinks
} from "@/components/ConsultBranding";
import { ArrowRight, BadgeCheck } from "lucide-react";

const desktopNavItems = [
  { href: "/#services", label: "Services" },
  { href: "/#when-to-call", label: "When to Call" },
  { href: "/#about", label: "About" }
];

const headerSocialLinks = socialLinks.filter((link) => link.label !== "Google");
const shortSocialLabels: Record<string, string> = {
  Facebook: "FB",
  Instagram: "IG",
  LinkedIn: "IN",
  YouTube: "YT"
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-teal-300/20 bg-[#050b12]/95 text-white shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="border-b border-[#f6c95a]/30 bg-[#07131b]">
        <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-4 lg:px-8 lg:py-1.5">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-[0.18em] text-[#f6c95a] lg:mb-0 lg:text-left">
            Follow The Arborist
          </p>
          <nav aria-label="Social media profiles" className="grid grid-cols-4 gap-1.5 lg:flex lg:items-center lg:justify-end">
            {headerSocialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="min-h-9 rounded-full border border-[#f6c95a]/50 bg-[#f6c95a] px-2 py-2 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#06110d] shadow-[0_10px_22px_rgba(246,201,90,0.16)] transition hover:bg-[#ffdc70] focus-ring sm:px-3 lg:min-h-0 lg:border-teal-300/20 lg:bg-white/[0.04] lg:py-1.5 lg:text-xs lg:text-emerald-50/90 lg:shadow-none lg:hover:border-[#f6c95a]/70 lg:hover:bg-white/10 lg:hover:text-white"
              >
                <span className="sm:hidden">{shortSocialLabels[link.label] ?? link.label}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 focus-ring sm:gap-3">
          <ArboristLogo showText={false} compact />
          <span className="min-w-0">
            <span className="block text-base font-black uppercase leading-none tracking-[0.07em] text-white sm:text-xl">
              The Arborist
            </span>
            <span className="mt-0.5 block text-xs font-black leading-tight text-[#f6c95a] sm:mt-1 sm:text-sm">
              Peter Toler
            </span>
            <span className="hidden truncate text-xs font-bold leading-tight text-emerald-100/80 min-[430px]:block">
              ISA Certified Arborist serving the Gulf Coast
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 text-sm font-bold text-emerald-50/80 lg:flex"
        >
          {desktopNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-ring"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={phoneConsultationAnchor}
            className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-ring"
          >
            Schedule
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={isaCredentialUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center gap-2 rounded-full border border-teal-300/25 bg-white/[0.04] px-3.5 py-2.5 text-sm font-black text-white transition hover:border-[#f6c95a]/70 hover:bg-white/10 focus-ring xl:inline-flex"
          >
            <BadgeCheck className="size-4 text-[#f6c95a]" aria-hidden="true" />
            Verify ISA
          </a>
          <Link
            href={consultationAnchor}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#f6c95a] px-3 py-2 text-xs font-black text-[#06110d] shadow-[0_12px_28px_rgba(246,201,90,0.22)] transition hover:bg-[#ffdc70] focus-ring sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">Request</span>
            <span className="hidden sm:inline">Request Assessment</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <nav
        aria-label="Mobile quick actions"
        className="grid grid-cols-3 gap-2 border-t border-teal-300/15 px-3 py-1.5 text-center text-xs font-black text-emerald-50/90 lg:hidden"
      >
        <Link
          href="/#services"
          className="rounded-full border border-white/10 px-2 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Services
        </Link>
        <Link
          href={phoneConsultationAnchor}
          className="rounded-full border border-white/10 px-2 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Schedule
        </Link>
        <Link
          href={consultationAnchor}
          className="rounded-full bg-[#f6c95a] px-2 py-2.5 text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
        >
          Request
        </Link>
      </nav>
    </header>
  );
}
