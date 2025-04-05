import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = ({ theme, toggleTheme }) => {
  const location = useLocation();

  return (
    <nav className="nav">
      {/* Top Row */}
      <ul className="nav-links top-row">
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>About</Link></li>
        <li><Link to="/resume" className={location.pathname === '/resume' ? 'active' : ''}>Resume</Link></li>
        <li><Link to="/work" className={location.pathname === '/work' ? 'active' : ''}>Portfolio</Link></li>
      </ul>

      {/* Bottom Row: Contact + Toggle */}
      <div className="bottom-row">
        <Link
          to="/contact"
          className={location.pathname === '/contact' ? 'active' : ''}
        >
          Contact
        </Link>

        <button
          className={`theme-toggle ${theme}`}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
