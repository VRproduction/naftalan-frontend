import IndicationsPage from '@/features/about/IndicationsPage'
import { getIndication } from '@/lib/services/about.service';
import { SupportedLocale } from '@/lib/utils/apiClient';
import React from 'react'

interface Props {
    params: Promise<{ locale: SupportedLocale }>;
  }

export default async function Page({ params }: Props) {
    const { locale } = await params;
  
    const [
      data
    ] = await Promise.all([
      getIndication(locale),
      
    ]);
  return (
    <IndicationsPage data={data.content}/>
  )
}

