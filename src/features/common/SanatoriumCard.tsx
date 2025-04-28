'use client';

import { Sanatorium } from '@/lib/types/sanatorium.type';
import { useCurrency } from '@/lib/utils/currency';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { FaStar, FaMapMarkerAlt, FaArrowRight, FaCheck } from 'react-icons/fa';
import { useTranslations } from 'next-intl';



interface SanatoriumCardProps {
  sanatorium: Sanatorium;
  index?: number;
  variant?: 'compact' | 'full' | 'feature';
  colorScheme?: 'blue' | 'green';
}

export default function SanatoriumCard({ 
  sanatorium, 
  index = 0, 
  variant = 'full',
  colorScheme = 'blue' 
}: SanatoriumCardProps) {


  const t = useTranslations('sanatorium');
  const { formatPrice } = useCurrency();


  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
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
      className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={sanatorium.main_image.image}
          alt={sanatorium.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={colorScheme === 'blue' 
          ? "absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/30 to-transparent opacity-60"
          : "absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-900/30 to-transparent opacity-60"
        }></div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full flex items-center text-sm font-medium shadow-sm">
          <div className="flex mr-1">
            {renderStars(Number(sanatorium.rating))}
          </div>
          <span>{Number(sanatorium.rating).toFixed(1)}</span>
        </div>
        
        {/* Price Badge */}
        {
          sanatorium.min_price && (
           <div className="absolute bottom-4 left-4">
            <span className={colorScheme === 'blue' 
              ? "bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
              : "bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
            }>
              {formatPrice(sanatorium.min_price)}
            </span>
          </div> 
          )
        }
        
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{sanatorium.name}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <FaMapMarkerAlt className="mr-1 text-gray-400" />
            <span>{sanatorium.location.region + ', ' + sanatorium.location.country}</span>
          </div>
        </div>
        
        {variant !== 'compact' && sanatorium.short_description && (
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">{sanatorium.short_description}</p>
        )}
        
        {sanatorium.facilities && sanatorium.facilities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {(variant === 'compact' ? sanatorium.facilities.slice(0, 3) : sanatorium.facilities.slice(0, 4)).map((feature, idx) => (
                <span key={idx} className={`inline-flex items-center text-xs ${
                  colorScheme === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                } rounded-md px-2 py-1`}>
                  <FaCheck className="w-3 h-3 mr-1 flex-shrink-0" />
                  {feature.facility.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <Link 
          href={`/sanatoriums/${sanatorium.slug}`}
          className={`w-full mt-2 py-2.5 px-4 ${
            colorScheme === 'blue'
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          } rounded-lg transition-colors text-sm font-medium flex items-center justify-center shadow-sm`}
        >
          <span>{t('details')}</span>
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
} 