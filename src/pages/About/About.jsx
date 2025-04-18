import React from 'react';
import './About.css';
import bryguy from '../../assets/Pictures/bryguy.png'; // ✅ updated from /pix/

const About = () => {
  return (
    <section className="about-section fade-in">
      <div className="about-text">
        <h1 className="about-title">About Me</h1>
        <p>
          I'm a full stack web developer with a background in graphic design, a love for clean code,
          and a passion for creative problem solving. I thrive on learning new tools, building cool projects,
          and crafting engaging digital experiences. Currently leveling up through a coding bootcamp.
        </p>
      </div>

      <div className="about-image">
        <img src={bryguy} alt="Bryen skating at the skatepark" loading="lazy" />
      </div>
    </section>
  );
};

export default About;
