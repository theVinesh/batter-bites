'use client';

interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

export default function ErrorState({ error, reset }: ErrorStateProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[300px]">
      <div className="bg-white border-2 border-batter-copper rounded-lg p-6 text-center max-w-md shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-4 text-batter-copper"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-batter-brown mb-2">
          Error Loading Data
        </h3>
        <p className="text-batter-brown/80 mb-4">
          {error.message || "Something went wrong while fetching the data."}
        </p>
        <button
          onClick={reset}
          className="bg-batter-gold text-white hover:bg-batter-copper px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
