'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {  useRouter, usePathname } from '@/i18n/navigation';

import { useSearchParams } from 'next/navigation';
import { BlogCategory, BlogPost, BlogTag } from '@/lib/types/blog.type';
import BlogCard from '../common/BlogCard';
import { useTranslations } from 'next-intl';

interface Props {
  blogs: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];  
}


export default function BlogPage({ blogs, categories, tags }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get('category');
  const activeTag = searchParams.get('tag');
  
  
  const t = useTranslations('pages.blog');
 
  
  const handleCategoryChange = (category: string) => {
    // Update URL with category param
    const params = new URLSearchParams(searchParams.toString());
    
    if (category !== 'Hamısı') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl);
  };

  const handleTagChange = (tag: string) => {
    // Update URL with tag param
    const params = new URLSearchParams(searchParams.toString());
    
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl);
  };
  

  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{t('hero_title')}</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {t('hero_description')}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Search and Categories */}
      <div className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"> 
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => handleCategoryChange(category.id.toString())}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category.id.toString() 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            // Loading state
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <BlogCard key={index} blog={blog}/>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl text-gray-700 mb-4">{t('no_blogs_found')}</h3>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      handleCategoryChange('Hamısı');
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {t('show_all_blogs')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Popular Tags */}
      {tags.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">{t('popular_tags')}</h2>
              <div className="flex flex-wrap justify-center gap-3">
    
                {tags.map((tag, index) => (
                  <button 
                    key={index}
                    onClick={() => handleTagChange(tag.id.toString())}
                    className={`px-4 py-2  rounded-full text-gray-700 transition-colors ${activeTag === tag.id.toString() ? 'bg-blue-200 text-blue-600' : 'bg-gray-100 hover:bg-blue-50 hover:text-blue-600'}`}
                  >
                    {tag.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 