import React from 'react';
import './About.css';
import bryguy from '../../assets/Pictures/bryguy.png'; // ✅ updated from /pix/

const About = () => {
  return (
    <section className="about-section fade-in">
      <div className="about-text">
        <h1 className="about-title">About Me</h1>

        <p>
          I'm a full-stack developer and aspiring game designer who loves building projects that reward curiosity —
          you might even find a few hidden Easter eggs or bits of lore tucked into my work. I focus on writing
          clean, maintainable code while experimenting with tools like Unreal Engine to design and prototype
          experiences that are both polished and fun to explore.
        </p>

      </div>

      <div className="about-image">
        <img src={bryguy} alt="Bryen skating at the skatepark" loading="lazy" />
      </div>
    </section>
  );
};

export default About;
