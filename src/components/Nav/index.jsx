import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Nav = () => {
  return (
    <>

      <ul className='Nav'>
        <li className='Nav-item'>
          <Link className='links' to="/">About</Link>
        </li>
        <li className='Nav-item'>
          <Link className='links' to="/Resume"> Resume </Link>
        </li>
        <li className='Nav-item'>
          <Link className='links' to="/Work"> Portfolio </Link>
        </li>
        <li className='Nav-item'>
          <Link className='links' to="/Contact"> Contact </Link>
        </li>
      </ul>
    </>
  )
}

export default Nav