'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { UseRouteProgressReturn } from '../types/progress.type';

export const useRouteProgress = (
  duration: number = 800
): UseRouteProgressReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const startProgress = useCallback((): void => {
    setIsLoading(true);
    setProgress(0);
  }, []);

  const completeProgress = useCallback((): void => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 200);
  }, []);

  useEffect(() => {
    startProgress();
    const timer = setTimeout(() => {
      completeProgress();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams, duration, startProgress, completeProgress]);

  return {
    isLoading,
    progress,
    startProgress,
    completeProgress,
  };
};