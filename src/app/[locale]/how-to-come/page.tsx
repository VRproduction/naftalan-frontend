import React from 'react';
import { SupportedLocale } from '@/lib/utils/apiClient';
import { notFound } from 'next/navigation';
import HowToComePage from '@/features/how-to-come/HowToComePage';
import { getHeroSection, getLocationSection, getTransportSection, getVisaSection } from '@/lib/services/how-to-come.service';

interface Props {
  params: Promise<{
    locale: SupportedLocale;
  }>;
}


export default async function BlogDetailPage({ params }: Props) {
  const { locale } = await params;
  try {
    const [heroSection, locationSection, transportSection, visaSection] = await Promise.all([
      getHeroSection(locale),
      getLocationSection(locale),
      getTransportSection(locale),
      getVisaSection(locale),
    ]);
    
    return <HowToComePage heroSection={heroSection} locationSection={locationSection} transportSection={transportSection} visaSection={visaSection} />;
  } catch (error) {
    notFound();
  }
}
