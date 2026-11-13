import type { ReactNode } from 'react';
const sections: Record<string, {number: string; label: string; heading: string}> = {
  'about me': {number:'02',label:'About',heading:'The person behind the projects'},
  experience: {number:'03',label:'Experience',heading:'Where I have contributed'},
  skills: {number:'04',label:'Toolkit',heading:'Tools I work with'},
  achievements: {number:'05',label:'Milestones',heading:'Awards & recognition'},
  contact: {number:'06',label:'Contact',heading:'Start a conversation'},
};
export function SectionHeading({id,title,action,className=''}:{id?:string;title:string;action?:ReactNode;className?:string}) {
  const section=sections[title];
  return <div id={id} className={`section-heading ${className}`}><div>{section && <p className="eyebrow"><span>{section.number}</span>{section.label}</p>}<h2>{section?.heading || title}</h2></div>{action && <div className="section-action">{action}</div>}</div>;
}
export default SectionHeading;
