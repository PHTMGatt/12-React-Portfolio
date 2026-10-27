// Portfolio visuals are intentionally pinned to the reviewed PORT-IMG_3 batch.
// Keeping the source commit immutable prevents accidental drift while the
// project cards are being polished. Banking System remains the only text
// fallback because PORT-IMG_3 does not include an approved Banking image.
const PORT_IMG_COMMIT = 'a2c43d8301679dbda14ad06dc225d61e5515e431';

const portfolioArt = (filename) => ({
  src: `https://raw.githubusercontent.com/PHTMGatt/12-React-Portfolio/${PORT_IMG_COMMIT}/src/assets/project-images/${encodeURIComponent(filename)}`,
});

export const screenshots = {
  'zombies-hub-2': portfolioArt('Zombies Hub.png'),
  'fairway-finder': portfolioArt('Fairway Finder.png'),
  'war-oracle': portfolioArt('War Oracle.png'),
  'clash-commander': portfolioArt('Clash Commander.png'),
  'raspbi-pilot': portfolioArt('raspbi.png'),
  'captain-hook': portfolioArt('Captain Hook.png'),
  'mern-book-search': portfolioArt('Mern Book.png'),
  'daily-bytes': portfolioArt('Daily Bytes.png'),
  'kanban-board': portfolioArt('Kanban.png'),
  'candidate-search': portfolioArt('Candidate Search.png'),
  'weather-app': portfolioArt('Weather App.png'),
  'social-network-api': portfolioArt('Social Network API.png'),
  'tech-quiz-tests': portfolioArt('Tech Quiz.png'),
  'zombies-hub-1': portfolioArt('Zombies Hub.png'),
  origins: portfolioArt('Origins.png'),
  'mob-of-the-dead': portfolioArt('MOTD.png'),
  'der-eisendrache': portfolioArt('DE.png'),
  zetsubou: portfolioArt('Zetsubou.png'),
  'gorod-krovi': portfolioArt('GK.png'),
  revelations: portfolioArt('Rev.png'),
  portfolio: portfolioArt('Portfolio.png'),
};

// Returns the visual for a project id, or null to use the typographic fallback.
export const screenshotFor = (id) => screenshots[id] ?? null;
