import React from 'react';
import { Metadata } from 'next';
import { SupportedLocale } from '@/lib/utils/apiClient';
import { getBlogPost } from '@/lib/services/blog.service';
import BlogPostDetailPage from '@/features/blog/BlogPostDetailPage';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    locale: SupportedLocale;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  
  try {
    const blogPost = await getBlogPost(locale, slug);
    
    // Base URL from environment variable or default
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naftalan.az";
    
    // Prepare canonical URL
    const canonicalUrl = `${baseUrl}/${locale}/blog/${slug}`;
    
    // Ensure we have fallbacks for all metadata
    const title = blogPost.seo?.meta_title || blogPost.title || "Blog Post";
    const description = blogPost.seo?.meta_description || 
      blogPost.short_description || 
      blogPost.description?.substring(0, 160) || 
      "Read our latest article about health tourism and medical treatments in Naftalan, Azerbaijan.";
    
    // Image URLs should be absolute
    const mainImage = blogPost.seo?.og_image || 
                      blogPost.image || 
                      "/images/default-blog.jpg";
    const imageUrl = mainImage.startsWith("http") ? mainImage : `${baseUrl}${mainImage}`;
    
    // Format tags array for metadata
    const tagStrings = blogPost.tags?.map(tag => tag.title) || [];
    
    return {
      title: `${title}`,
      description: description,
      keywords: blogPost.seo?.meta_keywords || tagStrings.join(', ') || "naftalan, health tourism, blog, medical tourism, Azerbaijan",
      
      // Open Graph metadata
      openGraph: {
        type: "article",
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
            alt: blogPost.title || "Blog post image",
          },
        ],
        publishedTime: blogPost.date || blogPost.created,
        tags: tagStrings,
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
          az: `${baseUrl}/az/blog/${slug}`,
          ru: `${baseUrl}/ru/blog/${slug}`,
        },
      },
      
      // Robots directives
      robots: {
        index: !blogPost.seo?.no_index,
        follow: !blogPost.seo?.no_follow,
      },
    };
  } catch (error) {
    
    // Fallback metadata if blog post data cannot be fetched
    return {
      title: 'Blog Post | Naftalan',
      description: 'Read our latest articles about health tourism and medical treatments in Naftalan, Azerbaijan.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  
  try {
    const [blogPost] = await Promise.all([
      getBlogPost(locale, slug),
    ]);
    
    return <BlogPostDetailPage blogPost={blogPost} />;
  } catch (error) {
    notFound();
  }
}
