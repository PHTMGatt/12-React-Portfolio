import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import './Nav.css';

const links = [
  { to: '/', label: 'About', end: true },
  { to: '/work', label: 'Work' },
  { to: '/resume', label: 'Resume' },
];

const Nav = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const { pathname } = useLocation();
  const isDark = theme === 'dark';

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    // The menu links sit before the toggle in the page, so after opening it
    // the next Tab would skip them and land on content hidden behind the menu.
    // Start keyboard users on the first link instead. The menu is revealed
    // with a CSS transition and its links cannot take focus until that is
    // under way, which takes a few frames: retry each frame, briefly.
    let attempts = 0;
    let frame = requestAnimationFrame(function focusFirstLink() {
      const link = menuRef.current?.querySelector('a');
      link?.focus();
      if (link && document.activeElement !== link && ++attempts < 20) frame = requestAnimationFrame(focusFirstLink);
    });
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Tabbing out of the header closes the menu, so focus never ends up on
  // page content that the open menu is covering.
  const closeWhenFocusLeaves = (event) => {
    if (open && event.relatedTarget && !headerRef.current?.contains(event.relatedTarget)) setOpen(false);
  };

  return (
    <header ref={headerRef} className={`site-nav${open ? ' is-open' : ''}`} onBlur={closeWhenFocusLeaves}>
      <nav className="site-nav__inner container" aria-label="Primary">
        {/* The link is named by its own text, so the spoken name always
            contains what is on screen (WCAG 2.5.3). No aria-label override. */}
        <Link to="/" className="site-nav__brand">
          <span className="site-nav__mark" aria-hidden="true">
            BG
          </span>
          <span className="site-nav__name">
            Bryen Gatt
            <span className="site-nav__role">Full-Stack Developer</span>
          </span>
          <span className="sr-only">, home</span>
        </Link>

        <div ref={menuRef} className="site-nav__menu" id="site-menu">
          <ul className="site-nav__links">
            {links.map(({ to, label, end }) => (
              <li key={to}>
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
            ref={menuToggleRef}
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
