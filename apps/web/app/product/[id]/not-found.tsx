import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-batter-light/30 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-batter-cream rounded-full flex items-center justify-center mb-4">
              <svg 
                className="h-12 w-12 text-batter-brown" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-batter-brown mb-2">404</h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-batter-brown mb-4">
              Product Not Found
            </h2>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <p className="text-batter-brown/80 text-base sm:text-lg mb-4">
              Oops! The product you're looking for doesn't exist or may have been removed from our menu.
            </p>
            <p className="text-batter-brown/60 text-sm sm:text-base">
              Don't worry, we have plenty of other delicious batters waiting for you!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#menu"
              className="inline-flex items-center justify-center px-6 py-3 bg-batter-gold text-white font-semibold rounded-lg hover:bg-batter-copper transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg 
                className="h-5 w-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" 
                />
              </svg>
              Browse Our Menu
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-batter-brown font-semibold rounded-lg border-2 border-batter-cream hover:bg-batter-light/50 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg 
                className="h-5 w-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
