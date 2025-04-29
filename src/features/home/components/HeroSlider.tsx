import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { HeroSlider as HeroSliderType } from "@/lib/types/home.type";
import { useTranslations } from 'next-intl';

// Images will be replaced with actual Naftalan-related images
interface Props {
  heroSliders: HeroSliderType[];
}

const HeroSlider = ({ heroSliders }: Props) => {
  const t = useTranslations('home.hero');

  return (
    <section className="relative z-0">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-[50vh] sm:h-[60vh] md:h-[75vh] lg:h-[80vh]"
      > 
        {heroSliders.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
            
            {/* Additional dark overlay at the bottom for better text visibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 sm:h-2/3 bg-gradient-to-t from-black/100 to-transparent z-10" />
            
            {/* Background image */}
            <Image
              src={slide.sanatorium.main_image?.image || '/images/placeholder.svg'}
              alt={`Hero Slider ${index + 1}`}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />
            
            {/* Sanatorium content overlay - positioned in middle */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end pb-28 sm:pb-32 md:pb-36 lg:pb-44 text-white">
              <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 text-white drop-shadow-lg">
                    {slide.sanatorium.name}
                  </h2>
                  
                  <div className="flex flex-wrap items-center mb-2 sm:mb-3 md:mb-4 gap-2 sm:gap-3">
                    <span className="bg-blue-600 px-2 py-1 sm:px-3 sm:py-1 text-xs md:text-sm rounded-full shadow-lg">
                      {slide.sanatorium.location.region}, {slide.sanatorium.location.country}
                    </span>
                    {slide.sanatorium.rating && (
                      <div className="flex items-center bg-black/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-xs sm:text-sm">{slide.sanatorium.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm md:text-base max-w-full sm:max-w-2xl mb-3 sm:mb-4 md:mb-6 line-clamp-2 sm:line-clamp-3 text-white font-medium drop-shadow-lg">
                    {slide.sanatorium.short_description}
                  </p>
                  
                  <Link 
                    href={`/sanatoriums/${slide.sanatorium.slug}`} 
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm md:text-base py-2 px-4 sm:py-2.5 sm:px-6 md:py-3 md:px-7 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span className="font-medium">{t('learn_more')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1.5 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Space at the bottom for search form */}
            <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 lg:h-36 z-10" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;