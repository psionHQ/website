import Container from "@/components/layout/Container";

const WALLET_FEATURES = [
  {
    label: "Non-custodial by default",
    detail:
      "Your private keys never touch our servers. You hold the keys — PSION provides the interface.",
  },
  {
    label: "Unified asset management",
    detail:
      "Manage digital tokens, verifiable credentials, and access passes from one wallet interface.",
  },
  {
    label: "Programmable permissions",
    detail:
      "Set spend limits, time-bound access, and delegated signing — all enforced cryptographically.",
  },
  {
    label: "Seamless integrations",
    detail:
      "Connect your wallet to PSION Vault, AI agents, and third-party services with a single authorisation flow.",
  },
];

const WALLET_ASSET_TYPES = [
  { icon: "🔑", label: "Access Keys" },
  { icon: "📄", label: "Credentials" },
  { icon: "🏷️", label: "Digital Tokens" },
  { icon: "🛡️", label: "Identity Proofs" },
];

export default function WalletSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                PSION Wallet
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Digital assets, fully in your control
              </h2>
              <p className="text-base text-foreground/60">
                A self-sovereign wallet built for the modern identity stack. Hold credentials,
                digital tokens, and access rights — and share them on your own terms.
              </p>
            </div>
            <ul className="flex flex-col gap-5" role="list">
              {WALLET_FEATURES.map(({ label, detail }) => (
                <li key={label} className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-sm text-foreground/60">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-8 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
              <span className="text-sm font-semibold">My Wallet</span>
              <span className="inline-flex rounded-full border border-foreground/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-foreground/50 uppercase">
                Self-custodied
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {WALLET_ASSET_TYPES.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3"
                >
                  <span className="text-lg leading-none" role="img" aria-label={label}>
                    {icon}
                  </span>
                  <span className="text-xs font-medium text-foreground/70">{label}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 flex flex-col gap-3">
              <p className="text-xs text-foreground/50">Recent activity</p>
              {[
                { action: "Credential issued", time: "Just now", status: "success" },
                { action: "Access key rotated", time: "2m ago", status: "success" },
                { action: "Identity proof shared", time: "1h ago", status: "success" },
              ].map(({ action, time }) => (
                <div key={action} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
                    <span className="text-xs text-foreground/70">{action}</span>
                  </div>
                  <span className="text-[10px] text-foreground/40">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
