import React from 'react';
import { Event } from '../../types';

interface EventFormProps {
  newEvent: any;
  handleEventChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  addEvent: (e: React.FormEvent) => void;
  editingEvent: Event | null;
  cancelEditEvent: () => void;
  cycles: any[];
  getCycleInfo: (date: string) => any;
  getPhaseColor: (phase: string) => string;
  getCyclePhase: (day: number, periodLength: number) => string;
  formatCycleDisplay: (n: number) => string;
}

const EventForm: React.FC<EventFormProps> = ({
  newEvent,
  handleEventChange,
  addEvent,
  editingEvent,
  cancelEditEvent,
  cycles,
  getCycleInfo,
  getPhaseColor,
  getCyclePhase,
  formatCycleDisplay
}) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
    <h2 className="text-xl font-semibold mb-4 sm:mb-6">
      {editingEvent ? 'Edit Event' : 'Add New Event'}
    </h2>
    <form onSubmit={addEvent} className="space-y-4 sm:space-y-6">
      <fieldset>
        <legend className="sr-only">Event Details</legend>
        
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              id="event-date"
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleEventChange}
              onClick={(e) => (e.target as HTMLInputElement).showPicker && (e.target as HTMLInputElement).showPicker()}
              className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer text-base"
              style={{ colorScheme: 'light' }}
              aria-describedby="cycle-info"
              required
            />
            {cycles.length > 0 && newEvent.date && (
              <div id="cycle-info" className="mt-2 text-xs sm:text-sm">
                {(() => {
                  const eventInfo = getCycleInfo(newEvent.date);
                  return (
                    <>
                      <span className="text-gray-500">Cycle Day: </span>
                      <span className="font-medium">{eventInfo.cycleDay || 'N/A'}</span>
                      {eventInfo.cycle && (
                        <>
                          <span className="text-gray-500 ml-2">Phase: </span>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(getCyclePhase(eventInfo.cycleDay!, eventInfo.cycle.periodLength))}`}>
                            {getCyclePhase(eventInfo.cycleDay!, eventInfo.cycle.periodLength)}
                          </span>
                          {eventInfo.cycleNumber! > 0 && (
                            <span className="text-gray-500 ml-2">
                              ({formatCycleDisplay(eventInfo.cycleNumber!)})
                            </span>
                          )}
                        </>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 mb-2">
              Event Type
            </label>
            <select
              id="event-type"
              name="type"
              value={newEvent.type}
              onChange={handleEventChange}
              className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
              required
            >
              <option value="">Select an event type</option>
              <option value="nice">Was Nice to Me</option>
              <option value="mean">Was Mean to Me</option>
              <option value="argument">We Had an Argument</option>
              <option value="gift">Gave Me a Gift</option>
              <option value="food">Bought Me Food</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="event-notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="event-notes"
              name="notes"
              value={newEvent.notes}
              onChange={handleEventChange}
              rows={3}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
              placeholder="Any additional details..."
              aria-describedby="notes-help"
            ></textarea>
            <p id="notes-help" className="mt-1 text-xs text-gray-500">
              Optional: Add any additional context or details about this event.
            </p>
          </div>
        </div>
      </fieldset>
      
      <div className="space-y-3">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
          aria-label={editingEvent ? 'Update event' : 'Add new event'}
        >
          {editingEvent ? 'Update Event' : 'Add Event'}
        </button>
        {editingEvent && (
          <button
            type="button"
            onClick={cancelEditEvent}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
            aria-label="Cancel editing event"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  </div>
);

export default EventForm; 