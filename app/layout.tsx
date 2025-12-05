'use client';

import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

const metadata: Metadata = {
  title: "EcoSwap",
  description: "EcoSwap - Sustainable Item Exchange",
  icons: {
    icon: "/assets/ecoswap_icon.jpg",
  }, 
};

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased min-h-screen flex flex-col`}>
        
        {!hideLayout && <Header />}

        <main className="grow">
          {children}
        </main>

        {!hideLayout && <Footer />}
        <link className="bg-transparent bg-cover" rel="icon" href="app/ecoswap_icon_removebg.ico" sizes="any"/>
      </body>
    </html>
  );
}
