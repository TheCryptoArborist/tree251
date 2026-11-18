import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay for services | The Arborist",
  description: "Choose a payment method for arborist services from Peter Toler.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pay" }
};

const options = [
  { name: "Venmo", detail: "@thearborist63", href: "https://venmo.com/u/thearborist63" },
  { name: "Cash App", detail: "$arborist251", href: "https://cash.app/$arborist251" },
  { name: "PayPal", detail: "Open payment link", href: "https://www.paypal.com/qrcodes/p2pqrc/37MHRKK36D56Q" }
];

export default function PaymentPage() {
  return (
    <main style={{ maxWidth: 540, margin: "auto", padding: "clamp(32px, 8vw, 80px) 20px" }}>
      <p>Peter Toler · The Arborist</p>
      <h1 style={{ fontSize: "clamp(2rem, 7vw, 3rem)", lineHeight: 1.1, margin: "12px 0" }}>Pay for services</h1>
      <p>Choose a payment method below, then enter the amount due for your service.</p>
      <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
        {options.map(({ name, detail, href }) => (
          <a key={name} href={href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "#174836", color: "white", borderRadius: 12, textDecoration: "none" }}>
            <span><strong style={{ display: "block", fontSize: 20 }}>{name}</strong><span style={{ fontSize: 14 }}>{detail}</span></span>
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </main>
  );
}
