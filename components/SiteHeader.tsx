import Link from "next/link";
import {
  ArboristLogo,
  consultationAnchor,
  isaCredentialUrl,
  phoneConsultationAnchor,
  socialLinks
} from "@/components/ConsultBranding";
import {
  ArrowRight,
  BadgeCheck,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";
import type { SVGProps } from "react";

const desktopNavItems = [
  { href: "/#start-here", label: "Start Here" },
  { href: "/#services", label: "Services" },
  { href: "/real-estate", label: "Real Estate" },
  { href: "/#tree-planning", label: "Planning" },
  { href: "/#about", label: "About" },
  { href: "/#google-reviews", label: "Reviews" }
];

const headerSocialLinks = socialLinks.filter((link) => link.label !== "Google");

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.6 3c.3 1.8 1.4 3.3 3.1 4.1.7.3 1.5.5 2.3.5v3.6c-1.9 0-3.7-.6-5.3-1.7v7.1a5.6 5.6 0 1 1-4.8-5.5v3.7a2 2 0 1 0 1.2 1.8V3h3.5Z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  TikTok: TikTokIcon
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-teal-300/20 bg-[#050b12]/95 text-white shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="border-b border-[#f6c95a]/30 bg-[#07131b]">
        <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-4 lg:px-8 lg:py-1.5">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-[0.18em] text-[#f6c95a] lg:mb-0 lg:text-left">
            Follow The Arborist
          </p>

          <nav
            aria-label="Social media profiles"
            className="grid grid-cols-5 gap-1.5 lg:flex lg:items-center lg:justify-end"
          >
            {headerSocialLinks.map((link) => {
              const Icon = socialIcons[link.label];

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  data-track-event="Social Link Click"
                  data-track-label={link.label}
                  data-track-location="top_social_bar"
                  className="flex min-h-9 items-center justify-center rounded-full border border-[#f6c95a]/50 bg-[#f6c95a] px-2 py-2 text-[#06110d] shadow-[0_10px_22px_rgba(246,201,90,0.16)] transition hover:bg-[#ffdc70] focus-ring sm:px-3 lg:min-h-0 lg:border-teal-300/20 lg:bg-white/[0.04] lg:px-3.5 lg:py-1.5 lg:text-emerald-50/90 lg:shadow-none lg:hover:border-[#f6c95a]/70 lg:hover:bg-white/10 lg:hover:text-white"
                >
                  <Icon className="size-4 sm:size-5" aria-hidden />
                </a>
              );
            })}
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
          className="hidden items-center gap-0.5 text-sm font-bold text-emerald-50/80 lg:flex xl:gap-1"
        >
          {desktopNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-track-event="Navigation Click"
              data-track-label={item.label}
              data-track-location="desktop_header"
              className="rounded-full px-2.5 py-2 transition hover:bg-white/10 hover:text-white focus-ring xl:px-3"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={phoneConsultationAnchor}
            data-track-event="Schedule Phone Click"
            data-track-location="desktop_header"
            className="rounded-full px-2.5 py-2 transition hover:bg-white/10 hover:text-white focus-ring xl:px-3"
          >
            Schedule
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={isaCredentialUrl}
            target="_blank"
            rel="noreferrer"
            data-track-event="Verify ISA Click"
            data-track-location="header"
            className="hidden items-center justify-center gap-2 rounded-full border border-teal-300/25 bg-white/[0.04] px-3.5 py-2.5 text-sm font-black text-white transition hover:border-[#f6c95a]/70 hover:bg-white/10 focus-ring 2xl:inline-flex"
          >
            <BadgeCheck className="size-4 text-[#f6c95a]" aria-hidden="true" />
            Verify ISA
          </a>

          <Link
            href={consultationAnchor}
            data-track-event="Request Assessment Click"
            data-track-location="header"
            className="hidden min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#f6c95a] px-3 py-2 text-xs font-black text-[#06110d] shadow-[0_12px_28px_rgba(246,201,90,0.22)] transition hover:bg-[#ffdc70] focus-ring sm:inline-flex sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">Request</span>
            <span className="hidden sm:inline">Request Assessment</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <nav
        aria-label="Mobile quick actions"
        className="grid grid-cols-4 gap-1.5 border-t border-teal-300/15 px-2.5 py-1.5 text-center text-[11px] font-black text-emerald-50/90 lg:hidden"
      >
        <Link
          href="/#start-here"
          data-track-event="Navigation Click"
          data-track-label="Start Here"
          data-track-location="mobile_header"
          className="rounded-full border border-white/10 px-1.5 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Start Here
        </Link>
        <Link
          href={phoneConsultationAnchor}
          data-track-event="Schedule Phone Click"
          data-track-location="mobile_header"
          className="rounded-full border border-white/10 px-1.5 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Schedule
        </Link>
        <Link
          href={consultationAnchor}
          data-track-event="Request Assessment Click"
          data-track-location="mobile_header"
          className="rounded-full bg-[#f6c95a] px-1.5 py-2.5 text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
        >
          Request
        </Link>
        <Link
          href="/real-estate"
          data-track-event="Navigation Click"
          data-track-label="Real Estate"
          data-track-location="mobile_header"
          className="rounded-full border border-white/10 px-1.5 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Real Estate
        </Link>
      </nav>
    </header>
  );
}
