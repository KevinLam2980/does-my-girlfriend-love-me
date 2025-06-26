export interface Cycle {
  id?: number;
  startDate: string;
  endDate?: string;
  symptoms?: string[];
  mood?: string;
  notes?: string;
  ovulationDate?: string;
  periodLength: number;
  calculatedLength?: number;
  displayLength?: number;
}

export interface Event {
  id?: number;
  date: string;
  type: 'nice' | 'mean' | 'argument' | 'gift' | 'food';
  notes: string;
}

export interface DefaultCycleData {
  averageCycleLength: number;
  periodLength: number;
}

export interface NewEvent {
  date: string;
  type: 'nice' | 'mean' | 'argument' | 'gift' | 'food';
  notes: string;
}

export interface NewCycle {
  startDate: string;
  periodLength: number;
}

export interface CycleInfo {
  cycleNumber: number | null;
  cycleDay: number | null;
  cycle: Cycle | null;
}

export interface ConfirmDialog {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ChartDataPoint {
  cycleDay: number;
  nice: number;
  mean: number;
  argument: number;
  gift: number;
  food: number;
  phase: string;
}

export interface Stats {
  totalEvents: number;
  eventsByType: {
    nice: number;
    mean: number;
    argument: number;
    gift: number;
    food: number;
  };
  eventsByPhase: {
    Menstruation: { nice: number; mean: number; argument: number; gift: number; food: number };
    Follicular: { nice: number; mean: number; argument: number; gift: number; food: number };
    Ovulation: { nice: number; mean: number; argument: number; gift: number; food: number };
    Luteal: { nice: number; mean: number; argument: number; gift: number; food: number };
  };
}

export interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
} 