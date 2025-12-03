import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        {children}
        <link rel="icon" href="/assets/ecoswap_icon.jpg" sizes="any"/>
      </body>
    </html>
  );
}
