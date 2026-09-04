import { CatalogItem, CatalogResponse } from '../types/catalog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.batterbites.ie';

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

// Fallback ingredients if not returned by API
export const getProductIngredients = (productId: string, item?: CatalogItem): string[] => {
  if (item?.ingredients && item.ingredients.length > 0) {
    return item.ingredients;
  }

  const ingredientMap: Record<string, string[]> = {
    'p001': [
      'Rice',
      'Urad Dal (Split Black Gram)',
      'Fenugreek Seeds',
      'Salt',
      'Water'
    ],
    'p002': [
      'Rice',
      'Urad Dal (Split Black Gram)',
      'Poha (Flattened Rice)',
      'Fenugreek Seeds',
      'Salt',
      'Water'
    ],
    'p003': [
      'Toor Dal',
      'Chana Dal',
      'Urad Dal',
      'Rice'
    ],
    'p004': [
      'Whole Green Moong Dal',
      'Ginger',
      'Green Chilies',
      'Cumin'
    ],
    'p005': [
      'Pearl Millet (Bajra)',
      'Sorghum (Jowar)',
      'Foxtail Millet',
      'Urad Dal'
    ],
    'p006': [
      'Banana Puree',
      'Flour',
      'Milk',
      'Organic Sugar',
      'Baking Powder',
      'Butter',
      'Salt'
    ],
    'p007': [
      'Rice',
      'Urad Dal',
      'Fenugreek Seeds',
      'Salt',
      'Water'
    ],
    'p008': [
      'Roasted Chana Dal',
      'Urad Dal',
      'Dry Red Chilies',
      'Curry Leaves',
      'Sesame Seeds',
      'Asafoetida (Hing)',
      'Salt'
    ]
  };

  return ingredientMap[productId] || [
    'Fresh Lentils',
    'Natural Grains',
    'Pure Spices',
    'Salt',
    'Filtered Water'
  ];
};
