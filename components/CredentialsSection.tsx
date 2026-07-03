const credentials = [
  {
    label: "ISA",
    eyebrow: "Certified Arborist",
    title: "ISA Certified Arborist",
    description:
      "Credentialed arborist guidance for property owners who need an independent assessment before approving tree work."
  },
  {
    label: "TRAQ",
    eyebrow: "Tree Risk Assessment Qualified",
    title: "ISA Tree Risk Assessment Qualified",
    description:
      "Advanced qualification for evaluating tree risk, targets, likelihood of failure, consequences, and practical mitigation options."
  },
  {
    label: "PPQ",
    eyebrow: "Prescription Pruning Qualified",
    title: "Prescription Pruning Qualified",
    description:
      "Pruning guidance focused on prescribing the right work for the tree instead of defaulting to unnecessary cuts."
  }
] as const;

export function CredentialsSection() {
  return (
    <section id="credentials" className="relative isolate overflow-hidden bg-[#07131b] py-14 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(18,192,168,0.15),transparent_24rem),radial-gradient(circle_at_85%_8%,rgba(246,201,90,0.14),transparent_22rem),linear-gradient(145deg,#050b12_0%,#07131b_48%,#0b1f17_100%)]" />
      <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-35" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f6c95a]">
            Credentials & Qualifications
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
            Qualified guidance before you pay for tree work.
          </h2>
          <p className="mt-4 text-base leading-7 text-emerald-50/80">
            These credentials support Peter&apos;s independent consulting work for tree risk, pruning decisions,
            preservation questions, storm damage concerns, and property owner guidance.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {credentials.map((credential) => (
            <article
              key={credential.title}
              className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-5 shadow-[0_22px_54px_rgba(0,0,0,0.22)] backdrop-blur"
            >
              <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-teal-300/15 bg-white p-4 text-center text-[#06110d]">
                <p className="text-4xl font-black tracking-[0.04em]">{credential.label}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-900/80">
                  {credential.eyebrow}
                </p>
              </div>
              <h3 className="mt-5 text-xl font-black text-white">{credential.title}</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50/78">{credential.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
