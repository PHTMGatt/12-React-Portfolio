import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>&copy; {new Date().getFullYear()} Bryen Gatt. All rights reserved.</p>

        <div className="social-icons">
          <a
            href="https://github.com/PHTMGatt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/bryen-gatt" // <- Replace with actual username if different
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

        <p><em>Now give me that 💯</em></p>
      </div>
    </footer>
  );
};

export default Footer;
