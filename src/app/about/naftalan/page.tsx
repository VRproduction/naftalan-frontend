'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function NaftalanPage() {
  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1591825729269-caeb344f6df2"
          alt="Naftalan Oil Treatment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-black/25"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Naftalan
            </motion.h1>
            <motion.div 
              className="w-20 h-1 bg-blue-500 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.p 
              className="max-w-2xl mx-auto text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Təbiətin bizə bəxş etdiyi möcüzəvi müalicə
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Naftalan haqqında</h2>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  Naftalan, təkcə Azərbaycanda deyil, dünyada da unikal müalicəvi xüsusiyyətləri ilə tanınan xüsusi növ neftdir. Bu möcüzəvi neft, Azərbaycanın Naftalan şəhərində çıxarılan və özünəməxsus tərkibi ilə fərqlənən təbii müalicə vasitəsidir.
                </p>
                
                <p>
                  Naftalan neftinin müalicəvi xüsusiyyətləri haqqında ilk məlumatlar qədim zamanlardan bəri mövcuddur. Hələ XII əsrdə məşhur səyyah Marko Polo öz səyahətnamələrində Azərbaycandan çıxarılan qara neftin müalicəvi xüsusiyyətləri haqqında məlumat vermişdir. 
                </p>
                
                <p>
                  Naftalan neftinin tərkibi 15 növ bioloji aktiv maddələr, o cümlədən naften karbohidrogenləri, aromatik karbohidrogenlər və bioloji aktiv bərk parafinlərlə zəngindir. Məhz bu tərkib onun müalicəvi xüsusiyyətlərini təmin edir.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Naftalan neftinin müalicəvi xüsusiyyətləri</h3>
                
                <p>
                  Naftalan nefti ilə müalicə bir çox xəstəliklərin müalicəsində effektiv nəticələr verir:
                </p>
                
                <ul>
                  <li>Dəri xəstəlikləri (psoriaz, ekzema, neyrodermit)</li>
                  <li>Dayaq-hərəkət sistemi xəstəlikləri (artrit, artroz, osteoxondroz)</li>
                  <li>Periferik sinir sistemi xəstəlikləri (radikulit, nevralgiya)</li>
                  <li>Ginekoloji və uroloji xəstəliklər</li>
                  <li>Cərrahi əməliyyatlardan sonrakı reabilitasiya</li>
                </ul>
                
                <p>
                  Naftalan ilə müalicə, insan orqanizmində qan dövranını aktivləşdirir, iltihabı azaldır, metabolik prosesləri sürətləndirir və immun sistemini gücləndirir. Bu səbəbdən naftalan sanatoriyaları, həm müalicə, həm də profilaktika məqsədi ilə yüz minlərlə insanı qəbul edir.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Naftalan nefti ilə müalicə prosedurları</h3>
                
                <p>
                  Naftalan nefti ilə müalicə bir neçə formada aparılır:
                </p>
                
                <ul>
                  <li>Tam vannalar - bütün bədənin naftalan neftinə batırılması</li>
                  <li>Yarımvannalar - bədənin müəyyən hissələrinin müalicəsi</li>
                  <li>Naftalan applikasiyaları - xüsusi təsirli hissələr üçün</li>
                  <li>Tamponlar və kompresslər</li>
                </ul>
                
                <p>
                  Tipik müalicə kursu 8-15 prosedurdan ibarətdir və hər prosedur 8-12 dəqiqə davam edir. Həkim nəzarəti altında aparılan bu müalicə kursları maksimal effekt üçün optimal müddətdir.
                </p>
              </div>
              
              <div className="mt-10">
                <Link
                  href="/about/treatments"
                  className="inline-flex items-center py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium"
                >
                  <span>Müalicə olunan xəstəliklər</span>
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
                      alt="Naftalan Treatment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 bg-blue-50">
                    <h3 className="text-lg font-semibold mb-3">Rezervasiya edin</h3>
                    <p className="text-gray-600 mb-4">
                      Naftalan müalicəvi sanatoriyalarında yer rezervasiyası edərək öz sağlamlığınıza investisiya qoyun.
                    </p>
                    <Link
                      href="/reservation"
                      className="block text-center py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Rezervasiya et
                    </Link>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-md">
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-3">Əlaqə məlumatları</h3>
                    <div className="space-y-3 text-gray-600">
                      <p><span className="font-medium">Telefon:</span> +994 12 345 67 89</p>
                      <p><span className="font-medium">Email:</span> info@naftalan.az</p>
                      <p><span className="font-medium">Ünvan:</span> Naftalan şəhəri, Azərbaycan</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden shadow-md">
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-3">Faydalı keçidlər</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/about/history" className="text-blue-500 hover:underline">Naftalan neftinin tarixi</Link>
                      </li>
                      <li>
                        <Link href="/about/treatments" className="text-blue-500 hover:underline">Müalicə olunan xəstəliklər</Link>
                      </li>
                      <li>
                        <Link href="/sanatoriums/naftalan" className="text-blue-500 hover:underline">Naftalan sanatoriyaları</Link>
                      </li>
                      <li>
                        <Link href="/how-to-come" className="text-blue-500 hover:underline">Naftalana necə gəlmək olar</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 