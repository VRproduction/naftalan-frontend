import Image from 'next/image';
import { RiImageLine, RiCheckLine, RiUser3Line, RiHotelBedLine, RiMoonClearLine } from 'react-icons/ri';
import { Link } from '@/i18n/navigation';
import React from 'react';
import { MathedRoom as MatchedRoomType, SanatoriumDetail } from '@/lib/types/sanatorium.type';

interface MatchedRoomHorizontalCardProps {
  matched: MatchedRoomType;
  sanatorium: SanatoriumDetail;
  openRoomModal: (images: { image: string; alt?: string }[], index: number) => void;
  t: (key: string) => string;
  formatPrice: (price: number | string) => string;
}

const MatchedRoomHorizontalCard = ({ matched, sanatorium, openRoomModal, t, formatPrice }: MatchedRoomHorizontalCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-12 md:min-h-[200px]">
        {/* Left: Images - Desktop */}
        <div className="col-span-4 relative overflow-hidden group cursor-pointer" onClick={() => openRoomModal(matched.room_type.images, 0)}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
          {matched.room_type.images?.length === 1 ? (
            <div className="relative w-full h-full">
              <Image 
                src={matched.room_type.images[0].image} 
                alt={matched.room_type.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          ) : matched.room_type.images?.length === 2 ? (
            <div className="grid grid-cols-2 gap-1 h-full w-full">
              {[0, 1].map(i => (
                <div key={i} className="relative overflow-hidden h-full">
                  <Image 
                    src={matched.room_type.images[i].image} 
                    alt={`${matched.room_type.name} - ${i+1}`} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              ))}
            </div>
          ) : matched.room_type.images?.length > 2 ? (
            <div className="grid grid-cols-3 grid-rows-2 gap-1 h-full w-full">
              <div className="row-span-2 col-span-2 relative overflow-hidden">
                <Image 
                  src={matched.room_type.images[0].image} 
                  alt={matched.room_type.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              {matched.room_type.images.slice(1, 3).map((img: any, i: number) => (
                <div key={i} className="relative overflow-hidden h-full">
                  <Image 
                    src={img.image} 
                    alt={`${matched.room_type.name} - ${i+2}`} 
                    fill 
                    className="object-cover" 
                  />
                  {i === 1 && matched.room_type.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">+{matched.room_type.images.length - 3}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
              <RiImageLine className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* Middle: Content - Desktop */}
        <div className="col-span-5 p-6 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{matched.room_type.name}</h3>
            <div className="text-gray-600 text-sm mb-4">{matched.room_type.description}</div>
            <div className="flex flex-wrap gap-2">
              {matched.room_type.min_capacity > 0 && matched.room_type.max_capacity > 0 && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs rounded-full px-3 py-1">
                  <RiCheckLine className="text-blue-500" /> 
                  {t('capacity')}: {matched.room_type.min_capacity}-{matched.room_type.max_capacity}
                </span>
              )}
              {matched.room_type.max_extra_beds > 0 && (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs rounded-full px-3 py-1">
                  <RiCheckLine className="text-green-500" /> 
                  {t('extra_beds')}: {matched.room_type.max_extra_beds}
                </span>
              )}
              {matched.room_type.size && (
                <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 text-xs rounded-full px-3 py-1">
                  <RiCheckLine className="text-gray-500" /> 
                  {t('area')}: {matched.room_type.size} m²
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Price & CTA - Desktop */}
        <div className="col-span-3 flex flex-col justify-between p-3 sm:p-4 md:p-5 bg-gradient-to-br from-blue-50 to-white border-l border-gray-100">
          {/* Discount badge - always above price, centered */}
          {matched.discount && matched.discount.discount_amount > 0 && (
            <div className="w-full flex justify-center mb-2">
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full whitespace-nowrap">
                -{matched.discount.discount_type === 'percentage' ? `${matched.discount.discount_value}%` : formatPrice(matched.discount.discount_value)}
              </span>
            </div>
          )}
          {/* Başlanğıc qiymət - ilk indirimli fiyat ve belirgin */}
          <div className="flex items-center gap-2 w-full mb-1">
            <span className={`font-extrabold ${matched.discount && matched.discount.discounted_price < matched.price ? "text-blue-800 text-lg sm:text-xl md:text-xl" : "text-blue-700 text-base sm:text-lg"}`}>
              {formatPrice(
                matched.discount && matched.discount.discounted_price < matched.price
                  ? matched.discount.discounted_price
                  : matched.price
              )}
              
            </span>
            {matched.discount && matched.discount.discounted_price < matched.price && (
              <span className="text-gray-400 text-sm sm:text-base font-semibold line-through">
                {formatPrice(matched.price)}
              </span>
            )}
          </div>
          {/* Cəmi - daha belirgin */}
          <div className="flex flex-wrap gap-2 w-full mb-2">
            {matched.occupancy > 0 && (
              <span className="flex items-center bg-blue-50 text-blue-700 text-xs rounded-full px-2 py-1">
                <RiUser3Line className="w-4 h-4 mr-1" />
                {matched.occupancy} {t('person')}
              </span>
            )}
            {matched.extra_bed_count > 0 && (
              <span className="flex items-center bg-green-50 text-green-700 text-xs rounded-full px-2 py-1">
                <RiHotelBedLine className="w-4 h-4 mr-1" />
                +{matched.extra_bed_count} {t('extra_bed')}
              </span>
            )}
            {matched.nights > 0 && (
              <span className="flex items-center bg-indigo-50 text-indigo-700 text-xs rounded-full px-2 py-1">
                <RiMoonClearLine className="w-4 h-4 mr-1" />
                {matched.nights} {t('night')}
              </span>
            )}
          </div>
          <Link
            href={`/booking?snt=${sanatorium.slug}&room_type=${matched.room_type.id}`}
            className="w-full py-1.5 sm:py-2 md:py-2 px-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center rounded-lg font-semibold text-xs sm:text-sm shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {t('book_now')}
          </Link>
          {/* Total price - always at the bottom, prominent */}
          <div className="mt-4 pt-3 border-t border-gray-200 w-full text-center">
            <div className="text-xs text-gray-500 mb-1">{t('price_detail.total')}</div>
            {matched.total_discounted_price > 0 && matched.total_discounted_price < matched.total_price ? (
              <>
                <span className="text-gray-400 font-bold text-base line-through block mb-1">
                  {formatPrice(matched.total_price)}
                </span>
                <span className="text-green-700 font-extrabold text-xl sm:text-2xl drop-shadow block">
                  {formatPrice(matched.total_discounted_price)}
                </span>
              </>
            ) : (
              <span className="font-extrabold text-blue-800 text-xl sm:text-2xl drop-shadow block">{formatPrice(matched.total_price)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Images - Mobile */}
        <div className="relative h-48 w-full overflow-hidden group cursor-pointer" onClick={() => openRoomModal(matched.room_type.images, 0)}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
          {matched.room_type.images?.length >= 1 ? (
            <div className="relative w-full h-full">
              <Image 
                src={matched.room_type.images[0].image} 
                alt={matched.room_type.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              {matched.room_type.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                  1/{matched.room_type.images.length}
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
              <RiImageLine className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content - Mobile */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-800 flex-1 mr-4">{matched.room_type.name}</h3>
            <div className="text-right w-28 min-w-[7rem]">
              {/* Discount badge - right aligned above price */}
              {matched.discount && matched.discount.discount_amount > 0 && (
                <span className="block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full mb-1 text-right ml-auto">
                  -{matched.discount.discount_type === 'percentage' ? `${matched.discount.discount_value}%` : formatPrice(matched.discount.discount_value)}
                </span>
              )}
              <div className="text-xl font-extrabold text-blue-700">
                {formatPrice(matched.discount && matched.discount.discounted_price < matched.price ? matched.discount.discounted_price : matched.price)}
              </div>
              {matched.discount && matched.discount.discount_amount > 0 && (
                <div className="text-xs text-gray-400 line-through">
                  {formatPrice(matched.price)}
                </div>
              )}
            </div>
          </div>

          <div className="text-gray-600 text-sm mb-3 line-clamp-2">{matched.room_type.description}</div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {matched.room_type.min_capacity > 0 && matched.room_type.max_capacity > 0 && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs rounded-full px-2 py-1">
                <RiCheckLine className="text-blue-500 w-3 h-3" /> 
                {matched.room_type.min_capacity}-{matched.room_type.max_capacity} kişi
              </span>
            )}
            {matched.room_type.max_extra_beds > 0 && (
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs rounded-full px-2 py-1">
                <RiCheckLine className="text-green-500 w-3 h-3" /> 
                +{matched.room_type.max_extra_beds} yatak
              </span>
            )}
            {matched.room_type.size && (
              <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 text-xs rounded-full px-2 py-1">
                <RiCheckLine className="text-gray-500 w-3 h-3" /> 
                {matched.room_type.size} m²
              </span>
            )}
          </div>

          <Link
            href={`/booking?snt=${sanatorium.slug}&room_type=${matched.room_type.id}`}
            className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {t('book_now')}
          </Link>
          {/* Total price - always at the bottom, prominent */}
          <div className="mt-4 pt-3 border-t border-gray-200 w-full text-center">
            <div className="text-xs text-gray-500 mb-1">{t('price_detail.total')}</div>
            {matched.total_discounted_price > 0 && matched.total_discounted_price < matched.total_price ? (
              <>
                <span className="text-gray-400 font-bold text-base line-through block mb-1">
                  {formatPrice(matched.total_price)}
                </span>
                <span className="text-green-700 font-extrabold text-xl drop-shadow block">
                  {formatPrice(matched.total_discounted_price)}
                </span>
              </>
            ) : (
              <span className="font-extrabold text-blue-800 text-xl drop-shadow block">{formatPrice(matched.total_price)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedRoomHorizontalCard;