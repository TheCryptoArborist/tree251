const socialLinks = [
  { label: "Instagram", href: ["https://www.instagram.com", "ptarborist"].join("/") },
  { label: "Facebook", href: ["https://www.facebook.com", "ptarborist"].join("/") },
  { label: "LinkedIn", href: ["https://www.linkedin.com/in", "ptarborist"].join("/") },
  { label: "YouTube", href: ["https://www.youtube.com", "@TheArboristPT"].join("/") }
] as const;

const buyMeACoffeeUrl = "https://www.buymeacoffee.com/arborist251";

export function SocialLinksFooter() {
  return (
    <div className="pb-28 sm:pb-0">
      <p className="font-black uppercase tracking-[0.14em] text-[#f6c95a]">Follow The Arborist</p>
      <ul className="mt-4 space-y-2">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white focus-ring"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-teal-300/15 pt-5">
        <p className="text-sm font-black text-white">Support Tree Education</p>
        <p className="mt-2 max-w-xs text-xs leading-5 text-emerald-50/70">
          If the educational tree content and public resources are useful to you, voluntary support helps keep them growing. This is separate from payment for consulting services.
        </p>
        <a
          href={buyMeACoffeeUrl}
          target="_blank"
          rel="noreferrer"
          data-track-event="Support Tree Education Click"
          data-track-location="footer"
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-[#f6c95a]/45 px-4 py-2 text-xs font-black uppercase tracking-[0.06em] text-[#f6c95a] transition hover:border-[#f6c95a] hover:bg-[#f6c95a]/10 focus-ring"
        >
          Support The Arborist
        </a>
      </div>
    </div>
  );
}
