// Real screenshots of each project. Every project repo owns one canonical
// capture at docs/portfolio/cover.webp (also used by its README where it
// fits), and the portfolio loads it straight from GitHub so the two never
// drift. To replace one, push a new cover.webp to that repo's main branch and
// update its size here.
// Projects without an entry render a typographic summary instead: the Discord
// bots, Social Network API, Tech Quiz and Banking System have no real UI
// capture yet. See docs/IMAGE-AUDIT.md before adding anything that is not a
// real capture.
import portfolioCover from '../../docs/portfolio/cover.webp';

const cover = (repo, width, height) => ({
  src: `https://raw.githubusercontent.com/PHTMGatt/${repo}/main/docs/portfolio/cover.webp`,
  width,
  height,
});

export const screenshots = {
  'zombies-hub-2': cover('Zombies-Hub-2.0', 1280, 800),
  'fairway-finder': cover('Fairway-Finder', 1176, 818),
  'mern-book-search': cover('18-MERN-Book-Search-Engine', 1280, 800),
  'daily-bytes': cover('The-Daily-Bytes', 1280, 606),
  'kanban-board': cover('14-Todo-Board', 1280, 800),
  'candidate-search': cover('13-Candidate-Search', 1280, 800),
  'weather-app': cover('09-Weather-App', 1280, 728),
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

// Returns the screenshot for a project id, or null to use the typographic fallback.
export const screenshotFor = (id) => screenshots[id] ?? null;
