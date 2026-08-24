import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import {
  salutingBranchesImage,
  salutingBranchesImageAlt,
  salutingBranchesRegistrationUrl
} from "@/components/SalutingBranchesFeature";

const pageUrl = "https://tree251.xyz/saluting-branches-mobile-2026/";
const metaDescription =
  "Volunteer for Saluting Branches at Mobile National Cemetery on September 16, 2026. Arborists, equipment operators, support volunteers, and community members can register.";
const openGraphDescription =
  "Join Saluting Branches at Mobile National Cemetery on September 16, 2026, for a volunteer day of tree and landscape care honoring America’s veterans.";

export const metadata: Metadata = {
  title: "Saluting Branches Mobile 2026",
  description: metaDescription,
  alternates: { canonical: "/saluting-branches-mobile-2026/" },
  openGraph: {
    title: "Use Your Skills to Honor Their Service",
    description: openGraphDescription,
    url: pageUrl,
    siteName: "The Arborist",
    locale: "en_US",
    type: "website",
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
    title: "Use Your Skills to Honor Their Service",
    description: openGraphDescription,
    images: [salutingBranchesImage]
  }
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Saluting Branches 2026 at Mobile National Cemetery",
  description: openGraphDescription,
  startDate: "2026-09-16",
  image: [`https://tree251.xyz${salutingBranchesImage}`],
  url: salutingBranchesRegistrationUrl,
  location: {
    "@type": "Place",
    name: "Mobile National Cemetery",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1202 Virginia Street",
      addressLocality: "Mobile",
      addressRegion: "AL",
      postalCode: "36604",
      addressCountry: "US"
    }
  },
  organizer: {
    "@type": "Organization",
    name: "Saluting Branches",
    url: "https://www.salutingbranches.org/"
  }
};

const volunteerRoles = [
  "Tree climbers",
  "Bucket-truck operators",
  "Crane operators",
  "Equipment and chainsaw operators",
  "Plant health care professionals",
  "Stump-grinder operators",
  "Tree inventory personnel",
  "Tree-risk-assessment professionals",
  "Debris-removal support",
  "Administrative and non-arborist volunteers"
];

function RegistrationButton({ location }: { location: string }) {
  return (
    <a
      href={salutingBranchesRegistrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-track-event="Saluting Branches Registration Click"
      data-track-location={location}
      className="focus-ring inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.08em] text-[#06110d] shadow-[0_16px_38px_rgba(0,0,0,0.24)] transition hover:bg-[#ffda70] sm:w-auto"
    >
      Register to Volunteer
      <ExternalLink className="size-4" aria-hidden="true" />
    </a>
  );
}

export default function SalutingBranchesMobile2026Page() {
  return (
    <div className="bg-[#f7f3e9] text-stone-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <section className="relative isolate overflow-hidden bg-[#06110d] py-9 text-white sm:py-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_10%,rgba(18,192,168,0.18),transparent_28rem),radial-gradient(circle_at_90%_10%,rgba(246,201,90,0.18),transparent_24rem),linear-gradient(145deg,#050b12_0%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 left-0 -z-10 w-2/3 opacity-45" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-12 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f6c95a]">
              Saluting Branches 2026 at Mobile National Cemetery
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.02] text-white sm:text-5xl">
              Use Your Skills to Honor Their Service
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:text-lg sm:leading-8">
              On Wednesday, September 16, 2026, arborists, tree-care
              professionals, equipment operators, and community volunteers will
              come together at Mobile National Cemetery for the Saluting Branches
              Day of Service.
            </p>

            <div className="mt-6">
              <RegistrationButton location="event_hero" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.07] p-4">
                <CalendarDays className="mt-0.5 size-6 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-100/65">Date</p>
                  <p className="mt-1 font-black text-white">Wednesday, September 16, 2026</p>
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
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-emerald-950">A Day of Service for Those Who Served</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-stone-700">
              <p>
                Saluting Branches honors American service men and women by
                organizing volunteer tree and landscape care for properties
                dedicated to our veterans.
              </p>
              <p>
                This is an opportunity for members of the Mobile and Gulf Coast
                tree-care community to use their professional skills in service
                to those who served our country.
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-emerald-900/15 bg-white p-5 shadow-[0_20px_52px_rgba(6,17,13,0.1)] sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">Event Details</p>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.1em] text-stone-500">Date</dt>
                <dd className="mt-1 font-black text-emerald-950">Wednesday, September 16, 2026</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.1em] text-stone-500">Location</dt>
                <dd className="mt-1 font-black text-emerald-950">Mobile National Cemetery</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.1em] text-stone-500">Address</dt>
                <dd className="mt-1 font-black text-emerald-950">1202 Virginia Street, Mobile, Alabama 36604</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-black text-emerald-950">Who Can Volunteer?</h2>
              <p className="mt-4 text-base leading-7 text-stone-700">
                You do not have to climb trees or operate equipment to make a meaningful contribution.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {volunteerRoles.map((role) => (
                <li key={role} className="rounded-2xl border border-emerald-900/12 bg-[#f7f3e9] px-4 py-3 font-bold text-emerald-950">
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-3xl border border-[#f6c95a]/60 bg-[#fff5d9] p-5 sm:p-8">
            <h2 className="text-2xl font-black text-emerald-950">Individual Registration Is Required</h2>
            <p className="mt-3 max-w-4xl text-base leading-7 text-stone-700">
              Every participant must complete an individual registration form.
              This requirement also applies to each employee or member attending
              with a company, crew, agency, organization, or other group.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#06110d] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black">Ready to Volunteer?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-emerald-50/82">
            Complete the official Mobile National Cemetery registration form through Saluting Branches.
          </p>
          <div className="mt-7">
            <RegistrationButton location="event_footer" />
          </div>
          <p className="mt-5 text-sm leading-6 text-emerald-50/72">
            Official registration:{" "}
            <a
              href={salutingBranchesRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring break-words font-bold text-[#f6c95a] underline decoration-[#f6c95a]/55 underline-offset-4 hover:text-[#ffda70]"
            >
              salutingbranches.org/locations/mobile-national-cemetery
            </a>
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-emerald-50/72">
            Registration and event coordination are handled by Saluting Branches.
            Additional event-day information will be provided through the official registration process.
          </p>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-base font-bold leading-7 text-emerald-950">
            The Arborist is helping spread the word about this opportunity so
            members of the Mobile and Gulf Coast tree-care community can put
            their skills to work for a meaningful cause.
          </p>
          <Link
            href="/"
            className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-emerald-900 px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-emerald-950 transition hover:bg-emerald-950 hover:text-white"
          >
            Return to The Arborist
          </Link>
        </div>
      </section>
    </div>
  );
}
