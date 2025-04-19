import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

// Sample FAQ data
const faqs = [
  {
    id: 1,
    question: 'Naftalan nefti nədir?',
    answer: 'Naftalan nefti, Azərbaycanın Naftalan şəhərində çıxarılan, tərkibində bioloji aktiv komponentlər olan xüsusi növ neftdir. Bu neft, müalicəvi xüsusiyyətləri ilə tanınır və bir çox xəstəliklərin müalicəsində istifadə olunur.'
  },
  {
    id: 2,
    question: 'Naftalan müalicəsi hansı xəstəliklərə kömək edir?',
    answer: 'Naftalan nefti ilə müalicə əsasən dəri xəstəlikləri (psoriaz, ekzema), oynaq xəstəlikləri (artrit, revmatizm), əzələ ağrıları, nevroloji problemlər və qadın xəstəlikləri üçün effektivdir. Həmçinin, ümumi immunitet sistemini gücləndirərək bir çox sağlamlıq problemlərinə müsbət təsir göstərir.'
  },
  {
    id: 3,
    question: 'Naftalan müalicəsinin yan təsirləri varmı?',
    answer: 'Peşəkar həkimlərin nəzarəti altında aparılan müalicələr zamanı ciddi yan təsirlər demək olar ki, müşahidə olunmur. Lakin bəzi hallarda dəridə qızartı, qaşınma kimi keçici reaksiyalar ola bilər. Müalicəyə başlamazdan əvvəl həkim məsləhəti almaq vacibdir, çünki bəzi xəstəliklər (məsələn, onkoloji, ağır ürək-damar xəstəlikləri) zamanı Naftalan müalicəsi əks göstəriş ola bilər.'
  },
  {
    id: 4,
    question: 'Naftalan müalicəsi üçün optimal müddət nə qədərdir?',
    answer: 'Naftalan müalicəsi üçün optimal müddət xəstəliyin növündən və şiddətindən asılıdır, lakin ümumiyyətlə 7-14 gün arasındadır. Daha ciddi xəstəliklər və xroniki problemlər üçün daha uzun müalicə kursları tövsiyə oluna bilər. Dəqiq müddəti həkim sizin fərdi vəziyyətinizə görə təyin edəcək.'
  },
  {
    id: 5,
    question: 'Naftalana necə gələ bilərəm?',
    answer: 'Naftalan şəhəri Bakıdan təxminən 320 km məsafədə, Gəncədən isə 48 km məsafədə yerləşir. Bakıdan Gəncəyə təyyarə və ya avtobusla gəlib, oradan Naftalana taksi və ya ictimai nəqliyyatla getmək mümkündür. Həmçinin, bir çox sanatoriya və otel transfer xidməti də təklif edir.'
  },
  {
    id: 6,
    question: 'Müalicə qəbulu üçün öncədən rezervasiya etmək lazımdır?',
    answer: 'Bəli, Naftalan sanatoriyaları və müalicə mərkəzlərində yer təmin etmək üçün öncədən rezervasiya etmək tövsiyə olunur, xüsusilə yay və qış tətil mövsümlərində. Rezervasiya veb saytımız, e-poçt və ya telefon vasitəsilə edilə bilər.'
  }
];

const FAQ = ({ faq, isOpen, toggleOpen }: { faq: typeof faqs[0], isOpen: boolean, toggleOpen: () => void }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg">{faq.question}</span>
        <FaChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Tez-tez verilən suallar
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Naftalan və müalicə prosedurları haqqında ən çox verilən suallar və cavablar
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: faq.id * 0.1 }}
              viewport={{ once: true }}
            >
              <FAQ 
                faq={faq} 
                isOpen={openFaq === faq.id} 
                toggleOpen={() => toggleFaq(faq.id)} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 