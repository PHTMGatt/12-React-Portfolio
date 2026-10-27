// Canonical Portfolio Work-card visuals.
// Replace a file in src/assets/photos/ to update the Portfolio card and every
// matching repository README that references the same main-branch asset.
import candidateSearch from '../assets/photos/Candidate Search.png';
import captainHook from '../assets/photos/Captain Hook.png';
import clashCommander from '../assets/photos/Clash Commander.webp';
import derEisendrache from '../assets/photos/DE.png';
import dailyBytes from '../assets/photos/Daily Bytes.png';
import fairwayFinder from '../assets/photos/Fairway Finder.png';
import gorodKrovi from '../assets/photos/GK.png';
import kanban from '../assets/photos/Kanban.png';
import mobOfTheDead from '../assets/photos/MOTD.png';
import mernBook from '../assets/photos/Mern Book.png';
import origins from '../assets/photos/Origins.png';
import portfolio from '../assets/photos/Portfolio.png';
import revelations from '../assets/photos/Rev.png';
import socialNetwork from '../assets/photos/Social Network API.png';
import techQuiz from '../assets/photos/Tech Quiz.png';
import warOracle from '../assets/photos/War Oracle.png';
import weatherApp from '../assets/photos/Weather App.png';
import zetsubou from '../assets/photos/Zetsubou.png';
import zombiesHub from '../assets/photos/Zombies Hub.png';
import raspbi from '../assets/photos/raspbi.png';

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
  'zombies-hub-1': artwork(zombiesHub),
  origins: artwork(origins),
  'mob-of-the-dead': artwork(mobOfTheDead),
  'der-eisendrache': artwork(derEisendrache),
  zetsubou: artwork(zetsubou),
  'gorod-krovi': artwork(gorodKrovi),
  revelations: artwork(revelations),
  portfolio: artwork(portfolio),
};

export const screenshotFor = (id) => screenshots[id] ?? null;
