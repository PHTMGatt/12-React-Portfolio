import React from "react";
import './style.css';
import farcry from '../../assets/pix/bryguy.png';

const About = () => {
    return (
        <div className="about">
            <section className="about-content">
                <h1>About</h1>
                <p>
                    I am a web developer with a background in graphic design.
                    I have a passion for creating and problem solving.
                    I am a quick learner and am always looking to expand my skillset.
                    I am currently enrolled in a coding bootcamp to further my knowledge in web development.
                </p>
            </section>
            <section className="image-section">
                <div className="image-wrapper">
                    <img src={farcry} alt="" />
                </div>
            </section>
        </div>
    )
}

export default About;