import { useState, useEffect, useMemo } from 'react';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaUsers, FaTimes } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { PackageType } from '@/lib/types/package.type';
import { createPackageOrder } from '@/lib/services/package.service';
import { motion, AnimatePresence } from 'framer-motion';

interface PackageOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: PackageType;
}

export const PackageOrderModal = ({ isOpen, onClose, pkg }: PackageOrderModalProps) => {
  const t = useTranslations('packages');

  // Utility to format a Date object as YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Calculate tomorrow's date for min check-in
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = formatDate(tomorrow);

  // Generate adults options based on package occupancy
  const adultOptions = useMemo(() => {
    const maxOccupancy = pkg.occupancy || 4; // Default to 4 if not specified
    return Array.from({ length: maxOccupancy }, (_, i) => i + 1);
  }, [pkg.occupancy]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    check_in: '',
    check_out: '',
    adults: 1,
    children: 0,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-calculate check_out date when check_in changes
  useEffect(() => {
    if (formData.check_in && pkg.duration) {
      const checkInDate = new Date(formData.check_in);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + pkg.duration);
      
      setFormData(prev => ({
        ...prev,
        check_out: formatDate(checkOutDate),
      }));
    }
  }, [formData.check_in, pkg.duration]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create package order with properly formatted dates
      await createPackageOrder({
        package: pkg.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        check_in: formData.check_in
          ? formatDate(new Date(formData.check_in))
          : '',
        check_out: formData.check_out
          ? formatDate(new Date(formData.check_out))
          : '',
        adults: formData.adults,
        children: formData.children,
        notes: formData.notes,
      });

      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          check_in: '',
          check_out: '',
          adults: 1,
          children: 0,
          notes: '',
        });
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : t('order_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[4400]  flex items-center justify-center p-0 sm:p-6 md:p-8 bg-black/50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-xl shadow-2xl overflow-hidden max-h-screen sm:max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-between items-center bg-blue-600 text-white px-4 sm:px-6 py-4">
              <h2 className="text-lg sm:text-xl font-semibold truncate">
                {t('order_package')}: {pkg.name}
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto">
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 sm:p-6 mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {t('order_success_title')}
                  </h3>
                  <p>{t('order_success_message')}</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 sm:p-6 mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {t('order_error_title')}
                  </h3>
                  <p>{error}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="pb-[100px] sm:pb-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        {t('first_name')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder={t('first_name')}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        {t('last_name')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder={t('last_name')}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        {t('email')}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        {t('phone')}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+994 XX XXX XX XX"
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="check_in"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        {t('check_in_date')}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="check_in"
                          name="check_in"
                          min={minDate}
                          value={formData.check_in}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{pkg.duration} {t('day')} {t('package')}</p>
                    </div>
                    <div>
                      <label
                        htmlFor="adults"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        {t('guests')}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <select
                            id="adults"
                            name="adults"
                            value={formData.adults}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            {adultOptions.map(num => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? t('adult') : t('adults')}
                              </option>
                            ))}
                          </select>
                          <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative">
                          <select
                            id="children"
                            name="children"
                            value={formData.children}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {[0, 1, 2, 3].map(num => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? t('child') : t('children')}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="notes"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      {t('special_requests')}
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={t('special_requests')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap justify-end gap-2 sm:static fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 sm:border-0 sm:p-0">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
                    >
                      {isSubmitting ? t('submitting') : t('submit_order')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};