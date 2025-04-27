export interface Sanatorium {
  id: number;
  name: string;
  slug: string;
  location: {
    id: number;
    region: string;
    country: string;
  };
  location_type: "naftalan" | "other_cities";
  short_description: string;
  rating: string;
  min_price: number | null;
  min_price_currency: {
    id: number;
    code: string;
    name: string;
    symbol: string;
  } | null;
  is_active: boolean;
  in_home: boolean;
  main_image: {
    id: number;
    image: string;
    is_main: boolean;
    priority: number;
  };
  facilities: {
    id: number;
    facility: {
      id: number;
      name: string;
      icon: string | null;
    };
  }[];
  images: {
    id: number;
    image: string;
    is_main: boolean;
    priority: number;
  }[];
}

export interface SanatoriumDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  treatments: string;
  location: {
    id: number;
    region: string;
    country: string;
  };
  min_price: number | null;
  min_price_currency: {
    id: number;
    code: string;
    name: string;
    symbol: string;
  } | null;
  location_type: "naftalan" | "other_cities" | null;
  map_iframe: string;
  address: string;
  rating: string;
  facilities: {
    id: number;
    facility: {
      id: number;
      name: string;
      icon: string | null;
    };
  }[];
  room_types: {
    id: number;
    name: string;
    description: string | null;
    min_capacity: number | null;
    max_capacity: number | null;
    max_extra_beds: number | null;
    size: number | null;
    images: {
      id: number;
      image: string;
      priority: number;
    }[];
    prices: {
      id: number;
      season: {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
        is_current: boolean;
      } | null;
      occupancy: number;
      with_treatment: boolean;
      treatment_option?: {
        id: number;
        name: string;
        description: string;
      };
      price: string;
      currency: {
        id: number;
        code: string;
        name: string;
        symbol: string;
      };
    }[];
    extra_bed_prices: {
      id: number;
      season: {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
        is_current: boolean;
      } | null;
      age_group: {
        id: number;
        name: string;
        min_age: number;
        max_age: number;
      };
      with_treatment: boolean;
      treatment_option?: {
        id: number;
        name: string;
        description: string;
      };
      price: string;
      currency: {
        id: number;
        code: string;
        name: string;
        symbol: string;
      };
    }[];
  }[];
  reviews: {
    id: number;
    full_name: string;
    sanatorium: number;
    rating: number;
    content: string;
    date: string;
  }[];
  in_home: boolean;
  created_at: string;
  updated_at: string;
  images: {
    id: number;
    image: string;
    is_main: boolean;
    priority: number;
  }[];
  similar_sanatoriums: Sanatorium[];
  seo: {
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    og_title: string | null;
    og_description: string | null;
    og_image: string | null;
    canonical_url: string | null;
    no_index: boolean;
    no_follow: boolean;
  };
}

export interface NaftalanSanatoriumsPage {
  id: number;
  hero_section_title: string;
  hero_section_description: string;
  main_section_title: string;
  main_section_description: string;
  main_section_image: string;
  sanatoriums_section_title: string;
  sanatoriums_section_description: string;
  contact_section_title: string;
  contact_section_description: string;
}

export interface OtherCitiesSanatoriumsPage {
  id: number;
  hero_section_title: string;
  hero_section_description: string;
  main_section_title: string;
  main_section_description: string;
  main_section_image: string;
  sanatoriums_section_title: string;
  sanatoriums_section_description: string;
  contact_section_title: string;
  contact_section_description: string;
}
