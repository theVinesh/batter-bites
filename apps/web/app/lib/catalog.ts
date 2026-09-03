import { CatalogItem, CatalogResponse } from '../types/catalog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pricelist.batterbites.workers.dev';

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

// Ingredient data for different products
export const getProductIngredients = (productId: string): string[] => {
  const ingredientMap: Record<string, string[]> = {
    'p001': [
      'Organic White Rice',
      'Black Urid Dal (Split Black Gram)',
      'Fenugreek Seeds',
      'Rock Salt',
      'Filtered Water'
    ],
    'p002': [
      'Organic White Rice',
      'Black Urid Dal (Split Black Gram)',
      'Poha (Flattened Rice)',
      'Fenugreek Seeds',
      'Rock Salt',
      'Filtered Water'
    ],
    'p003': [
      'Finger Millet (Ragi)',
      'Pearl Millet (Bajra)',
      'Black Urid Dal (Split Black Gram)',
      'Fenugreek Seeds',
      'Rock Salt',
      'Filtered Water'
    ],
    'p004': [
      'Green Moong Dal (Whole Green Gram)',
      'Organic White Rice',
      'Ginger',
      'Green Chilies',
      'Cumin Seeds',
      'Rock Salt',
      'Filtered Water'
    ],
    'p005': [
      'Channa Dal (Bengal Gram)',
      'Toor Dal (Pigeon Pea)',
      'Organic White Rice',
      'Black Urid Dal',
      'Fenugreek Seeds',
      'Rock Salt',
      'Filtered Water'
    ],
    'p006': [
      'Organic White Rice',
      'Black Urid Dal (Split Black Gram)',
      'Fenugreek Seeds',
      'Ginger',
      'Green Chilies',
      'Rock Salt',
      'Filtered Water'
    ],
    'p007': [
      'All-Purpose Flour',
      'Organic Eggs',
      'Whole Milk',
      'Organic Sugar',
      'Baking Powder',
      'Vanilla Extract',
      'Butter',
      'Salt'
    ]
  };

  return ingredientMap[productId] || [
    'Premium Quality Ingredients',
    'Organic Rice',
    'Fresh Lentils',
    'Natural Spices',
    'Filtered Water'
  ];
};
