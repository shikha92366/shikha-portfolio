import { AchievementsList } from '../components/achievements/AchievementsList';

export function Achievements() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <AchievementsList standalone />
    </div>
  );
}

export default Achievements;
