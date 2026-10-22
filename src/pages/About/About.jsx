import { Link } from 'react-router-dom';
import { ArrowRight, Award, Bot, LayoutDashboard, Mail, Server, Users } from 'lucide-react';
import FeaturedStudy from '../../components/FeaturedStudy/FeaturedStudy';
import { caseStudies } from '../../data/projects';
import { coreStack, profile } from '../../data/profile';
import usePageTitle from '../../hooks/usePageTitle';
import headshot from '../../assets/Pictures/bryen-headshot.webp';
import './About.css';

const capabilities = [
  {
    icon: LayoutDashboard,
    title: 'Product front-ends',
    body: 'Responsive React and TypeScript interfaces with clean routing, scoped styling and the small interaction details that make an app feel effortless.',
    tags: ['React', 'TypeScript', 'Vite', 'Responsive UI'],
  },
  {
    icon: Server,
    title: 'APIs & data',
    body: 'REST and GraphQL back-ends on Node and Express, with MongoDB or PostgreSQL, JWT authentication and third-party API integrations.',
    tags: ['Node.js', 'Express', 'GraphQL', 'MongoDB'],
  },
  {
    icon: Bot,
    title: 'Automation & delivery',
    body: 'Discord bots, webhooks and multi-service runtimes, shipped through GitHub Actions CI to Render or a Raspberry Pi.',
    tags: ['discord.js', 'Webhooks', 'GitHub Actions', 'Render'],
  },
];

const principles = [
  {
    title: 'Ship complete features',
    body: 'Interface, API, data and deployment: I take work all the way to production, not just to “works on my machine”.',
  },
  {
    title: 'Keep it maintainable',
    body: 'Clear structure, scoped styles and CI checks, so the tenth change is as safe as the first.',
  },
  {
    title: 'Sweat the details',
    body: 'Responsive layouts, accessible interactions and fast loads are part of done, not extras.',
  },
];

const About = () => {
  usePageTitle();

  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">
            <span className="hero__dot" aria-hidden="true" />
            {profile.name} · {profile.role}
          </p>
          <h1 id="hero-title" className="hero__title">
            I build fast, dependable web apps <span>and the automation behind them.</span>
          </h1>
          <p className="hero__lede">
            I design and ship complete products with React, Node and modern JavaScript: the interface, the API, the
            data and the deployment pipeline. I care about maintainable code and the small details that make software
            feel effortless to use.
          </p>
          <div className="hero__actions">
            <Link to="/work" className="btn btn-primary">
              View my work
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
            <Link to="/resume" className="btn btn-ghost">
              Resume
            </Link>
          </div>
          <ul className="hero__facts">
            <li>
              <Award size={17} aria-hidden="true" />
              MSU Full Stack Web Development Certificate
            </li>
            <li>
              <Users size={17} aria-hidden="true" />
              10+ years leading teams under pressure
            </li>
          </ul>
        </div>

        <div className="hero__portrait">
          <img src={headshot} width="640" height="800" alt="Portrait of Bryen Gatt" fetchPriority="high" />
        </div>
      </section>

      {/* Stack */}
      <section className="stack-strip" aria-label="Technologies I work with">
        <div className="container stack-strip__inner">
          <p className="stack-strip__label">Tools I ship with</p>
          <ul className="chip-list">
            {coreStack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected work */}
      <section className="section container" aria-labelledby="work-title">
        <div className="section-header">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="section-title">
            Projects that show how I think
          </h2>
          <p className="section-lede">
            Three projects, three different problems: consolidating a sprawling front-end, building a full-stack app
            with a team, and automating the busywork of running a community.
          </p>
        </div>

        {caseStudies.map((study, index) => (
          <FeaturedStudy key={study.slug} study={study} index={index} />
        ))}

        <div className="home__more">
          <Link to="/work" className="btn btn-secondary">
            Browse all projects
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section section--tint" aria-labelledby="build-title">
        <div className="container">
          <div className="section-header section-header--center">
            <p className="eyebrow">What I build</p>
            <h2 id="build-title" className="section-title">
              End to end, from pixels to production
            </h2>
          </div>
          <div className="capabilities">
            {capabilities.map(({ icon: Icon, title, body, tags }) => (
              <article key={title} className="capability surface-card">
                <span className="capability__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
                <ul className="chip-list">
                  {tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section container about" aria-labelledby="about-title">
        <div className="about__story">
          <p className="eyebrow">About me</p>
          <h2 id="about-title" className="section-title">
            Twelve years of high-pressure teamwork, now pointed at software
          </h2>
          <p>
            Before development, I spent more than a decade as a kitchen lead and team supervisor: running service
            against hard deadlines, training new team members, and earning multiple promotions for reliability and
            ownership. Those habits carry straight into engineering. I plan the work, communicate early and ship on
            time without cutting corners.
          </p>
          <p>
            I bring a game-design mindset to everything I make: exploring ideas, refining interactions and adding the
            subtle touches that make a project more engaging without sacrificing clarity or usability.
          </p>
          <a className="text-link" href={profile.credential} target="_blank" rel="noopener noreferrer">
            View my MSU credential
            <ArrowRight size={16} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <ol className="about__principles">
          {principles.map((item, index) => (
            <li key={item.title}>
              <span className="about__index" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="container" aria-labelledby="cta-title">
        <div className="cta-band">
          <div>
            <h2 id="cta-title">Have a role or a project in mind?</h2>
            <p>I’d love to hear about it. Send a message and I’ll get back to you.</p>
          </div>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn-primary">
              Contact me
            </Link>
            <a href={`mailto:${profile.email}`} className="btn btn-secondary">
              <Mail size={17} aria-hidden="true" />
              {profile.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
