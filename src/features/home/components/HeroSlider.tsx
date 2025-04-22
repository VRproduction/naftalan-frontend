import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { HeroSlider as HeroSliderType } from "@/lib/types/home.type";

// Images will be replaced with actual Naftalan-related images
interface Props {
  heroSliders: HeroSliderType[];
}

const HeroSlider = ({ heroSliders }: Props) => {
  return (
    <section className="relative z-[-1]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-[60vh] md:h-[75vh] lg:h-[80vh]"
      > 
        {heroSliders.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
            <Image
              src={slide.image}
              alt={`Hero Slider ${index + 1}`}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider; 