'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CatalogItem } from '../../types/catalog';

interface ProductPageClientProps {
  id: string;
  initialProduct?: CatalogItem | null;
  initialIngredients: string[];
}

export default function ProductPageClient({ id, initialProduct = null, initialIngredients }: ProductPageClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<CatalogItem | null>(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);

  useEffect(() => {
    if (product || loading === false) return;

    let cancelled = false;
    async function fetchProduct() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://api.batterbites.workers.dev';
        const response = await fetch(`${apiBase}/product/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Product not found');
            return;
          }
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load product');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    fetchProduct();
    return () => { cancelled = true; };
  }, [id, product, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-batter-light/30">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8 animate-pulse">
            <div className="relative h-64 sm:h-80 md:h-96 w-full bg-batter-cream"></div>
            <div className="p-6 sm:p-8">
              <div className="h-8 sm:h-10 bg-batter-cream rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-batter-cream rounded mb-2 w-full"></div>
              <div className="h-4 bg-batter-cream rounded mb-2 w-5/6"></div>
              <div className="h-4 bg-batter-cream rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-batter-light/30 flex items-center justify-center">
        <div className="bg-white border-2 border-batter-copper rounded-lg p-6 text-center shadow-md max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-batter-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold text-batter-brown mb-2">Error Loading Product</h3>
          <p className="text-batter-brown/80 mb-4">{error || 'The product could not be loaded.'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-batter-gold text-white hover:bg-batter-copper px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const ingredients = (product.ingredients && product.ingredients.length > 0)
    ? product.ingredients
    : initialIngredients;

  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  const currentPrice = hasVariants && product.variants
    ? product.variants[selectedVariantIndex].price
    : product.price;

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
        <button
          onClick={() => router.push('/')}
          className="mb-4 inline-flex items-center text-sm font-semibold text-batter-brown hover:text-batter-copper transition-colors"
        >
          &larr; Back to Menu
        </button>

        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className={`relative h-64 sm:h-80 md:h-96 w-full flex flex-col items-center justify-center p-6 ${bgColors[colorIndex]}`}>
            <span className={`text-3xl sm:text-4xl md:text-5xl font-bold px-6 text-center ${textColors[colorIndex]}`}>
              {product.name}
            </span>
            {product.minOrder && (
              <span className="mt-4 text-xs sm:text-sm bg-white/95 text-batter-brown font-semibold px-3 py-1 rounded-full shadow">
                Minimum order: {product.minOrder}
              </span>
            )}
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-batter-brown mb-2">
                  {product.name}
                </h1>
                <p className="text-batter-brown/80 text-base sm:text-lg leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Variants Selector (for Podi / multi-size items) */}
                {hasVariants && product.variants && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-batter-brown mb-2">
                      Select Size / Weight:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, idx) => (
                        <button
                          key={v.weight}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            selectedVariantIndex === idx
                              ? 'bg-batter-brown text-white shadow-md'
                              : 'bg-batter-cream/50 text-batter-brown hover:bg-batter-cream border border-batter-cream'
                          }`}
                        >
                          {v.weight} — €{v.price.toFixed(2)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end sm:items-end flex-shrink-0">
                <span className="text-3xl sm:text-4xl font-bold text-batter-copper">
                  €{currentPrice.toFixed(2)}
                </span>
                <span className="text-xs sm:text-sm text-batter-brown/70 font-medium">
                  {hasVariants && product.variants
                    ? `for ${product.variants[selectedVariantIndex].weight}`
                    : product.unit
                    ? `per ${product.unit}`
                    : ''}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-batter-cream/60 flex flex-wrap gap-4 items-center justify-between">
              <a
                href="https://chat.whatsapp.com/C2AIJysYM5SIE7OIhZCkm7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold text-base sm:text-lg px-6 py-2.5 rounded-full shadow transition-all duration-200"
              >
                Join WhatsApp Group
              </a>
              <span className="text-xs text-batter-brown/70">
                Delivery: €1.00 • Cancellation charge: €1.00
              </span>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        {ingredients && ingredients.length > 0 && (
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
                  <span className="text-batter-brown/90 text-sm sm:text-base font-medium">
                    {ingredient}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

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
            {product.minOrder && (
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-batter-cream">
                <span className="font-medium text-batter-brown">Minimum Order:</span>
                <span className="text-batter-brown/80 font-medium">{product.minOrder}</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-batter-cream">
              <span className="font-medium text-batter-brown">Shelf Life:</span>
              <span className="text-batter-brown/80">
                {product.category === 'Accompaniments' ? 'Up to 3 months (airtight container)' : '3-4 days refrigerated'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-batter-cream">
              <span className="font-medium text-batter-brown">Storage:</span>
              <span className="text-batter-brown/80">
                {product.category === 'Accompaniments' ? 'Store in a cool dry place' : 'Keep refrigerated'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2">
              <span className="font-medium text-batter-brown">Preparation:</span>
              <span className="text-batter-brown/80">
                {product.category === 'Accompaniments' ? 'Ready to serve with ghee or sesame oil' : 'Ready to cook'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
