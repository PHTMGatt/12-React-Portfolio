import React from 'react'
import cooldude from '../assets/cooldude.jpg'

const About = () => {
  return (
<div className='about'>
    <section className='about-content'>
        <h1>
            About
        </h1>
        <p>text here</p>
        <p>text here</p>
    </section>

    <section className='img-container'>
        <div class = "img-wrapper">
        <img src="cooldude" alt="Cool Dude" />
        </div>
    </section>

</div>

  )
}

export default About