import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: {
    default: "PSIONHQ",
    template: "%s | PSIONHQ",
  },
  description: "The Operating System for Intelligence.",
  metadataBase: new URL("https://psionhq.com"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://psionhq.com",
    siteName: "PSIONHQ",
    title: "PSIONHQ — The Operating System for Intelligence",
    description:
      "Sovereign AI, encrypted vaults, digital identity, and self-custodied wallets — unified into one platform built for the future of secure infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PSIONHQ — The Operating System for Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PSIONHQ — The Operating System for Intelligence",
    description:
      "Sovereign AI, encrypted vaults, digital identity, and self-custodied wallets — unified into one platform built for the future of secure infrastructure.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
