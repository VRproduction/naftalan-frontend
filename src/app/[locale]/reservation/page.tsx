import ReservationPage from "@/features/reservation/ReservationPage";
import { getSanatoriums } from "@/lib/services/sanatorium.service";


import { SupportedLocale } from "@/lib/utils/apiClient";


interface Props {
  params: Promise<{ locale: SupportedLocale }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  const { city } = await searchParams;

  const [
    sanatoriums
  ] = await Promise.all([
    getSanatoriums(locale, {
      location: String(city) 
    }),
  ]);

  return (
    <ReservationPage sanatoriums={sanatoriums.results} />
  );
}
