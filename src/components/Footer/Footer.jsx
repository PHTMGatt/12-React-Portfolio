import React from 'react';
import { FaGithub, FaLinkedin, FaDiscord, FaXbox, FaSteam } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import HobbitQuoteGenerator from './HobbitQuoteGenerator.jsx';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>&copy; {new Date().getFullYear()} Bryen Gatt. All rights reserved.</p>

        <div className="social-icons">
          <a href="https://github.com/PHTMGatt" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/bryen-gatt-8b3b69321" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://discordapp.com/users/545066022655229955" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <FaDiscord />
          </a>
          <a href="https://xboxgamertag.com/search/LordxIlluminati" target="_blank" rel="noopener noreferrer" aria-label="Xbox">
            <FaXbox />
          </a>
          <a href="https://s.team/p/rnb-qbfq/fjnntbtg" target="_blank" rel="noopener noreferrer" aria-label="Steam">
            <FaSteam />
          </a>
          <a href="mailto:PHTMGatt@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
            <MdEmail />
          </a>
        </div>

        {/* ✅ Hobbit Quote Generator with glass style */}
        <div className="footer-quote">
          <div className="quote-container">
            <HobbitQuoteGenerator />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
