'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from '@/i18n/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-red-500">500</h1>
          <div className="w-20 h-1 bg-red-500 mx-auto my-6"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('title')}</h2>
          <p className="text-gray-600 mb-8">{t('description')}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={reset}
              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
            >
              {t('try_again')}
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all"
            >
              {t('back_to_home')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 