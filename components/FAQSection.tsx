const faqs = [
  {
    question: "Do you perform tree removal or pruning?",
    answer:
      "No. Peter provides independent arborist consulting, assessments, inventories, surveys, preservation guidance, and planning support. The goal is to help you understand what is needed before hiring a tree service."
  },
  {
    question: "What is the difference between a tree inventory and a tree survey?",
    answer:
      "A tree inventory is usually a tree-by-tree record used for maintenance planning and prioritization. A tree survey is often tied to a site, project, construction plan, preservation question, or documentation need."
  },
  {
    question: "When should I call before construction starts?",
    answer:
      "As early as possible. Tree preservation is much easier before access routes, grading, trenching, staging areas, and construction limits are finalized."
  },
  {
    question: "Do you work with HOAs, municipalities, and commercial properties?",
    answer:
      "Yes. Peter works with homeowners, HOAs, municipalities, country clubs, businesses, campuses, property managers, and project teams across the Gulf Coast."
  },
  {
    question: "Can I use your recommendations to compare tree service quotes?",
    answer:
      "Yes. Independent guidance can help you compare quotes, ask better questions, separate urgent work from optional work, and avoid paying for unnecessary or poorly prioritized tree work."
  },
  {
    question: "Do you provide written reports?",
    answer:
      "When appropriate, written notes, summaries, recommendations, or reports can be discussed based on the property, purpose, and level of documentation needed."
  }
] as const;

export function FAQSection() {
  return (
    <section id="faq" className="relative isolate overflow-hidden bg-[#07131b] py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(18,192,168,0.12),transparent_24rem),radial-gradient(circle_at_86%_70%,rgba(246,201,90,0.12),transparent_22rem)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Questions before you request
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
            Common questions about independent arborist consulting.
          </h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:mt-4 sm:text-base sm:leading-7">
            These quick answers help clarify how the consultation process differs from hiring a tree service.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 lg:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.16)] transition hover:border-[#f6c95a]/45 hover:bg-white/[0.08] open:border-[#f6c95a]/45 open:bg-white/[0.08] sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-white [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#f6c95a]/45 text-[#f6c95a] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 border-t border-teal-300/15 pt-3 text-sm leading-6 text-emerald-50/78">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
