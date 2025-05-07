import ReservationPage from "@/features/reservation/ReservationPage";
import {
  getLocations,
  getSanatoriumList,
  getSanatoriumsSearch,
} from "@/lib/services/sanatorium.service";

import { SupportedLocale } from "@/lib/utils/apiClient";

interface Props {
  params: Promise<{ locale: SupportedLocale }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  const {
    city,
    check_in,
    check_out,
    occupancy,
    children_ages,
    ratings,
    min_price,
    max_price,
    min_total_price,
    max_total_price,
    id
  } = await searchParams;

  const [sanatoriums, locations, sanatoriumsList] = await Promise.all([
    getSanatoriumsSearch(locale, {
      location: String(city),
      check_in: String(check_in),
      check_out: String(check_out),
      occupancy: String(occupancy),
      children_ages: String(children_ages),
      ratings: String(ratings),
      min_price: String(min_price),
      max_price: String(max_price),
      min_total_price: String(min_total_price),
      max_total_price: String(max_total_price),
      id: String(id)
    }),
    getLocations(locale),
    getSanatoriumList(locale)
  ]);

  return (
    <ReservationPage sanatoriums={sanatoriums.results} locations={locations} sanatoriumsList={sanatoriumsList} />
  );
}


