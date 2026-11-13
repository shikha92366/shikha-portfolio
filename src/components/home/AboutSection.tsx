import { Link } from 'react-router-dom';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../layout/SectionHeading';
import { ContentStatus } from '../layout/ContentStatus';
import { useProfile } from '../../hooks/useSanityData';
export function AboutSection() {
  const content=useProfile();const {data:profile}=content;
  return <section id="about" className="editorial-section"><SectionHeading title="about me"/><ContentStatus loading={content.isLoading} error={content.contentError}>
    <div className="about-grid"><div><p className="about-intro">{profile.intro}</p><Link to="/about" className="text-link">More about me<ArrowUpRight size={17}/></Link></div><div className="education-card"><GraduationCap size={25}/>{profile.education[0] ? <><h3>{profile.education[0].degree}</h3><p>{profile.education[0].school}</p><div><span>{profile.education[0].period}</span><span>{profile.education[0].score}</span></div></> : <p>{profile.title}</p>}</div></div>
    <div className="about-tools"><span className="eyebrow">Currently working with</span><div>{profile.currentTechnologies.map(t=><span key={t}>{t}</span>)}</div></div>
  </ContentStatus></section>;
}
export default AboutSection;
