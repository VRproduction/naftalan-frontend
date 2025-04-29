import { create } from 'zustand';
import { SiteSettings } from '../types/core.type';

interface SettingState {
  setting: SiteSettings | null;
  setSetting: (setting: SiteSettings) => void;
}

export const useSettingsStore = create<SettingState>((set) => ({
  setting: null,
  setSetting: (setting: SiteSettings) => set({ setting }),
})); 