import Link from "next/link";
import {
  ArboristLogo,
  consultationAnchor,
  isaCredentialUrl,
  phoneConsultationAnchor
} from "@/components/ConsultBranding";
import { ArrowRight, BadgeCheck } from "lucide-react";

const desktopNavItems = [
  { href: "/#services", label: "Services" },
  { href: "/#when-to-call", label: "When to Call" },
  { href: "/#about", label: "About" }
];

const mobileNavItems = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: phoneConsultationAnchor, label: "Schedule" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-teal-300/20 bg-[#050b12]/95 text-white shadow-[0_18px_44px_rgba(0,0,0,0.36)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 focus-ring sm:gap-3">
          <ArboristLogo showText={false} />
          <span className="min-w-0">
            <span className="block text-base font-black uppercase leading-none tracking-[0.08em] text-white sm:text-xl">
              The Arborist
            </span>
            <span className="mt-0.5 block text-xs font-black leading-tight text-[#f6c95a] sm:mt-1 sm:text-sm">
              Peter Toler
            </span>
            <span className="hidden truncate text-xs font-bold leading-tight text-emerald-100/80 sm:block">
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
        aria-label="Mobile navigation"
        className="flex gap-2 overflow-x-auto border-t border-teal-300/15 px-3 py-1.5 text-xs font-bold text-emerald-50/80 sm:px-6 lg:hidden"
      >
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-ring"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
