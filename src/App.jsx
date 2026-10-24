import { Suspense, useEffect, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import NotFound from './pages/NotFound/NotFound';
import { readPreference, writePreference } from './utils/storage';

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
        {error ? (
          <NotFound />
        ) : (
          <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
            <Outlet />
          </Suspense>
        )}
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default App;
