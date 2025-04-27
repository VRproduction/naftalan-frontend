'use client';

import React, { ReactNode, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { SiteSettings } from '@/lib/types/core.type';

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
    </>
  );
} 