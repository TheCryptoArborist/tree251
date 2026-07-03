import Link from "next/link";
import {
  ArboristLogo,
  consultationAnchor,
  isaCredentialUrl,
  schedulePagePath
} from "@/components/ConsultBranding";
import { ArrowRight, BadgeCheck } from "lucide-react";

const navItems = [
  { href: "/#services", label: "Services" },
  { href: "/#when-to-call", label: "When to Call" },
  { href: "/#about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06110d]/95 text-white shadow-[0_14px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 focus-ring">
          <ArboristLogo showText={false} />
          <span className="min-w-0">
            <span className="block text-lg font-black uppercase leading-none tracking-[0.08em] text-white sm:text-xl">
              The Arborist
            </span>
            <span className="mt-1 block text-sm font-black leading-tight text-lime-300">
              Peter Toler
            </span>
            <span className="block truncate text-xs font-bold leading-tight text-emerald-100/80">
              ISA Certified Arborist in Mobile, AL
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 text-sm font-bold text-emerald-50/80 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-white focus-ring"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={schedulePagePath}
            className="rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-white focus-ring"
          >
            Schedule
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <a
            href={isaCredentialUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm font-black text-white transition hover:border-lime-300/60 hover:bg-white/10 focus-ring xl:inline-flex"
          >
            <BadgeCheck className="size-4 text-lime-300" aria-hidden="true" />
            Verify ISA
          </a>
          <Link
            href={consultationAnchor}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-lime-400 px-4 py-2.5 text-sm font-black text-emerald-950 shadow-[0_12px_26px_rgba(190,255,78,0.18)] transition hover:bg-lime-300 focus-ring"
          >
            Request Assessment
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="flex gap-1 overflow-x-auto border-t border-white/10 px-4 py-2 text-xs font-bold text-emerald-50/80 sm:px-6 lg:hidden"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-2.5 py-2 transition hover:bg-white/10 hover:text-white focus-ring"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={schedulePagePath}
          className="shrink-0 rounded-md px-2.5 py-2 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Schedule
        </Link>
        <Link
          href={consultationAnchor}
          className="shrink-0 rounded-md bg-lime-400 px-2.5 py-2 text-emerald-950 transition hover:bg-lime-300 focus-ring"
        >
          Request
        </Link>
      </nav>
    </header>
  );
}
