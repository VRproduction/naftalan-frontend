'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import SanatoriumHorizontal from '../common/SanatoriumHorizontal';
import { OtherCitiesSanatoriumsPage as OtherCitiesSanatoriumsPageType, Sanatorium as SanatoriumType } from '@/lib/types/sanatorium.type';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface Props {
  otherCitiesSanatoriumsPage: OtherCitiesSanatoriumsPageType;
  otherCitiesSanatoriums: SanatoriumType[];
}

export default function OtherSanatoriumsPage({ otherCitiesSanatoriumsPage, otherCitiesSanatoriums }: Props) {
  const t = useTranslations('sanatoriums');

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      {/* Custom styles for this page */}
      <style jsx global>{`
        /* Override Sanatorium component styles to match green theme */
        .sanatorium-wrapper a.text-blue-500:hover,
        .sanatorium-wrapper .text-blue-500, 
        .sanatorium-wrapper .text-blue-600 {
          color: rgb(22 163 74) !important; /* text-green-600 */
        }
        
        .sanatorium-wrapper .bg-blue-50 {
          background-color: rgb(240 253 244) !important; /* bg-green-50 */
        }
        
        .sanatorium-wrapper .text-blue-500 svg {
          color: rgb(22 163 74) !important; /* text-green-600 */
        }
        
        .sanatorium-wrapper a.bg-blue-600,
        .sanatorium-wrapper button.bg-blue-500 {
          background-color: rgb(22 163 74) !important; /* bg-green-600 */
        }
        
        .sanatorium-wrapper a.hover\\:bg-blue-700:hover,
        .sanatorium-wrapper button.hover\\:bg-blue-600:hover {
          background-color: rgb(21 128 61) !important; /* bg-green-700 */
        }
        
        .sanatorium-wrapper .hover\\:text-blue-600:hover {
          color: rgb(22 163 74) !important; /* text-green-600 */
        }
        
        .sanatorium-wrapper a.border-blue-500 {
          border-color: rgb(22 163 74) !important; /* border-green-600 */
        }
        
        .sanatorium-wrapper a.text-blue-500 {
          color: rgb(22 163 74) !important; /* text-green-600 */
        }
        
        .sanatorium-wrapper a.hover\\:bg-blue-50:hover {
          background-color: rgb(240 253 244) !important; /* bg-green-50 */
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{otherCitiesSanatoriumsPage.hero_section_title}</h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl mb-8 text-green-100">
              {otherCitiesSanatoriumsPage.hero_section_description}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{otherCitiesSanatoriumsPage.main_section_title}</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div dangerouslySetInnerHTML={{ __html: otherCitiesSanatoriumsPage.main_section_description }} className="custom-html-content text-gray-700">
                
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src={otherCitiesSanatoriumsPage.main_section_image} 
                alt={otherCitiesSanatoriumsPage.main_section_title} 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sanatoriums List - Updated to use the Sanatorium component */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{otherCitiesSanatoriumsPage.sanatoriums_section_title}</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <div dangerouslySetInnerHTML={{ __html: otherCitiesSanatoriumsPage.sanatoriums_section_description }} className="custom-html-content max-w-3xl mx-auto text-lg text-gray-600">
              
            </div>
          </motion.div>
          
          <div className="space-y-8">
            {otherCitiesSanatoriums.map((sanatorium, index) => (
              <motion.div
                key={sanatorium.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUpVariant}
                className="sanatorium-wrapper"
              >
                <SanatoriumHorizontal 
                  sanatorium={sanatorium}
                  index={index} 
                />
                
               
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    
      
      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{otherCitiesSanatoriumsPage.contact_section_title}</h2>
              <p className="text-xl mb-8 text-green-100">
                {otherCitiesSanatoriumsPage.contact_section_description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center">
                  {t('get_detailed_info')} <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/sanatoriums/naftalan" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors">
                  {t('naftalan_sanatoriums')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 