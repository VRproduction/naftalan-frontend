'use client'

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { Link } from "@/i18n/navigation";
import { BlogPost } from "@/lib/types/blog.type";
import { formatDate } from "@/lib/utils/timeUtils";

interface BlogPostDetailPageProps {
  blogPost: BlogPost;
}

const BlogPostDetailPage: React.FC<BlogPostDetailPageProps> = ({ 
  blogPost
}) => {


  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[500px]">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          fill
          priority
          style={{ objectFit: "cover" }}
          className="brightness-[0.7]"
        />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div 
            className="text-center max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{blogPost.title}</h1>
            <div className="flex items-center justify-center gap-4 text-white/90 text-sm md:text-base">
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {formatDate(blogPost.date)}
              </span>
             
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Blog Text Content */}
            <div className="custom-html-content prose prose-lg max-w-none mb-10" dangerouslySetInnerHTML={{ __html: blogPost.description }} />
            
            {/* Tags */}
            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className="border-t border-b border-gray-200 py-6 my-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-700 font-medium">Teqlər:</span>
                  {blogPost.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      href={`/blog?tag=${tag.id}`}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Share */}
            <div className="mt-10">
              <h4 className="text-xl font-bold mb-4">Bu məqaləni paylaşın</h4>
              <div className="flex gap-2">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3b5998] text-white hover:opacity-90 transition-opacity"
                >
                  <FaFacebookF />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blogPost.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1da1f2] text-white hover:opacity-90 transition-opacity"
                >
                  <FaTwitter />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(blogPost.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077b5] text-white hover:opacity-90 transition-opacity"
                >
                  <FaLinkedinIn />
                </a>
                <a 
                  href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blogPost.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0088cc] text-white hover:opacity-90 transition-opacity"
                >
                  <FaTelegramPlane />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {blogPost.other_blogs.length > 0 && (
        <div className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Oxşar məqalələr</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPost.other_blogs.map((post) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </Link>
                    
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {formatDate(post.date)}
                        </span>
                      </div>
                      
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">{post.short_description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostDetailPage; 