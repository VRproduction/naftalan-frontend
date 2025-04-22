'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlane, FaCar, FaBus, FaTaxi, FaInfoCircle, FaMapMarkedAlt, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';

export default function HowToComePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Necə gəlmək?</h1>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Naftalan şəhərinə səyahət üçün məlumatlar və tövsiyələr
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <FaMapMarkedAlt className="text-4xl text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Naftalan harada yerləşir?</h2>
              <p className="text-gray-600 mb-8">
                Naftalan şəhəri Azərbaycanın qərb bölgəsində, Gəncə şəhərindən təxminən 50 km məsafədə yerləşir.
                Bakıdan Naftalana olan məsafə təqribən 320 kilometrdir.
              </p>
            </div>
            
            <div className="h-[400px] rounded-xl overflow-hidden shadow-md mb-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24232.51390993425!2d46.689722651272096!3d40.34583871449216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403e1a2eda06c4ed%3A0x2c54dfe2f8724283!2sNaftalan%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1716225149606!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Transportation Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Nəqliyyat seçimləri</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Naftalan şəhərinə gəlmək üçün müxtəlif nəqliyyat vasitələrindən istifadə edə bilərsiniz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaPlane className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold">Təyyarə ilə</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Ən yaxın beynəlxalq hava limanı <strong>Gəncə Beynəlxalq Hava Limanıdır</strong> və Naftalandan təxminən 50 km məsafədə yerləşir.
                </p>
                <p>
                  <strong>Heydər Əliyev Beynəlxalq Hava Limanı</strong> (Bakı) daha çox beynəlxalq uçuşlara xidmət edir və Naftalandan təxminən 320 km məsafədə yerləşir.
                </p>
                <p>
                  Bakıdan Gəncəyə daxili uçuşlar da mövcuddur. Bu uçuşlar təxminən 50 dəqiqə çəkir.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaCar className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold">Şəxsi avtomobil ilə</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Bakıdan Naftalana:</strong> M2 avtomobil yolu ilə səyahət təxminən 4-5 saat çəkir. Yolda Yevlax şəhərindən keçərək Naftalan istiqamətində dönmək lazımdır.
                </p>
                <p>
                  <strong>Gəncədən Naftalana:</strong> Yol təxminən 40-50 dəqiqə çəkir. Goranboy istiqamətində hərəkət edib, Naftalan dönüşünü izləmək lazımdır.
                </p>
                <p>
                  Yollarda yanacaqdoldurma məntəqələri və istirahət məkanları mövcuddur, lakin uzun məsafələri qət etmədən əvvəl yanacaq doldurmaq tövsiyə olunur.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaBus className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold">Avtobus ilə</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Bakıdan Naftalana:</strong> Bakıdan Naftalana birbaşa avtobuslar mövcuddur. Bu avtobuslar Bakı Beynəlxalq Avtovağzalından gündəlik olaraq hərəkət edir. Səyahət müddəti təxminən 5-6 saatdır.
                </p>
                <p>
                  <strong>Gəncədən Naftalana:</strong> Gəncədən Naftalana muntazəm avtobus reysleri var və səyahət təxminən 1 saat çəkir.
                </p>
                <p>
                  Avtobus biletlərini internet üzərindən və ya avtovağzallardan əldə etmək mümkündür. Bilet qiymətləri mövsümdən asılı olaraq dəyişə bilər.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaTaxi className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold">Taksi ilə</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Hava limanından transfer:</strong> Gəncə və Bakı hava limanlarından Naftalana taksi xidməti mövcuddur. Qiymətlər əvvəlcədən razılaşdırılmalıdır.
                </p>
                <p>
                  <strong>Şəhərlərarası taksi:</strong> Bakı və Gəncədən Naftalana taksi ilə getmək mümkündür. Bu, daha bahalı olsa da, rahat və sürətli bir seçimdir.
                </p>
                <p>
                  Taksi xidmətlərini əvvəlcədən rezervasiya etmək tövsiyə olunur. Sanatoriyalar çox vaxt qonaqlar üçün transfer xidməti təklif edir.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Travel Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <FaInfoCircle className="text-4xl text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Səyahət tövsiyələri</h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-600">
                Naftalana səyahətinizi daha rahat etmək üçün faydalı məlumatlar
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Ən yaxşı səyahət vaxtı</h3>
                <p className="text-gray-600 mb-4">
                  Naftalana səyahət üçün ən yaxşı vaxt yaz (aprel-iyun) və payız (sentyabr-noyabr) aylarıdır. Bu dövrdə hava mülayim olur və müalicə üçün idealdır.
                </p>
                <p className="text-gray-600">
                  Yay aylarında (iyul-avqust) hava çox isti ola bilər, qış aylarında isə (dekabr-fevral) soyuq və bəzən qarlı olur. Lakin müalicə mərkəzləri il boyu fəaliyyət göstərir.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Nə götürməli</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Rahat geyim və ayaqqabı</li>
                  <li>• Şəxsi gigiyena ləvazimatları</li>
                  <li>• Dərmanlar (əgər müntəzəm qəbul edirsinizsə)</li>
                  <li>• Günəş kremi (yay aylarında)</li>
                  <li>• İsti geyim (qış aylarında)</li>
                  <li>• Üzgüçülük geyimi (sanatoriyaların çoxunda hovuz var)</li>
                  <li>• Mobil telefon və şarj cihazı</li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Valyuta və ödəniş</h3>
                <p className="text-gray-600 mb-4">
                  Azərbaycanda rəsmi valyuta Azərbaycan Manatıdır (AZN). Böyük sanatoriyalar və hotellər kredit kartları qəbul edir, lakin kiçik mağazalar və kafeler üçün nağd pul götürmək tövsiyə olunur.
                </p>
                <p className="text-gray-600">
                  Valyuta mübadiləsi banklar, valyuta mübadiləsi məntəqələri və bəzi hotellər tərəfindən təklif olunur. Hava limanlarında da valyuta mübadiləsi mümkündür.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">İnternet və rabitə</h3>
                <p className="text-gray-600 mb-4">
                  Sanatoriyaların əksəriyyətində pulsuz Wi-Fi mövcuddur. Bundan əlavə, Azərbaycanda mobil internet də genişdir.
                </p>
                <p className="text-gray-600">
                  Xarici turistlər üçün yerli SIM kart almaq mümkündür. Bunun üçün pasportunuzu təqdim etməlisiniz. Əsas operatorlar Azercell, Bakcell və Nar Mobile-dir.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visa Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Viza məlumatı</h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-600">
                Azərbaycana səyahət etmək üçün viza tələbləri haqqında məlumat
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Azərbaycana səyahət edən əksər xarici vətəndaşlar üçün viza tələb olunur. Lakin bəzi ölkələrin vətəndaşları viza tələbindən azaddır. Azərbaycana səyahət etmədən əvvəl viza tələblərinizi yoxlamaq vacibdir.
                </p>
                
                <h3>ASAN Viza</h3>
                <p>
                  Bir çox ölkənin vətəndaşları üçün elektron viza (e-Viza) sistemi olan ASAN Viza vasitəsilə online viza əldə etmək mümkündür. Bu, ənənəvi viza prosedurlarından daha sürətli və rahatdır.
                </p>
                <p>
                  ASAN Viza <a href="https://evisa.gov.az" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">evisa.gov.az</a> saytı vasitəsilə əldə edilə bilər. Standart e-Viza 3 iş günü ərzində verilir və 90 gün ərzində 30 günlük qalma imkanı verir.
                </p>
                
                <h3>Viza tələbləri</h3>
                <p>
                  ASAN Viza üçün müraciət edərkən aşağıdakı sənədlər tələb olunur:
                </p>
                <ul>
                  <li>Pasportunuzun skan edilmiş surəti (pasportun etibarlılıq müddəti səyahət tarixindən sonra ən azı 3 ay olmalıdır)</li>
                  <li>Biometrik fotoşəkil</li>
                  <li>Səyahət tarixləri</li>
                  <li>Qalacağınız yer haqqında məlumat</li>
                </ul>
                
                <p>
                  Daha ətraflı məlumat üçün <a href="https://www.mfa.gov.az" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Azərbaycan Xarici İşlər Nazirliyinin</a> rəsmi saytını ziyarət edin və ya öz ölkənizdəki Azərbaycan səfirliyinə müraciət edin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Booking Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-blue-50 p-8 md:p-10 rounded-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center md:border-r md:border-blue-200 p-4">
                <FaCalendarAlt className="text-4xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Əvvəlcədən rezervasiya</h3>
                <p className="text-gray-600">
                  Naftalan sanatoriyalarını əvvəlcədən rezervasiya etməyi tövsiyə edirik, xüsusilə yüksək mövsüm zamanı.
                </p>
              </div>
              
              <div className="text-center md:border-r md:border-blue-200 p-4">
                <FaMapMarkedAlt className="text-4xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Transfer xidməti</h3>
                <p className="text-gray-600">
                  Əksər sanatoriyalar əlavə ödəniş müqabilində hava limanından transfer xidməti təklif edir.
                </p>
              </div>
              
              <div className="text-center p-4">
                <FaPhoneAlt className="text-4xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Dəstək xidməti</h3>
                <p className="text-gray-600">
                  Səyahətinizlə bağlı hər hansı bir sualınız olduqda bizimlə əlaqə saxlaya bilərsiniz.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link
                href="/reservation"
                className="inline-block px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                İndi rezervasiya edin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 