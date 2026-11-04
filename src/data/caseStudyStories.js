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
      'Pulled 7-day OpenWeather forecasts with a Fahrenheit and Celsius toggle, and calculated a USGA handicap index from live slope and rating data.',
      'Served everything through an Apollo GraphQL API on Express and MongoDB Atlas, deployed to Render with GitHub Actions CI and scoped CSS to prevent style conflicts.',
    ],
    outcome:
      'A single-page app that replaces four separate planning tools, with a responsive interface that works on the phone in your golf bag.',
  },
  mithrandir: {
    imageAlt:
      'Mithrandir usage panel. The 5-hour window is at 88% and the 7-day window at 68%, and a notice says new worker turns are waiting because Normal mode holds new work at 85%. Below are three modes: Eco, 1 worker, holds at 70%; Normal, 2 workers, holds at 85%; Full Send, 4 workers, holds at 95%.',
    imageCaption:
      'The usage panel. Each mode sets how many workers run and the usage level at which new work is held; here Normal is holding at 85%.',
    // SCREENSHOT SLOT: when full-size captures arrive, add them under
    // src/assets/photos/, map them in screenshots.js and list them here as
    // gallery: [{ ...screenshotFor('<id>'), alt: '…' }]. CaseStudy.jsx renders
    // the gallery below the story. Wanted, 16:9 at 1920×1080 or larger: the
    // Home brief with the Needs-you list, a worker session, and Live Preview
    // with the element picker active.
    problem:
      'The individual tools in my development workflow worked, but I was still acting as the router between them: choosing the right repository and branch, finding project context, managing separate Claude sessions, checking usage, running verification, opening previews and writing another handoff before the next session could continue.',
    approach: [
      'Separated orchestration from execution. An orchestrator chat, Gandalf, dispatches work to isolated Claude Code worker sessions, one per repository, so each worker runs inside the right project instead of one long shared session. Workers can be resumed rather than restarted.',
      'Made usage limits part of scheduling. Mithrandir reads Claude Code’s real 5-hour and 7-day usage, and its modes hold new work as either window nears its limit, so a worker is not cut off halfway through a change.',
      'Gave each project a small, tracked “brain” for its current state and decisions, and archived longer history to a MongoDB Atlas “Main Memory”, so context carries forward without being pasted into chat. Session rollover writes a handoff, so a long thread can move to a fresh session without losing its place.',
      'Put everything that needs attention on one screen: a Home brief summarises activity across projects, and a Needs-you list collects anything waiting on a decision.',
      'Built verification into the loop. Live Preview runs the project with an element picker, so clicking part of the page turns into a targeted fix request, and CircleCI status is surfaced alongside the work.',
    ],
    outcome:
      'Mithrandir v1 works locally today: per-repository workers with resume, usage-aware holds, project brains, the Home brief and Needs-you list, session rollover, Live Preview with click-to-fix, Main Memory and CircleCI status.',
    currentStatus:
      'Version 2 is in progress. A capability registry and image and file input are partly built. Anything further is still planned work, so it is not described here as a feature.',
  },
  'clash-automation': {
    problem:
      'Competitive clans were checking war progress by hand and moderating busy servers manually, and running every bot as its own hosted service duplicated infrastructure cost.',
    approach: [
      'War Oracle polls the Clash of Clans API on a fixed interval, stores war snapshots over time and posts live status: score, stars, destruction and remaining attacks.',
      'Threshold-based alerts are fully deduplicated, so each condition fires once per war: no repeat pings, no channel spam.',
      'Clash Commander adds slash-command operations for leadership: permission and bot-safety audits, member snapshots and notes, inactivity reports and controlled moderator pings.',
      'raspbi-pilot is a lightweight supervisor that boots each bot’s start() in one Node process, so both run under a single Render worker or one Raspberry Pi with no code changes.',
    ],
    outcome:
      'Automated, low-noise war oversight and server operations for clan leadership, designed so two independently maintained bots could share one host instead of paying for two.',
    currentStatus:
      'Clash Commander is currently paused, and raspbi-pilot is inactive: it needs repair or retirement, so the shared-host setup described above is not running at the moment. The source for all three projects remains on GitHub.',
  },
};

// Full case study: the summary merged with its story, or undefined if unknown.
export const getCaseStudy = (slug) => {
  const summary = caseStudies.find((study) => study.slug === slug);
  return summary && { ...summary, ...stories[slug] };
};
