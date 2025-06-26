// Core types for the application
export interface Cycle {
  id: string;
  userId: string;
  startDate: string;
  periodLength: number;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  userId: string;
  date: string;
  type: 'nice' | 'mean' | 'argument' | 'gift' | 'food';
  notes?: string;
  cycleId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewCycle {
  startDate: string;
  periodLength: number;
}

export interface NewEvent {
  date: string;
  type: 'nice' | 'mean' | 'argument' | 'gift' | 'food';
  notes?: string;
  cycleId?: string;
}

export interface DefaultCycleData {
  averagePeriodLength: number;
  averageCycleLength: number;
}

export interface CycleInfo {
  cycle: Cycle | null;
  cycleDay: number | null;
  phase: string | null;
}

export interface ChartDataPoint {
  day: number;
  events: number;
  phase: string;
}

export interface Stats {
  totalCycles: number;
  averagePeriodLength: number;
  averageCycleLength: number;
  totalEvents: number;
  eventBreakdown: Record<string, number>;
}

export interface ConfirmDialog {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
} 