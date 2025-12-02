import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Amigo's Academy",
  description: 'Online learning platform with modern design',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
            <main className="pt-14"> {/* padding-top */}
              {children}
            </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}