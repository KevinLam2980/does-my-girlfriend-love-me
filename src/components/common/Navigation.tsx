import React from 'react';
import { PieChart, Calendar, Heart, User } from 'lucide-react';

interface NavigationProps {
  tab: string;
  setTab: (tab: 'dashboard' | 'cycle' | 'events' | 'profile') => void;
}

const Navigation: React.FC<NavigationProps> = ({ tab, setTab }) => (
  <nav
    className="bg-white shadow-sm"
    role="navigation"
    aria-label="Main navigation"
  >
    <div className="container mx-auto">
      <div className="flex overflow-x-auto scrollbar-hide sm:justify-center">
        <button
          onClick={() => setTab('dashboard')}
          className={`px-4 py-3 min-h-11 min-w-11 font-medium flex items-center space-x-1 border-b-2 text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition ${tab === 'dashboard' ? 'border-purple-500 text-purple-600' : 'border-transparent hover:text-purple-600'}`}
          aria-current={tab === 'dashboard' ? 'page' : undefined}
          aria-label="Dashboard"
          tabIndex={0}
        >
          <PieChart size={18} aria-hidden="true" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setTab('cycle')}
          className={`px-4 py-3 min-h-11 min-w-11 font-medium flex items-center space-x-1 border-b-2 text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition ${tab === 'cycle' ? 'border-purple-500 text-purple-600' : 'border-transparent hover:text-purple-600'}`}
          aria-current={tab === 'cycle' ? 'page' : undefined}
          aria-label="Cycle Tracking"
          tabIndex={0}
        >
          <Calendar size={18} aria-hidden="true" />
          <span>Cycle Tracking</span>
        </button>
        <button
          onClick={() => setTab('events')}
          className={`px-4 py-3 min-h-11 min-w-11 font-medium flex items-center space-x-1 border-b-2 text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition ${tab === 'events' ? 'border-purple-500 text-purple-600' : 'border-transparent hover:text-purple-600'}`}
          aria-current={tab === 'events' ? 'page' : undefined}
          aria-label="Add Events"
          tabIndex={0}
        >
          <Heart size={18} aria-hidden="true" />
          <span>Add Events</span>
        </button>
        <button
          onClick={() => setTab('profile')}
          className={`px-4 py-3 min-h-11 min-w-11 font-medium flex items-center space-x-1 border-b-2 text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition ${tab === 'profile' ? 'border-purple-500 text-purple-600' : 'border-transparent hover:text-purple-600'}`}
          aria-current={tab === 'profile' ? 'page' : undefined}
          aria-label="Profile"
          tabIndex={0}
        >
          <User size={18} aria-hidden="true" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  </nav>
);

export default Navigation; 