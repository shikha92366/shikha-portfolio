import { SectionHeading } from '../layout/SectionHeading';
import { skills } from '../../data/skills';

export function SkillsSection() {
  // Group skills logically
  const programmingSkills = skills.filter((s) => s.category === 'software');
  const embeddedSkills = skills.filter(
    (s) =>
      s.category === 'embedded' &&
      !['STM32', 'ESP32', 'Raspberry Pi Pico 2', 'Arduino Nano 33 BLE Sense Rev 2'].includes(s.name)
  );
  const boards = skills.filter((s) =>
    ['STM32', 'ESP32', 'Raspberry Pi Pico 2', 'Arduino Nano 33 BLE Sense Rev 2'].includes(s.name)
  );
  const pcbSkills = skills.filter((s) => s.category === 'pcb-design');
  const iotSkills = skills.filter((s) => s.category === 'iot');
  const toolsAndLab = skills.filter((s) => s.category === 'tools');

  const skillGroups = [
    { title: 'Programming & Firmware', items: programmingSkills },
    { title: 'Embedded Protocols & RTOS', items: embeddedSkills },
    { title: 'Target Microcontrollers & Boards', items: boards },
    { title: 'PCB Design & EDA', items: pcbSkills },
    { title: 'Telemetry & IoT Comms', items: iotSkills },
    { title: 'Electronics & Lab Instrumentation', items: toolsAndLab },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24">
      <SectionHeading title="skills" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="panel-card rounded-xl p-6 border border-[#233554] bg-[#112240] flex flex-col"
          >
            <h3 className="text-sm font-bold text-[#ccd6f6] uppercase tracking-wider font-mono mb-4 pb-2 border-b border-[#233554]/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#64ffda]" />
              <span>{group.title}</span>
            </h3>

            <ul className="space-y-2 text-sm font-mono text-[#8892b0]">
              {group.items.map((skill) => (
                <li key={skill.name} className="flex items-center gap-2.5 text-[#ccd6f6]/90 hover:text-[#64ffda] transition-colors">
                  <span className="text-[#64ffda] text-xs">▹</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
