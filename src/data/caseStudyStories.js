// Long-form case-study content, imported only by the case-study route so it
// stays out of the main bundle. Summaries live in ./caseStudies.js.

import { caseStudies } from './caseStudies';
import { screenshotFor } from './screenshots';

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
      'Mithrandir artwork: a wizard at a desk facing a monitor showing the Mithrandir Claude Code Command Center, with the Gandalf Main Chat, a Working Now list of three repositories and a glowing crystal orb.',
    imageCaption:
      'Mithrandir, my Claude Code command center (artwork). The usage panel below is redrawn from a real capture.',
    gallery: [
      {
        ...screenshotFor('mithrandir-usage'),
        alt: 'The usage panel, redrawn for clarity from a real capture: no 5-hour reading since the window reset, the 7-day window at 78%, and the three modes (Eco, Normal, Full Send).',
      },
    ],
    problem:
      'I run several real projects at once with AI coding agents, and I had become the bottleneck between them. I picked the repository and branch, re-explained context every session, juggled separate Claude chats, watched usage limits by hand, ran checks, opened previews, and pasted huge summaries from one chat to the next whenever a conversation grew too long. The agents were fast; the workflow around them was not.',
    approach: [
      'One orchestrator, many isolated workers. I talk to a single chat, Gandalf. It plans and delegates, but cannot touch code itself; each task goes to a Claude Code worker that runs inside one repository on my PC, working directly with that project’s local files, tests and git.',
      'Guardrails that are enforced, not requested. Workers may edit, test, build, commit and push feature branches; force-pushes, pushes to main, branch deletion and destructive git commands are refused by a pre-command hook. Nothing reaches main or production without my approval.',
      'Usage limits as a scheduling input. Every Claude Code turn reports real 5-hour and 7-day usage; Mithrandir records it, and its modes (Eco, Normal, Full Send) cap parallel workers and hold new work near the limit instead of starting something that would be cut off halfway.',
      'Memory that outlives any chat. Each project keeps a small tracked “brain” (Now, Next, Decisions, Rejected, Watch), and long-term history lives in MongoDB Atlas, the Main Memory, with facts dated, linked to their source and marked as verified or only reported. A new assistant session, Claude or ChatGPT, can look up just what it needs instead of being handed a wall of summary.',
      'Chats that never wear out. Mithrandir tracks how big Gandalf’s session is from real token counts. When it gets long, Gandalf writes a structured handoff and continues in a fresh session (Alpha → Bravo → Charlie), so the work carries on without re-reading a huge history on every turn.',
      'Verification in the loop. Live Preview runs a project’s dev server behind an element picker, so clicking part of the page becomes a precise fix request to that project’s worker; CircleCI results and a Needs-you list sit on the same screen.',
    ],
    outcome:
      'Mithrandir v1 runs on my PC every day. I describe what I want once, and the right worker does it in the right repository, within my plan’s limits, with its results and the project’s memory waiting for the next session. It is how I build my other projects, including this portfolio.',
    vision: {
      intro:
        'Mithrandir is the hub of a bigger personal system. The goal is a ChatGPT-style assistant I can use anywhere, which does the real work on my own machines and remembers everything. Each piece below is marked honestly with where it stands.',
      items: [
        {
          title: 'Smart model routing',
          status: 'In progress',
          text: 'Gandalf picks the model each task needs (Haiku for quick mechanical jobs, Sonnet for everyday work, Opus for hard problems) and hands off long chats automatically, saving each handoff to Main Memory.',
        },
        {
          title: 'Mithrandir in my pocket',
          status: 'Planned',
          text: 'A phone app that feels like ChatGPT but drives my own setup: start or steer work from anywhere, approve merges, and let Mithrandir create, refresh, store and clean up chats on its own.',
        },
        {
          title: 'Raspberry Pi “Shire” node',
          status: 'Planned',
          text: 'An always-on Pi that queues work while my PC sleeps, wakes it with Wake-on-LAN, runs schedules and light coding or bot jobs overnight, and coordinates backups with its own credentials.',
        },
        {
          title: 'VEGAS Pro 27 through MCP',
          status: 'Planned',
          text: 'Claude reaching my video editor: Mithrandir hands footage jobs to my Sony VEGAS automation project, which indexes clips, finds highlights and drives VEGAS Pro 27 through a VEGAS MCP bridge to assemble rough cuts. Source footage is never modified.',
        },
        {
          title: 'Capture to YouTube',
          status: 'Planned',
          text: 'Gameplay captured with NVIDIA Instant Replay or OBS flows through indexing and a VEGAS rough cut to a review step, then on to YouTube, with the Pi keeping the pipeline moving.',
        },
        {
          title: 'One MCP router',
          status: 'Planned',
          text: 'A single router between Gandalf and every tool (GitHub, Render, MongoDB, CircleCI, VEGAS, Blender, the Pi) that handles permissions, health checks, logging and usage limits in one place.',
        },
      ],
    },
    currentStatus:
      'Everything in “What I built” works today. Items marked In progress are built and tested but not yet released; Planned items are designed but not built, and they are not presented here as features.',
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
