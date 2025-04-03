const ProjectCard = ({ description, repoLink, renderLink, screenshot }) => {
  return (
    <div className="project-card">
      <img src={screenshot} alt={description} />
      <div className="project-description">{description}</div>
      <div className="project-links">
        <a href={renderLink} target="_blank" rel="noopener noreferrer">
          Live Site
        </a>
        <a href={repoLink} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
