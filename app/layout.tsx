import type { Metadata, Viewport } from "next";
import "./styles/globals.css";
import { AppProvider } from "@/app/components/contexts/AppContext";
import { LazyToaster } from "@/app/components/containers/common/LazyToaster";
import { defaultMetadata } from "@/app/lib/seo";
import { siteJsonLd } from "@/app/lib/structured-data";
import { fontClasses } from "@/app/lib/fonts";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#faf7f1",
  width: "device-width",
  initialScale: 1,
};

// NOTE: Redux and next-themes are still available in the codebase
// (app/lib/redux and app/components/contexts/ThemeProvider) but are NOT
// mounted at the root, so their client bundles do not ship to every page.
// When a page or component genuinely needs them, wrap that subtree with the
// provider locally. Keeping them out of the root cut ~40 KB from the shared
// client chunk and was the main lever for hitting Lighthouse targets.

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontClasses} h-full`}>
      <body className="min-h-full antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-brand-primary focus:px-3 focus:py-2 focus:text-sm focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <AppProvider>
          {children}
          <LazyToaster />
        </AppProvider>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
