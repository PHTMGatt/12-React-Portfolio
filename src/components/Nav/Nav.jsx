import PropTypes from 'prop-types';
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
        <Link to="/" className={navClass('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>Home</Link>
        <Link to="/work" className={navClass('/work')} aria-current={location.pathname === '/work' ? 'page' : undefined}>Work</Link>
        <Link to="/resume" className={navClass('/resume')} aria-current={location.pathname === '/resume' ? 'page' : undefined}>Resume</Link>
        <Link to="/contact" className={`mobile-contact ${navClass('/contact')}`} aria-current={location.pathname === '/contact' ? 'page' : undefined}>Contact</Link>
      </div>

      <div className="nav-right">
        <Link
          to="/contact"
          className={`contact-link ${navClass('/contact')}`.trim()}
          aria-current={location.pathname === '/contact' ? 'page' : undefined}
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

Nav.propTypes = { theme: PropTypes.oneOf(['light', 'dark']).isRequired, toggleTheme: PropTypes.func.isRequired };

export default Nav;
