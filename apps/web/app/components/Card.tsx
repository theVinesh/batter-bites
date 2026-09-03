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
  // Create a colored background instead of using external images
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

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-batter-cream flex-shrink-0 w-56 sm:w-64 md:w-72 mx-1 sm:mx-2 my-2 sm:my-3 md:my-4 cursor-pointer hover:scale-105 transition-transform"
    >
      <div className={`relative h-36 sm:h-40 md:h-48 w-full flex items-center justify-center ${bgColors[colorIndex]}`}>
        <span className={`text-xl sm:text-2xl font-bold px-3 sm:px-4 text-center ${textColors[colorIndex]}`}>
          {item.name}
        </span>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-base sm:text-lg font-semibold text-batter-brown mb-1 line-clamp-1">{item.name}</h3>
        </div>
        <p className="text-batter-brown/80 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-base sm:text-lg font-bold text-batter-copper">€{item.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
