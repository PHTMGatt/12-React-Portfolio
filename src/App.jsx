import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import useScrollRestoration from './hooks/useScrollRestoration';
import { readPreference, writePreference } from './utils/storage';

// The footer is below the fold on every page, and the 404 page is rarely
// needed, so both load after the main bundle.
const Footer = lazy(() => import('./components/Footer/Footer'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// A page that throws while rendering shows the not-found page inside the site
// shell instead of a blank screen. Keyed by path, so navigating away resets it.
class PageBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <NotFound /> : this.props.children;
  }
}

// Storage can be unavailable (private mode); readPreference falls back to the default.
const readTheme = () => (readPreference('theme') === 'light' ? 'light' : 'dark');

function App() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writePreference('theme', theme);
  }, [theme]);

  useScrollRestoration();

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // An in-app navigation swaps the page without a document load, so keyboard
  // focus would stay on a link that may no longer exist and screen readers
  // would not be told anything changed. Move focus to the new page's content,
  // as a full page load would. The first render is a real page load: skip it.
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main id="main" ref={mainRef} className="app-content" tabIndex={-1}>
        <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
          <PageBoundary key={pathname}>
            <Outlet />
          </PageBoundary>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
