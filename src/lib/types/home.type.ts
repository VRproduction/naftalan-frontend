export interface HeroSlider {
  image: string;
}

export interface AboutSection {
  sub_title: string;
  title: string;
  section_description: string;
  image: string;
  content_title: string;
  punkts: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface SanatoriumSection {
  sub_title: string;
  title: string;
  section_description: string;
}

export interface TreatmentSection {
  title: string;
  section_description: string;
}

export interface PackageSection {
  title: string;
  section_description: string;
}

export interface TestimonialsSection {
  title: string;
  section_description: string;
}

export interface Testimonial {
  full_name: string;
  address: string;
  rating: number;
  comment: string;
  priority: number;
}

export interface FAQ {
  question: string;
  answer: string;
  priority: number;
}

export interface FAQSection {
  title: string;
  section_description: string;
}

export interface BlogSection {
  title: string;
  section_description: string;
}

export interface ContactSection {
  left_section_title: string;
  left_section_description: string;
  right_section_title: string;
  right_section_description: string;
}
  