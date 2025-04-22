'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaInfoCircle, FaCheck, FaHotel } from 'react-icons/fa';

// Booking page component
export default function BookingPage() {
  const router = useRouter();
  
  // Static hotel info (will be made dynamic later)
  const hotelInfo = {
    name: "Naftalan Sağlamlıq Mərkəzi",
    location: "Naftalan, Azərbaycan"
  };
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    specialRequests: '',
    termsAccepted: false
  });
  
  // Form error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Booking success state
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
      return;
    }
    
    // Handle other inputs
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.firstName) newErrors.firstName = 'Ad daxil edilməlidir';
    if (!formData.lastName) newErrors.lastName = 'Soyad daxil edilməlidir';
    if (!formData.email) newErrors.email = 'E-poçt daxil edilməlidir';
    if (!formData.phone) newErrors.phone = 'Telefon daxil edilməlidir';
    if (!formData.checkIn) newErrors.checkIn = 'Giriş tarixi seçilməlidir';
    if (!formData.checkOut) newErrors.checkOut = 'Çıxış tarixi seçilməlidir';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Düzgün e-poçt daxil edin';
    }
    
    // Phone validation
    if (formData.phone && !/^\+?[0-9\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Düzgün telefon nömrəsi daxil edin';
    }
    
    // Date validation
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      
      if (checkIn >= checkOut) {
        newErrors.checkOut = 'Çıxış tarixi giriş tarixindən sonra olmalıdır';
      }
    }
    
    // Terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Şərtləri qəbul etməlisiniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to backend
      console.log('Form data submitted:', formData);
      
      // Show success message
      setBookingSuccess(true);
    }
  };
  
  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    return Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  const nights = calculateNights();
  
  // Fade in animation variant
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-blue-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Rezervasiya</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Sanatoriyamızda qalacağınız müddəti rezervasiya edin və sağlamlığınıza qovuşun
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Booking Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              {bookingSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-green-500 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Rezervasiyanız qəbul edildi!</h2>
                  <p className="text-gray-600 mb-6">
                    Rezervasiya sorğunuz uğurla göndərildi. Tezliklə sizinlə əlaqə saxlanılacaq və rezervasiyanız təsdiqlənəcək. Təşəkkür edirik!
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link 
                      href="/"
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all inline-block"
                    >
                      Ana səhifəyə qayıt
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                  {/* Hotel Information */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-8 flex items-start">
                    <FaHotel className="text-blue-500 mt-1 mr-3 flex-shrink-0 text-xl" />
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{hotelInfo.name}</h3>
                      <p className="text-gray-600">{hotelInfo.location}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Şəxsi məlumatlar</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Ad *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="Adınız"
                        />
                      </div>
                      {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Soyad *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="Soyadınız"
                        />
                      </div>
                      {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-poçt *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="sizin@email.com"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaPhone />
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="+994 XX XXX XX XX"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Tarix və qonaqlar</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Giriş tarixi *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaCalendarAlt />
                        </span>
                        <input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.checkIn ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                      {errors.checkIn && <p className="mt-1 text-sm text-red-500">{errors.checkIn}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Çıxış tarixi *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaCalendarAlt />
                        </span>
                        <input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.checkOut ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                      {errors.checkOut && <p className="mt-1 text-sm text-red-500">{errors.checkOut}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">Böyüklər</label>
                      <select
                        id="adults"
                        name="adults"
                        value={formData.adults}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'böyük' : 'böyük'}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">Uşaqlar (12 yaşa qədər)</label>
                      <select
                        id="children"
                        name="children"
                        value={formData.children}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[0, 1, 2, 3].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'uşaq' : 'uşaq'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Xüsusi istəklər</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Xüsusi istəkləriniz varsa, qeyd edin"
                    ></textarea>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="termsAccepted"
                          name="termsAccepted"
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className={`h-4 w-4 rounded text-blue-600 focus:ring-blue-500 ${errors.termsAccepted ? 'border-red-400' : ''}`}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                          Şərtləri və qaydaları qəbul edirəm *
                        </label>
                        <p className="text-gray-500">Rezervasiya şərtləri və qaydaları ilə tanış oldum və qəbul edirəm.</p>
                        {errors.termsAccepted && <p className="mt-1 text-sm text-red-500">{errors.termsAccepted}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-8">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Rezervasiya haqqında</h3>
                        <p className="text-sm text-gray-600">
                          Rezervasiya sorğunuzu göndərdikdən sonra sizinlə tezliklə əlaqə saxlanılacaq və təsdiqlənəcək.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors font-medium text-center"
                  >
                    Rezervasiya sorğusu göndər
                  </button>
                </form>
              )}
            </div>
            
            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Rezervasiya məlumatları</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sanatoriya:</span>
                    <span className="font-medium text-gray-800">{hotelInfo.name}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giriş tarixi:</span>
                    <span className="font-medium text-gray-800">
                      {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString('az-AZ') : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Çıxış tarixi:</span>
                    <span className="font-medium text-gray-800">
                      {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString('az-AZ') : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gecələmə:</span>
                    <span className="font-medium text-gray-800">{nights > 0 ? `${nights} gecə` : '-'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Qonaqlar:</span>
                    <span className="font-medium text-gray-800">
                      {formData.adults} böyük{formData.children > 0 ? `, ${formData.children} uşaq` : ''}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-700 text-center">
                    Rezervasiyanız qəbul edildikdən sonra sizinlə əlaqə saxlanılacaq
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Niyə bizimlə rezervasiya etməlisiniz?</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Rezervasiya sistemimizdə yer ayırmaq sadə, sürətli və rahatdır
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sadə və sürətli",
                description: "Cəmi bir neçə dəqiqə ərzində rezervasiya sorğusu göndərin və tezliklə cavab alın."
              },
              {
                title: "Şəxsi yanaşma",
                description: "Bütün xüsusi istəklər və tələblər birbaşa müzakirə edilir."
              },
              {
                title: "Çevik dəyişiklik imkanı",
                description: "Gəliş tarixindən 7 gün əvvələ qədər rezervasiyanızı pulsuz dəyişdirə bilərsiniz."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUpVariant}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 