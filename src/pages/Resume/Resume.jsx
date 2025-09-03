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
      // bullet dot
      doc.circle(marginX + 3, y - 4, 1.5, 'F');
      wrapped.forEach((line, idx) => {
        doc.text(line, marginX + 12, y);
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

    // OBJECTIVE
    addSubheader('Objective');
    addParagraph(
      'Full-stack developer with a passion for building clean, user-focused web apps and systems. Skilled in React, Node, and Python with hands-on CI/CD experience. Thrives in small teams where I can take clear goals, work independently, and deliver fast. Eager to contribute technical skills and creative problem-solving to help shape impactful products.'
    );

    // SKILLS
    addSubheader('Technical Skills');
    addParagraph('Languages: JavaScript (ES6+), TypeScript, Python, SQL, HTML5/CSS3');
    addParagraph('Frontend: React (hooks, state management), Responsive UI/UX');
    addParagraph('Backend: Node.js, Express.js, REST APIs');
    addParagraph('Databases: MongoDB/Atlas, PostgreSQL');
    addParagraph('DevOps & Tools: Git/GitHub, CI/CD (GitHub Actions), ESLint, Prettier, Render');
    addParagraph('Other: Unity (basics), Unreal Engine (basics), Blender');
    addParagraph('Strengths: Rapid prototyping, clean & maintainable code, self-motivated and detail-oriented, clear communicator, 10+ years leadership experience');

    // PROJECTS
    addSubheader('Projects (select)');
    addBullet('Zombies Hub — Multi-map Easter egg guide with mobile-first React UI and clean routing. https://zombies-hub.onrender.com');
    addBullet('Fairway Finder — Golf shot tracking platform with database-driven stats and insights. https://fairway-finder.onrender.com');
    addBullet('Daily Bytes — Dynamic news feed app with React and REST API integration. https://the-daily-bytes-o4jo.onrender.com');

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

    // EXPERIENCE
    addSubheader('Professional Experience');
    doc.setFont('helvetica', 'bold');
    doc.text('Sous Chef / Kitchen Lead — 2013–2025', marginX, y);
    y += lh;
    doc.setFont('helvetica', 'normal');
    addBullet('Directed daily kitchen operations and led a team of cooks in high-pressure, fast-paced environments.');
    addBullet('Trained and mentored new hires, fostering collaboration and efficiency.');
    addBullet('Promoted multiple times for performance and reliability.');
    addBullet('Developed strong problem-solving, time management, and attention to detail — directly transferable to software development work.');

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
        Full-stack developer with a passion for building clean, user-focused web apps and systems. Skilled in React, Node, and Python with hands-on CI/CD experience. Thrives in small teams where I can take clear goals, work independently, and deliver fast. Eager to contribute technical skills and creative problem-solving to help shape impactful products.
      </p>

      <h2>Technical Skills</h2>
      <ul className="skills">
        <li><strong>Languages:</strong> JavaScript (ES6+), TypeScript, Python, SQL, HTML5/CSS3</li>
        <li><strong>Frontend:</strong> React (hooks, state management), Responsive UI/UX</li>
        <li><strong>Backend:</strong> Node.js, Express.js, REST APIs</li>
        <li><strong>Databases:</strong> MongoDB/Atlas, PostgreSQL</li>
        <li><strong>DevOps &amp; Tools:</strong> Git/GitHub, CI/CD (GitHub Actions), ESLint, Prettier, Render</li>
        <li><strong>Other:</strong> Unity (basics), Unreal Engine (basics), Blender</li>
        <li><strong>Strengths:</strong> Rapid prototyping · Clean, maintainable code · Self-motivated and detail-oriented · Clear communicator · 10+ years leadership experience</li>
      </ul>

      <h2>Projects (select)</h2>
      <ul>
        <li><a href="https://zombies-hub.onrender.com" target="_blank" rel="noreferrer">Zombies Hub</a> — Multi-map Easter egg guide with mobile-first React UI and clean routing</li>
        <li><a href="https://fairway-finder.onrender.com" target="_blank" rel="noreferrer">Fairway Finder</a> — Golf shot tracking platform with database-driven stats and insights</li>
        <li><a href="https://the-daily-bytes-o4jo.onrender.com" target="_blank" rel="noreferrer">Daily Bytes</a> — Dynamic news feed app with React and REST API integration</li>
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

      <h2>Professional Experience</h2>
      <p><strong>Sous Chef / Kitchen Lead</strong> — 2013–2025</p>
      <ul>
        <li>Directed daily kitchen operations and led a team of cooks in high-pressure, fast-paced environments.</li>
        <li>Trained and mentored new hires, fostering collaboration and efficiency.</li>
        <li>Promoted multiple times for performance and reliability.</li>
        <li>Developed strong problem-solving, time management, and attention to detail — directly transferable to software development work.</li>
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
