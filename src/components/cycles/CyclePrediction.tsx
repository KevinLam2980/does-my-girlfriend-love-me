import React from 'react';

interface CyclePredictionProps {
  nextPeriod: Date | null;
  daysUntilNextPeriod: number | null;
  cycles: any[];
}

const CyclePrediction: React.FC<CyclePredictionProps> = ({
  nextPeriod,
  daysUntilNextPeriod,
  cycles
}) => {
  if (!nextPeriod) return null;
  
  return (
    <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-2">Next Period Prediction</h2>
      <p className="text-lg">
        Expected: <strong>{nextPeriod.toLocaleDateString()}</strong>
      </p>
      <p className="text-sm text-gray-600 mt-1">
        {daysUntilNextPeriod !== null && (
          daysUntilNextPeriod > 0 ? 
            `In ${daysUntilNextPeriod} days` : 
            'Due today!'
        )}
      </p>
      {cycles.length > 1 && (
        <p className="text-xs text-gray-500 mt-2">
          Based on your cycle history
        </p>
      )}
    </div>
  );
};

export default CyclePrediction; 