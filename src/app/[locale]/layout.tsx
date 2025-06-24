import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import MainLayout from "@/features/layouts/main/MainLayout";
import { NextIntlClientProvider } from "next-intl";
import { SupportedLocale } from "@/lib/utils/apiClient";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import { getSiteSettings } from "@/lib/services/core.service";
import { AppInitializer } from "@/lib/providers/AppInitializer";
import LoadingProvider from "@/lib/providers/LoadingProvider";
import { Suspense } from "react";
import RouteProgressBar from "@/components/common/RouteProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This is a dynamic metadata function that will be called for each request
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as SupportedLocale)) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  // Get site settings for SEO metadata
  const siteSettings = await getSiteSettings(locale as SupportedLocale);

  // Ensure non-null descriptions
  const metaDescription =
    siteSettings.default_meta_description ||
    siteSettings.site_description ||
    "";

  return {
    title: {
      template: `%s | ${siteSettings.site_name}`,
      default: siteSettings.default_meta_title || siteSettings.site_name,
    },
    description: metaDescription,
    keywords: siteSettings.default_meta_keywords || "",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://naftalan.az"
    ),
    openGraph: {
      title: siteSettings.default_meta_title || siteSettings.site_name,
      description: metaDescription,
      siteName: siteSettings.site_name,
      images: [
        {
          url: siteSettings.default_og_image || "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: siteSettings.site_name,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteSettings.default_meta_title || siteSettings.site_name,
      description: metaDescription,
      images: [siteSettings.default_og_image || "/images/og-image.jpg"],
    },
    robots: {
      index: !siteSettings.maintenance_mode,
      follow: !siteSettings.maintenance_mode,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        az: "/az",
        ru: "/ru",
      },
    },
  };
}

// Viewport settings
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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

  // Get site settings and messages for the page
  const [messages, siteSettings] = await Promise.all([
    getMessages(),
    getSiteSettings(locale as SupportedLocale),
  ]);

  // Define CSS variables for site colors
  const colorVars = `
    :root {
      --color-primary: ${siteSettings.primary_color || "#3b82f6"};
      --color-secondary: ${siteSettings.secondary_color || "#1e40af"};
      --color-accent: ${siteSettings.accent_color || "#60a5fa"};
    }
  `;

  // Check if site is in maintenance mode
  if (siteSettings.maintenance_mode) {
    return (
      <html lang={locale}>
        <head>
          <style dangerouslySetInnerHTML={{ __html: colorVars }} />
          <link rel="icon" href={siteSettings.favicon || "/favicon.ico"} />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex items-center justify-center min-h-screen p-4 bg-gray-100`}
        >
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Maintenance Mode
            </h1>
            <p className="text-gray-600">
              {siteSettings.maintenance_message || "We'll be back soon."}
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang={locale}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: colorVars }} />
        <link rel="icon" href={siteSettings.favicon || "/favicon.ico"} />
        {siteSettings.google_site_verification && (
          <meta
            name="google-site-verification"
            content={siteSettings.google_site_verification}
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* Google Analytics */}
        {siteSettings.google_analytics_id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.google_analytics_id}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteSettings.google_analytics_id}');
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {siteSettings.google_tag_manager_id && (
          <>
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${siteSettings.google_tag_manager_id}');
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel */}
        {siteSettings.facebook_pixel_id && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${siteSettings.facebook_pixel_id}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        <Suspense fallback={null}>
          <RouteProgressBar
            height={3}
            color="#3b82f6"
            showOnShallow={true}
            className="custom-progress"
          />
        </Suspense>
          <NextIntlClientProvider messages={messages}>
            <AppInitializer setting={siteSettings}>
              <MainLayout siteSettings={siteSettings}>{children}</MainLayout>
            </AppInitializer>
          </NextIntlClientProvider>
        {/* Cookie policy popup */}
        {siteSettings.cookie_policy_popup && (
          <div
            id="cookie-consent-banner"
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md p-4 z-50 hidden"
          >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-700">
                {siteSettings.cookie_popup_text ||
                  "This website uses cookies to improve your experience."}
              </p>
              <div className="flex gap-2">
                <button
                  id="cookie-consent-accept"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Accept
                </button>
                {siteSettings.privacy_policy_page && (
                  <a
                    href={siteSettings.privacy_policy_page}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </div>
            <Script id="cookie-consent" strategy="afterInteractive">
              {`
                document.addEventListener('DOMContentLoaded', function() {
                  const banner = document.getElementById('cookie-consent-banner');
                  const acceptButton = document.getElementById('cookie-consent-accept');
                  
                  // Check if user has already accepted cookies
                  if (!localStorage.getItem('cookieConsent')) {
                    banner.classList.remove('hidden');
                  }
                  
                  // Set cookie consent when accept button is clicked
                  acceptButton.addEventListener('click', function() {
                    localStorage.setItem('cookieConsent', 'true');
                    banner.classList.add('hidden');
                  });
                });
              `}
            </Script>
          </div>
        )}
      </body>
    </html>
  );
}
