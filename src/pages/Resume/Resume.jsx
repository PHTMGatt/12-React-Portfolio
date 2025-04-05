import React from 'react';
import jsPDF from 'jspdf';
import './Resume.css';

const Resume = () => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const content = `
Bryen Gatt - Resume

Email: PHTMGatt@gmail.com
Discord: LordxIlluminati
GitHub: https://github.com/PHTMGatt

Summary:
Highly motivated software engineer with a passion for game design and development.

Skills:
- HTML / CSS / JavaScript
- React / Node.js / Express
- MongoDB / SQL / APIs
- Git / GitHub / CLI
`;
    doc.text(content, 10, 10);
    doc.save('BryenGatt_Resume.pdf');
  };

  return (
    <section className="resume fade-in">
      <h1>Resume</h1>

      <p><strong>Email:</strong> PHTMGatt@gmail.com</p>
      <p><strong>Discord:</strong> LordxIlluminati</p>
      <p>
        <strong>GitHub:</strong>{' '}
        <a
          href="https://github.com/PHTMGatt"
          target="_blank"
          rel="noreferrer"
        >
          github.com/PHTMGatt
        </a>
      </p>

      <h2>Summary</h2>
      <p>
        Highly motivated software engineer with a passion for game design and development.
      </p>

      <h2>Skills</h2>
      <ul className="skills">
        <li>HTML / CSS / JavaScript</li>
        <li>React / Node.js / Express</li>
        <li>MongoDB / SQL / APIs</li>
        <li>Git / GitHub / CLI</li>
      </ul>

      <a
        href="/resume.pdf"
        download
        className="submit-btn"
        onClick={handleDownloadPDF}
        style={{
          marginTop: '2rem',
          display: 'inline-block',
          textDecoration: 'none',
        }}
      >
        Download Resume as PDF
      </a>
    </section>
  );
};

export default Resume;
