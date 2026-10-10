import { Skill } from '../types';

export const skills: Skill[] = [
  // programming
  ...['C', 'C++', 'Embedded C', 'Python'].map((name) => ({
    category: 'software' as const,
    name,
  })),

  // embedded
  ...[
    'Microcontroller programming',
    'GPIO',
    'ADC',
    'PWM',
    'Timers',
    'Interrupt handling',
    'UART',
    'SPI',
    'I2C',
    'FreeRTOS (basics)',
  ].map((name) => ({
    category: 'embedded' as const,
    name,
  })),

  // boards
  ...['STM32', 'ESP32', 'Raspberry Pi Pico 2', 'Arduino Nano 33 BLE Sense Rev 2'].map(
    (name) => ({
      category: 'embedded' as const,
      name,
    })
  ),

  // electronics
  ...[
    'Analog electronics',
    'Digital electronics',
    'Circuit design',
    'Component selection',
    'Hardware debugging',
    'Hardware testing',
  ].map((name) => ({
    category: 'tools' as const,
    name,
  })),

  // pcb
  ...[
    'Schematic capture',
    'PCB layout',
    'EasyEDA',
    'KiCad',
    'Design Rule Check (DRC)',
    'BOM preparation',
  ].map((name) => ({
    category: 'pcb-design' as const,
    name,
  })),

  // comms & iot
  ...[
    'XBee',
    'LoRa',
    'GPS',
    'RF telemetry',
    'Sensor integration',
    'Serial communication',
    'IoT systems',
  ].map((name) => ({
    category: 'iot' as const,
    name,
  })),

  // tools
  ...[
    'STM32CubeIDE',
    'Arduino IDE',
    'MATLAB',
    'Simulink',
    'Multisim',
    'XCTU',
    'Oscilloscope',
    'Digital multimeter',
    'Git',
    'GitHub',
  ].map((name) => ({
    category: 'tools' as const,
    name,
  })),
];
