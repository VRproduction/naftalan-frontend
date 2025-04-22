import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TreatmentSection } from '@/lib/types/home.type';

// Sample data for treatments
const treatments = [
  {
    id: 1,
    title: 'Naftalan nefti vannaları',
    description: 'Naftalan nefti ilə doldurulmuş vannalarda aparılan müalicə, dəri xəstəlikləri və oynaq ağrıları üçün əla müalicə üsuludur.',
    image: '/images/treatment-oil-bath.jpg',
    icon: '🛀'
  },
  {
    id: 2,
    title: 'Parafin müalicəsi',
    description: 'Parafin ilə müalicə, xüsusilə artrit və əzələ ağrıları üçün effektiv bir üsuldur.',
    image: '/images/treatment-paraffin.jpg',
    icon: '🧴'
  },
  {
    id: 3,
    title: 'Massaj terapiyası',
    description: 'Peşəkar massaj terapistləri tərəfindən aparılan massaj, gərginliyi azaldır və qan dövranını yaxşılaşdırır.',
    image: '/images/treatment-massage.jpg',
    icon: '💆‍♂️'
  },
  {
    id: 4,
    title: 'Balneoterapiya',
    description: 'Mineral sular və palçıqlar ilə aparılan balneoterapiya, orqanizmin detoksifikasiyasına kömək edir.',
    image: '/images/treatment-balneo.jpg',
    icon: '💧'
  }
];

// For demo purposes, we'll use placeholder images from unsplash
const placeholderImages = [
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
  'https://images.unsplash.com/photo-1620733723572-11c53fc809a9',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35',
  'https://images.unsplash.com/photo-1544161497-d2c2e2936a81'
];

const TreatmentCard = ({ treatment, index }: { treatment: typeof treatments[0], index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative h-52">
        <Image
          src={placeholderImages[index]} // Use the placeholder for demo
          alt={treatment.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md">
          {treatment.icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{treatment.title}</h3>
        <p className="text-gray-600 mb-4">{treatment.description}</p>
        <Link 
          href={`/treatments/${treatment.id}`}
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
        >
          Ətraflı məlumat
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const TreatmentTypesSection = ({ treatmentSection }: { treatmentSection: TreatmentSection }) => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {treatmentSection.title}
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            {treatmentSection.section_description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={treatment.id} treatment={treatment} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/treatments"
            className="py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors inline-block"
          >
            Bütün müalicə növləri
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TreatmentTypesSection; 