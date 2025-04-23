import React from 'react';
import { SupportedLocale } from '@/lib/utils/apiClient';
import { getBlogCategories, getBlogPosts, getBlogTags } from '@/lib/services/blog.service';
import { notFound } from 'next/navigation';
import BlogPage from '@/features/blog/BlogPage';

interface Props {
  params: Promise<{
    locale: SupportedLocale;
    slug: string;
  }>;
}


export default async function BlogDetailPage({ params }: Props) {
  const { locale } = await params;
  
  try {
    const [posts, categories, tags] = await Promise.all([
      getBlogPosts(locale),
      getBlogCategories(locale),
      getBlogTags(locale),    
    ]);
    
    return <BlogPage blogs={posts.results} categories={categories} tags={tags} />;
  } catch (error) {
    notFound();
  }
}
