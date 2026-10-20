import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import {
  salutingBranchesImage,
  salutingBranchesImageAlt
} from "@/components/SalutingBranchesFeature";

const pageUrl = "https://tree251.xyz/saluting-branches-mobile-2026/";
const metaDescription =
  "Archive of the September 16, 2026 Saluting Branches volunteer event information for Mobile National Cemetery.";

export const metadata: Metadata = {
  title: "Saluting Branches Mobile 2026 Archive",
  description: metaDescription,
  alternates: { canonical: "/saluting-branches-mobile-2026/" },
  openGraph: {
    title: "Saluting Branches Mobile 2026 Archive",
    description: metaDescription,
    url: pageUrl,
    siteName: "The Arborist",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: salutingBranchesImage,
        width: 1200,
        height: 1500,
        alt: salutingBranchesImageAlt
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Saluting Branches Mobile 2026 Archive",
    description: metaDescription,
    images: [salutingBranchesImage]
  }
};

export default function SalutingBranchesMobile2026Page() {
  return (
    <div className="bg-[#f7f3e9] text-stone-800">
      <section className="relative isolate overflow-hidden bg-[#06110d] py-10 text-white sm:py-14">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_10%,rgba(18,192,168,0.18),transparent_28rem),radial-gradient(circle_at_90%_10%,rgba(246,201,90,0.18),transparent_24rem),linear-gradient(145deg,#050b12_0%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-2/3 opacity-45" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-12 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f6c95a]">
              2026 Event Archive
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.02] text-white sm:text-5xl">
              Saluting Branches at Mobile National Cemetery
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:text-lg sm:leading-8">
              This page preserves information from the Saluting Branches volunteer event scheduled for September 16, 2026, at Mobile National Cemetery. Registration for the 2026 event is closed.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.07] p-4">
                <CalendarDays className="mt-0.5 size-6 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-100/65">Event date</p>
                  <p className="mt-1 font-black text-white">September 16, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.07] p-4">
                <MapPin className="mt-0.5 size-6 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-100/65">Location</p>
                  <p className="mt-1 font-black text-white">Mobile National Cemetery</p>
                  <p className="mt-1 text-sm leading-5 text-emerald-50/75">1202 Virginia Street, Mobile, Alabama 36604</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-teal-300/20 bg-white p-2 shadow-[0_28px_72px_rgba(0,0,0,0.32)]">
            <Image
              src={salutingBranchesImage}
              alt={salutingBranchesImageAlt}
              width={1200}
              height={1500}
              priority
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-900/15 bg-white p-6 shadow-[0_20px_52px_rgba(6,17,13,0.1)] sm:p-8">
            <h2 className="text-3xl font-black text-emerald-950">
              A Gulf Coast tree-care service project
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-stone-700">
              <p>
                Saluting Branches organizes volunteer tree and landscape care at properties dedicated to America&apos;s veterans.
              </p>
              <p>
                The Arborist shared the Mobile event information to help connect members of the local and Gulf Coast tree-care community with the opportunity to volunteer.
              </p>
              <p>
                This archive is retained for reference only. It is no longer an active registration page.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border-2 border-emerald-900 px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-emerald-950 transition hover:bg-emerald-950 hover:text-white"
            >
              Return to The Arborist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
