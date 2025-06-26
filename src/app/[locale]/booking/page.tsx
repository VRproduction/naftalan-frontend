import BookingPage from '@/features/booking/BookingPage'
import { getRoomService, getSanatorium } from '@/lib/services/sanatorium.service';
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

  const {
    check_in,
    check_out,
    occupancy,
    children_ages,
    sanatoriumPk,
    roomPk,
    with_treatment
  } = await searchParams;


  try {
    const [room] = await Promise.all([
      getRoomService(locale, Number(sanatoriumPk), Number(roomPk), {
        check_in: String(check_in),
        check_out: String(check_out),
        occupancy: String(occupancy),
        children_ages: String(children_ages),  
        with_treatment: (with_treatment === "true" || with_treatment === "false") ? with_treatment : undefined
      } )
    ]);
    return (
      <BookingPage room={room} />
    )
  } catch (error) {
    return notFound();
  }
}

export default Page