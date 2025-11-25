import React from 'react';
import './About.css';
import headshot from '../../assets/Pictures/bryen_headshot.jpg';

const About = () => {
  return (
    <section className="about-section fade-in">
      <div className="about-text">
        <h1 className="about-title">About Me</h1>

        <p>
          I’m a full-stack developer who builds clean, fast, and intuitive web experiences with React, Node,
          and modern JavaScript tools. I focus on maintainable code, thoughtful UI design, and features that
          feel smooth and purposeful. I bring a bit of my game-design mindset into everything I make—exploring
          ideas, refining interactions, and adding subtle touches that make projects more engaging without
          sacrificing clarity or usability.
        </p>



      </div>

      <div className="about-image">
        <img
          src={headshot}
          alt="Bryen Headshot"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default About;
