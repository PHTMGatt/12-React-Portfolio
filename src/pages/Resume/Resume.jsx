import React from 'react';
import jsPDF from 'jspdf';
import './Resume.css';

const Resume = () => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });

    const marginX = 48;
    let y = 56;
    const lh = 18; // line height

    const addHeader = (text) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text(text, marginX, y);
      y += 10;
      doc.setLineWidth(0.8);
      doc.line(marginX, y, 612 - marginX, y);
      y += 18;
    };

    const addSubheader = (text) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text(text, marginX, y);
      y += lh;
    };

    const addParagraph = (text, size = 11) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(size);
      const wrapped = doc.splitTextToSize(text, 612 - marginX * 2);
      wrapped.forEach(line => {
        doc.text(line, marginX, y);
        y += lh;
      });
    };

    const addBullet = (text) => {
      const wrapped = doc.splitTextToSize(text, 612 - marginX * 2 - 16);
      doc.circle(marginX + 3, y - 4, 1.5, 'F');
      wrapped.forEach((line, idx) => {
        // draw bullet only once per item
        if (idx === 0) {
          doc.text(line, marginX + 12, y);
        } else {
          doc.text(line, marginX + 12, y);
        }
        y += lh;
      });
    };

    // HEADER
    addHeader('Bryen Gatt');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Email: PHTMGatt@gmail.com   ·   Discord: LordxIlluminati   ·   GitHub: github.com/PHTMGatt',
      marginX,
      y
    );
    y += lh + 6;

    // OBJECTIVE (tailored for CDPR / systems & quests)
    addSubheader('Objective');
    addParagraph(
      'Emerging game developer focused on systems and quest/Easter-egg design that rewards exploration and problem-solving. Draw on 10+ years of leadership in high-end kitchens—precision, reliability, and calm under pressure—and full-stack skills (React, Node, TypeScript) to prototype tools, streamline pipelines, and collaborate across disciplines. Motivated by CD Projekt Red’s worldbuilding and the challenge of tightly-designed secrets.'
    );

    // SKILLS
    addSubheader('Skills');
    addParagraph('Languages: JavaScript (ES6+), TypeScript, HTML5/CSS3, SQL, Python');
    addParagraph('Frontend: React (hooks, state management), responsive UI');
    addParagraph('Backend: Node.js, Express.js, REST APIs');
    addParagraph('Databases: MongoDB/Atlas, PostgreSQL');
    addParagraph('DevOps & Practices: Git/GitHub, GitHub Actions (CI/CD), ESLint, Prettier');
    addParagraph('Game/World Tools: Blender, Unreal Engine (basics), Axiom (Minecraft world editing)');
    addParagraph('Core Strengths: Team leadership, quality control, execution under pressure');

    // PROJECTS
    addSubheader('Projects (select)');
    addBullet('Zombies Hub — BO3 multi-map guide with mobile-first UI (React). https://zombies-hub.onrender.com');
    addBullet('Daily Bytes — lightweight news feed (React). https://the-daily-bytes-o4jo.onrender.com');
    addBullet('Fairway Finder — golf shot tracker & insights. https://fairway-finder.onrender.com');

    // EDUCATION
    addSubheader('Education');
    doc.setFont('helvetica', 'bold');
    doc.text('Michigan State University', marginX, y);
    y += lh;
    doc.setFont('helvetica', 'normal');
    doc.text('Full Stack Web Development Certificate · 2025', marginX, y);
    y += lh;

    doc.setTextColor(0, 0, 255);
    doc.textWithLink(
      'View verified credential',
      marginX,
      y,
      { url: 'https://msu.credential.getsmarter.com/c01af6df-f030-4aa7-9cf0-de7bc925b148#acc.iYILFzgO' }
    );
    doc.setTextColor(0, 0, 0);
    y += lh;

    doc.text('High School Diploma', marginX, y);
    y += lh;

    // EXPERIENCE
    addSubheader('Experience');
    addParagraph('Sous Chef / Kitchen Lead — 2013–2025');
    addBullet('Directed nightly operations in high-end kitchens; upheld strict quality and consistency.');
    addBullet('Mentored and trained teams; improved execution, communication, and problem-solving.');
    addBullet('Advanced from dishwasher to sous chef through discipline and performance.');

    doc.save('BryenGatt_Resume.pdf');
  };

  return (
    <section className="resume fade-in glass-card">
      <h1>Resume</h1>

      <p><strong>Name:</strong> Bryen Gatt</p>
      <p><strong>Email:</strong> <a href="mailto:PHTMGatt@gmail.com">PHTMGatt@gmail.com</a></p>
      <p><strong>Discord:</strong> LordxIlluminati</p>
      <p><strong>GitHub:</strong> <a href="https://github.com/PHTMGatt" target="_blank" rel="noreferrer">github.com/PHTMGatt</a></p>

      <h2>Objective</h2>
      <p>
        Emerging game developer focused on systems and quest/Easter-egg design that rewards exploration and problem-solving. I bring 10+ years of leadership in high-end kitchens—precision, reliability, and calm under pressure—and full-stack skills (React, Node, TypeScript) to prototype tools, streamline pipelines, and collaborate across disciplines. Inspired by CD Projekt Red’s worldbuilding and the craft of tightly-designed secrets.
      </p>

      <h2>Skills</h2>
      <ul className="skills">
        <li><strong>Languages:</strong> JavaScript (ES6+), TypeScript, HTML5/CSS3, SQL, Python</li>
        <li><strong>Frontend:</strong> React (hooks, state), responsive UI</li>
        <li><strong>Backend:</strong> Node.js, Express.js, REST APIs</li>
        <li><strong>Databases:</strong> MongoDB/Atlas, PostgreSQL</li>
        <li><strong>DevOps & Practices:</strong> Git/GitHub, GitHub Actions (CI/CD), ESLint, Prettier</li>
        <li><strong>Game/World Tools:</strong> Blender, Unreal Engine (basics), Axiom (Minecraft world editing)</li>
        <li><strong>Core Strengths:</strong> Team leadership, quality control, execution under pressure</li>
      </ul>

      <h2>Projects (select)</h2>
      <ul>
        <li><a href="https://zombies-hub.onrender.com" target="_blank" rel="noreferrer">Zombies Hub</a> — BO3 multi-map guide with mobile-first UI (React)</li>
        <li><a href="https://the-daily-bytes-o4jo.onrender.com" target="_blank" rel="noreferrer">Daily Bytes</a> — lightweight news feed (React)</li>
        <li><a href="https://fairway-finder.onrender.com" target="_blank" rel="noreferrer">Fairway Finder</a> — golf shot tracker & insights</li>
      </ul>

      <h2>Education</h2>
      <p><strong>Michigan State University</strong> — Full Stack Web Development Certificate (2025)</p>
      <p>
        <a
          href="https://msu.credential.getsmarter.com/c01af6df-f030-4aa7-9cf0-de7bc925b148#acc.iYILFzgO"
          target="_blank"
          rel="noreferrer"
        >
          View verified credential
        </a>
      </p>
      <p>High School Diploma</p>

      <h2>Experience</h2>
      <p><strong>Sous Chef / Kitchen Lead</strong> — 2013–2025</p>
      <ul>
        <li>Directed nightly operations in high-end kitchens; upheld strict quality and consistency.</li>
        <li>Mentored and trained teams; improved execution, communication, and problem-solving.</li>
        <li>Advanced from dishwasher to sous chef through discipline and performance.</li>
      </ul>

      <button
        onClick={handleDownloadPDF}
        className="resume-submit-btn"
        style={{ marginTop: '2rem' }}
      >
        Download Resume as PDF
      </button>
    </section>
  );
};

export default Resume;
