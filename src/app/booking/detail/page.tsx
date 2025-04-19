'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUserAlt, FaMapMarkerAlt, FaCheckCircle, FaHourglass, FaCreditCard, FaTimesCircle } from 'react-icons/fa';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

type BookingDetail = {
  id: string;
  sanatoriumName: string;
  sanatoriumImage: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomType: string;
  treatmentType: string;
  totalPrice: string;
  status: BookingStatus;
  paymentStatus: 'paid' | 'pending';
  bookingDate: string;
  specialRequests?: string;
};

export default function BookingDetailPage() {
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real application, you would fetch this data from an API based on the booking ID
  // For demo purposes, we're using a mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBooking({
        id: 'BK293847',
        sanatoriumName: 'Qaşaltı Sanatoriyası',
        sanatoriumImage: '/images/sanatoriums/qashalti-1.jpg',
        checkInDate: '2023-12-15',
        checkOutDate: '2023-12-25',
        guestName: 'Əli Məmmədov',
        guestEmail: 'ali.mammadov@example.com',
        guestPhone: '+994 50 123 45 67',
        roomType: 'Standard Double Room',
        treatmentType: 'Naftalan Bath Therapy',
        totalPrice: '1500 AZN',
        status: 'confirmed',
        paymentStatus: 'paid',
        bookingDate: '2023-11-20',
        specialRequests: 'Otağın dəniz mənzərəli olmasını xahiş edirəm.'
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="mr-2" />;
      case 'pending':
        return <FaHourglass className="mr-2" />;
      case 'cancelled':
        return <FaTimesCircle className="mr-2" />;
      case 'completed':
        return <FaCheckCircle className="mr-2" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'Təsdiqlənib';
      case 'pending':
        return 'Gözləmədə';
      case 'cancelled':
        return 'Ləğv edilib';
      case 'completed':
        return 'Tamamlanıb';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="pt-[72px] md:pt-[80px] flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Məlumatlar yüklənir...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="pt-[72px] md:pt-[80px] container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rezervasiya tapılmadı</h2>
          <p className="text-gray-600 mb-8">Axtardığınız rezervasiya məlumatları tapılmadı.</p>
          <Link 
            href="/contact" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Bizə yazın
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Rezervasiya məlumatları</h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl mb-4 text-blue-100">
              Rezervasiya nömrəsi: <span className="font-semibold">{booking.id}</span>
            </p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              {getStatusText(booking.status)}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Booking Details */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Rezervasiya haqqında</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      <Image 
                        src={booking.sanatoriumImage} 
                        alt={booking.sanatoriumName} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.sanatoriumName}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaMapMarkerAlt className="mr-1 text-blue-500" />
                      <span>Naftalan şəhəri</span>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-600">Giriş tarixi:</div>
                        <div className="font-medium">{formatDate(booking.checkInDate)}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-600">Çıxış tarixi:</div>
                        <div className="font-medium">{formatDate(booking.checkOutDate)}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-600">Otaq tipi:</div>
                        <div className="font-medium">{booking.roomType}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-gray-600">Müalicə tipi:</div>
                        <div className="font-medium">{booking.treatmentType}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Qonaq məlumatları</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <FaUserAlt className="mt-1 mr-3 text-blue-500" />
                        <div>
                          <div className="text-gray-600 text-sm">Ad və Soyad</div>
                          <div className="font-medium">{booking.guestName}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaCalendarAlt className="mt-1 mr-3 text-blue-500" />
                        <div>
                          <div className="text-gray-600 text-sm">Rezervasiya tarixi</div>
                          <div className="font-medium">{formatDate(booking.bookingDate)}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 mt-1 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <div className="text-gray-600 text-sm">E-mail</div>
                          <div className="font-medium">{booking.guestEmail}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 mt-1 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <div className="text-gray-600 text-sm">Telefon</div>
                          <div className="font-medium">{booking.guestPhone}</div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Ödəniş məlumatları</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-600">Ümumi məbləğ:</div>
                        <div className="font-medium text-lg">{booking.totalPrice}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-gray-600">Ödəniş statusu:</div>
                        <div className="font-medium flex items-center">
                          {booking.paymentStatus === 'paid' ? (
                            <>
                              <FaCheckCircle className="text-green-500 mr-1" />
                              Ödənilib
                            </>
                          ) : (
                            <>
                              <FaCreditCard className="text-yellow-500 mr-1" />
                              Gözləmədə
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {booking.specialRequests && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Xüsusi istəklər</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-600">{booking.specialRequests}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-gray-600">Rezervasiya ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın</p>
                    <p className="font-medium">+994 50 123 45 67</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    {booking.status === 'confirmed' && (
                      <Link 
                        href="/contact?subject=cancel" 
                        className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Ləğv etmək
                      </Link>
                    )}
                    
                    <Link 
                      href="/contact" 
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Əlaqə
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/sanatoriums/naftalan" 
                className="text-blue-500 hover:underline"
              >
                Bütün sanatoriumlara baxın
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">Digər xidmətlər</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/treatments/naftalan-bath.jpg" 
                  alt="Naftalan müalicəsi" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Naftalan müalicəsi</h3>
                <p className="text-gray-600 mb-4">
                  Naftalan nefti ilə müalicə, bir çox xəstəliklərin müalicəsində təsdiq edilmiş üsuldur. Bu müalicə oynaq və dəri xəstəlikləri üçün xüsusilə effektivdir.
                </p>
                <Link 
                  href="/about/treatments" 
                  className="text-blue-500 hover:underline"
                >
                  Ətraflı
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/sanatoriums/azerbaijan-resorts.jpg" 
                  alt="Digər sanatoriumlar" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Digər sanatoriumlar</h3>
                <p className="text-gray-600 mb-4">
                  Azərbaycanın müxtəlif bölgələrində yerləşən digər müalicəvi kurortlar və sanatoriumlar ilə tanış olun.
                </p>
                <Link 
                  href="/sanatoriums/other" 
                  className="text-blue-500 hover:underline"
                >
                  Ətraflı
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/history/naftalan-old.jpg" 
                  alt="Naftalan tarixi" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Naftalan tarixi</h3>
                <p className="text-gray-600 mb-4">
                  Naftalan neftinin tarixi, kəşfindən müasir tibbi istifadəsinə qədər uzun və maraqlı bir yol keçmişdir.
                </p>
                <Link 
                  href="/about/history" 
                  className="text-blue-500 hover:underline"
                >
                  Ətraflı
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 