export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  image_url: string;
  created_at: string;
  owner_id: string;
  amenities: string[];
}

export interface Filters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  amenities?: string[];
}