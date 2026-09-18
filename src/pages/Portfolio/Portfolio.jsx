import React from 'react';
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
  { id:'zombies-hub-2', description:'Zombies Hub 2.0', repoLink:'https://github.com/PHTMGatt/Zombies-Hub-2.0', renderLink:'https://zombies-hub-2-0.onrender.com/', screenshot:ZHub, status:'In Progress — unified Zombies experience in a single application' },
  { id:'war-oracle', description:'War Oracle — Clash of Clans War Bot', repoLink:'https://github.com/PHTMGatt/War-Oracle-Bot', screenshot:githubImage('War-Oracle-Bot','WarOracle.png'), status:'Discord.js • Clash of Clans API • Automated war intelligence' },
  { id:'clash-commander', description:'Clash Commander — Discord Operations Bot', repoLink:'https://github.com/PHTMGatt/Clash-Commander-Bot', screenshot:githubImage('Clash-Commander-Bot','src/assets/overcharge.png'), status:'Discord.js • Server operations • Safety tooling' },
  { id:'raspbi-pilot', description:'raspbi-pilot — Multi-Bot Runtime', repoLink:'https://github.com/PHTMGatt/raspbi-pilot', screenshot:githubImage('raspbi-pilot','raspbi-pilot.png'), status:'Node.js • Multi-bot launcher • Render / Raspberry Pi' },
  { id:'captain-hook', description:'Captain Hook — GitHub → Discord WebHook Bot', repoLink:'https://github.com/PHTMGatt/Discord-WebHook-Bot', renderLink:'https://discord-webhook-bot-1f23.onrender.com/register', screenshot:githubImage('Discord-WebHook-Bot','images/captain-hook-bot-banner.png'), status:'Webhooks • Discord • GitHub • GPT-assisted formatting' },
  { id:'todo-board', description:'Kanban Board — JWT Authentication', repoLink:'https://github.com/PHTMGatt/14-Todo-Board', renderLink:'https://one4-todo-board.onrender.com', screenshot:githubImage('14-Todo-Board','client/src/assets/Screenshot%202025-03-31%20154359.png'), status:'React • Node.js • JWT • Full Stack' },
  { id:'social-network-api', description:'Social Network API', repoLink:'https://github.com/PHTMGatt/17-Social-Network-API', screenshot:githubImage('17-Social-Network-API','Assets/18-nosql-homework-demo-01.gif'), status:'Node.js • Express • MongoDB • Mongoose' },
  { id:'tech-quiz-tests', description:'Tech Quiz Automated Test Suite', repoLink:'https://github.com/PHTMGatt/19-Testing-Tech-Quiz-Test-Suite', screenshot:githubImage('19-Testing-Tech-Quiz-Test-Suite','Assets/19-testing-homework-demo.gif'), status:'Cypress • Component testing • End-to-end testing' },
  { id:'banking-system', description:'Python Banking System', repoLink:'https://github.com/PHTMGatt/22-Banking-System', screenshot:githubImage('22-Banking-System','Assets/python-terminal-options.png'), status:'Python • OOP • Validation • Account operations' },
  { id:'daily-bytes', description:'Daily Bytes', repoLink:'https://github.com/PHTMGatt/The-Daily-Bytes', renderLink:'https://the-daily-bytes-o4jo.onrender.com', screenshot:DailyBytes },
  { id:'fairway-finder', description:'Fairway Finder', repoLink:'https://github.com/PHTMGatt/Fairway-Finder', renderLink:'https://fairway-finder.onrender.com', screenshot:FairwayFinder },
  { id:'candidate-search', description:'Candidate Search', repoLink:'https://github.com/PHTMGatt/13-Candidate-Search', renderLink:'https://one3-candidate-search-u82d.onrender.com', screenshot:CandiSearch },
  { id:'mern-book-search', description:'MERN Book Search Engine', repoLink:'https://github.com/PHTMGatt/18-MERN-Book-Search-Engine', renderLink:'https://one8-mern-book-search-engine.onrender.com', screenshot:MERNBook },
  { id:'portfolio', description:'React Developer Portfolio', repoLink:'https://github.com/PHTMGatt/12-React-Portfolio', screenshot:ReactFolio, status:'React • Responsive UI • Project showcase' },
  { id:'de', description:'Der Eisendrache Guide', repoLink:'https://github.com/PHTMGatt/Der-Eisendrache-Guide', renderLink:'https://der-eisendrache-guide.onrender.com', screenshot:DE },
  { id:'gk', description:'Gorod Krovi Guide', repoLink:'https://github.com/PHTMGatt/Gorod-Krovi-Guide', renderLink:'https://gorod-krovi-guide.onrender.com', screenshot:GK },
  { id:'motd', description:'Mob of the Dead Guide', repoLink:'https://github.com/PHTMGatt/MOTD-Guide', renderLink:'https://motd-guide.onrender.com', screenshot:MOTD },
  { id:'origins', description:'Origins Guide', repoLink:'https://github.com/PHTMGatt/Origins-Guide', renderLink:'https://origins-wtyd.onrender.com', screenshot:Origins },
  { id:'rev', description:'Revelations Guide', repoLink:'https://github.com/PHTMGatt/Revelations-Guide', renderLink:'https://revelations-guide.onrender.com', screenshot:REV },
  { id:'zns', description:'Zetsubou No Shima Guide', repoLink:'https://github.com/PHTMGatt/Zetsubou-Guide', renderLink:'https://zetsubou-guide.onrender.com', screenshot:ZNS },
  { id:'weather-app', description:'Weather App', repoLink:'https://github.com/PHTMGatt/09-Weather-App', screenshot:WeatherApp },
  { id:'zombies-hub-1', description:'Zombies Hub 1.0', repoLink:'https://github.com/PHTMGatt/Zombies-Hub', screenshot:ZHub, status:'Inactive — Replaced by Zombies Hub 2.0', inactive:true },
];

const Portfolio = () => (
  <section className="portfolio-section fade-in">
    <div className="portfolio-header">
      <h1 className="portfolio-title">My Projects</h1>
      <p className="portfolio-subtext">Full-stack apps, APIs, automation, Discord bots, testing, and the Zombies projects that grew with me.</p>
      <div className="portfolio-notice" role="note">
        <strong>Project availability:</strong> Some older projects depend on APIs, databases, or hosted services that have since changed, expired, or been taken offline, so live demos may not always function exactly as originally built. Several legacy Zombies map guides also used separate Render deployments and may no longer be available due to current hosting limits. Zombies Hub 2.0 replaces that approach by incorporating the maps into one unified application for a more seamless experience. The GitHub repositories remain available to review the source code and project history.
      </div>
    </div>
    <div className="work-grid">
      {projects.map((project) => <ProjectCard key={project.id} {...project} />)}
    </div>
  </section>
);

export default Portfolio;
