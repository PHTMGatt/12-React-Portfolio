import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
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
const createRouter = import.meta.env.VITE_REVIEW_HASH_ROUTER === 'true' ? createHashRouter : createBrowserRouter;

const router = createRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <App error />,
    children: [
      { index: true, element: <About /> },
      { path: 'resume', element: <Resume /> },
      { path: 'work', element: <Portfolio /> },
      { path: 'work/:slug', element: <CaseStudy /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
