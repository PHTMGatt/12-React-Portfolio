import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './Global.css';
import App from './App.jsx';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';

// The home page ships in the main bundle; every other route loads on demand.
const Resume = lazy(() => import('./pages/Resume/Resume'));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'));
const CaseStudy = lazy(() => import('./pages/CaseStudy/CaseStudy'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

const router = createBrowserRouter([
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
], {
  // Opt in to React Router v7 behaviour now (also silences the dev warnings).
  future: { v7_relativeSplatPath: true },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode>
);
