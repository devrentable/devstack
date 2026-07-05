import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-3980525484161116";

export const metadata: Metadata = {
  title: {
    default: "DevStack Tools",
    template: "%s | DevStack Tools"
  },
  description:
    "Herramientas rápidas para desarrolladores, sysadmins y equipos que trabajan con Apache, Nginx, Docker, JSON, IA, WordPress, Magento y Moodle.",
  keywords: [
    "herramientas desarrollo",
    "htaccess",
    "CSP",
    "docker compose",
    "JSON formatter",
    "prompts tecnicos",
    "WordPress",
    "Magento",
    "Moodle"
  ],
  metadataBase: new URL("https://devstack.tools"),
  openGraph: {
    title: "DevStack Tools",
    description: "Herramientas rápidas para desarrolladores que no quieren perder la tarde.",
    type: "website",
    locale: "es_ES"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {adsenseClient ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
