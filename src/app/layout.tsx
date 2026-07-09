import type { Metadata } from "next";
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
  metadataBase: new URL("https://devstack-eight.vercel.app"),
  openGraph: {
    title: "DevStack Tools",
    description: "Herramientas rápidas para desarrolladores que no quieren perder la tarde.",
    url: "/",
    siteName: "DevStack Tools",
    type: "website",
    locale: "es_ES"
  },
  twitter: {
    card: "summary_large_image",
    title: "DevStack Tools",
    description: "Herramientas rápidas para desarrolladores que no quieren perder la tarde."
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
        <meta name="google-site-verification" content="yF93z4M585LwG0Nfi5vAyj9PP4enTFk9mWxEhYDRyGs" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PT3SLF2V');`
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PT3SLF2V"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
