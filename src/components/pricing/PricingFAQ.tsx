"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time from your dashboard. Changes take effect immediately and billing is prorated for the current cycle.",
  },
  {
    question: "What happens if I exceed my monthly AI call limit?",
    answer:
      "We'll notify you as you approach your limit. On Free and Pro plans you can purchase additional call packs, or upgrade to a higher tier to avoid interruption.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer:
      "Yes. Pro includes a 14-day free trial with full access to all features — no credit card required to start.",
  },
  {
    question: "Do you offer discounts for nonprofits or startups?",
    answer:
      "We do. Reach out to our sales team through the contact page and we'll work with you on a plan that fits your organisation.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Frequently asked questions
      </h2>
      <div className="flex flex-col divide-y divide-foreground/10 rounded-2xl border border-foreground/10">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
              >
                <span className="text-sm font-semibold">{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`shrink-0 text-foreground/40 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-6 pb-6">
                  <p className="max-w-2xl text-sm leading-relaxed text-foreground/60">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
