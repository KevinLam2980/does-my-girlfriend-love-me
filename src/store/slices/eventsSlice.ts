import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, NewEvent } from '../../types';

interface EventsState {
  events: Event[];
  editingEvent: Event | null;
  newEvent: NewEvent;
}

const initialState: EventsState = {
  events: [],
  editingEvent: null,
  newEvent: {
    date: new Date().toISOString().split('T')[0],
    type: 'nice' as const,
    notes: ''
  }
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      state.editingEvent = null;
      state.newEvent = {
        date: new Date().toISOString().split('T')[0],
        type: 'nice' as const,
        notes: ''
      };
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
      state.editingEvent = null;
      state.newEvent = {
        date: new Date().toISOString().split('T')[0],
        type: 'nice' as const,
        notes: ''
      };
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setEditingEvent: (state, action: PayloadAction<Event | null>) => {
      state.editingEvent = action.payload;
      if (action.payload) {
        state.newEvent = {
          date: action.payload.date,
          type: action.payload.type,
          notes: action.payload.notes
        };
      } else {
        state.newEvent = {
          date: new Date().toISOString().split('T')[0],
          type: 'nice' as const,
          notes: ''
        };
      }
    },
    setNewEvent: (state, action: PayloadAction<Partial<NewEvent>>) => {
      state.newEvent = { ...state.newEvent, ...action.payload };
    },
    cancelEditEvent: (state) => {
      state.editingEvent = null;
      state.newEvent = {
        date: new Date().toISOString().split('T')[0],
        type: 'nice' as const,
        notes: ''
      };
    }
  }
});

export const {
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  setEditingEvent,
  setNewEvent,
  cancelEditEvent
} = eventsSlice.actions;

export default eventsSlice.reducer; 