'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTag, FaSearch, FaLongArrowAltRight } from 'react-icons/fa';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Naftalan neftinin sağlamlıq üçün 10 əsas faydası",
    slug: "naftalan-neftinin-saglamliq-ucun-10-esas-faydasi",
    excerpt: "Naftalan nefti əsrlərdir ki, müxtəlif xəstəliklərin müalicəsində istifadə olunur. Bu unikal təbii resursun orqanizmə olan müsbət təsirləri elmi cəhətdən sübut edilmişdir.",
    image: "/images/blog-1.jpg",
    date: "2023-05-15",
    author: "Dr. Əli Məmmədov",
    category: "Sağlamlıq",
    tags: ["naftalan", "sağlamlıq", "müalicə", "təbii vasitələr"]
  },
  {
    id: 2,
    title: "Artrit və artroz: Naftalan müalicəsinin effektivliyi",
    slug: "artrit-artroz-naftalan-mualicesinin-effektivliyi",
    excerpt: "Oynaq xəstəlikləri milyonlarla insanın həyatına təsir edir. Naftalan müalicəsinin artrit və artroz xəstəliklərinə qarşı necə kömək etdiyini öyrənin.",
    image: "/images/blog-2.jpg",
    date: "2023-06-22",
    author: "Dr. Leyla Əliyeva",
    category: "Müalicə",
    tags: ["artrit", "artroz", "oynaq xəstəlikləri", "naftalan müalicəsi"]
  },
  {
    id: 3,
    title: "Psoriaz və ekzema: Naftalan ilə dəri problemlərinin həlli",
    slug: "psoriaz-ekzema-naftalan-ile-deri-problemlerinin-helli",
    excerpt: "Dəri xəstəlikləri fiziki və psixoloji cəhətdən insanlara böyük narahatlıq yaradır. Naftalan müalicəsi psoriaz və ekzema kimi xəstəliklərin müalicəsində necə effektiv ola bilər?",
    image: "/images/blog-3.jpg",
    date: "2023-07-10",
    author: "Dr. Əli Məmmədov",
    category: "Dermatoloji",
    tags: ["psoriaz", "ekzema", "dəri xəstəlikləri", "naftalan müalicəsi"]
  },
  {
    id: 4,
    title: "Naftalan sanatoriyalarında müalicə: Nə gözləməli?",
    slug: "naftalan-sanatoriyalarinda-mualice-ne-gozlemeli",
    excerpt: "Naftalan sanatoriyasında müalicə kursu necə keçir? Bu məqalədə ilk dəfə naftalan ilə müalicə olunacaq xəstələr üçün faydalı məlumatlar və tövsiyələr təqdim olunur.",
    image: "/images/blog-4.jpg",
    date: "2023-08-05",
    author: "Elnarə Hüseynova",
    category: "Təcrübə",
    tags: ["sanatoriya", "müalicə kursu", "naftalan", "səyahət"]
  },
  {
    id: 5,
    title: "Naftalan nefti və müasir tibb: Elmi araşdırmaların nəticələri",
    slug: "naftalan-nefti-muasir-tibb-elmi-arastirmalarin-neticeleri",
    excerpt: "Müasir elm Naftalan neftinin müalicəvi xüsusiyyətlərini necə izah edir? Son illər ərzində aparılan elmi tədqiqatların nəticələri və gələcək perspektivlər.",
    image: "/images/blog-5.jpg",
    date: "2023-09-18",
    author: "Prof. Ruslan Həsənov",
    category: "Elm",
    tags: ["elmi tədqiqatlar", "müasir tibb", "naftalan", "müalicə"]
  },
  {
    id: 6,
    title: "Ginekoloji problemlər: Naftalan müalicəsinin rolu",
    slug: "ginekoloji-problemler-naftalan-mualicesinin-rolu",
    excerpt: "Qadın sağlamlığı üçün Naftalan müalicəsinin faydaları nələrdir? Ginekoloji xəstəliklərin müalicəsində Naftalan neftinin effektivliyi haqqında məlumat.",
    image: "/images/blog-6.jpg",
    date: "2023-10-07",
    author: "Dr. Leyla Əliyeva",
    category: "Qadın sağlamlığı",
    tags: ["ginekologiya", "qadın sağlamlığı", "naftalan", "müalicə"]
  }
];

// Unique categories and tags from blog posts
const categories = [...new Set(blogPosts.map(post => post.category))];
const allTags = blogPosts.flatMap(post => post.tags);
const tags = [...new Set(allTags)];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Hamısı');
  
  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Hamısı' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The state is already updated through the input onChange
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
              <button
                onClick={() => setActiveCategory('Hamısı')}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === 'Hamısı' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hamısı
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-56">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {new Date(post.date).toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span className="flex items-center">
                        <FaUser className="mr-1" />
                        {post.author}
                      </span>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`} className="block">
                      <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">{post.title}</h2>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                        <FaTag className="inline mr-1" />
                        {post.category}
                      </span>
                      
                      <Link 
                        href={`/blog/${post.slug}`}
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
                    setActiveCategory('Hamısı');
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Bütün məqalələri göstər
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Popular Tags */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Populyar teqlər</h2>
            
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Subscribe Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Yeniliklərdən xəbərdar olun</h2>
            <p className="text-gray-600 mb-8">
              E-poçt ünvanınızı daxil edin və ən son məqalələr, tədbirlər və xüsusi təkliflər haqqında məlumat alın.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="E-poçt ünvanınız"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors sm:whitespace-nowrap"
                >
                  Abunə ol
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Biz sizin məxfiliyinizə hörmət edirik. Siz istənilən vaxt abunəlikdən imtina edə bilərsiniz.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 