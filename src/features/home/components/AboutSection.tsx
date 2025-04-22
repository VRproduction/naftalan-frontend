import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AboutSection as AboutSectionType } from '@/lib/types/home.type';

const AboutSection = ({ aboutSection }: { aboutSection: AboutSectionType }) => {
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
            {aboutSection.sub_title}
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {aboutSection.title}
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {aboutSection.section_description}
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
              src={aboutSection.image}
              alt="Naftalan Oil Treatment"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">{aboutSection.content_title}</h3>
            
            {aboutSection.punkts.map((punkt, index) => (
            <div key={index} className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <Image src={punkt.icon} alt={punkt.title} width={40} height={40} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{punkt.title}</h4>
                <p className="text-gray-600">
                  {punkt.description}
                </p>
              </div>
            </div>
            ))}
           
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