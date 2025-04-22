import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import MainLayout from "@/features/layouts/main/MainLayout";
import { NextIntlClientProvider } from "next-intl";
import { SupportedLocale } from "@/lib/utils/apiClient";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as SupportedLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages] = await Promise.all([getMessages()]);
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <NextIntlClientProvider messages={messages}>
          <MainLayout>
            {children}
          </MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
