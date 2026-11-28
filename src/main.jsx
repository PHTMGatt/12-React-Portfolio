import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import './Global.css';
import App from './App.jsx';
import About from './pages/About/About';

// The home page ships in the main bundle; every other route loads on demand.
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Resume = lazy(() => import('./pages/Resume/Resume'));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'));
const CaseStudy = lazy(() => import('./pages/CaseStudy/CaseStudy'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// Subfolder-hosted review previews only: build with VITE_REVIEW_HASH_ROUTER=true
// and --base=./. Production keeps clean history-based URLs.
// Declarative routing: the site loads no route data, so it skips the data
// router and its ~17 kB gz of loader/action machinery.
const Router = import.meta.env.VITE_REVIEW_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="work" element={<Portfolio />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
