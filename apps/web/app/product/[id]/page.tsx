import { getProductIngredients } from '../../lib/catalog';
import ProductPageClient from './ProductPageClient';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Known product IDs from the API catalog for static export
const PRODUCT_IDS = ['p001', 'p002', 'p003', 'p004', 'p005', 'p006', 'p007'];

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return PRODUCT_IDS.map((id) => ({ id }));
}

// Generate metadata for SEO (falls back gracefully if API is unavailable at build time)
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  return {
    title: 'Product - Batter Bites',
    description: 'Fresh home-made batter delivered to your door.',
  };
}

// Server component: prerenders static shell, client component handles data fetching
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const ingredients = getProductIngredients(id);
  return <ProductPageClient id={id} initialIngredients={ingredients} />;
}
