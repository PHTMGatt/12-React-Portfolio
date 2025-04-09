import React, { useState } from 'react';
import './Contact.css';
import sendEmail from '../../utils/Email';

// ZeroBounce toggle — set to false to disable
const useZeroBounce = false;

// ZeroBounce API (currently toggled off)
const CONTACT_API_URL = 'https://api.zerobounce.net/v2/validate';
const API_KEY = '672fa6a7670e47b6a8581bb635551d4d';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ZeroBounce validation (disabled by toggle)
  const validateEmailWithZeroBounce = async (email) => {
    if (!useZeroBounce) return true;
    try {
      const response = await fetch(`${CONTACT_API_URL}?api_key=${API_KEY}&email=${email}`);
      const data = await response.json();
      return data.status === 'valid';
    } catch (err) {
      console.error('ZeroBounce error:', err);
      return false;
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, subject, message } = form;

    if (!name || !email || !subject || !message) {
      return setError("Don’t leave me in the dark, all fields must be filled!");
    }

    // Strong email regex: accepts special characters, numbers, dashes, subdomains, long TLDs, etc.
    const strongEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!strongEmailRegex.test(email)) {
      return setError("A wizard’s magic is strong, but your email isn’t valid. Try again!");
    }

    // Optional ZeroBounce validation
    const isEmailValid = await validateEmailWithZeroBounce(email);
    if (!isEmailValid) {
      return setError("Your email is not valid or does not exist in the real world. Try again!");
    }

    try {
      const result = await sendEmail({ name, email, subject, message });
      if (result.success) {
        setSuccess("Message sent successfully! I’ll be in touch soon.");
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setError("Something went wrong. The road isn’t always clear, try once more!");
      }
    } catch (err) {
      setError("Something went wrong with the email service. Try again, brave soul.");
    }
  };

  return (
    <section className="contact-section fade-in">
      <h1 className="contact-title">Contact Me</h1>
      <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact Form">
        <label htmlFor="name">What name do you go by?</label>
        <input
          type="text"
          id="name"
          placeholder="Frodo Baggins"
          value={form.name}
          onChange={handleChange}
          aria-required="true"
        />

        <label htmlFor="email">Send a raven... or, you know, an email</label>
        <input
          type="email"
          id="email"
          placeholder="frodo@theone.com"
          value={form.email}
          onChange={handleChange}
          aria-required="true"
        />

        <label htmlFor="subject">What's the matter, dear traveler?</label>
        <input
          type="text"
          id="subject"
          placeholder="A Request from the Shire"
          value={form.subject}
          onChange={handleChange}
          aria-required="true"
        />

        <label htmlFor="message">Speak your mind, brave soul.</label>
        <textarea
          id="message"
          placeholder="May your path be clear, and the wind always at your back..."
          value={form.message}
          onChange={handleChange}
          aria-required="true"
        />

        <button type="submit" className="submit-btn">
          Begin Quest
        </button>

        {error && <p className="form-error" role="alert">{error}</p>}
        {success && <p className="form-success" role="status">{success}</p>}
      </form>
    </section>
  );
};

export default Contact;
