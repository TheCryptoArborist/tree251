import Link from "next/link";
import { ArrowRight, ClipboardCheck, Home, SearchCheck } from "lucide-react";
import { consultationAnchor } from "@/components/ConsultBranding";

const audiences = [
  { label: "Buying", detail: "Identify risk, maintenance priorities, and likely costs before closing.", Icon: Home },
  { label: "Selling", detail: "Address concerns early and present mature trees as managed assets.", Icon: ClipboardCheck },
  { label: "Representing a client", detail: "Bring independent tree guidance into due diligence and negotiations.", Icon: SearchCheck }
] as const;

export function RealEstateHomeSection() {
  return (
    <section id="real-estate" className="relative isolate overflow-hidden bg-[#07131b] py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(246,201,90,0.14),transparent_24rem),radial-gradient(circle_at_86%_72%,rgba(18,192,168,0.13),transparent_24rem),linear-gradient(135deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
      <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-30" />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Real estate tree due diligence
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
            Buying or selling property? Do not overlook the trees.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">
            A home inspection evaluates the house. Tree due diligence evaluates the trees. Choose the path that fits your role and understand risk, maintenance, preservation opportunities, and future costs before closing.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/real-estate"
              data-track-event="Real Estate Page Click"
              data-track-location="homepage_real_estate_section"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Explore real estate services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={consultationAnchor}
              data-track-event="Request Assessment Click"
              data-track-location="homepage_real_estate_section"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-teal-300/30 bg-[#050b12]/70 px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring"
            >
              Request an assessment
            </a>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {audiences.map(({ label, detail, Icon }) => (
            <Link href={`/real-estate#${label === "Buying" ? "buyers" : label === "Selling" ? "sellers" : "professionals"}`} key={label} className="group rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-[#f6c95a]/55 hover:bg-white/[0.09] focus-ring sm:p-5">
              <Icon className="size-7 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-3 text-base font-black text-white">I’m {label.toLowerCase()}</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50/75">{detail}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.08em] text-[#f6c95a]">Choose this path <ArrowRight className="size-3.5 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
