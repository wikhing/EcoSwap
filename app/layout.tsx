'use client';

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header + footer on login & signup
  const hideLayout = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body className="antialiased bg-[#f4fbf4] min-h-screen flex flex-col">
        {!hideLayout && <Header />}

        <main className="flex-grow">
          {children}
        </main>

        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
