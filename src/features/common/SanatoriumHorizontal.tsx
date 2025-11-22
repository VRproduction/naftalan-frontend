'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  RiStarSFill,
  RiMapPin2Line,
  RiCheckLine,
  RiHeart3Line,
  RiShareForwardLine,
  RiMoonClearLine,
  RiUser3Line,
  RiUserSmileLine,
  RiHotelBedLine,
  RiWallet3Line,
  RiPhoneLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { Sanatorium } from '@/lib/types/sanatorium.type';
import { useTranslations } from 'next-intl';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import ImageSliderModal from '@/components/common/ImageSliderModal';

interface SanatoriumProps {
  sanatorium: Sanatorium;
  index?: number;
  nights?: number;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  childrenAges?: number[];
}

export default function SanatoriumHorizontal({ sanatorium, index = 0, nights = 1, checkIn, checkOut, adults, childrenAges }: SanatoriumProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { formatPrice } = useCurrencyStore();
  const t = useTranslations('sanatorium');
  const commonT = useTranslations('common');

  const detailPageParams = new URLSearchParams();
  if (checkIn) detailPageParams.set('check_in', checkIn);
  if (checkOut) detailPageParams.set('check_out', checkOut);
  if (adults) detailPageParams.set('occupancy', String(adults));
  if (childrenAges && childrenAges.length > 0) detailPageParams.set('children_ages', childrenAges.join(','));
  if (childrenAges && childrenAges.length > 0) detailPageParams.set('children', String(childrenAges.length));
  
  const queryString = detailPageParams.toString();
  const detailPageHref = `/sanatoriums/${sanatorium.slug}${queryString ? `?${queryString}&tab=reservation` : ''}`;

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
        <RiStarSFill 
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

  // Pricing logic - rewritten from scratch
  const pricing = sanatorium.min_price_details?.pricing;
  const discount = pricing?.discount;
  
  // Calculate base prices
  const originalPrice = pricing?.total_price || pricing?.final_price || 0;
  const discountedPrice = pricing?.total_discount_price || discount?.discounted_price || 0;
  
  // Calculate per night prices
  const perNightOriginalPrice = pricing?.final_price || 0;
  let perNightDiscountedPrice = perNightOriginalPrice;
  
  if (discount && (discount.amount || 0) > 0) {
    const discountValue = discount?.value || 0;
    const discountType = discount?.type || 'percentage';
    
    if (discountType === 'percentage') {
      perNightDiscountedPrice = perNightOriginalPrice * (1 - discountValue / 100);
    } else {
      perNightDiscountedPrice = Math.max(0, perNightOriginalPrice - discountValue);
    }
  }
  
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
  const showTotal = pricing?.total_discount_price && pricing.total_discount_price > displayPrice;
  const showPerNight = perNightOriginalPrice > 0 &&  pricing?.total_price || 0 > 0;
  
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
  
  // Room and season info
  const roomName = sanatorium.min_price_details?.room?.name || '';
  const seasonName = sanatorium.min_price_details?.season?.name || '';
  const seasonIsCurrent = sanatorium.min_price_details?.season?.is_current || false;

  // Helper to get guest/child/night info as array for icon display
  const getGuestInfoArray = () => {
    const criteria = sanatorium.min_price_details?.search_criteria;
    if (!criteria) return [];
    const totalGuests = criteria.total_guests || 0;
    const childrenCount = criteria.children_ages?.length || 0;
    const adultCount = totalGuests - childrenCount;
    return [
      adultCount > 0 ? { icon: <RiUser3Line className="text-blue-600 mr-1" />, value: adultCount, label: commonT?.('adult') || 'büyük' } : null,
      childrenCount > 0 ? { icon: <RiUserSmileLine className="text-yellow-500 mr-1" />, value: childrenCount, label: commonT?.('child') || 'çocuk' } : null,
      nights > 0 ? { icon: <RiMoonClearLine className="text-indigo-500 mr-1" />, value: nights, label: commonT?.('night') || 'gecə' } : null,
    ].filter(Boolean);
  };

  // Add state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index = 0) => {
    setModalIndex(index);
    setIsModalOpen(true);
    if (typeof window !== "undefined") {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (typeof window !== "undefined") {
      document.body.style.overflow = 'auto';
    }
  };

  // Mobile view
  if (isMobile) {
    // Modern mobile card from scratch
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        variants={fadeInUpVariant}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Dynamic Image Grid */}
        <div 
          className="relative w-full cursor-pointer" 
          style={{ aspectRatio: '2/1' }}
          onClick={() => openModal(0)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
          {sanatorium.images?.length === 1 ? (
            <div className="relative w-full h-full rounded-t-2xl overflow-hidden">
              <Image
                src={sanatorium.images[0].image || sanatorium.main_image?.image || '/images/placeholder.svg'}
                alt={sanatorium.name}
                fill
                className="object-cover"
              />
            </div>
          ) : sanatorium.images?.length === 2 ? (
            <div className="flex w-full h-full gap-1">
              <div className="relative flex-1 rounded-tl-2xl overflow-hidden">
                <Image
                  src={sanatorium.images[0]?.image || sanatorium.main_image?.image || '/images/placeholder.svg'}
                  alt={`${sanatorium.name} - 1`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-tr-2xl overflow-hidden">
                <Image
                  src={sanatorium.images[1]?.image || sanatorium.main_image?.image || '/images/placeholder.svg'}
                  alt={`${sanatorium.name} - 2`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : sanatorium.images?.length > 2 ? (
            <div className="flex w-full h-full gap-1">
              {/* Main image left, 2/3 width */}
              <div className="relative" style={{ width: '66.666%' }}>
                <div className="relative w-full h-full rounded-tl-2xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src={sanatorium.images[0]?.image || sanatorium.main_image?.image || '/images/placeholder.svg'}
                    alt={sanatorium.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Two stacked images right, 1/3 width */}
              <div className="flex flex-col gap-1" style={{ width: '33.333%' }}>
                {[1, 2].map((i) => (
                  sanatorium.images[i] && (
                    <div key={i} className={`relative overflow-hidden ${i === 1 ? 'rounded-tr-2xl' : 'rounded-br-2xl'}`} style={{ aspectRatio: '1/1' }}>
                      <Image
                        src={sanatorium.images[i].image}
                        alt={`${sanatorium.name} - ${i+1}`}
                        fill
                        className="object-cover"
                      />
                      {i === 2 && sanatorium.images.length > 3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-lg font-bold">+{sanatorium.images.length - 3}</span>
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full rounded-t-2xl overflow-hidden">
              <Image
                src={sanatorium.main_image?.image || '/images/placeholder.svg'}
                alt={sanatorium.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          {/* Featured badge */}
          {sanatorium.in_home && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs py-1.5 px-3 rounded-full flex items-center z-20 shadow-lg">
              <RiHeart3Line className="mr-1.5" />
              <span className="font-medium">{t('featured')}</span>
            </div>
          )}
         
          {/* Active badge */}
          {!sanatorium.is_active && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
              <div className="bg-red-600/90 text-white px-4 py-2 rounded-lg shadow-lg rotate-12">
                <span className="font-bold text-lg">{t('status.unavailable')}</span>
              </div>
            </div>
          )}
        </div>
        {/* Card Content */}
        <div className="flex flex-col gap-1 p-3">
          {/* Name and location */}
          <div className="flex flex-col gap-0.5">
            <Link href={detailPageHref} className="hover:text-blue-700 transition-colors">
              <h3 className="text-base font-bold text-gray-800 mb-0.5 line-clamp-1">{sanatorium.name}</h3>
            </Link>
            <div className="flex items-center text-[11px] text-gray-500">
              <RiMapPin2Line className="mr-1 text-blue-600" />
              <span>{sanatorium.location.region}, {sanatorium.location.country}</span>
              <span className="mx-1 text-gray-300">•</span>
              <span className="flex items-center gap-0.5">{renderStars(Number(sanatorium.rating))}</span>
            </div>
          </div>
          {/* Short description */}
          {sanatorium.short_description && (
            <p className="text-gray-500 text-xs line-clamp-1 mt-0.5 mb-0.5">{sanatorium.short_description}</p>
          )}
          {/* Facilities */}
          {sanatorium.facilities && sanatorium.facilities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-0.5 mb-0.5">
              {sanatorium.facilities.slice(0, 2).map((facility, i) => (
                <span key={i} className="flex items-center px-1.5 py-0.5 bg-blue-50 rounded-full text-[11px] text-blue-700">
                  <RiCheckLine className="mr-1 text-xs" />
                  {facility.facility.name}
                </span>
              ))}
            </div>
          )}
          {/* Price section - compact, price and total in one row */}
          <div className="flex items-center gap-1 mt-1">
            {hasPrice && (
              <>
                {showDiscount && displayPrice < originalPrice && (
                  <span className="text-xs line-through text-gray-400">{formatPrice(originalPrice)}</span>
                )}
                <span className="text-base font-bold text-blue-700">{formatPrice(displayPrice)}</span>
                {showTotal && displayPrice > 0 && (
                  <span className="inline-block bg-blue-600 text-white text-sm font-semibold rounded px-2 py-1 shadow">
                    {t('price.total')}: {formatPrice(displayPrice)}
                  </span>
                )}
              </>
            )}
          </div>
          
          {/* Per night price display */}
          {showPerNight && (
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-gray-500">{t('per_night')}:</span>
              {showDiscount && perNightDiscountedPrice < perNightOriginalPrice ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs line-through text-gray-400">{formatPrice(perNightOriginalPrice)}</span>
                  <span className="text-sm font-semibold text-green-600">{formatPrice(perNightDiscountedPrice)}</span>
                </div>
              ) : (
                <span className="text-sm font-semibold text-gray-700">{formatPrice(perNightOriginalPrice)}</span>
              )}
            </div>
          )}
          
          {/* Guest/night info */}
          <div className="flex items-center gap-1 flex-wrap mt-0.5 min-w-0 overflow-x-auto">
            {getGuestInfoArray().map((item, idx) => (
              item && (
                <span key={idx} className="flex items-center text-[11px] text-gray-600 bg-gray-100 rounded-full px-1.5 py-0.5 mr-0.5 mb-0.5">
                  {item.icon}
                  <span className="font-semibold mx-0.5">{item.value}</span>
                  <span>{item.label}</span>
                </span>
              )
            ))}
          </div>
          {/* Details button */}
          <Link
            href={detailPageHref}
            className="mt-2 w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center rounded-lg font-medium flex items-center justify-center shadow-sm hover:from-blue-700 hover:to-blue-900 transition-all text-sm"
          >
            {t('details')}
            <RiArrowRightSLine className="ml-2" />
          </Link>
        </div>
        {/* At the end, render the modal */}
        <ImageSliderModal
          images={(sanatorium.images && sanatorium.images.length > 0 ? sanatorium.images : sanatorium.main_image ? [sanatorium.main_image] : [{ image: '/images/placeholder.svg', alt: sanatorium.name }])}
          isOpen={isModalOpen}
          initialIndex={modalIndex}
          onClose={closeModal}
        />
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
        {/* Left Image Section (Desktop) */}
        <div className="relative h-72 md:h-full md:col-span-4 lg:col-span-4 overflow-hidden group cursor-pointer" onClick={() => openModal(0)}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
          {sanatorium.images?.length === 1 ? (
            // Single image: fill the area
            <div className="relative w-full h-full rounded-l-xl overflow-hidden">
              <Image
                src={sanatorium.images[0].image || sanatorium.main_image?.image || '/images/placeholder.svg'}
                alt={sanatorium.name}
                fill
                className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
            </div>
          ) : sanatorium.images?.length === 2 ? (
            // Two images: side by side
            <div className="grid grid-cols-2 gap-1 h-full w-full">
              {[0, 1].map(i => (
                <div key={i} className="relative rounded-l-xl overflow-hidden h-full">
                  <Image
                    src={sanatorium.images[i]?.image || sanatorium.main_image?.image || '/images/placeholder.svg'}
                    alt={`${sanatorium.name} - ${i+1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : sanatorium.images?.length > 2 ? (
            // Three or more images: grid
            <div className="grid grid-cols-3 grid-rows-2 gap-1 h-full w-full">
              {/* Main image (large, left, spans 2 rows) */}
              <div className="row-span-2 col-span-2 relative rounded-l-xl overflow-hidden">
                <Image
                  src={sanatorium.images[0]?.image || sanatorium.main_image?.image || '/images/placeholder.svg'}
                  alt={sanatorium.name}
                  fill
                  className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
              </div>
              {/* Up to 2 extra images stacked vertically on the right */}
              {sanatorium.images.slice(1, 3).map((img, i) => (
                <div key={i} className="relative rounded-tr-xl rounded-br-xl overflow-hidden h-full">
                  <Image
                    src={img.image}
                    alt={`${sanatorium.name} - ${i+2}`}
                    fill
                    className="object-cover"
                  />
                  {/* If this is the last slot and there are more images, show overlay */}
                  {i === 1 && sanatorium.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">+{sanatorium.images.length - 3}</span>
                    </div>
                  )}
                </div>
              ))}
              {/* If only 1 extra image, fill the second slot with empty div for grid alignment */}
              {sanatorium.images.length === 2 && <div></div>}
            </div>
          ) : (
            // Fallback: show main_image or placeholder
            <div className="relative w-full h-full rounded-l-xl overflow-hidden">
              <Image
                src={sanatorium.main_image?.image || '/images/placeholder.svg'}
                alt={sanatorium.name}
                fill
                className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
            </div>
          )}
          {/* Featured badge - use in_home instead of is_featured */}
          {sanatorium.in_home && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs py-1.5 px-3 rounded-full flex items-center z-20 shadow-lg">
              <RiHeart3Line className="mr-1.5" />
              <span className="font-medium">{t('featured')}</span>
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
        </div>
        
        {/* Middle Content Section */}
        <div className="p-5 md:p-6 md:col-span-5 lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
          <div>
            <div className="flex flex-wrap items-start justify-between mb-3">
              <Link href={detailPageHref} className="hover:text-blue-700 transition-colors">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-700 transition-colors">{sanatorium.name}</h3>
              </Link>
              
              {/* Rating stars only */}
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-md">
                {renderStars(Number(sanatorium.rating))}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <RiMapPin2Line className="mr-1.5 text-blue-600" />
              <span className="inline-block border-b border-dashed border-gray-300 hover:text-blue-600 cursor-pointer">{sanatorium.location.region}, {sanatorium.location.country}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium">{t('show_on_map')}</span>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm line-clamp-2">{sanatorium.short_description}</p>
            
            
            <div className="hidden md:flex flex-wrap gap-2 mb-3">
              {sanatorium.facilities.slice(0, 5).map((facility, i) => (
                <div key={i} className="flex items-center px-2.5 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full text-xs text-blue-700 shadow-sm">
                  <RiCheckLine className="mr-1 text-xs" />
                  {facility.facility.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Pricing & CTA Section - modern, lighter design, with all data */}
        <div className="p-3 md:p-4 bg-white/80 md:col-span-3 lg:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 rounded-r-2xl">
          {/* Discount/season badges and guest/night info in one row */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {showDiscount && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md font-medium">
                {getDiscountLabel()}
              </span>
            )}
            {seasonName && (
              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-md font-medium">
                {seasonIsCurrent ? t('season.current_season') : seasonName}
              </span>
            )}
            {getGuestInfoArray().map((item, idx) => (
              item && (
                <span key={idx} className="flex items-center text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1 mr-1 mb-1">
                  {item.icon}
                  <span className="font-semibold mx-0.5">{item.value}</span>
                  <span>{item.label}</span>
                </span>
              )
            ))}
          </div>
          {/* Price info */}
          <div className="flex flex-col items-center md:items-start gap-2 mb-2">
            {hasPrice && (
              <>
                <div className="flex items-center gap-1">
                  {showDiscount && displayPrice < originalPrice && (
                    <span className="text-xs line-through text-gray-400">{formatPrice(originalPrice)}</span>
                  )}
                  <span className="text-2xl font-bold text-blue-700 leading-tight">{formatPrice(displayPrice)}</span>
                </div>
                {showTotal && displayPrice > 0 && (
                  <span className="inline-block bg-blue-600 text-white text-sm font-semibold rounded px-2 py-1 shadow">
                    {t('price.total')}: {formatPrice(displayPrice)}
                  </span>
                )}
              </>
            )}
            
            {/* Per night price display */}
            {showPerNight && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{t('per_night')}:</span>
                {showDiscount && perNightDiscountedPrice < perNightOriginalPrice ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs line-through text-gray-400">{formatPrice(perNightOriginalPrice)}</span>
                    <span className="text-sm font-semibold text-green-600">{formatPrice(perNightDiscountedPrice)}</span>
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-gray-700">{formatPrice(perNightOriginalPrice)}</span>
                )}
              </div>
            )}
            
            {roomName && (
              <span className="text-base text-gray-800 mt-0.5 flex items-center font-medium">
                <RiHotelBedLine className="mr-1 text-blue-500" />
                {roomName}
              </span>
            )}
          </div>
          {/* CTA Button */}
          <div className="mt-3">
            <Link
              href={detailPageHref}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center rounded-lg font-medium flex items-center justify-center shadow-sm hover:from-blue-700 hover:to-blue-900 transition-all text-sm"
            >
              {t('details')}
              <RiArrowRightSLine className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      {/* At the end, render the modal */}
      <ImageSliderModal
        images={(sanatorium.images && sanatorium.images.length > 0 ? sanatorium.images : sanatorium.main_image ? [sanatorium.main_image] : [{ image: '/images/placeholder.svg', alt: sanatorium.name }])}
        isOpen={isModalOpen}
        initialIndex={modalIndex}
        onClose={closeModal}
      />
    </motion.div>
  );
}