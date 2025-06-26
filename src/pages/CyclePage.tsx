import React from 'react';
import { Cycle } from '../types';
import CycleForm from '../components/cycles/CycleForm';
import CycleHistory from '../components/cycles/CycleHistory';
import CyclePrediction from '../components/cycles/CyclePrediction';

interface CyclePageProps {
  cycles: Cycle[];
  sortedCycles: Cycle[];
  nextPeriod: Date | null;
  daysUntilNextPeriod: number | null;
  editingCycle: Cycle | null;
  showAddCycle: boolean;
  newCycle: any;
  handleNewCycleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addCycle: (e: React.FormEvent) => void;
  cancelEditCycle: () => void;
  editCycle: (cycle: Cycle) => void;
  deleteCycle: (id: number) => void;
  setShowAddCycle: (b: boolean) => void;
  defaultCycleData: any;
  getCycleWithLength: (cycle: Cycle, index: number) => Cycle;
}

const CyclePage: React.FC<CyclePageProps> = (props) => (
  <main role="main" aria-label="Cycle Tracking" className="space-y-4 sm:space-y-6">
    <CycleForm
      editingCycle={props.editingCycle}
      showAddCycle={props.showAddCycle}
      setShowAddCycle={props.setShowAddCycle}
      newCycle={props.newCycle}
      handleNewCycleChange={props.handleNewCycleChange}
      addCycle={props.addCycle}
      cancelEditCycle={props.cancelEditCycle}
    />

    <CyclePrediction
      nextPeriod={props.nextPeriod}
      daysUntilNextPeriod={props.daysUntilNextPeriod}
      cycles={props.cycles}
    />

    <CycleHistory
      sortedCycles={props.sortedCycles}
      getCycleWithLength={props.getCycleWithLength}
      editCycle={props.editCycle}
      deleteCycle={props.deleteCycle}
    />
  </main>
);

export default CyclePage; 