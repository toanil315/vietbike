import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'VietBike - Premium Motorbike Rentals in Vietnam',
    template: '%s | VietBike',
  },
  description: 'Premium bike rental & booking web application for exploring Vietnam on two wheels.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'VietBike',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
