import { CatalogItem, CatalogResponse } from '../types/catalog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://batterbites.vineshraju.workers.dev';

export async function getCatalogData(): Promise<CatalogResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/catalog`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch catalog data: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<CatalogItem> {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    const errorText = await response.text();

    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error(`Failed to fetch product data: ${response.status} - ${errorText}`);
  }

  return response.json();
}
