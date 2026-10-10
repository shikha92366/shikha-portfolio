export interface Profile {
  name: string;
  greeting: string; // e.g. "hi, [name] here."
  title: string; // ECE Engineer | Embedded, IoT, AI/ML, PCB
  intro: string; // 2-3 conversational sentences
  location: string;
  currentTechnologies: string[]; // shown in the "technologies I've been working with" list
  socials: { label: string; url: string; icon: string }[];
  email: string;
  education: { school: string; degree: string; period: string; score: string }[];
  sectionLabels: { software: string; hardware: string }; // lets us rename the two gallery sections
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string | 'Present';
  bullets: string[]; // impact-focused, measurable
  techStack?: string[];
}

export interface ProjectDocument {
  label: string; // "Final Report", "Schematic", "BOM", "Datasheet notes"
  type: 'pdf' | 'image' | 'link' | 'csv';
  url: string; // /docs/[slug]/file.pdf or external
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string; // one line for cards
  domain: 'software' | 'hardware';
  category: 'embedded' | 'iot' | 'ai-ml' | 'pcb-design' | 'software';
  techStack: string[]; // rendered as uppercase tags
  role: string;
  timeline: string;
  featured: boolean;
  status: 'completed' | 'in-progress';
  awards?: string[];
  team?: string; // e.g. "Team Sudarshan (6 members)"
  coverImage: string;
  // --- documentation page content ---
  overview: string; // problem + goal (markdown)
  architecture?: string; // block diagram image path or mermaid source
  hardwareDetails?: { // for hardware projects
    mcu?: string;
    sensors?: string[];
    communication?: string[]; // I2C, SPI, UART, MQTT, LoRa, BLE...
    pcbSpecs?: string; // layers, tool (KiCad/Altium), dimensions
  };
  implementation: string; // how it was built (markdown)
  results: string[]; // measurable outcomes
  challenges?: string[]; // problems hit + how solved
  gallery: string[]; // photos, PCB renders, screenshots
  documents: ProjectDocument[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
}

export interface Skill {
  category: 'embedded' | 'iot' | 'ai-ml' | 'pcb-design' | 'software' | 'tools';
  name: string;
  proficiency?: 'familiar' | 'proficient' | 'expert';
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'certification' | 'award' | 'publication' | 'competition';
  description?: string;
  credentialUrl?: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
}

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  fields?: Record<string, string[]>;
}
