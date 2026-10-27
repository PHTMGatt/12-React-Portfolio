import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaDiscord, FaXbox, FaSteam } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import HobbitQuoteGenerator from './HobbitQuoteGenerator.jsx';
import { profile } from '../../data/profile';
import './Footer.css';

const professional = [
  { href: profile.github, label: 'GitHub', icon: FaGithub, external: true },
  { href: profile.linkedin, label: 'LinkedIn', icon: FaLinkedin, external: true },
  { href: `mailto:${profile.email}`, label: 'Email', icon: MdEmail },
];

const offTheClock = [
  { href: profile.discord, label: 'Discord', icon: FaDiscord },
  { href: profile.xbox, label: 'Xbox', icon: FaXbox },
  { href: profile.steam, label: 'Steam', icon: FaSteam },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__intro">
            <p className="site-footer__name">{profile.name}</p>
            <p className="site-footer__tagline">
              Full-stack developer building fast, dependable web apps and the automation behind them.
            </p>
            <Link to="/contact" className="text-link">
              Start a conversation
            </Link>
          </div>

          <nav className="site-footer__col" aria-label="Footer">
            <p className="site-footer__heading">Site</p>
            <ul>
              <li><Link to="/">About</Link></li>
              <li><Link to="/work">Work</Link></li>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="site-footer__col">
            <p className="site-footer__heading">Connect</p>
            <ul>
              {professional.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <Icon aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">Off the clock</p>
            <ul>
              {offTheClock.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HobbitQuoteGenerator />

        <div className="site-footer__bottom">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Designed and built with React &amp; Vite.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
