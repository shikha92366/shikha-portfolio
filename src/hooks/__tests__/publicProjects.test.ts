import { describe, expect, it } from 'vitest';
import { projects } from '../../data/projects';
import { filterPublicProjects } from '../useSanityData';

describe('public project list', () => {
  it('hides only the two requested cards and updates the visible count', () => {
    const visibleProjects = filterPublicProjects(projects);

    expect(projects).toHaveLength(5);
    expect(visibleProjects).toHaveLength(3);
    expect(visibleProjects.map(project => project.slug)).toEqual([
      'rocket-avionics',
      'cansat-avionics',
      'motormind-ai',
    ]);
    expect(projects.map(project => project.slug)).toContain('lora-telemetry-node');
    expect(projects.map(project => project.slug)).toContain('stm32-smart-power-monitor');
  });
});
