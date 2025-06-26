import React from 'react';
import { DefaultCycleData } from '../../types';

interface ProfileSettingsProps {
  defaultCycleData: DefaultCycleData;
  handleDefaultCycleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  defaultCycleData,
  handleDefaultCycleChange
}) => (
  <div className="space-y-4 sm:space-y-6">
    {/* Default Cycle Settings */}
    <section className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Default Cycle Settings</h2>
      <form className="max-w-md space-y-4 sm:space-y-6">
        <fieldset>
          <legend className="sr-only">Cycle Settings</legend>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="average-cycle-length" className="block text-sm font-medium text-gray-700 mb-2">
                Average Cycle Length (days)
              </label>
              <input
                id="average-cycle-length"
                type="number"
                name="averageCycleLength"
                min="21"
                max="40"
                value={defaultCycleData.averageCycleLength}
                onChange={handleDefaultCycleChange}
                className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                aria-describedby="cycle-length-help"
                required
              />
              <p id="cycle-length-help" className="mt-1 text-xs text-gray-500">
                Used for predictions when not enough cycle data is available (21-40 days)
              </p>
            </div>
            
            <div>
              <label htmlFor="default-period-length" className="block text-sm font-medium text-gray-700 mb-2">
                Default Period Length (days)
              </label>
              <input
                id="default-period-length"
                type="number"
                name="periodLength"
                min="2"
                max="10"
                value={defaultCycleData.periodLength}
                onChange={handleDefaultCycleChange}
                className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                aria-describedby="period-length-help"
                required
              />
              <p id="period-length-help" className="mt-1 text-xs text-gray-500">
                Default length when adding new cycles (2-10 days)
              </p>
            </div>
          </div>
        </fieldset>
      </form>
    </section>

    {/* Placeholder for future profile features */}
    <section className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Profile Settings</h2>
      <div className="text-center py-8">
        <p className="text-gray-500 mb-2">More profile features coming soon...</p>
        <p className="text-xs text-gray-400">Personalization options and preferences will be available here</p>
      </div>
    </section>
  </div>
);

export default ProfileSettings; 