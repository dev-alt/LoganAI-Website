import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/assets/styles/globals.css';
import { Providers } from './providers';
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
import React from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Logan Software & AI Solutions',
  description: 'Engineering Intelligence, Delivering Excellence',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-300`}>
      <Providers>

          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
      </Providers>
      </body>
      </html>
  );
}
