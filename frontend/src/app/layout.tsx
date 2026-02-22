import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mategroup.id'),
  title: {
    default: 'MateGroup - SaaS Solutions & Digital Services',
    template: '%s | MateGroup',
  },
  description:
    'Platform SaaS inovatif berbasis AI untuk transformasi digital bisnis Anda. Dari pengembangan web, mobile, hingga solusi AI & machine learning.',
  manifest: '/site.webmanifest',
  keywords: ['MateGroup', 'SaaS', 'AI', 'digital transformation', 'web development', 'machine learning', 'Indonesia'],
  authors: [{ name: 'MateGroup', url: 'https://mategroup.id' }],
  creator: 'MateGroup',
  publisher: 'MateGroup',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://mategroup.id',
    siteName: 'MateGroup',
    title: 'MateGroup - SaaS Solutions & Digital Services',
    description:
      'Platform SaaS inovatif berbasis AI untuk transformasi digital bisnis Anda.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MateGroup - AI-Powered SaaS Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MateGroup - SaaS Solutions & Digital Services',
    description:
      'Platform SaaS inovatif berbasis AI untuk transformasi digital bisnis Anda.',
    images: ['/og-image.png'],
    creator: '@mategroup_id',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mategroup.id',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <ScrollProgressBar />
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />

        <Analytics />
        <SpeedInsights />

        {/* Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MateGroup',
              url: 'https://mategroup.id',
              logo: 'https://mategroup.id/icon.png',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@mategroup.id',
                contactType: 'customer service',
                availableLanguage: ['Indonesian', 'English'],
              },
              sameAs: [
                'https://mategroup.id',
              ],
            }),
          }}
        />

        {/* Structured Data — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'MateGroup',
              url: 'https://mategroup.id',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://mategroup.id/products?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7YQ9XHXK3Y"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7YQ9XHXK3Y');
          `}
        </Script>
      </body>
    </html>
  );
}
