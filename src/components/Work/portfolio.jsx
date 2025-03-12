import React from 'react' 
import index from './index'
import './style.css'

const previousWorks = [
    {
      id: 1,
      description: 'Project 1 - HTML',
      link: 'https://github.com/PHTMGatt/01-HTML',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      description: 'Project 2 - ADVANCED CSS',
      link: 'https://github.com/PHTMGatt/02-Advanced-CSS',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      description: 'Project 3 - JAVASCRIPT',
      link: 'https://github.com/PHTMGatt/03-JavaScript',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      description: 'Project 4 - WEB APIS',
      link: 'https://github.com/PHTMGatt/04-Web-API',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      description: 'Project 5 - GROUP PROJECT 1',
      link: 'https://github.com/Halluc1nations/Project-1-Group-5',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      description: 'Project 6 - N/A',
      link: 'https://example.com/project6',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      description: 'Project 7 - NODEJS',
      link: 'https://github.com/PHTMGatt/07-Readme-Gen',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
      id: 8,
      description: 'Project 8 - TS & OOP',
      link: 'https://github.com/PHTMGatt/08-Car-Truck-Motorbike',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
      id: 9,
      description: 'Project 9 - SERVERS AND APIS',
      link: 'https://github.com/PHTMGatt/09-Weather-App',
      screenshot: 'https://via.placeholder.com/150',
    },
    {
    id: 10,
    description: 'Project 10 - SQL',
    link: 'https://github.com/PHTMGatt/10-Employee-Tracker',
    screenshot: 'https://via.placeholder.com/150',
  },
]

const Work = () => {
  return (
    <div className="work-grid">
      {previousWorks.map((work) => (
        <WorkItem
          key={work.id}
          description={work.description}
          link={work.link}
          screenshot={work.screenshot}
        />
      ))}
    </div>
  )
}

export default Work