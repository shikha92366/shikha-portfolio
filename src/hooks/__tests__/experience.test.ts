import { describe, expect, it } from 'vitest';
import { experience } from '../../data/experience';
import { mapExperienceRecords, mapPublicAchievements } from '../useSanityData';

describe('public workshop experience', () => {
  it('replaces only the legacy Sanity workshop entry and omits unverified dates', () => {
    const records = mapExperienceRecords([
      { _id: 'experience-raman', role: 'Intern', company: 'Raman', startDate: 'Mar 2025', endDate: 'Jun 2025', bullets: ['Validation'] },
      { _id: 'experience-trainer', role: 'IoT & Robotics Workshop Trainer', company: 'College workshop (40+ students)', startDate: 'Jan 2026', endDate: 'Jan 2026', bullets: ['Trained 40+ students'] },
    ]);

    expect(records[0]).toMatchObject({ id: 'experience-raman', role: 'Intern', company: 'Raman', startDate: 'Mar 2025' });
    expect(records[1]).toMatchObject({
      id: 'experience-trainer',
      role: 'IoT & Robotics Workshop',
      company: 'PM SHRI Government Girls Higher Secondary School, Banda, Uttar Pradesh',
      startDate: '',
      endDate: '',
      duration: 'Three-day workshop',
      images: expect.arrayContaining([
        expect.objectContaining({ src: '/images/experience/iot-workshop-banda-1.jpg' }),
        expect.objectContaining({ src: '/images/experience/iot-workshop-banda-2.jpg' }),
      ]),
    });
    expect(records[1].bullets.join(' ')).not.toMatch(/40\+|January 2026|Jan 2026|College workshop/i);
  });

  it('includes the solar outreach experience as a separate entry with a literal date and three photos', () => {
    const solarOutreach = experience.find(item => item.id === 'solar-outreach');

    expect(solarOutreach).toMatchObject({
      id: 'solar-outreach',
      role: 'Space Science Outreach & Solar Observation',
      company: 'PSIT Vyomnauts',
      startDate: '9 Nov 2024',
      endDate: '',
      images: expect.arrayContaining([
        expect.objectContaining({ src: '/images/experience/solar-outreach-presentation.jpg' }),
        expect.objectContaining({ src: '/images/experience/solar-glasses-observation.jpg' }),
        expect.objectContaining({ src: '/images/experience/solar-outreach-students.jpg' }),
      ]),
    });
  });

  it('hides only the duplicate unverified workshop achievement', () => {
    const achievements = mapPublicAchievements([
      { _id: 'achievement-iot-trainer', title: 'IoT workshop trainer' },
      { _id: 'achievement-matlab', title: 'MATLAB certification' },
    ]);

    expect(achievements.map(item => item.id)).toEqual(['achievement-matlab']);
  });
});
