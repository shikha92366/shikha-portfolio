import { Experience } from '../types';

export const experience: Experience[] = [
  {
    id: 'raman',
    role: 'Electrical Testing & Validation Intern',
    company: 'Raman Research & Innovation Pvt. Ltd.',
    startDate: 'Mar 2025',
    endDate: 'Jun 2025',
    bullets: [
      'Tested and validated electrical components, circuits and embedded subsystems for functional and system-level performance.',
      'Assisted with PCB assembly, circuit-level validation, sensor interfacing and hardware debugging.',
      'Contributed to IoT system development covering sensor integration, embedded hardware and subsystem integration.',
      'Prepared technical documentation and validation reports to support hardware testing and development.',
    ],
    techStack: ['PCB assembly', 'Sensor interfacing', 'Hardware debugging', 'IoT'],
  },
  {
    id: 'vyomnauts',
    role: 'Avionics & On-Board Computer Engineer',
    company: 'PSIT Vyomnauts (Team Sudarshan)',
    startDate: '2024',
    endDate: 'Present',
    bullets: [
      'On-board computer engineer for the IN-SPACe Model Rocketry entry; the team won 2nd Prize.',
      'Designed and integrated avionics around Raspberry Pi Pico 2 and Arduino Nano 33 BLE Sense Rev 2 for real-time sensing and telemetry.',
      'Avionics team member on the IN-SPACe CanSat entry, which won Best Design and Best Telemetry Data awards.',
    ],
    techStack: ['Raspberry Pi Pico 2', 'Arduino Nano 33 BLE', 'XBee', 'GPS', 'EasyEDA'],
  },
  {
    id: 'trainer',
    role: 'IoT & Robotics Workshop Trainer',
    company: 'College workshop (40+ students)',
    startDate: 'Jan 2026',
    endDate: 'Jan 2026',
    bullets: [
      'Trained 40+ students in IoT and robotics fundamentals through hands-on sessions.',
    ],
  },
];
