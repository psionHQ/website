import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "System Status | PSIONHQ",
  description: "Current operational status of PSIONHQ services.",
};

const SERVICES = [
  { name: "Website", status: "Operational" },
  { name: "PSIONHQ AI", status: "Operational" },
  { name: "PSIONHQ Vault", status: "Operational" },
  { name: "PSIONHQ Wallet", status: "Operational" },
  { name: "PSIONHQ ID", status: "Operational" },
  { name: "Dashboard", status: "Operational" },
];

export default function StatusPage() {
  return (
    <main className="bg-black text-white">
      <Container>
        <div className="py-20 sm:py-24 lg:py-32 max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[#0066FF] mb-4">System</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            System Status
          </h1>
          <div className="flex items-center gap-2 mb-12">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <p className="text-foreground/60">All systems operational</p>
          </div>

          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between py-4"
              >
                <span className="font-medium">{service.name}</span>
                <span className="flex items-center gap-2 text-sm text-green-500">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {service.status}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-foreground/40 mt-8">
            Last checked:{" "}
            {new Date().toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
        </div>
      </Container>
    </main>
  );
}
