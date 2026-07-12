import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Flag,
  Landmark,
  MapPin,
  ShieldCheck,
  TreePine,
  Wind
} from "lucide-react";
import { consultationAnchor } from "@/components/ConsultBranding";

export const metadata: Metadata = {
  title: "L'Arbre de Pau | Historic Tree in Mobile, Alabama",
  description:
    "Learn the history of L'Arbre de Pau, the original live oak dedicated in Mobile in 1981 by its sister city of Pau, France, after Hurricane Frederic.",
  keywords: [
    "L'Arbre de Pau",
    "Tree from France Mobile Alabama",
    "Hurricane Frederic memorial tree",
    "Mobile Alabama historic trees",
    "Mobile Alabama landmarks",
    "Fort Conde tree",
    "Pau France Mobile sister city",
    "Historic trees Mobile AL"
  ],
  alternates: {
    canonical: "/historic-trees/larbre-de-pau"
  }
};

const timeline = [
  ["1974", "Mobile and Pau establish their sister-city relationship."],
  ["1979", "Hurricane Frederic strikes the Alabama Gulf Coast and causes severe damage across Mobile, including extensive tree loss."],
  ["April 26, 1981", "L'Arbre de Pau is dedicated in Mobile as a living symbol of friendship and recovery."],
  ["Present day", "The original live oak remains at the monument near Fort CondÃ© and continues to serve as a living memorial."]
] as const;

const facts = [
  "The name L'Arbre de Pau translates from French as â€œThe Tree of Pau.â€",
  "Mobile was founded as part of French colonial Louisiana, making a gift from Pau especially meaningful within the city's French heritage.",
  "Fort CondÃ© recalls the French fortification that protected colonial Mobile; the present reconstructed fort opened during the United States Bicentennial era.",
  "Hurricane Frederic made landfall in September 1979 and was one of the defining natural disasters in modern Mobile history.",
  "Living memorials require continuing care. Unlike stone monuments, trees change, age, recover from storms, and depend on stewardship."
] as const;

const faqs = [
  {
    question: "What does L'Arbre de Pau mean?",
    answer: "It means â€œThe Tree of Pauâ€ in French, referring to Pau, France, Mobile's sister city."
  },
  {
    question: "Where is L'Arbre de Pau?",
    answer: "The monument and live oak are in downtown Mobile near Fort CondÃ©, within the city's historic core."
  },
  {
    question: "Why was the tree planted?",
    answer: "It was dedicated in 1981 as a gift associated with Mobile's sister-city relationship with Pau and as a symbol of renewal following Hurricane Frederic."
  },
  {
    question: "What species is the tree?",
    answer: "The tree is a live oak."
  },
  {
    question: "Is the original tree still alive?",
    answer: "Yes. The live oak standing at the monument is the original tree dedicated in 1981."
  },
  {
    question: "Why is it historically important?",
    answer: "It connects Mobile's French heritage, international friendship, hurricane recovery, and the long-term value of urban-forest preservation in one living landmark."
  }
] as const;

const sources = [
  {
    label: "National Hurricane Center â€” Hurricane Frederic historical records",
    href: "https://www.nhc.noaa.gov/data/tcr/"
  },
  {
    label: "History Museum of Mobile â€” Fort CondÃ© and colonial Mobile",
    href: "https://www.historymuseumofmobile.com/"
  },
  {
    label: "The Arborist â€” field verification and modern documentation of the original live oak",
    href: "https://tree251.xyz"
  }
] as const;

export default function LArbreDePauPage() {
  return (
    <div className="bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-14 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_75%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_52%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/historic-trees" className="inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Historic Trees of Mobile
          </Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Living monument â€¢ Downtown Mobile
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            L&apos;Arbre de Pau
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">
            The original live oak dedicated on April 26, 1981, stands near Fort CondÃ© as a living symbol of friendship between Mobile and Pau, France, and of Mobile&apos;s recovery after Hurricane Frederic.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-[#f6c95a]/35 bg-white/[0.05] p-6 text-center">
              <div>
                <Landmark className="mx-auto size-10 text-[#f6c95a]" aria-hidden="true" />
                <p className="mt-4 font-black text-white">Historic photograph placeholder</p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/70">Reserved for a verified dedication-era or archival image.</p>
              </div>
            </div>
            <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-teal-300/30 bg-white/[0.05] p-6 text-center">
              <div>
                <TreePine className="mx-auto size-10 text-[#f6c95a]" aria-hidden="true" />
                <p className="mt-4 font-black text-white">Modern photograph placeholder</p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/70">Reserved for a current full-tree and monument photograph.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">Watch the story</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">See L&apos;Arbre de Pau today</h2>
            <p className="mt-4 text-base leading-7 text-emerald-50/80">
              Visit the original live oak and learn why this 1981 dedication still matters to Mobile&apos;s history, urban forest, and relationship with Pau, France.
            </p>
            <a
              href="https://youtube.com/shorts/irNLfoqCxEY"
              target="_blank"
              rel="noreferrer"
              data-track-event="Historic Tree Video Click"
              data-track-label="L'Arbre de Pau"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-teal-300/30 bg-[#07131b] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:border-[#f6c95a]/70 hover:bg-[#0b1f17] focus-ring"
            >
              Watch on YouTube
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-teal-300/20 bg-black shadow-[0_24px_64px_rgba(0,0,0,0.32)]">
            <div className="aspect-[9/16]">
              <iframe
                src="https://www.youtube-nocookie.com/embed/irNLfoqCxEY"
                title="L'Arbre de Pau historic live oak in Mobile, Alabama"
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 sm:p-7">
            <Flag className="size-9 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black text-white">About the monument</h2>
            <p className="mt-4 text-base leading-7 text-emerald-50/80">
              L&apos;Arbre de Pau translates as <strong className="text-white">â€œThe Tree of Pau.â€</strong> The dedication linked a living tree to international friendship and to Mobile&apos;s recovery after a catastrophic hurricane. The choice of a tree made the memorial dynamic: it would grow with the city rather than simply mark a moment in stone.
            </p>
            <div className="mt-6 rounded-2xl border border-[#f6c95a]/25 bg-[#050b12]/72 p-5">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#f6c95a]">Monument inscription</p>
              <p className="mt-3 text-sm leading-6 text-emerald-50/80">
                The exact full inscription will be added from a verified close-up photograph of the monument. This page does not reproduce wording from memory because preserving the historical record requires an exact transcription.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 sm:p-7">
            <MapPin className="size-9 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black text-white">The tree today</h2>
            <p className="mt-4 text-base leading-7 text-emerald-50/80">
              The original 1981 live oak remains at the monument near Fort CondÃ© in downtown Mobile. Its setting connects the dedication to the city&apos;s French colonial history and to a public landscape visited by residents, students, historians, and travelers.
            </p>
            <p className="mt-4 text-sm leading-6 text-emerald-50/72">
              Field verification by The Arborist identifies the tree as a live oak and confirms that the original planting remains present.
            </p>
          </article>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 sm:p-7">
              <Wind className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-black text-white">Hurricane Frederic and Mobile&apos;s urban forest</h2>
              <p className="mt-4 text-base leading-7 text-emerald-50/80">
                Hurricane Frederic struck the Alabama Gulf Coast in September 1979. Mobile experienced widespread structural damage, long power outages, and extensive tree loss. The damage was not limited to individual properties: it changed streetscapes, neighborhoods, shade patterns, and the character of the city&apos;s urban forest.
              </p>
              <p className="mt-4 text-base leading-7 text-emerald-50/80">
                Replanting after a major storm is more than replacement. It is the beginning of a decades-long recovery process that depends on species selection, planting quality, maintenance, structural pruning, and protection from future construction and storms.
              </p>
            </article>

            <article className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 sm:p-7">
              <Flag className="size-9 text-[#f6c95a]" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-black text-white">Mobile and Pau, France</h2>
              <p className="mt-4 text-base leading-7 text-emerald-50/80">
                Mobile and Pau formed a sister-city relationship in 1974. Such partnerships are intended to encourage cultural exchange, civic friendship, and mutual understanding. Presenting a tree after Hurricane Frederic gave that relationship a permanent, visible expression in Mobile&apos;s landscape.
              </p>
              <p className="mt-4 text-base leading-7 text-emerald-50/80">
                The gift also resonates with Mobile&apos;s French heritage. Mobile began as a French colonial settlement, and Fort CondÃ© is one of the city&apos;s most recognizable reminders of that history.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ShieldCheck className="size-9 text-[#f6c95a]" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">An urban-forestry perspective</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Trees as living monuments", "A memorial tree records history through continued growth, seasonal change, storm response, and community memory."],
              ["Long-term stewardship", "A dedication is only the beginning. Soil care, pruning, inspection, protection, and succession planning determine whether the memorial endures."],
              ["Historic-tree preservation", "Preservation balances cultural significance with tree condition, site use, risk, construction pressure, and realistic maintenance."],
              ["Why arborists matter", "Arborists help communities identify defects, prescribe appropriate work, protect roots, document condition, and make decisions that preserve both safety and history."]
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5">
                <h3 className="text-lg font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-emerald-50/78">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CalendarDays className="size-9 text-[#f6c95a]" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Timeline</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map(([date, event]) => (
              <article key={date} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5">
                <p className="text-xl font-black text-[#f6c95a]">{date}</p>
                <p className="mt-3 text-sm leading-6 text-emerald-50/80">{event}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Fun facts</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact} className="rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 text-sm leading-6 text-emerald-50/80">
                {fact}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-7 grid gap-3 lg:grid-cols-2">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 open:border-[#f6c95a]/45 open:bg-white/[0.08]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-white [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 border-t border-teal-300/15 pt-4 text-sm leading-6 text-emerald-50/78">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-white sm:text-4xl">Sources and research notes</h2>
            <p className="mt-4 text-sm leading-6 text-emerald-50/78">
              This page separates archival facts, field verification, and interpretation. The original tree and live-oak identification are field-verified by The Arborist. Historical claims should continue to be strengthened as dedication photographs, municipal records, and archival newspaper coverage become available.
            </p>
            <ul className="mt-6 space-y-3">
              {sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 text-sm font-bold text-[#f6c95a] hover:text-[#ffdc70] focus-ring">
                    <ExternalLink className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border border-[#f6c95a]/25 bg-[#050b12]/75 p-5 sm:p-7">
            <TreePine className="size-9 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-black text-white">Help preserve Mobile&apos;s living history</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/78">
              Historic trees need informed inspection, appropriate pruning, root protection, construction planning, and long-term stewardship. Their value is cultural as well as biological.
            </p>
            <a
              href={consultationAnchor}
              data-track-event="Request Assessment Click"
              data-track-location="historic_tree_page"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#f6c95a] px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#06110d] transition hover:bg-[#ffdc70] focus-ring"
            >
              Ask The Arborist
            </a>
            <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.14em] text-emerald-50/65">
              Tree risk. Tree care. Tree preservation.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

