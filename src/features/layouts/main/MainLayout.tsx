'use client';

import React, { ReactNode, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { SiteSettings } from '@/lib/types/core.type';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import Loading from '@/components/common/Loading';

interface MainLayoutProps {
  children: ReactNode;
  siteSettings: SiteSettings;
}

export default function MainLayout({ children, siteSettings }: MainLayoutProps) {

  return (
    <>
      <Header siteSettings={siteSettings} />
        <main className='pt-[60px] md:pt-[60px]'>
        {children}
        </main>
      <Footer siteSettings={siteSettings} />
      <Loading useGlobalState size='lg' />
      {/* WhatsApp Button */}
      {siteSettings.whatsapp_number && (
        <WhatsAppButton phoneNumber={siteSettings.whatsapp_number} />
      )}
    </>
  );
} 