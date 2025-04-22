import ReservationPage from "@/features/reservation/ReservationPage";
import { getSanatoriums } from "@/lib/services/sanatorium.service";


import { SupportedLocale } from "@/lib/utils/apiClient";


interface Props {
  params: Promise<{ locale: SupportedLocale }>;
  searchParams?: Promise<{
    page?: string;
    page_size?: string;
    search?: string;
    category?: string;
    tags?: string;
    is_popular?: boolean;
    is_featured?: boolean;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;

  const [
    sanatoriums
  ] = await Promise.all([
    getSanatoriums(locale),
  ]);

  return (
    <ReservationPage sanatoriums={sanatoriums.results} />
  );
}
