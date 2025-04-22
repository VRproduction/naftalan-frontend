'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaGlobe, FaArrowRight } from 'react-icons/fa';
import SanatoriumComponent, { Sanatorium } from '@/features/common/SanatoriumHorizontal';

type OtherSanatorium = {
  id: number;
  name: string;
  location: string;
  description: string;
  treatmentFor: string[];
  image: string;
  rating: number;
  website?: string;
};

export default function OtherSanatoriumsPage() {
  const otherSanatoriums: OtherSanatorium[] = [
    {
      id: 1,
      name: 'Duzdağ Fizioterapiya Mərkəzi',
      location: 'Naxçıvan MR, Naxçıvan şəhəri',
      description: 'Naxçıvanda yerləşən Duzdağ Fizioterapiya Mərkəzi, duz mağaralarında aparılan unikal müalicə üsulları ilə məşhurdur. Burada tənəffüs yolları xəstəliklərinin müalicəsi üçün ideal şərait yaradılmışdır. Duz mağaralarında aparılan speleoterapiya tənəffüs yolu xəstəliklərinin, xüsusilə də astma və bronxitin müalicəsində yüksək effektivliyə malikdir.',
      treatmentFor: [
        'Astma',
        'Bronxit',
        'Allergik rinit',
        'Ağciyər xəstəlikləri',
        'İmmun sisteminin gücləndirilməsi'
      ],
      image: '/images/sanatoriums/duzdagh.jpg',
      rating: 4.7,
      website: 'https://duzdagh.az'
    },
    {
      id: 2,
      name: 'İstisu Sanatoriyası',
      location: 'Kəlbəcər rayonu',
      description: 'Kəlbəcər rayonunda yerləşən İstisu Sanatoriyası, dünyada nadir rast gəlinən müalicəvi mineral suları ilə tanınır. Bu sular mədə-bağırsaq, qaraciyər və öd kisəsi xəstəliklərinin müalicəsində istifadə edilir. Sanatoriya təmiz dağ havası və gözəl təbiəti ilə həm müalicə, həm də istirahət üçün əlverişli məkandır.',
      treatmentFor: [
        'Mədə-bağırsaq xəstəlikləri',
        'Qaraciyər xəstəlikləri',
        'Öd kisəsi xəstəlikləri',
        'Metabolik pozuntular',
        'Ürək-damar xəstəlikləri'
      ],
      image: '/images/sanatoriums/istisu.jpg',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Qalaaltı Hotel & SPA',
      location: 'Şabran rayonu',
      description: 'Şabran rayonunda yerləşən Qalaaltı Hotel & SPA, müasir tibbi avadanlıqlarla təchiz olunmuş sağlamlıq mərkəzidir. Bu kurort böyrək və sidik yolu xəstəliklərinin müalicəsində ixtisaslaşmışdır. Qalaaltı mineral suları böyrək daşlarının təbii yolla xaric olunmasına kömək edir və böyrək funksiyalarını yaxşılaşdırır.',
      treatmentFor: [
        'Böyrək daşları',
        'Sidik yolu xəstəlikləri',
        'Podaqra',
        'Maddələr mübadiləsi pozuntuları',
        'Stress və yorğunluq'
      ],
      image: '/images/sanatoriums/galaalti.jpg',
      rating: 4.8,
      website: 'https://galaalti.az'
    },
    {
      id: 4,
      name: 'Bilgəh Sağlamlıq Mərkəzi',
      location: 'Bakı, Bilgəh qəsəbəsi',
      description: 'Bilgəh qəsəbəsində, Xəzər dənizi sahilində yerləşən Bilgəh Sağlamlıq Mərkəzi, sinir sistemi və dayaq-hərəkət aparatı xəstəliklərinin müalicəsində ixtisaslaşıb. Dəniz iqlimi, balneoterapiya və palçıq müalicələri ilə kompleks yanaşma təklif edir. Mərkəz həm də kardioloji və endokrinoloji xəstəliklərin müalicəsi ilə məşğul olur.',
      treatmentFor: [
        'Nevroloji xəstəliklər',
        'Oynaq xəstəlikləri',
        'Onurğa problemləri',
        'Kardioloji xəstəliklər',
        'Endokrin xəstəliklər'
      ],
      image: '/images/sanatoriums/bilgah.jpg',
      rating: 4.6,
      website: 'https://bilgahresort.az'
    },
    {
      id: 5,
      name: 'Şıxov Müalicəvi İstirahət Mərkəzi',
      location: 'Bakı, Şıxov çimərliyİ',
      description: 'Bakıda Şıxov çimərliyində yerləşən Müalicəvi İstirahət Mərkəzi, mineral palçıq müalicələri ilə məşhurdur. Dəri xəstəlikləri, oynaq və dayaq-hərəkət aparatı problemlərinin müalicəsində effektivdir. Xəzər dənizinin sahilində yerləşməsi səbəbindən talassoterapiya imkanları da təklif edilir.',
      treatmentFor: [
        'Dəri xəstəlikləri',
        'Artrit və artroz',
        'Radikulit',
        'Dəri gənləşməsi',
        'Əzələ-sümük sistemi xəstəlikləri'
      ],
      image: '/images/sanatoriums/shikhov.jpg',
      rating: 4.3
    },
    {
      id: 6,
      name: 'Lankaran Springs Wellness Resort',
      location: 'Lənkəran rayonu',
      description: 'Lənkəran rayonunda yerləşən Springs Wellness Resort, termal suları ilə tanınır. Bu sular əsasən oynaq, dəri və sinir sistemi xəstəliklərinin müalicəsində istifadə olunur. Kurort həmçinin müasir SPA, fitness mərkəzi və digər istirahət imkanları təklif edir. Subtropik iqlimi və zəngin təbiəti istirahəti daha da xoş edir.',
      treatmentFor: [
        'Revmatizm',
        'Oynaq ağrıları',
        'Nevroloji xəstəliklər',
        'Sinir sistemi pozuntuları',
        'Stress və depressiya'
      ],
      image: '/images/sanatoriums/lankaran.jpg',
      rating: 4.7,
      website: 'https://lankaransprings.az'
    }
  ];

  // Convert OtherSanatorium to Sanatorium type for the component
  const sanatoriums: Sanatorium[] = otherSanatoriums.map(item => {
    // Generate feature list based on treatments/facilities
    let features: string[] = [];
    if (item.name.includes('SPA') || item.treatmentFor.some(t => t.toLowerCase().includes('spa'))) {
      features.push('spa');
    }
    if (item.treatmentFor.some(t => t.toLowerCase().includes('stress') || t.toLowerCase().includes('depressiya'))) {
      features.push('security');
    }
    if (item.location.includes('sahil') || item.location.includes('dəniz') || item.name.includes('Resort')) {
      features.push('pool');
    }
    features.push('wifi', 'restaurant', 'parking');
    features = [...new Set(features)].slice(0, 5); // Deduplicate and limit to 5 features
    
    // Generate more realistic image arrays
    const imageCount = Math.floor(Math.random() * 4) + 3; // 3-6 images
    const images = Array(imageCount).fill(item.image);
    
    // Generate price range based on rating
    const basePrice = Math.floor(item.rating * 20);
    const priceRange = `${basePrice}-${basePrice + 70} AZN`;
    
    return {
      id: item.id,
      name: item.name,
      address: item.location,
      phone: `+994 ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`,
      website: item.website || 'https://naftalan.az',
      rating: item.rating,
      description: item.description,
      images: images,
      features: features,
      priceRange: priceRange,
    };
  });

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

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Custom styles for this page */}
      <style jsx global>{`
        /* Override Sanatorium component styles to match green theme */
        .sanatorium-wrapper a.text-blue-500:hover,
        .sanatorium-wrapper .text-blue-500, 
        .sanatorium-wrapper .text-blue-600 {
          color: rgb(22 163 74) !important; /* text-green-600 */
        }
        
        .sanatorium-wrapper .bg-blue-50 {
          background-color: rgb(240 253 244) !important; /* bg-green-50 */
        }
        
        .sanatorium-wrapper .text-blue-500 svg {
          color: rgb(22 163 74) !important; /* text-green-600 */
        }
        
        .sanatorium-wrapper a.bg-blue-600,
        .sanatorium-wrapper button.bg-blue-500 {
          background-color: rgb(22 163 74) !important; /* bg-green-600 */
        }
        
        .sanatorium-wrapper a.hover\\:bg-blue-700:hover,
        .sanatorium-wrapper button.hover\\:bg-blue-600:hover {
          background-color: rgb(21 128 61) !important; /* bg-green-700 */
        }
        
        .sanatorium-wrapper .hover\\:text-blue-600:hover {
          color: rgb(22 163 74) !important; /* text-green-600 */
        }
        
        .sanatorium-wrapper a.border-blue-500 {
          border-color: rgb(22 163 74) !important; /* border-green-600 */
        }
        
        .sanatorium-wrapper a.text-blue-500 {
          color: rgb(22 163 74) !important; /* text-green-600 */
        }
        
        .sanatorium-wrapper a.hover\\:bg-blue-50:hover {
          background-color: rgb(240 253 244) !important; /* bg-green-50 */
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Azərbaycanın sağlamlıq ocaqları</h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl mb-8 text-green-100">
              Azərbaycanın müxtəlif bölgələrində yerləşən unikal müalicəvi kurortlar və sanatoriumlar
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
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Təbii sərvətlərlə zəngin kurortlarımız</h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Azərbaycan təbii müalicəvi sərvətlərlə zəngin bir ölkədir. Naftalan nefti ilə yanaşı, ölkəmizin müxtəlif bölgələrində mineral sular, termal bulaqlar, müalicəvi palçıqlar və unikal iqlim şəraiti kimi təbii faktorlar mövcuddur.
                </p>
                <p>
                  Bu təbii sərvətlər əsasında yaradılmış sanatoriyalar və kurortlar müxtəlif xəstəliklərin müalicəsi üçün müasir tibbi xidmətlər təklif edir. Hər bir kurort özünəməxsus müalicəvi xüsusiyyətlərə malikdir və konkret xəstəlik qruplarının müalicəsində ixtisaslaşır.
                </p>
                <p>
                  Azərbaycanın müalicəvi kurortları təkcə sağlamlıq imkanları ilə deyil, həm də gözəl təbiəti, qonaqpərvərliyi və yüksək səviyyəli xidmətləri ilə seçilir.
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
                src="/images/sanatoriums/azerbaijan-resorts.jpg" 
                alt="Azərbaycan kurortları" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sanatoriums List - Updated to use the Sanatorium component */}
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Sanatoriumlar və kurortlar</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Azərbaycanın müxtəlif bölgələrində yerləşən ən məşhur sanatoriumlar və müalicəvi kurortlar
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {sanatoriums.map((sanatorium, index) => (
              <motion.div
                key={sanatorium.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUpVariant}
                className="sanatorium-wrapper"
              >
                <SanatoriumComponent 
                  sanatorium={sanatorium}
                  index={0} /* Set index to 0 to disable animation in the component since we're handling it here */
                />
                
                {/* Additional treatment info - custom for this page */}
                <div className="mt-3 p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="text-lg font-semibold mb-3 text-green-800">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Müalicə olunan xəstəliklər:
                    </div>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {otherSanatoriums[index].treatmentFor.map((treatment, i) => (
                      <div key={i} className="flex items-center text-gray-700">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                        <span>{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Types of Treatments */}
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Müalicə növləri</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Azərbaycan kurortlarında təklif olunan əsas müalicə növləri
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Balneoterapiya</h3>
              <p className="text-gray-600">
                Mineral və termal sularla müalicə üsulu olan balneoterapiya, orqanizmin bərpası, ağrıların azaldılması və ümumi sağlamlığın yaxşılaşdırılması üçün istifadə olunur. Müxtəlif kimyəvi tərkibli mineral sular müxtəlif xəstəliklərə kömək edir.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Palçıq müalicəsi</h3>
              <p className="text-gray-600">
                Müalicəvi palçıqlar dəri xəstəlikləri, oynaq və əzələ problemləri, sinir sistemi xəstəlikləri və bir çox digər sağlamlıq problemlərinin müalicəsində istifadə olunur. Palçıq aplikasiyaları və vannalar şəklində tətbiq edilir.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Speleoterapiya</h3>
              <p className="text-gray-600">
                Duz mağaralarında aparılan speleoterapiya, tənəffüs yolları xəstəliklərinin müalicəsində istifadə edilən effektiv üsuldur. Duz ionları ilə zəngin hava astma, bronxit və allergik xəstəliklərin müalicəsinə müsbət təsir göstərir.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Fizioterapiya</h3>
              <p className="text-gray-600">
                Müasir tibbi avadanlıqlarla aparılan fizioterapiya, bir çox xəstəliklərin müalicəsi və bərpası üçün istifadə olunur. Elektroterapiya, ultrasəs, lazer və maqnit terapiyası kimi üsullar əzələ-sümük sistemi və sinir sistemi xəstəliklərində geniş tətbiq edilir.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Klimatoterapiya</h3>
              <p className="text-gray-600">
                İqlim faktorlarından istifadə edərək aparılan müalicə üsulu olan klimatoterapiya, müxtəlif xəstəliklərin müalicəsi və sağlamlığın möhkəmləndirilməsi üçün istifadə olunur. Dağ iqlimi, dəniz iqlimi və meşə iqlimi müxtəlif xəstəliklərə fərqli təsir göstərir.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">SPA və Wellness</h3>
              <p className="text-gray-600">
                SPA və wellness prosedurları orqanizmin tonusunu artırmaq, stressin azaldılması və ümumi sağlamlığın yaxşılaşdırılması üçün istifadə olunur. Bu prosedurlar arasında masaj, aromaterapi, hidromasaj, vücut sarmaları və s. var.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Azərbaycanın təbii müalicə imkanlarını kəşf edin</h2>
              <p className="text-xl mb-8 text-green-100">
                Sağlamlığınızı qorumaq və müalicə almaq üçün Azərbaycanın kurort və sanatoriumlarını seçin
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center">
                  Ətraflı məlumat almaq <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/sanatoriums/naftalan" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors">
                  Naftalan sanatoriumları
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 