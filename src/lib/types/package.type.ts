export interface PackageType {
    id: number,
    name: string,
    slug: string,
    sanatorium: number,
    sanatorium_name: string,
    duration: number,
    discount_type: string,
    discount_type_display: string,
    discount_value: number,
    is_active: boolean,
    is_featured: boolean,
    original_price: number,
    discounted_price: string,
    currency: number,
    currency_code: string,
    currency_symbol: string,
    occupancy: number,
    inclusions: 
      {
        id: number,
        name: string,
        priority: number
      }[]
    ,
    created_at: string,
    updated_at: string
}