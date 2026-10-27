import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Archive, Info } from 'lucide-react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectImage from '../../components/ProjectImage/ProjectImage';
import { archivedProjects, caseStudies, categories, projects } from '../../data/projects';
import usePageTitle from '../../hooks/usePageTitle';
import './Portfolio.css';

const countFor = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length);

const Portfolio = () => {
  usePageTitle('Work');
  const [params, setParams] = useSearchParams();
  const requested = params.get('type');
  const active = categories.some((c) => c.id === requested) ? requested : 'all';
  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active);

  const selectCategory = (id) => {
    setParams(id === 'all' ? {} : { type: id }, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="work page-enter">
      <header className="page-header container">
        <p className="eyebrow">Work</p>
        <h1 className="page-title">Things I’ve designed, built and shipped</h1>
        <p className="section-lede work__lede">
          Full-stack apps, APIs, Discord automation and testing. Start with the case studies for the full story, or
          filter the complete list below.
        </p>
      </header>

      <section className="container" aria-labelledby="studies-title">
        <h2 id="studies-title" className="work__subheading">
          Case studies
        </h2>
        <div className="study-tiles">
          {caseStudies.map((study) => (
            <Link key={study.slug} to={`/work/${study.slug}`} className="study-tile">
              <div className="study-tile__media">
                <ProjectImage
                  image={study.image}
                  alt=""
                  sizes="(max-width: 760px) 100vw, 380px"
                  title={study.title}
                  stack={study.stack}
                  summary={study.tagline}
                />
              </div>
              <div className="study-tile__body">
                <p className="study-tile__kicker">{study.kicker}</p>
                <h3>{study.title}</h3>
                <p>{study.tagline}</p>
                <span className="text-link">
                  Read case study <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container work__all" aria-labelledby="all-title">
        <div className="work__toolbar">
          <h2 id="all-title" className="work__subheading">
            All projects
          </h2>
          <div className="filter-group" role="group" aria-label="Filter projects by type">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="filter-chip"
                aria-pressed={active === category.id}
                onClick={() => selectCategory(category.id)}
              >
                {category.label}
                <span className="filter-chip__count">{countFor(category.id)}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>

        <div className="work-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <p className="work__note">
          <Info size={16} aria-hidden="true" />
          Live demos run on free-tier hosting and can take up to a minute to wake up on the first visit.
        </p>

        <details className="archive">
          <summary>
            <Archive size={18} aria-hidden="true" />
            <span>
              Archive: the original Zombies map guides
              <small>{archivedProjects.length} inactive projects, superseded by Zombies Hub 2.0</small>
            </span>
          </summary>
          <div className="archive__body">
            <p>
              Before Zombies Hub 2.0, each map guide was its own React app and Render service. Those deployments are
              now offline because 2.0 merged them into one application, but the source and history remain on GitHub.
              The screenshots below were captured while they were still live.
            </p>
            <div className="work-grid archive__grid">
              {archivedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </details>
      </section>
    </div>
  );
};

export default Portfolio;
