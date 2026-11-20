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
      <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
        {credentialBadges.map((credential) => (
          <article
            key={credential.title}
            className="block min-w-0 rounded-xl border border-teal-300/20 bg-white/[0.04] p-2 sm:p-3"
          >
            <div className="grid h-20 w-full place-items-center rounded-lg bg-white p-1.5 sm:h-28 sm:p-3">
              <img
                src={credential.imageSrc}
                alt={credential.imageAlt}
                className="max-h-16 w-auto max-w-full object-contain sm:max-h-24"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h4 className="mt-2 break-words text-[11px] font-bold leading-4 text-white sm:mt-3 sm:text-sm sm:leading-5">{credential.title}</h4>
          </article>
        ))}
      </div>
    </section>
  );
}
