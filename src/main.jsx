import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Global.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import About from './pages/About/About';
import Resume from './pages/Resume/Resume';
import Portfolio from './pages/Portfolio/Portfolio';
import Contact from './pages/Contact/Contact';

document.title = "Bryen's Portfolio";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div style={{ padding: '2rem', textAlign: 'center' }}>404 - Page Not Found</div>,
    children: [
      { index: true, element: <About /> },
      { path: 'resume', element: <Resume /> },
      { path: 'work', element: <Portfolio /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
