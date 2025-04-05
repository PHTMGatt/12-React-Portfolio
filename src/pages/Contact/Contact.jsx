import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section fade-in">
      <h1 className="contact-title">Contact Me</h1>
      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Your Name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="you@example.com" />

        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Let's build something cool..."></textarea>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
