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
  total_price: string;
  currency: number;
  guests: {
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    age_category: string;
    is_main_guest: boolean;
  }[];
  extra_beds: {
    quantity: number;
    for_adult: boolean;
    with_treatment: boolean;
    treatment_option: number;
    price_per_night: string;
  }[];
}
