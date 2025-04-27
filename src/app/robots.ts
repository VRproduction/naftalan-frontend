import { MetadataRoute } from 'next';

// Base URL from environment variable or default
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://naftalan.az";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/server-sitemap.xml',
        '/admin/',
        '/private/'
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}