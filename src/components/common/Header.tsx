import React from 'react';
import { Heart } from 'lucide-react';

interface HeaderProps {
  user?: {
    username: string;
    email: string;
  } | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-800" id="app-title">
            Does My GF Love Me?
          </h1>
        </div>
        
        {user && onLogout && (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{user.username}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-500">{user.email}</span>
            </div>
            <button
              onClick={onLogout}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 