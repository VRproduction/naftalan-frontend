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
  rating: string | number;
  min_price: number | null;
  min_price_currency: {
    id: number;
    code: string;
    name: string;
    symbol: string;
  } | null;
  total_price: number | null;
  total_discount_price: number | null;
  min_price_details: {
    sanatorium: {
      id: number;
      name: string;
      location: string;
    };
    room: {
      id: number;
      name: string;
      min_capacity: number | null;
      max_capacity: number | null;
      max_extra_beds: number | null;
      size: number | null;
    };
    pricing: {
      base_price: number;
      total_base_price: number;
      currency: string;
      with_treatment: boolean;
      treatment_option: string | null;
      occupancy: number;
      discount: {
        type: string;
        value: number;
        amount: number;
        discounted_price: number;
        room_discount_amount: number;
        room_discounted_price: number;
      };
    };
    season: {
      name: string;
      is_current: boolean;
      start_date: string;
      end_date: string;
    };
    search_criteria: {
      occupancy: number | null;
      children_ages: number[];
      total_guests: number | null;
    };
    result: {
      base_price: number;
      discounted_price: number;
      discount_amount: number;
      pricing_method: string;
    };
  } | null;
  is_active: boolean;
  in_home: boolean;
  main_image: {
    id: number;
    image: string;
    is_main: boolean;
    priority: number;
  } | null;
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

export interface SanatoriumListType {
  id: number;
  name: string;
  location: number;
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
  price_info: {
    min_price: number;
    min_price_currency: {
      id: number;
      code: string;
      name: string;
      symbol: string;
    };
    total_price: number;
    total_discount_price: number;
    nights: number;
    occupancy: number;
    extra_bed_count: number;
    discount: {
      discount_type: "percentage" | "amount";
      discount_value: number;
      discount_amount: number;
      min_discount_price: number;
    } | null;
  };
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
      price: number;
      currency: {
        id: number;
        code: string;
        name: string;
        symbol: string;
      };
      discount_type?: "percentage" | "fixed";
      discount_value?: number;
      discounted_price?: number;
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
      price: number;
      currency: {
        id: number;
        code: string;
        name: string;
        symbol: string;
      };
      discount_type?: "percentage" | "fixed";
      discount_value?: number;
      discounted_price?: number;
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

  matched_room_types: MathedRoom[];
}

export interface MathedRoom {
  room_type: {
    id: number;
    name: string;
    description: string;
    min_capacity: number;
    max_capacity: number;
    max_extra_beds: number;
    size: number;
    images: {
      id: number;
      image: string;
      priority: number;
    }[];
  };
  currency: {
    id: number;
    code: string;
    name: string;
    symbol: string;
  };
  season: number;
  extra_bed_total: number;
  extra_bed_details: {
    child_age: number;
    price_added: number;
    currency: {
      id: number;
      code: string;
      name: string;
      symbol: string;
    };
  }[];
  price: number;
  nights: number;
  total_price: number;
  total_discounted_price: number;
  discount: {
    discount_type: "percentage" | "fixed";
    discount_value: number;
    discount_amount: number;
    discounted_price: number;
  } | null;
  occupancy: number;
  extra_bed_count: number;
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

export interface City {
  id: number;
  region: string;
  country: string;
}
