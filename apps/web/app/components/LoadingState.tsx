'use client';

export default function LoadingState() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex overflow-x-auto pb-6">
        <div className="flex space-x-4 px-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-batter-cream flex-shrink-0 w-64 md:w-72 mx-2 my-4"
            >
              <div className="h-48 w-full flex items-center justify-center bg-batter-cream animate-pulse">
                <div className="h-8 w-3/4 rounded bg-batter-brown/20"></div>
              </div>
              <div className="p-4">
                <div className="h-5 rounded w-3/4 mb-2 bg-batter-cream animate-pulse"></div>
                <div className="h-4 rounded w-1/2 mb-2 bg-batter-light animate-pulse"></div>
                <div className="h-4 rounded w-full mb-3 bg-batter-light animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 rounded w-1/4 bg-batter-cream animate-pulse"></div>
                  <div className="h-8 rounded w-1/4 bg-batter-gold animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
