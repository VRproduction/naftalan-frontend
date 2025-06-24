// types/progress.ts
export interface RouteProgressConfig {
    height?: number;
    showOnShallow?: boolean;
    color?: string;
    className?: string;
    duration?: number;
  }
  
  export interface UseRouteProgressReturn {
    isLoading: boolean;
    progress: number;
    startProgress: () => void;
    completeProgress: () => void;
  }
  