const credentialBadges = [
  {
    title: "ISA Certified Arborist",
    imageSrc: "/assets/credential-isa-certified-arborist.jpg?v=6",
    imageAlt: "ISA Certified Arborist credential logo"
  },
  {
    title: "Tree Risk Assessment Qualification",
    imageSrc: "/assets/credential-traq.png?v=6",
    imageAlt: "ISA Tree Risk Assessment Qualification logo"
  },
  {
    title: "Prescription Pruning Qualification",
    imageSrc: "/assets/credential-ppq.png?v=6",
    imageAlt: "Prescription Pruning Qualification logo"
  }
] as const;

export function CredentialBadges() {
  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="mt-6 scroll-mt-28 border-t border-teal-300/20 pt-5 sm:mt-7 sm:pt-6">
      <h3 id="credentials-heading" className="text-xs font-black uppercase tracking-[0.16em] text-[#f6c95a]">
        Professional Credentials
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {credentialBadges.map((credential) => (
          <article
            key={credential.title}
            className="flex min-w-0 items-center gap-4 rounded-xl border border-teal-300/20 bg-white/[0.04] p-3 sm:block"
          >
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-lg bg-white p-2 sm:h-28 sm:w-full sm:p-3">
              <img
                src={credential.imageSrc}
                alt={credential.imageAlt}
                className="max-h-20 w-auto max-w-full object-contain sm:max-h-24"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h4 className="text-sm font-bold leading-5 text-white sm:mt-3">{credential.title}</h4>
          </article>
        ))}
      </div>
    </section>
  );
}
