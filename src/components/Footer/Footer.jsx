import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Bryen Gatt. All rights reserved.</p>

      <div className="social-icons">
        <a href="https://github.com/PHTMGatt" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/YOUR-LINKEDIN" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>

      <p><em>Now give me that 💯</em></p>
    </footer>
  )
}

export default Footer
