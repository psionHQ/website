import Link from "next/link";
import Container from "@/components/layout/Container";

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Platform", href: "/platform" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "PSION AI", href: "/platform#ai" },
      { label: "PSION Vault", href: "/platform#vault" },
      { label: "PSION Wallet", href: "/platform#wallet" },
      { label: "Identity", href: "/platform#identity" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: "/developers" },
      { label: "API Reference", href: "/developers#api" },
      { label: "SDKs", href: "/developers#sdks" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-foreground/10 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-1 flex flex-col gap-4">
              <Link href="/" className="text-base font-semibold tracking-tight">
                PSIONHQ
              </Link>
              <p className="text-sm text-foreground/60 max-w-xs">
                The operating system for intelligence. Secure AI, sovereign identity, and
                digital infrastructure built for what comes next.
              </p>
            </div>
            <div className="lg:col-span-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {FOOTER_COLUMNS.map(({ heading, links }) => (
                <div key={heading} className="flex flex-col gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50">
                    {heading}
                  </p>
                  <ul className="flex flex-col gap-2.5" role="list">
                    {links.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-foreground/40">
              &copy; {new Date().getFullYear()} PSIONHQ. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link
                href="/privacy"
                className="text-xs text-foreground/40 transition-colors hover:text-foreground/70"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-foreground/40 transition-colors hover:text-foreground/70"
              >
                Terms
              </Link>
              <Link
                href="/security"
                className="text-xs text-foreground/40 transition-colors hover:text-foreground/70"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
