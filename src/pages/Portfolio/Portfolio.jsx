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
import ZHub2Pro from '../../assets/thumbnails/zh2.png';
import DailyBytesPro from '../../assets/thumbnails/db.png';
import FairwayFinderPro from '../../assets/thumbnails/ff.png';
import WeatherPro from '../../assets/thumbnails/wa.png';
import BookPro from '../../assets/thumbnails/mern.png';
import KanbanPro from '../../assets/thumbnails/kab.png';
import PortfolioPro from '../../assets/thumbnails/port.png';
import WarOraclePro from '../../assets/thumbnails/waro.png';
import ClashCommanderPro from '../../assets/thumbnails/cc.png';
import RaspbiPilotPro from '../../assets/thumbnails/raspi.png';
import CaptainHookPro from '../../assets/thumbnails/ch.png';
import SocialPro from '../../assets/thumbnails/snapi.png';
import TestingPro from '../../assets/thumbnails/quiz.png';
import BankingPro from '../../assets/thumbnails/pbs.png';
import CandidatePro from '../../assets/thumbnails/cs.png';
import DerEisendrachePro from '../../assets/thumbnails/de.png';

const githubImage = (repo, path) =>
  `https://raw.githubusercontent.com/PHTMGatt/${repo}/main/${path}`;

const projects = [
  { id:'zombies-hub-2', description:'Zombies Hub 2.0', repoLink:'https://github.com/PHTMGatt/Zombies-Hub-2.0', renderLink:'https://zombies-hub-2-0.onrender.com/', screenshot:ZHub2Pro, status:'In Progress — unified Zombies experience in a single application' },
  { id:'daily-bytes', description:'Daily Bytes', repoLink:'https://github.com/PHTMGatt/The-Daily-Bytes', renderLink:'https://the-daily-bytes-o4jo.onrender.com', screenshot:DailyBytesPro, status:'Full-stack news and content application' },
  { id:'fairway-finder', description:'Fairway Finder', repoLink:'https://github.com/PHTMGatt/Fairway-Finder', renderLink:'https://fairway-finder.onrender.com', screenshot:FairwayFinderPro, status:'Full-stack golf course discovery application' },
  { id:'weather-app', description:'Weather App', repoLink:'https://github.com/PHTMGatt/09-Weather-App', screenshot:WeatherPro, status:'API-focused weather dashboard • Search • Forecast data' },
  { id:'mern-book-search', description:'MERN Book Search Engine', repoLink:'https://github.com/PHTMGatt/18-MERN-Book-Search-Engine', renderLink:'https://one8-mern-book-search-engine.onrender.com', screenshot:BookPro, status:'MERN • GraphQL • Authentication' },
  { id:'todo-board', description:'Kanban Board — JWT Authentication', repoLink:'https://github.com/PHTMGatt/14-Todo-Board', renderLink:'https://one4-todo-board.onrender.com', screenshot:KanbanPro, status:'React • Node.js • JWT • Full Stack' },
  { id:'portfolio', description:'React Developer Portfolio', repoLink:'https://github.com/PHTMGatt/12-React-Portfolio', screenshot:PortfolioPro, status:'React • Responsive UI • Project showcase' },
  { id:'war-oracle', description:'War Oracle — Clash of Clans War Bot', repoLink:'https://github.com/PHTMGatt/War-Oracle-Bot', screenshot:WarOraclePro, status:'Discord.js • Clash of Clans API • Automated war intelligence' },
  { id:'clash-commander', description:'Clash Commander — Discord Operations Bot', repoLink:'https://github.com/PHTMGatt/Clash-Commander-Bot', screenshot:ClashCommanderPro, status:'Discord.js • Server operations • Safety tooling' },
  { id:'raspbi-pilot', description:'raspbi-pilot — Multi-Bot Runtime', repoLink:'https://github.com/PHTMGatt/raspbi-pilot', screenshot:RaspbiPilotPro, status:'Node.js • Multi-bot launcher • Render / Raspberry Pi' },
  { id:'captain-hook', description:'Captain Hook — GitHub → Discord WebHook Bot', repoLink:'https://github.com/PHTMGatt/Discord-WebHook-Bot', renderLink:'https://discord-webhook-bot-1f23.onrender.com/register', screenshot:CaptainHookPro, status:'Webhooks • Discord • GitHub • GPT-assisted formatting' },
  { id:'social-network-api', description:'Social Network API', repoLink:'https://github.com/PHTMGatt/17-Social-Network-API', screenshot:SocialPro, status:'Node.js • Express • MongoDB • Mongoose' },
  { id:'tech-quiz-tests', description:'Tech Quiz Automated Test Suite', repoLink:'https://github.com/PHTMGatt/19-Testing-Tech-Quiz-Test-Suite', screenshot:TestingPro, status:'Cypress • Component testing • End-to-end testing' },
  { id:'banking-system', description:'Python Banking System', repoLink:'https://github.com/PHTMGatt/22-Banking-System', screenshot:BankingPro, status:'Python • OOP • Validation • Account operations' },
  { id:'candidate-search', description:'Candidate Search', repoLink:'https://github.com/PHTMGatt/13-Candidate-Search', renderLink:'https://one3-candidate-search-u82d.onrender.com', screenshot:CandidatePro, status:'React • TypeScript • GitHub API' },
  { id:'de', description:'Der Eisendrache Guide', repoLink:'https://github.com/PHTMGatt/Der-Eisendrache-Guide', renderLink:'https://der-eisendrache-guide.onrender.com', screenshot:DerEisendrachePro },
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
