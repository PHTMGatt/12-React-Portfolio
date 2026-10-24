// Real screenshots of the deployed apps, captured in a browser around April 2025
// and converted to WebP (originals kept alongside as PNG).
// To add or replace one, point the import at the new file and update its size;
// projects without an entry here render a typographic summary instead.
// See docs/IMAGE-AUDIT.md before adding anything that is not a real capture.
import candidateSearch from '../assets/Pictures/CandiSearch.webp';
import dailyBytes from '../assets/Pictures/DailyBytes.webp';
import derEisendrache from '../assets/Pictures/DE.webp';
import fairwayFinder from '../assets/Pictures/FairwayFinder.webp';
import gorodKrovi from '../assets/Pictures/GK.webp';
import mernBookSearch from '../assets/Pictures/MERN_Book_Search.webp';
import mobOfTheDead from '../assets/Pictures/MOTD.webp';
import origins from '../assets/Pictures/Origins.webp';
import revelations from '../assets/Pictures/REV.webp';
import weatherApp from '../assets/Pictures/Screenshot9New.webp';
import zetsubou from '../assets/Pictures/ZETZ.webp';
import zombiesHub1 from '../assets/Pictures/ZHub.webp';

const shot = (src, width, height) => ({ src, width, height });

export const screenshots = {
  'candidate-search': shot(candidateSearch, 1200, 570),
  'daily-bytes': shot(dailyBytes, 1200, 568),
  'der-eisendrache': shot(derEisendrache, 1200, 572),
  'fairway-finder': shot(fairwayFinder, 1176, 818),
  'gorod-krovi': shot(gorodKrovi, 1200, 574),
  'mern-book-search': shot(mernBookSearch, 1200, 575),
  'mob-of-the-dead': shot(mobOfTheDead, 1200, 570),
  origins: shot(origins, 1200, 574),
  revelations: shot(revelations, 1200, 575),
  'weather-app': shot(weatherApp, 1200, 568),
  zetsubou: shot(zetsubou, 1200, 564),
  'zombies-hub-1': shot(zombiesHub1, 1200, 747),
};

// Returns the screenshot for a project id, or null to use the typographic fallback.
export const screenshotFor = (id) => screenshots[id] ?? null;
