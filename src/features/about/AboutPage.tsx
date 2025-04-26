'use client';

import { About } from '@/lib/types/about.type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface Props {
  about: About;
}

export default function AboutPage({ about }: Props) {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src={about.banner_image}
          alt="Naftalan Oil Treatment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-black/25"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {about.banner_title}
            </motion.h1>
            <motion.div 
              className="w-20 h-1 bg-blue-500 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.p 
              className="max-w-2xl mx-auto text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {about.banner_description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">              
              <div dangerouslySetInnerHTML={{ __html: about.content }} className="custom-html-content max-w-none"></div>
              
              <div className="mt-10">
                <Link
                  href="/about/treatments"
                  className="inline-flex items-center py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
                >
                  <span>{about.reservation_title}</span>
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-48">
                    <Image
                      src={about.reservation_image}
                      alt="Naftalan Treatment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 bg-blue-50">
                    <h3 className="text-lg font-semibold mb-3">{about.reservation_title}</h3>
                    <p className="text-gray-600 mb-4">
                      {about.reservation_description}
                    </p>
                    <Link
                      href="/reservation"
                      className="block text-center py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Rezervasiya et
                    </Link>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-md">
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-3">Əlaqə məlumatları</h3>
                    <div className="space-y-3 text-gray-600">
                      <p><span className="font-medium">Telefon:</span> +994 12 345 67 89</p>
                      <p><span className="font-medium">Email:</span> info@naftalan.az</p>
                      <p><span className="font-medium">Ünvan:</span> Naftalan şəhəri, Azərbaycan</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-md">
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-3">Faydalı keçidlər</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/about/history" className="text-blue-500 hover:underline">Naftalan neftinin tarixi</Link>
                      </li>
                      <li>
                        <Link href="/about/treatments" className="text-blue-500 hover:underline">Müalicə olunan xəstəliklər</Link>
                      </li>
                      <li>
                        <Link href="/sanatoriums/naftalan" className="text-blue-500 hover:underline">Naftalan sanatoriyaları</Link>
                      </li>
                      <li>
                        <Link href="/how-to-come" className="text-blue-500 hover:underline">Naftalana necə gəlmək olar</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 