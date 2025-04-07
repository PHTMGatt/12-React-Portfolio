import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = ({ theme, toggleTheme }) => {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          About
        </Link>
        <Link to="/resume" className={location.pathname === '/resume' ? 'active' : ''}>
          Resume
        </Link>
        <Link to="/work" className={location.pathname === '/work' ? 'active' : ''}>
          Portfolio
        </Link>
      </div>

      <div className="nav-right">
        <Link
          to="/contact"
          className={location.pathname === '/contact' ? 'active contact-link' : 'contact-link'}
        >
          Contact
        </Link>
        <button className={`theme-toggle ${theme}`} onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'dark' ? '✨ Light of Eärendil' : '🔥 Shadow and Flame'}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
