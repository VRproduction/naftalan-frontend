export interface BookingRequestData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  sanatorium: number;
  room_type: number;
  season: number;
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children: number;
  special_requests: string | null;
  with_treatment: boolean;
  treatment_option: number | null;
  currency: number;
  price?: string;
  discounted_price?: string;
  discount_type?: "percent" | "amount" | null;
  discount_value?: string;
  total_discounted_price?: string;
  total_price: string;
  guests: {
    first_name: string;
    last_name: string;
    gender: 'male' | 'female' | null;
    date_of_birth: string | null;
    age_category: "adult" | "child";
    is_main_guest: boolean;
  }[];
  extra_beds: {
    extra_bed_price: number;
    quantity: number;
    for_adult: boolean;
    with_treatment: boolean;
    treatment_option: number | null;
    price_per_night: string;
  }[];
}
