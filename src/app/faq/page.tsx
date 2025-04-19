'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'treatment' | 'booking' | 'stay';
};

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqItems: FaqItem[] = [
    {
      id: 1,
      question: "Naftalan nefti nədir?",
      answer: "Naftalan nefti Azərbaycanda yerləşən Naftalan şəhərindəki xüsusi bir mədəndən çıxarılan müalicəvi neftdir. Bu neft tərkibindəki bioloji aktiv maddələr sayəsində bir çox xəstəliklərin müalicəsində istifadə edilir. Naftalan neftinin yüksək müalicəvi xüsusiyyətləri 100 ildən çoxdur ki, məlumdur və dünyada analoqu yoxdur.",
      category: 'general'
    },
    {
      id: 2,
      question: "Naftalan müalicəsi hansı xəstəliklərə kömək edir?",
      answer: "Naftalan nefti ilə müalicə əsasən oynaq və dəri xəstəliklərinə kömək edir. Artrit, artroz, dermatit, psoriaz, nevrit, radikulit kimi xəstəliklərin müalicəsində yüksək effektivliyə malikdir. Həmçinin, əzələ-sümük sistemi xəstəlikləri, ginekoloji problemlər və bir sıra digər xəstəliklərin müalicəsində də istifadə olunur. Ancaq müalicədən öncə mütləq həkim məsləhəti alınmalıdır.",
      category: 'treatment'
    },
    {
      id: 3,
      question: "Naftalan müalicə kursunun optimal müddəti nə qədərdir?",
      answer: "Müalicə kursunun standart müddəti 7-14 gündür. Bu müddət ərzində pasient adətən 8-12 prosedur keçir. Xəstəliyin ağırlıq dərəcəsindən asılı olaraq kurs uzadıla bilər. Həkim tərəfindən tövsiyə olunan kursa tam riayət etmək vacibdir ki, müalicənin effektivliyi maksimum olsun.",
      category: 'treatment'
    },
    {
      id: 4,
      question: "Naftalan müalicəsi üçün hansı mövsüm daha məsləhətlidir?",
      answer: "Naftalan müalicələri il boyu aparıla bilər, lakin yaz və payız ayları daha əlverişli hesab olunur. Bu mülayim havalı mövsümlərdə orqanizm müalicəyə daha yaxşı reaksiya verir. Yay aylarında istilərin olması və qış aylarında hava şəraitinin soyuq olması bədənin adaptasiya proseslərinə təsir göstərə bilər.",
      category: 'general'
    },
    {
      id: 5,
      question: "Hansı hallarda Naftalan müalicəsi məsləhət görülmür?",
      answer: "Naftalan müalicəsi aşağıdakı hallarda əks göstərişdir: ürək-damar xəstəlikləri (ürək çatışmazlığı, hipertoniya, stenokardiyanın ağır formaları), onkoloji xəstəliklər, qan xəstəlikləri, böyrək və qaraciyər çatışmazlığı, aktiv vərəm, hamiləlik, yüksək hərarət və kəskin iltihabi proseslər. Hər bir halda müalicəyə başlamazdan əvvəl həkim konsultasiyası olmalıdır.",
      category: 'treatment'
    },
    {
      id: 6,
      question: "Naftalana necə gəlmək olar?",
      answer: "Naftalana gəlmək üçün ən rahat yol öncə Gəncəyə gəlmək, oradan isə Naftalana getməkdir. Bakıdan Gəncəyə təyyarə və qatarla getmək mümkündür. Gəncə şəhəri Naftalana ən yaxın beynəlxalq hava limanı olan şəhərdir (təxminən 50 km məsafə). Gəncədən Naftalana taksi, avtobus və ya icarəyə götürülmüş avtomobillə getmək olar.",
      category: 'general'
    },
    {
      id: 7,
      question: "Rezervasiya necə etmək olar?",
      answer: "Rezervasiya etmək üçün bir neçə yol var. Veb saytımızdakı online rezervasiya formasını doldura, emailimizə yazıb və ya birbaşa bizimlə telefon vasitəsilə əlaqə saxlaya bilərsiniz. Rezervasiya zamanı gəlişinizin tarixini, qalacağınız müddəti, otaqların sayını və xüsusi istəklərinizi bildirmək lazımdır. Tətil mövsümündə əvvəlcədən rezervasiya etmək tövsiyə olunur.",
      category: 'booking'
    },
    {
      id: 8,
      question: "Müalicə paketləri nəyə əsasən seçilir?",
      answer: "Müalicə paketləri seçilərkən xəstəliyin növü, ağırlıq dərəcəsi və pasiyentin fərdi xüsusiyyətləri nəzərə alınır. Hər müalicə paketi fərdiləşdirilmiş olmalıdır. İlkin konsultasiya zamanı həkim sizə ən uyğun müalicə kursunu təyin edəcək. Paketlər adətən günlük naftalan vannaları, fizioterapiya, masaj və digər prosedurları əhatə edir.",
      category: 'treatment'
    },
    {
      id: 9,
      question: "Naftalan sanatoriyalarında hansı xidmətlər təklif olunur?",
      answer: "Naftalan sanatoriyaları müalicə ilə yanaşı, qonaqlar üçün bir sıra əlavə xidmətlər təklif edir. Bunlara istirahət üçün yaşıl ərazilər, hovuzlar, idman zalları, restoran və kafe, ekskursiyalar, əyləncə proqramları daxildir. Sanatoriyaların çoxunda həmçinin SPA, sauna, hamam və digər sağlamlıq xidmətləri mövcuddur.",
      category: 'stay'
    },
    {
      id: 10,
      question: "Naftalan şəhərində hansı yerləri ziyarət etmək olar?",
      answer: "Naftalan şəhəri kiçik olsa da, burada və ətraf ərazilərdə bir sıra görməli yerlər var. Naftalan Tarix Muzeyi, şəhər parkı, şəhər mərkəzi ziyarət edilə bilər. Həmçinin yaxınlıqdakı Gəncə şəhərinin tarixi yerləri, Göygöl Milli Parkı, Gədəbəy, Şəmkir kimi bölgələrə ekskursiyalar təşkil olunur. Müalicə ilə yanaşı bu yerlərə səyahət etmək mümkündür.",
      category: 'general'
    },
    {
      id: 11,
      question: "Müalicədən sonra nə qədər vaxt effekt davam edir?",
      answer: "Naftalan müalicəsinin effekti fərdi olaraq dəyişir, lakin təcrübələr göstərir ki, tam kurs keçdikdən sonra müsbət təsir 6 aydan 1 ilə qədər davam edə bilər. Bəzi xroniki xəstəliklərdə müalicənin təsirini uzatmaq üçün illik təkrar kurslar məsləhət görülür. Müalicədən sonra həkimin tövsiyələrinə əməl etmək vacibdir.",
      category: 'treatment'
    },
    {
      id: 12,
      question: "Özümlə nə gətirməliyəm?",
      answer: "Naftalan sanatoriyasına gələrkən şəxsiyyət vəsiqəsi, tibbi sənədlər (varsa), müalicə zamanı istifadə edəcəyiniz dərmanlar, şəxsi gigiyena əşyaları və rahatlıq üçün geyim əşyalarını gətirməlisiniz. Həmçinin çimərlik üçün geyim, çimərlik dəsmalı, papaq (günəşdən qorunmaq üçün) və rahat ayaqqabı gətirmək məsləhətdir.",
      category: 'stay'
    },
    {
      id: 13,
      question: "Naftalan müalicəsinin yan təsirləri varmı?",
      answer: "Düzgün təyin edilmiş və həkim nəzarəti altında aparılan Naftalan müalicəsinin ciddi yan təsirləri yoxdur. Lakin bəzi hallarda müalicənin ilk günlərində dəridə qızartı, qaşınma və bədən temperaturu kimi reaksiyalar ola bilər. Bu adaptasiya dövrü ilə əlaqədar normal haldır və bir neçə gün ərzində keçib gedir.",
      category: 'treatment'
    },
    {
      id: 14,
      question: "Uşaqlar üçün Naftalan müalicəsi uyğundurmu?",
      answer: "Naftalan müalicəsi uşaqlar üçün də təyin edilə bilər, lakin adətən 3 yaşdan yuxarı uşaqlar üçün məsləhət görülür. Uşaqlar üçün prosedurların müddəti və intensivliyi azaldılır və mütləq uşaq həkimi nəzarəti altında aparılır. Bəzi uşaq dəri xəstəliklərinin müalicəsində Naftalan yüksək effektivlik göstərir.",
      category: 'treatment'
    },
    {
      id: 15,
      question: "Hansı ödəniş üsulları qəbul edilir?",
      answer: "Biz nağd, kredit kartları (Visa, MasterCard) və bank köçürmələri ilə ödənişləri qəbul edirik. Böyük məbləğlər üçün əvvəlcədən depozit ödənişi tələb oluna bilər. Qeyd edək ki, bəzi kiçik yerli mağazalar və xidmətlər yalnız nağd ödəniş qəbul edə bilərlər.",
      category: 'booking'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Tez-tez verilən suallar</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Naftalan müalicələri, qalma, rezervasiya və digər suallarınızla bağlı ən çox verilən sualları burada tapa bilərsiniz
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* FAQ Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hamısı
            </button>
            <button
              onClick={() => setActiveCategory('general')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'general' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ümumi məlumatlar
            </button>
            <button
              onClick={() => setActiveCategory('treatment')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'treatment' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Müalicə
            </button>
            <button
              onClick={() => setActiveCategory('booking')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'booking' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rezervasiya
            </button>
            <button
              onClick={() => setActiveCategory('stay')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'stay' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Qalma və istirahət
            </button>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <motion.div className="divide-y divide-gray-200 rounded-xl shadow-md bg-white overflow-hidden">
              {filteredItems.map((item) => (
                <div key={item.id} className="border-b last:border-b-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <button
                      className="flex justify-between items-center w-full p-6 text-left"
                      onClick={() => toggleItem(item.id)}
                    >
                      <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                      <span className="ml-6 flex-shrink-0">
                        {openItem === item.id ? (
                          <FaChevronUp className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FaChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </span>
                    </button>
                    
                    {openItem === item.id && (
                      <motion.div 
                        className="px-6 pb-6 text-gray-700"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Still Have Questions */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Sualınız var?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Əgər sualınıza cavab tapa bilmədinizsə, bizimlə əlaqə saxlayın və ən qısa zamanda sizə cavab verək.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
            >
              Bizimlə əlaqə saxlayın
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 