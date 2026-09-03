'use client';

import { useRouter } from 'next/navigation';
import { CatalogItem } from "../types/catalog";

interface CardProps {
  item: CatalogItem;
}

export default function Card({ item }: CardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${item.id}`);
  };

  const colorIndex = item.name.length % 5;
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

  const priceLabel = item.variants && item.variants.length > 0
    ? `From €${item.variants[0].price.toFixed(2)}`
    : `€${item.price.toFixed(2)}${item.unit ? ` / ${item.unit}` : ''}`;

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-batter-cream flex-shrink-0 w-60 sm:w-64 md:w-72 mx-1 sm:mx-2 my-2 sm:my-3 md:my-4 cursor-pointer hover:scale-105"
    >
      <div className={`relative h-36 sm:h-40 md:h-48 w-full flex flex-col items-center justify-center p-3 ${bgColors[colorIndex]}`}>
        <span className={`text-lg sm:text-xl md:text-2xl font-bold px-2 text-center ${textColors[colorIndex]}`}>
          {item.name}
        </span>
        {item.minOrder && (
          <span className="mt-2 text-xs bg-white/90 text-batter-brown font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
            Min order: {item.minOrder}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-base sm:text-lg font-semibold text-batter-brown mb-1 line-clamp-1">{item.name}</h3>
        </div>
        <p className="text-batter-brown/80 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{item.description}</p>

        {item.ingredients && item.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.ingredients.slice(0, 3).map((ing, idx) => (
              <span key={idx} className="text-[10px] bg-batter-cream/60 text-batter-brown px-1.5 py-0.5 rounded">
                {ing}
              </span>
            ))}
            {item.ingredients.length > 3 && (
              <span className="text-[10px] text-batter-brown/60 px-1 py-0.5">
                +{item.ingredients.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-1 border-t border-batter-cream/50">
          <span className="text-base sm:text-lg font-bold text-batter-copper">{priceLabel}</span>
          <span className="text-xs text-batter-gold hover:underline font-medium">View details &rarr;</span>
        </div>
      </div>
    </div>
  );
}
