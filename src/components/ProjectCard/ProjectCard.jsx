import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectImage from '../ProjectImage/ProjectImage';
import { categories } from '../../data/projects';
import './ProjectCard.css';

const categoryLabel = (id) => categories.find((c) => c.id === id)?.label ?? id;

const ProjectCard = ({ project }) => {
  const { title, summary, category, stack, image, links, caseStudy } = project;

  return (
    <article className="project-card">
      <div className="project-card__media">
        <ProjectImage
          image={image}
          alt={`${title} preview`}
          sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 45vw, 360px"
        />
        {caseStudy && <span className="project-card__badge">Case study</span>}
      </div>

      <div className="project-card__body">
        <p className="project-card__category">{categoryLabel(category)}</p>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__summary">{summary}</p>
        <ul className="chip-list" aria-label={`${title} technologies`}>
          {stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-card__actions">
        {caseStudy && (
          <Link
            to={`/work/${caseStudy}`}
            className="btn btn-primary btn-sm"
            aria-label={`Read the ${title} case study`}
          >
            Case study
          </Link>
        )}
        {links.live && (
          <a className="btn btn-secondary btn-sm" href={links.live} target="_blank" rel="noopener noreferrer">
            Live site
            <ArrowUpRight size={15} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {links.video && (
          <a className="btn btn-secondary btn-sm" href={links.video} target="_blank" rel="noopener noreferrer">
            <PlayCircle size={15} aria-hidden="true" />
            Walkthrough
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        <a
          className="btn btn-ghost btn-sm project-card__code"
          href={links.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} source code on GitHub (opens in a new tab)`}
        >
          <FaGithub aria-hidden="true" />
          Code
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
