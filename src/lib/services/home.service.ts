import { BlogPost } from "../types/blog.type";
import {
  HeroSlider,
  AboutSection,
  SanatoriumSection,
  TreatmentSection,
  PackageSection,
  TestimonialsSection,
  Testimonial,
  FAQ,
  FAQSection,
  BlogSection,
  ContactSection,
} from "../types/home.type";
import { PackageType } from "../types/package.type";
import { Sanatorium } from "../types/sanatorium.type";
import api, { SupportedLocale } from "../utils/apiClient";

const DEFAULT_OPTIONS = { revalidate: 1000 };

export const getHeroSlider = (locale: SupportedLocale) =>
  api.get<HeroSlider[]>("/home/hero-slider/", { ...DEFAULT_OPTIONS, locale: locale });

export const getAboutSection = (locale: SupportedLocale) =>
  api.get<AboutSection>("/home/about-section/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getSanatoriumsSection = (locale: SupportedLocale) =>
  api.get<SanatoriumSection>("/home/sanatories-section/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getTreatmentsSection = (locale: SupportedLocale) =>
  api.get<TreatmentSection>("/home/treatments-section/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getPackagesSection = (locale: SupportedLocale) =>
  api.get<PackageSection>("/home/packages-section/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getTestimonialsSection = (locale: SupportedLocale) =>
  api.get<TestimonialsSection>("/home/customer-comments-section/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getTestimonials = (locale: SupportedLocale) =>
  api.get<Testimonial[]>("/home/customer-comments/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getFAQs = (locale: SupportedLocale) =>
  api.get<FAQ[]>("/home/faq/", { ...DEFAULT_OPTIONS, locale: locale });

export const getFAQsSection = (locale: SupportedLocale) =>
  api.get<FAQSection>("/home/faq-section/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getBlogSection = (locale: SupportedLocale) =>
  api.get<BlogSection>("/home/blog-section/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getBlogs = (locale: SupportedLocale) =>
  api.get<BlogPost[]>("/home/blogs/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });

export const getContactSection = (locale: SupportedLocale) =>
  api.get<ContactSection>("/home/contact-section/", {
    ...DEFAULT_OPTIONS,
    locale: locale,
  });


export const getSanatoriums = async (locale: SupportedLocale) => {
    const response = await api.get<Sanatorium []>("/home/sanatoriums/", { locale: locale });
    return response;
};
  

export const getPackages = async (locale: SupportedLocale) => {
  const response = await api.get<PackageType []>("/home/packages/", { locale: locale });
  return response;
};