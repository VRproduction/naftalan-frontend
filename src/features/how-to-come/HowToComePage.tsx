'use client';

import { HeroSection, LocationSection, TransportSection, VisaSection } from '@/lib/types/how-to-come.type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaMapMarkedAlt } from 'react-icons/fa';

interface Props {
  heroSection: HeroSection;
  locationSection: LocationSection;
  transportSection: TransportSection;
  visaSection: VisaSection;
}   

export default function HowToComePage({ heroSection, locationSection, transportSection, visaSection }: Props) {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{heroSection.title}</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {heroSection.description}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <FaMapMarkedAlt className="text-4xl text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{locationSection.title}</h2>
              <p className="text-gray-600 mb-8">
                {locationSection.description}
              </p>
            </div>
            
            <div className="h-[400px] rounded-xl overflow-hidden shadow-md mb-10">
              <iframe
                src={locationSection.map_iframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Transportation Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{transportSection.title}</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              {transportSection.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {
              transportSection.options.map((option) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-md"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Image src={option.icon} alt={option.title} width={30} height={30} />
                    </div>
                    <h3 className="text-xl font-semibold">{option.title}</h3>
                  </div>
                  
                  <div dangerouslySetInnerHTML={{ __html: option.description }} className="custom-html-content space-y-4 text-gray-700">
                    
                  </div>
                </motion.div>
              ))
            }
          </div>
        </div>
      </section>
      
      {/* Visa Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{visaSection.title}</h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-600">
                {visaSection.description}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div dangerouslySetInnerHTML={{ __html: visaSection.content }} className="custom-html-content max-w-none text-gray-700">
                 </div>
            </div>
          </div>
        </div>
      </section>
      
     
    </div>
  );
} 