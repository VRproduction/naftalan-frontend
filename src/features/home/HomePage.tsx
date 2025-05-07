"use client";

import HeroSlider from "@/features/home/components/sections/HeroSlider";
import SearchForm from "@/features/home/components/sections/SearchForm";
import AboutSection from "@/features/home/components/sections/AboutSection";
import SanatoriumsSection from "@/features/home/components/sections/SanatoriumsSection";
import PackagesSection from "@/features/home/components/sections/PackagesSection";
import ContactSection from "@/features/home/components/sections/ContactSection";
import TestimonialsSection from "@/features/home/components/sections/TestimonialsSection";
import FAQSection from "@/features/home/components/sections/FAQSection";
import BlogSection from "@/features/home/components/sections/BlogSection";
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
import { City, Sanatorium, SanatoriumListType } from "@/lib/types/sanatorium.type";
import { BlogPost } from "@/lib/types/blog.type";
import { PackageType } from "@/lib/types/package.type";

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
  blogs: BlogPost[];
  contactSection: ContactSectionType;
  sanatoriums: Sanatorium[];
  allSanatoriums: SanatoriumListType[];
  locations: City [];
  packages: PackageType [];
}

export default function HomePage({
  heroSliders,
  aboutSection,
  sanatoriumsSection,
  packagesSection,
  testimonials,
  testimonialSection,
  faqSection,
  faqs,
  blogSection,
  blogs,
  contactSection,
  sanatoriums,
  allSanatoriums,
  locations,
  packages
}: Props) {
  return (
    <>
      {/* Hero Section with Slider */}
      <HeroSlider heroSliders={heroSliders} />

      {/* Search Form */}
      <div className="container mx-auto relative">
        <SearchForm locations={locations} sanatoriums={allSanatoriums} />
      </div>

      {/* About Section */}
      <AboutSection aboutSection={aboutSection} />

      {/* Sanatoriums Section */}
      <SanatoriumsSection sanatoriums={sanatoriums} sanatoriumsSection={sanatoriumsSection} />

      {/* Packages Section */}
      <PackagesSection packages={packages} packagesSection={packagesSection} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonialSection={testimonialSection} testimonials={testimonials} />

      {/* FAQ Section */}
      <FAQSection faqSection={faqSection} faqs={faqs} />

      {/* Blog Section (replaces Treatment Types Section) */}
      <BlogSection blogs={blogs} blogSection={blogSection} />

      {/* Contact Section */}
      <ContactSection contactSection={contactSection} />
    </>
  );
}
