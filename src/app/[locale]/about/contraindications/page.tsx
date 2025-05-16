import ContraindicationsPage from '@/features/about/ContraindicationsPage';
import { getContraindications } from '@/lib/services/about.service';
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
      getContraindications(locale),
      
    ]);
  return (
    <ContraindicationsPage data={data.content}/>
  )
}

