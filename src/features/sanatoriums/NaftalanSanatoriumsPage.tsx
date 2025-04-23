'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { NaftalanSanatoriumsPage as NaftalanSanatoriumsPageType, Sanatorium as SanatoriumType } from '@/lib/types/sanatorium.type';
import SanatoriumHorizontal from '../common/SanatoriumHorizontal';

interface Props {
  naftalanSanatoriumsPage: NaftalanSanatoriumsPageType;
  naftalanSanatoriums: SanatoriumType[];
}

export default function NaftalanSanatoriumsPage({ naftalanSanatoriumsPage, naftalanSanatoriums }: Props) {
  

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{naftalanSanatoriumsPage.hero_section_title}</h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              {naftalanSanatoriumsPage.hero_section_description}
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
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{naftalanSanatoriumsPage.main_section_title}</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <div dangerouslySetInnerHTML={{ __html: naftalanSanatoriumsPage.main_section_description }} className="custom-html-content text-gray-700">
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
                src={naftalanSanatoriumsPage.main_section_image} 
                alt="Naftalan sanatoriumları" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sanatoriums List */}
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{naftalanSanatoriumsPage.sanatoriums_section_title}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              {naftalanSanatoriumsPage.sanatoriums_section_description}
            </p>
          </motion.div>
          
          <div className="space-y-12">
            {naftalanSanatoriums.map((sanatorium, index) => (
              <SanatoriumHorizontal key={sanatorium.id} sanatorium={sanatorium} index={index} />
            ))}
          </div>
        </div>
      </section>
      
     
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{naftalanSanatoriumsPage.contact_section_title}</h2>
              <p className="text-xl mb-8 text-blue-100">
                {naftalanSanatoriumsPage.contact_section_description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Əlaqə
                </Link>
                <Link href="/about/treatments" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                  Müalicə olunan xəstəliklər
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 