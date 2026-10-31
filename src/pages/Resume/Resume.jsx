import { useState } from 'react';
import { Download, ExternalLink, Loader2, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '../../data/profile';
import usePageTitle from '../../hooks/usePageTitle';
import './Resume.css';

const PORTFOLIO_URL = 'https://one2-react-portfolio.onrender.com';

// Résumé content lives here once and feeds both the page and the PDF.
const summary =
  'Full-stack developer focused on building clean, fast, user-focused web applications with React, Node and modern JavaScript tools. Experienced with REST and GraphQL APIs, databases and CI/CD pipelines. Comfortable taking clear goals, working independently and shipping reliable features quickly to help teams deliver impactful products.';

const skills = [
  { label: 'Languages', items: 'JavaScript (ES6+), TypeScript, Python, SQL, HTML5/CSS3' },
  { label: 'Frontend', items: 'React (hooks, state management), React Router, responsive UI/UX' },
  { label: 'Backend', items: 'Node.js, Express.js, REST APIs, GraphQL (Apollo)' },
  { label: 'Databases', items: 'MongoDB/Atlas, PostgreSQL' },
  { label: 'DevOps & Tools', items: 'Git/GitHub, CI/CD (GitHub Actions), ESLint, Render' },
  { label: 'Game & Design', items: 'Unity (basics), Unreal Engine (basics), Blender' },
];

const strengths = [
  'Rapid prototyping',
  'Clean, maintainable code',
  'Self-motivated and detail-oriented',
  'Clear communicator',
  '10+ years of leadership in fast-paced environments',
];

const projects = [
  {
    name: 'Zombies Hub 2.0',
    url: 'https://zombies-hub-2-0.onrender.com/',
    description:
      'Consolidated seven separate guide sites into one React application with internal routing, scoped per-map styling and CI-gated Render deploys.',
  },
  {
    name: 'Fairway Finder',
    url: 'https://fairway-finder.onrender.com',
    description:
      'Primary developer on a five-person team: MERN + GraphQL golf trip planner with course search, route maps, forecasts and handicap tracking.',
  },
  {
    name: 'Clash of Clans Discord Suite',
    url: 'https://github.com/PHTMGatt/War-Oracle-Bot',
    description:
      'War-intelligence and server-operations bots with deduplicated alerts, run together under one lightweight Node supervisor.',
  },
  {
    name: 'Daily Bytes',
    url: 'https://the-daily-bytes-o4jo.onrender.com',
    description: 'Dynamic news feed app with React and REST API integration.',
  },
];

const experience = {
  title: 'Kitchen Lead / Team Supervisor',
  dates: '2013–2025',
  points: [
    'Led daily operations and a small team in a fast-paced, high-pressure environment with strict deadlines.',
    'Trained and mentored new team members, improving consistency, efficiency and collaboration.',
    'Promoted multiple times for reliability, ownership and execution under pressure.',
    'Built strong problem-solving, time-management and communication skills that carry directly into engineering work.',
  ],
};

const buildPdf = async () => {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });

  const pageWidth = 612;
  const pageHeight = 792;
  const marginX = 48;
  const contentWidth = pageWidth - marginX * 2;
  const lh = 13;
  let y = 56;

  const ensureSpace = (needed = lh) => {
    if (y + needed > pageHeight - 48) {
      doc.addPage();
      y = 56;
    }
  };

  const heading = (text) => {
    ensureSpace(40);
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(3, 105, 161);
    doc.text(text.toUpperCase(), marginX, y);
    doc.setDrawColor(200, 210, 222);
    doc.setLineWidth(0.6);
    doc.line(marginX, y + 5, pageWidth - marginX, y + 5);
    doc.setTextColor(20, 24, 33);
    y += 22;
  };

  const paragraph = (text, { size = 10.5, bold = false, indent = 0 } = {}) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.splitTextToSize(text, contentWidth - indent).forEach((line) => {
      ensureSpace();
      doc.text(line, marginX + indent, y);
      y += lh;
    });
  };

  const bullet = (text) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.splitTextToSize(text, contentWidth - 14).forEach((line, index) => {
      ensureSpace();
      if (index === 0) doc.circle(marginX + 3, y - 3.5, 1.4, 'F');
      doc.text(line, marginX + 12, y);
      y += lh;
    });
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(11, 19, 36);
  doc.text(profile.name, marginX, y);
  y += 20;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(69, 82, 106);
  doc.text(profile.role, marginX, y);
  y += 18;
  doc.setFontSize(10);
  // Keep full addresses readable in print and actionable in the downloaded PDF.
  const contactLinks = [
    { label: profile.email, url: `mailto:${profile.email}` },
    { label: profile.github.replace('https://', ''), url: profile.github },
    { label: profile.linkedin.replace('https://www.', ''), url: profile.linkedin },
    { label: `Portfolio: ${PORTFOLIO_URL.replace('https://', '')}`, url: PORTFOLIO_URL },
  ];
  doc.setTextColor(3, 105, 161);
  contactLinks.forEach(({ label, url }) => {
    doc.splitTextToSize(label, contentWidth).forEach((line) => {
      ensureSpace();
      doc.textWithLink(line, marginX, y, { url });
      y += lh;
    });
  });
  doc.setTextColor(20, 24, 33);

  heading('Summary');
  paragraph(summary);

  heading('Technical Skills');
  skills.forEach(({ label, items }) => paragraph(`${label}: ${items}`));
  paragraph(`Strengths: ${strengths.join(' · ')}`);

  heading('Selected Projects');
  projects.forEach(({ name, url, description }) => {
    ensureSpace(lh * 3);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(name, marginX, y);
    const linkX = marginX + doc.getTextWidth(name) + 10;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(3, 105, 161);
    doc.textWithLink(url.replace('https://', ''), linkX, y, { url });
    doc.setTextColor(20, 24, 33);
    y += lh;
    paragraph(description);
    y += 3;
  });

  heading('Education');
  paragraph('Michigan State University', { bold: true });
  paragraph('Full Stack Web Development Certificate · 2025');
  ensureSpace();
  doc.setTextColor(3, 105, 161);
  doc.textWithLink('View verified credential', marginX, y, { url: profile.credential });
  doc.setTextColor(20, 24, 33);
  y += lh;

  heading('Professional Experience');
  paragraph(`${experience.title} — ${experience.dates}`, { bold: true });
  experience.points.forEach(bullet);

  doc.save('BryenGatt_Resume.pdf');
};

const Resume = () => {
  usePageTitle('Resume');
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    setBusy(true);
    try {
      await buildPdf();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="resume-page page-enter">
      <div className="container">
        <header className="resume-header">
          <div>
            <p className="eyebrow">Resume</p>
            <h1 className="page-title">{profile.name}</h1>
            <p className="resume-header__role">{profile.role}</p>
            <ul className="resume-contact">
              <li>
                <a href={`mailto:${profile.email}`}>
                  <Mail size={16} aria-hidden="true" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub aria-hidden="true" />
                  {profile.githubHandle}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin aria-hidden="true" />
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
          <button type="button" onClick={handleDownload} className="btn btn-primary" disabled={busy}>
            {busy ? (
              <Loader2 size={18} className="spin" aria-hidden="true" />
            ) : (
              <Download size={18} aria-hidden="true" />
            )}
            {busy ? 'Preparing PDF…' : 'Download PDF'}
          </button>
        </header>

        <div className="resume-layout">
          <div className="resume-main">
            <section className="resume-section" aria-labelledby="summary-title">
              <h2 id="summary-title">Summary</h2>
              <p>{summary}</p>
            </section>

            <section className="resume-section" aria-labelledby="projects-title">
              <h2 id="projects-title">Selected projects</h2>
              <ul className="resume-projects">
                {projects.map(({ name, url, description }) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {name}
                      <ExternalLink size={14} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <p>{description}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-section" aria-labelledby="experience-title">
              <h2 id="experience-title">Professional experience</h2>
              <div className="resume-role">
                <h3>{experience.title}</h3>
                <span>{experience.dates}</span>
              </div>
              <ul className="resume-bullets">
                {experience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>

            <section className="resume-section" aria-labelledby="education-title">
              <h2 id="education-title">Education</h2>
              <div className="resume-role">
                <h3>Michigan State University</h3>
                <span>2025</span>
              </div>
              <p>Full Stack Web Development Certificate</p>
              <a className="text-link resume-credential" href={profile.credential} target="_blank" rel="noopener noreferrer">
                View verified credential
                <ExternalLink size={14} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </section>
          </div>

          <aside className="resume-aside" aria-labelledby="skills-title">
            <div className="surface-card resume-skills">
              <h2 id="skills-title">Technical skills</h2>
              <dl>
                {skills.map(({ label, items }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{items}</dd>
                  </div>
                ))}
              </dl>
              <h2 className="resume-skills__strengths">Strengths</h2>
              <ul className="chip-list">
                {strengths.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Resume;
