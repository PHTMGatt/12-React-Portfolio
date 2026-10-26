// PORT-IMG_3 is the current portfolio artwork authority.
// Keep these local assets as the displayed covers until the user explicitly
// replaces them with a newer image set. Projects without a PORT-IMG_3 asset
// continue to use the existing typographic fallback.
import candidateSearch from '../assets/project-images/Candidate Search.png';
import captainHook from '../assets/project-images/Captain Hook.png';
import clashCommander from '../assets/project-images/Clash Commander.png';
import derEisendrache from '../assets/project-images/DE.png';
import dailyBytes from '../assets/project-images/Daily Bytes.png';
import fairwayFinder from '../assets/project-images/Fairway Finder.png';
import gorodKrovi from '../assets/project-images/GK.png';
import kanban from '../assets/project-images/Kanban.png';
import mobOfTheDead from '../assets/project-images/MOTD.png';
import mernBook from '../assets/project-images/Mern Book.png';
import origins from '../assets/project-images/Origins.png';
import portfolio from '../assets/project-images/Portfolio.png';
import revelations from '../assets/project-images/Rev.png';
import socialNetwork from '../assets/project-images/Social Network API.png';
import techQuiz from '../assets/project-images/Tech Quiz.png';
import warOracle from '../assets/project-images/War Oracle.png';
import weatherApp from '../assets/project-images/Weather App.png';
import zetsubou from '../assets/project-images/Zetsubou.png';
import zombiesHub from '../assets/project-images/Zombies Hub.png';
import raspbi from '../assets/project-images/raspbi.png';

const artwork = (src) => ({ src });

export const screenshots = {
  'zombies-hub-2': artwork(zombiesHub),
  'fairway-finder': artwork(fairwayFinder),
  'war-oracle': artwork(warOracle),
  'clash-commander': artwork(clashCommander),
  'raspbi-pilot': artwork(raspbi),
  'captain-hook': artwork(captainHook),
  'mern-book-search': artwork(mernBook),
  'daily-bytes': artwork(dailyBytes),
  'kanban-board': artwork(kanban),
  'candidate-search': artwork(candidateSearch),
  'weather-app': artwork(weatherApp),
  'social-network-api': artwork(socialNetwork),
  'tech-quiz-tests': artwork(techQuiz),
  portfolio: artwork(portfolio),

  // PORT-IMG_3 has one Zombies Hub cover, so use it for both current and
  // archived hub cards until a separate 1.0 replacement is supplied.
  'zombies-hub-1': artwork(zombiesHub),
  origins: artwork(origins),
  'mob-of-the-dead': artwork(mobOfTheDead),
  'der-eisendrache': artwork(derEisendrache),
  zetsubou: artwork(zetsubou),
  'gorod-krovi': artwork(gorodKrovi),
  revelations: artwork(revelations),
};

// Banking System has no PORT-IMG_3 image yet, so it intentionally keeps the
// honest typographic fallback until a replacement is provided.
export const screenshotFor = (id) => screenshots[id] ?? null;
