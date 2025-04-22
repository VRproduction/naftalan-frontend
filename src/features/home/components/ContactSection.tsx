'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEnvelope, FaPhone, FaUser, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { ContactSection as ContactSectionType } from '@/lib/types/home.type';

// Define schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Ad ən azı 2 simvol olmalıdır' }),
  email: z.string().email({ message: 'Düzgün e-poçt ünvanı daxil edin' }),
  phone: z.string().min(9, { message: 'Düzgün telefon nömrəsi daxil edin' }),
  message: z.string().min(10, { message: 'Mesaj ən azı 10 simvol olmalıdır' })
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactSectionProps {
  contactSection: ContactSectionType;
}

const ContactSection = ({ contactSection }: ContactSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      setIsSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="hidden md:block relative h-[500px] bg-blue-600 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90" />
              <div className="relative z-10 p-10 text-white h-full flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-6">{contactSection.left_section_title}</h3>
                <p className="mb-8">
                  {contactSection.left_section_description}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/80">Telefon</h4>
                      <p className="text-lg">+994 12 345 67 89</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white/80">E-poçt</h4>
                      <p className="text-lg">info@naftalan.az</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center md:text-left mb-8">
                <h2 className="text-3xl font-bold mb-4">{contactSection.right_section_title}</h2>
                <p className="text-gray-600">
                  {contactSection.right_section_description}
                </p>
              </div>
              
              {isSuccess && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mesajınız uğurla göndərildi. Tezliklə sizinlə əlaqə saxlanılacaq.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="Adınız və soyadınız"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="E-poçt ünvanınız"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <FaPhone />
                    </div>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="Telefon nömrəniz"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <textarea
                    {...register('message')}
                    placeholder="Mesajınız"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Göndərilir...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Göndər
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 