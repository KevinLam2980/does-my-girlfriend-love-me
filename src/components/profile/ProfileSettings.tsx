import React, { useState, useEffect } from 'react';
import { Save, X, User, Lock } from 'lucide-react';
import { DefaultCycleData } from '../../types';

interface ProfileSettingsProps {
  defaultCycleData: DefaultCycleData;
  onSave: (settings: DefaultCycleData) => void;
  onUpdateProfile: (profileData: { username?: string; email?: string }) => void;
  onChangePassword: (passwordData: { currentPassword: string; newPassword: string }) => void;
  user: { id: string; username: string; email: string } | null;
  loading?: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  defaultCycleData,
  onSave,
  onUpdateProfile,
  onChangePassword,
  user,
  loading = false
}) => {
  // Local state for cycle settings
  const [localSettings, setLocalSettings] = useState<DefaultCycleData>(defaultCycleData);
  const [hasCycleChanges, setHasCycleChanges] = useState(false);

  // Local state for profile settings
  const [profileForm, setProfileForm] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [hasProfileChanges, setHasProfileChanges] = useState(false);

  // Local state for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [hasPasswordChanges, setHasPasswordChanges] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setLocalSettings(defaultCycleData);
    setHasCycleChanges(false);
  }, [defaultCycleData]);

  useEffect(() => {
    setProfileForm({
      username: user?.username || '',
      email: user?.email || ''
    });
    setHasProfileChanges(false);
  }, [user]);

  // Handle cycle settings input changes
  const handleCycleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newSettings = {
      ...localSettings,
      [name]: parseInt(value)
    };
    setLocalSettings(newSettings);
    setHasCycleChanges(true);
  };

  // Handle profile settings input changes
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
    setHasProfileChanges(true);
  };

  // Handle password input changes
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    setHasPasswordChanges(true);
  };

  // Handle cycle settings save
  const handleCycleSave = () => {
    onSave(localSettings);
    setHasCycleChanges(false);
  };

  // Handle cycle settings cancel
  const handleCycleCancel = () => {
    setLocalSettings(defaultCycleData);
    setHasCycleChanges(false);
  };

  // Handle profile settings save
  const handleProfileSave = () => {
    onUpdateProfile(profileForm);
    setHasProfileChanges(false);
  };

  // Handle profile settings cancel
  const handleProfileCancel = () => {
    setProfileForm({
      username: user?.username || '',
      email: user?.email || ''
    });
    setHasProfileChanges(false);
  };

  // Handle password change save
  const handlePasswordSave = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }
    onChangePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    });
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setHasPasswordChanges(false);
  };

  // Handle password change cancel
  const handlePasswordCancel = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setHasPasswordChanges(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Profile Settings */}
      <section className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <User size={20} className="mr-2" />
            Profile Settings
          </h2>
        </div>
        
        <form className="max-w-md space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend className="sr-only">Profile Settings</legend>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={profileForm.username}
                  onChange={handleProfileInputChange}
                  className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileInputChange}
                  className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                  required
                />
              </div>
            </div>
          </fieldset>
          
          {/* Profile buttons */}
          {hasProfileChanges && (
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                type="button"
                onClick={handleProfileSave}
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
              >
                <Save size={16} />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                type="button"
                onClick={handleProfileCancel}
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </form>
      </section>

      {/* Password Change */}
      <section className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Lock size={20} className="mr-2" />
            Change Password
          </h2>
        </div>
        
        <form className="max-w-md space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend className="sr-only">Password Change</legend>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordInputChange}
                  className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                  className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordInputChange}
                  className="mt-1 block w-full px-3 py-3 min-h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
                  required
                />
              </div>
            </div>
          </fieldset>
          
          {/* Password buttons */}
          {hasPasswordChanges && (
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                type="button"
                onClick={handlePasswordSave}
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
              >
                <Save size={16} />
                <span>{loading ? 'Saving...' : 'Change Password'}</span>
              </button>
              <button
                type="button"
                onClick={handlePasswordCancel}
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </form>
      </section>

      {/* Default Cycle Settings */}
      <section className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl font-semibold">Default Cycle Settings</h2>
        </div>
        
        <form className="max-w-md space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                  value={localSettings.averageCycleLength}
                  onChange={handleCycleInputChange}
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
                  name="averagePeriodLength"
                  min="2"
                  max="10"
                  value={localSettings.averagePeriodLength}
                  onChange={handleCycleInputChange}
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
          
          {/* Cycle buttons */}
          {hasCycleChanges && (
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCycleSave}
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
              >
                <Save size={16} />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                type="button"
                onClick={handleCycleCancel}
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors min-h-10"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default ProfileSettings; 