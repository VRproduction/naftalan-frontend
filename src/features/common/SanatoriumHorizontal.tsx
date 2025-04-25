'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaGlobe, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaSpa, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { Sanatorium } from '@/lib/types/sanatorium.type';
import { useCurrency } from '@/lib/utils/currency';



interface SanatoriumProps {
  sanatorium: Sanatorium;
  index?: number;
}

export default function SanatoriumHorizontal({ sanatorium, index = 0 }: SanatoriumProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { formatPrice } = useCurrency();

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
            src={sanatorium.main_image.image} 
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
              <div className="flex mr-2">{renderStars(Number(sanatorium.rating))}</div>
              <span className="text-lg font-semibold text-gray-700">{sanatorium.rating}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1 text-blue-500" />
              <span>{sanatorium.location.region}, {sanatorium.location.country}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{sanatorium.short_description}</p>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              {sanatorium.facilities.map((facility, i) => facility.facility.icon && (
                <div key={i} className="w-8 h-8 flex items-center justify-center rounded-full ">
                    <Image
                      src={facility.facility.icon}
                      alt={facility.facility.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                </div>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
              <div className="text-sm font-medium text-gray-500">
                Qiymət: <span className="text-blue-500">{formatPrice(sanatorium.min_price || 0)}</span>
              </div>
              
              <Link 
                href={`/sanatoriums/${sanatorium.slug}`}
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
                      src={image.image} 
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
