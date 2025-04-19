'use client';

import React, { ReactNode, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';


interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
} 