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
    role: 'IoT & Robotics Workshop',
    company: 'PM SHRI Government Girls Higher Secondary School, Banda, Uttar Pradesh',
    startDate: '',
    endDate: '',
    duration: 'Three-day workshop',
    bullets: [
      'Participated in a three-day IoT & Robotics workshop introducing students to technology from the fundamentals.',
      'Conducted hands-on learning activities involving circuits, LEDs and sensors.',
      'Introduced basic coding and IoT concepts through demonstrations and practical activities.',
      'Encouraged curiosity, experimentation, problem-solving and student participation.',
    ],
    images: [
      { src: '/images/experience/iot-workshop-banda-1.jpg', alt: 'Students participating in a hands-on robotics demonstration at PM SHRI Government Girls Higher Secondary School, Banda', caption: 'Hands-on robotics demonstration' },
      { src: '/images/experience/iot-workshop-banda-2.jpg', alt: 'Students and workshop facilitators at PM SHRI Government Girls Higher Secondary School, Banda', caption: 'Workshop participants' },
    ],
  },
];
