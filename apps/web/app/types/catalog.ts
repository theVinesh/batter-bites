export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface CatalogResponse {
  items: CatalogItem[];
}
