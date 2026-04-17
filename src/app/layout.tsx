import type { Metadata } from 'next';

import { Footer } from '@/components/shared/Footer';
import { Navbar } from '@/components/shared/Navbar';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Cherry Wine',
  description: 'Digital cocktail workshop and beverage poster generator.',
  verification: {
    google: 'k1rIgOKTF0GHgiu00YVZloiqfl_zIbnKUG2M88gLznI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-background selection:bg-primary/30">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
