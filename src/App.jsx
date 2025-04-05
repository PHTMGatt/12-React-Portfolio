import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
