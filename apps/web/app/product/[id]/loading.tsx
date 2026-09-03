export default function Loading() {
  return (
    <div className="min-h-screen bg-batter-light/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Product Header Skeleton */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-pulse">
          {/* Product Image/Visual Skeleton */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-batter-cream"></div>
          
          {/* Product Info Skeleton */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
              <div className="mb-4 sm:mb-0 flex-1">
                <div className="h-8 sm:h-10 bg-batter-cream rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-batter-cream rounded mb-2 w-full"></div>
                <div className="h-4 bg-batter-cream rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-batter-cream rounded w-2/3"></div>
              </div>
              <div className="flex-shrink-0">
                <div className="h-10 w-20 bg-batter-cream rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Section Skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8 animate-pulse">
          <div className="flex items-center mb-4">
            <div className="h-6 w-6 bg-batter-cream rounded-full mr-2"></div>
            <div className="h-6 w-32 bg-batter-cream rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="flex items-center p-3 bg-batter-light/20 rounded-lg border border-batter-cream"
              >
                <div className="h-2 w-2 bg-batter-cream rounded-full mr-3 flex-shrink-0"></div>
                <div className="h-4 bg-batter-cream rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 animate-pulse">
          <div className="flex items-center mb-4">
            <div className="h-6 w-6 bg-batter-cream rounded-full mr-2"></div>
            <div className="h-6 w-40 bg-batter-cream rounded"></div>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-batter-cream">
                <div className="h-4 w-24 bg-batter-cream rounded mb-1 sm:mb-0"></div>
                <div className="h-4 w-32 bg-batter-cream rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
