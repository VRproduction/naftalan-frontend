import { PackageType } from '@/lib/types/package.type';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendarAlt, FaHotel, FaSpa, FaTag } from 'react-icons/fa';

interface PackageCardProps {
  pkg: PackageType;
  index: number;
}

export const PackageCard = ({ pkg, index }: PackageCardProps) => {
  const hasDiscount = pkg.discount_value > 0;

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-blue-700">{pkg.name}</h3>
          <div className="flex flex-col items-end">
            {hasDiscount ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    {pkg.original_price} {pkg.currency_symbol}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    {pkg.discount_type === 'percentage' ? `-${pkg.discount_value}%` : `-${pkg.discount_value} ${pkg.currency_symbol}`}
                  </span>
                </div>
                <div className="text-lg font-bold text-blue-700">
                  {pkg.discounted_price} {pkg.currency_symbol}
                </div>
              </>
            ) : (
              <div className="text-lg font-bold text-blue-700">
                {pkg.original_price} {pkg.currency_symbol}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <FaHotel className="mr-2" />
          <span>{pkg.sanatorium_name}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="mr-2" />
          <span>{pkg.duration} gün</span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <h4 className="font-medium mb-3 flex items-center">
          <FaSpa className="mr-2 text-blue-600" />
          Paketə daxildir:
        </h4>
        <ul className="space-y-2 mb-6">
          {pkg.inclusions.map((inclusion) => (
            <li key={inclusion.id} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-600">{inclusion.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <Link 
          href={`/packages/${pkg.slug}`}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          Sifariş et
        </Link>
      </div>
    </motion.div>
  );
};