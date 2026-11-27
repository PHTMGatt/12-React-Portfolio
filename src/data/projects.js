// Project content for the Work page. Descriptions are drawn from each
// project's own README so the portfolio stays factual.
//
// `image` is a real screenshot from ./screenshots.js, or null. Null renders an
// honest typographic summary (title, stack, one-line description) instead.
// `status` is 'legacy' for finished coursework that is no longer developed,
// 'paused' for projects on hold, and 'inactive' for projects that are retired
// or not currently running. An optional `statusNote` says why, on the card.
// `links.repo` is omitted for private repositories; the card says so instead.

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
    id: 'daily-bytes',
    title: 'The Daily Bytes',
    summary: 'Gaming and tech news dashboard with a server-side news proxy, MongoDB reader accounts and saved articles.',
    category: 'full-stack',
    stack: ['React', 'Vite', 'Express', 'MongoDB'],
    image: screenshotFor('daily-bytes'),
    links: { repo: 'https://github.com/PHTMGatt/The-Daily-Bytes', live: 'https://the-daily-bytes-o4jo.onrender.com' },
    caseStudy: 'daily-bytes',
  },
  {
    id: '3d-modding-showcase',
    title: 'Forge & Mod: 3D Modding Showcase',
    summary: 'Game modding and 3D creation gallery with an interactive model viewer, hotspots, lighting controls and REDkit mod diffs.',
    category: 'frontend',
    stack: ['React', 'Vite', 'model-viewer', 'Blender'],
    image: screenshotFor('3d-modding-showcase'),
    // Private repository: no repo or live link yet.
    links: {},
    statusNote: 'Private repo, coming soon.',
  },
  {
    id: 'mithrandir',
    title: 'Mithrandir',
    summary: 'Local command center where one orchestrator chat runs a Claude Code worker per repository.',
    category: 'automation',
    stack: ['TypeScript', 'Node.js', 'MongoDB', 'Claude Code'],
    image: screenshotFor('mithrandir'),
    links: {},
    status: 'paused',
    statusNote: 'Parked: its workflow now runs directly in Claude Code.',
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
    summary: 'Archived concept: basic channel controls merged into War Oracle. Earlier proposed audit, notes and inactivity commands were not implemented.',
    category: 'automation',
    stack: ['Node.js', 'discord.js', 'Slash commands'],
    image: screenshotFor('clash-commander'),
    // The Clash-Commander-Bot repository no longer exists on GitHub (404), so there is no link.
    links: {},
    // Archived concept: the suite's case study covers War Oracle, so no case-study badge here.
    sourceRemoved: true,
    status: 'inactive',
  },
  {
    id: 'raspbi-pilot',
    title: 'raspbi-pilot',
    summary: 'Raspberry Pi installer and hardened systemd services for running Legacy Bot and War Oracle independently.',
    category: 'automation',
    stack: ['Bash', 'systemd', 'Node.js', 'Raspberry Pi'],
    image: screenshotFor('raspbi-pilot'),
    links: { repo: 'https://github.com/PHTMGatt/raspbi-pilot' },
    caseStudy: 'clash-automation',
    status: 'paused',
    statusNote: 'Installer is ready; physical Pi deployment not verified.',
  },
  {
    id: 'captain-hook',
    title: 'Discord Legacy Bot',
    summary: 'Discord commit formatter and signed GitHub push alerts with per-channel repository watches.',
    category: 'automation',
    stack: ['Node.js', 'Webhooks', 'GitHub', 'Discord'],
    image: screenshotFor('captain-hook'),
    links: { repo: 'https://github.com/PHTMGatt/Discord-Legacy-Bot' },
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
    id: 'pc-build-tracker',
    title: 'PC Build Tracker',
    summary: 'Quantity-aware planner for a custom PC build: wanted vs. owned parts, remaining spend and shared state in MongoDB, with an admin-only edit mode.',
    category: 'full-stack',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: screenshotFor('pc-build-tracker'),
    links: { live: 'https://pc-build-tracker.onrender.com' },
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    summary: 'Three-column Kanban board for creating, editing and moving tasks, with browser-local persistence.',
    category: 'full-stack',
    stack: ['React', 'Node.js', 'Express', 'localStorage'],
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
    id: 'ci-cd-quiz',
    title: 'CI/CD Tech Quiz',
    summary: 'MERN tech quiz used to practise a real delivery pipeline: Cypress tests on every pull request, and a merge to main deploys to Render.',
    category: 'testing',
    stack: ['React', 'TypeScript', 'Node.js', 'GitHub Actions'],
    image: screenshotFor('ci-cd-quiz'),
    links: {
      repo: 'https://github.com/PHTMGatt/20-CI-CD-GitHub-Actions',
      live: 'https://two0-ci-cd-github-actions-zubp.onrender.com',
    },
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
