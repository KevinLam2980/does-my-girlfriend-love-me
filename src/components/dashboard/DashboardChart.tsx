import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Cycle, Event, ChartDataPoint } from '../../types';

interface DashboardChartProps {
  events: Event[];
  cycles: Cycle[];
  selectedCycle: number;
  setSelectedCycle: (n: number) => void;
  chartData: ChartDataPoint[];
  formatCycleDisplay: (n: number) => string;
  getSelectedCycleDateRange: () => string;
  getPhaseBoundaries: () => any[];
  todayInfo: any;
  CustomTooltip: React.FC<any>;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
  events,
  cycles,
  selectedCycle,
  setSelectedCycle,
  chartData,
  formatCycleDisplay,
  getSelectedCycleDateRange,
  getPhaseBoundaries,
  todayInfo,
  CustomTooltip
}) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
      <h2 className="text-xl font-semibold">Relationship Events by Cycle Day</h2>
      
      {/* Cycle Navigation */}
      {cycles.length > 0 && (
        <div className="flex items-center justify-center sm:justify-end space-x-4">
          <button
            onClick={() => setSelectedCycle(Math.min(selectedCycle + 1, cycles.length - 1))}
            disabled={selectedCycle >= cycles.length - 1}
            className="p-2 text-gray-500 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-center min-w-32 sm:min-w-48">
            <p className="font-medium text-sm sm:text-base">{formatCycleDisplay(selectedCycle)}</p>
            <p className="text-xs text-gray-500">{getSelectedCycleDateRange()}</p>
          </div>
          <button
            onClick={() => setSelectedCycle(Math.max(selectedCycle - 1, 0))}
            disabled={selectedCycle <= 0}
            className="p-2 text-gray-500 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
    
    {events.length > 0 && cycles.length > 0 ? (
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 30, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="cycleDay" 
              label={{ value: 'Cycle Day', position: 'insideBottomRight', offset: -5 }} 
              padding={{ left: 5, right: 5 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Number of Events', angle: -90, position: 'insideLeft' }}
              domain={[0, (dataMax: number) => Math.max(dataMax + 1, 1)]}
              allowDecimals={false}
              type="number"
              tick={{ fontSize: 12 }}
            />
            
            {/* Add colored areas for each phase */}
            {getPhaseBoundaries().map((phase, index) => (
              <ReferenceArea 
                key={`phase-${index}`} 
                x1={phase.start} 
                x2={phase.end} 
                fill={phase.color} 
                label={{ 
                  value: phase.phase, 
                  position: 'insideBottom',
                  fontSize: 10,
                  fill: '#666'
                }}
              />
            ))}
            
            {/* Mark current date if viewing current cycle */}
            {selectedCycle === 0 && todayInfo.cycleDay && (
              <ReferenceLine 
                x={todayInfo.cycleDay} 
                stroke="#ff0000" 
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{ 
                  value: "Today", 
                  position: "top",
                  fontSize: 12,
                  fill: '#ff0000'
                }}
              />
            )}
            
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="nice" stroke="#ec4899" name="Was Nice" />
            <Line type="monotone" dataKey="mean" stroke="#ef4444" name="Was Mean" />
            <Line type="monotone" dataKey="argument" stroke="#f97316" name="Had Argument" />
            <Line type="monotone" dataKey="gift" stroke="#8b5cf6" name="Gave Gift" />
            <Line type="monotone" dataKey="food" stroke="#22c55e" name="Bought Food" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500">No data to display yet</p>
        <p className="text-sm text-gray-400">Add cycles and events to see visualizations</p>
      </div>
    )}
  </div>
);

export default DashboardChart; 