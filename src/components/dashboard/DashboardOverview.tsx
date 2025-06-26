import React from 'react';
import { Cycle } from '../../types';

interface DashboardOverviewProps {
  cycles: Cycle[];
  todayInfo: any;
  todayPhase: string;
  daysUntilNextPeriod: number | null;
  nextPeriod: Date | null;
  getPhaseColor: (phase: string) => string;
  setTab: (tab: 'dashboard' | 'cycle' | 'events' | 'profile') => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  cycles,
  todayInfo,
  todayPhase,
  daysUntilNextPeriod,
  nextPeriod,
  getPhaseColor,
  setTab
}) => (
  <section className="bg-white rounded-lg shadow p-4 sm:p-6" aria-labelledby="overview-heading">
    <h2 id="overview-heading" className="text-xl font-semibold mb-4 sm:mb-6">Today's Overview</h2>
    
    {cycles.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Today's cycle information">
        <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
          <p className="text-sm text-gray-500 mb-1">Current Cycle Day</p>
          <p className="text-2xl font-bold" aria-live="polite">
            {todayInfo.cycleDay || 'N/A'}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
          <p className="text-sm text-gray-500 mb-1">Current Phase</p>
          <div 
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(todayPhase)}`}
            aria-live="polite"
          >
            {todayPhase}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2 lg:col-span-1" role="listitem">
          <p className="text-sm text-gray-500 mb-1">Next Period In</p>
          <p className="text-2xl font-bold" aria-live="polite">
            {daysUntilNextPeriod !== null ? (
              daysUntilNextPeriod > 0 ? `${daysUntilNextPeriod} days` : 'Due today'
            ) : 'N/A'}
          </p>
          {nextPeriod && (
            <p className="text-xs text-gray-500 mt-1">
              {nextPeriod.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    ) : (
      <div className="text-center py-6" role="status" aria-live="polite">
        <p className="text-lg text-gray-500 mb-4">Please add cycle data first</p>
        <button 
          onClick={() => setTab('cycle')} 
          className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
          aria-label="Navigate to cycle tracking page to add first cycle"
        >
          Add First Cycle
        </button>
      </div>
    )}
  </section>
);

export default DashboardOverview; 