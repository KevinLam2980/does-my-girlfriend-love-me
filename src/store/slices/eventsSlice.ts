import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, NewEvent } from '../../types';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../thunks';

interface EventsState {
  events: Event[];
  editingEvent: Event | null;
  newEvent: NewEvent;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  editingEvent: null,
  newEvent: {
    date: '',
    type: 'nice',
    notes: ''
  },
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEditingEvent: (state, action: PayloadAction<Event | null>) => {
      state.editingEvent = action.payload;
      if (action.payload) {
        state.newEvent = {
          date: action.payload.date,
          type: action.payload.type,
          notes: action.payload.notes || ''
        };
      } else {
        state.newEvent = {
          date: '',
          type: 'nice',
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
        date: '',
        type: 'nice',
        notes: ''
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch events
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });

    // Create event
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
        state.newEvent = {
          date: '',
          type: 'nice',
          notes: ''
        };
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create event';
      });

    // Update event
    builder
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.editingEvent = null;
        state.newEvent = {
          date: '',
          type: 'nice',
          notes: ''
        };
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update event';
      });

    // Delete event
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(event => event.id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete event';
      });
  },
});

export const {
  setEditingEvent,
  setNewEvent,
  cancelEditEvent,
  clearError,
} = eventsSlice.actions;

export default eventsSlice.reducer; 