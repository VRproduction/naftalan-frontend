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
    
    return {
      title: `${blogPost.seo.meta_title} | Naftalan`,
      description: blogPost.seo.meta_description,
      openGraph: {
        images: [blogPost.seo.og_image],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post | Naftalan',
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
