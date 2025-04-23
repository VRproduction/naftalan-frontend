import OtherSanatoriumsPage from "@/features/sanatoriums/OtherCitiesSanatoriumsPage";
import { getOtherCitiesSanatoriums, getOtherCitiesSanatoriumsPage } from "@/lib/services/sanatorium.service";
import { SupportedLocale } from "@/lib/utils/apiClient";
import React from "react";

interface Props {
  params: Promise<{
    locale: SupportedLocale
  }>;
}

const page = async ({ params }: Props) => {
  const { locale } = await params;

  const [
    naftalanSanatoriumsPage,
    naftalanSanatoriums,
  ] = await Promise.all([
    getOtherCitiesSanatoriumsPage(locale),
    getOtherCitiesSanatoriums(locale),
  ]);

  return <OtherSanatoriumsPage otherCitiesSanatoriumsPage={naftalanSanatoriumsPage} otherCitiesSanatoriums={naftalanSanatoriums} />;
};

export default page;
