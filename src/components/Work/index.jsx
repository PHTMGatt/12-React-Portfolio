import React from 'react'

const WorkItem = ({screenshot, description, link}) => {
  return (
    <div className="grid-item">
    <img src={screenshot} alt={description} className="screenshot" />
    <h3>{description}</h3>
    <a href={link} target="_blank" rel="noopener noreferrer">
      View Project
    </a>
  </div>
  )
}

export default WorkItem