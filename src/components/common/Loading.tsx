'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaSpinner } from 'react-icons/fa';
import { useLoadingStore } from '@/store/useLoadingStore';

interface LoadingProps {
  variant?: 'default' | 'fullscreen' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  useGlobalState?: boolean;
}

export default function Loading({ 
  variant = 'default', 
  size = 'md', 
  text,
  className = '',
  useGlobalState = false
}: LoadingProps) {
  const t = useTranslations('common.loading');
  const { isLoading, loadingText, loadingVariant, loadingSize } = useLoadingStore();

  // Eğer global state kullanılıyorsa ve loading false ise, componenti gösterme
  if (useGlobalState && !isLoading) return null;

  // Global state kullanılıyorsa, global değerleri kullan
  const currentVariant = useGlobalState ? loadingVariant : variant;
  const currentSize = useGlobalState ? loadingSize : size;
  const currentText = useGlobalState ? loadingText : text;

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const variantClasses = {
    default: 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50',
    fullscreen: 'fixed inset-0 bg-white z-50',
    inline: 'relative'
  };

  const containerClasses = {
    default: 'flex items-center justify-center min-h-screen',
    fullscreen: 'flex items-center justify-center min-h-screen',
    inline: 'flex items-center justify-center'
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`${variantClasses[currentVariant || 'default']} ${className}`}>
      <div className={containerClasses[currentVariant || 'default']}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`${sizeClasses[currentSize || 'md']} text-blue-500 mx-auto`}
          >
            <FaSpinner className="w-full h-full" />
          </motion.div>
          {currentText && (
            <p className={`mt-2 text-gray-600 ${textClasses[currentSize || 'md']}`}>
              {currentText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 