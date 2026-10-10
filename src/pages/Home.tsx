import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/home/AboutSection';
import { ExperienceTabs } from '../components/experience/ExperienceTabs';
import { SoftwareSection } from '../components/home/SoftwareSection';
import { HardwareSection } from '../components/home/HardwareSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { AchievementsList } from '../components/achievements/AchievementsList';
import { ContactForm } from '../components/contact/ContactForm';

export function Home() {
  return (
    <div className="space-y-12 sm:space-y-20">
      <Hero />
      <AboutSection />
      <ExperienceTabs />
      <SoftwareSection />
      <HardwareSection />
      <SkillsSection />
      <AchievementsList />
      <ContactForm />
    </div>
  );
}

export default Home;
