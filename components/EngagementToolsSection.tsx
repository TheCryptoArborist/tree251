"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  ImageUp,
  MessageSquareText,
  ShieldAlert,
  TreePine
} from "lucide-react";
import { consultationAnchor, phoneConsultationAnchor } from "@/components/ConsultBranding";

type Recommendation = {
  title: string;
  text: string;
  action: string;
};

type ConcernOption = {
  id: string;
  label: string;
  helper: string;
  recommendation: Recommendation;
};

const concernOptions: ConcernOption[] = [
  {
    id: "storm",
    label: "Storm damage or hanging limbs",
    helper: "Wind, broken limbs, canopy change, or recent storm impact.",
    recommendation: {
      title: "Tree Risk / Storm Damage Assessment",
      text: "Start with an independent assessment to separate visible damage from actual risk and prioritize what needs attention first.",
      action: "Request a storm assessment"
    }
  },
  {
    id: "defect",
    label: "Cracks, cavities, decay, or new lean",
    helper: "Something about the tree looks structurally concerning.",
    recommendation: {
      title: "Tree Risk Assessment",
      text: "A risk-focused review can help evaluate defects, targets, likelihood of failure, consequences, and reasonable next steps.",
      action: "Request a risk assessment"
    }
  },
  {
    id: "quote",
    label: "I was told a tree needs removal",
    helper: "You want an independent second opinion before approving work.",
    recommendation: {
      title: "Second Opinion Before Tree Work",
      text: "Independent guidance can help confirm whether removal is justified, whether pruning or monitoring is reasonable, and how urgent the work appears.",
      action: "Request a second opinion"
    }
  },
  {
    id: "review",
    label: "Permit, Tree Commission, or DIY work question",
    helper: "You need help understanding whether proposed tree work should be reviewed, documented, or handled by qualified help.",
    recommendation: {
      title: "Permit / Tree Commission Guidance",
      text: "Peter does not issue permits or speak on behalf of any municipality. He provides independent arborist guidance to help property owners understand tree-related questions, documentation needs, work feasibility, and when municipal review or qualified contractor involvement may be needed.",
      action: "Request permit guidance"
    }
  },
  {
    id: "inventory",
    label: "I manage multiple trees",
    helper: "HOA, business, municipality, country club, campus, or large property.",
    recommendation: {
      title: "Tree Inventory or Tree Survey",
      text: "An inventory or survey can help identify high-risk trees, low-risk trees, pruning needs, removals, monitoring needs, and maintenance priorities.",
      action: "Ask about an inventory"
    }
  },
  {
    id: "construction",
    label: "Construction or site work is planned",
    helper: "Building, grading, driveway, pool, trenching, clearing, or site access.",
    recommendation: {
      title: "Construction Planning / Tree Preservation",
      text: "Early arborist input helps identify preservation conflicts, root-zone concerns, tree-protection needs, and likely impacts before work begins.",
      action: "Request planning guidance"
    }
  },
  {
    id: "utility",
    label: "Utility, plumbing, or trenching near roots",
    helper: "Sewer lateral, drainage, irrigation, boring, trenching, or underground utility work near a mature tree.",
    recommendation: {
      title: "Utility and Excavation Root Protection",
      text: "ANSI A300-informed arborist guidance can help property owners and contractors evaluate root-zone conflicts, preservation options, and routing concerns before excavation begins.",
      action: "Request root protection guidance"
    }
  },
  {
    id: "not-sure",
    label: "I am not sure what I need",
    helper: "You need help choosing the right consultation path.",
    recommendation: {
      title: "General Arborist Consultation",
      text: "Start with a consultation. Peter can help determine whether you need a risk assessment, inventory, survey, preservation review, root-protection guidance, permit guidance, or second opinion.",
      action: "Start with a consultation"
    }
  }
];

const photoGuide = [
  "Whole tree from a distance, including the surrounding area.",
  "Base of the trunk and root flare where the tree meets the ground.",
  "Close-up of the specific concern, such as cracks, cavities, decay, broken limbs, soil movement, exposed roots, or excavation conflict.",
  "Canopy and major limbs from more than one angle when possible.",
  "Targets nearby: house, driveway, road, sidewalk, play area, vehicles, utilities, or structures."
];

const questionPrompts = [
  "Is this tree a risk or just something to monitor?",
  "Should I get a second opinion before approving removal?",
  "Do I need permit or Tree Commission guidance?",
  "Is this work appropriate for me to do myself?",
  "Do I need a tree inventory or survey for this property?",
  "Could construction or trenching damage this tree?",
  "Can a utility line be routed around important roots?",
  "What photos should I send before a consultation?"
];

function getRecommendation(selectedIds: string[]): Recommendation {
  const priority = ["review", "utility", "construction", "inventory", "storm", "defect", "quote", "not-sure"];
  const match = priority.find((id) => selectedIds.includes(id));
  return (
    concernOptions.find((option) => option.id === match)?.recommendation ??
    {
      title: "Choose a concern to get pointed in the right direction.",
      text: "This tool does not diagnose a tree online. It simply helps you choose the right consultation path before requesting help.",
      action: "Request guidance"
    }
  );
}

export function EngagementToolsSection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const recommendation = useMemo(() => getRecommendation(selectedIds), [selectedIds]);

  const toggleConcern = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <section id="start-here" className="relative isolate overflow-hidden bg-[#050b12] py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(246,201,90,0.13),transparent_22rem),radial-gradient(circle_at_88%_72%,rgba(18,192,168,0.13),transparent_24rem)]" />
      <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Start here
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
            Not sure what kind of tree help you need?
          </h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:mt-4 sm:text-base sm:leading-7">
            Tap the concerns that apply. This does not replace an arborist assessment, but it can point you toward the right consultation path.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_22px_54px_rgba(0,0,0,0.2)] backdrop-blur sm:p-5">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-8 text-[#f6c95a]" aria-hidden="true" />
              <h3 className="text-xl font-black text-white">Tree Concern Self-Check</h3>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {concernOptions.map((option) => {
                const active = selectedIds.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleConcern(option.id)}
                    className={`rounded-2xl border p-3 text-left transition focus-ring ${
                      active
                        ? "border-[#f6c95a]/70 bg-[#f6c95a] text-[#06110d]"
                        : "border-teal-300/20 bg-[#07131b] text-emerald-50 hover:border-[#f6c95a]/45 hover:bg-white/[0.06]"
                    }`}
                    aria-pressed={active}
                  >
                    <span className="flex items-start gap-2">
                      <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${active ? "text-[#06110d]" : "text-[#f6c95a]"}`} aria-hidden="true" />
                      <span>
                        <span className="block text-sm font-black leading-5">{option.label}</span>
                        <span className={`mt-1 block text-xs leading-5 ${active ? "text-[#06110d]/78" : "text-emerald-50/65"}`}>
                          {option.helper}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-[#f6c95a]/25 bg-[#050b12]/80 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">
                Suggested path
              </p>
              <h4 className="mt-2 text-xl font-black text-white">{recommendation.title}</h4>
              <p className="mt-2 text-sm leading-6 text-emerald-50/78">{recommendation.text}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={consultationAnchor}
                  data-track-event="Request Assessment Click"
                  data-track-location="self_check_recommendation"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
                >
                  {recommendation.action}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={phoneConsultationAnchor}
                  data-track-event="Schedule Phone Click"
                  data-track-location="self_check_recommendation"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-teal-300/30 bg-[#07131b] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring"
                >
                  Schedule a quick call
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <details className="group rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-[#f6c95a]/45 open:border-[#f6c95a]/45 sm:p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <Camera className="size-8 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                  <span>
                    <span className="block text-xl font-black text-white">What photos should I send?</span>
                    <span className="mt-1 block text-sm leading-6 text-emerald-50/70">Better photos help make the first conversation more useful.</span>
                  </span>
                </span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-5 space-y-3 border-t border-teal-300/15 pt-4">
                {photoGuide.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-emerald-50/80">
                    <ImageUp className="mt-0.5 size-5 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={consultationAnchor}
                data-track-event="Submit Photos Click"
                data-track-location="photo_guide"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f6c95a] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring sm:w-auto"
              >
                Submit photos with request
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </details>

            <div className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur sm:p-5">
              <div className="flex items-center gap-3">
                <MessageSquareText className="size-8 text-[#f6c95a]" aria-hidden="true" />
                <h3 className="text-xl font-black text-white">Ask The Arborist</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">
                Have a tree question that could turn into a helpful post, reel, or consultation? Use the request form and include photos or site context when possible.
              </p>
              <div className="mt-4 rounded-2xl border border-teal-300/15 bg-[#050b12]/70 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Good questions include</p>
                <ul className="mt-3 space-y-2">
                  {questionPrompts.map((prompt) => (
                    <li key={prompt} className="flex gap-2 text-sm leading-6 text-emerald-50/78">
                      <HelpCircle className="mt-0.5 size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={consultationAnchor}
                data-track-event="Ask Arborist Click"
                data-track-location="ask_arborist_panel"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-teal-300/30 bg-[#07131b] px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring sm:w-auto"
              >
                Ask through the request form
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
