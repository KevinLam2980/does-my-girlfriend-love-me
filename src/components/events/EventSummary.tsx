import React from 'react';
import { Stats } from '../../types';

interface EventSummaryProps {
  stats: Stats;
  summaryView: 'current' | 'all';
  setSummaryView: (v: 'current' | 'all') => void;
  formatCycleDisplay: (n: number) => string;
  selectedCycle: number;
  getEventIcon: (type: string) => React.ReactNode;
  getEventLabel: (type: string) => string;
}

const EventSummary: React.FC<EventSummaryProps> = ({
  stats,
  summaryView,
  setSummaryView,
  formatCycleDisplay,
  selectedCycle,
  getEventIcon,
  getEventLabel
}) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
      <h2 className="text-xl font-semibold">Event Summary</h2>
      <div className="flex bg-gray-100 rounded-lg p-1 self-start sm:self-auto">
        <button
          onClick={() => setSummaryView('current')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            summaryView === 'current' 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-700 hover:text-purple-600'
          }`}
        >
          Current Cycle
        </button>
        <button
          onClick={() => setSummaryView('all')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            summaryView === 'all' 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-700 hover:text-purple-600'
          }`}
        >
          All Time
        </button>
      </div>
    </div>
    {stats.totalEvents > 0 ? (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">
            By Event Type 
            <span className="text-sm text-gray-500 ml-2">
              ({summaryView === 'current' 
                ? `${formatCycleDisplay(selectedCycle)}: ${stats.totalEvents} events`
                : `All Time: ${stats.totalEvents} events`
              })
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Object.entries(stats.eventsByType).map(([type, count]) => (
              <div key={type} className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  {getEventIcon(type)}
                </div>
                <p className="text-sm text-gray-500 mb-1">{getEventLabel(type)}</p>
                <p className="text-2xl font-bold mb-3">{count}</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="bg-red-100 text-red-800 rounded px-1 py-0.5">
                    <div className="font-medium">Menstruation</div>
                    <div>{stats.eventsByPhase.Menstruation[type as keyof typeof stats.eventsByType] || 0}</div>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 rounded px-1 py-0.5">
                    <div className="font-medium">Follicular</div>
                    <div>{stats.eventsByPhase.Follicular[type as keyof typeof stats.eventsByType] || 0}</div>
                  </div>
                  <div className="bg-green-100 text-green-800 rounded px-1 py-0.5">
                    <div className="font-medium">Ovulation</div>
                    <div>{stats.eventsByPhase.Ovulation[type as keyof typeof stats.eventsByType] || 0}</div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 rounded px-1 py-0.5">
                    <div className="font-medium">Luteal</div>
                    <div>{stats.eventsByPhase.Luteal[type as keyof typeof stats.eventsByType] || 0}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center py-6">
        <p className="text-gray-500">No events recorded yet</p>
      </div>
    )}
  </div>
);

export default EventSummary; 