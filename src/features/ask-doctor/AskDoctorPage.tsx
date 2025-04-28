'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaPhone, FaQuestion, FaCheck, FaPaperPlane } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function AskDoctorPage() {
  const t = useTranslations('pages.ask_doctor');
  const tAskDoctor = useTranslations('ask_doctor');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    question: '',
    agreeToTerms: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        question: '',
        agreeToTerms: false,
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
          alt="Medical Consultation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-blue-900/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('hero_title')}
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
              {t('hero_subtitle')}
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('form_title')}</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <FaCheck className="text-green-500 text-xl" />
                      </div>
                      <h3 className="text-xl font-semibold">{tAskDoctor('success_title')}</h3>
                    </div>
                    <p>
                      {tAskDoctor('success_message')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        {t('full_name')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={tAskDoctor('name_placeholder')}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          {t('email')}
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={tAskDoctor('email_placeholder')}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                          {t('phone')}
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={tAskDoctor('phone_placeholder')}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="question" className="block text-gray-700 font-medium mb-2">
                        {t('question')}
                      </label>
                      <div className="relative">
                        <textarea
                          id="question"
                          name="question"
                          value={formData.question}
                          onChange={handleChange}
                          placeholder={tAskDoctor('question_placeholder')}
                          rows={6}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        ></textarea>
                        <FaQuestion className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {tAskDoctor('question_hint')}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="mt-1 rounded text-blue-500"
                          required
                        />
                        <span className="ml-2 text-gray-600 text-sm">
                          {tAskDoctor('terms_agreement')}
                        </span>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-300 ${
                        isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {tAskDoctor('sending')}
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          {tAskDoctor('submit_button')}
                        </>
                      )}
                    </button>
                    
                    <p className="mt-4 text-sm text-gray-500 text-center">
                      {t('required_fields')}
                    </p>
                  </form>
                )}
              </motion.div>
              
             
            </div>
            
            {/* Doctors Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="sticky top-24 space-y-8"
              >
          
                <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3">{t('advantages_title')}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{t('advantages.time_saving')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{t('advantages.pre_travel_info')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{t('advantages.suitability')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{t('advantages.expert_advice')}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 