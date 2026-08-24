import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";

export const salutingBranchesRegistrationUrl =
  "https://www.salutingbranches.org/locations/mobile-national-cemetery";

export const salutingBranchesImage =
  "/assets/saluting_branches_mobile_event_scannable_qr.png";

export const salutingBranchesImageAlt =
  "Saluting Branches volunteer event at Mobile National Cemetery on September 16, 2026.";

export function SalutingBranchesFeature() {
  return (
    <section
      aria-labelledby="saluting-branches-feature-heading"
      className="relative isolate overflow-hidden border-y border-[#f6c95a]/30 bg-[#f4efe3] py-10 sm:py-14"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(4,120,87,0.12),transparent_28rem),radial-gradient(circle_at_88%_72%,rgba(246,201,90,0.24),transparent_26rem)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 lg:px-8">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-800">
            Saluting Branches 2026 · Mobile, Alabama
          </p>
          <h2
            id="saluting-branches-feature-heading"
            className="mt-3 text-3xl font-black leading-tight text-emerald-950 sm:text-4xl"
          >
            Use Your Skills to Honor Their Service
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">
            Saluting Branches is bringing arborists, tree-care professionals,
            equipment operators, and community volunteers together at Mobile
            National Cemetery on Wednesday, September 16, 2026.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex min-h-20 items-start gap-3 rounded-2xl border border-emerald-900/15 bg-white/80 p-4 shadow-sm">
              <CalendarDays className="mt-0.5 size-6 shrink-0 text-emerald-800" aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-stone-500">Date</p>
                <p className="mt-1 font-black text-emerald-950">Wednesday, September 16, 2026</p>
              </div>
            </div>
            <div className="flex min-h-20 items-start gap-3 rounded-2xl border border-emerald-900/15 bg-white/80 p-4 shadow-sm">
              <MapPin className="mt-0.5 size-6 shrink-0 text-emerald-800" aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-stone-500">Location</p>
                <p className="mt-1 font-black text-emerald-950">Mobile National Cemetery</p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-stone-700">
            Volunteer opportunities are available for both arborists and
            non-arborist support personnel. Every participant must register
            individually.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={salutingBranchesRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="Saluting Branches Registration Click"
              data-track-location="homepage_feature"
              className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#06110d] shadow-[0_14px_32px_rgba(73,54,10,0.2)] transition hover:bg-[#ffda70] sm:w-auto"
            >
              Register to Volunteer
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <Link
              href="/saluting-branches-mobile-2026/"
              className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-emerald-900 px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-emerald-950 transition hover:bg-emerald-950 hover:text-white sm:w-auto"
            >
              Learn More
            </Link>
          </div>

          <p className="mt-5 text-xs leading-5 text-stone-600">
            The Arborist is helping spread the word about this volunteer opportunity.
            Registration and event coordination are handled by Saluting Branches.
          </p>
        </div>

        <Link
          href="/saluting-branches-mobile-2026/"
          aria-label="Learn more about Saluting Branches 2026 at Mobile National Cemetery"
          className="focus-ring order-1 mx-auto block w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-950/15 bg-white p-2 shadow-[0_24px_64px_rgba(6,17,13,0.18)] lg:order-2"
        >
          <Image
            src={salutingBranchesImage}
            alt={salutingBranchesImageAlt}
            width={1200}
            height={1500}
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="h-auto w-full rounded-2xl"
          />
        </Link>
      </div>
    </section>
  );
}
