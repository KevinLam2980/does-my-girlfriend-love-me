import { Middleware } from '@reduxjs/toolkit';
import { NewEvent } from '../../types';

const allowedTypes = ['nice', 'mean', 'argument', 'gift', 'food'] as const;
type EventType = typeof allowedTypes[number];

export const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  
  // Save specific parts of state to localStorage
  const state = store.getState();
  
  // Save cycles
  localStorage.setItem('cycles', JSON.stringify(state.cycles.cycles));
  
  // Save events
  localStorage.setItem('events', JSON.stringify(state.events.events));
  
  // Save settings
  localStorage.setItem('defaultCycleData', JSON.stringify(state.settings.defaultCycleData));
  
  return result;
};

export const loadStateFromStorage = () => {
  try {
    const cycles = localStorage.getItem('cycles');
    const events = localStorage.getItem('events');
    const defaultCycleData = localStorage.getItem('defaultCycleData');
    
    // Always use a valid event type for newEvent.type
    let newEventType: EventType = 'nice';
    // If you want to load a previous newEvent from storage, do it here and validate
    // For now, always default to 'nice' for safety
    // If you want to load from storage, you could do:
    // const loaded = JSON.parse(localStorage.getItem('newEvent') || '{}');
    // if (allowedTypes.includes(loaded.type)) newEventType = loaded.type;
    
    return {
      cycles: {
        cycles: cycles ? JSON.parse(cycles) : [],
        selectedCycle: 0,
        showAddCycle: false,
        editingCycle: null,
        newCycle: {
          startDate: '',
          periodLength: 5
        }
      },
      events: {
        events: events ? JSON.parse(events) : [],
        editingEvent: null,
        newEvent: {
          date: new Date().toISOString().split('T')[0],
          type: newEventType,
          notes: ''
        } as NewEvent
      },
      settings: {
        defaultCycleData: defaultCycleData ? JSON.parse(defaultCycleData) : {
          averageCycleLength: 28,
          periodLength: 5
        }
      }
    };
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
}; 