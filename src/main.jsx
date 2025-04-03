import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import About from './components/About/About'
import Resume from './components/Resume/Resume'
import Portfolio from './components/Work/Portfolio'
import Contact from './components/Contact/Contact'

document.title = "Bryen's Portfolio"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 - Page Not Found</div>,
    children: [
      { index: true, element: <About /> },
      { path: 'resume', element: <Resume /> },
      { path: 'work', element: <Portfolio /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
