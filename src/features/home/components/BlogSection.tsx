import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

import { BlogSection as BlogSectionType } from '@/lib/types/home.type';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Naftalan neftinin sağlamlıq üçün 5 faydası',
    excerpt: 'Naftalan neftinin dəri xəstəlikləri, oynaq ağrıları və digər sağlamlıq problemləri üçün əsas faydalarını kəşf edin.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
    date: '2023-06-12',
    author: 'Dr. Əli Hüseynov',
    category: 'Sağlamlıq'
  },
  {
    id: 2,
    title: 'Naftalan müalicəsindən əvvəl bilməli olduğunuz məqamlar',
    excerpt: 'Naftalan müalicəsinə başlamazdan əvvəl nəzərə almalı olduğunuz vacib məqamlar və hazırlıq mərhələləri.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
    date: '2023-05-28',
    author: 'Dr. Aygün Məmmədova',
    category: 'Müalicə'
  },
  {
    id: 3,
    title: 'Naftalanın tarixi: keçmişdən bu günə',
    excerpt: 'Naftalan neftinin kəşfindən müasir zamana qədər olan tarixi və Naftalan şəhərinin inkişaf mərhələləri.',
    image: 'https://images.unsplash.com/photo-1509475826633-fed577a2c71b',
    date: '2023-04-15',
    author: 'Cavid Əliyev',
    category: 'Tarix'
  }
];

const BlogCard = ({ post, index }: { post: typeof blogPosts[0], index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative h-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <div className="flex items-center mr-4">
            <FaCalendarAlt className="mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <FaUser className="mr-1" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.id}`}
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
        >
          Ətraflı oxu
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

interface BlogSectionProps {
  blogSection: BlogSectionType;
}

const BlogSection = ({ blogSection }: BlogSectionProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {blogSection.title}
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            {blogSection.section_description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors inline-block"
          >
            Bütün bloq yazıları
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 