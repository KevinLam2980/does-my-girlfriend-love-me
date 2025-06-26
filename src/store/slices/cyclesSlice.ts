import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cycle, NewCycle } from '../../types';

interface CyclesState {
  cycles: Cycle[];
  selectedCycle: number;
  showAddCycle: boolean;
  editingCycle: Cycle | null;
  newCycle: NewCycle;
}

const initialState: CyclesState = {
  cycles: [],
  selectedCycle: 0,
  showAddCycle: false,
  editingCycle: null,
  newCycle: {
    startDate: '',
    periodLength: 5
  }
};

const cyclesSlice = createSlice({
  name: 'cycles',
  initialState,
  reducers: {
    setCycles: (state, action: PayloadAction<Cycle[]>) => {
      state.cycles = action.payload;
    },
    addCycle: (state, action: PayloadAction<Cycle>) => {
      state.cycles.push(action.payload);
      state.showAddCycle = false;
      state.editingCycle = null;
      state.newCycle = {
        startDate: '',
        periodLength: 5
      };
    },
    updateCycle: (state, action: PayloadAction<Cycle>) => {
      const index = state.cycles.findIndex(cycle => cycle.id === action.payload.id);
      if (index !== -1) {
        state.cycles[index] = action.payload;
      }
      state.showAddCycle = false;
      state.editingCycle = null;
      state.newCycle = {
        startDate: '',
        periodLength: 5
      };
    },
    deleteCycle: (state, action: PayloadAction<number>) => {
      state.cycles = state.cycles.filter(cycle => cycle.id !== action.payload);
      // Reset selectedCycle if it's out of bounds
      if (state.selectedCycle >= state.cycles.length && state.cycles.length > 0) {
        state.selectedCycle = 0;
      }
    },
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
        state.showAddCycle = true;
      } else {
        state.newCycle = {
          startDate: '',
          periodLength: 5
        };
        state.showAddCycle = false;
      }
    },
    setNewCycle: (state, action: PayloadAction<Partial<NewCycle>>) => {
      state.newCycle = { ...state.newCycle, ...action.payload };
    },
    cancelEditCycle: (state) => {
      state.editingCycle = null;
      state.showAddCycle = false;
      state.newCycle = {
        startDate: '',
        periodLength: 5
      };
    }
  }
});

export const {
  setCycles,
  addCycle,
  updateCycle,
  deleteCycle,
  setSelectedCycle,
  setShowAddCycle,
  setEditingCycle,
  setNewCycle,
  cancelEditCycle
} = cyclesSlice.actions;

export default cyclesSlice.reducer; 