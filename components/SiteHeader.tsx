import Link from "next/link";
import {
  ArboristLogo,
  consultationAnchor,
  isaCredentialUrl,
  socialLinks
} from "@/components/ConsultBranding";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
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
  { href: "/#google-reviews", label: "Reviews" },
  { href: "/#about", label: "About" }
];

const resourceNavItems = [
  { href: "/historic-trees", label: "Historic Trees" },
  { href: "/knowledge-center", label: "Tree Codes" },
  { href: "/#tree-planning", label: "Tree Planning" }
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
        <div className="mx-auto max-w-[1480px] px-3 py-2 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-4 lg:px-8 lg:py-1.5">
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
        <Link href="/" className="flex shrink-0 items-start gap-3 focus-ring sm:gap-3.5">
          <ArboristLogo showText={false} compact className="shrink-0" />
          <span className="min-w-0 pt-0.5">
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

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-2 transition hover:bg-white/10 hover:text-white focus-ring xl:px-3"
            >
              Resources
              <ChevronDown className="size-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
            </button>
            <div className="invisible absolute right-0 top-full z-50 mt-2 w-52 translate-y-1 rounded-2xl border border-teal-300/20 bg-[#07131b] p-2 opacity-0 shadow-[0_18px_44px_rgba(0,0,0,0.45)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {resourceNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-track-event="Navigation Click"
                  data-track-label={item.label}
                  data-track-location="desktop_resources_menu"
                  className="block rounded-xl px-3 py-2.5 text-sm text-emerald-50/85 transition hover:bg-white/10 hover:text-white focus-ring"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
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
        className="flex gap-1 overflow-x-auto border-t border-teal-300/15 px-2 py-1.5 text-center text-[10px] font-black text-emerald-50/90 lg:hidden"
      >
        <Link
          href="/#start-here"
          data-track-event="Navigation Click"
          data-track-label="Start Here"
          data-track-location="mobile_header"
          className="min-w-[5.2rem] rounded-full border border-white/10 px-2 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Start Here
        </Link>
        <Link
          href="/#services"
          data-track-event="Navigation Click"
          data-track-label="Services"
          data-track-location="mobile_header"
          className="min-w-[5.2rem] rounded-full border border-white/10 px-2 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Services
        </Link>
        <Link
          href="/real-estate"
          data-track-event="Navigation Click"
          data-track-label="Real Estate"
          data-track-location="mobile_header"
          className="min-w-[5.8rem] rounded-full border border-white/10 px-2 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Real Estate
        </Link>
        <Link
          href="/#google-reviews"
          data-track-event="Navigation Click"
          data-track-label="Reviews"
          data-track-location="mobile_header"
          className="min-w-[5.2rem] rounded-full border border-white/10 px-2 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Reviews
        </Link>
        <Link
          href="/historic-trees"
          data-track-event="Navigation Click"
          data-track-label="Historic Trees"
          data-track-location="mobile_header"
          className="min-w-[6.4rem] rounded-full border border-white/10 px-2 py-2.5 leading-tight transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Historic Trees
        </Link>
        <Link
          href="/knowledge-center"
          data-track-event="Navigation Click"
          data-track-label="Tree Codes"
          data-track-location="mobile_header"
          className="min-w-[5.2rem] rounded-full border border-white/10 px-2 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Tree Codes
        </Link>
        <Link
          href="/#tree-planning"
          data-track-event="Navigation Click"
          data-track-label="Tree Planning"
          data-track-location="mobile_header"
          className="min-w-[6rem] rounded-full border border-white/10 px-2 py-2.5 transition hover:bg-white/10 hover:text-white focus-ring"
        >
          Tree Planning
        </Link>
        <Link
          href={consultationAnchor}
          data-track-event="Request Assessment Click"
          data-track-location="mobile_header"
          className="min-w-[5.2rem] rounded-full bg-[#f6c95a] px-2 py-2.5 text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
        >
          Request
        </Link>
      </nav>
    </header>
  );
}
