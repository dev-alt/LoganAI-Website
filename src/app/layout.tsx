// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/assets/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import React from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Logan Software & AI Solutions',
        template: '%s | Logan Software & AI Solutions',
    },
    description: 'Engineering Intelligence, Delivering Excellence',
    keywords: ['AI Development', 'Software Solutions', 'Web Development', 'Cloud Architecture'],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            attribute="class"
        >
            <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
