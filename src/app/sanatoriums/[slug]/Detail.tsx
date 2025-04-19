'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaStar, FaCheck, FaCalendarAlt } from 'react-icons/fa';
import { Sanatorium, Treatment, Review } from '@/lib/types';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function SanatoriumDetailPage({ params }: PageProps) {
  const [sanatorium, setSanatorium] = useState<Sanatorium | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'treatments' | 'reviews'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Simulated data fetch based on slug
  useEffect(() => {
    // This would be an API call in a real application
    setIsLoading(true);
    setTimeout(() => {
      const mockSanatorium: Sanatorium = {
        id: '1',
        name: 'Qaşaltı Sanatoriyası',
        location: 'Naftalan, Azerbaijan',
        description: 'Qaşaltı Sanatoriyası Naftalanda yerləşən, təbii naftalan nefti ilə müalicə xidmətləri təklif edən bir sağlamlıq mərkəzidir. 2013-cü ildə tamamilə yenidən təmir edilmiş bu sanatoriya, müasir tibbi avadanlıqları və peşəkar həkim heyəti ilə xidmət göstərir. Sanatoriya kompleksində müxtəlif növ otaqlar, restoran, idman zalı, üzgüçülük hovuzu və istirahət üçün yaşıl ərazi mövcuddur. Naftalan nefti ilə müalicə burada dəri xəstəlikləri, oynaq ağrıları və bir sıra digər xəstəliklər üçün təklif olunur.',
        rating: 4.8,
        price: 120,
        image: '/images/sanatoriums/qashalti-1.jpg',
        images: [
          '/images/sanatoriums/qashalti-1.jpg',
          '/images/sanatoriums/qashalti-2.jpg',
          '/images/sanatoriums/qashalti-3.jpg',
          '/images/sanatoriums/qashalti-4.jpg'
        ],
        facilities: [
          'Pulsuz Wi-Fi',
          'Restoran',
          'Üzgüçülük hovuzu',
          'Spa və sağlamlıq mərkəzi',
          'Fitness mərkəzi',
          'Kondisioner',
          '24/7 resepşn',
          'Park yeri'
        ],
        treatments: [
          {
            id: '1',
            title: 'Naftalan Vanna Müalicəsi',
            description: 'Klassik naftalan nefti vannası',
            image: '/images/treatments/naftalan-bath.jpg',
            icon: 'bath',
            duration: '15-20 dəqiqə',
            price: 30
          },
          {
            id: '2',
            title: 'Naftalan Kompresi',
            description: 'Bədənin müəyyən hissələrinə naftalan nefti ilə kompres qoyulması',
            image: '/images/treatments/naftalan-compress.jpg',
            icon: 'spa',
            duration: '30-40 dəqiqə',
            price: 25
          },
          {
            id: '3',
            title: 'Fizioterapiya Seansları',
            description: 'Müxtəlif fizioterapiya prosedurları',
            image: '/images/treatments/physiotherapy.jpg',
            icon: 'heartbeat',
            duration: '30 dəqiqə',
            price: 20
          }
        ] as unknown as string[],
        reviews: [
          {
            id: '1',
            userId: 'user1',
            userName: 'Farid Aliyev',
            rating: 5,
            content: 'Sanatoriyada 10 günlük müalicə kursu keçdim. Xidmət, şərait və müalicənin keyfiyyəti çox yüksək səviyyədə idi. Naftalan müalicəsi oynaq ağrılarımı tamamilə aradan qaldırdı. Personalın peşəkarlığı və diqqəti xüsusilə qeyd edilməlidir.',
            date: '2023-06-15',
            entityId: '1',
            entityType: 'sanatorium',
            userImage: '/images/users/user1.jpg'
          },
          {
            id: '2',
            userId: 'user2',
            userName: 'Aygun Mammadova',
            rating: 4,
            content: 'Çox rahat və təmiz otaqlar. Müalicə prosedurları effektiv oldu. Yeməklər dadlı idi, lakin menyu bir az daha çeşidli ola bilərdi. Ümumilikdə səyahətimdən məmnun qaldım.',
            date: '2023-05-20',
            entityId: '1',
            entityType: 'sanatorium'
          }
        ] as Review[]
      };
      
      setSanatorium(mockSanatorium);
      if (mockSanatorium.images && mockSanatorium.images.length > 0) {
        setSelectedImage(mockSanatorium.images[0]);
      }
      setIsLoading(false);
    }, 1000);
  }, [params.slug]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
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

  if (!sanatorium) {
    return (
      <div className="pt-[72px] md:pt-[80px] container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sanatoriya tapılmadı</h2>
          <p className="text-gray-600 mb-8">Axtardığınız sanatoriya məlumatları tapılmadı.</p>
          <Link 
            href="/sanatoriums" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Bütün sanatoriyalar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{sanatorium.name}</h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>{sanatorium.location}</span>
              </div>
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-2" />
                <span>{sanatorium.rating} ({sanatorium.reviews?.length || 0} rəy)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="relative h-80 w-full">
                {selectedImage && (
                  <Image 
                    src={selectedImage} 
                    alt={sanatorium.name} 
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.jpg";
                    }}
                  />
                )}
              </div>
              {sanatorium.images && sanatorium.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 p-2">
                  {sanatorium.images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative h-20 cursor-pointer rounded-md overflow-hidden ${selectedImage === image ? 'ring-2 ring-amber-500' : ''}`}
                      onClick={() => handleImageClick(image)}
                    >
                      <Image 
                        src={image} 
                        alt={`${sanatorium.name} - ${index + 1}`} 
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button 
                    className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Ümumi məlumat
                  </button>
                  <button 
                    className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'treatments' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('treatments')}
                  >
                    Müalicələr
                  </button>
                  <button 
                    className={`px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'reviews' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Rəylər ({sanatorium.reviews?.length || 0})
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Haqqında</h2>
                    <p className="text-gray-700 mb-6">{sanatorium.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Xidmətlər və imkanlar</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 mb-6">
                      {sanatorium.facilities?.map((facility, index) => (
                        <div key={index} className="flex items-center">
                          <FaCheck className="text-green-500 mr-2" />
                          <span className="text-gray-600">{facility}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Mövqe</h3>
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                      <p className="text-gray-700 mb-2">
                        <strong>Ünvan:</strong> Naftalan şəhəri, Qaşaltı Sanatoriyası
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Bakıdan məsafə:</strong> 320 km
                      </p>
                      <p className="text-gray-700">
                        <strong>Yaxınlıqda:</strong> Naftalan şəhər mərkəzi (3 km), Gəncə şəhəri (35 km)
                      </p>
                    </div>
                    
                    <div className="relative h-64 w-full rounded-lg overflow-hidden">
                      <Image 
                        src="/images/maps/naftalan-map.jpg" 
                        alt="Sanatorium location map" 
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {activeTab === 'treatments' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Təklif olunan müalicələr</h2>
                    
                    <div className="space-y-6">
                      {sanatorium.treatments && sanatorium.treatments.length > 0 ? (
                        (sanatorium.treatments as unknown as Treatment[]).map((treatment) => (
                          <div key={treatment.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
                            <div className="md:w-1/4">
                              <div className="relative h-32 w-full rounded-lg overflow-hidden">
                                <Image 
                                  src={treatment.image} 
                                  alt={treatment.title} 
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder-image.jpg";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="md:w-3/4">
                              <h3 className="text-lg font-semibold mb-2">{treatment.title}</h3>
                              <p className="text-gray-600 mb-3">{treatment.description}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                {treatment.duration && (
                                  <div className="flex items-center text-gray-600">
                                    <FaCalendarAlt className="mr-1" />
                                    <span>Müddət: {treatment.duration}</span>
                                  </div>
                                )}
                                {treatment.price !== undefined && (
                                  <div className="text-gray-600">
                                    Qiymət: <span className="font-medium">{treatment.price} AZN</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">Hal-hazırda müalicə məlumatları mövcud deyil.</p>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Müştəri rəyləri</h2>
                    
                    <div className="space-y-6">
                      {sanatorium.reviews && sanatorium.reviews.length > 0 ? (
                        sanatorium.reviews.map((review) => (
                          <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-start gap-4 mb-3">
                              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                <Image 
                                  src={review.userImage || '/images/users/default.jpg'} 
                                  alt={review.userName} 
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/images/users/default.jpg";
                                  }}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{review.userName}</h4>
                                <div className="flex items-center">
                                  <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar 
                                        key={i} 
                                        className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {review.date ? new Date(review.date).toLocaleDateString('az-AZ') : ''}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">Hələ heç bir müştəri rəyi yoxdur.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">Qiymət və rezervasiya</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Başlayan qiymət:</span>
                    <span className="text-2xl font-bold text-amber-600">{sanatorium.price} AZN</span>
                  </div>
                  <div className="text-sm text-gray-500">adam başına / gecə</div>
                </div>
                
                <Link 
                  href="/booking"
                  className="block w-full py-3 px-4 bg-amber-500 text-white text-center font-medium rounded-lg hover:bg-amber-600 transition-colors mb-4"
                >
                  İndi rezervasiya et
                </Link>
                
                <Link 
                  href="/contact"
                  className="block w-full py-3 px-4 border border-amber-500 text-amber-500 text-center font-medium rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Sual vermək
                </Link>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p className="mb-2">* Qiymətlər otaq tipinə və mövsümə görə dəyişə bilər</p>
                  <p>* Müalicə paketlərinin qiyməti əlavə olaraq hesablanır</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Sanatoriums */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">Oxşar Sanatoriyalar</h2>
          
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
                  src="/images/sanatoriums/chinar-1.jpg" 
                  alt="Çinar Sanatoriyası" 
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">Çinar Sanatoriyası</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.6</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>Naftalan, Azərbaycan</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Çinar Sanatoriyası Naftalanda müasir tibbi avadanlıqları ilə tanınan naftalan müalicə mərkəzidir.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-amber-600">100 AZN / gecə</span>
                  <Link 
                    href="/sanatoriums/chinar" 
                    className="text-amber-500 hover:underline"
                  >
                    Ətraflı
                  </Link>
                </div>
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
                  src="/images/sanatoriums/mocuze-1.jpg" 
                  alt="Möcüzə Sanatoriyası" 
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">Möcüzə Sanatoriyası</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.5</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>Naftalan, Azərbaycan</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Möcüzə Sanatoriyası geniş müalicə imkanları və rahat otaqları ilə qonaqlarını qarşılayır.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-amber-600">110 AZN / gecə</span>
                  <Link 
                    href="/sanatoriums/mocuze" 
                    className="text-amber-500 hover:underline"
                  >
                    Ətraflı
                  </Link>
                </div>
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
                  src="/images/sanatoriums/karabakh-1.jpg" 
                  alt="Qarabağ Sanatoriyası" 
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">Qarabağ Sanatoriyası</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.7</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>Naftalan, Azərbaycan</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Qarabağ Sanatoriyası peşəkar həkim heyəti və yüksək keyfiyyətli xidməti ilə fərqlənir.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-amber-600">130 AZN / gecə</span>
                  <Link 
                    href="/sanatoriums/karabakh" 
                    className="text-amber-500 hover:underline"
                  >
                    Ətraflı
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}