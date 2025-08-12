import React from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Portfolio.css';

// Image imports
import ZHub from '../../assets/Pictures/ZHub.png';
import DailyBytes from '../../assets/Pictures/DailyBytes.png';
import FairwayFinder from '../../assets/Pictures/FairwayFinder.png';
import CandiSearch from '../../assets/Pictures/CandiSearch.png';
import DE from '../../assets/Pictures/DE.png';
import GK from '../../assets/Pictures/GK.png';
import MOTD from '../../assets/Pictures/MOTD.png';
import Origins from '../../assets/Pictures/Origins.png';
import REV from '../../assets/Pictures/REV.png';
import WeatherApp from '../../assets/Pictures/Screenshot9New.png';
import ZNS from '../../assets/Pictures/ZETZ.png';
import MERNBook from '../../assets/Pictures/MERN_Book_Search.png';
import AdvancedCSSImg from '../../assets/Pictures/Challenge2New.jpg';

// Final project list (top 3 pinned, rest alphabetical)
const projects = [
  // Pinned
  {
    id: 'zombies-hub',
    description: 'Zombies Hub',
    repoLink: 'https://github.com/PHTMGatt/Zombies-Hub',
    renderLink: 'https://zombies-hub.onrender.com',
    screenshot: ZHub,
  },
  {
    id: 'daily-bytes',
    description: 'Daily Bytes',
    repoLink: 'https://github.com/PHTMGatt/The-Daily-Bytes',
    renderLink: 'https://the-daily-bytes-o4jo.onrender.com',
    screenshot: DailyBytes,
  },
  {
    id: 'fairway-finder',
    description: 'Fairway Finder',
    repoLink: 'https://github.com/PHTMGatt/Fairway-Finder',
    renderLink: 'https://fairway-finder.onrender.com',
    screenshot: FairwayFinder,
  },

  // Alphabetical
  {
    id: 'advanced-css',
    description: 'Advanced CSS',
    repoLink: 'https://github.com/PHTMGatt/02-Advanced-CSS',
    renderLink: 'https://zero2-advanced-css.onrender.com',
    screenshot: AdvancedCSSImg,
  },
  {
    id: 'candidate-search',
    description: 'Candidate Search',
    repoLink: 'https://github.com/PHTMGatt/13-Candidate-Search',
    renderLink: 'https://one3-candidate-search-u82d.onrender.com',
    screenshot: CandiSearch,
  },
  {
    id: 'de',
    description: 'Der Eisendrache',
    repoLink: 'https://github.com/PHTMGatt/Der-Eisendrache-Guide',
    renderLink: 'https://der-eisendrache-guide.onrender.com',
    screenshot: DE,
  },
  {
    id: 'gk',
    description: 'Gorod Krovi',
    repoLink: 'https://github.com/PHTMGatt/Gorod-Krovi-Guide',
    renderLink: 'https://gorod-krovi-guide.onrender.com',
    screenshot: GK,
  },
  {
    id: 'mern-book-search',
    description: 'MERN Book Search Engine',
    repoLink: 'https://github.com/PHTMGatt/18-MERN-Book-Search-Engine',
    renderLink: 'https://one8-mern-book-search-engine.onrender.com',
    screenshot: MERNBook,
  },
  {
    id: 'motd',
    description: 'Mob of the Dead',
    repoLink: 'https://github.com/PHTMGatt/MOTD-Guide',
    renderLink: 'https://motd-guide.onrender.com',
    screenshot: MOTD,
  },
  {
    id: 'origins',
    description: 'Origins Guide',
    repoLink: 'https://github.com/PHTMGatt/Origins-Guide',
    renderLink: 'https://origins-wtyd.onrender.com',
    screenshot: Origins,
  },
  {
    id: 'rev',
    description: 'Revelations',
    repoLink: 'https://github.com/PHTMGatt/Revelations-Guide',
    renderLink: 'https://revelations-guide.onrender.com',
    screenshot: REV,
  },
  {
    id: 'weather-app',
    description: 'Weather App',
    repoLink: 'https://github.com/PHTMGatt/12-Weather-API',
    renderLink: 'https://zero9-servers-and-apis.onrender.com',
    screenshot: WeatherApp,
  },
  {
    id: 'zns',
    description: 'Zetsubou No Shima',
    repoLink: 'https://github.com/PHTMGatt/Zetsubou-Guide',
    renderLink: 'https://zetsubou-guide.onrender.com',
    screenshot: ZNS,
  },
];

const Portfolio = () => {
  return (
    <section className="portfolio-section fade-in">
      <div className="portfolio-header">
        <h1 className="portfolio-title">My Projects</h1>
        <p className="portfolio-subtext">A collection of my work — clean, functional, and built with care.</p>
      </div>
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
  );
};

export default Portfolio;
