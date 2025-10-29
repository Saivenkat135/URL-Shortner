import React from 'react';

export default function Header() {
  function handleContact(){
    window.location.href = '/contact';
  }
  function handleAbout(){
    window.location.href = '/about';
  }
  function handleHome(){
    window.location.href = '/';
  }

  function handleStart(){
    window.location.href='/hero';
  }

  return (
    <header className="fixed top-0 w-full bg-gradient-to-b from-slate-950/95 to-slate-900/90 backdrop-blur-md border-b border-cyan-500/30 z-50 shadow-lg shadow-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0 group cursor-pointer" onClick={handleHome}>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center shadow-cyan-500/50 group-hover:shadow-cyan-500/70 transition-all duration-300 transform group-hover:scale-110 overflow-hidden">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
            </div>
            <span className="hidden sm:inline text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SaiVenkat
            </span>
          </div>
        </div>



          {/* Navigation - Always visible, stacked on small screens */}
          <nav className="flex items-center flex-1 justify-center">
            <ul className="flex items-center gap-1 sm:gap-2">
              <li>
                <button 
                  onClick={handleHome}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 text-slate-300 hover:text-cyan-400 font-medium text-xs sm:text-sm transition-all duration-300 relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAbout}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 text-slate-300 hover:text-cyan-400 font-medium text-xs sm:text-sm transition-all duration-300 relative group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleContact}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 text-slate-300 hover:text-cyan-400 font-medium text-xs sm:text-sm transition-all duration-300 relative group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button 
              onClick={handleContact}
              className="hidden lg:block px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300"
            >
              Contact Us
            </button>
            <button 
              onClick={handleStart}
              className="px-3 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 flex items-center gap-1 sm:gap-2"
            >
              <span>Get Started</span>
              <span className="text-base sm:text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}