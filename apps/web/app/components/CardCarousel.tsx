'use client';

import { useRef, useState } from "react";
import { CatalogItem } from "../types/catalog";
import Card from "./Card";

interface CardCarouselProps {
  items: CatalogItem[];
}

export default function CardCarousel({ items }: CardCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const maxScroll = carouselRef.current
    ? carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    : 0;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-4 sm:py-6 md:py-8">
      {/* Navigation buttons - hidden on smallest screens, visible on sm and up */}
      <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={scrollLeft}
          disabled={scrollPosition <= 0}
          className={`p-1.5 sm:p-2 rounded-full bg-white border border-batter-cream shadow-md hover:bg-batter-light/50 focus:outline-none ${
            scrollPosition <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-batter-brown"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={scrollRight}
          disabled={scrollPosition >= maxScroll}
          className={`p-1.5 sm:p-2 rounded-full bg-white border border-batter-cream shadow-md hover:bg-batter-light/50 focus:outline-none ${
            scrollPosition >= maxScroll ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-batter-brown"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Carousel - touch-friendly for mobile */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto pb-4 sm:pb-6 snap-x snap-mandatory scrollbar-hide -mx-2 sm:mx-0"
      >
        <div className="flex space-x-2 sm:space-x-3 md:space-x-4 px-2 sm:px-3 md:px-4">
          {items.map((item) => (
            <div key={item.id} className="snap-start">
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-3 sm:mt-4 flex justify-center">
        <div className="h-1 bg-batter-cream rounded-full w-32 sm:w-40 md:w-48">
          <div
            className="h-1 bg-batter-gold rounded-full"
            style={{
              width: `${
                maxScroll > 0
                  ? Math.min(100, (scrollPosition / maxScroll) * 100)
                  : 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Mobile navigation buttons - visible only on smallest screens */}
      <div className="sm:hidden flex justify-center mt-3 space-x-4">
        <button
          onClick={scrollLeft}
          disabled={scrollPosition <= 0}
          className={`p-2 rounded-full bg-white border border-batter-cream shadow-md hover:bg-batter-light/50 focus:outline-none ${
            scrollPosition <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-batter-brown"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={scrollRight}
          disabled={scrollPosition >= maxScroll}
          className={`p-2 rounded-full bg-white border border-batter-cream shadow-md hover:bg-batter-light/50 focus:outline-none ${
            scrollPosition >= maxScroll ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-batter-brown"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
