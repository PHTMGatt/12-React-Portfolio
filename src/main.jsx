import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './Global.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import About from './pages/About/About';
const Resume = lazy(() => import('./pages/Resume/Resume'));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

document.title = 'Bryen Gatt | Full-Stack Developer';

const notFound = (
  <section style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '2rem', textAlign: 'center' }}>
    <div>
      <p style={{ color: 'var(--accent-color)', fontWeight: 800, marginBottom: '.5rem' }}>404</p>
      <h1 style={{ margin: 0 }}>Page not found</h1>
      <p style={{ opacity: .72 }}>That route does not exist in this portfolio.</p>
      <a href="/" style={{ fontWeight: 700 }}>Return home</a>
    </div>
  </section>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: notFound,
    children: [
      { index: true, element: <About /> },
      { path: 'resume', element: <Resume /> },
      { path: 'work', element: <Portfolio /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: notFound },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
