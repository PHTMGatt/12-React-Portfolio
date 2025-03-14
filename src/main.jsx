import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './components/About'
import Resume from './components/Resume'
import Work from './components/Work'
import Contact from './components/Contact'

document.title = "Bryens Portfolio";

const router = createBrowserRouter(
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
