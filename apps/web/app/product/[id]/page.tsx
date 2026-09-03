import { notFound } from 'next/navigation';
import { getProductById, getProductIngredients } from '../../lib/catalog';
import { CatalogItem } from '../../types/catalog';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product: CatalogItem;

  try {
    product = await getProductById(id);
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }

  const ingredients = getProductIngredients(id);

  // Create a colored background consistent with the Card component
  const colorIndex = product.name.length % 5;
  const bgColors = [
    'bg-batter-cream',
    'bg-batter-light',
    'bg-batter-gold',
    'bg-batter-copper',
    'bg-batter-brown'
  ];
  const textColors = [
    'text-batter-brown',
    'text-batter-brown',
    'text-white',
    'text-white',
    'text-white'
  ];

  return (
    <div className="min-h-screen bg-batter-light/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Product Image/Visual */}
          <div className={`relative h-64 sm:h-80 md:h-96 w-full flex items-center justify-center ${bgColors[colorIndex]}`}>
            <span className={`text-3xl sm:text-4xl md:text-5xl font-bold px-6 text-center ${textColors[colorIndex]}`}>
              {product.name}
            </span>
          </div>
          
          {/* Product Info */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-batter-brown mb-2">
                  {product.name}
                </h1>
                <p className="text-batter-brown/80 text-base sm:text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-3xl sm:text-4xl font-bold text-batter-copper">
                  €{product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-batter-brown mb-4 flex items-center">
            <svg 
              className="h-6 w-6 mr-2 text-batter-gold" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Ingredients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ingredients.map((ingredient, index) => (
              <div 
                key={index}
                className="flex items-center p-3 bg-batter-light/20 rounded-lg border border-batter-cream"
              >
                <div className="h-2 w-2 bg-batter-gold rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-batter-brown/90 text-sm sm:text-base">
                  {ingredient}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-batter-brown mb-4 flex items-center">
            <svg 
              className="h-6 w-6 mr-2 text-batter-gold" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Product Information
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-batter-cream">
              <span className="font-medium text-batter-brown">Category:</span>
              <span className="text-batter-brown/80 capitalize">{product.category}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-batter-cream">
              <span className="font-medium text-batter-brown">Shelf Life:</span>
              <span className="text-batter-brown/80">3-4 days refrigerated</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-batter-cream">
              <span className="font-medium text-batter-brown">Storage:</span>
              <span className="text-batter-brown/80">Keep refrigerated</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2">
              <span className="font-medium text-batter-brown">Preparation:</span>
              <span className="text-batter-brown/80">Ready to cook</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    return {
      title: `${product.name} - Batter Bites`,
      description: product.description,
    };
  } catch {
    return {
      title: 'Product Not Found - Batter Bites',
      description: 'The requested product could not be found.',
    };
  }
}
