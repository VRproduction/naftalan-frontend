import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import MainLayout from "@/features/layouts/main/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naftalan - Müalicəvi Neft Sanatoriyaları",
  description: "Naftalan müalicəvi nefti ilə sağlamlığınıza qovuşun. Naftalan şəhəri sanatoriyaları və müalicə paketləri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <MainLayout>
        {children}
        </MainLayout>      
      </body>
    </html>
  );
}
