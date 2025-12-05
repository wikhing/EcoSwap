'use client';

import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/signup";


  const rubik = Rubik({
    variable: "--font-rubik",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "EcoSwap",
    description: "EcoSwap - Sustainable Item Exchange",
    icons: {
      icon: "/assets/ecoswap_icon.jpg",
    }, 
  };

  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased bg-[#f4fbf4] min-h-screen flex flex-col`}>
        <link className="bg-transparent bg-cover" rel="icon" href="app/ecoswap_icon_removebg.ico" sizes="any"/>
        {!hideLayout && <Header />}

        <main className="flex-grow">
          {children}
        </main>

        {!hideLayout && <Footer />}
    </html>
  );
}
