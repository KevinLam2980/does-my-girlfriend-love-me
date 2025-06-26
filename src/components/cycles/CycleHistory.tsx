import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Cycle } from '../../types';

interface CycleHistoryProps {
  sortedCycles: Cycle[];
  getCycleWithLength: (cycle: Cycle, index: number) => Cycle;
  editCycle: (cycle: Cycle) => void;
  deleteCycle: (id: number) => void;
}

const CycleHistory: React.FC<CycleHistoryProps> = ({
  sortedCycles,
  getCycleWithLength,
  editCycle,
  deleteCycle
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Cycle History</h2>
    
    {sortedCycles.length > 0 ? (
      <div className="space-y-3">
        {sortedCycles.map((cycle, index) => {
          const cycleWithLength = getCycleWithLength(cycle, index);
          return (
            <div key={cycle.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">
                    {new Date(cycle.startDate).toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Period Length: {cycle.periodLength} days
                    {cycleWithLength.calculatedLength && (
                      <span> • Cycle Length: {cycleWithLength.calculatedLength} days</span>
                    )}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      console.log('Edit cycle clicked');
                      editCycle(cycle);
                    }}
                    className="p-1 text-gray-400 hover:text-purple-500 rounded cursor-pointer"
                    title="Edit cycle"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      console.log('Delete cycle clicked');
                      deleteCycle(cycle.id!);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                    title="Delete cycle"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-6">
        <p className="text-gray-500">No cycles recorded yet</p>
        <p className="text-sm text-gray-400">Add your first period to start tracking</p>
      </div>
    )}
  </div>
);

export default CycleHistory; 