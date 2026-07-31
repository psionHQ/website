import Container from "@/components/layout/Container";

const AI_CAPABILITIES = [
  {
    title: "Private inference",
    description:
      "Run language model inference inside encrypted enclaves. Prompts, completions, and embeddings are never exposed in plaintext outside your boundary.",
  },
  {
    title: "Verifiable outputs",
    description:
      "Every AI response is cryptographically signed and auditable. Know exactly which model version produced a result and under what conditions.",
  },
  {
    title: "Contextual memory",
    description:
      "Give your AI persistent, permission-gated memory that respects user consent. No silent data retention — users stay in control.",
  },
  {
    title: "Multi-model orchestration",
    description:
      "Route tasks intelligently across specialised models while maintaining a single encrypted context thread.",
  },
];

export default function AISection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                PSION AI
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                AI that works for you, privately
              </h2>
              <p className="text-base text-foreground/60">
                PSION AI is built on a foundation of confidential computing. Every inference,
                every context, every interaction — encrypted end to end and provably private.
              </p>
            </div>
            <ul className="flex flex-col gap-6" role="list">
              {AI_CAPABILITIES.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-foreground/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={10}
                      height={10}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="text-sm text-foreground/60">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="relative flex items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-10"
          >
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <div className="rounded-xl bg-foreground/5 border border-foreground/10 p-4">
                  <p className="text-xs text-foreground/50 mb-1">Encrypted prompt</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-2 rounded-full bg-foreground/20"
                        style={{ width: `${[40, 28, 52, 36, 44, 32][i]}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center">
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
                    className="text-foreground/30"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </div>
                <div className="rounded-xl border border-foreground/20 bg-foreground/5 p-4 text-center">
                  <p className="text-xs font-semibold tracking-widest text-foreground/50 uppercase">
                    Secure Enclave
                  </p>
                </div>
                <div className="flex items-center justify-center">
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
                    className="text-foreground/30"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </div>
                <div className="rounded-xl bg-foreground/5 border border-foreground/10 p-4">
                  <p className="text-xs text-foreground/50 mb-1">Signed response</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-2 rounded-full bg-foreground/20"
                        style={{ width: `${[52, 36, 44, 28, 40][i]}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
