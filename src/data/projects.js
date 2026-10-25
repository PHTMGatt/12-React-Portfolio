// Project content for the Work page. Descriptions are drawn from each
// project's own README so the portfolio stays factual.
//
// `image` is a real screenshot from ./screenshots.js, or null. Null renders an
// honest typographic summary (title, stack, one-line description) instead.
// `status` is 'legacy' for finished coursework that is no longer developed,
// 'paused' for projects on hold, and 'inactive' for projects that are retired
// or not currently running. An optional `statusNote` says why, on the card.

import { screenshotFor } from './screenshots';

export const categories = [
  { id: 'all', label: 'All work' },
  { id: 'full-stack', label: 'Full-stack' },
  { id: 'automation', label: 'Bots & automation' },
  { id: 'frontend', label: 'Front-end' },
  { id: 'backend', label: 'APIs & back-end' },
  { id: 'testing', label: 'Testing' },
];

// Case studies live in ./caseStudies.js (summaries) and ./caseStudyStories.js
// (long-form text, case-study route only). Re-exported here for the Work page.
export { caseStudies } from './caseStudies';

export const projects = [
  {
    id: 'zombies-hub-2',
    title: 'Zombies Hub 2.0',
    summary: 'Seven Call of Duty Zombies guides unified into one React app with CI-gated Render deploys.',
    category: 'frontend',
    stack: ['React', 'Vite', 'GitHub Actions'],
    image: screenshotFor('zombies-hub-2'),
    links: { repo: 'https://github.com/PHTMGatt/Zombies-Hub-2.0', live: 'https://zombies-hub-2-0.onrender.com/' },
    caseStudy: 'zombies-hub-2',
  },
  {
    id: 'fairway-finder',
    title: 'Fairway Finder',
    summary: 'Golf trip planner combining course search, route maps, forecasts and handicap tracking.',
    category: 'full-stack',
    stack: ['React', 'GraphQL', 'MongoDB', 'JWT'],
    image: screenshotFor('fairway-finder'),
    links: { repo: 'https://github.com/PHTMGatt/Fairway-Finder', live: 'https://fairway-finder.onrender.com' },
    caseStudy: 'fairway-finder',
  },
  {
    id: 'war-oracle',
    title: 'War Oracle',
    summary: 'Clash of Clans war-intelligence bot with live status and deduplicated, threshold-based alerts.',
    category: 'automation',
    stack: ['Node.js', 'discord.js', 'CoC API'],
    image: screenshotFor('war-oracle'),
    links: { repo: 'https://github.com/PHTMGatt/War-Oracle-Bot' },
    caseStudy: 'clash-automation',
  },
  {
    id: 'clash-commander',
    title: 'Clash Commander',
    summary: 'Discord operations bot for clan leadership: audits, member notes, inactivity reports and pings.',
    category: 'automation',
    stack: ['Node.js', 'discord.js', 'Slash commands'],
    image: screenshotFor('clash-commander'),
    links: { repo: 'https://github.com/PHTMGatt/Clash-Commander-Bot' },
    caseStudy: 'clash-automation',
    status: 'paused',
  },
  {
    id: 'raspbi-pilot',
    title: 'raspbi-pilot',
    summary: 'Lightweight launcher that runs multiple Discord bots in one Node process on Render or a Raspberry Pi.',
    category: 'automation',
    stack: ['Node.js', 'Render', 'Raspberry Pi'],
    image: screenshotFor('raspbi-pilot'),
    links: { repo: 'https://github.com/PHTMGatt/raspbi-pilot' },
    caseStudy: 'clash-automation',
    status: 'inactive',
    statusNote: 'Needs repair or retirement.',
  },
  {
    id: 'captain-hook',
    title: 'Captain Hook',
    summary: 'Webhook bot that turns GitHub repository activity into readable Discord updates, with GPT-assisted formatting.',
    category: 'automation',
    stack: ['Node.js', 'Webhooks', 'GitHub', 'Discord'],
    image: screenshotFor('captain-hook'),
    links: { repo: 'https://github.com/PHTMGatt/Discord-WebHook-Bot' },
  },
  {
    id: 'mern-book-search',
    title: 'MERN Book Search Engine',
    summary: 'Google Books search with accounts, JWT auth and a saved reading list over GraphQL.',
    category: 'full-stack',
    stack: ['React', 'TypeScript', 'Apollo', 'MongoDB'],
    image: screenshotFor('mern-book-search'),
    links: {
      repo: 'https://github.com/PHTMGatt/18-MERN-Book-Search-Engine',
      live: 'https://one8-mern-book-search-engine.onrender.com',
    },
  },
  {
    id: 'daily-bytes',
    title: 'The Daily Bytes',
    summary: 'Full-stack news and content application.',
    category: 'full-stack',
    stack: ['React', 'Vite'],
    image: screenshotFor('daily-bytes'),
    links: { repo: 'https://github.com/PHTMGatt/The-Daily-Bytes', live: 'https://the-daily-bytes-o4jo.onrender.com' },
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    summary: 'Task board with JWT-protected routes and To Do, In Progress and Done columns.',
    category: 'full-stack',
    stack: ['React', 'Node.js', 'Express', 'JWT'],
    image: screenshotFor('kanban-board'),
    links: { repo: 'https://github.com/PHTMGatt/14-Todo-Board', live: 'https://one4-todo-board.onrender.com' },
  },
  {
    id: 'candidate-search',
    title: 'Candidate Search',
    summary: 'GitHub candidate browser with saved candidates, pagination and light and dark themes.',
    category: 'frontend',
    stack: ['React', 'TypeScript', 'GitHub API'],
    image: screenshotFor('candidate-search'),
    links: {
      repo: 'https://github.com/PHTMGatt/13-Candidate-Search',
      live: 'https://one3-candidate-search-u82d.onrender.com',
    },
  },
  {
    id: 'weather-app',
    title: 'Weather Dashboard',
    summary: 'City search with current conditions, a 5-day forecast and persistent search history.',
    category: 'backend',
    stack: ['Node.js', 'Express', 'OpenWeather API'],
    image: screenshotFor('weather-app'),
    links: { repo: 'https://github.com/PHTMGatt/09-Weather-App', live: 'https://zero9-servers-and-apis.onrender.com' },
    status: 'legacy',
  },
  {
    id: 'social-network-api',
    title: 'Social Network API',
    summary: 'REST API for users, thoughts, reactions and friend lists on MongoDB.',
    category: 'backend',
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    image: screenshotFor('social-network-api'),
    links: { repo: 'https://github.com/PHTMGatt/17-Social-Network-API' },
    status: 'legacy',
  },
  {
    id: 'tech-quiz-tests',
    title: 'Tech Quiz Test Suite',
    summary: 'Cypress component and end-to-end coverage for quiz start, question flow, scoring and restart.',
    category: 'testing',
    stack: ['Cypress', 'React', 'Node.js'],
    image: screenshotFor('tech-quiz-tests'),
    links: {
      repo: 'https://github.com/PHTMGatt/19-Testing-Tech-Quiz-Test-Suite',
      video: 'https://youtu.be/FcIQsPgJqd8',
    },
    status: 'legacy',
  },
  {
    id: 'banking-system',
    title: 'Python Banking System',
    summary: 'Object-oriented CLI bank with validated login, transfers and overdraft protection.',
    category: 'backend',
    stack: ['Python', 'OOP'],
    image: screenshotFor('banking-system'),
    links: { repo: 'https://github.com/PHTMGatt/22-Banking-System' },
    status: 'legacy',
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    summary: 'React and Vite site with code-split routes, light and dark themes and case-study pages.',
    category: 'frontend',
    stack: ['React', 'Vite', 'React Router', 'CSS'],
    image: screenshotFor('portfolio'),
    links: { repo: 'https://github.com/PHTMGatt/12-React-Portfolio' },
  },
];

// The original per-map guides, superseded by Zombies Hub 2.0. Their separate
// Render deployments are offline, so only the source is linked. Screenshots
// are real captures taken while the guides were still deployed.
const legacyGuide = (id, title, summary, repo) => ({
  id,
  title,
  summary,
  category: 'frontend',
  stack: ['React', 'Render'],
  image: screenshotFor(id),
  links: { repo },
  status: 'inactive',
});

export const archivedProjects = [
  legacyGuide(
    'zombies-hub-1',
    'Zombies Hub 1.0',
    'The original map-select hub that linked out to each separately hosted guide.',
    'https://github.com/PHTMGatt/Zombies-Hub'
  ),
  legacyGuide(
    'origins',
    'Origins Guide',
    'Little Lost Girl Easter egg walkthrough with separate pages for each elemental staff.',
    'https://github.com/PHTMGatt/Origins-Guide'
  ),
  legacyGuide(
    'mob-of-the-dead',
    'Mob of the Dead Guide',
    'Pop Goes the Weasel guide: Blundergat, spoon, Redeemer, audio logs and the final step.',
    'https://github.com/PHTMGatt/MOTD-Guide'
  ),
  legacyGuide(
    'der-eisendrache',
    'Der Eisendrache Guide',
    'Main Easter egg steps with an embedded video walkthrough and pages for bows, parts and wisps.',
    'https://github.com/PHTMGatt/Der-Eisendrache-Guide'
  ),
  legacyGuide(
    'zetsubou',
    'Zetsubou No Shima Guide',
    'Seeds of Doubt guide covering prerequisites, the blueprint, cogs, buildables and the boss fight.',
    'https://github.com/PHTMGatt/Zetsubou-Guide'
  ),
  legacyGuide(
    'gorod-krovi',
    'Gorod Krovi Guide',
    'Love and War guide with buildables, trophy challenges, a valve solver and the boss fight.',
    'https://github.com/PHTMGatt/Gorod-Krovi-Guide'
  ),
  legacyGuide(
    'revelations',
    'Revelations Guide',
    'For The Good Of All guide with Apothicon upgrade, egg locations and summoning key steps.',
    'https://github.com/PHTMGatt/Revelations-Guide'
  ),
];
