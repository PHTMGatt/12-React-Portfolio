// Real screenshots of the deployed apps, captured in a browser around April 2025.
// To add or replace one, point the import at the new file and update its size;
// projects without an entry here render a typographic summary instead.
// See docs/IMAGE-AUDIT.md before adding anything that is not a real capture.
import candidateSearch from '../assets/Pictures/CandiSearch.png';
import dailyBytes from '../assets/Pictures/DailyBytes.png';
import derEisendrache from '../assets/Pictures/DE.png';
import fairwayFinder from '../assets/Pictures/FairwayFinder.png';
import gorodKrovi from '../assets/Pictures/GK.png';
import mernBookSearch from '../assets/Pictures/MERN_Book_Search.png';
import mobOfTheDead from '../assets/Pictures/MOTD.png';
import origins from '../assets/Pictures/Origins.png';
import revelations from '../assets/Pictures/REV.png';
import weatherApp from '../assets/Pictures/Screenshot9New.png';
import zetsubou from '../assets/Pictures/ZETZ.png';
import zombiesHub1 from '../assets/Pictures/ZHub.png';

const shot = (src, width, height) => ({ src, width, height });

export const screenshots = {
  'candidate-search': shot(candidateSearch, 1883, 894),
  'daily-bytes': shot(dailyBytes, 1888, 893),
  'der-eisendrache': shot(derEisendrache, 1892, 902),
  'fairway-finder': shot(fairwayFinder, 1176, 818),
  'gorod-krovi': shot(gorodKrovi, 1890, 904),
  'mern-book-search': shot(mernBookSearch, 1884, 903),
  'mob-of-the-dead': shot(mobOfTheDead, 1881, 894),
  origins: shot(origins, 1891, 904),
  revelations: shot(revelations, 1894, 908),
  'weather-app': shot(weatherApp, 1906, 902),
  zetsubou: shot(zetsubou, 1912, 898),
  'zombies-hub-1': shot(zombiesHub1, 1339, 834),
};

// Returns the screenshot for a project id, or null to use the typographic fallback.
export const screenshotFor = (id) => screenshots[id] ?? null;
