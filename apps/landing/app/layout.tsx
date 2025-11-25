import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { validateConfig } from '@/lib/config';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Bagisto SaaS Platform - E-commerce Solutions',
  description:
    'Multi-revenue e-commerce platform offering SaaS rental, license sales, and ready-to-use backend infrastructure.',
  keywords: [
    'e-commerce',
    'SaaS',
    'multi-tenant',
    'Bagisto',
    'online store',
    'license',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Validate configuration on app startup
  if (typeof window === 'undefined') {
    try {
      validateConfig();
    } catch (error) {
      console.error('Configuration validation failed:', error);
      // In production, you might want to show an error page
      // For now, we'll let it continue and show errors in components
    }
  }

  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Navigation />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
