export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating?: number;
  comment?: string;
  date?: string;
  reviewerName?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating?: number;
  stock?: number;
  category?: string;
  tags?: string[];
  brand?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  thumbnail?: string;
  images?: string[];
  dimensions?: Dimensions;
}
