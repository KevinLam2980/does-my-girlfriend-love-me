import React from 'react';
import { Cycle, Event, Stats, ChartDataPoint } from '../types';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import DashboardChart from '../components/dashboard/DashboardChart';
import EventSummary from '../components/events/EventSummary';

interface DashboardPageProps {
  cycles: Cycle[];
  events: Event[];
  sortedCycles: Cycle[];
  selectedCycle: number;
  setSelectedCycle: (n: number) => void;
  chartData: ChartDataPoint[];
  stats: Stats;
  summaryView: 'current' | 'all';
  setSummaryView: (v: 'current' | 'all') => void;
  todayInfo: any;
  todayPhase: string;
  daysUntilNextPeriod: number | null;
  nextPeriod: Date | null;
  formatCycleDisplay: (n: number) => string;
  getSelectedCycleDateRange: () => string;
  getPhaseColor: (phase: string) => string;
  getPhaseBoundaries: () => any[];
  CustomTooltip: React.FC<any>;
  getEventIcon: (type: string) => React.ReactNode;
  getEventLabel: (type: string) => string;
  setTab: (tab: 'dashboard' | 'cycle' | 'events' | 'profile') => void;
}

const DashboardPage: React.FC<DashboardPageProps> = (props) => (
  <main role="main" aria-label="Dashboard" className="space-y-4 sm:space-y-6">
    <DashboardOverview
      cycles={props.cycles}
      todayInfo={props.todayInfo}
      todayPhase={props.todayPhase}
      daysUntilNextPeriod={props.daysUntilNextPeriod}
      nextPeriod={props.nextPeriod}
      getPhaseColor={props.getPhaseColor}
      setTab={props.setTab}
    />
    
    <DashboardChart
      events={props.events}
      cycles={props.cycles}
      selectedCycle={props.selectedCycle}
      setSelectedCycle={props.setSelectedCycle}
      chartData={props.chartData}
      formatCycleDisplay={props.formatCycleDisplay}
      getSelectedCycleDateRange={props.getSelectedCycleDateRange}
      getPhaseBoundaries={props.getPhaseBoundaries}
      todayInfo={props.todayInfo}
      CustomTooltip={props.CustomTooltip}
    />
    
    <EventSummary
      stats={props.stats}
      summaryView={props.summaryView}
      setSummaryView={props.setSummaryView}
      formatCycleDisplay={props.formatCycleDisplay}
      selectedCycle={props.selectedCycle}
      getEventIcon={props.getEventIcon}
      getEventLabel={props.getEventLabel}
    />
  </main>
);

export default DashboardPage; 