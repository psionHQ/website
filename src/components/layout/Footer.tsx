import Link from "next/link";
import Container from "./Container";

const FOOTER_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
  { label: "Company", href: "/company" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <span className="text-sm font-semibold tracking-tight">PSIONHQ</span>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-foreground/40">
            &copy; {new Date().getFullYear()} PSIONHQ. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
