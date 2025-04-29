"use client";

import HeroSlider from "@/features/home/components/HeroSlider";
import SearchForm from "@/features/home/components/SearchForm";
import AboutSection from "@/features/home/components/AboutSection";
import SanatoriumsSection from "@/features/home/components/SanatoriumsSection";
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
import { City, Sanatorium } from "@/lib/types/sanatorium.type";
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
  locations,
  packages
}: Props) {
  return (
    <>
      {/* Hero Section with Slider */}
      <HeroSlider heroSliders={heroSliders} />

      {/* Search Form */}
      <div className="container mx-auto relative">
        <SearchForm locations={locations} />
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
