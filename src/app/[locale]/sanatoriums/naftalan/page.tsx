import NaftalanSanatoriumsPage from "@/features/sanatoriums/NaftalanSanatoriumsPage";
import { getNaftalanSanatoriums, getNaftalanSanatoriumsPage } from "@/lib/services/sanatorium.service";
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
    getNaftalanSanatoriumsPage(locale),
    getNaftalanSanatoriums(locale),
  ]);

  return <NaftalanSanatoriumsPage naftalanSanatoriumsPage={naftalanSanatoriumsPage} naftalanSanatoriums={naftalanSanatoriums} />;
};

export default page;
