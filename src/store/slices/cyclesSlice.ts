import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cycle, NewCycle } from '../../types';
import { fetchCycles, createCycle, updateCycle, deleteCycle } from '../thunks';

interface CyclesState {
  cycles: Cycle[];
  selectedCycle: number;
  showAddCycle: boolean;
  editingCycle: Cycle | null;
  newCycle: NewCycle;
  loading: boolean;
  error: string | null;
}

const initialState: CyclesState = {
  cycles: [],
  selectedCycle: 0,
  showAddCycle: false,
  editingCycle: null,
  newCycle: {
    startDate: '',
    periodLength: 28
  },
  loading: false,
  error: null,
};

const cyclesSlice = createSlice({
  name: 'cycles',
  initialState,
  reducers: {
    setSelectedCycle: (state, action: PayloadAction<number>) => {
      state.selectedCycle = action.payload;
    },
    setShowAddCycle: (state, action: PayloadAction<boolean>) => {
      state.showAddCycle = action.payload;
    },
    setEditingCycle: (state, action: PayloadAction<Cycle | null>) => {
      state.editingCycle = action.payload;
      if (action.payload) {
        state.newCycle = {
          startDate: action.payload.startDate,
          periodLength: action.payload.periodLength
        };
      } else {
        state.newCycle = {
          startDate: '',
          periodLength: 28
        };
      }
    },
    setNewCycle: (state, action: PayloadAction<Partial<NewCycle>>) => {
      state.newCycle = { ...state.newCycle, ...action.payload };
    },
    cancelEditCycle: (state) => {
      state.editingCycle = null;
      state.newCycle = {
        startDate: '',
        periodLength: 28
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch cycles
    builder
      .addCase(fetchCycles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCycles.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = action.payload;
        // Reset selectedCycle if it's out of bounds
        if (state.selectedCycle >= state.cycles.length && state.cycles.length > 0) {
          state.selectedCycle = 0;
        }
      })
      .addCase(fetchCycles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cycles';
      });

    // Create cycle
    builder
      .addCase(createCycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles.push(action.payload);
        state.showAddCycle = false;
        state.newCycle = {
          startDate: '',
          periodLength: 28
        };
      })
      .addCase(createCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create cycle';
      });

    // Update cycle
    builder
      .addCase(updateCycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCycle.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cycles.findIndex(cycle => cycle.id === action.payload.id);
        if (index !== -1) {
          state.cycles[index] = action.payload;
        }
        state.editingCycle = null;
        state.newCycle = {
          startDate: '',
          periodLength: 28
        };
      })
      .addCase(updateCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update cycle';
      });

    // Delete cycle
    builder
      .addCase(deleteCycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = state.cycles.filter(cycle => cycle.id !== action.payload);
        // Reset selectedCycle if it's out of bounds
        if (state.selectedCycle >= state.cycles.length && state.cycles.length > 0) {
          state.selectedCycle = 0;
        }
      })
      .addCase(deleteCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete cycle';
      });
  },
});

export const {
  setSelectedCycle,
  setShowAddCycle,
  setEditingCycle,
  setNewCycle,
  cancelEditCycle,
  clearError,
} = cyclesSlice.actions;

export default cyclesSlice.reducer; 