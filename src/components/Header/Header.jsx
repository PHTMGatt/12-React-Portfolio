import React from 'react';
import Nav from '../Nav/Nav';
import Hero from '../Hero/Hero';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container glass-card">
      <Nav />
      <Hero />
    </header>
  );
};

export default Header;
