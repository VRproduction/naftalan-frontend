'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));

    // Simulate form submission
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }));

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
    }, 1500);
  };

  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Əlaqə</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Bizə suallarınızı göndərin, biz sizinlə əlaqə saxlayacağıq
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Contact Info & Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Bizimlə əlaqə saxlayın</h2>
                
                {formState.isSubmitted ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Mesajınız uğurla göndərildi!</h3>
                        <p className="mt-2 text-sm text-green-700">
                          Mesajınız üçün təşəkkür edirik. Ən qısa zamanda sizinlə əlaqə saxlayacağıq.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ad və Soyad*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-poçt*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Mövzu*
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Seçin...</option>
                        <option value="reservation">Rezervasiya</option>
                        <option value="question">Sual</option>
                        <option value="feedback">Geri bildiriş</option>
                        <option value="other">Digər</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mesaj*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      * işarəli xanalar mütləq doldurulmalıdır
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formState.isSubmitting}
                      className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 flex items-center ${
                        formState.isSubmitting 
                          ? 'bg-blue-400 cursor-not-allowed' 
                          : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
                      }`}
                    >
                      {formState.isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Göndərilir...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Göndər
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Əlaqə məlumatları</h2>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaMapMarkerAlt className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Ünvan</h3>
                      <p className="mt-1 text-gray-600">
                        Naftalan şəhəri, AZ 4700<br />
                        Azərbaycan
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FaPhoneAlt className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Telefon</h3>
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
                      <h3 className="text-lg font-medium text-gray-900">E-poçt</h3>
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
                      <h3 className="text-lg font-medium text-gray-900">İş saatları</h3>
                      <p className="mt-1 text-gray-600">
                        Bazar ertəsi - Cümə: 09:00 - 18:00<br />
                        Şənbə - Bazar: 10:00 - 16:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">Tez-tez verilən suallar</h3>
                <p className="text-gray-600 mb-4">
                  Suallarınız var? Tez-tez verilən suallar bölməsində cavabını tapa bilərsiniz.
                </p>
                <a 
                  href="/faq" 
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  FAQ bölməsinə keçid
                </a>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-3">Naftalana necə gəlmək olar?</h3>
                <p className="text-gray-600">
                  Naftalan şəhərinə Bakıdan və Gəncədən avtobusla və ya taksi ilə gəlmək mümkündür.
                  Gəncə şəhəri Naftalana ən yaxın hava limanı olan şəhərdir (təxminən 50 km məsafə).
                  Daha ətraflı məlumat üçün "Necə gəlmək?" bölməsinə baxın.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Bizi xəritədə tapın</h2>
            <p className="text-gray-600">Naftalan şəhərinin yerləşdiyi məkan</p>
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