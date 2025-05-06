'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { FaStar, FaMapMarkerAlt, FaArrowRight, FaMedal, FaCheck, FaBath, FaWifi, FaParking, FaConciergeBell, FaHeart, FaShare, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { Sanatorium } from '@/lib/types/sanatorium.type';
import { useTranslations } from 'next-intl';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';

interface SanatoriumProps {
  sanatorium: Sanatorium;
  index?: number;
}

export default function SanatoriumHorizontal({ sanatorium, index = 0 }: SanatoriumProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { formatPrice } = useCurrencyStore();
  const t = useTranslations('sanatorium');
  const commonT = useTranslations('common');

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

 
  // Simple price handling
  const basePrice = sanatorium.min_price || 0;
  const hasDiscount = !!sanatorium.min_price_details?.pricing?.discount;
  const discountedPrice = sanatorium.min_price_details?.pricing?.discount?.discounted_price || 0;
  const finalPrice = hasDiscount && discountedPrice > 0 ? discountedPrice : basePrice;
  const totalPrice = sanatorium.total_discount_price || sanatorium.total_price || sanatorium.min_price_details?.pricing?.discount?.discounted_price || basePrice;
  // Estimate original total price based on the discount percentage if available
  const discountPercent = hasDiscount && sanatorium.min_price_details?.pricing?.discount?.type === 'percentage' 
    ? sanatorium.min_price_details?.pricing?.discount?.value || 0 
    : 0;
  const originalTotalPrice = hasDiscount && totalPrice > 0 
    ? totalPrice * (100 / (100 - discountPercent)) 
    : totalPrice;
  const roomName = sanatorium.min_price_details?.room?.name || '';
  const seasonName = sanatorium.min_price_details?.season?.name || '';
  const hasPrice = basePrice > 0;
  const roomCapacity = sanatorium.min_price_details?.room?.max_capacity || 0;
  const roomSize = sanatorium.min_price_details?.room?.size || 0;
  const seasonIsCurrent = sanatorium.min_price_details?.season?.is_current || false;
  const showTotal = totalPrice > finalPrice;
  const showDiscount = hasDiscount && discountPercent > 0;
  
  // Calculate nights dynamically if possible
  const nights = (() => {
    if (sanatorium.min_price_details?.season) {
      const startDate = sanatorium.min_price_details.season.start_date;
      const endDate = sanatorium.min_price_details.season.end_date;
      if (startDate && endDate) {
        try {
          const start = new Date(startDate);
          const end = new Date(endDate);
          // Calculate difference in days
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays > 0 ? diffDays : 1;
        } catch (e) {
          return 1;
        }
      }
    }
    // Default to 1 night if no data available
    return 1;
  })();
  
  // Simple discount formatter
  const getDiscount = () => {
    if (!hasDiscount) return null;
    
    const discountType = sanatorium.min_price_details?.pricing?.discount?.type || '';
    const discountValue = sanatorium.min_price_details?.pricing?.discount?.value || 0;
    
    if (discountType === 'percentage') {
      return `-${discountValue}%`;
    }
    return t('discount.special_offer');
  };
  
  // Simple price label
  const getPriceLabel = () => {
    if (!hasPrice) return t('price.contact_for_price');
    
    const isPricePerNight = sanatorium.min_price_details?.result?.pricing_method === 'per_night';
    const isPricePerPerson = sanatorium.min_price_details?.result?.pricing_method === 'per_person';
    
    if (isPricePerNight) {
      return t('price.per_night');
    }
    
    if (isPricePerPerson) {
      return t('price.per_person');
    }
    
    return t('price.for_stay');
  };

  // Extract facilities data
  const facilitiesWithIcons = sanatorium.facilities.filter(f => f.facility.icon);

 

  // Mobile view
  if (isMobile) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        variants={fadeInUpVariant}
        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
      >
        <div className="flex flex-col">
          {/* Image Section - similar to desktop but adapted for mobile */}
          <div className="relative h-48">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
            <Image 
              src={sanatorium.main_image?.image || '/images/placeholder.svg'} 
              alt={sanatorium.name} 
              fill
              className="object-cover"
            />
            
            {/* Featured badge */}
            {sanatorium.in_home && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs py-1.5 px-3 rounded-full flex items-center z-20 shadow-lg">
                <FaMedal className="mr-1.5" />
                <span className="font-medium">{t('featured')}</span>
              </div>
            )}
            
            {/* Location type badge */}
            {sanatorium.location_type && (
              <div className="absolute top-3 left-3 mt-8 bg-gradient-to-r from-teal-500 to-teal-700 text-white text-xs py-1 px-2 rounded-full z-20 shadow-sm">
                {sanatorium.location_type === "naftalan" ? t('location_type.naftalan') : t('location_type.other_city')}
              </div>
            )}

            {/* Rating stars */}
            <div className="absolute top-3 right-3 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 z-20 shadow-sm">
              <div className="flex items-center">
                {renderStars(Number(sanatorium.rating))}
              </div>
            </div>
            
            {/* Active badge */}
            {!sanatorium.is_active && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
                <div className="bg-red-600/90 text-white px-4 py-2 rounded-lg shadow-lg rotate-12">
                  <span className="font-bold text-lg">{t('status.unavailable')}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Content Section - Similar to desktop middle section */}
          <div className="p-4 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-start justify-between mb-2">
                <Link href={`/sanatoriums/${sanatorium.slug}`} className="hover:text-blue-700 transition-colors">
                  <h3 className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors">{sanatorium.name}</h3>
                </Link>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <FaMapMarkerAlt className="mr-1.5 text-blue-600" />
                <span>{sanatorium.location.region}, {sanatorium.location.country}</span>
              </div>
            </div>
          </div>
          
          {/* Price and CTA Section - Similar to desktop right section */}
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
            {/* Price information */}
            <div className="flex items-center p-3 bg-blue-50 rounded-lg mb-3">
              {hasPrice ? (
                <div className="flex-1">
                  {/* Price tag with discount/season info */}
                  <div className="flex mb-2">
                    {showDiscount && (
                      <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md font-medium mr-2">
                        {getDiscount()}
                      </div>
                    )}
                    
                    {seasonName && (
                      <div className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-md font-medium">
                        {seasonIsCurrent ? t('season.current_season') : t('season.name', { name: seasonName })}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {showDiscount && basePrice > finalPrice && (
                        <div className="text-sm line-through text-gray-500 mb-1">{formatPrice(basePrice)}</div>
                      )}
                      <div className="text-xl font-bold text-blue-700">
                        {formatPrice(finalPrice)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {getPriceLabel()}
                      </div>
                    </div>
                    
                    {showTotal && (
                      <div className="text-sm font-semibold text-blue-800 bg-blue-100 rounded px-2 py-1 inline-block">
                        {showDiscount ? (
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(Math.round(originalTotalPrice))}
                            </span>
                            <span>{formatPrice(totalPrice)}</span>
                          </div>
                        ) : (
                          <>{t('price.total')}: {formatPrice(totalPrice)}</>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            
            {/* Action buttons in a row */}
            <div className="flex gap-2">
              <Link 
                href={`/sanatoriums/${sanatorium.slug}`}
                className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center rounded-lg font-medium flex items-center justify-center"
              >
                {t('details')}
                <FaArrowRight className="ml-2" />
              </Link>
              
              {sanatorium.images.length > 1 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-3 py-2.5 border border-blue-600 text-blue-700 text-center rounded-lg text-sm font-medium flex items-center"
                >
                  {isExpanded ? <FaTimes /> : <FaChevronDown />}
                </button>
              )}
            </div>
          </div>
          
          {/* Expanded Section */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 p-4 bg-gradient-to-b from-gray-50 to-white"
            >
              {/* Only show photos section if there's more than one image */}
              {sanatorium.images.length > 1 && (
                <>
                  <h4 className="text-base font-semibold mb-3 text-gray-800 flex items-center">
                    <span className="bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                      <FaStar className="text-blue-600 text-xs" />
                    </span>
                    {t('photos')}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {sanatorium.images.slice(0, 4).map((image, i) => (
                      <div key={i} className="relative h-24 rounded-lg overflow-hidden shadow-md">
                        <Image 
                          src={image.image} 
                          alt={`${sanatorium.name} - ${t('photo')} ${i+1}`} 
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <Link 
                href={`/sanatoriums/${sanatorium.slug}`}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md font-medium flex items-center justify-center mt-3"
              >
                {t('book_now')} <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  // Desktop view
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      variants={fadeInUpVariant}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="grid md:grid-cols-12 h-full">
        {/* Left Image Section */}
        <div className="relative h-72 md:h-full md:col-span-4 lg:col-span-4 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
          <Image 
            src={sanatorium.main_image?.image || '/images/placeholder.svg'} 
            alt={sanatorium.name} 
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Featured badge - use in_home instead of is_featured */}
          {sanatorium.in_home && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs py-1.5 px-3 rounded-full flex items-center z-20 shadow-lg">
              <FaMedal className="mr-1.5" />
              <span className="font-medium">{t('featured')}</span>
            </div>
          )}
          
          {/* Location type badge */}
          {sanatorium.location_type && (
            <div className="absolute top-4 left-4 mt-8 bg-gradient-to-r from-teal-500 to-teal-700 text-white text-xs py-1 px-2 rounded-full z-20 shadow-sm">
              {sanatorium.location_type === "naftalan" ? t('location_type.naftalan') : t('location_type.other_city')}
            </div>
          )}
          
          {/* Active/Inactive overlay */}
          {!sanatorium.is_active && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
              <div className="bg-red-600/90 text-white px-6 py-3 rounded-lg shadow-lg rotate-12">
                <span className="font-bold text-xl">{t('status.unavailable')}</span>
              </div>
            </div>
          )}
          
          {/* Image counter badge */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs py-1 px-2 rounded-md z-20">
            {t('photos_count', { count: sanatorium.images.length })}
          </div>
          
          {/* Quick view button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            {sanatorium.images.length > 1 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white/90 hover:bg-white text-blue-800 font-medium py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                {t('quick_view')}
              </button>
            )}
          </div>
        </div>
        
        {/* Middle Content Section */}
        <div className="p-5 md:p-6 md:col-span-5 lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
          <div>
            <div className="flex flex-wrap items-start justify-between mb-3">
              <Link href={`/sanatoriums/${sanatorium.slug}`} className="hover:text-blue-700 transition-colors">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-700 transition-colors">{sanatorium.name}</h3>
              </Link>
              
              {/* Rating stars only */}
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-md">
                {renderStars(Number(sanatorium.rating))}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaMapMarkerAlt className="mr-1.5 text-blue-600" />
              <span className="inline-block border-b border-dashed border-gray-300 hover:text-blue-600 cursor-pointer">{sanatorium.location.region}, {sanatorium.location.country}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium">{t('show_on_map')}</span>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm line-clamp-2">{sanatorium.short_description}</p>
           
            
            <div className="hidden md:flex flex-wrap gap-2 mb-3">
              {sanatorium.facilities.slice(0, 5).map((facility, i) => (
                <div key={i} className="flex items-center px-2.5 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full text-xs text-blue-700 shadow-sm">
                  <FaCheck className="mr-1 text-xs" />
                  {facility.facility.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Pricing & CTA Section */}
        <div className="p-5 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 md:col-span-3 lg:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200">
          {/* Desktop view price information section */}
          <div className="flex items-center p-3 bg-blue-50 rounded-lg mb-4">
            {hasPrice ? (
              <div className="flex-1 text-center md:text-left">
                {/* Price tag with discount/season info */}
                <div className="flex mb-2">
                  {showDiscount && (
                    <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md font-medium mr-2">
                      {getDiscount()}
                    </div>
                  )}
                  
                  {seasonName && (
                    <div className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-md font-medium">
                      {seasonIsCurrent ? t('season.current_season') : t('season.name', { name: seasonName })}
                    </div>
                  )}
                </div>
                
                {showDiscount && basePrice > finalPrice && (
                  <div className="text-sm line-through text-gray-500 mb-1">{formatPrice(basePrice)}</div>
                )}
                <div className="text-2xl font-bold text-blue-700">
                  {formatPrice(finalPrice)}
                </div>
                {showTotal && (
                  <div className="text-sm font-semibold text-blue-800 bg-blue-100 rounded px-2 py-1 mt-1 inline-block">
                    {showDiscount ? (
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 line-through mr-2">
                          {formatPrice(Math.round(originalTotalPrice))}
                        </span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    ) : (
                      <>{t('price.total')}: {formatPrice(totalPrice)}</>
                    )}
                  </div>
                )}
                
                {roomName && (
                  <div className="mt-1 text-xs text-gray-700">
                    <span className="font-medium">{roomName}</span>
                  
                  </div>
                )}
              </div>
            ) : null}
          </div>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col space-y-3">
            <Link 
              href={`/sanatoriums/${sanatorium.slug}`}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md font-medium flex items-center justify-center"
            >
              {t('details')}
              <FaArrowRight className="ml-2" />
            </Link>
            
            {sanatorium.images.length > 1 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-4 py-2.5 border border-blue-600 text-blue-700 text-center rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                {isExpanded ? t('close') : t('show_more')}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Expanded Section */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-200 p-6 bg-gradient-to-b from-gray-50 to-white"
        >
          {/* Only show photos section if there's more than one image */}
          {sanatorium.images.length > 1 && (
            <>
              <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <FaStar className="text-blue-600" />
                </span>
                {t('photos')}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {sanatorium.images.slice(0, 4).map((image, i) => (
                  <div key={i} className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-md group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <Image 
                      src={image.image} 
                      alt={`${sanatorium.name} - ${t('photo')} ${i+1}`} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      {t('photo')} {i+1}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <Link 
              href={`/sanatoriums/${sanatorium.slug}`}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md font-medium flex items-center justify-center"
            >
              {t('book_now')} <FaArrowRight className="ml-2" />
            </Link>
            
            <button
              onClick={() => setIsExpanded(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t('close')}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}