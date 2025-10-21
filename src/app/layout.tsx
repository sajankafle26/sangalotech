import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopHeader from '@/components/TopHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getSiteSettings } from '@/lib/data';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sangalo Tech - Job-Ready IT Training & Tech Services in Nepal',
  description:
    'Join Sangalo Tech for job-ready training in MERN stack, digital marketing, PHP Laravel, and more. We also offer custom software, web development, and mobile app services.',
  icons: {
    icon: '/logo.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        {/* Server-rendered components with SSR-safe props */}
        <TopHeader settings={settings} />
        <Navbar settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <ScrollToTopButton />
      </body>
    </html>
  );
}