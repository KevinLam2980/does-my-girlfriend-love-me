import React from 'react';
import { DefaultCycleData } from '../types';
import ProfileSettings from '../components/profile/ProfileSettings';

interface ProfilePageProps {
  defaultCycleData: DefaultCycleData;
  handleDefaultCycleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = (props) => (
  <main role="main" aria-label="Profile Settings">
    <ProfileSettings
      defaultCycleData={props.defaultCycleData}
      handleDefaultCycleChange={props.handleDefaultCycleChange}
    />
  </main>
);

export default ProfilePage; 