'use client'

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from '@/features/contact/components/ContactForm';
import { useTranslations } from 'next-intl';


export default function ContactPage() {
  const t = useTranslations('pages.contact');
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{t('hero_title')}</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {t('hero_subtitle')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Info & Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">{t('contact_us')}</h2>
                
                <ContactForm />
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('contact_info')}</h2>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaMapMarkerAlt className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{t('address_title')}</h3>
                      <p className="mt-1 text-gray-600">
                        {t('address')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaPhoneAlt className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{t('phone_title')}</h3>
                      <p className="mt-1 text-gray-600">
                        +994 12 345 67 89<br />
                        +994 50 123 45 67
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaEnvelope className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{t('email_title')}</h3>
                      <p className="mt-1 text-gray-600">
                        info@naftalan.az<br />
                        support@naftalan.az
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaClock className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{t('hours_title')}</h3>
                      <p className="mt-1 text-gray-600">
                        {t('work_hours')}<br />
                        {t('weekend_hours')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">{t('map_title')}</h2>
            <p className="text-gray-600">{t('map_subtitle')}</p>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-md h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24232.51390993425!2d46.689722651272096!3d40.34583871449216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403e1a2eda06c4ed%3A0x2c54dfe2f8724283!2sNaftalan%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1716225149606!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
} 