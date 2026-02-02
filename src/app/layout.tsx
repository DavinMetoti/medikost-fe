import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medikost.id - Cari Kos Khusus Mahasiswa Kedokteran di Semarang",
  description: "Platform pencarian kos-kosan khusus untuk mahasiswa kedokteran, koas, dan residen di sekitar RSUP Kariadi Semarang. Temukan tempat tinggal nyaman, aman, dan strategis dengan harga terjangkau.",
  keywords: "kos semarang, kos mahasiswa kedokteran, kos kariadi, kos residen, kos koas, kos murah semarang, kos dekat rumah sakit",
  authors: [{ name: "Medikost.id" }],
  creator: "Medikost.id",
  publisher: "Medikost.id",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://medikost.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Medikost.id - Cari Kos Khusus Mahasiswa Kedokteran di Semarang",
    description: "Platform pencarian kos-kosan khusus untuk mahasiswa kedokteran, koas, dan residen di sekitar RSUP Kariadi Semarang.",
    url: 'https://medikost.id',
    siteName: 'Medikost.id',
    images: [
      {
        url: '/images/medikost_logo.png',
        width: 1200,
        height: 630,
        alt: 'Medikost.id - Platform Kos untuk Mahasiswa Kedokteran',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Medikost.id - Cari Kos Khusus Mahasiswa Kedokteran di Semarang",
    description: "Platform pencarian kos-kosan khusus untuk mahasiswa kedokteran, koas, dan residen di sekitar RSUP Kariadi Semarang.",
    images: ['/images/medikost_logo.png'],
    creator: '@medikost_id',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // Ganti dengan kode verifikasi Google Search Console
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Medikost.id",
              "url": "https://medikost.id",
              "description": "Platform pencarian kos-kosan khusus untuk mahasiswa kedokteran, koas, dan residen di sekitar RSUP Kariadi Semarang.",
              "publisher": {
                "@type": "Organization",
                "name": "Medikost.id",
                "url": "https://medikost.id",
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://medikost.id/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
