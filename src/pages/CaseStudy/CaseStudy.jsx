import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectImage from '../../components/ProjectImage/ProjectImage';
import NotFound from '../NotFound/NotFound';
import { caseStudies, getCaseStudy } from '../../data/projects';
import usePageTitle from '../../hooks/usePageTitle';
import './CaseStudy.css';

const CaseStudy = () => {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  usePageTitle(study ? `${study.title} case study` : 'Page not found');

  if (!study) return <NotFound />;

  const position = caseStudies.indexOf(study);
  const next = caseStudies[(position + 1) % caseStudies.length];

  return (
    <article className="case-study page-enter">
      <header className="container case-study__header">
        <Link to="/work" className="case-study__back">
          <ArrowLeft size={16} aria-hidden="true" />
          All work
        </Link>
        <p className="eyebrow">{study.kicker}</p>
        <h1 className="page-title">{study.title}</h1>
        <p className="case-study__tagline">{study.tagline}</p>

        <dl className="case-study__meta">
          <div>
            <dt>My role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>
              <ul className="chip-list">
                {study.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="case-study__links">
          {study.links.map((link) => {
            const isRepo = link.href.includes('github.com');
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${link.primary ? 'btn-primary' : 'btn-secondary'}`}
              >
                {isRepo && <FaGithub aria-hidden="true" />}
                {link.label}
                {!isRepo && <ArrowUpRight size={17} aria-hidden="true" />}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            );
          })}
        </div>
      </header>

      <div className="container">
        <figure className="case-study__hero">
          <ProjectImage
            image={study.image}
            alt={`Screenshot of ${study.title}`}
            eager
            sizes="(max-width: 1200px) calc(100vw - 2rem), 1160px"
            title={study.title}
            stack={study.stack}
            summary={study.tagline}
          />
        </figure>

        <dl className="case-study__stats">
          {study.highlights.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>

        <div className="case-study__body">
          <section aria-labelledby="problem-title">
            <h2 id="problem-title">The problem</h2>
            <p>{study.problem}</p>
          </section>

          <section aria-labelledby="approach-title">
            <h2 id="approach-title">What I built</h2>
            <ol className="case-study__steps">
              {study.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="outcome-title">
            <h2 id="outcome-title">The outcome</h2>
            <p>{study.outcome}</p>
          </section>

          {study.currentStatus && (
            <section aria-labelledby="status-title">
              <h2 id="status-title">Current status</h2>
              <p>{study.currentStatus}</p>
            </section>
          )}
        </div>

        {study.gallery && (
          <div className="case-study__gallery">
            {study.gallery.map((image) => (
              <figure key={image.src}>
                <ProjectImage image={image} alt={image.alt} sizes="(max-width: 760px) 100vw, 570px" />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <nav className="case-study__next" aria-label="More case studies">
          <Link to={`/work/${next.slug}`} className="next-study">
            <span className="next-study__label">Next case study</span>
            <span className="next-study__title">
              {next.title}
              <ArrowRight size={22} aria-hidden="true" />
            </span>
            <span className="next-study__tagline">{next.tagline}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
};

export default CaseStudy;
