'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaTag, FaSearch, FaLongArrowAltRight } from 'react-icons/fa';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { SupportedLocale } from '@/lib/utils/apiClient';
import { useSearchParams } from 'next/navigation';
import { BlogCategory, BlogPost, BlogTag } from '@/lib/types/blog.type';
import { formatDate } from '@/lib/utils/timeUtils';

interface Props {
  blogs: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];  
}


export default function BlogPage({ blogs, categories, tags }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const locale = useLocale() as SupportedLocale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const activeTag = searchParams.get('tag');
  
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search params
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    
    if (activeCategory) {
      params.set('category', activeCategory);
    } else {
      params.delete('category');
    }
    
    const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl);
  };
  
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
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Bloq</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Naftalan müalicəsi, sağlamlıq və sağlam həyat tərzi haqqında faydalı məqalələr
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Search and Categories */}
      <div className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <form onSubmit={handleSearch} className="w-full md:w-auto flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Məqalələri axtar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            
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
                blogs.map((blog) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href={`/blog/${blog.slug}`} className="block">
                      <div className="relative h-56">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {formatDate(blog.date)}
                        </span>
                      </div>
                      
                      <Link href={`/blog/${blog.slug}`} className="block">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2">{blog.title}</h2>
                      </Link>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{blog.short_description}</p>
                      
                      <div className="flex items-center justify-between">
                      
                        
                        <Link 
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium"
                        >
                          Ətraflı oxu
                          <FaLongArrowAltRight className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl text-gray-700 mb-4">Axtarışınıza uyğun məqalə tapılmadı</h3>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      handleCategoryChange('Hamısı');
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Bütün məqalələri göstər
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
              <h2 className="text-2xl font-bold mb-8 text-center">Populyar teqlər</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {tags.map((tag, index) => (
                  <button 
                    key={index}
                    onClick={() => handleTagChange(tag.id.toString())}
                    className={`px-4 py-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-full text-gray-700 transition-colors ${activeTag === tag.id.toString() ? 'bg-blue-50 text-blue-600' : ''}`}
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