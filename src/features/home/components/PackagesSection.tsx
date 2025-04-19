import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendarAlt, FaHotel, FaSpa, FaUtensils } from 'react-icons/fa';

// Sample data for packages
const packages = [
  {
    id: 1,
    title: '7 günlük sağlamlıq paketi',
    hotel: 'Qaşaltı Sanatoriyası',
    price: 840,
    features: [
      'Gündə 2 dəfə naftalan nefti vannaları',
      'Tam pansion qidalanma',
      'Gündəlik massaj seansı',
      'Spa və hovuz istifadəsi'
    ]
  },
  {
    id: 2,
    title: '10 günlük müalicə paketi',
    hotel: 'Chinar Hotel & Spa',
    price: 1350,
    features: [
      'Gündə 2 dəfə naftalan nefti vannaları',
      'Tam pansion qidalanma',
      'Həkim müayinəsi və nəzarəti',
      'Parafin müalicəsi',
      'Spa və hovuz istifadəsi'
    ]
  },
  {
    id: 3,
    title: '14 günlük intensiv müalicə',
    hotel: 'Naftalan Hotel',
    price: 1680,
    features: [
      'Gündə 2 dəfə naftalan nefti vannaları',
      'Tam pansion qidalanma',
      'Gündəlik massaj seansı',
      'Fizioterapiya seansları',
      'Həkim müayinəsi və nəzarəti',
      'Spa və hovuz istifadəsi'
    ]
  }
];

const PackageCard = ({ pkg, index }: { pkg: typeof packages[0], index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-blue-700">{pkg.title}</h3>
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {pkg.price}€
          </div>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <FaHotel className="mr-2" />
          <span>{pkg.hotel}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="mr-2" />
          <span>{pkg.title.split(' ')[0]}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="font-medium mb-3 flex items-center">
          <FaSpa className="mr-2 text-blue-600" />
          Paketə daxildir:
        </h4>
        <ul className="space-y-2 mb-6">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <Link 
          href={`/packages/${pkg.id}`}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          Sifariş et
        </Link>
      </div>
    </motion.div>
  );
};

const PackagesSection = () => {
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
            Hazır paketlər
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Müxtəlif müddətli və müalicə növlü hazır paketlərimizdən seçərək rahatlıqla rezervasiya edin
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/packages"
            className="py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors inline-block"
          >
            Bütün paketlər
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection; 