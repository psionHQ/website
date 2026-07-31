import Container from "@/components/layout/Container";

const VAULT_FEATURES = [
  {
    label: "Zero-knowledge encryption",
    detail:
      "Data is encrypted client-side before it ever reaches our infrastructure. We cannot read what you store.",
  },
  {
    label: "Hardware-backed keys",
    detail:
      "Encryption keys are generated and stored in tamper-resistant hardware security modules.",
  },
  {
    label: "Granular access control",
    detail:
      "Define read, write, and share permissions down to the individual file or record level.",
  },
  {
    label: "Immutable audit trail",
    detail:
      "Every access and mutation is logged to an append-only audit log you can verify independently.",
  },
];

const VAULT_STATS = [
  { value: "AES-256", label: "Encryption standard" },
  { value: "HSM", label: "Key storage" },
  { value: "99.99%", label: "Availability SLA" },
];

export default function VaultSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div
            aria-hidden="true"
            className="order-last lg:order-first relative rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-8 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/15">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="text-sm font-semibold">PSION Vault</span>
              <span className="ml-auto text-xs text-foreground/40">Connected</span>
            </div>
            <div className="flex flex-col gap-2">
              {["identity.json", "credentials.enc", "private-key.pem", "audit-log.bin"].map(
                (file) => (
                  <div
                    key={file}
                    className="flex items-center gap-3 rounded-lg border border-foreground/8 bg-foreground/[0.02] px-3 py-2.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-foreground/40"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="text-xs font-mono text-foreground/60">{file}</span>
                    <span className="ml-auto text-[10px] text-foreground/30">Encrypted</span>
                  </div>
                ),
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 border-t border-foreground/10 pt-4">
              {VAULT_STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5 text-center">
                  <span className="text-base font-semibold">{value}</span>
                  <span className="text-[10px] text-foreground/50">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                PSION Vault
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Your data, secured by design
              </h2>
              <p className="text-base text-foreground/60">
                PSION Vault is a zero-knowledge data store for the things that matter most —
                credentials, keys, documents, and private records. Built to be unbreakable.
              </p>
            </div>
            <ul className="flex flex-col gap-5" role="list">
              {VAULT_FEATURES.map(({ label, detail }) => (
                <li key={label} className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-sm text-foreground/60">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
