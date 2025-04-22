export interface About {
  banner_image: string;
  banner_title: string;
  banner_description: string;
  content: string;
  reservation_image: string;
  reservation_title: string;
  reservation_description: string;
}

export interface AboutHistory {
  hero_section_title: string;
  hero_section_content: string;
  hero_section_image: string;
  introduction_title: string;
  introduction_content: string;
  timeline_section_title: string;
  timeline_section_description: string;
  scientific_section_title: string;
  scientific_section_content: string;
  scientific_section_image: string;
  soviet_section_title: string;
  soviet_section_content: string;
  soviet_section_image: string;
  modern_section_title: string;
  modern_section_description: string;
  timeline_punkts: {
    year: string;
    title: string;
    description: string;
  }[];
  modern_punkts: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface TreatmentsPage {
  hero_title: string;
  hero_description: string;
  main_title: string;
  main_content: string;
  main_image: string;
  category_section_title: string;
  category_section_description: string;
  process_section_title: string;
  process_section_description: string;
  contact_section_title: string;
  contact_section_description: string;
}

export interface Treatment {
  title: string;
  content: string;
  image: string;
  category: {
    title: string;
    id: number;
  };
  benefits: {
    title: string;
    priority: number;
  }[];
}

export interface TreatmentCategory {
  id: number;
  title: string;
 
}

export interface TreantmentProcess {
  title: string;
  content: string;
  priority: number;
}
