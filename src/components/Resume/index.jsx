import React from 'react'
import jsPDF from 'jspdf'

const Resume = () => {
const handleDownloadPDF = () => {
  const doc = new jsPDF();
  const resumeContent = `
  Bryen Gatt
  ------------------------
Email: PHTMGatt@Gmail.com
Github: https://github.com/PHTMGatt
Discord: LordxIlluminati

Summary:
Highly motivated software engineer with a passion for game design and development

Skills:
-Code?
-Cooking
-Skateboarding
-Fucking yo bitch 

Experience:

  `;
  // Add content to the PDF
  doc.text(resumeContent, 10, 10);

  //Save the PDF
  doc.save('resume.pdf');
};

return (
  <div>
    <h1>BryGuys Resume</h1>
    <p>Email: PHTMGatt@Gmail.com</p>
    <p>Discord: LordxIlluminati</p>
    <p>Github: https://github.com/PHTMGatt</p>

    <h2>Summery</h2>
    <p>Highly motivated software engineer with a passion for game design and development

      <h2>Skills</h2>
      <p>fucking yo bitch ya bitch ass hitta</p>
    </p>
    <button onClick={handleDownloadPDF}>Download Resume as PDF</button>
  </div>
);
};

export default Resume