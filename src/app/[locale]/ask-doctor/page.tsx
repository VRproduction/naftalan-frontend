'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaPhone, FaQuestion, FaCheck, FaPaperPlane } from 'react-icons/fa';

const doctors = [
  {
    id: 1,
    name: "Dr. Əli Məmmədov",
    specialty: "Dermatoloq",
    experience: 15,
    image: "/images/doctor-1.jpg",
    description: "Dr. Məmmədov 15 illik təcrübəyə malik dermatoloqdur və Naftalan nefti ilə dəri xəstəliklərinin müalicəsi üzrə mütəxəssisdir. O, psoriaz, ekzema və digər dəri xəstəliklərinin müalicəsində böyük uğurlar əldə edib."
  },
  {
    id: 2,
    name: "Dr. Leyla Əliyeva",
    specialty: "Revmatoloq",
    experience: 12,
    image: "/images/doctor-2.jpg",
    description: "Dr. Əliyeva revmatologiya sahəsində 12 illik təcrübəyə malikdir. O, Naftalan müalicəsinin artrit, artroz və digər revmatik xəstəliklərin müalicəsində effektivliyini araşdırmışdır. Onun xəstələri arasında xroniki ağrılardan azad olmuş bir çox insan var."
  },
  {
    id: 3,
    name: "Dr. Ruslan Həsənov",
    specialty: "Nevroloq",
    experience: 18,
    image: "/images/doctor-3.jpg",
    description: "Dr. Həsənov 18 illik təcrübəyə malik nevroloqdur. O, Naftalan neftinin sinir sistemi xəstəliklərinin müalicəsində istifadəsi üzrə bir çox elmi məqalələrin müəllifidir. Dr. Həsənov nevralji və radikulit kimi xəstəliklərin müalicəsində böyük uğurlar qazanmışdır."
  }
];

const faqs = [
  {
    question: "Naftalan müalicəsi psoriaz üçün effektivdirmi?",
    answer: "Bəli, Naftalan müalicəsi psoriaz kimi dəri xəstəliklərində yüksək effektivlik göstərir. Naftalan neftinin tərkibindəki bioloji aktiv maddələr iltihabı azaldır və dəri hüceyrələrinin bərpasına kömək edir. Klinik tədqiqatlar göstərir ki, müalicə kursundan sonra xəstələrin 70-80%-də əhəmiyyətli yaxşılaşma müşahidə olunur."
  },
  {
    question: "Naftalan müalicəsi hamiləlik dövründə təhlükəsizdir?",
    answer: "Xeyr, hamiləlik dövründə Naftalan müalicəsi tövsiyə olunmur. Naftalan neftinin tərkibindəki bəzi maddələr hamiləliyə mənfi təsir göstərə bilər. Hamiləlik və ya əmizdirmə dövründə olan qadınlar bu müalicədən çəkinməlidirlər. Müalicəyə başlamazdan əvvəl həkimlə məsləhətləşmək vacibdir."
  },
  {
    question: "Ürək-damar xəstəliklərim varsa, Naftalan müalicəsi ala bilərəm?",
    answer: "Ürək-damar xəstəlikləri olan şəxslər üçün Naftalan müalicəsi əks göstərişdir və ya ciddi nəzarət altında məhdud şəkildə aparıla bilər. Xüsusilə hipertoniya, ürək çatışmazlığı, yaxın zamanda keçirilmiş infarkt və ya insult olan xəstələr üçün təhlükəli ola bilər. Hər hansı müalicəyə başlamazdan əvvəl tam tibbi müayinədən keçmək və həkiminizlə məsləhətləşmək vacibdir."
  },
  {
    question: "Naftalan müalicəsi neçə dəfə təkrarlana bilər?",
    answer: "Naftalan müalicəsi xroniki xəstəliklərdə ildə bir dəfə təkrarlana bilər. Bəzi hallarda, xəstəliyin ağırlığından asılı olaraq, həkim ildə iki dəfə müalicə təyin edə bilər, lakin iki müalicə kursu arasında ən azı 6 ay fasilə olmalıdır. Müalicənin müsbət təsiri adətən 6-12 ay davam edir."
  }
];

export default function AskDoctorPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    question: '',
    agreeToTerms: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState(1);
  
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
              Həkimə sual verin
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
              Naftalan müalicəsi ilə bağlı suallarınızı mütəxəssis həkimlərimizə ünvanlayın
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
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sualınızı göndərin</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <FaCheck className="text-green-500 text-xl" />
                      </div>
                      <h3 className="text-xl font-semibold">Sualınız uğurla göndərildi!</h3>
                    </div>
                    <p>
                      Təşəkkür edirik! Həkimlərimiz ən qısa zamanda sizə cavab verəcəklər. Cavab e-poçt ünvanınıza göndəriləcəkdir.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Ad və Soyad*
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          E-poçt*
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                          Telefon
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="question" className="block text-gray-700 font-medium mb-2">
                        Sualınız*
                      </label>
                      <div className="relative">
                        <textarea
                          id="question"
                          name="question"
                          value={formData.question}
                          onChange={handleChange}
                          rows={6}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        ></textarea>
                        <FaQuestion className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Zəhmət olmasa, sualınızı aydın və ətraflı yazın. Həkimlərimiz daha dəqiq cavab verə bilsinlər.
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
                          Şəxsi məlumatlarımın işlənməsinə razılıq verirəm. Bu, sualıma cavab verilməsi üçün lazımdır. Şəxsi məlumatlarım üçüncü şəxslərə verilməyəcək.*
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
                          Göndərilir...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Sualı göndər
                        </>
                      )}
                    </button>
                    
                    <p className="mt-4 text-sm text-gray-500 text-center">
                      * ilə işarələnmiş xanalar mütləq doldurulmalıdır
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
                  <h3 className="text-xl font-semibold mb-3">Niyə onlayn məsləhət almalı?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Vaxt və səyahət xərclərinə qənaət</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Səyahətdən əvvəl müalicə haqqında məlumat</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Müalicəyə uyğunluğunuzun qiymətləndirilməsi</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Təcrübəli mütəxəssislərdən peşəkar məsləhət</span>
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