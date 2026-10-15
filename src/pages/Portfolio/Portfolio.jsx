import { useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Portfolio.css';

import ZHub from '../../assets/Pictures/ZHub.webp';
import GK from '../../assets/Pictures/GK.webp';
import MOTD from '../../assets/Pictures/MOTD.webp';
import Origins from '../../assets/Pictures/Origins.webp';
import REV from '../../assets/Pictures/REV.webp';
import ZNS from '../../assets/Pictures/ZETZ.webp';
import ZHub2Pro from '../../assets/thumbnails/zombies-hub-2.webp';
import DailyBytesPro from '../../assets/thumbnails/daily-bytes.webp';
import FairwayFinderPro from '../../assets/thumbnails/fairway-finder.webp';
import WeatherPro from '../../assets/thumbnails/weather-app.webp';
import BookPro from '../../assets/thumbnails/mern-book-search.webp';
import KanbanPro from '../../assets/thumbnails/kanban-board.webp';
import PortfolioPro from '../../assets/thumbnails/react-portfolio.webp';
import WarOraclePro from '../../assets/thumbnails/war-oracle.webp';
import ClashCommanderPro from '../../assets/thumbnails/clash-commander.webp';
import RaspbiPilotPro from '../../assets/thumbnails/raspbi-pilot.webp';
import CaptainHookPro from '../../assets/thumbnails/captain-hook.webp';
import SocialPro from '../../assets/thumbnails/social-network-api.webp';
import TestingPro from '../../assets/thumbnails/tech-quiz.webp';
import BankingPro from '../../assets/thumbnails/python-banking-system.webp';
import CandidatePro from '../../assets/thumbnails/candidate-search.webp';
import DerEisendrachePro from '../../assets/thumbnails/der-eisendrache-guide.webp';

// Enable only after both reference services and their actual URLs are verified.
const legacyReferenceHostingReady = false;
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
  { id:'de', description:'Der Eisendrache Guide', repoLink:'https://github.com/PHTMGatt/Der-Eisendrache-Guide', renderLink:'https://zombies-hub-2-0.onrender.com/maps/der-eisendrache', liveLabel:'Guide in 2.0', screenshot:DerEisendrachePro, status:'Original source preserved; current guide is integrated in 2.0.' },
  { id:'gk', description:'Gorod Krovi Guide', repoLink:'https://github.com/PHTMGatt/Gorod-Krovi-Guide', renderLink:'https://zombies-hub-2-0.onrender.com/maps/gorod-krovi', liveLabel:'Guide in 2.0', screenshot:GK, status:'Original source preserved; current guide is integrated in 2.0.' },
  { id:'motd', description:'Mob of the Dead Guide', repoLink:'https://github.com/PHTMGatt/MOTD-Guide', renderLink:'https://zombies-hub-2-0.onrender.com/maps/mob-of-the-dead', liveLabel:'Guide in 2.0', screenshot:MOTD, status:'Original source preserved; current guide is integrated in 2.0.' },
  { id:'origins', description:'Origins Guide', repoLink:'https://github.com/PHTMGatt/Origins-Guide', renderLink:'https://zombies-hub.onrender.com/maps/origins', liveLabel:'Try Origins in 1.0', screenshot:Origins, status:'Selected as the only standalone map reference. Legacy hosting restoration is pending.', inactive:!legacyReferenceHostingReady, inactiveLabel:'Hosting pending' },
  { id:'rev', description:'Revelations Guide', repoLink:'https://github.com/PHTMGatt/Revelations-Guide', renderLink:'https://zombies-hub-2-0.onrender.com/maps/revelations', liveLabel:'Guide in 2.0', screenshot:REV, status:'Original source preserved; current guide is integrated in 2.0.' },
  { id:'zns', description:'Zetsubou No Shima Guide', repoLink:'https://github.com/PHTMGatt/Zetsubou-Guide', renderLink:'https://zombies-hub-2-0.onrender.com/maps/zetsubou-no-shima', liveLabel:'Guide in 2.0', screenshot:ZNS, status:'Original source preserved; current guide is integrated in 2.0.' },
  { id:'zombies-hub-1', description:'Zombies Hub 1.0', repoLink:'https://github.com/PHTMGatt/Zombies-Hub', renderLink:'https://zombies-hub.onrender.com', liveLabel:'Legacy reference', screenshot:ZHub, status:'Historical hub selected for the Origins-only comparison. Legacy hosting restoration is pending.', inactive:!legacyReferenceHostingReady, inactiveLabel:'Hosting pending' },
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
                <p>Hub 1.0 and its standalone Origins guide are selected for a historical comparison, with hosting restoration pending. The other guide buttons open the integrated routes in 2.0, while their original repositories remain available.</p>
              </div>
              <div>
                <h3>Zombies Hub 2.0</h3>
                <p>The new version replaces the separate-map deployment model by incorporating the maps into one unified application for a more seamless experience.</p>
              </div>
            </div>
            <p className="portfolio-info-footer">Source code and project history remain available through each project’s GitHub repository.</p>
          </div>
        )}
      </div>

      <section className="zombies-comparison" aria-labelledby="zombies-evolution-title">
        <div className="zombies-comparison__heading">
          <span className="zombies-comparison__eyebrow">Project evolution</span>
          <h2 id="zombies-evolution-title">Same map. A better-integrated app.</h2>
          <p>Origins is the reference map for comparing the original separate-app approach with the integrated experience in 2.0.</p>
        </div>
        <div className="zombies-comparison__grid">
          <article>
            <h3>1.0: the retained reference</h3>
            <p>The original hub loaded map guides from separate hosted apps. Origins is the one standalone example retained for this comparison.</p>
            {legacyReferenceHostingReady
              ? <a href="https://zombies-hub.onrender.com/maps/origins" target="_blank" rel="noopener noreferrer">Test Origins through Hub 1.0</a>
              : <p className="zombies-comparison__pending">Legacy demo hosting is pending restoration. <a href="https://github.com/PHTMGatt/Zombies-Hub" target="_blank" rel="noopener noreferrer">View the original source</a></p>}
          </article>
          <article>
            <h3>2.0: the current experience</h3>
            <p>The guides share one application and deployment. Opening Origins stays within the hub rather than loading another Render project.</p>
            <a href="https://zombies-hub-2-0.onrender.com/maps/origins" target="_blank" rel="noopener noreferrer">Try integrated Origins in 2.0</a>
          </article>
        </div>
        <p className="zombies-comparison__note">Legacy demos are historical references, not the maintained product. Original source remains on GitHub without requiring every old guide to stay separately hosted.</p>
      </section>

      <div className="work-grid">
        {projects.map((project) => <ProjectCard key={project.id} {...project} />)}
      </div>
    </section>
  );
};

export default Portfolio;
