import Link from "next/link";
import {
  consultationAnchor,
  reportVerificationPath,
  treeBenefitsAnchor,
  TreeVerifiedLogo
} from "@/components/ConsultBranding";
import { ArrowRight, FileCheck2 } from "lucide-react";

const navItems = [
  { href: "/#services", label: "Services" },
  { href: "/#professional-scope", label: "Consulting Scope" },
  { href: reportVerificationPath, label: "Verify Report" },
  { href: "/#about", label: "About Peter" },
  { href: consultationAnchor, label: "Request" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#f9fbf4]/95 shadow-[0_14px_34px_rgba(20,35,22,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 focus-ring">
          <TreeVerifiedLogo showText={false} />
          <span className="min-w-0">
            <span className="block text-lg font-black uppercase leading-none tracking-[0.08em] text-emerald-950 sm:text-xl">
              Consult Request
            </span>
            <span className="mt-1 block text-sm font-black leading-tight text-stone-900">
              Peter Toler
            </span>
            <span className="block truncate text-xs font-bold leading-tight text-stone-600">
              ISA Certified Consulting Arborist
            </span>
            <span className="mt-1 hidden text-[0.68rem] font-bold uppercase tracking-[0.14em] text-emerald-700 sm:block">
              Powered by TREE Verified
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 text-sm font-bold text-stone-700 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 transition hover:bg-emerald-900/5 hover:text-emerald-950 focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <Link
            href={reportVerificationPath}
            className="hidden items-center justify-center gap-2 rounded-md border border-emerald-800/25 bg-white px-3.5 py-2.5 text-sm font-black text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50 focus-ring xl:inline-flex"
          >
            <FileCheck2 className="size-4 text-emerald-800" aria-hidden="true" />
            Verify Report
          </Link>
          <Link
            href={consultationAnchor}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-800 px-4 py-2.5 text-sm font-black text-white shadow-[0_12px_26px_rgba(6,78,59,0.18)] transition hover:bg-emerald-900 focus-ring"
          >
            Request Consultation
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="flex gap-1 overflow-x-auto border-t border-emerald-950/10 px-4 py-2 text-xs font-bold text-stone-700 sm:px-6 lg:hidden"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-2.5 py-2 transition hover:bg-emerald-900/5 hover:text-emerald-950 focus-ring"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={treeBenefitsAnchor}
          className="shrink-0 rounded-md px-2.5 py-2 text-stone-500 transition hover:bg-emerald-900/5 hover:text-emerald-950 focus-ring"
        >
          TREE Benefits
        </Link>
      </nav>
    </header>
  );
}
