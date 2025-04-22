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
  price: string;
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
      icon: string;
    };
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
  location_type: "naftalan" | "other_cities";
  price: string;
  rating: string;
  facilities: {
    id: number;
    facility: {
      id: number;
      name: string;
      icon: string;
    };
  }[];
  room_types: {
    id: number;
    name: string;
    images: {
      id: number;
      image: string;
      priority: number;
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
}
