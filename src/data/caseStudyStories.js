// Long-form case-study content, imported only by the case-study route so it
// stays out of the main bundle. Summaries live in ./caseStudies.js.

import { caseStudies } from './caseStudies';

const stories = {
  'zombies-hub-2': {
    problem:
      'Zombies Hub 1.0 ran every map guide as its own React app on its own Render service. Moving between maps meant jumping between independent deployments, with duplicated code, duplicated dependencies and repeated cold-start delays.',
    approach: [
      'Rebuilt the project as one React application with a single router, so each dedicated map guide loads as an internal route instead of a separate website.',
      'Organised the codebase into a main hub app, self-contained map modules and shared UI, with map CSS scoped per module so one guide can never restyle another or the hub.',
      'Designed each guide around one question, “what do I do next?”, with short visual steps, puzzle solvers, boss references and video timestamps where seeing a location beats reading about it.',
      'Added a quality gate: source verification and a production compile on every push, Render deploys only after CI passes, and every build writes build-info.json so the live site maps to an exact commit.',
      'Set up scheduled production smoke checks plus an on-demand 100-page desktop and mobile screenshot pass for visual QA.',
    ],
    outcome:
      'One codebase and one hosting service replace a fleet of separate sites. Map-to-map navigation is instant, each guide keeps its own visual identity, and releases follow a repeatable, verified pipeline.',
  },
  'fairway-finder': {
    problem:
      'Planning a golf trip usually means juggling separate tools for course details, driving directions, the weather on tee-off day and handicap maths.',
    approach: [
      'Built secure sign-up and login with JSON Web Tokens, using React Context so the interface updates the moment auth state changes, with no page reloads.',
      'Integrated the Golf Course API for course search with tee-box ratings and slopes, saved straight to a trip itinerary.',
      'Added route planning with the Google Maps API, including amenities such as courses, fuel and rest areas along the way.',
      'Integrated Open-Meteo forecasts for the saved trip date with a Fahrenheit and Celsius toggle, and calculated a USGA handicap index from live slope and rating data.',
      'Served everything through an Apollo GraphQL API on Express and MongoDB Atlas, deployed to Render with GitHub Actions CI and scoped CSS to prevent style conflicts.',
    ],
    outcome:
      'A single-page app that replaces four separate planning tools, with a responsive interface that works on the phone in your golf bag.',
  },
  'daily-bytes': {
    problem:
      'Gaming and PC-hardware news is spread across general news sites and noisy feeds. I wanted one dashboard built around the topics I actually follow (games, Witcher and CDPR, NVIDIA RTX and AMD Radeon, GPU, RAM and SSD pricing) that could use a news API without ever putting its key in the browser.',
    approach: [
      'A React and TypeScript client (Vite) talks only to an Express and TypeScript server. The server proxies Mediastack with the key held in an environment variable, so no provider key reaches the browser or the repo.',
      'When Mediastack is rate limited, failing or empty, free RSS feeds (IGN, PC Gamer, GameSpot, Eurogamer and others) fill in. A 15-minute bounded cache with a stale-cache fallback means a provider hiccup does not blank the page.',
      'Server-side relevance ranking and deduplication handle keyword matches, duplicate headlines and URLs, and freshness. Gaming and Tech hubs, global search, trending and category feeds all have real loading, error, empty, retry and pagination states.',
      'Reader accounts use MongoDB Atlas, bcrypt-hashed passwords (cost 12) and 12-hour signed JWTs, with saved articles protected by a per-user unique URL. A one-click demo session is issued by the server, so visitors can try it without signing up.',
      'Abuse limits and checks: rate limits on login, register, demo and news routes, a 100 KB request cap, a restrictive set of security headers, and a gated build that runs the client and server tests, with CI running secret scanning and a dependency audit on every pull request.',
    ],
    outcome:
      'A live dashboard on Render that visitors can open and use right away through the demo session, and that keeps showing stories when the main news provider fails.',
    currentStatus:
      'Live on Render’s free plan, so the first visit after a quiet spell can take up to a minute to wake up. The repository is a fork of n6dd’s The-Daily-Bytes and keeps the original author’s commits.',
  },
  'clash-automation': {
    problem:
      'Competitive clans were checking war progress by hand and moderating busy servers manually, and running every bot as its own hosted service duplicated infrastructure cost.',
    approach: [
      'War Oracle polls the Clash of Clans API on a fixed interval, stores war snapshots over time and posts live status: score, stars, destruction and remaining attacks.',
      'Threshold-based alerts are fully deduplicated, so each condition fires once per war: no repeat pings, no channel spam.',
      'War Oracle handles war alerts and basic permission-gated Discord channel lockdown, unlock, own-message cleanup and /whoami commands.',
      'raspbi-pilot installs separate hardened systemd units for Legacy Bot and War Oracle on a Raspberry Pi; no confirmed Pi live runtime yet.',
    ],
    outcome:
      'Automated, low-noise war oversight and server operations for clan leadership, designed so two independently maintained bots can run as separate services instead of each needing its own paid host.',
    currentStatus:
      'Clash Commander and Captain Hook have been superseded by War Oracle and Legacy Bot. The two-service Raspberry Pi installation is documented, but production Pi operation is not yet verified.',
  },
};

// Full case study: the summary merged with its story, or undefined if unknown.
export const getCaseStudy = (slug) => {
  const summary = caseStudies.find((study) => study.slug === slug);
  return summary && { ...summary, ...stories[slug] };
};
