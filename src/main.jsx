import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './About.jsx'
import Resume from './Resume.jsx'
import Work from './Work.jsx'
import Contact from './Contact.jsx'

createBrowserRouter(
  [
    {
      path : '/',
      element : <App />,
      errorElement : <div>404</div>,
      children : [
        {
          index : true,
          element : <About />
        },
        {
          path : '/resume',
          element : <Resume />
        },
        {
          path : '/work',
          element : <Work />
        },
        {
          path : '/contact',
          element : <Contact />
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
)
