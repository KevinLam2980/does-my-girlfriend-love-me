import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultCycleData } from '../../types';

interface SettingsState {
  defaultCycleData: DefaultCycleData;
}

const initialState: SettingsState = {
  defaultCycleData: {
    averageCycleLength: 28,
    periodLength: 5
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDefaultCycleData: (state, action: PayloadAction<DefaultCycleData>) => {
      state.defaultCycleData = action.payload;
    },
    updateDefaultCycleData: (state, action: PayloadAction<Partial<DefaultCycleData>>) => {
      state.defaultCycleData = { ...state.defaultCycleData, ...action.payload };
    }
  }
});

export const {
  setDefaultCycleData,
  updateDefaultCycleData
} = settingsSlice.actions;

export default settingsSlice.reducer; 