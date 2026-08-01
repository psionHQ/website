import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { APP_CONFIG } from "@/config/app";
import AppProviders from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.name,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  metadataBase: new URL(APP_CONFIG.siteUrl),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_CONFIG.siteUrl,
    siteName: APP_CONFIG.name,
    title: `${APP_CONFIG.name} — The Operating System for Intelligence`,
    description:
      "Sovereign AI, encrypted vaults, digital identity, and self-custodied wallets — unified into one platform built for the future of secure infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.name} — The Operating System for Intelligence`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.name} — The Operating System for Intelligence`,
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
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
