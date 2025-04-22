'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaArrowRight, FaCheck } from 'react-icons/fa';

// Type for individual sanatorium that works with all existing implementations
export type SanatoriumItem = {
  id: number | string;
  name: string;
  location?: string;
  address?: string;
  description?: string;
  rating: number;
  price?: number;
  priceRange?: string;
  image?: string;
  images?: string[];
  features?: string[];
};

interface SanatoriumCardProps {
  sanatorium: SanatoriumItem;
  index: number;
  variant?: 'compact' | 'full' | 'feature';
  colorScheme?: 'blue' | 'green';
}

// Individual Sanatorium Card component
const SanatoriumCard = ({ 
  sanatorium, 
  index, 
  variant = 'full',
  colorScheme = 'blue' 
}: SanatoriumCardProps) => {
  const getImage = () => {
    if (sanatorium.image) return sanatorium.image;
    if (sanatorium.images && sanatorium.images.length > 0) return sanatorium.images[0];
    return 'https://via.placeholder.com/400x300?text=No+Image';
  };

  const getLocation = () => {
    return sanatorium.location || sanatorium.address || 'Naftalan, Azerbaijan';
  };

  const getPrice = () => {
    if (sanatorium.price) return `${sanatorium.price} AZN`;
    if (sanatorium.priceRange) return sanatorium.priceRange;
    return '120-200 AZN';
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={getImage()}
          alt={sanatorium.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={colorScheme === 'blue' 
          ? "absolute inset-0 bg-gradient-to-t from-blue-900/50 via-blue-900/20 to-transparent opacity-60"
          : "absolute inset-0 bg-gradient-to-t from-green-900/50 via-green-900/20 to-transparent opacity-60"
        }></div>
        <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full flex items-center text-sm font-medium shadow-md">
          <FaStar className="text-yellow-500 mr-1" />
          <span>{sanatorium.rating.toFixed(1)}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={colorScheme === 'blue' 
            ? "bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
            : "bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
          }>
            {getPrice()}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{sanatorium.name}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <FaMapMarkerAlt className="mr-1" />
            <span>{getLocation()}</span>
          </div>
        </div>
        
        {variant !== 'compact' && sanatorium.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{sanatorium.description}</p>
        )}
        
        {sanatorium.features && sanatorium.features.length > 0 && (
          <div className="mb-6">
            <ul className="space-y-2">
              {(variant === 'compact' ? sanatorium.features.slice(0, 3) : sanatorium.features).map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700 text-sm">
                  <FaCheck className={colorScheme === 'blue' 
                    ? "w-4 h-4 mr-2 text-blue-500 flex-shrink-0"
                    : "w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                  } />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Link 
          href={`/sanatoriums/${sanatorium.id}`}
          className={colorScheme === 'blue'
            ? "w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center justify-center"
            : "w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center"
          }
        >
          <span>Ətraflı məlumat</span>
          <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

interface SanatoriumGridProps {
  sanatoriums: SanatoriumItem[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'compact' | 'full' | 'feature';
  colorScheme?: 'blue' | 'green';
  showAllButton?: boolean;
  allButtonLink?: string;
  allButtonText?: string;
}

// The main SanatoriumGrid component
const SanatoriumGrid = ({
  sanatoriums,
  columns = 3,
  variant = 'full',
  colorScheme = 'blue',
  showAllButton = false,
  allButtonLink = '/sanatoriums',
  allButtonText = 'Bütün sanatoriyalar'
}: SanatoriumGridProps) => {
  let gridCols: string;
  switch (columns) {
    case 1:
      gridCols = 'grid-cols-1';
      break;
    case 2:
      gridCols = 'grid-cols-1 md:grid-cols-2';
      break;
    case 3:
      gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      break;
    case 4:
      gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      break;
    default:
      gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  }

  return (
    <div className="w-full">
      <div className={`grid ${gridCols} gap-6 md:gap-8`}>
        {sanatoriums.map((sanatorium, index) => (
          <SanatoriumCard
            key={sanatorium.id}
            sanatorium={sanatorium}
            index={index}
            variant={variant}
            colorScheme={colorScheme}
          />
        ))}
      </div>
      
      {showAllButton && (
        <div className="text-center mt-12">
          <Link
            href={allButtonLink}
            className={colorScheme === 'blue'
              ? "py-3 px-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl font-medium transform hover:-translate-y-1"
              : "py-3 px-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl font-medium transform hover:-translate-y-1"
            }
          >
            <span>{allButtonText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SanatoriumGrid; 