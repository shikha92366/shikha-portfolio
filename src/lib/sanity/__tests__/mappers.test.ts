import { describe, it, expect } from 'vitest';
import {
  mapSanityProject,
  mapSanityExperience,
  mapSanitySkill,
  mapSanityAchievement,
  mapSanityProfile,
  resolveImageUrl,
} from '../mappers';

describe('Sanity Mappers', () => {
  describe('resolveImageUrl', () => {
    it('returns empty string when source is null or undefined', () => {
      expect(resolveImageUrl(null)).toBe('');
      expect(resolveImageUrl(undefined)).toBe('');
    });

    it('returns original string when given a raw URL string', () => {
      expect(resolveImageUrl('https://example.com/photo.png')).toBe('https://example.com/photo.png');
      expect(resolveImageUrl('/projects/rocket-avionics/cover.webp')).toBe(
        '/projects/rocket-avionics/cover.webp'
      );
    });

    it('safely handles unexpected object structures without crashing', () => {
      expect(resolveImageUrl({ invalid: true })).toBe('');
    });
  });

  describe('mapSanityProject', () => {
    it('correctly maps a full Sanity project document', () => {
      const raw = {
        _id: 'project-rocket-avionics',
        title: 'Rocket Avionics System (Trishul)',
        slug: { current: 'rocket-avionics' },
        shortDescription: 'Dual-controller flight computer with RF telemetry.',
        domain: 'hardware',
        category: 'embedded',
        techStack: ['Raspberry Pi Pico 2', 'Arduino Nano 33 BLE'],
        role: 'On-Board Computer Engineer',
        timeline: '2024 - 2025',
        featured: true,
        status: 'completed',
        awards: ['2nd Prize, IN-SPACe Model Rocketry Competition'],
        team: 'Team Sudarshan',
        coverImage: '/projects/rocket-avionics/cover.webp',
        overview: 'Flight computer overview',
        architecture: '/projects/rocket-avionics/system-diagram.png',
        hardwareDetails: {
          mcu: 'Raspberry Pi Pico 2',
          sensors: ['BNO085 IMU'],
          communication: ['UART', 'SPI'],
          pcbSpecs: '2-layer PCB',
        },
        implementation: 'Implementation details',
        results: ['Zero packet drop'],
        challenges: ['High-G vibrational shock'],
        gallery: ['/projects/rocket-avionics/pcb-front.png'],
        documents: [
          {
            label: 'Flight BOM',
            type: 'csv',
            fileUrl: 'https://cdn.sanity.io/files/bom.csv',
            url: '/bom.csv',
          },
          {
            label: 'GitHub Repo',
            type: 'link',
            url: 'https://github.com/shikha92366/Rocket-Avionics',
          },
        ],
        githubUrl: 'https://github.com/shikha92366/Rocket-Avionics',
        demoUrl: 'https://demo.example.com',
        videoUrl: 'https://youtube.com/watch?v=123',
      };

      const result = mapSanityProject(raw);

      expect(result.slug).toBe('rocket-avionics');
      expect(result.title).toBe('Rocket Avionics System (Trishul)');
      expect(result.domain).toBe('hardware');
      expect(result.category).toBe('embedded');
      expect(result.featured).toBe(true);
      expect(result.status).toBe('completed');
      expect(result.techStack).toEqual(['Raspberry Pi Pico 2', 'Arduino Nano 33 BLE']);
      expect(result.hardwareDetails?.mcu).toBe('Raspberry Pi Pico 2');
      expect(result.hardwareDetails?.sensors).toEqual(['BNO085 IMU']);
      expect(result.hardwareDetails?.communication).toEqual(['UART', 'SPI']);
      expect(result.hardwareDetails?.pcbSpecs).toBe('2-layer PCB');
      expect(result.documents[0].url).toBe('https://cdn.sanity.io/files/bom.csv');
      expect(result.documents[1].url).toBe('https://github.com/shikha92366/Rocket-Avionics');
      expect(result.githubUrl).toBe('https://github.com/shikha92366/Rocket-Avionics');
      expect(result.demoUrl).toBe('https://demo.example.com');
      expect(result.videoUrl).toBe('https://youtube.com/watch?v=123');
    });

    it('gracefully handles missing optional fields without throwing', () => {
      const raw = {
        title: 'Minimal Project',
        slug: 'minimal-project',
      };

      const result = mapSanityProject(raw);

      expect(result.title).toBe('Minimal Project');
      expect(result.slug).toBe('minimal-project');
      expect(result.domain).toBe('software');
      expect(result.category).toBe('embedded');
      expect(result.techStack).toEqual([]);
      expect(result.featured).toBe(false);
      expect(result.status).toBe('completed');
      expect(result.hardwareDetails).toBeUndefined();
      expect(result.gallery).toEqual([]);
      expect(result.documents).toEqual([]);
      expect(result.awards).toEqual([]);
      expect(result.results).toEqual([]);
      expect(result.challenges).toEqual([]);
    });

    it('extracts slug from string or slug object with current property', () => {
      expect(mapSanityProject({ title: 'A', slug: { current: 'slug-a' } }).slug).toBe('slug-a');
      expect(mapSanityProject({ title: 'B', slug: 'slug-b' }).slug).toBe('slug-b');
      expect(mapSanityProject({ title: 'C' }).slug).toBe('');
    });
  });

  describe('mapSanityExperience', () => {
    it('correctly maps experience entries', () => {
      const raw = {
        _id: 'exp-raman',
        role: 'Electrical Testing & Validation Intern',
        company: 'Raman Research & Innovation Pvt. Ltd.',
        startDate: 'Mar 2025',
        endDate: 'Jun 2025',
        bullets: ['Tested circuits', 'Assisted with PCB assembly'],
        techStack: ['PCB assembly', 'IoT'],
      };

      const result = mapSanityExperience(raw);

      expect(result.id).toBe('exp-raman');
      expect(result.role).toBe('Electrical Testing & Validation Intern');
      expect(result.company).toBe('Raman Research & Innovation Pvt. Ltd.');
      expect(result.startDate).toBe('Mar 2025');
      expect(result.endDate).toBe('Jun 2025');
      expect(result.bullets).toHaveLength(2);
      expect(result.techStack).toEqual(['PCB assembly', 'IoT']);
    });

    it('defaults endDate to "Present" when missing', () => {
      const result = mapSanityExperience({
        role: 'Engineer',
        company: 'Team',
        startDate: '2024',
      });
      expect(result.endDate).toBe('Present');
      expect(result.bullets).toEqual([]);
    });
  });

  describe('mapSanitySkill', () => {
    it('correctly maps skills with proficiency', () => {
      const result = mapSanitySkill({
        name: 'STM32',
        category: 'embedded',
        proficiency: 'expert',
      });

      expect(result.name).toBe('STM32');
      expect(result.category).toBe('embedded');
      expect(result.proficiency).toBe('expert');
    });

    it('defaults category to tools if unspecified', () => {
      const result = mapSanitySkill({ name: 'Oscilloscope' });
      expect(result.name).toBe('Oscilloscope');
      expect(result.category).toBe('tools');
    });
  });

  describe('mapSanityAchievement', () => {
    it('maps full achievement document', () => {
      const result = mapSanityAchievement({
        _id: 'ach-1',
        title: '2nd Prize, IN-SPACe Model Rocketry Competition',
        issuer: 'IN-SPACe',
        date: '2024-25',
        type: 'award',
        description: 'Flight telemetry performance award',
        credentialUrl: 'https://example.com/cert',
      });

      expect(result.id).toBe('ach-1');
      expect(result.title).toBe('2nd Prize, IN-SPACe Model Rocketry Competition');
      expect(result.issuer).toBe('IN-SPACe');
      expect(result.type).toBe('award');
      expect(result.description).toBe('Flight telemetry performance award');
      expect(result.credentialUrl).toBe('https://example.com/cert');
    });
  });

  describe('mapSanityProfile', () => {
    it('maps profile with socials, education, and sectionLabels', () => {
      const raw = {
        name: 'Shikha',
        greeting: 'hi, shikha here.',
        title: 'ECE Engineer',
        intro: 'Engineering bio',
        location: 'Kanpur, India',
        email: 'shikha.y0603@gmail.com',
        currentTechnologies: ['Embedded C', 'STM32'],
        socials: [{ label: 'GitHub', url: 'https://github.com/shikha92366', icon: 'github' }],
        education: [
          {
            school: 'PSIT Kanpur',
            degree: 'B.Tech ECE',
            period: '2023 - Present',
            score: '78.6%',
          },
        ],
        sectionLabels: {
          software: 'embedded & ai',
          hardware: 'avionics & pcb',
        },
      };

      const result = mapSanityProfile(raw);

      expect(result.name).toBe('Shikha');
      expect(result.email).toBe('shikha.y0603@gmail.com');
      expect(result.currentTechnologies).toEqual(['Embedded C', 'STM32']);
      expect(result.socials).toHaveLength(1);
      expect(result.education).toHaveLength(1);
      expect(result.sectionLabels.software).toBe('embedded & ai');
      expect(result.sectionLabels.hardware).toBe('avionics & pcb');
    });

    it('provides fallback section labels if not provided', () => {
      const result = mapSanityProfile({ name: 'Shikha' });
      expect(result.sectionLabels).toEqual({
        software: 'embedded & ai',
        hardware: 'avionics & pcb',
      });
    });
  });
});

describe('CMS edge cases', () => {
  it('accepts null records without crashing', () => {
    expect(mapSanityProject(null).gallery).toEqual([]);
    expect(mapSanityProfile(null).education).toEqual([]);
    expect(mapSanityExperience(null).bullets).toEqual([]);
    expect(mapSanityAchievement(null).title).toBeTruthy();
    expect(mapSanitySkill(null).name).toBe('');
  });
  it('preserves rich text and image accessibility metadata', () => {
    const blocks = [{ _type: 'block', _key: 'one', children: [{ _type: 'span', text: 'Hello' }] }];
    const project = mapSanityProject({ overview: blocks, coverImage: { alt: 'PCB' }, gallery: [] });
    expect(project.overview).toEqual(blocks); expect(project.coverImageAlt).toBe('PCB');
  });
  it('rejects executable URLs and normalizes unknown select values', () => {
    expect(resolveImageUrl('javascript:alert(1)')).toBe('');
    expect(mapSanityProject({ githubUrl: 'javascript:alert(1)', category: 'bad' }).githubUrl).toBeUndefined();
    expect(mapSanitySkill({ category: 'bad', proficiency: 'bad' })).toMatchObject({ category: 'tools', proficiency: undefined });
  });
});
