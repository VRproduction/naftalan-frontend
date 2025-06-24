'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ProgressContextType {
  isLoading: boolean;
  progress: number;
  startProgress: () => void;
  updateProgress: (value: number) => void;
  completeProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const startProgress = useCallback((): void => {
    setIsLoading(true);
    setProgress(0);
  }, []);

  const updateProgress = useCallback((value: number): void => {
    const clampedValue = Math.min(100, Math.max(0, value));
    setProgress(clampedValue);
  }, []);

  const completeProgress = useCallback((): void => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 300);
  }, []);

  const value: ProgressContextType = {
    isLoading,
    progress,
    startProgress,
    updateProgress,
    completeProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};