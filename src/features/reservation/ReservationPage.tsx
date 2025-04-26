'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
        
        </div>
      </section>
      
   
    </div>
  );
} 