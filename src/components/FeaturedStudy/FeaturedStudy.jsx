import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ProjectImage from '../ProjectImage/ProjectImage';
import './FeaturedStudy.css';

const FeaturedStudy = ({ study, index = 0, eager = false, headingLevel = 3 }) => {
  const Heading = `h${headingLevel}`;
  const primary = study.links.find((link) => link.primary);
  const isLive = primary && !primary.href.includes('github.com');

  return (
    <article className={`featured-study${index % 2 ? ' featured-study--flip' : ''}`}>
      <Link to={`/work/${study.slug}`} className="featured-study__media" tabIndex={-1} aria-hidden="true">
        <ProjectImage
          image={study.image}
          alt=""
          eager={eager}
          sizes="(max-width: 900px) calc(100vw - 2rem), 620px"
        />
      </Link>

      <div className="featured-study__content">
        <p className="eyebrow">{study.kicker}</p>
        <Heading className="featured-study__title">
          <Link to={`/work/${study.slug}`}>{study.title}</Link>
        </Heading>
        <p className="featured-study__tagline">{study.tagline}</p>
        <p className="featured-study__role">
          <span>My role</span>
          {study.role}
        </p>

        <dl className="featured-study__stats">
          {study.highlights.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>

        <ul className="chip-list" aria-label={`${study.title} technologies`}>
          {study.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="featured-study__actions">
          <Link to={`/work/${study.slug}`} className="btn btn-primary">
            Read the case study
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          {isLive && (
            <a className="btn btn-secondary" href={primary.href} target="_blank" rel="noopener noreferrer">
              Live site
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default FeaturedStudy;
