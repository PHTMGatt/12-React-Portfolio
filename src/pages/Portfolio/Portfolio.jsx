import React, { useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Portfolio.css';

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
import ReactFolio from '../../assets/Pictures/ReactFolio.png';

const githubImage = (repo, path) =>
  `https://raw.githubusercontent.com/PHTMGatt/${repo}/main/${path}`;

const projects = [
  // Featured work — the projects I want recruiters to see first.
  { id:'zombies-hub-2', description:'Zombies Hub 2.0', repoLink:'https://github.com/PHTMGatt/Zombies-Hub-2.0', renderLink:'https://zombies-hub-2-0.onrender.com/', screenshot:ZHub, status:'In Progress — unified Zombies experience in a single application' },
  { id:'fairway-finder', description:'Fairway Finder', repoLink:'https://github.com/PHTMGatt/Fairway-Finder', renderLink:'https://fairway-finder.onrender.com', screenshot:FairwayFinder, status:'Full-stack golf course discovery application' },
  { id:'daily-bytes', description:'Daily Bytes', repoLink:'https://github.com/PHTMGatt/The-Daily-Bytes', renderLink:'https://the-daily-bytes-o4jo.onrender.com', screenshot:DailyBytes, status:'Full-stack news and content application' },
  { id:'mern-book-search', description:'MERN Book Search Engine', repoLink:'https://github.com/PHTMGatt/18-MERN-Book-Search-Engine', renderLink:'https://one8-mern-book-search-engine.onrender.com', screenshot:MERNBook, status:'MERN • GraphQL • Authentication' },
  { id:'todo-board', description:'Kanban Board — JWT Authentication', repoLink:'https://github.com/PHTMGatt/14-Todo-Board', renderLink:'https://one4-todo-board.onrender.com', screenshot:githubImage('14-Todo-Board','client/src/assets/Screenshot%202025-03-31%20154359.png'), status:'React • Node.js • JWT • Full Stack' },
  { id:'portfolio', description:'React Developer Portfolio', repoLink:'https://github.com/PHTMGatt/12-React-Portfolio', screenshot:ReactFolio, status:'React • Responsive UI • Project showcase' },

  // Automation, backend, and engineering projects.
  { id:'war-oracle', description:'War Oracle — Clash of Clans War Bot', repoLink:'https://github.com/PHTMGatt/War-Oracle-Bot', screenshot:githubImage('War-Oracle-Bot','WarOracle.png'), status:'Discord.js • Clash of Clans API • Automated war intelligence' },
  { id:'clash-commander', description:'Clash Commander — Discord Operations Bot', repoLink:'https://github.com/PHTMGatt/Clash-Commander-Bot', screenshot:githubImage('Clash-Commander-Bot','src/assets/overcharge.png'), status:'Discord.js • Server operations • Safety tooling' },
  { id:'raspbi-pilot', description:'raspbi-pilot — Multi-Bot Runtime', repoLink:'https://github.com/PHTMGatt/raspbi-pilot', screenshot:githubImage('raspbi-pilot','raspbi-pilot.png'), status:'Node.js • Multi-bot launcher • Render / Raspberry Pi' },
  { id:'captain-hook', description:'Captain Hook — GitHub → Discord WebHook Bot', repoLink:'https://github.com/PHTMGatt/Discord-WebHook-Bot', renderLink:'https://discord-webhook-bot-1f23.onrender.com/register', screenshot:githubImage('Discord-WebHook-Bot','images/captain-hook-bot-banner.png'), status:'Webhooks • Discord • GitHub • GPT-assisted formatting' },
  { id:'social-network-api', description:'Social Network API', repoLink:'https://github.com/PHTMGatt/17-Social-Network-API', screenshot:githubImage('17-Social-Network-API','Assets/18-nosql-homework-demo-01.gif'), status:'Node.js • Express • MongoDB • Mongoose' },
  { id:'tech-quiz-tests', description:'Tech Quiz Automated Test Suite', repoLink:'https://github.com/PHTMGatt/19-Testing-Tech-Quiz-Test-Suite', screenshot:githubImage('19-Testing-Tech-Quiz-Test-Suite','Assets/19-testing-homework-demo.gif'), status:'Cypress • Component testing • End-to-end testing' },
  { id:'banking-system', description:'Python Banking System', repoLink:'https://github.com/PHTMGatt/22-Banking-System', screenshot:githubImage('22-Banking-System','Assets/python-terminal-options.png'), status:'Python • OOP • Validation • Account operations' },
  { id:'candidate-search', description:'Candidate Search', repoLink:'https://github.com/PHTMGatt/13-Candidate-Search', renderLink:'https://one3-candidate-search-u82d.onrender.com', screenshot:CandiSearch, status:'React • TypeScript • GitHub API' },
  { id:'weather-app', description:'Weather App', repoLink:'https://github.com/PHTMGatt/09-Weather-App', screenshot:WeatherApp, status:'Weather API • Search • Forecast data' },

  // Legacy Zombies map projects — preserved as part of the evolution into Zombies Hub 2.0.
  { id:'de', description:'Der Eisendrache Guide', repoLink:'https://github.com/PHTMGatt/Der-Eisendrache-Guide', renderLink:'https://der-eisendrache-guide.onrender.com', screenshot:DE },
  { id:'gk', description:'Gorod Krovi Guide', repoLink:'https://github.com/PHTMGatt/Gorod-Krovi-Guide', renderLink:'https://gorod-krovi-guide.onrender.com', screenshot:GK },
  { id:'motd', description:'Mob of the Dead Guide', repoLink:'https://github.com/PHTMGatt/MOTD-Guide', renderLink:'https://motd-guide.onrender.com', screenshot:MOTD },
  { id:'origins', description:'Origins Guide', repoLink:'https://github.com/PHTMGatt/Origins-Guide', renderLink:'https://origins-wtyd.onrender.com', screenshot:Origins },
  { id:'rev', description:'Revelations Guide', repoLink:'https://github.com/PHTMGatt/Revelations-Guide', renderLink:'https://revelations-guide.onrender.com', screenshot:REV },
  { id:'zns', description:'Zetsubou No Shima Guide', repoLink:'https://github.com/PHTMGatt/Zetsubou-Guide', renderLink:'https://zetsubou-guide.onrender.com', screenshot:ZNS },
  { id:'zombies-hub-1', description:'Zombies Hub 1.0', repoLink:'https://github.com/PHTMGatt/Zombies-Hub', screenshot:ZHub, status:'Inactive — Replaced by Zombies Hub 2.0', inactive:true },
];

const Portfolio = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <section className="portfolio-section fade-in">
      <div className="portfolio-header">
        <h1 className="portfolio-title">My Projects</h1>
        <p className="portfolio-subtext">Full-stack apps, APIs, automation, Discord bots, testing, and the Zombies projects that grew with me.</p>

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
                <p>Why some older live demos may behave differently today.</p>
              </div>
            </div>
            <div className="portfolio-info-grid">
              <div>
                <h3>Older Projects</h3>
                <p>Some projects rely on APIs, databases, or hosted services that have changed, expired, or been taken offline. Their live demos may not function exactly as they did when originally built.</p>
              </div>
              <div>
                <h3>Legacy Zombies Guides</h3>
                <p>The original map guides used separate Render deployments. Some may no longer be available because of current hosting limits.</p>
              </div>
              <div>
                <h3>Zombies Hub 2.0</h3>
                <p>The new version replaces the separate-map deployment model by incorporating the maps into one unified application for a more seamless experience.</p>
              </div>
            </div>
            <p className="portfolio-info-footer">Source code and project history remain available through each project's GitHub repository.</p>
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
