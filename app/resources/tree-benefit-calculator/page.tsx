import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Info, TreePine } from "lucide-react";
import Link from "next/link";

const calculatorUrl =
  "https://www.davey.com/residential-tree-services/tree-benefit-calculator/";

export const metadata: Metadata = {
  title: "Tree Benefit Calculator",
  description:
    "Explore a third-party calculator that estimates selected environmental and economic benefits associated with an individual tree.",
  alternates: {
    canonical: "/resources/tree-benefit-calculator"
  },
  openGraph: {
    title: "Tree Benefit Calculator | The Arborist",
    description:
      "Estimate selected environmental and economic benefits associated with an individual tree using the Davey Tree Benefit Calculator.",
    url: "/resources/tree-benefit-calculator",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Tree Benefit Calculator | The Arborist",
    description:
      "Estimate selected environmental and economic benefits associated with an individual tree using the Davey Tree Benefit Calculator."
  }
};

export default function TreeBenefitCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <section className="border-b border-teal-300/20 bg-[radial-gradient(circle_at_15%_20%,rgba(246,201,90,0.14),transparent_24rem),linear-gradient(135deg,#050b12_0%,#07131b_58%,#0b1f17_100%)] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f6c95a]/40 bg-[#f6c95a]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">
            <TreePine className="size-4" aria-hidden="true" />
            Educational resource
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            Tree Benefit Calculator
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/82 sm:text-xl sm:leading-8">
            Explore estimated environmental and economic benefits associated with an individual tree using a third-party calculator provided by The Davey Tree Expert Company.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-teal-300/20 bg-white/[0.04] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-10">
            <div className="flex items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[#f6c95a]/35 bg-[#f6c95a]/10 text-[#f6c95a]">
                <ExternalLink className="size-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-black sm:text-3xl">
                  Open the calculator on Davey.com
                </h2>
                <p className="mt-3 leading-7 text-emerald-50/78">
                  Davey does not allow this calculator to display reliably inside another website. The button below opens the official calculator in a new browser tab so every feature can work as intended.
                </p>
              </div>
            </div>

            <a
              href={calculatorUrl}
              target="_blank"
              rel="noreferrer"
              data-track-event="External Resource Click"
              data-track-label="Davey Tree Benefit Calculator"
              data-track-location="tree_benefit_calculator_main"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring sm:w-auto"
            >
              Launch Tree Benefit Calculator
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-teal-300/20 bg-[#07131b] p-4 text-sm leading-6 text-emerald-50/80">
              <Info className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
              <p>
                This is an independent third-party resource. The Arborist is not affiliated with The Davey Tree Expert Company and does not control the calculator, its availability, or its results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-teal-300/15 bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black sm:text-3xl">Important limitations</h2>
          <p className="mt-4 leading-7 text-emerald-50/78">
            Calculator results are generalized estimates. They are not a tree appraisal, tree risk assessment, property valuation, legal opinion, insurance determination, or guarantee of future benefits. Site conditions, tree condition, species, size, maintenance history, targets, climate, and local context all affect the value and performance of a tree.
          </p>
          <p className="mt-4 leading-7 text-emerald-50/78">
            For decisions involving risk, preservation, construction, real estate, or maintenance planning, request an on-site evaluation from a qualified arborist.
          </p>
          <Link
            href="/#consultation"
            data-track-event="Request Assessment Click"
            data-track-location="tree_benefit_calculator_limitations"
            className="mt-7 inline-flex items-center gap-2 font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring"
          >
            Request an arborist assessment
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
