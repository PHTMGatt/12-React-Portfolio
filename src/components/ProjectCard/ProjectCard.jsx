import PropTypes from 'prop-types';
import './ProjectCard.css';

const ProjectCard = ({ description, repoLink, renderLink, liveLabel = 'Live Site', screenshot, status, inactive = false, inactiveLabel = 'Inactive' }) => {
  return (
    <div className={`project-card${inactive ? ' project-card--inactive' : ''}`}>
      <div className="project-image-wrap">
        <img src={screenshot} alt={description} loading="lazy" decoding="async" />
        {inactive && <span className="project-inactive-overlay">INACTIVE</span>}
      </div>
      <div className={`project-description${inactive ? ' project-description--inactive' : ''}`}>
        {description}
      </div>
      {status && <div className={`project-status${inactive ? ' project-status--inactive' : ''}`}>{status}</div>}
      <div className="project-links">
        {inactive && <span className="project-card__inactive" aria-disabled="true">{inactiveLabel}</span>}
        {renderLink && !inactive && (
          <a href={renderLink} target="_blank" rel="noopener noreferrer">
            {liveLabel}
          </a>
        )}
        <a href={repoLink} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  description: PropTypes.string.isRequired,
  repoLink: PropTypes.string.isRequired,
  renderLink: PropTypes.string,
  liveLabel: PropTypes.string,
  screenshot: PropTypes.string.isRequired,
  status: PropTypes.string,
  inactive: PropTypes.bool,
  inactiveLabel: PropTypes.string,
};

export default ProjectCard;
