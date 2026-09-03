export interface ProductVariant {
  weight: string;
  price: number;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  unit?: string;
  minOrder?: string;
  ingredients?: string[];
  variants?: ProductVariant[];
  imageUrl?: string;
}

export interface CatalogFees {
  delivery: number;
  cancellation: number;
  currency: string;
}

export interface CatalogPolicies {
  minBatterOrder: string;
}

export interface CatalogResponse {
  items: CatalogItem[];
  fees?: CatalogFees;
  policies?: CatalogPolicies;
}
