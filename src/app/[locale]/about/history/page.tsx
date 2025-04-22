import HistoryPage from "@/features/about/HistoryPage";
import { getHistory } from "@/lib/services/about.service";


import { SupportedLocale } from "@/lib/utils/apiClient";

interface Props {
  params: Promise<{ locale: SupportedLocale }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const [
    history,
  ] = await Promise.all([
    getHistory(locale),
  ]);

  return (
    <HistoryPage history={history} />
  );
}
