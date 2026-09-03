'use client';

import { useRef, useState, useEffect } from 'react';
import { Testimonial, TestimonialCarouselProps } from '../types/testimonial';

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        scrollToNext();
      }
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const scrollToNext = () => {
    setIsAnimating(true);
    const nextIndex = (activeIndex + 1) % testimonials.length;
    setActiveIndex(nextIndex);
    setTimeout(() => setIsAnimating(false), 500); // Animation duration
  };

  const scrollToPrev = () => {
    setIsAnimating(true);
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    setActiveIndex(prevIndex);
    setTimeout(() => setIsAnimating(false), 500); // Animation duration
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-4 sm:py-6 md:py-8">
      {/* Testimonials carousel */}
      <div 
        ref={carouselRef} 
        className="overflow-hidden"
      >
        <div 
          className="transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="w-full flex-shrink-0 px-4 py-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6 border border-batter-cream">
                <div className="mb-4">
                  <svg className="h-8 w-8 text-batter-gold mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-batter-brown/80 italic mb-4">{testimonial.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full ${
              index === activeIndex ? 'bg-batter-gold' : 'bg-batter-cream'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile navigation buttons - visible only on smallest screens */}
    </div>
  );
}

// Dummy testimonials data
export const dummyTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Pesarattu tasted amazing, Just loved it 👍🏻"
  },
  {
    id: "2",
    quote: "Hey it came out really nice. I really liked idly dosa batter. The quality is top notch 😍"
  },
  {
    id: "3",
    quote: "Finally tried the dosa today. They turned out really good and crispy."
  },
  {
    id: "4",
    quote: "We tried the adai batter. It's one of my favorite dishes back in India. I just enjoyed it!"
  }
];
