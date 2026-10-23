import PropTypes from 'prop-types';
import './ProjectCard.css';

const ProjectCard = ({
  description,
  repoLink,
  renderLink,
  screenshot,
  status,
  inactive = false,
  legacy = false,
}) => {
  const stateLabel = inactive ? 'INACTIVE' : legacy ? 'LEGACY' : null;

  return (
    <article className={`project-card${inactive ? ' project-card--inactive' : ''}${legacy ? ' project-card--legacy' : ''}`}>
      <div className="project-image-wrap">
        {screenshot ? (
          <img src={screenshot} alt={`${description} project screenshot`} loading="lazy" />
        ) : (
          <div className="project-image-placeholder" role="img" aria-label={`${description} screenshot pending`}>
            <span>Authentic screenshot pending</span>
            <strong>{description}</strong>
          </div>
        )}
        {stateLabel && <span className={`project-state-overlay project-state-overlay--${stateLabel.toLowerCase()}`}>{stateLabel}</span>}
      </div>

      <div className={`project-description${inactive ? ' project-description--inactive' : ''}`}>
        {description}
      </div>
      {status && <div className={`project-status${inactive ? ' project-status--inactive' : ''}`}>{status}</div>}

      <div className="project-links">
        <a className="project-link project-link--primary" href={repoLink} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {renderLink && (
          <a className="project-link" href={renderLink} target="_blank" rel="noopener noreferrer">
            Live Site
          </a>
        )}
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  description: PropTypes.string.isRequired,
  repoLink: PropTypes.string.isRequired,
  renderLink: PropTypes.string,
  screenshot: PropTypes.string,
  status: PropTypes.string,
  inactive: PropTypes.bool,
  legacy: PropTypes.bool,
};

export default ProjectCard;
