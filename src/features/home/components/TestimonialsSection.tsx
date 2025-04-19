import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Aynur Məmmədova',
    role: 'Bakı, Azərbaycan',
    content: '15 ildir artrit ağrılarından əziyyət çəkirdim. Naftalana gələndən sonra 2 həftə ərzində ağrılarım demək olar ki, yox oldu. İndii daha rahat hərəkət edə bilirəm. Bütün komandaya təşəkkür edirəm!',
    rating: 5
  },
  {
    id: 2,
    name: 'Elşən Hüseynov',
    role: 'Gəncə, Azərbaycan',
    content: 'Psoriaz xəstəliyindən əziyyət çəkirdim. Müxtəlif müalicələr sınasam da, Naftalan nefti qədər effektiv nəticə vermədi. Artıq dərimdəki xəstəlik demək olar ki, tamamilə keçdi.',
    rating: 5
  },
  {
    id: 3,
    name: 'Leyla Qasımova',
    role: 'Sumqayıt, Azərbaycan',
    content: 'İdmançı olaraq əzələ ağrılarım var idi. Naftalan nefti vannaları və massajlar sayəsində bədənim yenidən canlandı. İndi daha güclü və enerjili hiss edirəm. Buradakı peşəkar personal üçün təşəkkürlər!',
    rating: 4
  },
  {
    id: 4,
    name: 'Rəşad Əliyev',
    role: 'Şəki, Azərbaycan',
    content: 'Revmatizm ağrılarım üçün gəldim və nəticələr inanılmaz oldu. Naftalan müalicəvi neftinin effekti həqiqətən möcüzəvidir. Otelin xidməti də çox yüksək səviyyədədir. Mütləq yenə gələcəyəm!',
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Müştəri rəyləri
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Naftalanda müalicə alan müştərilərimizin təcrübələri və düşüncələri
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
                  <div className="mb-4 text-blue-600">
                    <FaQuoteLeft size={24} />
                  </div>
                  <p className="text-gray-700 mb-4 flex-grow">{testimonial.content}</p>
                  <div className="mt-auto">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 