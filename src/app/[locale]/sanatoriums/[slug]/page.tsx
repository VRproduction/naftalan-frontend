import SanatoriumDetailPage from "@/features/sanatoriums/SanatoriumDetailPage";
import { getSanatorium } from "@/lib/services/sanatorium.service";
import { SupportedLocale } from "@/lib/utils/apiClient";
import React from "react";

interface Props {
  params: Promise<{
    slug: string;
    locale: SupportedLocale
  }>;
}

const page = async ({ params }: Props) => {
  const { slug, locale } = await params;

  const [
    sanatorium,
  ] = await Promise.all([
    getSanatorium(locale, slug),
  ]);

  return <SanatoriumDetailPage sanatorium={sanatorium} />;
};

export default page;
