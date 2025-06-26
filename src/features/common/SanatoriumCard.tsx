'use client';

import { Sanatorium } from '@/lib/types/sanatorium.type';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
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
  const { formatPrice } = useCurrencyStore();

  // Pricing logic - rewritten from scratch
  const pricing = sanatorium.min_price_details?.pricing;
  const discount = pricing?.discount;
  
  // Calculate base prices
  const originalPrice = pricing?.total_price || pricing?.final_price || 0;
  const discountedPrice = pricing?.total_discount_price || discount?.discounted_price || 0;
  
  // Determine if there's a valid discount
  const hasValidDiscount = discount && 
    (discount.amount || 0) > 0 && 
    discountedPrice > 0 && 
    discountedPrice < originalPrice;
  
  // Final price to display
  const displayPrice = hasValidDiscount ? discountedPrice : originalPrice;
  
  // Price display flags
  const hasPrice = originalPrice > 0;
  const showDiscount = hasValidDiscount;
  
  // Discount formatter
  const getDiscountLabel = () => {
    if (!hasValidDiscount) return null;
    
    const discountType = discount?.type || 'percentage';
    const discountValue = discount?.value || 0;
    
    if (discountType === 'percentage') {
      return `-${discountValue}%`;
    }
    return t('discount.special_offer');
  };

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
          src={sanatorium.main_image?.image || '/images/placeholder.svg'}
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
        
        {/* Price Badge - Modern Design */}
        {hasPrice && (
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
            {/* Discount Badge */}
            {showDiscount && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transform -rotate-2">
                {getDiscountLabel()}
              </div>
            )}
            
            {/* Main Price Badge */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              {showDiscount && displayPrice < originalPrice && (
                <div className="px-4 py-1 bg-gray-100 border-b border-gray-200">
                  <span className="text-xs text-gray-500 line-through font-medium">
                    {formatPrice(originalPrice)}
                  </span>
                </div>
              )}
              <div className="px-4 py-2">
                <span className={`text-lg font-bold ${
                  colorScheme === 'blue' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  {formatPrice(displayPrice)}
                </span>
                <div className="text-xs text-gray-500 mt-0.5">
                  {t('starting_price')}
                </div>
              </div>
            </div>
          </div>
        )}
        
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