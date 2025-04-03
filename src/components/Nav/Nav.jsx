// Nav.jsx - Navigation with theme toggle and spicy style
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

const Nav = ({ theme, toggleTheme }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', name: 'About' },
    { path: '/resume', name: 'Resume' },
    { path: '/work', name: 'Portfolio' },
    { path: '/contact', name: 'Contact' },
  ]

  return (
    <nav className="nav">
      <ul className="nav-links">
        {navItems.map(({ path, name }) => (
          <li key={path}>
            <Link
              to={path}
              className={location.pathname === path ? 'active' : ''}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className={`theme-toggle ${theme}`}
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </nav>
  )
}

export default Nav
