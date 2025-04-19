'use client'

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

export default function HomePage() {
  return (
    <div className="pt-[72px] md:pt-[80px]">
      {/* Hero Section with Slider */}
      <HeroSlider />
      
      {/* Search Form */}
      <div className="container mx-auto relative">
        <SearchForm />
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Sanatoriums Section */}
      <SanatoriumsSection />
      
      {/* Treatment Types Section */}
      <TreatmentTypesSection />
      
      {/* Packages Section */}
      <PackagesSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
