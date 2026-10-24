import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectImage from '../ProjectImage/ProjectImage';
import { categories } from '../../data/projects';
import './ProjectCard.css';

const categoryLabel = (id) => categories.find((c) => c.id === id)?.label ?? id;

const statusLabels = {
  legacy: { text: 'Legacy', title: 'Finished coursework project with no live deployment' },
  paused: { text: 'Paused', title: 'Development is on hold; source remains on GitHub' },
  inactive: { text: 'Inactive', title: 'Not currently running; source remains on GitHub' },
};

const ProjectCard = ({ project }) => {
  const { title, summary, category, stack, image, links, caseStudy, status, statusNote } = project;
  const statusLabel = statusLabels[status];

  return (
    <article className="project-card">
      <div className="project-card__media">
        <ProjectImage
          image={image}
          alt={`Screenshot of ${title}`}
          sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 45vw, 360px"
          title={title}
          stack={stack}
          summary={summary}
        />
        {caseStudy && <span className="project-card__badge">Case study</span>}
      </div>

      <div className="project-card__body">
        <p className="project-card__category">
          {categoryLabel(category)}
          {statusLabel && (
            <span className="status-tag" title={statusLabel.title}>
              {statusLabel.text}
            </span>
          )}
        </p>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__summary">{summary}</p>
        {statusNote && <p className="project-card__note">{statusNote}</p>}
        <ul className="chip-list" aria-label={`${title} technologies`}>
          {stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-card__actions">
        <a
          className="btn btn-secondary btn-sm project-card__code"
          href={links.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} source code on GitHub (opens in a new tab)`}
        >
          <FaGithub aria-hidden="true" />
          GitHub
        </a>
        {links.live && (
          <a
            className="btn btn-secondary btn-sm"
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} live site (opens in a new tab)`}
          >
            Live
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
        {links.video && (
          <a className="btn btn-ghost btn-sm" href={links.video} target="_blank" rel="noopener noreferrer">
            <PlayCircle size={15} aria-hidden="true" />
            Walkthrough
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {caseStudy && (
          <Link
            to={`/work/${caseStudy}`}
            className="btn btn-primary btn-sm project-card__study"
            aria-label={`Read the ${title} case study`}
          >
            Case study
          </Link>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
