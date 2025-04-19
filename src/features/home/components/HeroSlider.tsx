import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Images will be replaced with actual Naftalan-related images
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    alt: 'Naftalan Müalicəvi Nefti'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8',
    alt: 'Naftalan Sanatoriyaları'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
    alt: 'Müalicəvi Prosedurlar'
  }
];

const HeroSlider = () => {
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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
            <Image
              src={slide.image}
              alt={slide.alt}
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