// Canonical Portfolio Work-card visuals.
// Replace a file in src/assets/photos/ to update the Portfolio card and every
// matching repository README that references the same main-branch asset.
// npm run build/dev regenerates delivery variants from those approved originals.

import { artwork as generatedArtwork } from '../assets/photos/generated/index.js';

const artwork = (filename) => generatedArtwork[filename];

export const screenshots = {
  'zombies-hub-2': artwork('Zombies Hub.png'),
  'fairway-finder': artwork('Fairway Finder.png'),
  'war-oracle': artwork('War Oracle.png'),
  'clash-commander': artwork('Clash Commander.webp'),
  'clash-suite': artwork('Clash Suite.webp'),
  'raspbi-pilot': artwork('raspbi.png'),
  'captain-hook': artwork('Captain Hook.png'),
  'mern-book-search': artwork('Mern Book.png'),
  'daily-bytes': artwork('Daily Bytes.png'),
  'kanban-board': artwork('Kanban.png'),
  'candidate-search': artwork('Candidate Search.png'),
  'weather-app': artwork('Weather App.png'),
  'social-network-api': artwork('Social Network API.png'),
  'tech-quiz-tests': artwork('Tech Quiz.png'),
  'banking-system': artwork('Banking System.webp'),
  'zombies-hub-1': artwork('Zombies Hub.png'),
  origins: artwork('Origins.png'),
  'mob-of-the-dead': artwork('MOTD.png'),
  'der-eisendrache': artwork('DE.png'),
  zetsubou: artwork('Zetsubou.png'),
  'gorod-krovi': artwork('GK.png'),
  revelations: artwork('Rev.png'),
  portfolio: artwork('Portfolio.png'),
};

export const screenshotFor = (id) => screenshots[id] ?? null;
