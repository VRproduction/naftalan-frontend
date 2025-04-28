import HomePage from "@/features/home/HomePage";
import { getBlogs, getHeroSlider, getSanatoriums } from "@/lib/services/home.service";
import {
  getAboutSection,
  getSanatoriumsSection,
  getTreatmentsSection,
  getPackagesSection,
  getTestimonials,
  getTestimonialsSection,
  getFAQsSection,
  getFAQs,
  getBlogSection,
  getContactSection,
} from "@/lib/services/home.service";
import { getLocations } from "@/lib/services/sanatorium.service";

import { SupportedLocale } from "@/lib/utils/apiClient";

interface Props {
  params: Promise<{ locale: SupportedLocale }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const [
    heroSliders,
    aboutSection,
    sanatoriumsSection,
    treatmentSection,
    packagesSection,
    testimonials,
    testimonialSection,
    faqSection,
    faqs,
    blogSection,
    contactSection,
    sanatoriums,
    blogs,
    locations
  ] = await Promise.all([
    getHeroSlider(locale),
    getAboutSection(locale),
    getSanatoriumsSection(locale),
    getTreatmentsSection(locale),
    getPackagesSection(locale),
    getTestimonials(locale),
    getTestimonialsSection(locale),
    getFAQsSection(locale),
    getFAQs(locale),
    getBlogSection(locale),
    getContactSection(locale),
    getSanatoriums(locale),
    getBlogs(locale),
    getLocations(locale)
  ]);
  return (
    <HomePage
      heroSliders={heroSliders}
      aboutSection={aboutSection}
      sanatoriumsSection={sanatoriumsSection}
      sanatoriums={sanatoriums}
      treatmentSection={treatmentSection}
      packagesSection={packagesSection}
      testimonials={testimonials}
      testimonialSection={testimonialSection}
      faqSection={faqSection}
      faqs={faqs}
      blogSection={blogSection}
      blogs={blogs}
      contactSection={contactSection}
      locations={locations}
    />
  );
}
