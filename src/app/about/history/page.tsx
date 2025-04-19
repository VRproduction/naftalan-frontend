'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function HistoryPage() {
  const timelineEvents = [
    {
      year: '1873',
      title: 'Naftalan yatağının kəşfi',
      description: 'Alman əczaçı və mühəndis E.I. Yeger tərəfindən Naftalan neftinin tibbi xüsusiyyətləri aşkar edildi və ilk dəfə sənaye miqyasında istifadəyə başlandı.'
    },
    {
      year: '1890',
      title: 'İlk ticarət markası və istehsal',
      description: 'Naftalan nefti əsasında hazırlanan məlhəmlər "Naftalan" ticarət markası altında Almaniyada və Avropada satışa çıxarıldı və bəzi xəstəliklərin müalicəsində uğurla istifadə edildi.'
    },
    {
      year: '1920',
      title: 'Elmi tədqiqatların başlanması',
      description: 'Naftalan neftinin tibbi xüsusiyyətləri elmə cəlb olundu və Azərbaycan alimlərinin tədqiqat obyektinə çevrildi.'
    },
    {
      year: '1926',
      title: 'İlk sanatoriumun açılması',
      description: 'Naftalan şəhərində ilk sanatorium açıldı və sovet dövründə genişlənərək SSRİ-nin hər yerindən xəstələr qəbul etməyə başladı.'
    },
    {
      year: '1938',
      title: 'Naftalan Elmi-Tədqiqat Laboratoriyasının açılması',
      description: 'Xüsusi elmi-tədqiqat laboratoriyası açıldı və burada Naftalan neftinin tibbi xüsusiyyətləri və müalicə üsulları dərindən araşdırıldı.'
    },
    {
      year: '1941-1945',
      title: 'Müharibə dövründə istifadə',
      description: 'İkinci Dünya Müharibəsi zamanı Naftalan nefti əsasında hazırlanan məlhəmlər döyüşçülərin yaralarının sağalmasında geniş istifadə edildi.'
    },
    {
      year: '1960-1980',
      title: 'Qızıl dövr',
      description: 'Naftalan kurortunun çiçəklənmə dövrü. İldə 75,000-dən çox insan müalicə üçün buraya gəlirdi. Bu dövrdə 9 büyük sanatorium fəaliyyət göstərirdi.'
    },
    {
      year: '1990-lar',
      title: 'Tənəzzül dövrü',
      description: 'SSRİ-nin dağılması və Qarabağ münaqişəsi səbəbindən kurort infrastrukturu zərər çəkdi və turist axını kəskin azaldı.'
    },
    {
      year: '2005-sonra',
      title: 'Yenidən dirçəliş',
      description: 'Dövlət səviyyəsində kurortun yenidən canlandırılması üçün investisiyalar qoyuldu, yeni müasir müalicə mərkəzləri tikildi və beynəlxalq standartlara uyğun otellər açıldı.'
    },
    {
      year: 'Müasir dövr',
      title: 'Beynəlxalq tanınma',
      description: 'Naftalan bu gün yenidən həm yerli, həm də xarici turistlər üçün populyar müalicə mərkəzi statusunu qazanmışdır. Hər il minlərlə insan burada müalicə alır.'
    }
  ];
  
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Naftalan neftinin tarixi</h1>
              <div className="w-20 h-1 bg-yellow-400 mb-6"></div>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Azərbaycanın qiymətli təbii müalicəvi sərvəti olan Naftalan neftinin kəşfindən 
                müasir dövrə qədər olan qədim və zəngin tarixi
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/images/history/naftalan-old.jpg" 
                alt="Qədim Naftalan müalicə mərkəzi" 
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Naftalan - şəfa mənbəyi</h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="prose prose-lg max-w-none text-gray-700"
            >
              <p>
                <span className="text-2xl font-serif leading-relaxed">A</span>zərbaycanın qərb bölgəsində yerləşən Naftalan şəhəri, özünəməxsus təbii neft yataqları ilə dünyada yeganə müalicəvi neft mərkəzi kimi tanınır. Naftalan nefti, tərkibindəki nadir bioloji aktiv maddələr sayəsində yüzillərdir müxtəlif xəstəliklərin müalicəsində istifadə olunur.
              </p>
              
              <p>
                Naftalan neftinin tarixi qədim dövrlərə qədər uzanır. Yerli əfsanələrə görə, karvan yolunda gedən bir tacir xəstə dəvəsini bu bölgədə qoyub getmiş, geri döndükdə isə dəvəsinin sağaldığını və neft gölməçəsində çimdiyini görmüşdür. Bu hadisədən sonra yerli əhali və karvan yolçuları bu neftin şəfaverici xüsusiyyətlərini kəşf etmiş və müxtəlif dəri xəstəlikləri və ağrıların müalicəsində istifadə etməyə başlamışlar.
              </p>
              
              <p>
                Naftalan adı iki sözdən əmələ gəlmişdir: yunan mənşəli "naft" (neft) və Azərbaycan dilində "alan" (alan, yer). Bu, "neft çıxan yer" mənasını verir və bölgənin əsas xüsusiyyətini əks etdirir.
              </p>
              
              <p>
                Naftalan neftinin elmi olaraq öyrənilməsi və tibbi məqsədlər üçün sənaye miqyasında istifadəsi XIX əsrin sonlarında başlamışdır. Alman əczaçı və mühəndis E.I. Yeger 1870-ci illərdə bölgəyə səfər etmiş və yerli əhalinin bu neftdən necə istifadə etdiyini görmüşdür. O, bu neftin nümunələrini götürərək Almaniyaya aparmış və laboratoriya tədqiqatları apardıqdan sonra, 1886-cı ildə neft əsasında müalicəvi məlhəmlər istehsal etməyə başlamışdır.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Tarixi inkişaf</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Naftalan neftinin kəşfindən müasir dövrə qədər olan əsas hadisələr və inkişaf mərhələləri
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline center line */}
              <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-blue-200"></div>
              
              {/* Timeline events */}
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeInUpVariant}
                  className={`relative mb-12 md:mb-16 ${
                    index % 2 === 0 ? 'md:text-right' : ''
                  }`}
                >
                  <div className={`flex items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Year marker */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center mx-2 md:mx-0"></div>
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-grow ${index % 2 === 0 ? 'md:mr-12' : 'ml-6 md:ml-12'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-3">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Scientific Discoveries Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Elmi kəşflər və tədqiqatlar</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Naftalan neftinin müalicəvi xüsusiyyətləri haqqında ilk elmi məlumatlar XIX əsrin sonlarında çap olunmuşdur. Sovet dövründə isə Naftalan neftinin tədqiqi geniş vüsət almışdır. 1926-cı ildə Naftalan kurortu rəsmi olaraq açılmış və 1938-ci ildə burada xüsusi elmi-tədqiqat laboratoriyası yaradılmışdır.
                </p>
                <p>
                  Elmi tədqiqatlar nəticəsində məlum olmuşdur ki, Naftalan nefti özünəməxsus kimyəvi tərkibə malikdir. Bu neftin tərkibində olan naftalanlar, nafta turşuları və digər bioloji aktiv maddələr müalicəvi xüsusiyyətlərə malikdir və iltihab əleyhinə, ağrıkəsici, antimikrob və regenerasiya proseslərini sürətləndirən təsirlər göstərir.
                </p>
                <p>
                  XX əsrin ortalarında Azərbaycan alimlərinin apardığı tədqiqatlar nəticəsində Naftalan neftindən müxtəlif dərman preparatları hazırlanmış və təbabətdə geniş istifadə olunmağa başlanmışdır. Bu dövrdə 70-dən çox elmi iş və bir neçə doktorluq dissertasiyası Naftalan neftinin tibbi xüsusiyyətlərinə həsr olunmuşdur.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="order-1 md:order-2 relative h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/images/history/naftalan-lab.jpg" 
                alt="Naftalan laboratoriyası" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Soviet Period */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUpVariant}
              className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/images/history/naftalan-soviet.jpg" 
                alt="Sovet dövründə Naftalan kurortu" 
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUpVariant}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Sovet dövründə Naftalan</h2>
              <div className="w-20 h-1 bg-blue-500 mb-6"></div>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Sovet dövründə Naftalan kurortu özünün çiçəklənmə dövrünü yaşamışdır. 1960-1980-ci illərdə burada 9 böyük sanatorium fəaliyyət göstərirdi və hər il 75,000-dən çox insan müalicə almaq üçün bura gəlirdi. 
                </p>
                <p>
                  Bu dövrdə Naftalan nefti ilə müalicə üsulları təkmilləşdirilmiş və standartlaşdırılmışdır. Müalicə vannalarının optimal temperaturu, prosedurların müddəti və tezliyi, müxtəlif xəstəliklər üçün fərdi müalicə protokolları işlənib hazırlanmışdır.
                </p>
                <p>
                  Naftalanda müalicə alan xəstələr təkcə Sovet İttifaqının müxtəlif respublikalarından deyil, həmçinin Şərqi Avropa ölkələrindən də gəlirdilər. Naftalan kurortu Sovet İttifaqının ən məşhur sağlamlıq mərkəzlərindən birinə çevrilmişdi.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Modern Era */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUpVariant}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Müasir dövr</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Müstəqillik illərində Naftalan kurortunun inkişafı və müasir dövrə qədər gəlişi
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              variants={fadeInUpVariant}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Yeni sanatoriumlar</h3>
              <p className="text-gray-600">
                Müstəqillik illərindən sonra, xüsusilə 2005-ci ildən etibarən dövlət tərəfindən Naftalan kurortunun bərpası və inkişafı ilə bağlı ciddi addımlar atılmışdır. Naftalan şəhərində müasir standartlara cavab verən yeni sanatoriumlar, müalicə və istirahət mərkəzləri tikilmişdir.
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
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Müalicə üsullarının təkmilləşdirilməsi</h3>
              <p className="text-gray-600">
                Müasir tibbi texnologiyaların tətbiqi ilə Naftalan müalicə üsulları təkmilləşdirilmişdir. Ənənəvi naftalan vannaları ilə yanaşı, terapiyanı daha effektiv edən yeni üsullar - qalın təbəqəli, tamponlar, elektroforez və s. kimi metodlar inkişaf etdirilmişdir.
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
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Beynəlxalq tanınma</h3>
              <p className="text-gray-600">
                Azərbaycanın beynəlxalq turizm sektorunda artan rolu ilə birlikdə Naftalan nefti və onun müalicəvi xüsusiyyətləri dünyada daha çox tanınmağa başlamışdır. Hər il dünyanın müxtəlif ölkələrindən turistlər sağlamlıq turizmi çərçivəsində Naftalanı ziyarət edir və müalicə alırlar.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Naftalan neftinin şəfa möcüzəsini kəşf edin</h2>
              <p className="text-xl mb-8 text-blue-100">
                Yüzillərin təcrübəsi və müasir tibb elminin birləşdiyi Naftalan müalicələri ilə sağlamlığınıza qovuşun
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/about/treatments" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
                  Müalicə olunan xəstəliklər <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/sanatoriums/naftalan" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                  Sanatoriumlar
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 