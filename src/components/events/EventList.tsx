import React from 'react';
import { Event, Cycle } from '../../types';
import { Edit, Trash2 } from 'lucide-react';

interface EventListProps {
  events: Event[];
  editEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  getCycleInfo: (date: string) => any;
  getPhaseColor: (phase: string) => string;
  getCyclePhase: (day: number, periodLength: number) => string;
  formatCycleDisplay: (n: number) => string;
  getEventIcon: (type: string) => React.ReactNode;
  getEventLabel: (type: string) => string;
  cycles: Cycle[];
}

const EventList: React.FC<EventListProps> = ({
  events,
  editEvent,
  deleteEvent,
  getCycleInfo,
  getPhaseColor,
  getCyclePhase,
  formatCycleDisplay,
  getEventIcon,
  getEventLabel,
  cycles
}) => {
  const sortedEvents = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 15);

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Recent Events</h2>
      {events.length > 0 ? (
        <div 
          className="space-y-3 max-h-96 overflow-y-auto pr-2"
          role="list"
          aria-label="List of recent events"
        >
          {sortedEvents.map(event => {
            const eventInfo = getCycleInfo(event.date);
            const eventDate = new Date(event.date).toLocaleDateString();
            const cycleInfo = cycles.length > 0 && eventInfo.cycleDay && eventInfo.cycle 
              ? `Day ${eventInfo.cycleDay} - ${getCyclePhase(eventInfo.cycleDay, eventInfo.cycle.periodLength)}${eventInfo.cycleNumber! > 0 ? `, ${formatCycleDisplay(eventInfo.cycleNumber!)}` : ''}`
              : '';
            
            return (
              <div 
                key={event.id} 
                className="bg-gray-50 p-3 sm:p-4 rounded-lg"
                role="listitem"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div className="p-1 rounded-full bg-white flex-shrink-0" aria-hidden="true">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium truncate text-sm sm:text-base">
                        {getEventLabel(event.type)}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {eventDate}
                        {cycleInfo && (
                          <span className="hidden sm:inline ml-2">
                            ({cycleInfo})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        editEvent(event);
                      }}
                      className="p-2 min-h-10 min-w-10 text-gray-400 hover:text-purple-500 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
                      title="Edit event"
                      aria-label={`Edit ${getEventLabel(event.type)} event from ${eventDate}`}
                    >
                      <Edit size={16} aria-hidden="true" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        deleteEvent(event.id!);
                      }}
                      className="p-2 min-h-10 min-w-10 text-gray-400 hover:text-red-500 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                      title="Delete event"
                      aria-label={`Delete ${getEventLabel(event.type)} event from ${eventDate}`}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {event.notes && (
                  <p className="mt-2 text-sm text-gray-600 break-words">
                    {event.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10" role="status" aria-live="polite">
          <p className="text-gray-500">No events recorded yet</p>
          <p className="text-xs text-gray-400 mt-1">Add your first event using the form</p>
        </div>
      )}
    </div>
  );
};

export default EventList; 