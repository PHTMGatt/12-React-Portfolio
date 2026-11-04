// Case-study summaries: everything the home page and the Work page show.
// The long-form story (problem, approach, outcome, current status) lives in
// ./caseStudyStories.js so it only loads with the case-study route.
// Descriptions are drawn from each project's own README so they stay factual.

// Case-study artwork comes from the same canonical Portfolio image library used by Work cards.
import { screenshotFor } from './screenshots';

export const caseStudies = [
  {
    slug: 'zombies-hub-2',
    featured: true,
    kicker: 'Front-end architecture · CI/CD',
    title: 'Zombies Hub 2.0',
    tagline: 'Seven separate guide sites rebuilt as one fast, unified React application.',
    image: screenshotFor('zombies-hub-2'),
    role: 'Solo project: architecture, UI, content, CI and deployment.',
    stack: ['React', 'Vite', 'React Router', 'GitHub Actions', 'Render'],
    links: [
      { label: 'Source on GitHub', href: 'https://github.com/PHTMGatt/Zombies-Hub-2.0', primary: true },
      { label: 'Live site', href: 'https://zombies-hub-2-0.onrender.com/' },
    ],
    highlights: [
      { value: '7', label: 'dedicated map guides in one app' },
      { value: '1', label: 'router, codebase and Render service' },
      { value: 'CI', label: 'gated deploys with production smoke checks' },
    ],
  },
  {
    slug: 'fairway-finder',
    featured: true,
    kicker: 'Full-stack · MERN + GraphQL',
    title: 'Fairway Finder',
    tagline: 'A golf trip planner that puts courses, routes, weather and handicaps in one app.',
    image: screenshotFor('fairway-finder'),
    role: 'Primary developer on a five-person team.',
    stack: ['React', 'TypeScript', 'Apollo GraphQL', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Google Maps API'],
    links: [
      { label: 'Source on GitHub', href: 'https://github.com/PHTMGatt/Fairway-Finder', primary: true },
      { label: 'Live site', href: 'https://fairway-finder.onrender.com' },
    ],
    highlights: [
      { value: '3', label: 'third-party APIs behind one GraphQL back-end' },
      { value: '5', label: 'person team, as primary developer' },
      { value: 'JWT', label: 'auth with instant, reload-free UI updates' },
    ],
  },
  {
    slug: 'mithrandir',
    featured: true,
    kicker: 'AI tooling · Local orchestration',
    title: 'Mithrandir',
    tagline: 'A local command center where one orchestrator chat dispatches isolated Claude Code workers, one per repository.',
    image: screenshotFor('mithrandir'),
    role: 'Designed the architecture, workflows and interface; building it with Claude Code as an ongoing project.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB Atlas', 'Claude Code', 'CircleCI'],
    links: [
      { label: 'Source on GitHub', href: 'https://github.com/PHTMGatt/Mithrandir', primary: true },
    ],
    highlights: [
      { value: '1', label: 'isolated Claude Code worker per repository' },
      { value: '5h · 7d', label: 'real usage readings that hold new work near the limits' },
      { value: 'v1', label: 'running locally today, with v2 in progress' },
    ],
  },
  {
    slug: 'clash-automation',
    kicker: 'Automation · Discord bots',
    title: 'Clash of Clans Discord Suite',
    tagline: 'War intelligence and server operations bots, built to run together on a single host.',
    image: screenshotFor('clash-suite'),
    role: 'Designed and built all three projects: two bots and the runtime that hosts them.',
    stack: ['Node.js', 'discord.js', 'Clash of Clans API', 'Render', 'Raspberry Pi'],
    links: [
      { label: 'War Oracle on GitHub', href: 'https://github.com/PHTMGatt/War-Oracle-Bot', primary: true },
      { label: 'Clash Commander on GitHub', href: 'https://github.com/PHTMGatt/Clash-Commander-Bot' },
      { label: 'raspbi-pilot on GitHub', href: 'https://github.com/PHTMGatt/raspbi-pilot' },
    ],
    highlights: [
      { value: '2', label: 'independent bots, one Node runtime' },
      { value: '1×', label: 'each alert fires once per condition, per war' },
      { value: '0', label: 'destructive permissions requested' },
    ],
  },
];

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);
