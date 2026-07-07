import { ExternalLink, Star } from "lucide-react";
import { googleBusinessProfileUrl, googleReviewUrl } from "@/components/ConsultBranding";

export function GoogleReviewsSection() {
  return (
    <section id="google-reviews" className="relative isolate overflow-hidden bg-[#050b12] py-14 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_15%_85%,rgba(18,192,168,0.12),transparent_22rem)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f6c95a]">
            Google Reviews
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
            See what property owners are saying.
          </h2>
          <p className="mt-4 text-base leading-7 text-emerald-50/80">
            Google does not provide a simple official all-reviews embed, so this section links visitors
            directly to the public Google Business Profile and review page.
          </p>
        </div>
        <div className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-6 shadow-[0_22px_54px_rgba(0,0,0,0.22)] backdrop-blur">
          <div className="flex items-center gap-2 text-[#f6c95a]" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="size-5 fill-current" />
            ))}
          </div>
          <p className="mt-4 text-lg font-black text-white">The Arborist on Google</p>
          <p className="mt-3 text-sm leading-6 text-emerald-50/78">
            Read current Google reviews or leave a review after working with Peter.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={googleBusinessProfileUrl}
              target="_blank"
              rel="noreferrer"
              data-track-event="Read Google Reviews Click"
              data-track-location="google_reviews_section"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-teal-300/35 bg-[#07131b] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring"
            >
              Read Reviews on Google
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              data-track-event="Leave Google Review Click"
              data-track-location="google_reviews_section"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Leave a Google Review
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
