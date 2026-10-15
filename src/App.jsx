import { useState, useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { readPreference, writePreference } from './utils/storage';

function App() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState(() => readPreference('theme') === 'light' ? 'light' : 'dark');

  useEffect(() => {
    const titles = { '/': 'Full-Stack Developer', '/work': 'Selected Work', '/resume': 'Resume', '/contact': 'Contact' };
    document.title = `Bryen Gatt | ${titles[pathname] || 'Page not found'}`;
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writePreference('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main className="app-content" id="main-content" tabIndex="-1">
        <Suspense fallback={<p role="status" className="route-loading">Loading page…</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
