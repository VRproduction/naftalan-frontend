import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import { PackageType } from '@/lib/types/package.type';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaCalendarAlt, FaHotel, FaSpa } from 'react-icons/fa';
import { PackageOrderModal } from './PackageOrderModal';

interface PackageCardProps {
  pkg: PackageType;
  index: number;
}

export const PackageCard = ({ pkg, index }: PackageCardProps) => {
  const hasDiscount = pkg.discount_value > 0;
  const { formatPrice } = useCurrencyStore();
  const t = useTranslations('packages');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
                    <span className="text-sm text-gray-500 line-through whitespace-nowrap">
                      {formatPrice(pkg.original_price)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
                      {pkg.discount_type === 'percentage' ? `-${pkg.discount_value}%` : `-${formatPrice(pkg.discount_value)}`}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-blue-700 whitespace-nowrap">
                    {formatPrice(pkg.discounted_price)}
                  </div>
                </>
              ) : (
                <div className="text-lg font-bold text-blue-700 whitespace-nowrap">
                  {formatPrice(pkg.original_price)}
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
            <span>{pkg.duration} {t('day')}</span>
          </div>
        </div>
        
        <div className="p-6 flex-grow">
          <h4 className="font-medium mb-3 flex items-center">
            <FaSpa className="mr-2 text-blue-600" />
            {t("include_package")}:
          </h4>
          <ul className="space-y-2 mb-6">
            {pkg.inclusions.map((inclusion) => (
              <li key={inclusion.id} className="flex items-start">
                <svg className="min-w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-600">{inclusion.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 pt-0 mt-auto">
          <button
            onClick={openModal}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            {t("order")}
          </button>
        </div>
      </motion.div>
      
      <PackageOrderModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        pkg={pkg}
      />
    </>
  );
};