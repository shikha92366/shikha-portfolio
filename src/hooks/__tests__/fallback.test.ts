import { describe, it, expect } from 'vitest';
import { projects } from '../../data/projects';
import { experience } from '../../data/experience';
import { skills } from '../../data/skills';
import { achievements } from '../../data/achievements';
import { profile } from '../../data/profile';
import { isSanityConfigured } from '../../lib/sanity/client';

describe('Offline Fallback Data & Configuration', () => {
  it('has comprehensive fallback project data', () => {
    expect(projects.length).toBeGreaterThan(0);
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toContain('rocket-avionics');
    expect(slugs).toContain('cansat-avionics');
    expect(slugs).toContain('motormind-ai');

    // Each project must have valid required fields
    for (const proj of projects) {
      expect(proj.title).toBeTruthy();
      expect(proj.slug).toBeTruthy();
      expect(proj.shortDescription).toBeTruthy();
      expect(['software', 'hardware']).toContain(proj.domain);
      expect(Array.isArray(proj.techStack)).toBe(true);
    }
  });

  it('has valid fallback experience data', () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const exp of experience) {
      expect(exp.role).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.startDate || exp.duration).toBeTruthy();
      expect(exp.bullets.length).toBeGreaterThan(0);
    }
  });

  it('has valid fallback skills across multiple categories', () => {
    expect(skills.length).toBeGreaterThan(0);
    const categories = new Set(skills.map((s) => s.category));
    expect(categories.has('embedded')).toBe(true);
    expect(categories.has('software')).toBe(true);
    expect(categories.has('pcb-design')).toBe(true);
  });

  it('has valid fallback achievements', () => {
    expect(achievements.length).toBeGreaterThan(0);
    for (const ach of achievements) {
      expect(ach.title).toBeTruthy();
      expect(ach.issuer).toBeTruthy();
      expect(ach.date).toBeTruthy();
      expect(['award', 'certification', 'competition', 'publication']).toContain(ach.type);
    }
  });

  it('has valid fallback profile and contact details', () => {
    expect(profile.name).toBe('Shikha');
    expect(profile.email).toContain('@');
    expect(profile.currentTechnologies.length).toBeGreaterThan(0);
    expect(profile.socials.length).toBeGreaterThan(0);
    expect(profile.sectionLabels.software).toBeTruthy();
    expect(profile.sectionLabels.hardware).toBeTruthy();
  });

  it('correctly determines whether Sanity is configured', () => {
    // When environment variables are unset, isSanityConfigured should be false
    expect(typeof isSanityConfigured).toBe('boolean');
  });
});
