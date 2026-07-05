import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3980525484161116"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
