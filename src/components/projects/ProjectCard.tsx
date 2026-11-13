import { Link } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../../types';
import { interfaceCopy as copy } from '../../data/interface';
interface ProjectCardProps { project: Project; variant?: 'folder' | 'image-top' | 'feature' }
export function ProjectCard({ project, variant='image-top' }: ProjectCardProps) {
  return <article className={`project-card ${variant==='feature'?'project-feature':''}`}>
    <Link to={`/projects/${project.slug}`} className="project-image" aria-label={`Read ${project.title}`}>
      {project.coverImage && <img src={project.coverImage} alt={project.coverImageAlt || project.title} loading="lazy" width={900} height={560}/>}
      <span className="project-category">{project.category.replace('ai-ml','AI / ML').replace('pcb-design','PCB design')}</span>
      <span className="project-image-arrow"><ArrowUpRight size={22}/></span>
    </Link>
    <div className="project-body"><div className="project-meta"><span>{project.domain} / {project.timeline}</span><span className={project.status==='in-progress'?'status-active':''}>{project.status==='in-progress'?'In progress':'Completed'}</span></div>
      <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.shortDescription}</p>
      <div className="project-tags">{project.techStack.slice(0,5).map(t=><span key={t}>{t}</span>)}</div>
      <div className="project-card-bottom"><Link to={`/projects/${project.slug}`} className="text-link">{copy.caseStudy}<ArrowUpRight size={16}/></Link>{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}><Github size={18}/></a>}</div>
    </div>
  </article>;
}
export default ProjectCard;
