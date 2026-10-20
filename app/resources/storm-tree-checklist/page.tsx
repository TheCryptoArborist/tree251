import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CloudLightning,
  ExternalLink,
  Eye,
  ShieldCheck,
  Trees
} from "lucide-react";

const emergencyBoardUrl = "https://mobile-tree-emergency.netlify.app";

export const metadata: Metadata = {
  title: "Storm Tree Checklist for Homeowners",
  description:
    "A practical before-and-after storm tree checklist for Gulf Coast homeowners preparing for hurricanes, tornadoes, severe thunderstorms, high winds, and saturated soils.",
  alternates: {
    canonical: "/resources/storm-tree-checklist"
  },
  openGraph: {
    title: "Storm Tree Checklist for Homeowners | The Arborist",
    description:
      "What homeowners should look for around trees before and after hurricanes, tornadoes, severe thunderstorms, and high winds.",
    url: "/resources/storm-tree-checklist",
    type: "article"
  }
};

const beforeStorm = [
  "Look for dead, broken, or hanging limbs, especially over the house, driveway, vehicles, play areas, walkways, and other places people use.",
  "Look for fresh cracks, splits, cavities, open seams, or weak-looking branch unions in trunks and major limbs.",
  "Notice whether a tree appears to be leaning more than it used to or whether the soil is lifting, cracking, or mounding near the base.",
  "Check for recent root disturbance from trenching, construction, grading, paving, drainage work, erosion, or vehicle traffic.",
  "Pay attention to trees in saturated or poorly drained soil, particularly after prolonged rain before the main storm arrives.",
  "Identify trees or large limbs that could block the driveway, primary entrance, emergency access, or another important route if they fail.",
  "Photograph trees of concern from a safe distance before the storm. Pre-storm photos can help document what changed afterward.",
  "If something already looks unsafe, arrange an arborist assessment early. Do not wait until tropical-storm-force winds or severe weather are arriving."
] as const;

const afterStorm = [
  "Look for newly broken, torn, or hanging limbs. Do not stand or walk beneath suspended branches.",
  "Compare the tree's lean with what you remember or with pre-storm photos. A new or increased lean deserves attention.",
  "Look at the ground around the trunk for lifted soil, fresh cracks, exposed roots, root-plate movement, or partial uprooting.",
  "Look for new trunk cracks, split leaders, separated branch unions, torn bark, or large wounds that were not present before the storm.",
  "Check whether the crown has lost a major portion of its limbs or has become strongly one-sided.",
  "Watch for trees that were struck by another falling tree or large limb, even when they are still standing.",
  "Notice newly exposed roots, soil erosion, washouts, or changes in drainage around the root zone.",
  "Check trees near houses, fences, sheds, vehicles, streets, sidewalks, and other targets for damage that could affect people or property.",
  "Do not assume a standing tree is undamaged. Some storm-related defects are not obvious from the ground."
] as const;

const stopAndStayAway = [
  "A tree or limb is touching, resting on, or close to a power line.",
  "A tree is actively moving, cracking, splitting, or uprooting.",
  "Large limbs are suspended overhead or caught in another tree.",
  "The root plate has lifted or the trunk has developed a significant new crack or split.",
  "Reaching the tree would require climbing, using a ladder, entering floodwater, or working during dangerous weather."
] as const;

function Checklist({
  items
}: {
  items: readonly string[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-2xl border border-emerald-950/10 bg-white p-4 text-sm leading-6 text-stone-700 shadow-sm"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function StormTreeChecklistPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="relative isolate overflow-hidden bg-[#050b12] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_8%,rgba(18,192,168,0.16),transparent_28rem),radial-gradient(circle_at_88%_20%,rgba(246,201,90,0.16),transparent_24rem),linear-gradient(145deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Hurricane · Tornado · Severe Weather
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[0.98] sm:text-6xl">
            Storm Tree Checklist for Homeowners
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/85 sm:text-xl sm:leading-8">
            Use this checklist to notice changes around your trees before and after severe weather. It is an observation guide, not a substitute for a professional tree risk assessment.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/#consultation-request"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Request a Tree Assessment
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={emergencyBoardUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-teal-300/35 bg-white/[0.05] px-6 py-3 text-sm font-black text-white transition hover:border-[#f6c95a]/70 hover:bg-white/10 focus-ring"
            >
              Open Emergency Tree Board
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-8 text-emerald-800" aria-hidden="true" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Before the storm</p>
                  <h2 className="mt-1 text-2xl font-black text-emerald-950 sm:text-3xl">Know what is already there.</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-700 sm:text-base sm:leading-7">
                The best time to identify a concern is before the weather deteriorates. Walk the property from the ground and from a safe distance.
              </p>
              <div className="mt-6">
                <Checklist items={beforeStorm} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <Eye className="size-8 text-emerald-800" aria-hidden="true" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">After the storm</p>
                  <h2 className="mt-1 text-2xl font-black text-emerald-950 sm:text-3xl">Look for what changed.</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-700 sm:text-base sm:leading-7">
                After conditions are safe, compare the property with what you saw before the storm. Fresh movement or damage is often more important than an old defect that has not changed.
              </p>
              <div className="mt-6">
                <Checklist items={afterStorm} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#07131b] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-[#f6c95a]/35 bg-white/[0.06] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)] sm:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 size-8 shrink-0 text-[#f6c95a]" aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Stop and stay away</p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">Some situations are not homeowner inspection situations.</h2>
                <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:text-base sm:leading-7">
                  Do not climb, cut, pull, or attempt to free storm-damaged trees or limbs when any of the following is present.
                </p>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {stopAndStayAway.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-teal-300/20 bg-[#050b12]/60 p-4 text-sm leading-6 text-emerald-50/85">
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-emerald-50/75">
              If a tree or limb involves electrical lines, keep people away and contact the utility or emergency services as appropriate. Do not approach or attempt to move the tree yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-[0_18px_44px_rgba(6,17,13,0.08)]">
            <Trees className="size-8 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-emerald-950">Not sure what you are seeing?</h2>
            <p className="mt-3 text-sm leading-6 text-stone-700">
              If a tree changed after the storm, has a new defect, or is positioned where failure could affect people or property, request an assessment rather than guessing from the ground.
            </p>
            <Link
              href="/#consultation-request"
              className="mt-5 inline-flex items-center gap-2 font-black text-emerald-800 hover:text-emerald-950 focus-ring"
            >
              Request a post-storm tree assessment
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-3xl border border-emerald-950/10 bg-[#eef3e6] p-6 shadow-[0_18px_44px_rgba(6,17,13,0.06)]">
            <CloudLightning className="size-8 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-emerald-950">Need current storm information?</h2>
            <p className="mt-3 text-sm leading-6 text-stone-700">
              The Emergency Tree Board remains the live resource for weather context, outage information, emergency links, and storm-related public safety resources.
            </p>
            <a
              href={emergencyBoardUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-black text-emerald-800 hover:text-emerald-950 focus-ring"
            >
              Visit the Emergency Tree Board
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
