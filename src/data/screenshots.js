// Authentic screenshots remain the first choice for projects with real UI.
// Every screenshot-backed project repo owns one canonical capture at
// docs/portfolio/cover.webp (also used by its README where it fits), and the
// portfolio loads it straight from GitHub so the two do not drift.
//
// A small set of projects has no meaningful UI screenshot (Discord bots,
// API/testing utilities, and the Raspberry Pi launcher). For those only, use
// the reviewed PORT-IMG_3 artwork instead of leaving an empty card. The art is
// loaded from its immutable source commit so these multi-megabyte PNGs do not
// get copied into the Vite production bundle. Banking System still uses the
// honest typographic fallback because it has no approved visual yet.
import portfolioCover from '../../docs/portfolio/cover.webp';

const PORT_IMG_COMMIT = 'a2c43d8301679dbda14ad06dc225d61e5515e431';

const cover = (repo, width, height) => ({
  src: `https://raw.githubusercontent.com/PHTMGatt/${repo}/main/docs/portfolio/cover.webp`,
  width,
  height,
});

const portfolioArt = (filename) => ({
  src: `https://raw.githubusercontent.com/PHTMGatt/12-React-Portfolio/${PORT_IMG_COMMIT}/src/assets/project-images/${encodeURIComponent(filename)}`,
});

export const screenshots = {
  'zombies-hub-2': cover('Zombies-Hub-2.0', 1280, 800),
  'fairway-finder': cover('Fairway-Finder', 1176, 818),
  'war-oracle': portfolioArt('War Oracle.png'),
  'clash-commander': portfolioArt('Clash Commander.png'),
  'raspbi-pilot': portfolioArt('raspbi.png'),
  'captain-hook': portfolioArt('Captain Hook.png'),
  'mern-book-search': cover('18-MERN-Book-Search-Engine', 1280, 800),
  'daily-bytes': cover('The-Daily-Bytes', 1280, 606),
  'kanban-board': cover('14-Todo-Board', 1280, 800),
  'candidate-search': cover('13-Candidate-Search', 1280, 800),
  'weather-app': cover('09-Weather-App', 1280, 728),
  'social-network-api': portfolioArt('Social Network API.png'),
  'tech-quiz-tests': portfolioArt('Tech Quiz.png'),
  'zombies-hub-1': cover('Zombies-Hub', 1280, 798),
  origins: cover('Origins-Guide', 1280, 612),
  'mob-of-the-dead': cover('MOTD-Guide', 1280, 608),
  'der-eisendrache': cover('Der-Eisendrache-Guide', 1280, 610),
  zetsubou: cover('Zetsubou-Guide', 1280, 602),
  'gorod-krovi': cover('Gorod-Krovi-Guide', 1280, 612),
  revelations: cover('Revelations-Guide', 1280, 614),
  // This repo's own cover is bundled locally: its default branch (sandbox)
  // is not where unreleased work lives, so a GitHub URL could point at a
  // stale or missing file.
  portfolio: { src: portfolioCover, width: 1280, height: 800 },
};

// Returns the visual for a project id, or null to use the typographic fallback.
export const screenshotFor = (id) => screenshots[id] ?? null;
