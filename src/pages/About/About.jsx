import { Link } from 'react-router-dom';
import { ArrowRight, Github, Layers3, Sparkles, TerminalSquare } from 'lucide-react';
import './About.css';
import headshot from '../../assets/Pictures/bryen_headshot.jpg';

const focusAreas = [
  'React & modern JavaScript',
  'Node.js & APIs',
  'Full-stack product UI',
  'Automation & Discord tooling',
];

const highlights = [
  {
    icon: <Layers3 aria-hidden="true" />,
    title: 'Full-stack development',
    text: 'Responsive interfaces, APIs, authentication, data flows, and production-minded application structure.',
  },
  {
    icon: <TerminalSquare aria-hidden="true" />,
    title: 'Automation & tooling',
    text: 'Bots, developer utilities, deployment workflows, and practical systems built to remove repetitive work.',
  },
  {
    icon: <Sparkles aria-hidden="true" />,
    title: 'Experience-driven UI',
    text: 'Clear hierarchy, polished interactions, strong visual identity, and interfaces designed to feel intentional.',
  },
];

const About = () => {
  return (
    <section className="home-shell fade-in">
      <div className="home-hero">
        <div className="home-copy">
          <div className="home-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Full-stack developer • Web • Automation
          </div>

          <h1 className="home-title">
            I build software that feels
            <span> deliberate.</span>
          </h1>

          <p className="home-lede">
            I’m Bryen Gatt, a full-stack developer focused on fast, intuitive web
            experiences, practical automation, and products that are as thoughtful
            behind the scenes as they are on screen.
          </p>

          <div className="home-actions" aria-label="Primary portfolio actions">
            <Link className="home-button home-button-primary" to="/work">
              Explore my work
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="home-button home-button-secondary" to="/contact">
              Get in touch
            </Link>
            <a
              className="home-icon-link"
              href="https://github.com/PHTMGatt"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Bryen Gatt's GitHub profile"
            >
              <Github size={21} aria-hidden="true" />
            </a>
          </div>

          <div className="home-stack" aria-label="Core development focus">
            {focusAreas.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="home-portrait-wrap" aria-label="Portrait of Bryen Gatt">
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-frame">
            <img src={headshot} alt="Bryen Gatt" />
          </div>
          <div className="portrait-card">
            <span>Currently building</span>
            <strong>Zombies Hub 2.0</strong>
            <small>Unified guides, tools, and map experiences.</small>
          </div>
        </div>
      </div>

      <div className="home-divider" aria-hidden="true" />

      <section className="home-capabilities" aria-labelledby="capabilities-title">
        <div className="section-intro">
          <span className="section-kicker">What I care about</span>
          <h2 id="capabilities-title">Useful software. Clean execution.</h2>
          <p>
            I like projects with real moving parts: interfaces, APIs, deployments,
            automation, and the details that make the finished product feel complete.
          </p>
        </div>

        <div className="capability-grid">
          {highlights.map(({ icon, title, text }) => (
            <article className="capability-card" key={title}>
              <div className="capability-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-project-callout" aria-label="Featured project callout">
        <div>
          <span className="section-kicker">Flagship project</span>
          <h2>Zombies Hub 2.0</h2>
          <p>
            A growing Call of Duty Zombies companion that brings map guides,
            Easter eggs, speedrun references, and legacy guide content into one
            cohesive application.
          </p>
        </div>
        <Link className="text-link" to="/work">
          View project collection <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </section>
  );
};

export default About;
