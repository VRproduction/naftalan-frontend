'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHistory, FaLeaf, FaHospital } from 'react-icons/fa';

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Haqqımızda</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Naftalan müalicə mərkəzi - sağlamlığınız üçün təbii həll
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Introduction Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Naftalan haqqında</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Naftalan Azərbaycanın qərb bölgəsində, eyni adlı şəhərdə yerləşən unikal müalicəvi neft mənbəyidir. Bu təbii resurs artıq əsrlərdir ki, öz müalicəvi xüsusiyyətləri ilə insanların sağlamlığına xidmət edir.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Bizim müalicə mərkəzimiz Naftalan neftinin sağlamlıq üçün faydalı xüsusiyyətlərindən istifadə edərək, müştərilərimizə ən yüksək səviyyəli tibbi xidmət təklif edir. Təcrübəli həkimlərimiz və müasir avadanlıqlarımızla biz sizi bir çox xəstəliklərə qarşı mübarizədə dəstəkləyirik.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Naftalanın unikal tərkibi sayəsində bir çox xəstəliklərin müalicəsində effektiv nəticələr əldə edilir. Bizim mərkəzimizdə siz həm ənənəvi, həm də müasir müalicə üsullarından faydalana bilərsiniz.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image 
                src="/images/naftalan-center.jpg" 
                alt="Naftalan Treatment Center" 
                fill
                style={{objectFit: 'cover'}}
                className="rounded-xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* History Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <FaHistory className="text-4xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tarixi</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Naftalan neftinin müalicəvi xüsusiyyətləri haqqında ilk məlumatlar XII əsrə təsadüf edir
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                year: "XII əsr",
                title: "İlk istifadə",
                description: "Naftalan neftinin müalicəvi xüsusiyyətləri haqqında ilk məlumatlar orta əsrlərə təsadüf edir. Səyyahlar və ticarətçilər bu ərazidən keçərkən yerli əhalinin naftalan neftindən müxtəlif xəstəliklərin müalicəsində istifadə etdiyini müşahidə etmişlər."
              },
              {
                year: "1873",
                title: "Elmi tədqiqatlar",
                description: "Alman mühəndis E. İ. Yeger Naftalan yatağının işlənməsinə başlayır və 'Naftalan' adlı şirkət yaradır. İlk elmi tədqiqatlar aparılır və naftalan neftinin tərkibi öyrənilməyə başlanır."
              },
              {
                year: "1920-1930",
                title: "Kurort şəhəri",
                description: "Sovet dövründə Naftalan kurort şəhəri kimi inkişaf etməyə başlayır. Bu dövrdə ilk sanatoriyalar və müalicə mərkəzləri açılır. Naftalan neftinin müalicəvi xüsusiyyətləri haqqında elmi tədqiqatlar genişləndirilir."
              },
              {
                year: "1980-Bugün",
                title: "Müasir dövr",
                description: "Müstəqillik dövründə Naftalanın inkişafı davam edir. 1990-cı illərdən etibarən yeni müasir sanatoriyalar və müalicə mərkəzləri açılır. Naftalan müasir tibbi avadanlıqlarla təchiz olunur və beynəlxalq standartlara uyğun xidmətlər təklif etməyə başlayır."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-blue-500 font-bold text-lg mb-2">{item.year}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <FaLeaf className="text-4xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Naftalan neftinin faydaları</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Naftalan nefti tərkibindəki bioloji aktiv maddələr sayəsində bir çox xəstəliklərin müalicəsində effektiv təsir göstərir
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "İltihab əleyhinə təsir",
                description: "Naftalan nefti güclü iltihab əleyhinə təsirə malikdir. Bu, artrit, artroz, radikulit kimi xəstəliklərin müalicəsində xüsusilə faydalıdır."
              },
              {
                title: "Ağrıkəsici təsir",
                description: "Naftalan vannalarının ağrıkəsici xüsusiyyəti oynaq ağrıları, əzələ ağrıları və sinir ağrılarının azaldılmasında effektlidir."
              },
              {
                title: "İmmun sisteminin gücləndirilməsi",
                description: "Naftalan müalicəsi orqanizmin ümumi müqavimətini artırır və immun sistemini gücləndirir, bu da xəstəliklərə qarşı davamlılığı artırır."
              },
              {
                title: "Dəri xəstəliklərinin müalicəsi",
                description: "Naftalan nefti psoriaz, ekzema, neyrodermit kimi dəri xəstəliklərinin müalicəsində yüksək effektivlik göstərir."
              },
              {
                title: "Hormonal sistemə təsir",
                description: "Naftalan müalicəsi hormonal tarazlığın yaxşılaşmasına kömək edir və endokrin xəstəliklərin müalicəsində istifadə olunur."
              },
              {
                title: "Qan dövranının yaxşılaşdırılması",
                description: "Naftalan vannalarının qəbulu qan dövranını yaxşılaşdırır, damarların elastikliyini artırır və trombların yaranmasının qarşısını alır."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start mb-4">
                  <FaCheckCircle className="text-blue-500 text-xl mt-1 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 pl-8">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Treatment Types Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <FaHospital className="text-4xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Müalicə növlərimiz</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Bizim mərkəzimizdə təklif olunan müalicə üsulları arasında müxtəlif prosedurlar yer alır
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Naftalan vannaları",
                description: "Klassik müalicə üsulu olan naftalan vannaları, xəstənin naftalan nefti ilə doldurulmuş xüsusi vannada müəyyən müddət ərzində qalmasından ibarətdir. Bu prosedur zamanı naftalan neftinin tərkibindəki aktiv maddələr dəri vasitəsilə orqanizmə sorulur və müalicəvi təsir göstərir.",
                image: "/images/naftalan-bath.jpg"
              },
              {
                title: "Naftalan aplikasiyaları",
                description: "Bu müalicə üsulunda naftalan nefti bədənin müəyyən hissələrinə tətbiq edilir. Xüsusilə oynaq və əzələ problemlərində effektiv olan bu üsul, naftalan neftinin yerli tətbiqi ilə xəstə bölgəyə daha intensiv təsir göstərməsini təmin edir.",
                image: "/images/naftalan-application.jpg"
              },
              {
                title: "Fizioterapiya",
                description: "Fizioterapiya müalicələri naftalan müalicəsi ilə birlikdə tətbiq edilərək daha effektiv nəticələr əldə edilməsini təmin edir. Elektroterapiya, ultrasəs terapiyası, maqnit terapiyası kimi müxtəlif fizioterapiya metodları xəstənin ehtiyaclarına uyğun olaraq təyin edilir.",
                image: "/images/physiotherapy.jpg"
              },
              {
                title: "Masaj terapiyası",
                description: "Peşəkar masaj terapevtlərimiz tərəfindən həyata keçirilən müxtəlif masaj növləri, əzələ gərginliyini azaldır, qan dövranını yaxşılaşdırır və ağrıları azaldır. Naftalan müalicəsi ilə birlikdə tətbiq edilən masaj terapiyası, müalicənin effektivliyini artırır.",
                image: "/images/massage-therapy.jpg"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-64">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Sağlamlığınız bizim prioritetimizidir!</h2>
            <p className="max-w-2xl mx-auto text-blue-100 mb-8">
              Naftalan müalicə mərkəzimiz sizə ən yüksək keyfiyyətli xidmət təklif etmək üçün həmişə hazırdır. Bizim təcrübəli mütəxəssislərimiz sizin sağlamlığınızın qayğısına qalacaqlar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="/contact" 
                className="px-6 py-3 bg-white text-blue-500 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              >
                Bizimlə əlaqə saxlayın
              </a>
              <a 
                href="/treatments" 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Müalicələri kəşf edin
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 