import { JournalSection } from '../components/home/JournalSection';
import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/home/AboutSection';
import { ExperienceTabs } from '../components/experience/ExperienceTabs';
import { SelectedWork } from '../components/home/SelectedWork';
import { SkillsSection } from '../components/home/SkillsSection';
import { AchievementsList } from '../components/achievements/AchievementsList';
import { ContactForm } from '../components/contact/ContactForm';

export function Home() {
  return (
    <div className="home-sections">
      <Hero />
      <SelectedWork />
      <JournalSection />
      <AboutSection />
      <ExperienceTabs />
      <SkillsSection />
      <AchievementsList />
      <ContactForm />
    </div>
  );
}

export default Home;
