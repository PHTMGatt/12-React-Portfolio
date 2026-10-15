import React from 'react';
import jsPDF from 'jspdf';
import { Download, ExternalLink, Github, Mail } from 'lucide-react';
import './Resume.css';

const skillGroups = [
  ['Languages', 'JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3'],
  ['Frontend', 'React, responsive UI/UX, component architecture, accessibility'],
  ['Backend', 'Node.js, Express.js, REST APIs, authentication'],
  ['Data', 'MongoDB / Atlas, PostgreSQL'],
  ['Tooling', 'Git, GitHub, GitHub Actions, ESLint, Vite, Render'],
  ['Additional', 'Discord.js, API integrations, automation, rapid prototyping'],
];

const selectedProjects = [
  {
    name: 'Zombies Hub 2.0',
    href: 'https://zombies-hub-2-0.onrender.com',
    description: 'Unified React companion app combining Zombies map guides, Easter eggs, side quests, and legacy guide content in one routed experience.',
  },
  {
    name: 'War Oracle',
    href: 'https://github.com/PHTMGatt/War-Oracle-Bot',
    description: 'Discord.js automation project using Clash of Clans data to surface practical war intelligence and clan operations tooling.',
  },
  {
    name: 'raspbi-pilot',
    href: 'https://github.com/PHTMGatt/raspbi-pilot',
    description: 'Multi-bot Node.js runtime designed to coordinate and launch automation services across hosted and Raspberry Pi environments.',
  },
];

const Resume = () => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const marginX = 48;
    let y = 54;
    const lineHeight = 17;

    const ensureSpace = (needed = 72) => {
      if (y + needed > 744) {
        doc.addPage();
        y = 52;
      }
    };

    const addSection = text => {
      ensureSpace(56);
      y += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(22, 107, 151);
      doc.text(text.toUpperCase(), marginX, y);
      y += 9;
      doc.setDrawColor(205, 218, 228);
      doc.setLineWidth(0.6);
      doc.line(marginX, y, 612 - marginX, y);
      doc.setTextColor(28, 35, 43);
      y += 17;
    };

    const addParagraph = (text, options = {}) => {
      const { bold = false, size = 10.5, indent = 0 } = options;
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(size);
      const width = 612 - marginX * 2 - indent;
      const lines = doc.splitTextToSize(text, width);
      ensureSpace(lines.length * lineHeight + 12);
      lines.forEach(line => {
        doc.text(line, marginX + indent, y);
        y += lineHeight;
      });
    };

    const addBullet = text => {
      const lines = doc.splitTextToSize(text, 612 - marginX * 2 - 18);
      ensureSpace(lines.length * lineHeight + 8);
      doc.circle(marginX + 3, y - 3, 1.4, 'F');
      lines.forEach(line => {
        doc.text(line, marginX + 13, y);
        y += lineHeight;
      });
    };

    doc.setTextColor(20, 28, 36);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(23);
    doc.text('Bryen Gatt', marginX, y);
    y += 20;
    doc.setFontSize(11);
    doc.setTextColor(22, 107, 151);
    doc.text('Full-Stack Developer', marginX, y);
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(70, 80, 90);
    doc.text('PHTMGatt@gmail.com  •  github.com/PHTMGatt', marginX, y);
    y += 10;
    doc.setDrawColor(198, 211, 221);
    doc.line(marginX, y, 612 - marginX, y);
    y += 18;

    addSection('Profile');
    addParagraph('Full-stack developer focused on building clean, fast, and intuitive web applications with React, Node.js, and modern JavaScript. I enjoy projects that combine thoughtful UI, APIs, automation, deployment, and practical product decisions.');

    addSection('Technical Skills');
    skillGroups.forEach(([label, value]) => addParagraph(`${label}: ${value}`));

    addSection('Selected Projects');
    selectedProjects.forEach(project => {
      addParagraph(project.name, { bold: true, size: 10.7 });
      addParagraph(project.description, { indent: 8 });
      doc.setTextColor(22, 107, 151);
      addParagraph(project.href, { size: 9, indent: 8 });
      doc.setTextColor(28, 35, 43);
      y += 3;
    });

    addSection('Education');
    addParagraph('Michigan State University — Full Stack Web Development Certificate (2025)', { bold: true });
    doc.setTextColor(22, 107, 151);
    addParagraph('Verified credential: msu.credential.getsmarter.com/c01af6df-f030-4aa7-9cf0-de7bc925b148', { size: 9 });
    doc.setTextColor(28, 35, 43);

    addSection('Professional Experience');
    addParagraph('Kitchen Lead / Team Supervisor — 2013–2025', { bold: true });
    addBullet('Led daily operations and teams in a fast-paced environment with strict deadlines and shifting priorities.');
    addBullet('Trained and mentored team members, improving consistency, communication, and execution.');
    addBullet('Promoted multiple times for reliability, ownership, and performance under pressure.');
    addBullet('Built leadership, problem-solving, time-management, and communication skills that transfer directly into engineering work.');

    doc.save('BryenGatt_Resume.pdf');
  };

  return (
    <section className="resume-page fade-in">
      <header className="resume-hero">
        <div>
          <span className="resume-kicker">Resume</span>
          <h1>Bryen Gatt</h1>
          <p>
            Full-stack developer building polished web applications, automation,
            APIs, and product experiences with modern JavaScript tooling.
          </p>
        </div>
        <button type="button" onClick={handleDownloadPDF} className="resume-download">
          <Download size={18} aria-hidden="true" />
          Download PDF
        </button>
      </header>

      <div className="resume-layout">
        <aside className="resume-sidebar">
          <section className="resume-panel">
            <span className="resume-section-label">Contact</span>
            <a href="mailto:PHTMGatt@gmail.com" className="resume-contact-link">
              <Mail size={16} aria-hidden="true" />
              PHTMGatt@gmail.com
            </a>
            <a
              href="https://github.com/PHTMGatt"
              target="_blank"
              rel="noreferrer"
              className="resume-contact-link"
            >
              <Github size={16} aria-hidden="true" />
              github.com/PHTMGatt
            </a>
          </section>

          <section className="resume-panel">
            <span className="resume-section-label">Technical stack</span>
            <div className="resume-skill-list">
              {skillGroups.map(([label, value]) => (
                <div key={label}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-panel">
            <span className="resume-section-label">Education</span>
            <strong className="resume-school">Michigan State University</strong>
            <p>Full Stack Web Development Certificate · 2025</p>
            <a
              href="https://msu.credential.getsmarter.com/c01af6df-f030-4aa7-9cf0-de7bc925b148#acc.iYILFzgO"
              target="_blank"
              rel="noreferrer"
              className="resume-inline-link"
            >
              Verified credential <ExternalLink size={14} aria-hidden="true" />
            </a>
          </section>
        </aside>

        <div className="resume-main">
          <section className="resume-panel resume-panel-main">
            <span className="resume-section-label">Profile</span>
            <h2>Product-minded engineering with practical execution.</h2>
            <p>
              I focus on clean, fast, user-focused software and enjoy projects that
              combine front-end polish with real application logic, integrations,
              deployment, and maintainable code.
            </p>
          </section>

          <section className="resume-panel resume-panel-main">
            <span className="resume-section-label">Selected projects</span>
            <div className="resume-projects">
              {selectedProjects.map(project => (
                <a key={project.name} href={project.href} target="_blank" rel="noreferrer">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <ExternalLink size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <section className="resume-panel resume-panel-main">
            <span className="resume-section-label">Professional experience</span>
            <div className="resume-role-heading">
              <h2>Kitchen Lead / Team Supervisor</h2>
              <span>2013–2025</span>
            </div>
            <ul className="resume-experience-list">
              <li>Led daily operations and teams in a fast-paced environment with strict deadlines and changing priorities.</li>
              <li>Trained and mentored team members, improving consistency, communication, and execution.</li>
              <li>Promoted multiple times for reliability, ownership, and performance under pressure.</li>
              <li>Built leadership, problem-solving, time-management, and communication skills that transfer directly into engineering work.</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Resume;
