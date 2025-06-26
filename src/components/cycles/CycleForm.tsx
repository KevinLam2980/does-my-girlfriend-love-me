import React from 'react';
import { Plus } from 'lucide-react';
import { Cycle } from '../../types';

interface CycleFormProps {
  editingCycle: Cycle | null;
  showAddCycle: boolean;
  setShowAddCycle: (show: boolean) => void;
  newCycle: any;
  handleNewCycleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addCycle: (e: React.FormEvent) => void;
  cancelEditCycle: () => void;
}

const CycleForm: React.FC<CycleFormProps> = ({
  editingCycle,
  showAddCycle,
  setShowAddCycle,
  newCycle,
  handleNewCycleChange,
  addCycle,
  cancelEditCycle
}) => {
  // Show form if editing a cycle or if showAddCycle is true
  const shouldShowForm = editingCycle || showAddCycle;

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
        <h2 className="text-xl font-semibold">
          {editingCycle ? 'Edit Cycle' : 'Add New Period/Cycle'}
        </h2>
        {!editingCycle && (
          <button
            onClick={() => setShowAddCycle(!showAddCycle)}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
            aria-label={showAddCycle ? 'Hide add cycle form' : 'Show add cycle form'}
          >
            <Plus size={16} aria-hidden="true" />
            <span>{showAddCycle ? 'Hide Form' : 'Add Period'}</span>
          </button>
        )}
      </div>
      
      {shouldShowForm && (
        <div className="max-w-md">
          <form onSubmit={addCycle} className="space-y-4 sm:space-y-6">
            <fieldset>
              <legend className="sr-only">Cycle Details</legend>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="cycle-start-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Period Start Date
                  </label>
                  <input
                    id="cycle-start-date"
                    type="date"
                    name="startDate"
                    value={newCycle.startDate}
                    onChange={handleNewCycleChange}
                    onClick={(e) => (e.target as HTMLInputElement).showPicker && (e.target as HTMLInputElement).showPicker()}
                    className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer text-base"
                    style={{ colorScheme: 'light' }}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cycle-period-length" className="block text-sm font-medium text-gray-700 mb-2">
                    Period Length (days)
                  </label>
                  <input
                    id="cycle-period-length"
                    type="number"
                    name="periodLength"
                    min="2"
                    max="10"
                    value={newCycle.periodLength}
                    onChange={handleNewCycleChange}
                    className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                    aria-describedby="period-length-help"
                    required
                  />
                  <p id="period-length-help" className="mt-1 text-xs text-gray-500">
                    Enter the number of days your period typically lasts (2-10 days)
                  </p>
                </div>
              </div>
            </fieldset>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                type="submit"
                disabled={!newCycle.startDate || !newCycle.periodLength}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
                aria-label={editingCycle ? 'Update cycle' : 'Add new cycle'}
              >
                {editingCycle ? 'Update Cycle' : 'Add Cycle'}
              </button>
              <button
                type="button"
                onClick={editingCycle ? cancelEditCycle : () => setShowAddCycle(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
                aria-label="Cancel cycle form"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CycleForm; 