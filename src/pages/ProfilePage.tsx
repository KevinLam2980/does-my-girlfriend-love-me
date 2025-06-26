import React from 'react';
import { LogOut } from 'lucide-react';
import { DefaultCycleData } from '../types';
import ProfileSettings from '../components/profile/ProfileSettings';

interface ProfilePageProps {
  defaultCycleData: DefaultCycleData;
  onSaveSettings: (settings: DefaultCycleData) => Promise<void>;
  onUpdateProfile: (profileData: { username?: string; email?: string }) => Promise<void>;
  onChangePassword: (passwordData: { currentPassword: string; newPassword: string }) => Promise<void>;
  onLogout: () => Promise<void>;
  user: { id: string; username: string; email: string } | null;
  loading?: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  defaultCycleData,
  onSaveSettings,
  onUpdateProfile,
  onChangePassword,
  onLogout,
  user,
  loading = false
}) => (
  <main role="main" aria-label="Profile Settings">
    <div className="space-y-4 sm:space-y-6">
      {/* User Info and Sign Out */}
      <section className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold">Account Information</h2>
            {user && (
              <div className="mt-2 text-sm text-gray-600">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={onLogout}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Profile Settings */}
      <ProfileSettings
        defaultCycleData={defaultCycleData}
        onSave={onSaveSettings}
        onUpdateProfile={onUpdateProfile}
        onChangePassword={onChangePassword}
        user={user}
        loading={loading}
      />
    </div>
  </main>
);

export default ProfilePage; 