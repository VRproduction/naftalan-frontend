import SanatoriumDetailPage from "@/features/sanatoriums/SanatoriumDetailPage";
import { getSanatorium } from "@/lib/services/sanatorium.service";
import { SupportedLocale } from "@/lib/utils/apiClient";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: Promise<{
    slug: string;
    locale: SupportedLocale
  }>,
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  
  try {
    const sanatorium = await getSanatorium(locale, slug);
    
    // Base URL from environment variable or default
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naftalan.az";
    
    // Prepare canonical URL
    const canonicalUrl = `${baseUrl}/${locale}/sanatoriums/${slug}`;
    
    // Ensure we have fallbacks for all metadata
    const title = sanatorium.seo?.meta_title || sanatorium.name || "Sanatorium Details";
    const description = sanatorium.seo?.meta_description || 
      `${sanatorium.name} - ${sanatorium.description?.substring(0, 160)}` || 
      "Discover medical treatments and wellness services at this sanatorium in Naftalan, Azerbaijan.";
    
    // Image URLs should be absolute
    const mainImage = sanatorium.seo?.og_image || 
                      sanatorium.images?.find(img => img.is_main)?.image || 
                      sanatorium.images?.[0]?.image || 
                      "/images/default-sanatorium.jpg";
    const imageUrl = mainImage.startsWith("http") ? mainImage : `${baseUrl}${mainImage}`;
    
    return {
      title: `${title} | Naftalan`,
      description: description,
      keywords: sanatorium.seo?.meta_keywords || "naftalan, sanatorium, health resort, medical tourism, Azerbaijan",
      
      // Open Graph metadata
      openGraph: {
        type: "website",
        locale: locale,
        url: canonicalUrl,
        title: title,
        description: description,
        siteName: "Naftalan",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: sanatorium.name || "Sanatorium image",
          },
        ],
      },
      
      // Twitter card metadata
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [imageUrl],
        creator: "@naftalan",
        site: "@naftalan",
      },
      
      // Canonical URL and alternates for other languages
      alternates: {
        canonical: canonicalUrl,
        languages: {
          az: `${baseUrl}/az/sanatoriums/${slug}`,
          ru: `${baseUrl}/ru/sanatoriums/${slug}`,
        },
      },
      
      // Robots directives
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for sanatorium:", error);
    
    // Fallback metadata if sanatorium data cannot be fetched
    return {
      title: 'Sanatorium | Naftalan',
      description: 'Explore sanatoriums in Naftalan, Azerbaijan offering therapeutic treatments and medical services.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

const page = async ({ params, searchParams }: Props) => {
  const { slug, locale } = await params;
  const {
    city,
    check_in,
    check_out,
    occupancy,
    children_ages,
    ratings,
    min_price,
    max_price,
    min_total_price,
    max_total_price,
    id
  } = await searchParams;

  const [
    sanatorium,
  ] = await Promise.all([
    getSanatorium(locale, slug, {
      location: String(city),
      check_in: String(check_in),
      check_out: String(check_out),
      occupancy: String(occupancy),
      children_ages: String(children_ages),
      ratings: String(ratings),
      min_price: String(min_price),
      max_price: String(max_price),
      min_total_price: String(min_total_price),
      max_total_price: String(max_total_price),
      id: String(id)
    }),
  ]);
  console.log(sanatorium)
  return <SanatoriumDetailPage sanatorium={sanatorium} />;
};

export default page;
