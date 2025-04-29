'use client';
import { ReactNode, useEffect } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { SiteSettings } from '../types/core.type';

interface Props {
  children: ReactNode;
  setting: SiteSettings;
}

export function AppInitializer({ children, setting }: Props) {
  const {setSetting} = useSettingsStore();

  useEffect(() => {
    setSetting(setting);
  }, [setSetting]);

  return <>{children}</>;
}
