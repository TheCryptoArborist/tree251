const credentialBadges = [
  {
    title: "ISA Certified Arborist",
    detail: "International Society of Arboriculture credential",
    imageSrc: "/assets/credential-isa-certified-arborist.jpg?v=6",
    imageAlt: "ISA Certified Arborist credential logo"
  },
  {
    title: "Tree Risk Assessment Qualification",
    detail: "ISA qualification for tree risk assessment",
    imageSrc: "/assets/credential-traq.png?v=6",
    imageAlt: "ISA Tree Risk Assessment Qualification logo"
  },
  {
    title: "Prescription Pruning Qualification",
    detail: "ISA Florida Chapter pruning qualification",
    imageSrc: "/assets/credential-ppq.png?v=6",
    imageAlt: "Prescription Pruning Qualification logo"
  }
] as const;

export function CredentialBadges() {
  return (
    <section id="credentials" className="relative isolate overflow-hidden bg-[#07131b] py-12 text-white sm:py-16">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(18,192,168,0.15),transparent_24rem),radial-gradient(circle_at_85%_8%,rgba(246,201,90,0.14),transparent_22rem),linear-gradient(145deg,#050b12_0%,#07131b_48%,#0b1f17_100%)]" />
      <div className="tree-ring-texture absolute inset-y-0 right-0 -z-10 w-1/2 rotate-180 opacity-25 sm:opacity-35" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f6c95a] sm:text-sm">
            Professional Credentials
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
            Qualifications behind the assessment.
          </h2>
          <p className="mt-4 text-base leading-7 text-emerald-50/80">
            These credentials support Peter&apos;s independent assessment work for tree risk,
            pruning decisions, preservation questions, and property-owner guidance.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {credentialBadges.map((credential) => (
            <article
              key={credential.title}
              className="rounded-2xl border border-teal-300/20 bg-white/[0.06] p-4 shadow-[0_22px_54px_rgba(0,0,0,0.2)] backdrop-blur sm:p-5"
            >
              <div className="grid h-32 place-items-center rounded-xl border border-[#f6c95a]/20 bg-white p-4 sm:h-44">
                <img
                  src={credential.imageSrc}
                  alt={credential.imageAlt}
                  className="max-h-24 w-auto max-w-full object-contain sm:max-h-36"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="mt-4 text-lg font-black leading-6 text-white sm:mt-5">{credential.title}</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/75">{credential.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
