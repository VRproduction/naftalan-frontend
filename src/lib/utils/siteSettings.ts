import { cache } from 'react';
import { getSiteSettings } from '@/lib/services/core.service';
import { SiteSettings } from '@/lib/types/core.type';
import { SupportedLocale } from '@/lib/utils/apiClient';

// Create a memoized function using React's cache to fetch site settings
export const getSiteSettingsData = cache(async (locale: SupportedLocale): Promise<SiteSettings> => {
  try {
    // The API client already returns the data directly
    const siteSettings = await getSiteSettings(locale);
    return siteSettings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    // Return empty site settings in case of error
    // We need to cast to unknown first to avoid TypeScript errors with a partial object
    return {} as unknown as SiteSettings;
  }
}); 