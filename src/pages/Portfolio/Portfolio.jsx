import React, { useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Portfolio.css';

import CandidateSearch from '../../assets/Pictures/CandiSearch.png';
import DailyBytes from '../../assets/Pictures/DailyBytes.png';
import DerEisendrache from '../../assets/Pictures/DE.png';
import FairwayFinder from '../../assets/Pictures/FairwayFinder.png';
import GK from '../../assets/Pictures/GK.png';
import MernBookSearch from '../../assets/Pictures/MERN_Book_Search.png';
import MOTD from '../../assets/Pictures/MOTD.png';
import Origins from '../../assets/Pictures/Origins.png';
import ReactPortfolio from '../../assets/Pictures/ReactFolio.png';
import WeatherApp from '../../assets/Pictures/Screenshot9New.png';
import REV from '../../assets/Pictures/REV.png';
import ZNS from '../../assets/Pictures/ZETZ.png';
import ZHub from '../../assets/Pictures/ZHub.png';

const projects = [
  {
    id: 'zombies-hub-2',
    description: 'Zombies Hub 2.0',
    repoLink: 'https://github.com/PHTMGatt/Zombies-Hub-2.0',
    renderLink: 'https://zombies-hub-2-0.onrender.com/',
    status: 'Active flagship project — unified Zombies companion and quick-guide experience',
  },
  {
    id: 'daily-bytes',
    description: 'Daily Bytes',
    repoLink: 'https://github.com/PHTMGatt/The-Daily-Bytes',
    renderLink: 'https://the-daily-bytes-o4jo.onrender.com',
    screenshot: DailyBytes,
    status: 'Full-stack news and content application',
  },
  {
    id: 'fairway-finder',
    description: 'Fairway Finder',
    repoLink: 'https://github.com/PHTMGatt/Fairway-Finder',
    renderLink: 'https://fairway-finder.onrender.com',
    screenshot: FairwayFinder,
    status: 'Active full-stack golf trip and course-planning application',
  },
  {
    id: 'weather-app',
    description: 'Weather App',
    repoLink: 'https://github.com/PHTMGatt/09-Weather-App',
    renderLink: 'https://zero9-servers-and-apis.onrender.com',
    screenshot: WeatherApp,
    status: 'API-focused weather dashboard • Search • Forecast data',
  },
  {
    id: 'mern-book-search',
    description: 'MERN Book Search Engine',
    repoLink: 'https://github.com/PHTMGatt/18-MERN-Book-Search-Engine',
    renderLink: 'https://one8-mern-book-search-engine.onrender.com',
    screenshot: MernBookSearch,
    status: 'MERN • GraphQL • Authentication',
  },
  {
    id: 'todo-board',
    description: 'Kanban Board — JWT Authentication',
    repoLink: 'https://github.com/PHTMGatt/14-Todo-Board',
    renderLink: 'https://one4-todo-board.onrender.com',
    status: 'React • Node.js • JWT • Full Stack',
  },
  {
    id: 'portfolio',
    description: 'React Developer Portfolio',
    repoLink: 'https://github.com/PHTMGatt/12-React-Portfolio',
    screenshot: ReactPortfolio,
    status: 'React • Responsive UI • Project showcase',
  },
  {
    id: 'war-oracle',
    description: 'War Oracle — Clash of Clans War Bot',
    repoLink: 'https://github.com/PHTMGatt/War-Oracle-Bot',
    status: 'Discord.js • Clash of Clans API • Automated war intelligence',
  },
  {
    id: 'clash-commander',
    description: 'Clash Commander — Discord Operations Bot',
    repoLink: 'https://github.com/PHTMGatt/Clash-Commander-Bot',
    status: 'Paused project — Discord.js operations and safety tooling',
  },
  {
    id: 'raspbi-pilot',
    description: 'raspbi-pilot — Multi-Bot Runtime',
    repoLink: 'https://github.com/PHTMGatt/raspbi-pilot',
    status: 'Needs repair or retirement — Node.js multi-bot launcher',
    inactive: true,
  },
  {
    id: 'captain-hook',
    description: 'Captain Hook — GitHub → Discord WebHook Bot',
    repoLink: 'https://github.com/PHTMGatt/Discord-WebHook-Bot',
    renderLink: 'https://discord-webhook-bot-1f23.onrender.com/register',
    status: 'Webhooks • Discord • GitHub • GPT-assisted formatting',
  },
  {
    id: 'social-network-api',
    description: 'Social Network API',
    repoLink: 'https://github.com/PHTMGatt/17-Social-Network-API',
    status: 'Node.js • Express • MongoDB • Mongoose',
  },
  {
    id: 'tech-quiz-tests',
    description: 'Tech Quiz Automated Test Suite',
    repoLink: 'https://github.com/PHTMGatt/19-Testing-Tech-Quiz-Test-Suite',
    status: 'Cypress • Component testing • End-to-end testing',
  },
  {
    id: 'banking-system',
    description: 'Python Banking System',
    repoLink: 'https://github.com/PHTMGatt/22-Banking-System',
    status: 'Python • OOP • Validation • Account operations',
  },
  {
    id: 'candidate-search',
    description: 'Candidate Search',
    repoLink: 'https://github.com/PHTMGatt/13-Candidate-Search',
    renderLink: 'https://one3-candidate-search-u82d.onrender.com',
    screenshot: CandidateSearch,
    status: 'React • TypeScript • GitHub API',
  },
  {
    id: 'de',
    description: 'Der Eisendrache Guide',
    repoLink: 'https://github.com/PHTMGatt/Der-Eisendrache-Guide',
    renderLink: 'https://der-eisendrache-guide.onrender.com',
    screenshot: DerEisendrache,
    status: 'Legacy standalone guide — preserved while Zombies Hub 2.0 becomes the unified experience',
    legacy: true,
  },
  {
    id: 'gk',
    description: 'Gorod Krovi Guide',
    repoLink: 'https://github.com/PHTMGatt/Gorod-Krovi-Guide',
    renderLink: 'https://gorod-krovi-guide.onrender.com',
    screenshot: GK,
    status: 'Legacy standalone guide — source and project history preserved',
    legacy: true,
  },
  {
    id: 'motd',
    description: 'Mob of the Dead Guide',
    repoLink: 'https://github.com/PHTMGatt/MOTD-Guide',
    renderLink: 'https://motd-guide.onrender.com',
    screenshot: MOTD,
    status: 'Legacy standalone guide — source and project history preserved',
    legacy: true,
  },
  {
    id: 'origins',
    description: 'Origins Guide',
    repoLink: 'https://github.com/PHTMGatt/Origins-Guide',
    renderLink: 'https://origins-wtyd.onrender.com',
    screenshot: Origins,
    status: 'Legacy standalone guide — source and project history preserved',
    legacy: true,
  },
  {
    id: 'rev',
    description: 'Revelations Guide',
    repoLink: 'https://github.com/PHTMGatt/Revelations-Guide',
    renderLink: 'https://revelations-guide.onrender.com',
    screenshot: REV,
    status: 'Legacy standalone guide — source and project history preserved',
    legacy: true,
  },
  {
    id: 'zns',
    description: 'Zetsubou No Shima Guide',
    repoLink: 'https://github.com/PHTMGatt/Zetsubou-Guide',
    renderLink: 'https://zetsubou-guide.onrender.com',
    screenshot: ZNS,
    status: 'Legacy standalone guide — source and project history preserved',
    legacy: true,
  },
  {
    id: 'zombies-hub-1',
    description: 'Zombies Hub 1.0',
    repoLink: 'https://github.com/PHTMGatt/Zombies-Hub',
    screenshot: ZHub,
    status: 'Inactive — replaced by Zombies Hub 2.0',
    inactive: true,
  },
];

const Portfolio = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <section className="portfolio-section fade-in">
      <div className="portfolio-header">
        <h1 className="portfolio-title">My Projects</h1>
        <p className="portfolio-subtext">Real project work, real screenshots where available, and source-first links for anything that no longer has a reliable live demo.</p>

        <button
          className="portfolio-info-button"
          type="button"
          aria-expanded={showInfo}
          aria-controls="project-availability-info"
          onClick={() => setShowInfo((open) => !open)}
        >
          <span className="portfolio-info-icon">i</span>
          Project Info
          <span className={`portfolio-info-chevron ${showInfo ? 'open' : ''}`}>⌄</span>
        </button>

        {showInfo && (
          <div id="project-availability-info" className="portfolio-info-card" role="note">
            <div className="portfolio-info-card-header">
              <span className="portfolio-info-icon large">i</span>
              <div>
                <h2>Project Availability</h2>
                <p>GitHub is the source of truth. Live demos are secondary and may depend on older hosting, APIs, or databases.</p>
              </div>
            </div>
            <div className="portfolio-info-grid">
              <div>
                <h3>Authentic Visuals</h3>
                <p>Cards use real screenshots from the project when one is available. Projects without a verified screenshot show a neutral placeholder instead of generated artwork.</p>
              </div>
              <div>
                <h3>Legacy Projects</h3>
                <p>Older projects remain visible as part of the development history. Legacy labels distinguish preserved work from actively evolving projects.</p>
              </div>
              <div>
                <h3>Zombies Hub 2.0</h3>
                <p>The current Zombies flagship replaces the separate-map deployment model with one unified application and a faster in-game guide experience.</p>
              </div>
            </div>
            <p className="portfolio-info-footer">Each card links to GitHub first so the source, README, and project history remain available even when a live service is offline.</p>
          </div>
        )}
      </div>

      <div className="work-grid">
        {projects.map((project) => <ProjectCard key={project.id} {...project} />)}
      </div>
    </section>
  );
};

export default Portfolio;
