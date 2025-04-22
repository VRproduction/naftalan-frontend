'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaGlobe, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaSpa, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

export type Sanatorium = {
  id: number;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  description: string;
  images: string[];
  features: string[];
  priceRange: string;
};

interface SanatoriumProps {
  sanatorium: Sanatorium;
  index?: number;
}

export default function Sanatorium({ sanatorium, index = 0 }: SanatoriumProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const renderFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'wifi':
        return <FaWifi className="text-blue-500" title="Wi-Fi" />;
      case 'pool':
        return <FaSwimmingPool className="text-blue-500" title="Hovuz" />;
      case 'parking':
        return <FaParking className="text-blue-500" title="Dayanacaq" />;
      case 'restaurant':
        return <FaUtensils className="text-blue-500" title="Restoran" />;
      case 'spa':
        return <FaSpa className="text-blue-500" title="SPA" />;
      case 'security':
        return <FaShieldAlt className="text-blue-500" title="Təhlükəsizlik" />;
      default:
        return null;
    }
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      variants={fadeInUpVariant}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="grid md:grid-cols-3 h-full">
        <div className="relative h-64 md:h-full md:col-span-1">
          <Image 
            src={sanatorium.images[0]} 
            alt={sanatorium.name} 
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-6 md:col-span-2">
          <div className="flex flex-wrap items-start justify-between mb-4">
            <Link href={`/sanatoriums/${sanatorium.id}`} className="hover:text-blue-600 transition-colors">
              <h3 className="text-2xl font-bold text-gray-800">{sanatorium.name}</h3>
            </Link>
            <div className="flex items-center mt-1 md:mt-0">
              <div className="flex mr-2">{renderStars(sanatorium.rating)}</div>
              <span className="text-lg font-semibold text-gray-700">{sanatorium.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1 text-blue-500" />
              <span>{sanatorium.address}</span>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <FaPhoneAlt className="mr-1 text-blue-500" />
              <span>{sanatorium.phone}</span>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <FaGlobe className="mr-1 text-blue-500" />
              <a href={sanatorium.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Veb sayt
              </a>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{sanatorium.description}</p>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              {sanatorium.features.map((feature, i) => (
                <div key={i} className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50">
                  {renderFeatureIcon(feature)}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
              <div className="text-sm font-medium text-gray-500">
                Qiymət: <span className="text-blue-500">{sanatorium.priceRange}</span>
              </div>
              
              <Link 
                href={`/sanatoriums/${sanatorium.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Ətraflı <FaArrowRight className="ml-1" />
              </Link>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isExpanded ? 'Bağla' : 'Daha çox'}
              </button>
            </div>
          </div>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Fotolar</h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {sanatorium.images.map((image, i) => (
                  <div key={i} className="relative h-32 rounded-lg overflow-hidden">
                    <Image 
                      src={image} 
                      alt={`${sanatorium.name} - foto ${i+1}`} 
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-4">
                <Link 
                  href="/contact"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Rezervasiya et
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
