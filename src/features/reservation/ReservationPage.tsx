'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUserFriends, FaSearch, FaFilter, FaMapMarkerAlt } from 'react-icons/fa';
import SanatoriumCard from '@/features/common/SanatoriumCard';
import { Sanatorium } from '@/lib/types/sanatorium.type';
import { useTranslations } from 'next-intl';

export default function ReservationPage({ sanatoriums }: { sanatoriums: Sanatorium[] }) {
  const t = useTranslations('pages.reservation');
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
    <div>
      {/* Enhanced Search Section */}
      <div className="pt-12 pb-16 bg-gradient-to-b from-blue-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{t('title')}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSearch}>
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <div className="relative">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">{t('search.location.label')}</label>
                    <div className="relative group">
                      <select
                        id="location"
                        name="location"
                        value={searchParams.location}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:border-blue-300"
                      >
                        <option value="">{t('search.location.options.all')}</option>
                        <option value="naftalan">{t('search.location.options.naftalan')}</option>
                        <option value="ganja">{t('search.location.options.ganja')}</option>
                        <option value="baku">{t('search.location.options.baku')}</option>
                      </select>
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                    </div>
                  </div>
              
                  <div>
                    <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">{t('search.check_in.label')}</label>
                    <div className="relative group">
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={searchParams.checkIn}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:border-blue-300"
                      />
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                    </div>
                  </div>
              
                  <div>
                    <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">{t('search.check_out.label')}</label>
                    <div className="relative group">
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={searchParams.checkOut}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:border-blue-300"
                      />
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                    </div>
                  </div>
              
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">{t('search.guests.label')}</label>
                    <div className="relative group">
                      <select
                        id="guests"
                        name="guests"
                        value={searchParams.guests}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white hover:border-blue-300"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} {t('search.guests.person')}</option>
                        ))}
                      </select>
                      <FaUserFriends className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                    </div>
                  </div>
                </div>
            
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    <FaFilter className="mr-2" />
                    <span>{showFilters ? t('search.filters.hide') : t('search.filters.show')}</span>
                  </button>
              
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 font-medium transform hover:-translate-y-0.5"
                  >
                    <FaSearch className="mr-1" />
                    <span>{t('search.search_button')}</span>
                  </button>
                </div>
              </div>
            
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 py-6 bg-gray-50 border-t border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('search.filters.price_range')}</h3>
                      <div className="flex flex-col space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="500"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full accent-blue-500"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">{priceRange[0]} AZN</span>
                          <span className="text-gray-700 font-medium">{priceRange[1]} AZN</span>
                        </div>
                      </div>
                    </div>
                  
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('search.filters.features.title')}</h3>
                      <div className="space-y-2 grid grid-cols-1 md:grid-cols-2">
                        {['wifi', 'pool', 'spa', 'fitness', 'restaurant'].map((feature) => (
                          <label key={feature} className="flex items-center hover:bg-gray-100 p-1.5 rounded-md transition-colors">
                            <input type="checkbox" className="rounded text-blue-500 mr-2 focus:ring-blue-400" />
                            <span className="text-gray-700">{t(`search.filters.features.${feature}`)}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('search.filters.treatments.title')}</h3>
                      <div className="space-y-2 grid grid-cols-1">
                        {['naftalan_baths', 'physiotherapy', 'massage', 'balneology', 'mud_therapy'].map((treatment) => (
                          <label key={treatment} className="flex items-center hover:bg-gray-100 p-1.5 rounded-md transition-colors">
                            <input type="checkbox" className="rounded text-blue-500 mr-2 focus:ring-blue-400" />
                            <span className="text-gray-700">{t(`search.filters.treatments.${treatment}`)}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
      
      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">{t('results.title')}</h2>
          
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
        </div>
      </section>
    </div>
  );
} 