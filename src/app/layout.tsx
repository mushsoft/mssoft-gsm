import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import VisitTracker from "@/components/VisitTracker";
import { THEME_INIT_SCRIPT } from "@/components/ThemeToggle";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const siteName = "MS Soft GSM";
const title = "MS Soft GSM | Phones, Spare Parts & Technician Support Uganda";
const description =
  "Genuine phones, screens, batteries, accessories and repair tools in Uganda. Instant checkout or order via WhatsApp, with fast delivery across Kampala & East Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "phone spares Uganda",
    "phone screens Kampala",
    "GSM repair tools",
    "testpoint diagrams",
    "UK used phones Uganda",
    "phone batteries Uganda",
  ],
  robots: { index: true, follow: true },
  verification: {
    google: "lxFN-wp1JS1uf1ZfydWYCxQttG9zfH4A20ipIz6Tj8g",
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: baseUrl,
    siteName,
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 font-sans">
        {/* Runs before paint to apply a stored light/dark preference — see ThemeToggle. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <VisitTracker />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
        >
          Skip to content
        </a>

        <CartProvider>
          {/* Global Header (hidden on /studio, which renders full-screen) */}
          <ConditionalHeader />

          {/* Main Content Area */}
          <div id="main-content" className="grow">
            {children}
          </div>

          {/* Global Footer (hidden on /studio, which renders full-screen) */}
          <ConditionalFooter />
        </CartProvider>
      </body>
    </html>
  );
}