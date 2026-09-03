'use client';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationBarProps {
  className?: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'menu', label: 'Menu', href: '#menu' },
  { id: 'testimonials', label: 'Reviews', href: '#testimonials' },
];

export default function NavigationBar({ className = '' }: NavigationBarProps) {

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      const navHeight = 80; // Approximate navigation height

      window.scrollTo({
        top: Math.max(0, offsetTop - navHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop Navigation - Fixed Top */}
      <nav
        className={`
          hidden md:flex fixed top-0 left-0 right-0 z-50
          bg-white/95 backdrop-blur-sm border-b border-batter-cream
          ${className}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavClick('#home')}
                className="text-xl font-bold text-batter-brown hover:text-batter-gold transition-colors duration-200"
                aria-label="Go to home section"
              >
                Batter Bites
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className="text-batter-brown hover:text-batter-gold transition-colors duration-200 font-medium"
                  aria-label={`Go to ${item.label.toLowerCase()} section`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Fixed Bottom */}
      <nav
        className={`
          md:hidden fixed bottom-0 left-0 right-0 z-50
          bg-white/95 backdrop-blur-sm border-t border-batter-cream
          ${className}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-around">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className="flex flex-col items-center space-y-1 text-batter-brown hover:text-batter-gold transition-colors duration-200"
                aria-label={`Go to ${item.label.toLowerCase()} section`}
              >
                {/* Icon based on navigation item */}
                <div className="w-6 h-6 flex items-center justify-center">
                  {item.id === 'home' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  )}
                  {item.id === 'menu' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                  )}
                  {item.id === 'testimonials' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="hidden md:block h-16" aria-hidden="true" />
      <div className="md:hidden h-20" aria-hidden="true" />
    </>
  );
}
