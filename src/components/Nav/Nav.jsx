import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = ({ theme, toggleTheme }) => {
  const location = useLocation();

  return (
    <nav className="nav">
      {/* Nav Links */}
      <ul className="nav-links">
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>About</Link></li>
        <li><Link to="/resume" className={location.pathname === '/resume' ? 'active' : ''}>Resume</Link></li>
        <li><Link to="/work" className={location.pathname === '/work' ? 'active' : ''}>Portfolio</Link></li>
        <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
      </ul>

      {/* Legendary Theme Toggle */}
      <div className="theme-toggle-container">
        <button
          className={`theme-toggle ${theme}`}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '✨ Light of Eärendil' : '🔥 Shadow and Flame'}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
