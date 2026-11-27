// Case-study summaries: everything the home page and the Work page show.
// The long-form story (problem, approach, outcome, current status) lives in
// ./caseStudyStories.js so it only loads with the case-study route.
// Descriptions are drawn from each project's own README so they stay factual.

// Case-study artwork comes from the same canonical Portfolio image library used
// by Work cards. Each image is imported on its own so the home page bundle
// carries only these four, not the whole Work library (see screenshots.js).
import zombiesHubArt from '../assets/photos/generated/Zombies Hub.png.js';
import fairwayFinderArt from '../assets/photos/generated/Fairway Finder.png.js';
import dailyBytesArt from '../assets/photos/generated/Daily Bytes.png.js';
import clashSuiteArt from '../assets/photos/generated/Clash Suite.webp.js';
import moddingShowcaseArt from '../assets/photos/generated/3D Modding Showcase.webp.js';

export const caseStudies = [
  {
    slug: 'zombies-hub-2',
    featured: true,
    kicker: 'Front-end architecture · CI/CD',
    title: 'Zombies Hub 2.0',
    tagline: 'Seven separate guide sites rebuilt as one fast, unified React application.',
    image: zombiesHubArt,
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
    image: fairwayFinderArt,
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
    slug: 'daily-bytes',
    featured: true,
    kicker: 'Full-stack · React + Express',
    title: 'The Daily Bytes',
    tagline: 'A gaming and tech news dashboard with a server-side news proxy, MongoDB reader accounts and a one-click demo.',
    image: dailyBytesArt,
    role: 'Maintainer of this fork of n6dd’s The-Daily-Bytes, which keeps the original author’s commits in its history.',
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'MongoDB Atlas', 'Mediastack', 'Render'],
    links: [
      { label: 'Source on GitHub', href: 'https://github.com/PHTMGatt/The-Daily-Bytes', primary: true },
      { label: 'Live site', href: 'https://the-daily-bytes-o4jo.onrender.com' },
    ],
    highlights: [
      { value: '15 min', label: 'bounded news cache, with a stale-cache fallback' },
      { value: 'RSS', label: 'free feed fallback when the news API is rate limited or empty' },
      { value: '0', label: 'provider keys in the browser: every call goes through the server' },
    ],
  },
  {
    slug: 'clash-automation',
    kicker: 'Automation · Discord bots',
    title: 'Clash of Clans Discord Suite',
    tagline: 'War intelligence and server operations bots, each designed to run as its own service.',
    image: clashSuiteArt,
    role: 'Designed and built all three projects: two bots and the installer that sets them up as services.',
    stack: ['Node.js', 'discord.js', 'Clash of Clans API', 'systemd', 'Raspberry Pi'],
    links: [
      { label: 'War Oracle on GitHub', href: 'https://github.com/PHTMGatt/War-Oracle-Bot', primary: true },
      { label: 'Legacy Bot on GitHub', href: 'https://github.com/PHTMGatt/Discord-Legacy-Bot' },
      { label: 'raspbi-pilot on GitHub', href: 'https://github.com/PHTMGatt/raspbi-pilot' },
    ],
    highlights: [
      { value: '2', label: 'independent Discord bots, each with its own systemd service' },
      { value: '1×', label: 'each alert fires once per condition, per war' },
      { value: '0', label: 'destructive permissions requested' },
    ],
  },
  {
    slug: '3d-modding-showcase',
    kicker: 'Front-end · 3D on the web',
    title: 'Forge & Mod: 3D Modding Showcase',
    tagline: 'A gallery for game mods and 3D assets, with an interactive model viewer, before-and-after comparisons and a headless Blender pipeline behind it.',
    image: moddingShowcaseArt,
    imageAlt: 'The showcase viewer open on the Ivory Dragon Mask v2 remaster, with light rigs and asset details',
    role: 'Solo project: the 3D assets and mods, the viewer, and the Blender export pipeline. One model was finished by a commissioned designer; each asset is labelled with who made it.',
    stack: ['React', 'Vite', 'model-viewer', 'Blender (Python)', 'Node.js', 'Vitest'],
    // Private repository and no public deployment yet: no links. Kept out of the
    // Work page's case-study strip until it has a live demo; its Work card links here.
    links: [],
    unlisted: true,
    highlights: [
      { value: '5', label: 'AI-generated remasters with a v1 / v2 toggle' },
      { value: '3.3 MB', label: 'largest remaster: Draco geometry, WebP textures' },
      { value: '4', label: 'rights labels, so every asset says who made it' },
    ],
  },
];

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);
export const listedCaseStudies = caseStudies.filter((study) => !study.unlisted);
