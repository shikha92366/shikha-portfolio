import { defineType, defineField } from 'sanity';

export const hardwareDetails = defineType({
  name: 'hardwareDetails',
  title: 'Hardware & Circuit Details',
  type: 'object',
  description: 'Technical hardware and circuit specifications for hardware projects.',
  fields: [
    defineField({
      name: 'mcu',
      title: 'Microcontroller / SoC',
      type: 'string',
      description: 'Primary processor or dual-MCU configuration (e.g. "Raspberry Pi Pico 2 + Arduino Nano 33 BLE").',
    }),
    defineField({
      name: 'sensors',
      title: 'Sensors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Sensors integrated into the design (e.g. "BNO085 IMU", "BMP390 barometer").',
    }),
    defineField({
      name: 'communication',
      title: 'Communication & Telemetry Buses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Protocols and radios (e.g. "XBee S3B Pro", "UART", "SPI", "I2C", "LoRa").',
    }),
    defineField({
      name: 'pcbSpecs',
      title: 'PCB Specifications',
      type: 'text',
      rows: 2,
      description: 'Layer count, CAD tool used, dimensions, and power regulation design.',
    }),
  ],
});
