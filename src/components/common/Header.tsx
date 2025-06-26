import React from 'react';

const Header: React.FC = () => (
  <header className="bg-purple-600 text-white p-4 shadow-md" role="banner">
    <div className="container mx-auto px-4">
      <h1 id="app-title" className="text-xl sm:text-2xl font-bold">Does My Girlfriend Love Me?</h1>
      <p id="app-desc" className="text-xs sm:text-sm opacity-80">Track relationship events and cycle data</p>
    </div>
  </header>
);

export default Header; 