import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import FooterSection from "@/sections/footer/FooterSection";

export const metadata: Metadata = {
  title: "Contact | PSIONHQ",
  description:
    "Have a question, partnership inquiry, or need enterprise support? We're here.",
};

interface Channel {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

const CHANNELS: Channel[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </svg>
    ),
    title: "Email support",
    description: "Reach our support team directly for account or technical questions.",
    href: "mailto:support@psionhq.com",
    linkLabel: "support@psionhq.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Discord community",
    description: "Chat with our engineers and other builders in real time.",
    href: "https://discord.gg/psionhq",
    linkLabel: "Join the Discord",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Book a demo",
    description: "Get a guided walkthrough of the platform with our solutions team.",
    href: "/contact#demo",
    linkLabel: "Schedule a call",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Have a question, partnership inquiry, or need enterprise support? We're here."
      />

      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              {CHANNELS.map((channel) => (
                <div
                  key={channel.title}
                  className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.04] text-foreground">
                    {channel.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold">{channel.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {channel.description}
                    </p>
                  </div>
                  <Link
                    href={channel.href}
                    className="text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
                  >
                    {channel.linkLabel} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FooterSection />
    </>
  );
}
