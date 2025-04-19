import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 overflow-hidden">
        <div className="text-center mb-16">
          <motion.span 
            className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Tarixi Şəfa Mənbəyi
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Naftalan haqqında
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Dünyada bənzəri olmayan şəfalı Naftalan nefti ilə tanış olun və unikal müalicəvi xüsusiyyətlərini kəşf edin
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://images.unsplash.com/photo-1591825729269-caeb344f6df2"
              alt="Naftalan Oil Treatment"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/60 to-transparent p-6">
              <span className="text-white text-sm">© Naftalan Health Resort</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Dünyada bənzərsiz müalicə metodu</h3>
            
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Təbii Şəfa Mənbəyi</h4>
                <p className="text-gray-600">
                  Naftalan nefti, təbii müalicəvi xüsusiyyətləri ilə məşhur olan unikal bir neft növüdür. 
                  Azərbaycanın Naftalan şəhərində çıxarılan bu neft, əsrlər boyu müxtəlif xəstəliklərin 
                  müalicəsində istifadə edilmişdir.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Peşəkar Tibbi Yanaşma</h4>
                <p className="text-gray-600">
                  Naftalan şəhərindəki sanatoriyalarda peşəkar həkimlər tərəfindən aparılan müalicələr, 
                  minlərlə insanın sağlamlığına qovuşmasına kömək etmişdir. Müasir tibbi avadanlıqlarla təchiz edilmiş 
                  sanatoriyalarımız sizin sağlamlığınız üçün xidmətinizdədir.
                </p>
              </div>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/about/naftalan" 
                className="py-3 px-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl font-medium transform hover:-translate-y-1"
              >
                Ətraflı məlumat
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/treatments"
                className="py-3 px-8 bg-transparent border-2 border-gray-300 text-gray-700 rounded-full hover:border-blue-500 transition-all duration-300 inline-flex items-center justify-center font-medium hover:text-blue-500"
              >
                Müalicə növləri
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 