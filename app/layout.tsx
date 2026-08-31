import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium Cleaning Services in London`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cleaning services London",
    "home cleaning",
    "deep cleaning",
    "end of tenancy cleaning",
    "office cleaning",
    "book a cleaner London",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Premium Cleaning Services in London`,
    description: site.description,
    images: [{ url: "/assets/images/hero-desktop.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Premium Cleaning Services in London`,
    description: site.description,
    images: ["/assets/images/hero-desktop.jpg"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1210" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-dvh bg-bg font-sans text-ink antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="pb-28 md:pb-0">
            {children}
          </main>
          <Footer />
          <BottomNav />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
