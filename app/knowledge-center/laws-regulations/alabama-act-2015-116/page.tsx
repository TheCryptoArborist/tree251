import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, Info, Landmark, Scale } from "lucide-react";

const officialActUrl = "https://alison.legislature.state.al.us/files/pdf/SearchableInstruments/2015RS/Acts/2015-116.pdf";
const officialCodeUrl = "https://alison.legislature.state.al.us/code-of-alabama?section=11-72-1";
const cityCleanCopyUrl = "https://www.cityofmobile.gov/uploads/220325095218Act2015-1161.pdf";

export const metadata: Metadata = {
  title: "Alabama Act 2015-116 - Clean Text",
  description:
    "A clean, readable listing of Alabama Act 2015-116 concerning the Tree Commission in a Class 2 municipality, with struck-through prior language omitted.",
  alternates: { canonical: "/knowledge-center/laws-regulations/alabama-act-2015-116" }
};

const amendedSections = [
  {
    number: "Section 1",
    code: "Ala. Code § 11-72-1",
    title: "Legislative findings",
    paragraphs: [
      "It is hereby declared that the trees on private property and in publicly owned areas within a Class 2 municipality, including particularly those in street rights-of-way, are both an economic and an aesthetic asset to the Class 2 municipality and the State of Alabama; that the existing trees so located are in need of protection and of active measures to support their health and growth, that it is desirable that additional trees be planted, and that those ends require a separate entity specifically charged with the responsibility and duty of fostering the planting, growth and protection of trees on private property and publicly owned areas."
    ]
  },
  {
    number: "Section 2",
    code: "Ala. Code § 11-72-2",
    title: "Tree Commission creation and composition",
    paragraphs: [
      "There is hereby created the (insert city name) Tree Commission within the Class 2 municipality, to consist of the same number of members as the number of members of the city council, each member to be appointed by the city council of the Class 2 municipality.",
      "The city council of the Class 2 municipality shall make the appointments to the commission within a reasonable time after the effective date of the act adding this language. Each member of the commission shall serve at the pleasure of the city council. Members serving on the commission on the effective date of this amendatory act shall be eligible for appointment by the city council of the Class 2 municipality. Commissioners shall serve until a successor takes office, and any vacancies shall be filled by appointment."
    ]
  },
  {
    number: "Section 3",
    code: "Ala. Code § 11-72-3",
    title: "Compensation and officers",
    paragraphs: [
      "Members of the commission shall serve without salary or remuneration. They shall annually elect from among their number a chair, a vice chair, a secretary, and a treasurer."
    ]
  },
  {
    number: "Section 4",
    code: "Ala. Code § 11-72-4",
    title: "Funding",
    paragraphs: [
      "The commission is authorized to accept contributions and to expend the same for the purposes of carrying out its duties and obligation imposed by this act."
    ]
  },
  {
    number: "Section 5",
    code: "Ala. Code § 11-72-5",
    title: "Ownership and maintenance of public trees",
    paragraphs: [
      "The Class 2 municipality and other governmental subdivisions and agencies of the state, shall continue to be the owners of and, subject to the provisions hereof, continue to be responsible for the maintenance of and care for all trees on publicly owned property, and the Tree Commission shall have no duties other than those specifically provided in the act."
    ]
  },
  {
    number: "Section 6",
    code: "Ala. Code § 11-72-6",
    title: "Departmental cooperation",
    paragraphs: [
      "The Tree Commission shall cooperate with and coordinate its activities with the Public Works Department, the Department of Parks and Recreation and other departments of the Class 2 municipality; all departments of the Class 2 municipality shall cooperate with the Tree Commission."
    ]
  },
  {
    number: "Section 7",
    code: "Ala. Code § 11-72-7",
    title: "Duties of the commission",
    paragraphs: [
      "(a) Educate the public as to the economic and aesthetic benefits of trees to the Class 2 municipality and its citizens, both on publicly owned property and privately owned property;",
      "(b) Promote the planting, health and growth of trees in the Class 2 municipality, with the particular objective of establishing and protecting avenues of live oak trees and other trees deemed suitable by the commission;",
      "(c) Promote the care, feeding, fertilization and other measures desirable for the health and growth of existing trees in street rights-of-way in the Class 2 municipality; and",
      "(d) Protect trees located in street rights-of-way in the Class 2 municipality from damage, removal, lack of sustenance or any other act or condition which might threaten the health and growth of such trees."
    ]
  },
  {
    number: "Section 8",
    code: "Ala. Code § 11-72-8",
    title: "Powers and public records",
    paragraphs: [
      "The commission may adopt by-laws and rules and regulations pursuant to this act, shall meet at least once each month and specially as it deems necessary and as provided in the by-laws, may provide printed forms to be used as shall be necessary to govern its proceedings and to effectuate the provisions of this act, may cause studies to be made as it deems necessary, may perform its functions directly through its own agents or employees, or may contract with others for specific or general services to carry out its purposes hereunder.",
      "It shall keep a record of its proceedings and a register of all applications made to it and its action thereon, all of which shall be public records."
    ]
  },
  {
    number: "Section 9",
    code: "Ala. Code § 11-72-9",
    title: "Applications, permission, and emergency exceptions",
    paragraphs: [
      "(a) Except as provided in subsection (b), no person shall cut, remove, trim, or in any way damage any tree in any street right-of-way in the Class 2 municipality or create any condition injurious to any tree without having first made a written application so to do to the commission and having obtained advance written permission from the commission.",
      "Any governmental body or utility may, by filing an application accompanied by a certificate as hereinafter provided, obtain a continuing permission to trim, cut, or remove at any time any trees in any area described in its application for such permission. The form of application shall be as established by the commission, and the commission may delegate to one or more of its members or officers the power to grant such permission in accordance with standards set by it.",
      "The commission may in its discretion hold public hearings on any application and may approve part of an application or may approve an application upon terms and conditions as the commission may establish. In considering any application before it, the commission shall base its decision on whether the public and private benefit that will result from granting the application outweighs the public and private benefit that will result from denying it.",
      "In the event the Mayor of the Class 2 municipality or public utility shall certify to the commissioners that it desires to trim, cut or remove trees and that it is or may become reasonably necessary to do so to prevent a public hazard or to provide efficient or economical service to the public, then such certificate shall be conclusive evidence for the approval of the application, and the commission shall approve the same, and there shall be no appeal from such approval except as provided in Section 10.",
      "(b) During a declared emergency or to eliminate an imminent danger to life, health, property, or the environment, or as required for the repair or restoration of service, a utility or utility contractor may cut, remove, or trim trees in any street right-of-way in a Class 2 municipality without having obtained advance permission from the commission."
    ]
  },
  {
    number: "Section 10",
    code: "Ala. Code § 11-72-10",
    title: "Appeals",
    paragraphs: [
      "Any person aggrieved by any decision of any officer or agent of the commission to whom its duties are delegated, or of any decision of the commission may appeal to the city council of the Class 2 municipality under any such rules and regulation as the city council may adopt.",
      "Any person aggrieved by any decision of the city council may, within 15 days thereafter, appeal to the circuit court of the county in which the Class 2 municipality is located, by filing with the city council a written notice of appeal and making and filing with the clerk of the court a bond approved by the clerk conditioned to pay the costs of the appeal. The hearing and trial in the circuit court shall be de novo.",
      "No appeal shall authorize any person to take any action pending appeal, application for which has been denied by the Tree Commission or city council."
    ]
  },
  {
    number: "Section 11",
    code: "Ala. Code § 11-72-11",
    title: "Violations",
    paragraphs: [
      "Any person who violates the provisions of this act shall be guilty of a Class C misdemeanor."
    ]
  }
] as const;

const finalProvisions = [
  ["Section 3", "All laws or parts of laws which conflict with this act are repealed."],
  ["Section 4", "The provisions of this act are severable. If any part of this act is declared invalid or unconstitutional, that declaration shall not affect the part which remains."],
  ["Section 5", "This act shall become effective immediately following its passage and approval by the Governor, or its otherwise becoming law."]
] as const;

export default function AlabamaAct2015116Page() {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <section className="relative isolate overflow-hidden border-b border-teal-300/20 py-12 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_18%,rgba(246,201,90,0.16),transparent_24rem),radial-gradient(circle_at_84%_72%,rgba(18,192,168,0.14),transparent_26rem),linear-gradient(135deg,#050b12_0%,#07131b_54%,#0b1f17_100%)]" />
        <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 opacity-30" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/knowledge-center" className="inline-flex items-center gap-2 text-sm font-black text-[#f6c95a] hover:text-[#ffdc70] focus-ring">
            <ArrowLeft className="size-4" aria-hidden="true" /> Gulf Coast Tree Knowledge Center
          </Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a]">Alabama state law - Clean enacted text</p>
          <h1 className="mt-4 text-4xl font-black leading-[1.02] sm:text-6xl">Alabama Act 2015-116</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-50/84 sm:text-xl sm:leading-8">
            Tree Commission in a Class 2 municipality. This readable listing retains the enacted language and omits language shown as struck through in the enrolled act.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.12em] text-emerald-50/65">
            <span className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2">HB207</span>
            <span className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2">Approved May 5, 2015</span>
            <span className="rounded-full border border-teal-300/25 bg-white/[0.05] px-4 py-2">Class 2 municipality</span>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#f6c95a]/35 bg-[#f6c95a]/10 p-5 sm:p-6">
            <Info className="size-7 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-black">Reading and legal-use note</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/82">
              Deleted, struck-through wording from the enrolled amendment is intentionally excluded. Underlined replacement language is retained. This transcription is educational and is not legal advice. The Arborist does not issue permits or citations and does not speak on behalf of the State of Alabama, the City of Mobile, or any municipality. Verify current law through official sources.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Landmark className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Act Section 1</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Applicability</h2>
            </div>
          </div>
          <p className="mt-6 rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 text-base leading-7 text-emerald-50/86">
            This act shall apply only in a Class 2 municipality.
          </p>
        </div>
      </section>

      <section className="border-y border-teal-300/15 bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BookOpen className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">Act Section 2</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Act 929, as amended</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-emerald-50/70">
            Open any section below to read the cleaned text. Alabama later codified these provisions at Title 11, Chapter 72.
          </p>
          <div className="mt-7 space-y-3">
            {amendedSections.map((section, index) => (
              <details key={section.number} className="group rounded-2xl border border-teal-300/20 bg-white/[0.05] open:border-[#f6c95a]/45 open:bg-white/[0.08]" open={index === 0}>
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-ring">
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.14em] text-[#f6c95a]">{section.number} · {section.code}</span>
                    <span className="mt-1 block text-lg font-black">{section.title}</span>
                  </span>
                  <span className="text-2xl font-black text-[#f6c95a] transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <div className="border-t border-teal-300/15 px-5 py-5">
                  <div className="space-y-4 text-sm leading-7 text-emerald-50/84 sm:text-base">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Scale className="size-8 text-[#f6c95a]" aria-hidden="true" />
            <h2 className="text-3xl font-black sm:text-4xl">Final act provisions</h2>
          </div>
          <div className="mt-7 space-y-4">
            {finalProvisions.map(([number, text]) => (
              <article key={number} className="grid gap-3 rounded-2xl border border-teal-300/20 bg-white/[0.05] p-5 sm:grid-cols-[6rem_1fr]">
                <h3 className="font-black text-[#f6c95a]">{number}</h3>
                <p className="text-sm leading-7 text-emerald-50/82">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-teal-300/15 bg-[#07131b] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black">Sources and verification</h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-emerald-50/76">
            Transcribed from the supplied enrolled Act 2015-116 document and checked against the clean City of Mobile copy and the Alabama Code. The enrolled document was visually reviewed page by page so struck-through language could be excluded.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <a href={officialActUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-[#f6c95a]/30 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">
              <span>Official enrolled act</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            </a>
            <a href={officialCodeUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-teal-300/25 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">
              <span>Current Alabama codification</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            </a>
            <a href={cityCleanCopyUrl} target="_blank" rel="noreferrer" className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-teal-300/25 bg-white/[0.05] p-4 text-sm font-black transition hover:border-[#f6c95a]/70 focus-ring">
              <span>City of Mobile clean copy</span><ExternalLink className="size-4 shrink-0 text-[#f6c95a]" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-6 text-xs leading-5 text-emerald-50/58">Last reviewed July 13, 2026.</p>
        </div>
      </section>
    </div>
  );
}
