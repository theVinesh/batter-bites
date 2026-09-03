import Image from 'next/image';
import CatalogContent from './CatalogContent';
import TestimonialCarousel, { dummyTestimonials } from './components/TestimonialCarousel';
import NavigationBar from './components/NavigationBar';
import WhatsAppCTA from './components/WhatsAppCTA';
import LoadingState from './components/LoadingState';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-3 sm:p-4 md:p-8 bg-gradient-to-b from-batter-light to-white">
      <NavigationBar />
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <section id="home" className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
            <Image
              src="/logos/batter-bites-logo.png"
              alt="Batter Bites Logo"
              width={150}
              height={150}
              priority
              className="h-auto w-24 sm:w-32 md:w-36 lg:w-40"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-batter-brown">Batter Bites</h1>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-batter-gold mx-auto mb-4 sm:mb-5 md:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-batter-brown/80 mb-6 sm:mb-7 md:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-2 sm:px-0">
            Experience the <b>taste of home</b> with our selection of fresh, home-made batters.
            All made with the freshest ingredients <b>from our kitchen to yours</b>.
          </p>
        </section>

        <WhatsAppCTA />
        <CatalogContent />

        <section id="testimonials" className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="mb-6 sm:mb-7 md:mb-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-batter-brown mb-2">What Our Customers Say</h2>
            <div className="h-0.5 w-12 sm:w-14 md:w-16 bg-batter-gold mx-auto"></div>
          </div>
          <TestimonialCarousel testimonials={dummyTestimonials} />
        </section>
      </div>
    </main>
  );
}
