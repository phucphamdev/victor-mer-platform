import type { Metadata } from 'next';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Victor MER - Giải Pháp Công Nghệ & Digital Marketing',
  description: 'Chuyên thiết kế website, SEO, Google Ads, Digital Marketing và phát triển ứng dụng. Giải pháp công nghệ toàn diện cho doanh nghiệp.',
  keywords: 'thiết kế website, SEO, Google Ads, Digital Marketing, phát triển ứng dụng, Victor MER',
  authors: [{ name: 'Victor MER' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
