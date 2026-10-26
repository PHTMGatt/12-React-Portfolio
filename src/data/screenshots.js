// Authentic screenshots remain the first choice for projects with real UI.
// Every screenshot-backed project repo owns one canonical capture at
// docs/portfolio/cover.webp (also used by its README where it fits), and the
// portfolio loads it straight from GitHub so the two do not drift.
//
// A small set of projects has no meaningful UI screenshot (Discord bots,
// API/testing utilities, and the Raspberry Pi launcher). For those only, use
// the reviewed PORT-IMG_3 artwork instead of leaving an empty card. Those
// covers are served from the optimized local WebP set with responsive 640px
// variants. Banking System still uses the honest typographic fallback because
// it has no approved visual yet.
import portfolioCover from '../../docs/portfolio/cover.webp';
import warOracle from '../assets/thumbnails/webp/war-oracle.webp';
import warOracleSmall from '../assets/thumbnails/webp/war-oracle-640.webp';
import clashCommander from '../assets/thumbnails/webp/clash-commander.webp';
import clashCommanderSmall from '../assets/thumbnails/webp/clash-commander-640.webp';
import raspbiPilot from '../assets/thumbnails/webp/raspbi-pilot.webp';
import raspbiPilotSmall from '../assets/thumbnails/webp/raspbi-pilot-640.webp';
import captainHook from '../assets/thumbnails/webp/captain-hook.webp';
import captainHookSmall from '../assets/thumbnails/webp/captain-hook-640.webp';
import socialNetworkApi from '../assets/thumbnails/webp/social-network-api.webp';
import socialNetworkApiSmall from '../assets/thumbnails/webp/social-network-api-640.webp';
import techQuiz from '../assets/thumbnails/webp/tech-quiz.webp';
import techQuizSmall from '../assets/thumbnails/webp/tech-quiz-640.webp';

const cover = (repo, width, height) => ({
  src: `https://raw.githubusercontent.com/PHTMGatt/${repo}/main/docs/portfolio/cover.webp`,
  width,
  height,
});

const localArt = (src, srcSmall) => ({
  src,
  srcSmall,
  width: 1280,
  height: 720,
});

export const screenshots = {
  'zombies-hub-2': cover('Zombies-Hub-2.0', 1280, 800),
  'fairway-finder': cover('Fairway-Finder', 1176, 818),
  'war-oracle': localArt(warOracle, warOracleSmall),
  'clash-commander': localArt(clashCommander, clashCommanderSmall),
  'raspbi-pilot': localArt(raspbiPilot, raspbiPilotSmall),
  'captain-hook': localArt(captainHook, captainHookSmall),
  'mern-book-search': cover('18-MERN-Book-Search-Engine', 1280, 800),
  'daily-bytes': cover('The-Daily-Bytes', 1280, 606),
  'kanban-board': cover('14-Todo-Board', 1280, 800),
  'candidate-search': cover('13-Candidate-Search', 1280, 800),
  'weather-app': cover('09-Weather-App', 1280, 728),
  'social-network-api': localArt(socialNetworkApi, socialNetworkApiSmall),
  'tech-quiz-tests': localArt(techQuiz, techQuizSmall),
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
