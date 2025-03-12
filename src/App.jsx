import './App.css'
import Nav from './componets/Nav'
import { Outlet } from 'react-router-dom'
function App() {
  

  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}

export default App