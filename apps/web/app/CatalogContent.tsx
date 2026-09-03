'use client';
import { useEffect, useState } from 'react';
import CardCarousel from './components/CardCarousel';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { CatalogResponse } from './types/catalog';

export default function CatalogContent() {
  const [data, setData] = useState<CatalogResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://pricelist.batterbites.workers.dev';
        const response = await fetch(`${apiBase}/catalog`, { next: { revalidate: 3600 } });
        if (!response.ok) {
          throw new Error(`Failed to fetch catalog data: ${response.status}`);
        }
        const result = await response.json();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} reset={() => window.location.reload()} />;
  if (!data) return null;

  return (
    <section id="menu" className="py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="mb-6 sm:mb-7 md:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-batter-brown mb-2">Our Menu</h2>
        <div className="h-0.5 w-12 sm:w-14 md:w-16 bg-batter-gold mx-auto"></div>
      </div>
      <CardCarousel items={data.items} />
    </section>
  );
}
