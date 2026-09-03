export interface Testimonial {
  id: string;
  quote: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}
