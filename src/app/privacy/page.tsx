import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | PSIONHQ",
  description:
    "How PSIONHQ collects, uses, and protects your data across our website and products.",
};

const SECTIONS = [
  {
    heading: "1. Overview",
    body: "PSIONHQ (\u201cwe\u201d, \u201cour\u201d, \u201cus\u201d) builds sovereign infrastructure for identity, storage, and AI. This policy explains what information we collect when you use psionhq.com, why we collect it, and the choices you have.",
  },
  {
    heading: "2. Information We Collect",
    body: "We collect information you provide directly (such as your name and email when you contact us or create an account), and limited technical data (such as browser type and pages visited) needed to operate and secure the site.",
  },
  {
    heading: "3. How We Use Information",
    body: "We use collected information to operate the website and dashboard, respond to inquiries, improve our products, and meet legal obligations. We do not sell personal information to third parties.",
  },
  {
    heading: "4. Data Retention",
    body: "We retain personal information only as long as necessary to provide our services or as required by law, after which it is deleted or anonymised.",
  },
  {
    heading: "5. Your Rights",
    body: "Depending on your location, you may have the right to access, correct, or delete your personal information. To exercise these rights, contact us using the details below.",
  },
  {
    heading: "6. Contact",
    body: "Questions about this policy can be sent to support@psionhq.com.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-black text-white">
      <Container>
        <div className="py-20 sm:py-24 lg:py-32 max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[#0066FF] mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-foreground/60 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold mb-3">
                  {section.heading}
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
