'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaSpa, FaShieldAlt, FaMapMarkerAlt, FaPhoneAlt, FaGlobe } from 'react-icons/fa';

type Sanatorium = {
  id: number;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  description: string;
  images: string[];
  features: string[];
  priceRange: string;
};

export default function NaftalanSanatoriumsPage() {
  const [selectedSanatorium, setSelectedSanatorium] = useState<number | null>(null);

  const sanatoriums: Sanatorium[] = [
    {
      id: 1,
      name: 'Qaşaltı Sanatoriyası',
      address: 'Naftalan şəhəri, Qaşaltı küçəsi, 15',
      phone: '+994 50 123 45 67',
      website: 'https://qashalti.az',
      rating: 4.8,
      description: 'Qaşaltı Sanatoriyası, Naftalan şəhərinin mərkəzində yerləşir və müasir tibbi avadanlıqlarla təchiz olunmuşdur. Naftalan nefti ilə müalicə ilə yanaşı, müxtəlif fizioterapiya və wellness xidmətləri təklif edir. Sanatoriya, rahat otaqları, geniş yaşıl ərazisi və müasir infrastrukturu ilə fərqlənir.',
      images: [
        '/images/sanatoriums/qashalti-1.jpg',
        '/images/sanatoriums/qashalti-2.jpg',
        '/images/sanatoriums/qashalti-3.jpg'
      ],
      features: ['wifi', 'pool', 'parking', 'restaurant', 'spa', 'security'],
      priceRange: '100-250 AZN/gün'
    },
    {
      id: 2,
      name: 'Chinar Hotel & Spa Naftalan',
      address: 'Naftalan şəhəri, Natəvan küçəsi, 8',
      phone: '+994 50 987 65 43',
      website: 'https://chinarhotelspa.az',
      rating: 4.9,
      description: 'Chinar Hotel & Spa Naftalan, 5 ulduzlu xidmət səviyyəsi ilə Naftalan şəhərinin ən lüks sağlamlıq mərkəzlərindən biridir. Müasir müalicə mərkəzi, geniş SPA kompleksi, böyük hovuz və fitness mərkəzi ilə qonaqlarına premium xidmətlər təklif edir. Lüks otaqlar və süitlər rahatlıq və zərifliyi bir araya gətirir.',
      images: [
        '/images/sanatoriums/chinar-1.jpg',
        '/images/sanatoriums/chinar-2.jpg',
        '/images/sanatoriums/chinar-3.jpg'
      ],
      features: ['wifi', 'pool', 'parking', 'restaurant', 'spa', 'security'],
      priceRange: '200-500 AZN/gün'
    },
    {
      id: 3,
      name: 'Naftalan Hotel by Rixos',
      address: 'Naftalan şəhəri, Heydar Əliyev prospekti, 20',
      phone: '+994 50 555 55 55',
      website: 'https://naftalanhotel.com',
      rating: 4.7,
      description: 'Naftalan Hotel by Rixos, beynəlxalq standartlara uyğun xidmətləri ilə tanınan sağlamlıq mərkəzidir. Kompleks daxilində müasir tibbi mərkəz, açıq və qapalı hovuzlar, tennis kortları və müxtəlif əyləncə imkanları mövcuddur. Naftalan nefti ilə müalicə üçün xüsusi təchiz olunmuş kabinetlər və professional tibbi heyət xidmətinizdədir.',
      images: [
        '/images/sanatoriums/rixos-1.jpg',
        '/images/sanatoriums/rixos-2.jpg',
        '/images/sanatoriums/rixos-3.jpg'
      ],
      features: ['wifi', 'pool', 'parking', 'restaurant', 'spa', 'security'],
      priceRange: '180-450 AZN/gün'
    },
    {
      id: 4,
      name: 'Naftalan Medical Center',
      address: 'Naftalan şəhəri, Nizami küçəsi, 5',
      phone: '+994 50 111 22 33',
      website: 'https://naftalanmedical.az',
      rating: 4.5,
      description: 'Naftalan Medical Center, ənənəvi müalicə üsulları ilə müasir tibbi texnologiyaların birləşdiyi sağlamlıq mərkəzidir. Oynaq və dəri xəstəliklərinin müalicəsində ixtisaslaşmış mərkəz, fərdi yanaşma və yüksək keyfiyyətli xidmətləri ilə seçilir. Kompleksdə rahat otaqlar, müalicə kabinetləri və istirahət zonaları mövcuddur.',
      images: [
        '/images/sanatoriums/medical-1.jpg',
        '/images/sanatoriums/medical-2.jpg',
        '/images/sanatoriums/medical-3.jpg'
      ],
      features: ['wifi', 'parking', 'restaurant', 'spa', 'security'],
      priceRange: '80-180 AZN/gün'
    },
    {
      id: 5,
      name: 'Naftalan Resort',
      address: 'Naftalan şəhəri, Bakı küçəsi, 12',
      phone: '+994 50 444 33 22',
      website: 'https://naftalanresort.az',
      rating: 4.6,
      description: 'Naftalan Resort, ailəvi istirahət üçün ideal şərait təklif edən kurort kompleksidir. Müxtəlif növ otaqlar və kotteclər, açıq və qapalı hovuzlar, uşaq əyləncə mərkəzi və geniş yaşıl ərazi ilə qonaqlarına həm müalicə, həm də istirahət imkanı verir. Kompleksdə Naftalan nefti ilə müalicə üçün bütün zəruri şərait yaradılmışdır.',
      images: [
        '/images/sanatoriums/resort-1.jpg',
        '/images/sanatoriums/resort-2.jpg',
        '/images/sanatoriums/resort-3.jpg'
      ],
      features: ['wifi', 'pool', 'parking', 'restaurant', 'spa', 'security'],
      priceRange: '120-300 AZN/gün'
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const renderFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'wifi':
        return <FaWifi className="text-blue-500" title="Wi-Fi" />;
      case 'pool':
        return <FaSwimmingPool className="text-blue-500" title="Hovuz" />;
      case 'parking':
        return <FaParking className="text-blue-500" title="Dayanacaq" />;
      case 'restaurant':
        return <FaUtensils className="text-blue-500" title="Restoran" />;
      case 'spa':
        return <FaSpa className="text-blue-500" title="SPA" />;
      case 'security':
        return <FaShieldAlt className="text-blue-500" title="Təhlükəsizlik" />;
      default:
        return null;
    }
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Naftalan Sanatoriumları</h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Naftalan şəhərində yerləşən müasir sanatoriumlar və sağlamlıq mərkəzləri
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Naftalan şəhərinin müalicə mərkəzləri</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Naftalan şəhərində yerləşən sanatoriumlar və sağlamlıq mərkəzləri, müasir tibbi avadanlıqlar və peşəkar həkim heyəti ilə müxtəlif xəstəliklərin müalicəsi üçün ideal şərait yaradır.
                </p>
                <p>
                  Bu sanatoriumlarda sizə təklif olunur:
                </p>
                <ul>
                  <li>Naftalan nefti ilə müalicə vannalar</li>
                  <li>Fizioterapiya və reabilitasiya xidmətləri</li>
                  <li>SPA və wellness prosedurları</li>
                  <li>Rahat otaqlar və süitlər</li>
                  <li>Restoranlar və kafe</li>
                  <li>İstirahət və əyləncə imkanları</li>
                </ul>
                <p>
                  Sağlamlığınızı qorumaq və müalicə almaq üçün Naftalan şəhərinin sanatoriumlarını seçin və professional tibbi xidmətlərdən faydalanın.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/images/sanatoriums/naftalan-overview.jpg" 
                alt="Naftalan sanatoriumları" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sanatoriums List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Sanatoriumlar</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Naftalan şəhərində yerləşən ən yaxşı sanatoriumlar və müalicə mərkəzləri ilə tanış olun
            </p>
          </motion.div>
          
          <div className="space-y-12">
            {sanatoriums.map((sanatorium, index) => (
              <motion.div
                key={sanatorium.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUpVariant}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="grid md:grid-cols-3 h-full">
                  <div className="relative h-64 md:h-full md:col-span-1">
                    <Image 
                      src={sanatorium.images[0]} 
                      alt={sanatorium.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-6 md:col-span-2">
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{sanatorium.name}</h3>
                      <div className="flex items-center mt-1 md:mt-0">
                        <div className="flex mr-2">{renderStars(sanatorium.rating)}</div>
                        <span className="text-lg font-semibold text-gray-700">{sanatorium.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-4">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1 text-blue-500" />
                        <span>{sanatorium.address}</span>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <FaPhoneAlt className="mr-1 text-blue-500" />
                        <span>{sanatorium.phone}</span>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <FaGlobe className="mr-1 text-blue-500" />
                        <a href={sanatorium.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Veb sayt
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{sanatorium.description}</p>
                    
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-3 mb-4 md:mb-0">
                        {sanatorium.features.map((feature, i) => (
                          <div key={i} className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50">
                            {renderFeatureIcon(feature)}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
                        <div className="text-sm font-medium text-gray-500">
                          Qiymət: <span className="text-blue-500">{sanatorium.priceRange}</span>
                        </div>
                        
                        <button
                          onClick={() => setSelectedSanatorium(selectedSanatorium === sanatorium.id ? null : sanatorium.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          {selectedSanatorium === sanatorium.id ? 'Bağla' : 'Ətraflı'}
                        </button>
                      </div>
                    </div>
                    
                    {selectedSanatorium === sanatorium.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-200"
                      >
                        <h4 className="text-lg font-semibold mb-4 text-gray-800">Fotolar</h4>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {sanatorium.images.map((image, i) => (
                            <div key={i} className="relative h-32 rounded-lg overflow-hidden">
                              <Image 
                                src={image} 
                                alt={`${sanatorium.name} - foto ${i+1}`} 
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-center mt-4">
                          <Link 
                            href="/contact"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Rezervasiya et
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Digər sanatorium seçimləri</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Azərbaycanın digər bölgələrindəki müalicəvi kurortlar və sanatoriumlar ilə tanış olun
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              variants={fadeInUpVariant}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/sanatoriums/other-duzdagh.jpg" 
                  alt="Duzdağ" 
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Duzdağ</h3>
                <p className="text-gray-600 mb-4">
                  Naxçıvanda yerləşən Duzdağ Fizioterapiya Mərkəzi, duz mağaralarında tənəffüs yolu xəstəliklərinin müalicəsi üçün unikal şərait təklif edir.
                </p>
                <Link 
                  href="/sanatoriums/other"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Ətraflı
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/sanatoriums/other-istisu.jpg" 
                  alt="İstisu" 
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">İstisu</h3>
                <p className="text-gray-600 mb-4">
                  Kəlbəcərdə yerləşən İstisu kurortu, mineral suların müalicəvi xüsusiyyətləri ilə tanınan məşhur istirahət və sağlamlıq mərkəzidir.
                </p>
                <Link 
                  href="/sanatoriums/other"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Ətraflı
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              variants={fadeInUpVariant}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/sanatoriums/other-galaalti.jpg" 
                  alt="Qalaaltı" 
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Qalaaltı</h3>
                <p className="text-gray-600 mb-4">
                  Şabran rayonunda yerləşən Qalaaltı Hotel & SPA, nadir mineral suları və müasir müalicə imkanları ilə böyrək xəstəliklərinin müalicəsində ixtisaslaşmışdır.
                </p>
                <Link 
                  href="/sanatoriums/other"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Ətraflı
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Sağlamlığınıza qovuşmaq üçün indi rezervasiya edin</h2>
              <p className="text-xl mb-8 text-blue-100">
                Naftalan sanatoriumlarında müalicə və istirahət üçün yer ayırmaq üçün bizimlə əlaqə saxlayın
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Əlaqə
                </Link>
                <Link href="/about/treatments" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                  Müalicə olunan xəstəliklər
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 