import { Suspense, lazy, useEffect, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import { readPreference, writePreference } from './utils/storage';

// The footer is below the fold on every page, and the 404 page is rarely
// needed, so both load after the main bundle.
const Footer = lazy(() => import('./components/Footer/Footer'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Storage can be unavailable (private mode); readPreference falls back to the default.
const readTheme = () => (readPreference('theme') === 'light' ? 'light' : 'dark');

function App({ error = false }) {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writePreference('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main id="main" className="app-content" tabIndex={-1}>
        <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
          {error ? <NotFound /> : <Outlet />}
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ScrollRestoration />
    </>
  );
}

export default App;
