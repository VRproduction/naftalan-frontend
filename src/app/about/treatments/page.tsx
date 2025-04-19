'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

type Treatment = {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  image: string;
  category: 'joint' | 'skin' | 'nervous' | 'gynecological' | 'other';
};

export default function TreatmentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const treatments: Treatment[] = [
    {
      id: 1,
      name: 'Artrit və artroz',
      description: 'Oynaqların iltihabı və degenerativ xəstəlikləri, naftalan nefti ilə müalicədən ən çox faydalanan xəstəliklər sırasındadır. Naftalan vannaları ağrını azaldır, iltihabı söndürür və oynaq funksiyalarını yaxşılaşdırır.',
      benefits: [
        'Oynaq ağrılarının azalması',
        'İltihabın azalması',
        'Oynaq funksiyalarının yaxşılaşması',
        'Qan dövranının yaxşılaşması',
        'Hərəkətliliyin artması'
      ],
      image: '/images/treatments/arthritis.jpg',
      category: 'joint'
    },
    {
      id: 2,
      name: 'Psoriaz',
      description: 'Psoriaz dəri hüceyrələrinin sürətlə çoxalması nəticəsində əmələ gələn xroniki dəri xəstəliyidir. Naftalan nefti psoriazın müalicəsində yüksək effektivliyə malikdir, qaşınmanı azaldır və dəri səthindəki pulcuqları yumşaldır.',
      benefits: [
        'Dəri səthinin normallaşması',
        'Qaşınmanın azalması',
        'İltihabın azalması',
        'Pulcuqların tökülməsi',
        'Yeni psoriaz ocaqlarının əmələ gəlməsinin qarşısının alınması'
      ],
      image: '/images/treatments/psoriasis.jpg',
      category: 'skin'
    },
    {
      id: 3,
      name: 'Dermatit',
      description: 'Müxtəlif növ dermatitlər (atopik, kontakt və s.) dərinin iltihabı xəstəlikləridir. Naftalan nefti ilə müalicə qaşınmanı azaldır, iltihabı söndürür və dərinin bərpasını sürətləndirir.',
      benefits: [
        'Qaşınmanın azalması',
        'Dəri bariyerinin bərpası',
        'İltihabın azalması',
        'Dərinin quruluğunun aradan qaldırılması',
        'Antimikrob təsir'
      ],
      image: '/images/treatments/dermatitis.jpg',
      category: 'skin'
    },
    {
      id: 4,
      name: 'Radikulit və nevrit',
      description: 'Sinir kökləri və periferik sinirlərin iltihabı xəstəlikləri naftalan nefti ilə müalicə zamanı yaxşılaşır. Müalicə ağrını azaldır, sinir impulslarının ötürülməsini normallaşdırır və iltihabı azaldır.',
      benefits: [
        'Ağrının azalması',
        'Hissiyyatın bərpası',
        'Sinir impulslarının ötürülməsinin yaxşılaşması',
        'İltihabın azalması',
        'Əzələ spazmlarının aradan qaldırılması'
      ],
      image: '/images/treatments/neuritis.jpg',
      category: 'nervous'
    },
    {
      id: 5,
      name: 'Revmatizm',
      description: 'Revmatizm birləşdirici toxumanın autoimmun xəstəliyidir. Naftalan nefti ilə müalicə ağrını azaldır, iltihabı söndürür və immun sisteminin fəaliyyətini tənzimləyir.',
      benefits: [
        'Oynaq ağrılarının azalması',
        'İltihabın azalması',
        'İmmun sisteminin tənzimlənməsi',
        'Ümumi vəziyyətin yaxşılaşması',
        'Remissiya müddətinin uzanması'
      ],
      image: '/images/treatments/rheumatism.jpg',
      category: 'joint'
    },
    {
      id: 6,
      name: 'Ekzema',
      description: 'Ekzema dərinin iltihabı xəstəliyidir, qaşınma və dəri səthində qabarcıqların əmələ gəlməsi ilə müşayiət olunur. Naftalan nefti ilə müalicə qaşınmanı azaldır, iltihabı söndürür və dərini yumşaldır.',
      benefits: [
        'Qaşınmanın azalması',
        'İltihabın azalması',
        'Dərinin hidratasiyasının yaxşılaşması',
        'Dəri infeksiyalarının qarşısının alınması',
        'Dərinin bərpasının sürətlənməsi'
      ],
      image: '/images/treatments/eczema.jpg',
      category: 'skin'
    },
    {
      id: 7,
      name: 'Osteoxondroz',
      description: 'Osteoxondroz onurğa sütununun degenerativ-distrofik xəstəliyidir. Naftalan nefti ilə müalicə ağrını azaldır, əzələ spazmlarını aradan qaldırır və hərəkətliliyi artırır.',
      benefits: [
        'Bel və boyun ağrılarının azalması',
        'Əzələ spazmlarının aradan qaldırılması',
        'Onurğa sütununun hərəkətliliyinin artması',
        'Qan dövranının yaxşılaşması',
        'Sinir köklərinin sıxılmasının azalması'
      ],
      image: '/images/treatments/osteochondrosis.jpg',
      category: 'joint'
    },
    {
      id: 8,
      name: 'Miogelofikasiya',
      description: 'Miogelofikasiya əzələlərin fibroz dəyişiklikləri ilə müşayiət olunan xəstəlikdir. Naftalan nefti ilə müalicə əzələ ağrılarını azaldır, fibroz toxumanı yumşaldır və əzələ funksiyalarını yaxşılaşdırır.',
      benefits: [
        'Əzələ ağrılarının azalması',
        'Əzələ tonusunun normallaşması',
        'Fibroz toxumanın yumşalması',
        'Hərəkətliliyin artması',
        'Qan dövranının yaxşılaşması'
      ],
      image: '/images/treatments/myogelosis.jpg',
      category: 'joint'
    },
    {
      id: 9,
      name: 'Ginekoloji xəstəliklər',
      description: 'Qadın cinsiyyət orqanlarının bir sıra xəstəlikləri (adneksit, endometrit, parametrit və s.) naftalan nefti ilə müalicədən faydalanır. Müalicə iltihabı azaldır, ağrını söndürür və toxumaların bərpasını sürətləndirir.',
      benefits: [
        'Ginekoloji ağrıların azalması',
        'İltihabın azalması',
        'Qan dövranının yaxşılaşması',
        'Hormonal balansın normallaşmasına kömək',
        'Ümumi vəziyyətin yaxşılaşması'
      ],
      image: '/images/treatments/gynecological.jpg',
      category: 'gynecological'
    },
    {
      id: 10,
      name: 'Nevrodermit',
      description: 'Nevrodermit dərinin xroniki iltihabı xəstəliyidir, güclü qaşınma ilə müşayiət olunur. Naftalan nefti ilə müalicə qaşınmanı azaldır, iltihabı söndürür və sinir sisteminin funksiyalarını normallaşdırır.',
      benefits: [
        'Qaşınmanın azalması',
        'İltihabın azalması',
        'Sinir sisteminin sakitləşməsi',
        'Dəri bariyerinin bərpası',
        'Yuxunun normallaşması'
      ],
      image: '/images/treatments/neurodermatitis.jpg',
      category: 'skin'
    },
    {
      id: 11,
      name: 'Podaqra',
      description: 'Podaqra purin mübadiləsinin pozulması nəticəsində əmələ gələn xəstəlikdir, oynaqların iltihabı və ağrısı ilə müşayiət olunur. Naftalan nefti ilə müalicə ağrını azaldır, iltihabı söndürür və purin mübadiləsini yaxşılaşdırır.',
      benefits: [
        'Kəskin ağrıların azalması',
        'İltihabın azalması',
        'Oynaqların hərəkətliliyinin artması',
        'Metabolik proseslərin yaxşılaşması',
        'Remissiya müddətinin uzanması'
      ],
      image: '/images/treatments/gout.jpg',
      category: 'joint'
    },
    {
      id: 12,
      name: 'Vitiliqo',
      description: 'Vitiliqo dərinin piqmentasiya pozğunluğu xəstəliyidir, dəridə ağ ləkələrin əmələ gəlməsi ilə müşayiət olunur. Naftalan nefti ilə müalicə melanositlərin fəaliyyətini stimullaşdırır və dərinin piqmentasiyasını bərpa edir.',
      benefits: [
        'Melanositlərin fəaliyyətinin stimullaşdırılması',
        'Ləkələrin ətrafında piqmentasiyanın bərpası',
        'Yeni ləkələrin əmələ gəlməsinin qarşısının alınması',
        'Dərinin ümumi vəziyyətinin yaxşılaşması',
        'Psixoloji vəziyyətin yaxşılaşması'
      ],
      image: '/images/treatments/vitiligo.jpg',
      category: 'skin'
    }
  ];

  const filterTreatments = (category: string) => {
    if (category === 'all') {
      return treatments;
    }
    return treatments.filter(treatment => treatment.category === category);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Naftalan nefti ilə müalicə olunan xəstəliklər</h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Naftalan neftinin müalicəvi xüsusiyyətlərindən faydalanan xəstəliklər və onların müalicə üsulları
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
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Təbii müalicə metodu</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Naftalan nefti ilə müalicə yüzillərdir Azərbaycanda istifadə olunan təbii müalicə metodudur. Bu nadir neft növü tərkibindəki bioloji aktiv maddələr sayəsində bir çox xəstəliklərin müalicəsində yüksək effektivliyə malikdir.
                </p>
                <p>
                  Naftalan neftinin əsas təsir mexanizmləri aşağıdakılardır:
                </p>
                <ul>
                  <li>İltihab əleyhinə təsir</li>
                  <li>Ağrıkəsici təsir</li>
                  <li>Antimikrob və antifungal təsir</li>
                  <li>Qan dövranını yaxşılaşdıran təsir</li>
                  <li>Dəri və toxumaların bərpasını stimullaşdıran təsir</li>
                  <li>İmmun sistemi modullaşdıran təsir</li>
                </ul>
                <p>
                  Bu təsirlər sayəsində Naftalan nefti oynaq, dəri və sinir sisteminin müxtəlif xəstəliklərinin müalicəsində geniş şəkildə istifadə edilir.
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
                src="/images/treatments/naftalan-bath.jpg" 
                alt="Naftalan nefti ilə vanna proseduru" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Müalicə kateqoriyaları</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Naftalan nefti ilə müalicə olunan xəstəliklər müxtəlif kateqoriyalara bölünür
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bütün xəstəliklər
            </button>
            <button
              onClick={() => setActiveCategory('joint')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'joint' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Oynaq xəstəlikləri
            </button>
            <button
              onClick={() => setActiveCategory('skin')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'skin' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dəri xəstəlikləri
            </button>
            <button
              onClick={() => setActiveCategory('nervous')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'nervous' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sinir sistemi xəstəlikləri
            </button>
            <button
              onClick={() => setActiveCategory('gynecological')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'gynecological' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ginekoloji xəstəliklər
            </button>
          </div>
        </div>
      </section>
      
      {/* Treatments List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterTreatments(activeCategory).map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUpVariant}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image 
                    src={treatment.image} 
                    alt={treatment.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-3">
                    {
                      treatment.category === 'joint' ? 'Oynaq xəstəlikləri' :
                      treatment.category === 'skin' ? 'Dəri xəstəlikləri' :
                      treatment.category === 'nervous' ? 'Sinir sistemi xəstəlikləri' :
                      treatment.category === 'gynecological' ? 'Ginekoloji xəstəliklər' :
                      'Digər xəstəliklər'
                    }
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{treatment.name}</h3>
                  <p className="text-gray-600 mb-4">{treatment.description}</p>
                  
                  <h4 className="text-md font-semibold text-gray-700 mb-2">Faydaları:</h4>
                  <ul className="space-y-1 mb-4">
                    {treatment.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Treatment Process */}
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Müalicə prosesi</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Naftalan nefti ilə müalicə prosesi bir neçə mərhələdən ibarətdir
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Həkim konsultasiyası</h3>
              <p className="text-gray-600">
                Müalicəyə başlamazdan əvvəl həkim tərəfindən müayinə aparılır və fərdi müalicə planı tərtib edilir. Bu, pasiyentin vəziyyətinə uyğun optimal müalicənin təyin edilməsi üçün vacibdir.
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Naftalan vannaları</h3>
              <p className="text-gray-600">
                Müalicənin əsas komponenti xüsusi vannalarda Naftalan nefti ilə prosedurların keçirilməsidir. Prosedurların müddəti və tezliyi fərdi olaraq təyin edilir, lakin adətən 8-12 prosedur tövsiyə olunur.
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Əlavə prosedurlar</h3>
              <p className="text-gray-600">
                Naftalan vannaları ilə yanaşı, müalicənin effektivliyini artırmaq üçün əlavə prosedurlar (fizioterapiya, masaj, palçıq aplikasiyaları və s.) təyin edilə bilər. Bu prosedurlar müalicənin kompleks təsirini təmin edir.
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Müalicə sonrası</h3>
              <p className="text-gray-600">
                Müalicə kursunu başa vurduqdan sonra həkim tərəfindən yekun müayinə aparılır və evdə davam etdirmək üçün tövsiyələr verilir. Xəstəliyin növündən asılı olaraq 6-12 aydan sonra təkrar müalicə kursu tövsiyə edilə bilər.
              </p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Naftalan müalicəsi ilə sağlamlığınıza qovuşun</h2>
              <p className="text-xl mb-8 text-blue-100">
                Azərbaycanın təbii müalicəvi sərvəti olan Naftalan nefti ilə sağlamlıq problemlərinizi həll edin
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/sanatoriums/naftalan" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
                  Naftalan sanatoriumları <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/contact" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                  Əlaqə
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 