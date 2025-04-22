'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendarAlt, FaUserFriends, FaSearch, FaFilter, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import SanatoriumCard from '@/features/common/SanatoriumCard';
import { Sanatorium } from '@/lib/types/sanatorium.type';



export default function ReservationPage({ sanatoriums }: { sanatoriums: Sanatorium[] }) {
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with search parameters
    console.log("Search params:", searchParams);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Rezervasiya</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Ən yaxşı naftalan sanatoriyalarında yer rezervasiya edin və sağlamlığınıza qovuşun
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="py-8 bg-white shadow-md relative z-10">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Yer</label>
                <div className="relative">
                  <select
                    id="location"
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Bütün məkanlar</option>
                    <option value="naftalan">Naftalan</option>
                    <option value="ganja">Gəncə</option>
                    <option value="baku">Bakı</option>
                  </select>
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Giriş tarixi</label>
                <div className="relative">
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={searchParams.checkIn}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Çıxış tarixi</label>
                <div className="relative">
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={searchParams.checkOut}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Qonaqlar</label>
                <div className="relative">
                  <select
                    id="guests"
                    name="guests"
                    value={searchParams.guests}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'qonaq' : 'qonaq'}</option>
                    ))}
                  </select>
                  <FaUserFriends className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-blue-500 hover:text-blue-700 font-medium"
              >
                <FaFilter className="mr-2" />
                <span>{showFilters ? 'Filtrləri gizlət' : 'Daha çox filtr'}</span>
              </button>
              
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center"
              >
                <FaSearch className="mr-2" />
                <span>Axtar</span>
              </button>
            </div>
            
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-gray-50 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Qiymət aralığı (AZN)</h3>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <span className="text-gray-700 min-w-[80px] text-center">
                        {priceRange[0]} - {priceRange[1]} AZN
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Xüsusiyyətlər</h3>
                    <div className="space-y-2">
                      {['Wi-Fi', 'Hovuz', 'Spa', 'Fitness', 'Restoran'].map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-500 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Müalicə növləri</h3>
                    <div className="space-y-2">
                      {['Naftalan vannaları', 'Fizioterapiya', 'Masaj', 'Balneologiya', 'Palçıq müalicəsi'].map((treatment) => (
                        <label key={treatment} className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-500 mr-2" />
                          <span className="text-gray-700">{treatment}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
      
      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Mövcud sanatoriyalar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sanatoriums.map((sanatorium, index) => (
              <SanatoriumCard 
                key={sanatorium.id}
                sanatorium={sanatorium}
                index={index}
                variant="full"
                colorScheme="blue"
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/sanatoriums"
              className="py-3 px-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl font-medium transform hover:-translate-y-1"
            >
              <span>Daha çox göstər</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Niyə bizi seçməlisiniz?</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Naftalan müalicəsi üçün ən yaxşı sanatoriyaları təklif edirik
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Ən yaxşı qiymət zəmanəti",
                description: "Biz bazar qiymətlərini daim izləyir və ən əlverişli qiymətləri təklif edirik. Əgər eyni xidməti daha ucuz tapsanız, qiymət fərqini qaytarırıq."
              },
              {
                title: "Professional konsultasiya",
                description: "Təcrübəli mütəxəssislərimiz sizə ən uyğun sanatoriya və müalicə proqramını seçməkdə kömək edəcəklər."
              },
              {
                title: "Etibarlı partnyor",
                description: "Biz yalnız yüksək keyfiyyətli xidmət göstərən, lisenziyalı sanatoriyalarla əməkdaşlıq edirik."
              },
              {
                title: "24/7 dəstək",
                description: "Rezervasiyadan öncə və sonra sizə 24 saat dəstək göstərməyə hazırıq. Suallarınız üçün bizimlə istənilən vaxt əlaqə saxlaya bilərsiniz."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl text-center"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tez-tez verilən suallar</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Rezervasiya haqqında ən çox verilən suallar və cavablar
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Rezervasiya edərkən ödəniş necə edilir?",
                answer: "Rezervasiya edərkən ümumi məbləğin 20%-i qədər depozit ödənişi tələb olunur. Qalan məbləğ sanatoriyaya gəldikdə ödənilir. Ödəniş kredit kartı, bank köçürməsi və ya elektron ödəmə sistemləri vasitəsilə edilə bilər."
              },
              {
                question: "Rezervasiyanı ləğv edə bilərəmmi?",
                answer: "Bəli, rezervasiyanı ləğv edə bilərsiniz. Gəliş tarixindən 7 gün əvvəl edilən ləğvlər üçün tam məbləğ geri qaytarılır. 3-7 gün arasında ləğv edilən rezervasiyalar üçün depozit məbləğinin 50%-i qaytarılır. 3 gündən az qaldıqda edilən ləğvlər üçün depozit məbləği geri qaytarılmır."
              },
              {
                question: "Müalicə paketləri nələri əhatə edir?",
                answer: "Müalicə paketləri adətən qalma, gündəlik qidalanma, həkim konsultasiyası və təyin edilmiş naftalan müalicə prosedurlarını əhatə edir. Hər bir paketin dəqiq tərkibi sanatoriyadan asılı olaraq dəyişə bilər və rezervasiya zamanı təfərrüatları ilə qeyd olunur."
              },
              {
                question: "Uşaqlar üçün xüsusi endirim varmı?",
                answer: "Bəli, əksər sanatoriyalar uşaqlar üçün xüsusi endirimlər təklif edir. Adətən 0-6 yaş arası uşaqlar üçün qalma pulsuzdur (əlavə yataq təmin edilir), 7-12 yaş arası uşaqlar üçün isə 30-50% endirim tətbiq olunur. Hər bir sanatoriya üçün dəqiq şərtlər rezervasiya zamanı göstərilir."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <a
              href="/faq"
              className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium"
            >
              Bütün sualları görmək üçün
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 