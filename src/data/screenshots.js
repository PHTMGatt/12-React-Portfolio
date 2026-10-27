// PORT-IMG_3 is the single source of truth for every Work-page visual.
// Do not fall back to legacy screenshots, thumbnails, Pictures, or raw GitHub assets.
const img3 = (filename) => ({ src: `/port-img3/${filename}` });

export const screenshots = {
  'zombies-hub-2': img3('zombies-hub-2.avif'),
  'fairway-finder': img3('fairway-finder.avif'),
  'war-oracle': img3('war-oracle.avif'),
  'clash-commander': img3('clash-commander.avif'),
  'raspbi-pilot': img3('raspbi-pilot.avif'),
  'captain-hook': img3('captain-hook.avif'),
  'mern-book-search': img3('mern-book-search.avif'),
  'daily-bytes': img3('daily-bytes.avif'),
  'kanban-board': img3('kanban-board.avif'),
  'candidate-search': img3('candidate-search.avif'),
  'weather-app': img3('weather-app.avif'),
  'social-network-api': img3('social-network-api.avif'),
  'tech-quiz-tests': img3('tech-quiz.avif'),
  'banking-system': img3('python-banking-system.avif'),
  portfolio: img3('react-portfolio.avif'),

  // Archived Work cards also stay inside the IMG-3 authority set.
  'zombies-hub-1': img3('zombies-hub-2.avif'),
  origins: img3('origins.avif'),
  'mob-of-the-dead': img3('mob-of-the-dead.png'),
  'der-eisendrache': img3('der-eisendrache.png'),
  zetsubou: img3('zetsubou.png'),
  'gorod-krovi': img3('gorod-krovi.png'),
  revelations: img3('revelations.png'),
};

export const screenshotFor = (id) => screenshots[id] ?? null;
