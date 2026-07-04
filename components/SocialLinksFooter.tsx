const socialLinks = [
  { label: "Instagram", href: ["https://www.instagram.com", "ptarborist"].join("/") },
  { label: "Facebook", href: ["https://www.facebook.com", "ptarborist"].join("/") },
  { label: "LinkedIn", href: ["https://www.linkedin.com/in", "ptarborist"].join("/") },
  { label: "YouTube", href: ["https://www.youtube.com", "@TheArboristPT"].join("/") }
] as const;

export function SocialLinksFooter() {
  return (
    <div>
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
    </div>
  );
}
