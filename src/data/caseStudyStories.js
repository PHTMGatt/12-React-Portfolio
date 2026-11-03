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
    problem:
      'The individual tools in my development workflow worked, but I was still acting as the router between them: choosing the right repository and branch, finding project context, managing separate Claude sessions, checking usage, running verification, opening previews and writing another handoff before the next session could continue.',
    approach: [
      'Separated orchestration from execution. Gandalf is the front-door conversation, while isolated Claude Code workers do repository work inside the correct project context instead of sharing one giant session.',
      'Separated current truth from deep history. Small tracked Project Brains hold Now, Next, Decisions, Rejected and Watch; MongoDB Main Memory stores larger archives, reconciled notes and historical state so chat history is no longer the database.',
      'Made resource limits part of the scheduler. Mithrandir consumes Claude Code’s real five-hour and weekly usage readings and holds new worker turns before they are likely to run out of headroom mid-change.',
      'Built verification into the workflow with local checks, Live Preview, click-to-fix context and CircleCI, while keeping broad credentials and automatic merges or deploys outside the default path.',
      'Introduced a capability-manager model so services such as Main Memory and CircleCI expose a common status contract. That gives later Pi, local-PC and application integrations a reusable place to plug in instead of becoming one-off dashboard code.',
    ],
    outcome:
      'Mithrandir v1 became a working local command center for project workers, memory, previews and verification. The active v2 work is turning that proof into a stronger platform with native image/file context, capability routing and tighter durable-memory boundaries.',
    currentStatus:
      'This is an active systems project, not a finished “AI assistant” claim. The current product works locally today; the roadmap extends it toward an always-on Raspberry Pi steward, mobile access, MCP-controlled local tools and creative workflows that could connect capture, VEGAS, scheduling, persistent memory and YouTube preparation. Those roadmap pieces are intentionally presented as future architecture until they are implemented.',
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
