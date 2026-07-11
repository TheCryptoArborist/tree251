import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Landmark, TreePine } from "lucide-react";

export const metadata: Metadata = {
  title: "Historic Trees of Mobile",
  description:
    "Explore Mobile, Alabama's historic trees, living monuments, urban forestry stories, and preservation history with The Arborist."
};

const futureEntries = [
  "Duffie Oak",
  "Treaty Oak",
  "Bienville Square live oaks",
  "Cathedral Square trees",
  "Washington Square trees",
  "Church and cemetery trees"
];

export default function HistoricTreesPage() {
  return (
    <div className="bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-14 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_75%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            The Arborist historical collection
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.98] text-white sm:text-6xl">
            Historic Trees of Mobile
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">
            Mobile&apos;s trees are part of the city&apos;s history. This growing collection documents living monuments, neighborhood landmarks, storm recovery, cultural memory, and the urban-forestry work required to preserve them.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-2xl border border-[#f6c95a]/30 bg-white/[0.06] p-5 shadow-[0_20px_54px_rgba(0,0,0,0.22)] sm:p-7">
              <TreePine className="size-10 text-[#f6c95a]" aria-hidden="true" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Featured entry</p>
              <h2 className="mt-2 text-3xl font-black text-white">L&apos;Arbre de Pau</h2>
              <p className="mt-4 text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">
                The original live oak dedicated in 1981 near Fort Condé as a symbol of friendship between Mobile and Pau, France, and of recovery following Hurricane Frederic.
              </p>
              <Link
                href="/historic-trees/larbre-de-pau"
                data-track-event="Historic Tree Page Click"
                data-track-label="L'Arbre de Pau"
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
              >
                Read the full story
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>

            <aside className="rounded-2xl border border-teal-300/20 bg-[#07131b] p-5 sm:p-7">
              <BookOpen className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black text-white">Research principles</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">
                Each entry distinguishes documented facts, field verification, and historical interpretation. Uncertainty is stated rather than filled with assumptions.
              </p>
              <div className="mt-5 rounded-xl border border-teal-300/20 bg-white/[0.05] p-4">
                <p className="text-sm font-black text-[#f6c95a]">Collection goal</p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/78">
                  Build the most comprehensive public collection of Mobile&apos;s historic trees while connecting local history to arboriculture, urban forestry, risk management, and preservation.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Landmark className="size-9 text-[#f6c95a]" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Future entries</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-emerald-50/80">
            This collection will expand as photographs, inscriptions, archival records, oral histories, and field observations are assembled.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {futureEntries.map((entry) => (
              <div key={entry} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-4 text-sm font-black text-white">
                {entry}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
