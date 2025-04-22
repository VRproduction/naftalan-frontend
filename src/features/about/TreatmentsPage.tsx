'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { TreantmentProcess, Treatment, TreatmentCategory, TreatmentsPage as TreatmentsPageType } from '@/lib/types/about.type';



interface Props {
    treatmentsPage: TreatmentsPageType;
    categories: TreatmentCategory[];
    treatments: Treatment[];
    processes: TreantmentProcess[];
}

export default function TreatmentsPage({ treatmentsPage, categories, treatments, processes }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filterTreatments = (category: string) => {
    if (category === 'all') {
      return treatments;
    }
    return treatments.filter(treatment => treatment.category.id === Number(category));
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{treatmentsPage.hero_title}</h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              {treatmentsPage.hero_description}
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
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{treatmentsPage.main_title}</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <div dangerouslySetInnerHTML={{ __html: treatmentsPage.main_content }} className="custom-html-content text-gray-700">
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
                src={treatmentsPage.main_image} 
                alt="Naftalan nefti ilə vanna proseduru" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{treatmentsPage.category_section_title}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              {treatmentsPage.category_section_description}
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bütün xəstəliklər
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id.toString())}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id.toString() 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.title}
            </button>
            ))}
          
          </div>
        </div>
      </section>
      
      {/* Treatments List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterTreatments(activeCategory).map((treatment, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUpVariant}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image 
                    src={treatment.image} 
                    alt={treatment.title} 
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-3">
                    {treatment.category.title}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{treatment.title}</h3>
                  <p className="text-gray-600 mb-4">{treatment.content}</p>
                  
                  <h4 className="text-md font-semibold text-gray-700 mb-2">Faydaları:</h4>
                  <ul className="space-y-1 mb-4">
                    {treatment.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Treatment Process */}
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{treatmentsPage.process_section_title}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              {treatmentsPage.process_section_description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">    
            {processes.map((process, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-blue-600">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{process.title}</h3>
              <p className="text-gray-600">
                {process.content}
              </p>
            </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{treatmentsPage.contact_section_title}</h2>
              <p className="text-xl mb-8 text-blue-100">
                {treatmentsPage.contact_section_description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/sanatoriums/naftalan" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
                  Naftalan sanatoriumları <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/contact" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                  Əlaqə
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 