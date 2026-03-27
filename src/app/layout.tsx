import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Federal Fraud & Waste Tracker',
  description:
    'Evidence-based, non-partisan tracking of $9.9T–$12.4T in federal fraud, waste, and abuse (FY2003–2025). Data from GAO, DOJ, OIG, and CBO.',
  keywords: ['federal fraud', 'government waste', 'improper payments', 'GAO', 'federal budget'],
  openGraph: {
    title: 'Federal Fraud & Waste Tracker',
    description: '$9.9T–$12.4T in federal fraud & waste exposed — 80 evidence entries from public records',
    type: 'website',
    url: 'https://fraud-waste-tracker.vercel.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Fraud & Waste Tracker',
    description: '$9.9T–$12.4T in federal fraud & waste exposed',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased pb-safe">
        {children}
      </body>
    </html>
  );
}
