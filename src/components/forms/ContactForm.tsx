"use client";

import { useState, type FormEvent } from "react";
import { FORM_INPUT_CLASSNAMES, FORM_TEXTAREA_CLASSNAMES } from "@/constants/forms";
import { validateContactForm } from "@/lib/validation";
import { submitContactForm } from "@/services/contact";
import type { ContactFormInput } from "@/types/forms";

const SUBJECTS = ["General", "Support", "Partnership", "Press"] as const;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>("General");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const payload: ContactFormInput = { name, email, subject, message };
    const errors = validateContactForm(payload);
    const firstError = Object.values(errors)[0];

    if (firstError) {
      setError(firstError);
      return;
    }

    setIsSubmitting(true);
    const result = await submitContactForm(payload);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error.message);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8">
        <h3 className="text-lg font-semibold">Message sent</h3>
        <p className="text-sm leading-relaxed text-foreground/60">
          Thanks for reaching out, {name || "there"}. Our team will get back to you at{" "}
          {email || "your email"} shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground/80">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Jane Doe"
          className={FORM_INPUT_CLASSNAMES}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground/80">
          Work email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="jane@company.com"
          className={FORM_INPUT_CLASSNAMES}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="text-sm font-medium text-foreground/80">
          Subject
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value as (typeof SUBJECTS)[number])}
          className={`${FORM_INPUT_CLASSNAMES} appearance-none`}
        >
          {SUBJECTS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground/80">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="How can we help?"
          className={FORM_TEXTAREA_CLASSNAMES}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-60 sm:w-fit"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
