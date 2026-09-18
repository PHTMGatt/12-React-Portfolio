import PropTypes from 'prop-types';
import './ProjectCard.css';

const ProjectCard = ({ description, repoLink, renderLink, screenshot, status, inactive = false }) => {
  return (
    <div className={`project-card${inactive ? ' project-card--inactive' : ''}`}>
      <div className="project-image-wrap">
        <img src={screenshot} alt={description} />
        {inactive && <span className="project-inactive-overlay">INACTIVE</span>}
      </div>
      <div className={`project-description${inactive ? ' project-description--inactive' : ''}`}>
        {description}
      </div>
      {status && <div className={`project-status${inactive ? ' project-status--inactive' : ''}`}>{status}</div>}
      <div className="project-links">
        {renderLink && (
          <a href={renderLink} target="_blank" rel="noopener noreferrer">
            Live Site
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
  screenshot: PropTypes.string.isRequired,
  status: PropTypes.string,
  inactive: PropTypes.bool,
};

export default ProjectCard;
