import AboutPage from "@/features/about/AboutPage";
import { getAbout } from "@/lib/services/about.service";


import { SupportedLocale } from "@/lib/utils/apiClient";

interface Props {
  params: Promise<{ locale: SupportedLocale }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const [
    aboutSection,
  ] = await Promise.all([
    getAbout(locale),
  ]);

  return (
    <AboutPage about={aboutSection} />
  );
}
