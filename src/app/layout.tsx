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
    'Evidence-based, non-partisan tracker of federal government fraud and waste. 78 data points from GAO, OIG, DOJ, CBO, and independent sources.',
  keywords: ['federal fraud', 'government waste', 'improper payments', 'GAO', 'federal budget'],
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
