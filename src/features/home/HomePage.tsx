"use client";

import HeroSlider from "@/features/home/components/HeroSlider";
import SearchForm from "@/features/home/components/SearchForm";
import AboutSection from "@/features/home/components/AboutSection";
import SanatoriumsSection from "@/features/home/components/SanatoriumsSection";
import TreatmentTypesSection from "@/features/home/components/TreatmentTypesSection";
import PackagesSection from "@/features/home/components/PackagesSection";
import ContactSection from "@/features/home/components/ContactSection";
import TestimonialsSection from "@/features/home/components/TestimonialsSection";
import FAQSection from "@/features/home/components/FAQSection";
import BlogSection from "@/features/home/components/BlogSection";
import {
  HeroSlider as HeroSliderType,
  AboutSection as AboutSectionType,
  SanatoriumSection as SanatoriumSectionType,
  TreatmentSection as TreatmentSectionType,
  PackageSection as PackageSectionType,
  Testimonial,
  TestimonialsSection as TestimonialsSectionType,
  FAQSection as FAQSectionType,
  FAQ as FAQType,
  BlogSection as BlogSectionType,
  ContactSection as ContactSectionType,
} from "@/lib/types/home.type";

interface Props {
  heroSliders: HeroSliderType[];
  aboutSection: AboutSectionType;
  sanatoriumsSection: SanatoriumSectionType;
  treatmentSection: TreatmentSectionType;
  packagesSection: PackageSectionType;
  testimonials: Testimonial[];
  testimonialSection: TestimonialsSectionType;
  faqSection: FAQSectionType;
  faqs: FAQType[];
  blogSection: BlogSectionType;
  contactSection: ContactSectionType;
}

export default function HomePage({
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
}: Props) {
  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section with Slider */}
      <HeroSlider heroSliders={heroSliders} />

      {/* Search Form */}
      <div className="container mx-auto relative">
        <SearchForm />
      </div>

      {/* About Section */}
      <AboutSection aboutSection={aboutSection} />

      {/* Sanatoriums Section */}
      <SanatoriumsSection sanatoriums={[]} sanatoriumsSection={sanatoriumsSection} />

      {/* Treatment Types Section */}
      <TreatmentTypesSection treatmentSection={treatmentSection} />

      {/* Packages Section */}
      <PackagesSection packagesSection={packagesSection} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonialSection={testimonialSection} testimonials={testimonials} />

      {/* FAQ Section */}
      <FAQSection faqSection={faqSection} faqs={faqs} />

      {/* Blog Section */}
      <BlogSection blogSection={blogSection} />

      {/* Contact Section */}
      <ContactSection contactSection={contactSection} />
    </div>
  );
}
