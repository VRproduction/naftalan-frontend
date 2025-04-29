import React from 'react';
import { SupportedLocale } from '@/lib/utils/apiClient';
import { notFound } from 'next/navigation';
import PackagePage from '@/features/packages/PackagePage';
import { getPackages } from '@/lib/services/package.service';

interface Props {
  params: Promise<{
    locale: SupportedLocale;
  }>;
}


export default async function BlogDetailPage({ params }: Props) {
  const { locale } = await params;
  try {
    const [packages] = await Promise.all([
      getPackages(locale),
    ]);
    
    return <PackagePage packages={packages.results} />;
  } catch (error) {
    notFound();
  }
}
