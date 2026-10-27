import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import './Nav.css';

const links = [
  { to: '/', label: 'About', end: true },
  { to: '/work', label: 'Work' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact', mobileOnly: true },
];

const Nav = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isDark = theme === 'dark';

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-nav${open ? ' is-open' : ''}`}>
      <nav className="site-nav__inner container" aria-label="Primary">
        <Link to="/" className="site-nav__brand" aria-label="Bryen Gatt, home">
          <span className="site-nav__mark" aria-hidden="true">
            BG
          </span>
          <span className="site-nav__name">
            Bryen Gatt
            <span className="site-nav__role">Full-Stack Developer</span>
          </span>
        </Link>

        <div className="site-nav__menu" id="site-menu">
          <ul className="site-nav__links">
            {links.map(({ to, label, end, mobileOnly }) => (
              <li key={to} className={mobileOnly ? 'site-nav__mobile-only' : undefined}>
                <NavLink to={to} end={end} className="site-nav__link">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-nav__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Light of Eärendil' : 'Shadow and Flame'}
          >
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <NavLink to="/contact" className="btn btn-primary btn-sm site-nav__cta">
            Contact
          </NavLink>
          <button
            type="button"
            className="icon-btn site-nav__toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
