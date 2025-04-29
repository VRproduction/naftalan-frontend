import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  loadingVariant?: 'default' | 'fullscreen' | 'inline';
  loadingSize?: 'sm' | 'md' | 'lg';
  setLoading: (isLoading: boolean, options?: {
    text?: string;
    variant?: 'default' | 'fullscreen' | 'inline';
    size?: 'sm' | 'md' | 'lg';
  }) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingText: undefined,
  loadingVariant: 'default',
  loadingSize: 'md',
  setLoading: (isLoading, options = {}) => set({
    isLoading,
    loadingText: options.text,
    loadingVariant: options.variant,
    loadingSize: options.size
  })
})); 