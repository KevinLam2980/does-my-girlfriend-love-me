import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultCycleData } from '../../types';
import { fetchSettings, updateSettings } from '../thunks';

interface SettingsState {
  defaultCycleData: DefaultCycleData;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  defaultCycleData: {
    averagePeriodLength: 28,
    averageCycleLength: 28
  },
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateDefaultCycleData: (state, action: PayloadAction<Partial<DefaultCycleData>>) => {
      state.defaultCycleData = { ...state.defaultCycleData, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch settings
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.defaultCycleData) {
          state.defaultCycleData = action.payload.defaultCycleData;
        }
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch settings';
      });

    // Update settings
    builder
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.defaultCycleData) {
          state.defaultCycleData = action.payload.defaultCycleData;
        }
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update settings';
      });
  },
});

export const {
  updateDefaultCycleData,
  clearError,
} = settingsSlice.actions;

export default settingsSlice.reducer; 