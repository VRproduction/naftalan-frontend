import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

// Sample data - would come from an API in a real app
const sanatoriums = [
  {
    id: 1,
    name: 'Qaşaltı Sanatoriyası',
    location: 'Naftalan',
    rating: 4.8,
    price: 120,
    features: ['Spa mərkəzi', 'Müalicəvi neft vannaları', '24/7 tibbi xidmət'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945'
  },
  {
    id: 2,
    name: 'Chinar Hotel & Spa',
    location: 'Naftalan',
    rating: 4.7,
    price: 150,
    features: ['Premium spa', 'Restoran', 'Fitness mərkəzi'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd'
  },
  {
    id: 3,
    name: 'Naftalan Hotel',
    location: 'Naftalan',
    rating: 4.5,
    price: 95,
    features: ['Ekonomik paketlər', 'Naftalan vannası', 'Masaj otağı'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'
  }
];

const SanatoriumCard = ({ sanatorium, index }: { sanatorium: typeof sanatoriums[0], index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={sanatorium.image}
          alt={sanatorium.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-blue-900/20 to-transparent opacity-60"></div>
        <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full flex items-center text-sm font-medium shadow-md">
          <FaStar className="text-yellow-500 mr-1" />
          <span>{sanatorium.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {sanatorium.price}€ / gecə
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{sanatorium.name}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <FaMapMarkerAlt className="mr-1" />
            <span>{sanatorium.location}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <ul className="space-y-2">
            {sanatorium.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-700 text-sm">
                <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <Link 
          href={`/sanatoriums/${sanatorium.id}`}
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center justify-center group"
        >
          <span>Ətraflı məlumat</span>
          <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

const SanatoriumsSection = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Rahatlıq və Müalicə Mərkəzləri
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ən Yaxşı Sanatoriyalar
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Naftalan və ətraf şəhərlərdə yerləşən ən yaxşı sanatoriyalarda istirahət edərək sağlamlığınıza qovuşun
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sanatoriums.map((sanatorium, index) => (
            <SanatoriumCard key={sanatorium.id} sanatorium={sanatorium} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/sanatoriums"
            className="py-3 px-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl font-medium transform hover:-translate-y-1"
          >
            <span>Bütün sanatoriyalar</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SanatoriumsSection; 