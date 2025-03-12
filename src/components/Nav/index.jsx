import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Nav = () => {
  return (
    <>

      <ul className='Nav'>
        <li className='Nav-item'>
          <Link to="/">About</Link>
        </li>
        <li className='Nav-item'>
          <Link to="/Resume"> Resume </Link>
        </li>
        <li className='Nav-item'>
          <Link to="/Work"> Work </Link>
        </li>
        <li className='Nav-item'>
          <Link to="/Contact"> Contact </Link>
        </li>
      </ul>
    </>
  )
}

export default Nav