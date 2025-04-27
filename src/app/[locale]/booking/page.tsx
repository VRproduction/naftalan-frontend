import BookingPage from '@/features/booking/BookingPage'
import { getSanatorium } from '@/lib/services/sanatorium.service';
import { SupportedLocale } from '@/lib/utils/apiClient';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
  params: Promise<{
    locale: SupportedLocale;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}


const Page = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const { snt } = await searchParams;

  try {
    const [sanatorium] = await Promise.all([
      getSanatorium(locale, String(snt)),
    ]);
    return (
      <BookingPage sanatorium={sanatorium} />
    )
  } catch (error) {
    return notFound();
  }
}

export default Page