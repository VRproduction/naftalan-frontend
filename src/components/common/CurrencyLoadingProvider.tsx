'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useCurrency } from '@/lib/utils/currency';

interface CurrencyLoadingProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function CurrencyLoadingProvider({
  children,
  fallback = <div className="flex justify-center p-4">Valyuta məzənnələri yüklənir...</div>,
}: CurrencyLoadingProviderProps) {
  const { isLoading } = useCurrency();
  const [isClient, setIsClient] = useState(false);

  // This effect ensures we're only rendering on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR or when loading, show fallback
  if (!isClient || isLoading) {
    return <>{fallback}</>;
  }

  // When loaded and on client, show children
  return <>{children}</>;
} 