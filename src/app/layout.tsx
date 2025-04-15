import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { CartProvider } from '@/contexts/CartContext';
import './globals.css'

export const metadata: Metadata = {
  title: 'Next-Shop',
  description: 'E-commerce',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <html lang="pt">
        <body><Header />{children}</body>
      </html>
    </CartProvider>
  );
}
