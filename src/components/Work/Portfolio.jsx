import React from 'react'
import ProjectCard from './ProjectCard'
import './Work.css'

// 📸 Screenshot imports
import screenshot1 from '../../assets/pix/Screenshot1.png'
import screenshot2 from '../../assets/pix/Screenshot2.png'
import screenshot3 from '../../assets/pix/Screenshot3.png'
import screenshot9 from '../../assets/pix/Screenshot9.png'
import screenshot12 from '../../assets/pix/Screenshot12.png'
import screenshot13 from '../../assets/pix/Screenshot13.png'

// 💼 Project data
const projects = [
  {
    id: 1,
    description: 'HTML Portfolio (Project 1)',
    repoLink: 'https://github.com/PHTMGatt/01-HTML',
    renderLink: 'https://zero1-html.onrender.com',
    screenshot: screenshot1,
  },
  {
    id: 2,
    description: 'Advanced CSS Grid/Flex (Project 2)',
    repoLink: 'https://github.com/PHTMGatt/02-CSS',
    renderLink: 'https://zero2-css.onrender.com',
    screenshot: screenshot2,
  },
  {
    id: 3,
    description: 'JavaScript Quiz/Game (Project 3)',
    repoLink: 'https://github.com/PHTMGatt/03-JavaScript-Game',
    renderLink: 'https://zero3-js.onrender.com',
    screenshot: screenshot3,
  },
  {
    id: 7,
    description: 'React Portfolio Showcase (Project 7)',
    repoLink: 'https://github.com/PHTMGatt/07-React-Portfolio',
    renderLink: 'https://zero7-portfolio.onrender.com',
    screenshot: screenshot9,
  },
  {
    id: 12,
    description: 'Weather Dashboard - Server/API (Project 12)',
    repoLink: 'https://github.com/PHTMGatt/12-Weather-API',
    renderLink: 'https://zero12-weather.onrender.com',
    screenshot: screenshot12,
  },
  {
    id: 13,
    description: 'Candidate Search React App (Project 13)',
    repoLink: 'https://github.com/PHTMGatt/13-Candidate-Search',
    renderLink: 'https://one3-candidate-search-u82d.onrender.com',
    screenshot: screenshot13,
  },
]

const Portfolio = () => {
  return (
    <section className="portfolio-section fade-in">
      <h1 className="portfolio-title">My Projects</h1>
      <div className="work-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            description={project.description}
            repoLink={project.repoLink}
            renderLink={project.renderLink}
            screenshot={project.screenshot}
          />
        ))}
      </div>
    </section>
  )
}

export default Portfolio
