import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfirmDialog } from '../../types';

interface UIState {
  currentTab: 'dashboard' | 'cycle' | 'events' | 'profile';
  summaryView: 'current' | 'all';
  confirmDialog: ConfirmDialog | null;
}

const initialState: UIState = {
  currentTab: 'dashboard',
  summaryView: 'current',
  confirmDialog: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<'dashboard' | 'cycle' | 'events' | 'profile'>) => {
      state.currentTab = action.payload;
    },
    setSummaryView: (state, action: PayloadAction<'current' | 'all'>) => {
      state.summaryView = action.payload;
    },
    setConfirmDialog: (state, action: PayloadAction<ConfirmDialog | null>) => {
      state.confirmDialog = action.payload;
    }
  }
});

export const {
  setCurrentTab,
  setSummaryView,
  setConfirmDialog
} = uiSlice.actions;

export default uiSlice.reducer; 