import { Profile } from '../types';

export const profile: Profile = {
  name: 'Shikha',
  greeting: 'hi, shikha here.',
  title: 'ECE Engineer | Embedded Systems, Avionics, IoT, PCB Design',
  intro: 'ECE undergraduate in Kanpur who designs embedded firmware, custom PCBs and RF telemetry for rockets, CanSats and IoT systems. I like turning raw sensor data into reliable decisions on real hardware.',
  location: 'Kanpur, India',
  currentTechnologies: [
    'Embedded C / C++',
    'Python',
    'STM32',
    'ESP32',
    'Raspberry Pi Pico 2',
    'KiCad / EasyEDA',
    'FreeRTOS (basics)',
    'LoRa / XBee telemetry',
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/shikha92366', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/shikha-shikha-30b9aa325', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:shikha.y0603@gmail.com', icon: 'mail' },
  ],
  email: 'shikha.y0603@gmail.com',
  education: [
    {
      school: 'Pranveer Singh Institute of Technology, Kanpur',
      degree: 'B.Tech, Electronics & Communication Engineering',
      period: '2023 - Present',
      score: '78.6%',
    },
    {
      school: 'Kendriya Vidyalaya Sangathan',
      degree: 'Class XII (CBSE)',
      period: '2022 - 2023',
      score: '77%',
    },
    {
      school: 'Kendriya Vidyalaya Sangathan',
      degree: 'Class X (CBSE)',
      period: '2020 - 2021',
      score: '89.2%',
    },
  ],
  sectionLabels: {
    software: 'embedded & ai',
    hardware: 'avionics & pcb',
  },
};
