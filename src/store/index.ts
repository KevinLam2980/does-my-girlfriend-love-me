import { configureStore } from '@reduxjs/toolkit';
import cyclesReducer from './slices/cyclesSlice';
import eventsReducer from './slices/eventsSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';
import { localStorageMiddleware, loadStateFromStorage } from './middleware/localStorage';

export const store = configureStore({
  reducer: {
    cycles: cyclesReducer,
    events: eventsReducer,
    settings: settingsReducer,
    ui: uiReducer,
  },
  preloadedState: loadStateFromStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 