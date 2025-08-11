import { userProfileData } from '@/lib/mock-data';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatisticsCard } from '@/components/profile/StatisticsCard';
import { SettingsTabs } from '@/components/profile/SettingsTabs';

export default function ProfilePage() {
  const profileData = userProfileData;

  return (
    <div className="space-y-6">
      <ProfileHeader user={profileData} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <StatisticsCard stats={profileData} />
        </div>
        <div className="md:col-span-2">
          <SettingsTabs preferences={profileData.preferencias} />
        </div>
      </div>
    </div>
  );
}