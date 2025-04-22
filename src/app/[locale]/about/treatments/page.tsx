import TreatmentsPage from "@/features/about/TreatmentsPage";
import { getTreantmentProcesses, getTreatmentCategories, getTreatments, getTreatmentsPage } from "@/lib/services/about.service";


import { SupportedLocale } from "@/lib/utils/apiClient";

interface Props {
  params: Promise<{ locale: SupportedLocale }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const [
    treatmentsPage,
    treatments,
    categories,
    processes,
  ] = await Promise.all([
    getTreatmentsPage(locale),
    getTreatments(locale),
    getTreatmentCategories(locale),
    getTreantmentProcesses(locale),
  ]);

  return (
    <TreatmentsPage
      treatmentsPage={treatmentsPage}
      treatments={treatments}
      categories={categories}
      processes={processes}
    />
  );
}
