import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import './Nav.css';

const Nav = ({ theme, toggleTheme }) => {
  const location = useLocation();

  const navClass = path => (location.pathname === path ? 'active' : '');

  return (
    <nav className="nav" aria-label="Primary navigation">
      <Link to="/" className="nav-brand" aria-label="Bryen Gatt portfolio home">
        <span className="nav-brand-mark" aria-hidden="true">BG</span>
        <span className="nav-brand-copy">
          <strong>Bryen Gatt</strong>
          <small>Full-stack developer</small>
        </span>
      </Link>

      <div className="nav-center">
        <Link to="/" className={navClass('/')}>Home</Link>
        <Link to="/work" className={navClass('/work')}>Work</Link>
        <Link to="/resume" className={navClass('/resume')}>Resume</Link>
      </div>

      <div className="nav-right">
        <Link
          to="/contact"
          className={`contact-link ${navClass('/contact')}`.trim()}
        >
          Contact
        </Link>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          type="button"
        >
          {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
