export interface Cycle {
  id: number;
  startDate: string;
  periodLength: number;
}

export interface NewCycle {
  startDate: string;
  periodLength: number;
}

export interface Event {
  id: number;
  date: string;
  type: 'nice' | 'mean' | 'argument' | 'gift' | 'food';
  notes?: string;
}

export interface NewEvent {
  date: string;
  type: 'nice' | 'mean' | 'argument' | 'gift' | 'food';
  notes?: string;
}

export interface CycleInfo {
  cycle: Cycle | null;
  cycleDay: number | null;
  periodLength: number;
}

export interface ChartDataPoint {
  day: number;
  nice: number;
  mean: number;
  argument: number;
  gift: number;
  food: number;
}

export interface Stats {
  totalEvents: number;
  niceEvents: number;
  meanEvents: number;
  argumentEvents: number;
  giftEvents: number;
  foodEvents: number;
  nicePercentage: number;
  meanPercentage: number;
  argumentPercentage: number;
  giftPercentage: number;
  foodPercentage: number;
}

export interface DefaultCycleData {
  averagePeriodLength: number;
  averageCycleLength: number;
}

export interface ConfirmDialog {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string | number;
} 